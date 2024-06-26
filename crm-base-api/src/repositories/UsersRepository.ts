import { EntityRepository, Repository, getRepository } from 'typeorm'
import { Users } from '../models/users/Users'
import { Service } from 'typedi'
import { UserDetails } from '../models/userdetails/UserDetails'

/**
 * Repository class for managing user data.
 * @see {@link UsersRepository}
 */
@Service()
export class UsersRepository {
  private repository: Repository<Users>

  /**
   * Creates an instance of UsersRepository.
   */
  constructor() {
    this.repository = getRepository(Users)
  }

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user.
   * @returns A promise that resolves to the user if found, or null if not.
   * @see {@link UsersService#findByEmail}
   */
  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['userDetails'],
    })
    return user || null
  }

  /**
   * Creates a new user.
   * @param user - The data for the new user, excluding userId and userDetails.
   * @returns A promise that resolves to the newly created user.
   * @throws Will throw an error if user creation fails.
   * @see {@link UsersService#createUser}
   */
  async createUser(
    user: Omit<Users, 'userId' | 'userDetails'>,
  ): Promise<Users> {
    try {
      const newUser = await this.repository.save(user)
      return newUser // Return the newly created user
    } catch (error) {
      // Handle creation errors appropriately (e.g., log the error)
      console.error('Error creating user:', error)
      throw error // Re-throw the error for further handling
    }
  }

  /**
   * Finds user details by user ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the user or their details if found, or null if not.
   * @see {@link UsersService#getUserInfo}
   */
  async findUserDetailsByUserId(userId: number): Promise<Users | UserDetails | null> {
    const user = await this.repository.findOne({
      where: { userId }, // Adjust the where condition to match the primary key of Users entity
      relations: ['userDetails'], // Use 'userDetails' instead of 'user_details'
    });

    console.log('userInfo : ', user);

    return user ? (user.userDetails ? user.userDetails : user) : null;
  }
}
