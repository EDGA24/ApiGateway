import { UserRepository } from '../../domain/repositories/UserRepository';
import { HashService } from '../services/HashService';
import { TokenService } from '../services/TokenService';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  token: string;
}

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private tokenService: TokenService
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    // Buscar usuario
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValid = await this.hashService.compare(request.password, user.password);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = await this.tokenService.generateToken(user.id);

    return {
      user: user.toJSON(),
      token
    };
  }
}