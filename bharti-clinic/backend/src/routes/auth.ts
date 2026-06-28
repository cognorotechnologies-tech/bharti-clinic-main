import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { generateAdminToken, verifyToken } from '../middleware/auth';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF')) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateAdminToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return res.json({
            token,
            admin: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error in admin login:', error);
        return res.status(500).json({ error: 'Failed to login' });
    }
});

router.post('/refresh', verifyToken, (req, res) => {
    if (!req.admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = generateAdminToken(req.admin);

    return res.json({
        token,
        admin: req.admin,
    });
});

router.post('/logout', (_req, res) => {
    // Stateless JWT logout: client should discard the token
    return res.status(200).json({ message: 'Logged out successfully' });
});

export default router;

