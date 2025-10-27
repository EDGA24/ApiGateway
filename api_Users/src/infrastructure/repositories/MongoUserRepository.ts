import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserModel, UserDocument } from '../database/models/UserModel';

export class MongoUserRepository implements UserRepository {
  
  async save(user: User): Promise<User> {
    const userDocument = new UserModel({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    });

    const savedDocument = await userDocument.save();
    return this.toDomainEntity(savedDocument);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ email: email.toLowerCase() });
    if (!userDocument) return null;
    
    return this.toDomainEntity(userDocument);
  }

  private toDomainEntity(userDocument: UserDocument): User {
    return new User({
      id: userDocument._id,
      name: userDocument.name,
      email: userDocument.email,
      password: userDocument.password
    });
  }
}