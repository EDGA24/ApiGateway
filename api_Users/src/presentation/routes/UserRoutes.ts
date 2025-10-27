import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

export class UserRoutes {
  private router: Router;

  constructor(private userController: UserController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/register', (req, res) => this.userController.register(req, res));
    this.router.post('/login', (req, res) => this.userController.login(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}