import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
import idl from '../../idl/credential_verification.json';
import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const PROGRAM_ID = process.env.ANCHOR_PROGRAM_ID || 'Fg6PaFpoGkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS';

export const connection = new Connection(RPC_URL, 'confirmed');

export const getProgram = (wallet: Wallet): Program => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    { commitment: 'confirmed' }
  );

  return new Program(idl as any, new PublicKey(PROGRAM_ID), provider);
};

export const deriveDID = (publicKey: PublicKey): string => {
  return `did:sol:${publicKey.toBase58()}`;
};

export const getCredentialCommitmentPDA = async (
  credentialId: string,
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('credential'), Buffer.from(credentialId)],
    programId
  );
};

export const getAttestationPDA = async (
  credentialId: string,
  institutionPubkey: PublicKey,
  programId: PublicKey
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('attestation'),
      Buffer.from(credentialId),
      institutionPubkey.toBuffer(),
    ],
    programId
  );
};

