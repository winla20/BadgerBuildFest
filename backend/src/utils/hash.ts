import crypto from 'crypto';

export interface CredentialObject {
  credential_id: string;
  owner_did: string;
  type: 'education' | 'work' | 'project' | 'certification';
  issuer: string;
  title: string;
  start_date?: string;
  end_date?: string;
  [key: string]: any;
}

/**
 * Computes SHA256 hash of credential object
 * @param credential - Credential object
 * @returns 32-byte hash as Buffer
 */
export const hashCredential = (credential: CredentialObject): Buffer => {
  const jsonString = JSON.stringify(credential, Object.keys(credential).sort());
  return crypto.createHash('sha256').update(jsonString).digest();
};

/**
 * Converts credential hash to array format for Solana program
 */
export const hashToArray = (hash: Buffer): [number; 32] => {
  const array = new Array(32) as [number; 32];
  hash.copy(Buffer.from(array));
  return array;
};

