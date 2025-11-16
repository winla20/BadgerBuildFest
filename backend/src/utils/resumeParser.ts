import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { v4 as uuidv4 } from 'uuid';
import { CredentialObject } from './hash';

export interface ParsedCredential {
  type: 'education' | 'work' | 'project' | 'certification';
  issuer: string;
  title: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

/**
 * Parse resume file and extract credentials
 */
export const parseResume = async (
  fileBuffer: Buffer,
  filename: string,
  ownerDid: string
): Promise<CredentialObject[]> => {
  let text: string;

  // Extract text based on file type
  if (filename.endsWith('.pdf')) {
    const data = await pdfParse(fileBuffer);
    text = data.text;
  } else if (filename.endsWith('.docx')) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    text = result.value;
  } else if (filename.endsWith('.txt') || filename.endsWith('.md')) {
    text = fileBuffer.toString('utf-8');
  } else {
    throw new Error('Unsupported file format. Supported: PDF, DOCX, TXT, MD');
  }

  // Parse text into credential objects
  const credentials = extractCredentials(text, ownerDid);
  return credentials;
};

/**
 * Extract structured credentials from resume text
 * This is a basic implementation - can be enhanced with NLP/AI
 */
const extractCredentials = (text: string, ownerDid: string): CredentialObject[] => {
  const credentials: CredentialObject[] = [];
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let currentSection = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].toLowerCase();

    // Detect section headers
    if (line.includes('education') || line.includes('academic')) {
      currentSection = 'education';
    } else if (line.includes('experience') || line.includes('work') || line.includes('employment')) {
      currentSection = 'work';
    } else if (line.includes('project')) {
      currentSection = 'project';
    } else if (line.includes('certification') || line.includes('certificate')) {
      currentSection = 'certification';
    } else if (currentSection && (line.match(/\d{4}/) || line.includes('university') || line.includes('college') || line.includes('company'))) {
      // Extract credential from line
      const credential = parseCredentialLine(lines[i], currentSection, ownerDid);
      if (credential) {
        credentials.push(credential);
      }
    }

    i++;
  }

  return credentials;
};

/**
 * Parse a single line into a credential object
 */
const parseCredentialLine = (
  line: string,
  type: string,
  ownerDid: string
): CredentialObject | null => {
  // Extract dates (YYYY-MM-DD or YYYY format)
  const datePattern = /(\d{4}(?:-\d{2}-\d{2})?)/g;
  const dates = line.match(datePattern) || [];

  // Extract institution/company (usually before dates or contains keywords)
  const institutionKeywords = ['university', 'college', 'school', 'company', 'inc', 'ltd', 'corp'];
  const words = line.split(/\s+/);
  let issuer = '';
  
  for (let i = 0; i < words.length; i++) {
    if (institutionKeywords.some(kw => words[i].toLowerCase().includes(kw))) {
      // Capture surrounding words as institution name
      const start = Math.max(0, i - 2);
      const end = Math.min(words.length, i + 3);
      issuer = words.slice(start, end).join(' ');
      break;
    }
  }

  if (!issuer) {
    // Fallback: use first few capitalized words
    const capitalized = words.filter(w => /^[A-Z]/.test(w));
    issuer = capitalized.slice(0, 3).join(' ') || 'Unknown';
  }

  // Extract title/degree (usually after institution or contains keywords)
  const titleKeywords = ['bachelor', 'master', 'phd', 'degree', 'diploma', 'certificate', 'developer', 'engineer', 'manager'];
  let title = '';

  for (const word of words) {
    if (titleKeywords.some(kw => word.toLowerCase().includes(kw))) {
      const idx = words.indexOf(word);
      title = words.slice(Math.max(0, idx - 1), idx + 2).join(' ');
      break;
    }
  }

  if (!title) {
    title = words.slice(0, 4).join(' ');
  }

  const startDate = dates[0] || undefined;
  const endDate = dates[1] || dates[0] || undefined;

  return {
    credential_id: uuidv4(),
    owner_did: ownerDid,
    type: type as any,
    issuer: issuer,
    title: title,
    start_date: startDate,
    end_date: endDate,
  };
};

