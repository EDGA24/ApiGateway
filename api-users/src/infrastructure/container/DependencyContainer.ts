// Repositories
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';

// Use Cases
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { GetUserByEmailUseCase } from '../../application/use-cases/GetUserByEmailUseCase';
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
    
    // Use Cases
    const createUserUseCase = new CreateUserUseCase(
      userRepository
    );

    const getUserByIdUseCase = new GetUserByIdUseCase(
      userRepository
    );

    const getUserByEmailUseCase = new GetUserByEmailUseCase(
      userRepository
    );

    const updateUserByIdUseCase = new UpdateUserByIdUseCase(
      userRepository
    );

    const deleteUserByIdUseCase = new DeleteUserByIdUseCase(
      userRepository
    );

    // Controller con todos los casos de uso
    const userController = new UserController(
      createUserUseCase,
      getUserByIdUseCase,
      getUserByEmailUseCase,
      updateUserByIdUseCase,
      deleteUserByIdUseCase
    );
    
    // Routes
    return new UserRoutes(userController);
  }
}