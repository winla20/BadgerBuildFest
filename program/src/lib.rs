use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod credential_verification {
    use super::*;

    /// Creates a credential hash commitment on-chain
    pub fn create_credential_commitment(
        ctx: Context<CreateCredentialCommitment>,
        credential_id: String,
        credential_hash: [u8; 32],
    ) -> Result<()> {
        let commitment = &mut ctx.accounts.commitment;
        commitment.credential_id = credential_id;
        commitment.owner_did = ctx.accounts.owner.key();
        commitment.credential_hash = credential_hash;
        commitment.timestamp = Clock::get()?.unix_timestamp;

        msg!("Credential commitment created: {}", commitment.credential_id);
        Ok(())
    }

    /// Creates an institutional attestation for a credential
    pub fn create_attestation(
        ctx: Context<CreateAttestation>,
        credential_id: String,
        credential_hash: [u8; 32],
        signature: [u8; 64],
    ) -> Result<()> {
        // Verify institution is whitelisted
        require!(
            ctx.accounts.institution.is_whitelisted,
            ErrorCode::InstitutionNotWhitelisted
        );

        let attestation = &mut ctx.accounts.attestation;
        attestation.credential_id = credential_id;
        attestation.credential_hash = credential_hash;
        attestation.institution_pubkey = ctx.accounts.institution.key();
        attestation.signature = signature;
        attestation.timestamp = Clock::get()?.unix_timestamp;

        msg!("Attestation created for credential: {}", attestation.credential_id);
        Ok(())
    }

    /// Initialize an institution account (admin only - for MVP)
    pub fn initialize_institution(
        ctx: Context<InitializeInstitution>,
        name: String,
    ) -> Result<()> {
        let institution = &mut ctx.accounts.institution;
        institution.pubkey = ctx.accounts.authority.key();
        institution.name = name;
        institution.is_whitelisted = true;

        msg!("Institution initialized: {}", institution.name);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(credential_id: String)]
pub struct CreateCredentialCommitment<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + CredentialCommitment::LEN,
        seeds = [b"credential", credential_id.as_bytes()],
        bump
    )]
    pub commitment: Account<'info, CredentialCommitment>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(credential_id: String, credential_hash: [u8; 32])]
pub struct CreateAttestation<'info> {
    #[account(
        init,
        payer = institution,
        space = 8 + CredentialAttestation::LEN,
        seeds = [b"attestation", credential_id.as_bytes(), institution.key().as_ref()],
        bump
    )]
    pub attestation: Account<'info, CredentialAttestation>,
    
    #[account(
        mut,
        constraint = institution.is_whitelisted @ ErrorCode::InstitutionNotWhitelisted
    )]
    pub institution: Account<'info, Institution>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeInstitution<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Institution::LEN,
        seeds = [b"institution", authority.key().as_ref()],
        bump
    )]
    pub institution: Account<'info, Institution>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[account]
pub struct CredentialCommitment {
    pub credential_id: String,
    pub owner_did: Pubkey,
    pub credential_hash: [u8; 32],
    pub timestamp: i64,
}

impl CredentialCommitment {
    pub const LEN: usize = 4 + 256 + 32 + 32 + 8; // credential_id (String max 256) + owner + hash + timestamp
}

#[account]
pub struct CredentialAttestation {
    pub credential_id: String,
    pub credential_hash: [u8; 32],
    pub institution_pubkey: Pubkey,
    pub signature: [u8; 64],
    pub timestamp: i64,
}

impl CredentialAttestation {
    pub const LEN: usize = 4 + 256 + 32 + 32 + 64 + 8; // credential_id + hash + institution + signature + timestamp
}

#[account]
pub struct Institution {
    pub pubkey: Pubkey,
    pub name: String,
    pub is_whitelisted: bool,
}

impl Institution {
    pub const LEN: usize = 32 + 4 + 256 + 1; // pubkey + name (String max 256) + is_whitelisted
}

#[error_code]
pub enum ErrorCode {
    #[msg("Institution is not whitelisted")]
    InstitutionNotWhitelisted,
}
