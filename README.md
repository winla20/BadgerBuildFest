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

## Quick Start (Windows)

### Prerequisites
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **Git for Windows** - Download from [git-scm.com](https://git-scm.com/download/win)
- **Rust** (latest stable) - Install via [rustup.rs](https://rustup.rs/)
- **Solana CLI** - See installation below
- **Anchor Framework** v0.29.0 - See installation below
- **PostgreSQL** - Download from [postgresql.org](https://www.postgresql.org/download/windows/) OR use Supabase

### Installation (Windows PowerShell)

1. **Install Rust** (if not already installed)
   ```powershell
   # Download and run rustup-init.exe from https://rustup.rs/
   # Or use PowerShell:
   Invoke-WebRequest -Uri https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
   .\rustup-init.exe
   # Restart PowerShell after installation
   ```

2. **Install Solana CLI**
   ```powershell
   # Open PowerShell as Administrator
   cmd /c "curl https://release.solana.com/v1.18.0/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-installer.exe --silent --show-error"
   C:\solana-installer.exe v1.18.0
   
   # Add Solana to PATH (restart PowerShell after)
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.local\share\solana\install\active_release\bin", [EnvironmentVariableTarget]::User)
   
   # Verify installation
   solana --version
   ```

3. **Install Anchor Framework**
   ```powershell
   # Install Anchor Version Manager (AVM)
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   
   # Install and use latest Anchor
   avm install latest
   avm use latest
   
   # Verify installation
   anchor --version
   ```

4. **Set Up Database**

   **Option A: Local PostgreSQL**
   ```powershell
   # After installing PostgreSQL, open pgAdmin or use psql
   # Create database
   createdb -U postgres credential_verification
   
   # Run schema (from project root)
   psql -U postgres -d credential_verification -f database\schema.sql
   ```

   **Option B: Supabase (Recommended for Windows)**
   1. Create account at [supabase.com](https://supabase.com)
   2. Create new project
   3. Go to SQL Editor
   4. Copy and paste contents from `database\schema.sql`
   5. Run the SQL
   6. Copy connection string from Settings → Database

5. **Deploy Solana Program**
   ```powershell
   cd program
   
   # Set Solana to devnet
   solana config set --url devnet
   
   # Create wallet if needed
   solana-keygen new --outfile %USERPROFILE%\.config\solana\id.json
   
   # Get airdrop for devnet (if needed)
   solana airdrop 2
   
   # Build the program
   anchor build
   
   # Deploy to devnet
   anchor deploy --provider.cluster devnet
   
   # Copy program ID from Anchor.toml to backend\.env
   ```

6. **Backend Setup**
   ```powershell
   cd backend
   
   # Install dependencies
   npm install
   
   # Create .env file (copy from .env.example if it exists, or create new)
   # Edit .env with your configuration:
   # - DATABASE_URL=postgresql://user:password@localhost:5432/credential_verification
   #   OR use Supabase connection string
   # - SOLANA_RPC_URL=https://api.devnet.solana.com
   # - ANCHOR_PROGRAM_ID=<your_program_id_from_anchor_deploy>
   
   # Start development server
   npm run dev
   ```

7. **Frontend Setup**
   ```powershell
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create .env.local (optional, for API URL customization)
   # NEXT_PUBLIC_API_URL=http://localhost:3001/api
   
   # Start development server
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
- [Setup Guide (Linux/Mac)](./docs/SETUP.md) - Comprehensive setup instructions
- [Windows Setup Guide](./docs/SETUP_WINDOWS.md) - **Windows-specific setup instructions**

## Development

**Windows PowerShell:**
```powershell
# Backend dev server
cd backend; npm run dev

# Frontend dev server (in separate terminal)
cd frontend; npm run dev

# Build Solana program
cd program; anchor build

# Test Solana program
cd program; anchor test
```

**Linux/Mac:**
```bash
# Backend dev server
cd backend && npm run dev

# Frontend dev server (in separate terminal)
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
