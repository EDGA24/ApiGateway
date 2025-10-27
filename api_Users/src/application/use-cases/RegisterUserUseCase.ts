import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { HashService } from '../services/HashService';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  async execute(request: RegisterRequest): Promise<User> {
    // Verificar si usuario existe
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Hash de la contraseña
    const hashedPassword = await this.hashService.hash(request.password);

    // Crear usuario
    const user = new User({
      name: request.name,
      email: request.email,
      password: hashedPassword
    });

    // Guardar usuario
    return await this.userRepository.save(user);
  }
}