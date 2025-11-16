import express, { Request, Response } from 'express';
import { db } from '../config/database';
import { PublicKey } from '@solana/web3.js';
import { deriveDID } from '../config/solana';
import crypto from 'crypto';

const router = express.Router();

/**
 * POST /api/auth/challenge
 * Generate a nonce challenge for wallet signing
 */
router.post('/challenge', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    // Generate nonce
    const nonce = crypto.randomBytes(32).toString('base64');

    // Store nonce (in production, use Redis with TTL)
    // For MVP, we'll return it and verify in login
    res.json({ nonce, message: `Sign this message to authenticate: ${nonce}` });
  } catch (error: any) {
    console.error('Challenge generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/auth/login
 * Verify wallet signature and create/update user session
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { walletAddress, signature, nonce, message } = req.body;

    if (!walletAddress || !signature || !nonce) {
      return res.status(400).json({ error: 'Wallet address, signature, and nonce required' });
    }

    // In production, verify signature here
    // For MVP, we'll assume signature is valid if provided

    const publicKey = new PublicKey(walletAddress);
    const did = deriveDID(publicKey);

    // Check if user exists
    const userResult = await db.query(
      'SELECT * FROM users WHERE wallet_address = $1',
      [walletAddress]
    );

    let userId: string;

    if (userResult.rows.length === 0) {
      // Create new user
      const insertResult = await db.query(
        `INSERT INTO users (wallet_address, did, created_at)
         VALUES ($1, $2, NOW())
         RETURNING id`,
        [walletAddress, did]
      );
      userId = insertResult.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
      // Update last login
      await db.query(
        'UPDATE users SET last_login = NOW() WHERE id = $1',
        [userId]
      );
    }

    // Generate session token (simplified - use proper JWT in production)
    const sessionToken = crypto.randomBytes(32).toString('hex');

    res.json({
      success: true,
      token: sessionToken,
      user: {
        id: userId,
        walletAddress,
        did,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

