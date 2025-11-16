import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/database';
import authRoutes from './routes/auth';
import credentialRoutes from './routes/credentials';
import resumeRoutes from './routes/resume';
import verificationRoutes from './routes/verification';
import institutionRoutes from './routes/institution';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/institution', institutionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize database connection
db.connect()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

