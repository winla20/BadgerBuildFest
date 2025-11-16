import express, { Request, Response } from 'express';
import multer from 'multer';
import { db } from '../config/database';
import { parseResume } from '../utils/resumeParser';
import { hashCredential, hashToArray, CredentialObject } from '../utils/hash';
import { PublicKey } from '@solana/web3.js';
import { getProgram, getCredentialCommitmentPDA, deriveDID } from '../config/solana';
import { Wallet } from '@coral-xyz/anchor';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/**
 * POST /api/resume/upload
 * Upload resume and extract credentials
 */
router.post('/upload', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file required' });
    }

    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const publicKey = new PublicKey(walletAddress);
    const did = deriveDID(publicKey);

    // Parse resume
    const credentials = await parseResume(req.file.buffer, req.file.originalname, did);

    // Store credentials in database
    const storedCredentials: CredentialObject[] = [];

    for (const credential of credentials) {
      const hash = hashCredential(credential);

      await db.query(
        `INSERT INTO credentials (id, owner_did, credential_data, credential_hash, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (id) DO NOTHING`,
        [credential.credential_id, did, JSON.stringify(credential), hash.toString('hex')]
      );

      storedCredentials.push(credential);
    }

    res.json({
      success: true,
      credentials: storedCredentials,
      count: storedCredentials.length,
    });
  } catch (error: any) {
    console.error('Resume upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/resume/publish
 * Publish credential hash commitments to Solana
 */
router.post('/publish', async (req: Request, res: Response) => {
  try {
    const { walletAddress, credentialIds, signature } = req.body;

    if (!walletAddress || !credentialIds || !Array.isArray(credentialIds)) {
      return res.status(400).json({ error: 'Wallet address and credential IDs required' });
    }

    // In production, verify signature here
    // This should be done client-side and transaction signed by wallet

    const publicKey = new PublicKey(walletAddress);
    const did = deriveDID(publicKey);

    // Fetch credentials from database
    const credentialResult = await db.query(
      `SELECT * FROM credentials WHERE id = ANY($1) AND owner_did = $2`,
      [credentialIds, did]
    );

    if (credentialResult.rows.length !== credentialIds.length) {
      return res.status(404).json({ error: 'Some credentials not found' });
    }

    // Note: Actual Solana transaction should be signed client-side
    // This endpoint just prepares the data
    const commitments = credentialResult.rows.map((row: any) => ({
      credential_id: row.id,
      credential_hash: Buffer.from(row.credential_hash, 'hex'),
      owner_did: row.owner_did,
    }));

    res.json({
      success: true,
      commitments,
      message: 'Publish these commitments using Solana wallet transaction',
    });
  } catch (error: any) {
    console.error('Publish error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

