import { Router } from 'express';
import { userServiceProxy } from '../services/proxy';
import { authenticateToken } from '../middleware/auth';
import { authLimiter, createLimiter, generalLimiter } from '../middleware/rateLimit';

const router = Router();

// Health check del API Gateway
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'API Gateway',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Aplicar rate limiting específico a rutas de usuarios
router.use('/users/register', createLimiter);
router.use('/users/login', authLimiter);

// Proxy hacia el microservicio de usuarios
router.use('/users', userServiceProxy);

// Ruta protegida de ejemplo
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user
  });
});

export default router;