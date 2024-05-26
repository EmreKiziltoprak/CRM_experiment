import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Users } from '../models/users/Users';
import { Service } from 'typedi';

@Service()
export class UsersRepository {

  private repository: Repository<Users>

  constructor() {
    this.repository = getRepository(Users)
  }

  async findByEmail(email: string): Promise<Users | null> {

    const user = await this.repository.findOne({ where: { email: email } });
    return user || null;
  }

  async createUser(user: Users) {
    debugger;
    const saveUser = this.repository.create(user)
    return this.repository.save(saveUser)
  }

}



