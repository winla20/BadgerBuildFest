import express, { Request, Response } from 'express';
import { db } from '../config/database';
import { deriveDID } from '../config/solana';
import { PublicKey } from '@solana/web3.js';

const router = express.Router();

/**
 * GET /api/credentials
 * Get all credentials for a user
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.query;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const publicKey = new PublicKey(walletAddress as string);
    const did = deriveDID(publicKey);

    const result = await db.query(
      `SELECT id, owner_did, credential_data, credential_hash, created_at
       FROM credentials
       WHERE owner_did = $1
       ORDER BY created_at DESC`,
      [did]
    );

    const credentials = result.rows.map((row: any) => ({
      ...JSON.parse(row.credential_data),
      credential_hash: row.credential_hash,
      created_at: row.created_at,
    }));

    res.json({ success: true, credentials });
  } catch (error: any) {
    console.error('Get credentials error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/credentials/:id
 * Get a specific credential
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT id, owner_did, credential_data, credential_hash, created_at
       FROM credentials
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Credential not found' });
    }

    const row = result.rows[0];
    const credential = {
      ...JSON.parse(row.credential_data),
      credential_hash: row.credential_hash,
      created_at: row.created_at,
    };

    res.json({ success: true, credential });
  } catch (error: any) {
    console.error('Get credential error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

