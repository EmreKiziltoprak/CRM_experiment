import * as bcrypt from 'bcrypt';
import { Users } from '../models/users/Users';
import Container, { Inject, Service } from 'typedi';
import { UsersRepository } from '../repositories/UsersRepository';

@Service() // Decorate the class as a service
export class UsersService {


  constructor(@Inject() public usersRepository: UsersRepository) { }

  async findByEmail(email: string): Promise<Users | null> {
    console.log("find by email");

    return await this.usersRepository.findByEmail(email);
  }

  async createUser(userData: Partial<Users>): Promise<void> {
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await this.usersRepository.createUser(userData as Users);
    } else {
      throw new Error('Password is required');
    }
  }

  
}
