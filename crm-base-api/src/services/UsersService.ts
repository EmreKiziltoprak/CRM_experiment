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

  async createUser(userData: Users): Promise<void | Users> {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    // Create a complete user object with the provided data
    const user = { ...userData };

    try {
      await this.usersRepository.createUser(user);
      return user; // Return the created user object on success
    } catch (error) {
      // Handle creation errors appropriately (e.g., log the error)
      console.error('Error creating user:', error);
      throw error; // Re-throw the error for further handling
    }
  }



}
