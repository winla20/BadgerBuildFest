# WSL Troubleshooting Guide

Common issues when running the Credential Verification Platform in WSL (Windows Subsystem for Linux).

## Database Connection Issues

### IPv6 Connection Error (`ENETUNREACH`)

**Error:**
```
Error: connect ENETUNREACH 2600:1f13:838:6e03:f30b:ebd0:66a4:e80f:5432
```

**Cause:**
WSL has limited IPv6 support. Supabase connection strings sometimes resolve to IPv6 addresses, which WSL cannot reach.

**Solution:**

1. **Use Supabase hostname instead of IP address:**
   
   Go to Supabase Dashboard → Settings → Database → Connection string
   
   Use the **URI** format with hostname:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
   
   **NOT** the direct IP format:
   ```
   postgresql://postgres:[PASSWORD]@[2600:1f13:...]:5432/postgres  ❌
   ```

2. **Verify your connection string format:**
   
   ✅ **Good (hostname format):**
   ```
   DATABASE_URL=postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
   ```
   
   ❌ **Bad (IPv6 address format):**
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[2600:1f13:838:6e03::]:5432/postgres
   ```

3. **Alternative: Use Supabase Connection Pooling (IPv4):**
   
   Connection pooling uses port 6543 and often works better with IPv4:
   ```
   DATABASE_URL=postgresql://postgres.abcdefghijklmnop:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

4. **Check your .env file:**
   
   ```bash
   # In WSL
   cd backend
   cat .env | grep DATABASE_URL
   ```
   
   Ensure it uses the hostname format shown above.

### How to Get Correct Supabase Connection String

1. Log into [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **Connection string**
5. Select **URI** tab (not Transaction or Session)
6. Copy the connection string
7. It should look like: `postgresql://postgres.xxx:[PASSWORD]@db.xxx.supabase.co:5432/postgres`

## Anchor Version Issues

### Error: `anchor` 0.29.0 is not installed with `avm`

**Solution:**

The quick installation installs the latest Anchor (0.32.1), but the project might specify 0.29.0.

**Option 1: Use installed version (recommended)**
```bash
# Update Anchor.toml to match installed version
cd program
sed -i 's/anchor_version = "0.29.0"/anchor_version = "0.32.1"/' Anchor.toml

# Or manually edit Anchor.toml
nano Anchor.toml
```

**Option 2: Install specific version**
```bash
avm install 0.29.0 --force
avm use 0.29.0
```

## Path Issues

### Working with Windows Filesystem

**Problem:** Files are located at `/mnt/c/Users/...` which can cause path issues.

**Solution:**
- Use WSL paths: `/home/username/` for best performance
- Or keep in Windows filesystem (`/mnt/c/...`) - works but slower
- Use forward slashes in WSL even when accessing Windows files

**Example:**
```bash
# ✅ Good - Use WSL paths
cd ~/BadgerBuildFest

# ✅ Also works - Windows filesystem
cd /mnt/c/Users/happy/Documents/Hackathon/BadgerBuildFest

# ❌ Bad - Backslashes don't work in WSL
cd C:\Users\happy\Documents\Hackathon\BadgerBuildFest
```

## Port Forwarding

### Accessing services from Windows browser

WSL automatically forwards localhost ports, so you can access:
- Frontend: `http://localhost:3000` in Windows browser
- Backend: `http://localhost:3001` in Windows browser

**If ports don't work:**
```bash
# Check if services are listening
netstat -tuln | grep -E '3000|3001'

# Should see:
# tcp 0.0.0.0:3000    LISTEN
# tcp 0.0.0.0:3001    LISTEN
```

## Solana CLI in WSL

### Solana wallet path

In WSL, Solana wallet is located at:
```bash
~/.config/solana/id.json
```

Or full path:
```bash
/home/username/.config/solana/id.json
```

### Check Solana configuration
```bash
solana config get
solana address
solana balance
```

### Airdrop for devnet
```bash
solana airdrop 2
```

## Node.js Version Issues

### Using Node.js installed via Solana quick install

The quick installation installs Node.js v24.10.0+. If you need a different version:

```bash
# Check current version
node --version

# Use nvm if needed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

## File Permissions

### npm install fails with permission errors

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Build Errors

### Rust/Anchor build failures

```bash
# Clean build
cd program
cargo clean
anchor clean
anchor build

# Update Rust
rustup update stable
```

### Missing dependencies

```bash
# Install build essentials
sudo apt update
sudo apt install -y build-essential pkg-config libssl-dev
```

## Quick Reference

### Check all versions
```bash
node --version
npm --version
rustc --version
cargo --version
solana --version
anchor --version
```

### Restart WSL
```powershell
# From Windows PowerShell
wsl --shutdown
wsl
```

### View logs
```bash
# Backend logs
cd backend && npm run dev

# Check database connection
cd backend && node -e "require('./src/config/database').connect().then(() => console.log('OK')).catch(e => console.error(e))"
```

## Getting Help

If issues persist:
1. Check the main [README.md](../README.md) troubleshooting section
2. Review [SETUP_WINDOWS.md](./SETUP_WINDOWS.md) for detailed setup
3. Check Supabase connection string format
4. Ensure all prerequisites are installed correctly
5. Try restarting WSL: `wsl --shutdown` then restart

