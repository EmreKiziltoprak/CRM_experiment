import * as bcrypt from 'bcrypt'
import { Users } from '../models/users/Users'
import Container, { Inject, Service } from 'typedi'
import { UsersRepository } from '../repositories/UsersRepository'
import { UserInfoResponse } from '../models/users/payload/response/UserInfoResponse'
import { UserDetails } from '../models/userdetails/UserDetails'

/**
 * Service class for managing users.
 * @see {@link UsersService}
 */
@Service() // Decorate the class as a service
export class UsersService {
  /**
   * Creates an instance of UsersService.
   * @param usersRepository - The repository for accessing user data.
   */
  constructor(@Inject() public usersRepository: UsersRepository) {}

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user.
   * @returns A promise that resolves to the user if found, or null if not.
   */
  async findByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findByEmail(email)
  }

  /**
   * Creates a new user.
   * @param userData - The data for the new user, excluding userId and userDetails.
   * @returns A promise that resolves to the newly created user.
   * @throws Will throw an error if the password is not provided or if user creation fails.
   */
  async createUser(
    userData: Omit<Users, 'userId' | 'userDetails'>,
  ): Promise<Users> {
    if (!userData.password) {
      throw new Error('Password is required')
    }

    // Create a complete user object with the provided data
    const user: Omit<Users, 'userId' | 'userDetails'> = { ...userData }

    try {
      const newUser = await this.usersRepository.createUser(user)
      return newUser // Return the newly created user
    } catch (error) {
      // Handle creation errors appropriately (e.g., log the error)
      console.error('Error creating user:', error)
      throw error // Re-throw the error for further handling
    }
  }

  /**
   * Retrieves user information for a given user ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to a UserInfoResponse object if user details are found, or null if not.
   */
  async getUserInfo(userId: number): Promise<UserInfoResponse | null> {
    const userOrDetails =
      await this.usersRepository.findUserDetailsByUserId(userId)

    if (!userOrDetails) {
      return null
    }

    let userInfoResponse

    if (userOrDetails instanceof Users) {
      // If userOrDetails is an instance of Users, return null or handle the case accordingly
      userInfoResponse = {
        firstName: '',
        lastName: '',
        language: '',
        dateFormat: '',
        phoneNumber: '',
        username: userOrDetails.username,
        email: userOrDetails.email,
      }
    } else {
      // If userOrDetails is an instance of UserDetails, construct and return UserInfoResponse
      const userDetails = userOrDetails as UserDetails
      userInfoResponse = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        language: userDetails.language,
        dateFormat: userDetails.dateFormat,
        phoneNumber: userDetails.phoneNumber,
        profilePicture: userDetails.profilePicture,
      }
    }

    return userInfoResponse
  }
}
