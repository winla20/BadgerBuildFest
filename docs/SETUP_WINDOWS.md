# Windows Setup Guide

This guide provides step-by-step instructions for setting up the Decentralized Resume & Credential Verification Platform on Windows 10/11.

## Prerequisites Checklist

- [ ] Windows 10 or Windows 11
- [ ] Administrator access (for some installations)
- [ ] Node.js 18+ installed
- [ ] Git for Windows installed
- [ ] Rust installed
- [ ] PostgreSQL OR Supabase account
- [ ] Visual Studio Build Tools (for Rust compilation)

## Step 1: Install Node.js

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer (`node-vXX.X.X-x64.msi`)
3. Select "Add to PATH" during installation
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

## Step 2: Install Git for Windows

1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer
3. Use default settings (recommended)
4. Verify installation:
   ```powershell
   git --version
   ```

## Step 3: Install Rust

1. Download and run `rustup-init.exe` from [rustup.rs](https://rustup.rs/)
2. Or use PowerShell:
   ```powershell
   Invoke-WebRequest -Uri https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
   .\rustup-init.exe
   ```
3. Select "1) Proceed with installation (default)"
4. **Restart PowerShell** after installation
5. Verify installation:
   ```powershell
   rustc --version
   cargo --version
   ```

## Step 4: Install Visual Studio Build Tools (Required for Rust)

Rust on Windows requires the Microsoft C++ Build Tools:

1. Download "Build Tools for Visual Studio" from [visualstudio.microsoft.com](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
2. Run the installer
3. Select "C++ build tools" workload
4. Install (this may take 10-20 minutes)

## Step 5: Install Solana CLI

### Method 1: Using PowerShell (Recommended)

```powershell
# Open PowerShell as Administrator
# Download Solana installer
Invoke-WebRequest -Uri https://release.solana.com/v1.18.0/solana-install-init-x86_64-pc-windows-msvc.exe -OutFile $env:TEMP\solana-installer.exe

# Run installer
& $env:TEMP\solana-installer.exe v1.18.0

# Add to PATH (restart PowerShell after)
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.local\share\solana\install\active_release\bin", [EnvironmentVariableTarget]::User)

# Verify installation (after restarting PowerShell)
solana --version
solana config get
```

### Method 2: Manual Installation

1. Download the installer from [Solana releases](https://github.com/solana-labs/solana/releases)
2. Run `solana-install-init-x86_64-pc-windows-msvc.exe`
3. Follow the installation wizard
4. Add Solana to your PATH manually if needed:
   - Add `%USERPROFILE%\.local\share\solana\install\active_release\bin` to PATH
   - Or use: `[Environment]::SetEnvironmentVariable("Path", $env:Path + ";%USERPROFILE%\.local\share\solana\install\active_release\bin", [EnvironmentVariableTarget]::User)`

### Configure Solana for Devnet

```powershell
# Set to devnet
solana config set --url devnet

# Create a new keypair (if you don't have one)
solana-keygen new --outfile %USERPROFILE%\.config\solana\id.json

# Get your wallet address
solana address

# Request airdrop (free SOL for devnet testing)
solana airdrop 2
```

## Step 6: Install Anchor Framework

```powershell
# Install Anchor Version Manager (AVM)
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Install latest Anchor version
avm install latest

# Use latest version
avm use latest

# Verify installation
anchor --version
```

**Note:** If you encounter compilation errors, ensure Visual Studio Build Tools are installed (Step 4).

## Step 7: Set Up Database

### Option A: PostgreSQL (Local Installation)

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Ensure PostgreSQL service is running:
   ```powershell
   # Check if PostgreSQL service is running
   Get-Service -Name postgresql*
   ```

5. Create database and run schema:
   ```powershell
   # Navigate to project root
   cd C:\Users\<YourUsername>\Documents\Hackathon\BadgerBuildFest
   
   # Create database (you may be prompted for password)
   createdb -U postgres credential_verification
   
   # Run schema
   psql -U postgres -d credential_verification -f database\schema.sql
   ```

### Option B: Supabase (Easier for Windows)

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Sign in
3. Create a new project
4. Wait for project to initialize
5. Go to **SQL Editor**
6. Open `database\schema.sql` in a text editor
7. Copy entire contents and paste into Supabase SQL Editor
8. Click **Run**
9. Get connection string:
   - Go to **Settings** → **Database**
   - Copy the connection string (URI format)
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Step 8: Set Up Solana Program

```powershell
# Navigate to program directory
cd program

# Ensure you're on devnet
solana config set --url devnet

# Build the program
anchor build

# If this is your first time, generate program keypair
anchor keys list

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Note the Program ID from the output
# You'll need this for backend/.env
```

**If deployment fails:**
- Check your SOL balance: `solana balance`
- Request airdrop: `solana airdrop 2`
- Ensure you have enough SOL (deployment costs ~1-2 SOL on devnet)

## Step 9: Configure Backend

```powershell
# Navigate to backend directory
cd ..\backend

# Install dependencies
npm install

# Create .env file
# You can use Notepad or any text editor
notepad .env
```

Add the following to `.env`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
# Option 1: Local PostgreSQL
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/credential_verification

# Option 2: Supabase (replace with your connection string)
# DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Solana Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet
ANCHOR_PROGRAM_ID=YOUR_PROGRAM_ID_FROM_ANCHOR_DEPLOY

# JWT Secret (generate a random string)
JWT_SECRET=your-secret-key-change-in-production

# Wallet Configuration
ALLOWED_WALLETS=phantom,solflare,gemini
```

Save and close the file.

## Step 10: Set Up Frontend

```powershell
# Navigate to frontend directory
cd ..\frontend

# Install dependencies
npm install

# Create .env.local (optional, for API URL customization)
notepad .env.local
```

Add to `.env.local` (optional):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Step 11: Start Development Servers

### Terminal 1: Backend

```powershell
cd backend
npm run dev
```

You should see:
```
Server running on port 3001
Database connected successfully
```

### Terminal 2: Frontend

```powershell
cd frontend
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Step 12: Access the Application

1. Open your browser
2. Navigate to `http://localhost:3000`
3. Install a Solana wallet extension:
   - [Phantom](https://phantom.app/) (recommended)
   - [Solflare](https://solflare.com/)
4. Connect your wallet
5. Start using the platform!

## Windows-Specific Troubleshooting

### Issue: "solana: command not found"

**Solution:**
1. Restart PowerShell after installing Solana
2. Verify PATH: `$env:Path -split ';' | Select-String solana`
3. Manually add to PATH:
   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\.local\share\solana\install\active_release\bin", [EnvironmentVariableTarget]::User)
   ```
4. Restart PowerShell

### Issue: Rust compilation errors

**Solution:**
1. Install Visual Studio Build Tools (Step 4)
2. Restart PowerShell after installation
3. Verify Rust installation: `rustc --version`

### Issue: PostgreSQL connection refused

**Solution:**
1. Check if PostgreSQL service is running:
   ```powershell
   Get-Service -Name postgresql*
   ```
2. Start service if stopped:
   ```powershell
   Start-Service -Name postgresql-x64-14  # Adjust version number
   ```
3. Or use Supabase instead (easier for Windows)

### Issue: Port already in use

**Solution:**
```powershell
# Find process using port 3000 or 3001
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: npm install fails

**Solution:**
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again
4. If using Windows Defender, temporarily disable it during installation

### Issue: Anchor build fails

**Solution:**
1. Ensure Rust and Visual Studio Build Tools are installed
2. Check Solana CLI is in PATH
3. Try: `cargo clean` then `anchor build` again
4. Check for Windows-specific path issues (avoid spaces in paths)

## Quick Reference Commands

```powershell
# Check versions
node --version
npm --version
rustc --version
cargo --version
solana --version
anchor --version

# Solana wallet management
solana config get
solana address
solana balance
solana airdrop 2

# Database (if using local PostgreSQL)
psql -U postgres -l  # List databases
psql -U postgres -d credential_verification -c "\dt"  # List tables

# Project commands
cd backend && npm run dev    # Start backend
cd frontend && npm run dev   # Start frontend
cd program && anchor build   # Build Solana program
```

## Additional Resources

- [Solana Docs](https://docs.solana.com/)
- [Anchor Docs](https://www.anchor-lang.com/)
- [Node.js Windows Guide](https://nodejs.org/en/download/package-manager/#windows)
- [Rust Windows Installation](https://forge.rust-lang.org/infra/channel-layout.html)

## Getting Help

If you encounter issues:

1. Check the main [SETUP.md](./SETUP.md) for general troubleshooting
2. Review error messages in PowerShell console
3. Check backend logs in Terminal 1
4. Check browser console (F12) for frontend errors
5. Verify all prerequisites are installed correctly

