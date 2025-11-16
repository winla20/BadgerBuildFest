# Technical Product Specification
## Decentralized Resume & Credential Verification Platform

---

## 1. Overview
This document defines the Minimum Viable Product (MVP) technical specifications for a blockchain-based identity, resume, and credential verification platform leveraging:
- **Gemini Wallet (or any MPC-based identity wallet)** for user DID and private key management
- **Solana smart contracts** for credential commitments and institutional attestations
- **Off-chain data processing** for resume parsing and credential storage
- **On-chain verification portal** for employers and third parties

The platform enables users to upload resumes, extract verifiable credentials, request verification from universities/employers, and allow third parties to independently validate those credentials through on-chain proofs.

---

## 2. System Architecture
### Components
1. **Frontend Web Client**
2. **Backend API Service**
3. **Solana Program (Smart Contract)**
4. **Database (PostgreSQL / Supabase)**
5. **Gemini Wallet Integration Layer**
6. **Institution Registrar Verification Portal**
7. **Public Credential Verification Portal**

### High-Level Architecture Flow
1. User logs in and connects wallet.
2. User uploads resume → backend parses into credential objects.
3. Credential objects are hashed → commitments stored on Solana.
4. Institutions access a portal to sign/attest credentials.
5. Employers validate credentials by fetching on-chain attestations.

---

## 3. User Identity & Authentication
### 3.1 Authentication Methods
- Wallet-based authentication (Gemini Wallet / Phantom / Solflare)
- Non-custodial—private keys remain with user

### 3.2 DID Specification
Each user is represented by a DID derived from a Solana keypair:
```
did:sol:<base58-public-key>
```

### 3.3 Wallet Actions Required
- Sign login challenge (nonce)
- Sign credential hash publication transactions
- Authorize employer verification requests (optional)

---

## 4. Resume Parsing Module
### 4.1 Input
- PDF, DOCX, or text resume

### 4.2 Processing Steps
1. Convert file → text
2. Section identification (Education, Experience, Certifications, Projects)
3. Generate structured credential objects

### 4.3 Credential Object Format
```
{
  "credential_id": "uuid",
  "owner_did": "did:sol:abc123",
  "type": "education | work | project | certification",
  "issuer": "UW–Madison",
  "title": "B.S. Computer Science",
  "start_date": "2021-09-01",
  "end_date": "2025-05-30"
}
```

### 4.4 Hash Commit Generation
Hash computed as:
```
SHA256(JSON.stringify(credential_object))
```

Stored on-chain as a **commitment**.

---

## 5. Solana Program Specification
### 5.1 Program Responsibilities
1. Store credential hash commitments
2. Store institutional attestations
3. Link attestations to credential IDs and user DIDs
4. Provide metadata for verification portal

### 5.2 Data Structures
#### CredentialCommitment
```
struct CredentialCommitment {
    credential_id: String,
    owner_did: Pubkey,
    credential_hash: [u8; 32],
    timestamp: i64
}
```

#### CredentialAttestation
```
struct CredentialAttestation {
    credential_id: String,
    credential_hash: [u8; 32],
    institution_pubkey: Pubkey,
    signature: [u8; 64],
    timestamp: i64
}
```

### 5.3 Smart Contract Instructions
1. **create_credential_commitment**
2. **create_attestation** (institution only)
3. **verify_attestation** (read-only)

### 5.4 Access Control
- Users may create commitments for their own DID only.
- Institutions may sign attestations only from whitelisted public keys.

---

## 6. Database Layout
### Tables
- **users** (wallet address, DID, profile metadata)
- **credentials** (full JSON credential object, mapped to on-chain hash)
- **institutions** (public key, metadata, registrar users)
- **verification_requests** (tracking status)

### Off-chain storage rationale
- Full credential text stays off-chain for privacy and flexibility
- Hash stored on-chain ensures tamper-evidence

---

## 7. Institution Verification Portal
### 7.1 Flow
1. Registrar logs in using institution-issued account
2. Views pending verification requests
3. For each request:
   - Reads credential object
   - Confirms authenticity from SIS
   - Clicks **Sign**
4. Portal signs credential hash using institution private key
5. Sends attestation to Solana program

### 7.2 Required Functionality
- Institution admin login + role-based access
- Credential review UI
- Attestation signing interface
- On-chain publishing of signatures

---

## 8. Public Verification Portal
### 8.1 Input
- Credential ID
- User DID

### 8.2 Verification Steps
1. Fetch off-chain credential JSON
2. Compute hash → compare with on-chain commitment
3. Fetch attestation → verify signature
4. Validate:
   - Credential belongs to DID
   - Attestation signed by whitelisted institution

### 8.3 Output
- Verification status: **VERIFIED**, **NOT VERIFIED**, or **NO ATTESTATION**
- Attestation metadata and timestamp

---

## 9. MVP Scope Limitations
### Not included in MVP
- Zero-knowledge proofs
- Full SIS integration (manual registrar lookup only)
- Staking, tokens, or incentives
- Mobile app
- Automatic employer sharing permissions
- Multi-chain identity support
- Decentralized credential revocation registry

---

## 10. Non-Functional Requirements
### 10.1 Performance
- On-chain writes under 2s
- Resume parsing under 10s

### 10.2 Security
- All wallet interactions via secure signatures
- All institutional keys stored HSM-side (or simulated for MVP)
- Hashes prevent resume content tampering

### 10.3 Privacy
- Off-chain storage encrypted at rest
- Only hashes stored on-chain

### 10.4 Reliability
- System must tolerate occasional RPC node failure

---

## 11. MVP Completion Criteria
1. Users can connect a wallet and create a DID identity.
2. Users can upload resumes → parsed into structured credential objects.
3. Credential hash commitments are stored on Solana.
4. Institutions can sign credentials and publish attestations.
5. Employer-facing portal can validate credentials successfully.

---

## 12. Future Extensions (Post-MVP)
- Zero-knowledge grade or degree proofs
- Automated SIS integration hooks
- Employer hiring tools
- AI-based skill graph extraction
- Tokenized incentives for validation
- Cross-university verification federation

