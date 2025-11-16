import express, { Request, Response } from 'express';
import { db } from '../config/database';
import { connection, getProgram } from '../config/solana';
import { PublicKey } from '@solana/web3.js';
import { hashCredential } from '../utils/hash';
import { Wallet } from '@coral-xyz/anchor';

const router = express.Router();

/**
 * POST /api/verification/verify
 * Verify a credential's authenticity
 */
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { credentialId, ownerDid } = req.body;

    if (!credentialId || !ownerDid) {
      return res.status(400).json({ error: 'Credential ID and owner DID required' });
    }

    // Fetch credential from database
    const credResult = await db.query(
      `SELECT * FROM credentials WHERE id = $1 AND owner_did = $2`,
      [credentialId, ownerDid]
    );

    if (credResult.rows.length === 0) {
      return res.status(404).json({ 
        status: 'NOT_VERIFIED',
        message: 'Credential not found' 
      });
    }

    const credRow = credResult.rows[0];
    const credential = JSON.parse(credRow.credential_data);

    // Compute hash and compare with stored hash
    const computedHash = hashCredential(credential);
    const storedHash = Buffer.from(credRow.credential_hash, 'hex');

    if (!computedHash.equals(storedHash)) {
      return res.json({
        status: 'NOT_VERIFIED',
        message: 'Credential hash mismatch - possible tampering',
      });
    }

    // Fetch on-chain commitment
    // Note: In production, use Anchor IDL to fetch commitment account
    const commitmentPDA = await PublicKey.findProgramAddress(
      [Buffer.from('credential'), Buffer.from(credentialId)],
      new PublicKey(process.env.ANCHOR_PROGRAM_ID || '')
    );

    try {
      const commitmentAccount = await connection.getAccountInfo(commitmentPDA[0]);
      
      if (!commitmentAccount) {
        return res.json({
          status: 'NO_ATTESTATION',
          message: 'Credential commitment not found on-chain',
          credential,
        });
      }

      // Fetch attestation if exists
      // For MVP, check if institution has signed
      const attestationResult = await db.query(
        `SELECT * FROM attestations WHERE credential_id = $1`,
        [credentialId]
      );

      if (attestationResult.rows.length === 0) {
        return res.json({
          status: 'NO_ATTESTATION',
          message: 'Credential exists on-chain but has no institutional attestation',
          credential,
          onChain: true,
        });
      }

      const attestation = attestationResult.rows[0];

      // Verify institution is whitelisted
      const instResult = await db.query(
        `SELECT * FROM institutions WHERE pubkey = $1 AND is_whitelisted = true`,
        [attestation.institution_pubkey]
      );

      if (instResult.rows.length === 0) {
        return res.json({
          status: 'NOT_VERIFIED',
          message: 'Attestation from non-whitelisted institution',
        });
      }

      res.json({
        status: 'VERIFIED',
        message: 'Credential verified with institutional attestation',
        credential,
        attestation: {
          institution: instResult.rows[0].name,
          timestamp: attestation.timestamp,
        },
      });

    } catch (error) {
      return res.json({
        status: 'NO_ATTESTATION',
        message: 'Could not fetch on-chain data',
        credential,
      });
    }
  } catch (error: any) {
    console.error('Verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

