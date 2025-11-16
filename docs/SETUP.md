# Setup Guide

This guide will help you set up the Decentralized Resume & Credential Verification Platform.

## Prerequisites

1. **Node.js 18+** and npm/yarn
2. **Rust** (latest stable version)
3. **Solana CLI** (latest version)
4. **Anchor Framework** (v0.29.0)
5. **PostgreSQL** (or use Supabase)

## Step 1: Install Solana & Anchor

### Install Solana CLI
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

### Install Anchor
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

## Step 2: Set Up Database

### Option A: Local PostgreSQL
```bash
# Create database
createdb credential_verification

# Run schema
psql credential_verification < database/schema.sql
```

### Option B: Supabase
1. Create a new project on Supabase
2. Copy the connection string
3. Run the SQL from `database/schema.sql` in the Supabase SQL editor

## Step 3: Set Up Solana Program

```bash
cd program

# Build the program
anchor build

# Generate program keypair if needed
anchor keys list

# Deploy to devnet (or localnet for testing)
anchor deploy --provider.cluster devnet

# Copy the program ID from Anchor.toml to your .env files
```

## Step 4: Set Up Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration:
# - DATABASE_URL or DB_* settings
# - SOLANA_RPC_URL (use https://api.devnet.solana.com for devnet)
# - ANCHOR_PROGRAM_ID (from your deployed program)

# Run migrations (if using a migration tool)
# Otherwise, ensure schema.sql has been run

# Start development server
npm run dev
```

## Step 5: Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file (if needed)
# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Start development server
npm run dev
```

## Step 6: Configure Institutions

To add institutions for attestations, insert them into the database:

```sql
INSERT INTO institutions (pubkey, name, is_whitelisted, metadata)
VALUES (
  'YOUR_INSTITUTION_PUBKEY_HERE',
  'University Name',
  true,
  '{"type": "university"}'::jsonb
);
```

## Testing the Platform

1. **Start backend**: `cd backend && npm run dev`
2. **Start frontend**: `cd frontend && npm run dev`
3. Open `http://localhost:3000` in your browser
4. Connect your Solana wallet (Phantom, Solflare, etc.)
5. Upload a resume to extract credentials
6. Publish credentials to the blockchain
7. Use the institution portal to sign attestations

## Troubleshooting

### Solana Program Deployment Issues
- Ensure you have SOL in your wallet: `solana balance`
- Airdrop if needed: `solana airdrop 2` (devnet)
- Check program ID matches in all config files

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check connection string format in .env
- Ensure database and schema exist

### Wallet Connection Issues
- Ensure you're using a supported wallet (Phantom, Solflare)
- Check network matches (devnet/mainnet)
- Clear browser cache and try again

## Development Tips

- Use Solana Explorer to view on-chain data: https://explorer.solana.com
- Use Anchor's test framework for program testing
- Check browser console and backend logs for errors
- Enable verbose logging in development mode

