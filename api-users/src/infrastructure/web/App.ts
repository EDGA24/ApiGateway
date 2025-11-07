import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { DependencyContainer } from '../container/DependencyContainer';

dotenv.config();

export class App {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3001', 10);
    
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get('/', (req, res) => {
      res.json({ message: 'Users Microservice funcionando' });
    });

    // User routes
    const userRoutes = DependencyContainer.createUserRoutes();
    this.app.use('/api', userRoutes.getRouter());
  }

  async start(): Promise<void> {
    try {
      // Conectar a la base de datos
      await DatabaseConnection.connect();
      
      // Iniciar servidor
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
      });
    } catch (error) {
      console.error('Error iniciando la aplicación:', error);
      process.exit(1);
    }
  }
}