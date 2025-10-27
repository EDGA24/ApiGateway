import jwt from 'jsonwebtoken';
import { TokenService } from '../../application/services/TokenService';

export class JwtTokenService implements TokenService {
  
  async generateToken(userId: string): Promise<string> {
    const secret = process.env.JWT_SECRET || 'tu_clave_secreta';
    return jwt.sign({ userId }, secret, { expiresIn: '24h' });
  }
}