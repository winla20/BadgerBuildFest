import express, { Request, Response } from 'express';
import { db } from '../config/database';
import { PublicKey } from '@solana/web3.js';

const router = express.Router();

/**
 * GET /api/institution/pending
 * Get pending verification requests for an institution
 */
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const { institutionPubkey } = req.query;

    if (!institutionPubkey) {
      return res.status(400).json({ error: 'Institution public key required' });
    }

    // Verify institution exists and is whitelisted
    const instResult = await db.query(
      `SELECT * FROM institutions WHERE pubkey = $1 AND is_whitelisted = true`,
      [institutionPubkey]
    );

    if (instResult.rows.length === 0) {
      return res.status(403).json({ error: 'Institution not authorized' });
    }

    // Fetch pending verification requests
    const result = await db.query(
      `SELECT vr.*, c.credential_data, c.credential_hash
       FROM verification_requests vr
       JOIN credentials c ON vr.credential_id = c.id
       WHERE vr.institution_pubkey = $1 AND vr.status = 'pending'
       ORDER BY vr.created_at DESC`,
      [institutionPubkey]
    );

    const requests = result.rows.map((row: any) => ({
      id: row.id,
      credential_id: row.credential_id,
      credential: JSON.parse(row.credential_data),
      credential_hash: row.credential_hash,
      requested_at: row.created_at,
    }));

    res.json({ success: true, requests });
  } catch (error: any) {
    console.error('Get pending requests error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/institution/attest
 * Create an attestation for a credential
 */
router.post('/attest', async (req: Request, res: Response) => {
  try {
    const { institutionPubkey, credentialId, signature } = req.body;

    if (!institutionPubkey || !credentialId || !signature) {
      return res.status(400).json({ error: 'Institution pubkey, credential ID, and signature required' });
    }

    // Verify institution
    const instResult = await db.query(
      `SELECT * FROM institutions WHERE pubkey = $1 AND is_whitelisted = true`,
      [institutionPubkey]
    );

    if (instResult.rows.length === 0) {
      return res.status(403).json({ error: 'Institution not authorized' });
    }

    // Fetch credential
    const credResult = await db.query(
      `SELECT * FROM credentials WHERE id = $1`,
      [credentialId]
    );

    if (credResult.rows.length === 0) {
      return res.status(404).json({ error: 'Credential not found' });
    }

    const credRow = credResult.rows[0];

    // Store attestation
    await db.query(
      `INSERT INTO attestations (credential_id, credential_hash, institution_pubkey, signature, timestamp)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (credential_id, institution_pubkey) DO UPDATE
       SET signature = $4, timestamp = NOW()`,
      [credentialId, credRow.credential_hash, institutionPubkey, signature]
    );

    // Update verification request status
    await db.query(
      `UPDATE verification_requests
       SET status = 'approved', updated_at = NOW()
       WHERE credential_id = $1 AND institution_pubkey = $2`,
      [credentialId, institutionPubkey]
    );

    res.json({
      success: true,
      message: 'Attestation created successfully',
      // Note: Publish to Solana should be done separately
    });
  } catch (error: any) {
    console.error('Attest error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

