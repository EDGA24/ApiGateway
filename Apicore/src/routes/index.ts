import { Router } from 'express';
import { userServiceProxy } from '../services/proxy';
import { authenticateToken } from '../middleware/auth';
import { authLimiter, createLimiter, generalLimiter } from '../middleware/rateLimit';

const router = Router();
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'API Gateway',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


router.use('/auth/register', createLimiter);
router.use('/auth/login', authLimiter);
router.use('/users/create', createLimiter);
// Proxy hacia el servicio de autenticación (login/register)

//router.use('/auth', authServiceProxy);

// Proxy hacia el microservicio de usuarios
router.use('/users', userServiceProxy);



export default router;