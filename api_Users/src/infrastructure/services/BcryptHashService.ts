import bcrypt from 'bcryptjs';
import { HashService } from '../../application/services/HashService';

export class BcryptHashService implements HashService {
  
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}