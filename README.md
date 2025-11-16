# BadgerBuildFest
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

## Quick Start (Windows PowerShell)

### Prerequisites

**Choose your installation method:**
- **Option 1: WSL (Recommended)** - Windows Subsystem for Linux provides the easiest Solana setup
- **Option 2: Native Windows** - Direct Windows installation (more complex)

**Required:**
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/) or installed via WSL
- **Git for Windows** - Download from [git-scm.com](https://git-scm.com/download/win)
- **WSL (Ubuntu)** - If using WSL method, install from Microsoft Store
- **Rust** - Installed automatically with Solana quick install (WSL) or via [rustup.rs](https://rustup.rs/)
- **Visual Studio Build Tools** - Required for Rust compilation (native Windows only)
- **Solana CLI** - See installation below
- **Anchor Framework** v0.29.0+ - See installation below
- **PostgreSQL** - Download from [postgresql.org](https://www.postgresql.org/download/windows/) OR use **Supabase** (recommended)

### Installation

**Method 1: Using WSL (Recommended)**

WSL provides a Linux environment on Windows, making Solana development easier. The official Solana quick installation works seamlessly in WSL.

1. **Install WSL** (if not already installed)
   ```powershell
   # Open PowerShell as Administrator
   wsl --install
   
   # Restart your computer when prompted
   # After restart, open Ubuntu from Start Menu or run: wsl
   ```

2. **Install Rust, Solana CLI, Anchor, Node.js, and Yarn** (All in one command)
   ```bash
   # In WSL (Ubuntu) terminal, run the official Solana quick installation:
   curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
   
   # Restart terminal or reload shell:
   source ~/.bashrc
   # or
   source ~/.zshrc
   ```

3. **Verify Installation**
   ```bash
   rustc --version && solana --version && anchor --version && node --version && yarn --version
   ```
   
   Expected output:
   ```
   Installed Versions:
   Rust: rustc 1.90.0+ (or similar)
   Solana CLI: solana-cli 2.3.13+ (or similar)
   Anchor CLI: 0.32.1+ (or similar)
   Node.js: v24.10.0+ (or similar)
   Yarn: 1.22.22+ (or similar)
   ```

4. **Configure Solana**
   ```bash
   # Set to devnet
   solana config set --url devnet
   
   # Create wallet
   solana-keygen new --outfile ~/.config/solana/id.json
   
   # Get airdrop for devnet
   solana airdrop 2
   
   # Verify configuration
   solana config get
   solana address
   solana balance
   ```

> **Reference:** Official Solana installation guide: https://solana.com/docs/intro/installation

**Method 2: Native Windows (PowerShell)**

**Open PowerShell as Administrator** (required for some steps)

1. **Install Rust** (if not already installed)
   ```powershell
   # Download and install Rust
   Invoke-WebRequest -Uri https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
   .\rustup-init.exe
   # Restart PowerShell after installation
   ```

2. **Install Solana CLI & Dependencies**

   **Option A: WSL (Windows Subsystem for Linux) - Recommended**
   
   WSL provides a Linux-like environment on Windows and is the recommended method for Solana development. Installation is simpler and more reliable.
   
   ```powershell
   # First, install WSL if you haven't already (run in PowerShell as Administrator)
   wsl --install
   # Restart your computer after WSL installation
   ```
   
   Then open WSL (Ubuntu) terminal and run:
   ```bash
   # Quick installation - installs Rust, Solana CLI, Anchor, Node.js, and Yarn
   curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
   
   # Follow the prompts, then restart your terminal or run:
   source ~/.bashrc
   
   # Verify installation
   rustc --version && solana --version && anchor --version && node --version && yarn --version
   
   # Configure Solana for devnet
   solana config set --url devnet
   
   # Create wallet and get airdrop
   solana-keygen new --outfile ~/.config/solana/id.json
   solana airdrop 2
   ```
   
   > **Reference:** [Official Solana Installation Guide](https://solana.com/docs/intro/installation)
   
   **Option B: Native Windows (PowerShell)**
   ```powershell
   # Download Solana installer
   Invoke-WebRequest -Uri https://release.solana.com/v1.18.0/solana-install-init-x86_64-pc-windows-msvc.exe -OutFile $env:TEMP\solana-installer.exe
   
   # Run installer
   & $env:TEMP\solana-installer.exe v1.18.0
   
   # Add Solana to PATH (restart PowerShell after)
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.local\share\solana\install\active_release\bin", [EnvironmentVariableTarget]::User)
   
   # Restart PowerShell, then verify
   solana --version
   
   # Configure for devnet
   solana config set --url devnet
   
   # Create wallet and get airdrop
   solana-keygen new --outfile $env:USERPROFILE\.config\solana\id.json
   solana airdrop 2
   ```

3. **Install Anchor Framework**

   **If using WSL:**
   ```bash
   # Anchor should already be installed with the quick installation above
   # Verify installation
   anchor --version
   
   # If not installed, install via AVM
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   avm install latest
   avm use latest
   ```

   **If using native Windows:**
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

   **Option A: Supabase (Recommended for Windows)**
   ```powershell
   # 1. Create account at https://supabase.com
   # 2. Create new project
   # 3. Go to SQL Editor
   # 4. Copy and paste contents from database\schema.sql
   # 5. Run the SQL
   # 6. Copy connection string from Settings → Database
   ```

   **Option B: Local PostgreSQL**
   ```powershell
   # After installing PostgreSQL, create database
   createdb -U postgres credential_verification
   
   # Run schema (from project root)
   psql -U postgres -d credential_verification -f database\schema.sql
   ```

**Continue with the following steps (same for both WSL and native Windows):**

5. **Deploy Solana Program**

   **If using WSL:**
   ```bash
   cd program
   
   # Build the program
   anchor build
   
   # Deploy to devnet
   anchor deploy --provider.cluster devnet
   
   # Copy program ID from output or Anchor.toml to backend/.env
   ```

   **If using native Windows:**
   ```powershell
   cd program
   
   # Build the program
   anchor build
   
   # Deploy to devnet
   anchor deploy --provider.cluster devnet
   
   # Copy program ID from output or Anchor.toml to backend\.env
   ```

6. **Backend Setup**

   **If using WSL:**
   ```bash
   cd backend
   
   # Install dependencies
   npm install
   
   # Create .env file
   touch .env
   
   # Edit .env with your configuration (use nano, vim, or VS Code)
   nano .env
   # or: code .env  # if VS Code is available
   ```
   
   **If using native Windows:**
   ```powershell
   cd backend
   
   # Install dependencies
   npm install
   
   # Create .env file
   New-Item -Path .env -ItemType File -Force
   
   # Edit .env with your configuration (use notepad or VS Code)
   notepad .env
   ```
   
   Add to `.env`:
   ```env
   PORT=3001
   NODE_ENV=development
   
   # Database - Option 1: Local PostgreSQL
   DATABASE_URL=postgresql://user:password@localhost:5432/credential_verification
   
   # Database - Option 2: Supabase (Recommended for WSL)
   # IMPORTANT: Use hostname format, NOT IPv6 address format
   # Good: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   # Bad:  postgresql://postgres:[PASSWORD]@[2600:1f13:...]:5432/postgres
   # DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   
   # Solana Configuration
   SOLANA_RPC_URL=https://api.devnet.solana.com
   SOLANA_NETWORK=devnet
   ANCHOR_PROGRAM_ID=YOUR_PROGRAM_ID_HERE
   JWT_SECRET=your-secret-key-here
   ALLOWED_WALLETS=phantom,solflare,gemini
   ```
   
   **Start development server:**
   ```bash
   # WSL
   npm run dev
   ```
   ```powershell
   # Native Windows
   npm run dev
   ```

7. **Frontend Setup**

   **If using WSL:**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create .env.local (optional)
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
   
   # Start development server
   npm run dev
   ```

   **If using native Windows:**
   ```powershell
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create .env.local (optional)
   New-Item -Path .env.local -ItemType File -Force
   Add-Content -Path .env.local -Value "NEXT_PUBLIC_API_URL=http://localhost:3001/api"
   
   # Start development server
   npm run dev
   ```

Visit `http://localhost:3000` in your browser to access the application.

> **Note:** 
> - Make sure both backend (port 3001) and frontend (port 3000) are running in separate terminals.
> - If using WSL, you can access the app from Windows browser at `http://localhost:3000`.
> - WSL is recommended for easier Solana development on Windows. See [official Solana docs](https://solana.com/docs/intro/installation) for more details.

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
- [Windows Setup Guide](./docs/SETUP_WINDOWS.md) - **Comprehensive Windows PowerShell setup instructions**
- [General Setup Guide](./docs/SETUP.md) - Linux/Mac setup instructions

## Development

### Start Development Servers

**Terminal 1 - Backend (WSL):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (WSL):**
```bash
cd frontend
npm run dev
```

**Native Windows (PowerShell):**
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Build & Test Solana Program

**WSL:**
```bash
cd program

# Build the program
anchor build

# Test the program
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

**Native Windows (PowerShell):**
```powershell
cd program

# Build the program
anchor build

# Test the program
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

### Useful Commands

**WSL (Bash):**
```bash
# Check installed versions
node --version
npm --version
rustc --version
cargo --version
solana --version
anchor --version

# Check Solana configuration
solana config get
solana address
solana balance

# Get SOL airdrop (devnet)
solana airdrop 2

# Check database connection (if using local PostgreSQL)
psql -U postgres -d credential_verification -c "\dt"
```

**Native Windows (PowerShell):**
```powershell
# Check installed versions
node --version
npm --version
rustc --version
cargo --version
solana --version
anchor --version

# Check Solana configuration
solana config get
solana address
solana balance

# Get SOL airdrop (devnet)
solana airdrop 2

# Check database connection (if using local PostgreSQL)
psql -U postgres -d credential_verification -c "\dt"
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

## Windows Troubleshooting

### WSL Installation Issues

**WSL not installing:**
```powershell
# Run PowerShell as Administrator
wsl --install

# If WSL command not found, enable WSL feature manually:
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart computer, then install Ubuntu from Microsoft Store
```

**Solana quick install fails in WSL:**
```bash
# Try installing dependencies individually
# Update package list
sudo apt update

# Install curl and build tools
sudo apt install -y curl build-essential

# Run Solana installer again
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
```

**PATH not set in WSL:**
```bash
# Add to ~/.bashrc or ~/.zshrc
echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Native Windows: Solana CLI not found
```powershell
# Restart PowerShell after installation
# Verify PATH includes Solana
$env:Path -split ';' | Select-String solana

# Manually add to PATH if needed
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.local\share\solana\install\active_release\bin", [EnvironmentVariableTarget]::User)

# Restart PowerShell
```

### Rust compilation errors

**WSL:**
```bash
# Update Rust toolchain
rustup update stable

# Verify build tools are installed
sudo apt install -y build-essential pkg-config libssl-dev
```

**Native Windows:**
- Install Visual Studio Build Tools from [visualstudio.microsoft.com](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
- Select "C++ build tools" workload
- Restart PowerShell after installation

### Port already in use
```powershell
# Find process using port 3000 or 3001
netstat -ano | Select-String ":3000"
netstat -ano | Select-String ":3001"

# Kill process (replace PID)
Stop-Process -Id <PID> -Force
```

### Database connection issues (WSL - IPv6)

**Problem:** `ENETUNREACH` error with IPv6 address (e.g., `2600:1f13:...`)

**Solution for Supabase in WSL:**

1. **Get IPv4 connection string from Supabase:**
   - Go to Supabase Dashboard → Settings → Database
   - Under "Connection string", select **"URI"** or **"Session mode"**
   - Use the **non-pooled connection string** (usually contains just the hostname, not IPv6)
   - Ensure it looks like: `postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres`
   - **NOT**: `postgresql://postgres:[password]@[2600:1f13:...]:5432/postgres`

2. **Alternative: Use connection pooling with IPv4:**
   ```bash
   # In your .env file, use Supabase connection pooling (port 6543)
   DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

3. **Force IPv4 in connection string:**
   - If your Supabase connection string includes an IPv6 address `[2600:...]`, replace it with the hostname
   - Example: Replace `@[2600:1f13:838:6e03::]:5432` with `@db.xxxxx.supabase.co:5432`

**For local PostgreSQL:**
```bash
# In WSL, ensure PostgreSQL service is running
sudo service postgresql status
sudo service postgresql start

# Or connect via Windows PostgreSQL from WSL
# Use Windows hostname or IP instead of localhost
DATABASE_URL=postgresql://postgres:password@$(hostname).local:5432/credential_verification
```

For more detailed troubleshooting:
- [WSL Troubleshooting](./docs/WSL_TROUBLESHOOTING.md) - **Common WSL-specific issues**
- [Windows Setup Guide](./docs/SETUP_WINDOWS.md) - Comprehensive setup instructions