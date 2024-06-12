import { UsersController } from '../../controllers/UsersController'
import { RegisterRequest } from '../../models/users/payload/request/RegisterRequest'
import { UsersRepository } from '../../repositories/UsersRepository'
import { UsersService } from '../../services/UsersService'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { LoginRequest } from '../../models/users/payload/request/LoginRequest'
import { NotFoundError, UnauthorizedError } from '../../errors/customErrors'
import { ValidationError } from '../../errors/customErrors/validationError'
import { sendSuccessResponse } from '../../successResponse/success'
import { UserDetails } from '../../models/userdetails/UserDetails'

// Mocking bcrypt.hash function
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockReturnValue('hashedPassword'),
  compare: jest.fn().mockReturnValue(true),
}))

// Mocking jwt.sign function
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('fakeToken'),
  verify: jest.fn().mockReturnValue({ userId: 1 }),
}))

// Mocking UsersRepository
jest.mock('../../repositories/UsersRepository')

jest.mock('../../successResponse/success', () => ({
  sendSuccessResponse: jest.fn(),
}))

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService
  let usersRepository: UsersRepository
  let res: Response
  let req: Request

  beforeEach(() => {
    usersRepository = new UsersRepository()
    usersService = new UsersService(usersRepository)
    usersController = new UsersController(usersService)
    req = {
      headers: {
        authorization: 'Bearer fakeToken',
      },
    } as any
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any

    jest.spyOn(usersService, 'getUserInfo')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register a new user', async () => {
      const registerRequest: RegisterRequest = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      }

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

      // Mocking userService.findByEmail to return null (user doesn't exist)
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null)

      // Mocking userService.createUser to return a user
      jest.spyOn(usersService, 'createUser').mockResolvedValue({
        userId: expect.any(Number),
        ...registerRequest,
        password: 'hashedPassword',
        roleId: expect.any(Number),
        userDetails: userDetails,
      })

      const expectedResult = { token: 'fakeToken' }

      await usersController.register(registerRequest, res)

      // Assertions
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com')
      expect(usersService.createUser).toHaveBeenCalledWith({
        ...registerRequest,
        password: 'hashedPassword',
        roleId: 1,
      })
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          userId: expect.any(Number),
          username: 'testuser',
          email: 'test@example.com',
        },
        'JWT_SECRET',
        { expiresIn: '1d' },
      )

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        expectedResult,
        'User registered successfully',
        201,
      )
    })

    it('should throw a ValidationError if user with provided email already exists', async () => {
      const registerRequest: RegisterRequest = {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123',
      }

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

      // Mocking userService.findByEmail to return an existing user
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        userId: expect.any(Number),
        ...registerRequest,
        roleId: expect.any(Number),
        userDetails: userDetails,
      })

      await expect(
        usersController.register(registerRequest, res),
      ).rejects.toThrow(ValidationError)

      // Assertions
      expect(usersService.findByEmail).toHaveBeenCalledWith(
        'existing@example.com',
      )
      expect(res.json).not.toHaveBeenCalled()
    })
  })

  describe('login', () => {
    it('should login a user', async () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      }

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

      // Mocking userService.findByEmail to return a user
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        userId: expect.any(Number),
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        roleId: expect.any(Number),
        userDetails: userDetails,
      })

      const expectedResult = { token: 'fakeToken' }

      await usersController.login(loginRequest, res)

      // Assertions
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com')
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      )
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          userId: expect.any(Number),
          username: 'testuser',
          email: 'test@example.com',
        },
        'default_secret',
        { expiresIn: '1d' },
      )

      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        expectedResult,
        'User login successfully',
        200,
      )
    })

    it('should throw an UnauthorizedError if user with provided email does not exist', async () => {
      const loginRequest: LoginRequest = {
        email: 'nonexistent@example.com',
        password: 'password123',
      }

      // Mocking userService.findByEmail to return null (user doesn't exist)
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null)

      try {
        await usersController.login(loginRequest, res)
        throw new Error('Expected function to throw an error')
      } catch (error) {
        // Assert that the error is an instance of UnauthorizedError
        expect(error).toBeInstanceOf(UnauthorizedError)
        // Assert that the error message matches
        expect(error.message).toBe('Unauthorized')
      }
    })

    it('should throw an UnauthorizedError if provided password is incorrect', async () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'wrongPassword',
      }

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

      // Mocking userService.findByEmail to return a user
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
        userId: expect.any(Number),
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedPassword',
        roleId: expect.any(Number),
        userDetails: userDetails,
      })

      // Mocking bcrypt.compare to return false (password doesn't match)
      ;(bcrypt.compare as jest.Mock).mockReturnValue(false)

      try {
        await usersController.login(loginRequest, res)
        throw new Error('Expected function to throw an error')
      } catch (error) {
        // Assert that the error is an instance of UnauthorizedError
        expect(error).toBeInstanceOf(UnauthorizedError)
        // Assert that the error message matches
        expect(error.message).toBe('Unauthorized')
      }
    })
  })

  describe('getUserInfo', () => {
    it('should retrieve user information', async () => {
      const userInfo = {
        userId: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        language: 'en',
        dateFormat: 'YYYY-MM-DD',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg',
      }

      // Mocking userService.getUserInfo to return user information
      jest.spyOn(usersService, 'getUserInfo').mockResolvedValue(userInfo)

      await usersController.getUserInfo(req, res)

      // Assertions
      expect(jwt.verify).toHaveBeenCalledWith('fakeToken', 'default_secret')
      expect(usersService.getUserInfo).toHaveBeenCalledWith(1)
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        userInfo,
        'User details retrieved successfully',
        200,
      )
    })

    it('should throw UnauthorizedError if token is missing', async () => {
      req.headers.authorization = undefined

      // Ensure that getUserInfo is not called if the token is missing
      expect(usersService.getUserInfo).not.toHaveBeenCalled()

      await expect(usersController.getUserInfo(req, res)).rejects.toThrow(
        UnauthorizedError,
      )
    })

    it('should throw UnauthorizedError if token is invalid', async () => {
      ;(jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token')
      })

      try {
        await usersController.getUserInfo(req, res)
        throw new Error('Expected function to throw an error')
      } catch (error) {
        // Assert that the error is an instance of UnauthorizedError
        expect(error).toBeInstanceOf(UnauthorizedError)
        // Assert that the error message matches
        expect(error.message).toBe('Unauthorized')
      }
    })

    it('should throw NotFoundError if user information is not found', async () => {
      // Mocking userService.getUserInfo to return null
      jest.spyOn(usersService, 'getUserInfo').mockResolvedValue(null)

      // Mocking jwt.verify to return null (invalid token)
      ;(jwt.verify as jest.Mock).mockReturnValue(null)

      await expect(usersController.getUserInfo(req, res)).rejects.toThrow(
        UnauthorizedError,
      )

      // Assertions
      expect(jwt.verify).toHaveBeenCalledWith('fakeToken', 'default_secret')
    })
  })
})
