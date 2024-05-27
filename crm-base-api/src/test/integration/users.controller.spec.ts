import { UsersController } from "../../controllers/UsersController";
import { RegisterRequest } from "../../models/users/payload/request/RegisterRequest";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersService } from "../../services/UsersService";
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginRequest } from "../../models/users/payload/request/LoginRequest";
import { UnauthorizedError } from '../../errors/customErrors';
import { ValidationError } from "../../errors/customErrors/validationError";

// Mocking bcrypt.hash function
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockReturnValue('hashedPassword'),
    compare: jest.fn().mockReturnValue(true),
}));

// Mocking jwt.sign function
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('fakeToken'),
}));

// Mocking UsersRepository
jest.mock('../../repositories/UsersRepository');


describe('UsersController', () => {

    let usersController: UsersController;
    let usersService: UsersService;
    let usersRepository: UsersRepository;
    let res: Response;

    beforeEach(() => {
        usersRepository = new UsersRepository();
        usersService = new UsersService(usersRepository);
        usersController = new UsersController(usersService);
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as any;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const registerRequest: RegisterRequest = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };

            // Mocking userService.findByEmail to return null (user doesn't exist)
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

            // Mocking userService.createUser to return a user
            jest.spyOn(usersService, 'createUser').mockResolvedValue({
                userId: 1,
                ...registerRequest,
                roleId: 1,
            });

            await usersController.register(registerRequest, res);

            // Assertions
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
            expect(usersService.createUser).toHaveBeenCalledWith({
                userId: 1,
                ...registerRequest,
                password: 'hashedPassword',
                roleId: 1,
            });
            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    userId: 1,
                    username: 'testuser',
                    email: 'test@example.com',
                },
                'JWT_SECRET',
                { expiresIn: '1d' }
            );
            expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken' });
        });

        it('should throw a ValidationError if user with provided email already exists', async () => {
            const registerRequest: RegisterRequest = {
                username: 'existinguser',
                email: 'existing@example.com',
                password: 'password123',
            };

            // Mocking userService.findByEmail to return an existing user
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
                userId: 1,
                ...registerRequest,
                roleId: 1,
            });

            await expect(usersController.register(registerRequest, res)).rejects.toThrow(ValidationError);

            // Assertions
            expect(usersService.findByEmail).toHaveBeenCalledWith('existing@example.com');
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('login', () => {
        it('should login a user', async () => {
            const loginRequest: LoginRequest = {
                email: 'test@example.com',
                password: 'password123',
            };

            // Mocking userService.findByEmail to return a user
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
                userId: 1,
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                roleId: 1,
            });

            const expectedResult = { token: 'fakeToken' };

            await usersController.login(loginRequest, res);

            // Assertions
            expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    userId: 1,
                    username: 'testuser',
                    email: 'test@example.com',
                },
                'default_secret',
                { expiresIn: '1d' }
            );
            expect(res.json).toHaveBeenCalledWith(expectedResult);
        });

        it('should throw an UnauthorizedError if user with provided email does not exist', async () => {
            const loginRequest: LoginRequest = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            // Mocking userService.findByEmail to return null (user doesn't exist)
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

            try {
                await usersController.login(loginRequest, res);
                throw new Error('Expected function to throw an error');
            } catch (error) {
                // Assert that the error is an instance of UnauthorizedError
                expect(error).toBeInstanceOf(UnauthorizedError);
                // Assert that the error message matches
                expect(error.message).toBe('Unauthorized');
            }
        });

        it('should throw an UnauthorizedError if provided password is incorrect', async () => {
            const loginRequest: LoginRequest = {
                email: 'test@example.com',
                password: 'wrongPassword',
            };

            // Mocking userService.findByEmail to return a user
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue({
                userId: 1,
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                roleId: 1,
            });

            // Mocking bcrypt.compare to return false (password doesn't match)
            (bcrypt.compare as jest.Mock).mockReturnValue(false);

            try {
                await usersController.login(loginRequest, res);
                throw new Error('Expected function to throw an error');
            } catch (error) {
                // Assert that the error is an instance of UnauthorizedError
                expect(error).toBeInstanceOf(UnauthorizedError);
                // Assert that the error message matches
                expect(error.message).toBe('Unauthorized');
            }
        });
        
        
    });


});
