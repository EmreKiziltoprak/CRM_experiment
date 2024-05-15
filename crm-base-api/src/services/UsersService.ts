import * as bcrypt from 'bcrypt';
import { Users } from '../models/users/Users';
import { Service } from 'typedi';
import { UsersRepository } from '../repositories/UsersRepository';

@Service()
export class UsersService {

  constructor(
        private readonly usersRepository: UsersRepository
  ) {}

  async findByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async createUser(userData: Partial<Users>): Promise<void> {
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await this.usersRepository.save({
        ...userData,
        password: hashedPassword,
      });
    } else {
      throw new Error('Password is required');
    }
  }
  
}
