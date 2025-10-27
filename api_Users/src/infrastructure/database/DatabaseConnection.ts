import mongoose from 'mongoose';

export class DatabaseConnection {
  
  static async connect(): Promise<void> {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/users_simple';
      await mongoose.connect(mongoUri);
      console.log('✅ MongoDB conectado');
    } catch (error) {
      console.error('❌ Error conectando a MongoDB:', error);
      process.exit(1);
    }
  }
}