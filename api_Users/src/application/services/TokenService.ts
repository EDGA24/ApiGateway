export interface TokenService {
  generateToken(userId: string): Promise<string>;
}