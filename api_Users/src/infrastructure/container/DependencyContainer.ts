// Repositories
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';

// Services
import { BcryptHashService } from '../../infrastructure/services/BcryptHashService';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

// Use Cases
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase';

// Controllers
import { UserController } from '../../presentation/controllers/UserController';

// Routes
import { UserRoutes } from '../../presentation/routes/UserRoutes';

export class DependencyContainer {
  
  static createUserRoutes(): UserRoutes {
    // Repositories
    const userRepository = new MongoUserRepository();
    
    // Services
    const hashService = new BcryptHashService();
    const tokenService = new JwtTokenService();
    
    // Use Cases
    const registerUseCase = new RegisterUserUseCase(userRepository, hashService);
    const loginUseCase = new LoginUserUseCase(userRepository, hashService, tokenService);
    
    // Controller
    const userController = new UserController(registerUseCase, loginUseCase);
    
    // Routes
    return new UserRoutes(userController);
  }
}