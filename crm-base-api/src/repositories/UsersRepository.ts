import { Repository } from 'typeorm';
import { Users } from '../models/users/Users';

export class UsersRepository extends Repository<Users> {
    async findByEmail(email: string): Promise<Users | null> {
      const user = await this.findOne({ where: { email: email } });
      return user || null;
    }
}