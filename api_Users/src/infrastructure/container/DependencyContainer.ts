// Repositories
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';

// Services
import { BcryptHashService } from '../../infrastructure/services/BcryptHashService';
import { JwtTokenService } from '../../infrastructure/services/JwtTokenService';

// Use Cases
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { UpdateUserByIdUseCase } from '../../application/use-cases/UpdateUserByIdUseCase';
import { DeleteUserByIdUseCase } from '../../application/use-cases/DeleteUserByIdUseCase'; 

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
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      hashService
    );

    const getUserByIdUseCase = new GetUserByIdUseCase(
      userRepository 
    );

     const updateUserByIdUseCase = new UpdateUserByIdUseCase(
      userRepository,
      hashService
    );

    const deleteUserByIdUseCase = new DeleteUserByIdUseCase(
      userRepository
    );
    
   
    const userController = new UserController(
      createUserUseCase,
      getUserByIdUseCase,
      updateUserByIdUseCase,
      deleteUserByIdUseCase 
    );
    
    // Routes
    return new UserRoutes(userController);
  }
}