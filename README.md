# Decentralized Resume & Credential Verification Platform

A blockchain-based identity, resume, and credential verification platform leveraging Gemini Wallet (or MPC-based identity wallets), Solana smart contracts, and off-chain data processing.

## Project Structure

```
├── frontend/              # Frontend web client (Next.js/React)
├── backend/               # Backend API service (Express/TypeScript)
├── program/               # Solana smart contract (Anchor/Rust)
├── database/              # Database schema and migrations
└── docs/                  # Additional documentation
```

## Quick Start

### Prerequisites
- Node.js 18+
- Rust (latest stable)
- Solana CLI
- Anchor Framework v0.29.0
- PostgreSQL (or Supabase)

### Installation

1. **Install Solana & Anchor**
   ```bash
   # Install Solana CLI
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
   
   # Install Anchor
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   avm install latest
   avm use latest
   ```

2. **Set Up Database**
   ```bash
   # Create database
   createdb credential_verification
   
   # Run schema
   psql credential_verification < database/schema.sql
   ```

3. **Deploy Solana Program**
   ```bash
   cd program
   anchor build
   anchor deploy --provider.cluster devnet
   # Copy program ID from Anchor.toml to backend/.env
   ```

4. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Copy .env.example to .env and configure
   npm run dev
   ```

5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Visit `http://localhost:3000` to access the application.

## Features

- ✅ Wallet-based authentication (Gemini Wallet, Phantom, Solflare)
- ✅ Resume parsing (PDF, DOCX, TXT, MD)
- ✅ Credential hash commitments on Solana
- ✅ Institution attestation portal
- ✅ Public credential verification portal
- ✅ DID-based identity (`did:sol:<pubkey>`)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Blockchain**: Solana (Anchor framework v0.29.0)
- **Database**: PostgreSQL/Supabase
- **Wallets**: Phantom, Solflare, Gemini Wallet

## API Endpoints

### Authentication
- `POST /api/auth/challenge` - Generate nonce challenge
- `POST /api/auth/login` - Verify signature and login

### Resume & Credentials
- `POST /api/resume/upload` - Upload resume and extract credentials
- `POST /api/resume/publish` - Publish credential commitments
- `GET /api/credentials` - Get user credentials
- `GET /api/credentials/:id` - Get specific credential

### Verification
- `POST /api/verification/verify` - Verify credential authenticity

### Institution
- `GET /api/institution/pending` - Get pending verification requests
- `POST /api/institution/attest` - Create attestation

## Usage Flow

1. **User Flow**:
   - Connect Solana wallet
   - Upload resume → credentials extracted
   - Publish credential hashes to Solana
   - Request institutional attestations

2. **Institution Flow**:
   - Connect institution wallet
   - View pending verification requests
   - Verify and sign credentials
   - Publish attestations to Solana

3. **Employer Flow**:
   - Use verification portal with credential ID + DID
   - System verifies hash, attestation, and institution

## Documentation

- [Product Specification](./product_spec_identity_blockchain.md) - Detailed technical specs
- [Setup Guide](./docs/SETUP.md) - Comprehensive setup instructions

## Development

```bash
# Backend dev server
cd backend && npm run dev

# Frontend dev server
cd frontend && npm run dev

# Build Solana program
cd program && anchor build

# Test Solana program
cd program && anchor test
```

## MVP Status

✅ Core functionality implemented:
- Wallet authentication
- Resume parsing
- Credential management
- On-chain commitments
- Institution portal
- Verification system

🚧 Future enhancements (post-MVP):
- Zero-knowledge proofs
- Automated SIS integration
- AI-based skill extraction
- Mobile app
