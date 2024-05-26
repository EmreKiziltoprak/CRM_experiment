import { Response } from 'express';
import { UsersService } from '../services/UsersService';
import { Controller, Post, Res, Body, HttpError } from 'routing-controllers';
import { RegisterRequest } from '../models/users/payload/request/RegisterRequest';
import { Inject, Service } from 'typedi';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DatabaseError } from '../errors/customErrors';
import { ValidationError } from '../errors/customErrors/validationError';

@Controller('/users')
@Service()
export class UsersController {

    constructor(@Inject() public userService: UsersService) { }

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
                userId: 1, // Make sure this is handled correctly in your service (e.g., auto-increment)
                username,
                email,
                password: hashedPassword,
                roleId: 1,
            });

            if (!newlyCreatedUser) {
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
                { expiresIn: '1h' }
            );

            return res.json({ token }); 

        } catch (error) {
          debugger;
            // Centralized Error Handling: Let the global error handler take over
           throw error;
        }
    }
}
