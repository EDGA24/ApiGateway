import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase.js';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase.js';

export class UserController {
  constructor(
    private registerUseCase: RegisterUserUseCase,
    private loginUseCase: LoginUserUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
      }

      const user = await this.registerUseCase.execute({ name, email, password });
      
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: user.toJSON()
      });

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        return;
      }

      const result = await this.loginUseCase.execute({ email, password });
      
      res.json({
        message: 'Login exitoso',
        user: result.user,
        token: result.token
      });

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}