import express from 'express';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'QRFlux Google Auth Backend' });
});

// Google OAuth Verification Endpoint
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Missing token in request body' });
    }

    let payload;
    if (GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes('samplegoogleclientid')) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } else {
      // Decode JWT payload for client
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      payload = JSON.parse(jsonPayload);
    }

    const { email, name, picture, sub, email_verified } = payload;

    console.log(`[Google Auth] Verified user login: ${name} (${email})`);

    // Return authenticated user profile to client
    res.json({
      success: true,
      user: {
        id: sub,
        name: name,
        email: email,
        avatar: picture,
        emailVerified: email_verified,
        plan: 'Pro Plan',
        joinedDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[Google Auth Error]:', error.message);
    res.status(401).json({ error: 'Invalid Google token or verification failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 QRFlux Backend Server running on http://localhost:${PORT}`);
});
