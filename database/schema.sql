-- Database Schema for Credential Verification Platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(44) UNIQUE NOT NULL,
    did VARCHAR(100) UNIQUE NOT NULL,
    profile_metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_did ON users(did);

-- Credentials table
CREATE TABLE IF NOT EXISTS credentials (
    id VARCHAR(255) PRIMARY KEY,
    owner_did VARCHAR(100) NOT NULL,
    credential_data JSONB NOT NULL,
    credential_hash VARCHAR(64) NOT NULL, -- SHA256 hex
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (owner_did) REFERENCES users(did)
);

CREATE INDEX idx_credentials_owner ON credentials(owner_did);
CREATE INDEX idx_credentials_hash ON credentials(credential_hash);

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pubkey VARCHAR(44) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    metadata JSONB,
    is_whitelisted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_institutions_pubkey ON institutions(pubkey);
CREATE INDEX idx_institutions_whitelisted ON institutions(is_whitelisted);

-- Attestations table (off-chain record of on-chain attestations)
CREATE TABLE IF NOT EXISTS attestations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    credential_id VARCHAR(255) NOT NULL,
    credential_hash VARCHAR(64) NOT NULL,
    institution_pubkey VARCHAR(44) NOT NULL,
    signature VARCHAR(128) NOT NULL, -- Ed25519 signature hex
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(credential_id, institution_pubkey),
    FOREIGN KEY (credential_id) REFERENCES credentials(id),
    FOREIGN KEY (institution_pubkey) REFERENCES institutions(pubkey)
);

CREATE INDEX idx_attestations_credential ON attestations(credential_id);
CREATE INDEX idx_attestations_institution ON attestations(institution_pubkey);

-- Verification requests table
CREATE TABLE IF NOT EXISTS verification_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    credential_id VARCHAR(255) NOT NULL,
    institution_pubkey VARCHAR(44) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    requested_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (credential_id) REFERENCES credentials(id),
    FOREIGN KEY (institution_pubkey) REFERENCES institutions(pubkey)
);

CREATE INDEX idx_verification_requests_credential ON verification_requests(credential_id);
CREATE INDEX idx_verification_requests_institution ON verification_requests(institution_pubkey);
CREATE INDEX idx_verification_requests_status ON verification_requests(status);

