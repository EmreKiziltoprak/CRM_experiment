import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';
import { Controller, Post, Res, Body, HttpError, Get, Req } from 'routing-controllers';
import { RegisterRequest } from '../models/users/payload/request/RegisterRequest';
import { Inject, Service } from 'typedi';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DatabaseError, NotFoundError, UnauthorizedError } from '../errors/customErrors';
import { ValidationError } from '../errors/customErrors/validationError';
import { LoginRequest } from '../models/users/payload/request/LoginRequest';
import { sendSuccessResponse } from '../successResponse/success';

/**
 * Controller responsible for handling user-related endpoints.
 * @see {@link UsersController}
 */
@Controller('/users')
@Service()
export class UsersController {

    /**
     * Creates an instance of UsersController.
     * @param {UsersService} userService - The user service instance for handling user-related operations.
     */
    constructor(@Inject() public userService: UsersService) { }

    /**
     * Registers a new user.
     * @param {RegisterRequest} body - The request body containing user registration information.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the authentication token if registration is successful.
     * @throws {ValidationError} Throws a validation error if the user with the provided email already exists.
     * @throws {HttpError} Throws an HTTP error if the user creation fails for reasons other than a database error.
     */
    @Post('/register')
    async register(@Body() body: RegisterRequest, @Res() res: Response): Promise<any> {
        const { username, email, password } = body;

        try {
            const user = await this.userService.findByEmail(email);
            if (user) {
                throw new ValidationError('User with this email already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newlyCreatedUser = await this.userService.createUser({
                username,
                email,
                password: hashedPassword,
                roleId: 1, // Assuming roleId is required
            });

            if (newlyCreatedUser === undefined) { // Check if newlyCreatedUser is undefined
                // Consider a more specific error here if the creation fails for a reason other than a database error
                throw new HttpError(500, 'Failed to create user'); 
            }

            const token = jwt.sign(
                {
                    userId: newlyCreatedUser.userId,
                    username: newlyCreatedUser.username,
                    email: newlyCreatedUser.email,
                },
                "JWT_SECRET", // Replace with environment variable or secure configuration
                { expiresIn: '1d' }
            );

            return sendSuccessResponse(res, { token }, 'User registered successfully', 201);

        } catch (error) {
        debugger;
            // Centralized Error Handling: Let the global error handler take over
        throw error;
        }
    }



    /**
     * Logs in a user.
     * @param {LoginRequest} body - The request body containing user login information.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the authentication token if login is successful.
     * @throws {UnauthorizedError} Throws an unauthorized error if the provided credentials are invalid.
     * @throws {HttpError} Throws an HTTP error if an unexpected error occurs during login.
     */
    @Post('/login')
    async login(@Body() body: LoginRequest, @Res() res: Response): Promise<any> {
        
        const { email, password } = body;

        try {
            // Find user by email
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new UnauthorizedError('Invalid credentials');
            }

            // Compare provided password with stored hash
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new UnauthorizedError('Invalid credentials');
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    userId: user.userId,
                    username: user.username,
                    email: user.email,
                },
                process.env.JWT_SECRET || 'default_secret', // Use environment variable or fallback to default
                { expiresIn: '1d' }
            );

            // Send token to client
            return sendSuccessResponse(res, { token }, 'User login successfully', 200);

        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves information about the currently authenticated user.
     * @param {Request} req - The request object containing the authorization header.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the user's information if retrieval is successful.
     * @throws {UnauthorizedError} Throws an unauthorized error if the token is missing or invalid.
     * @throws {NotFoundError} Throws a not found error if the user details are not found.
     * @throws {HttpError} Throws an HTTP error if an unexpected error occurs during retrieval.
     * @see {@link UsersService#getUserInfo}
     */
    @Get('/info')
    async getUserInfo(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new UnauthorizedError('Token is required');
            }

            let userId;
            try {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
                userId = decoded.userId;
            } catch (error) {
                throw new UnauthorizedError('Invalid token');
            }

    
            const userInfo = await this.userService.getUserInfo(userId);


            if (!userInfo) {
                throw new NotFoundError('User details not found');
            }

            return sendSuccessResponse(res, userInfo, 'User details retrieved successfully', 200);

        } catch (error) {
            throw error;
        }
    }

}
