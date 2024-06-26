import { getRepository, Repository } from 'typeorm'
import { UsersRepository } from '../../../repositories/UsersRepository'
import { Users } from '../../../models/users/Users'
import { UserDetails } from '../../../models/userdetails/UserDetails'

jest.mock('typeorm', () => {
  const actualTypeorm = jest.requireActual('typeorm')
  return {
    ...actualTypeorm,
    getRepository: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(() => () => {}),
    Column: jest.fn(() => () => {}),
    Entity: jest.fn(() => () => {}),
  }
})

describe('UsersRepository', () => {
  let usersRepository: UsersRepository
  let mockRepository: jest.Mocked<Repository<Users>>

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      findOneOrFail: jest.fn(),
      createQueryBuilder: jest.fn(),
      count: jest.fn(),
      decrement: jest.fn(),
      increment: jest.fn(),
      delete: jest.fn(),
      softDelete: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      softRemove: jest.fn(),
      clear: jest.fn(),
      create: jest.fn(),
      merge: jest.fn(),
      preload: jest.fn(),
      restore: jest.fn(),
      query: jest.fn(),
      findAndCount: jest.fn(),
      saveMany: jest.fn(),
    } as unknown as jest.Mocked<Repository<Users>>
    ;(getRepository as jest.Mock).mockReturnValue(mockRepository)
    usersRepository = new UsersRepository()
  })

  describe('findByEmail', () => {
    it('should return a user if found by email', async () => {
      const userDetails: UserDetails = {
        detailId: 1,
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg',
        user: undefined,
      }

      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1,
        userDetails: userDetails,
      }

      mockRepository.findOne.mockResolvedValue(user)

      const result = await usersRepository.findByEmail('test@example.com')

      expect(result).toBe(user)
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        relations: ['userDetails'],
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should return null if no user is found by email', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      const result = await usersRepository.findByEmail(
        'nonexistent@example.com',
      )

      expect(result).toBeNull()
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
        relations: ['userDetails'],
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const user: Omit<Users, 'userId' | 'userDetails'> = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        roleId: 1,
      }

      const createdUser: Users = {
        userId: 1,
        ...user,
        userDetails: undefined,
      }

      mockRepository.save.mockResolvedValue(createdUser)

      const result = await usersRepository.createUser(user)

      expect(result).toBe(createdUser)
      expect(mockRepository.save).toHaveBeenCalledWith(user)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if user creation fails', async () => {
      const user: Omit<Users, 'userId' | 'userDetails'> = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        roleId: 1,
      }

      const error = new Error('Creation failed')
      mockRepository.save.mockRejectedValue(error)

      await expect(usersRepository.createUser(user)).rejects.toThrow(
        'Creation failed',
      )
      expect(mockRepository.save).toHaveBeenCalledWith(user)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('findUserDetailsByUserId', () => {
    it('should return user details if found by user ID', async () => {
      const userDetails: UserDetails = {
        detailId: 1,
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg',
        user: undefined,
      }

      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1,
        userDetails: userDetails,
      }

      mockRepository.findOne.mockResolvedValue(user)

      const result = await usersRepository.findUserDetailsByUserId(1)

      expect(result).toBe(userDetails)
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1 },
        relations: ['userDetails'],
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should return user if user details are not found', async () => {
      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1,
        userDetails: undefined,
      }

      mockRepository.findOne.mockResolvedValue(user)

      const result = await usersRepository.findUserDetailsByUserId(1)

      expect(result).toBe(user)
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1 },
        relations: ['userDetails'],
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should return null if no user is found by user ID', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      const result = await usersRepository.findUserDetailsByUserId(1)

      expect(result).toBeNull()
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1 },
        relations: ['userDetails'],
      })
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })
})
