import { Response } from 'express';
import { UsersService } from '../services/UsersService';
import { Controller, Post, Res, Body } from 'routing-controllers';
import { RegisterRequest } from '../models/users/payload/request/RegisterRequest';
import { Inject, Service } from 'typedi';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from '../errors/customErrors';

@Controller('/users')
@Service()
export class UsersController {

  constructor(@Inject() public userService: UsersService) { }

  @Post('/register')
  async register(@Body() body: RegisterRequest, @Res() res: Response): Promise<any> {
    try {
      const { username, email, password } = body;

      const user = await this.userService.findByEmail(email);
      if (user) {
        throw new ValidationError('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newlyCreatedUser = await this.userService.createUser({
        userId: 1,
        username,
        email,
        password: hashedPassword,
        roleId: 1,
      });

      if (!newlyCreatedUser) {
        throw new DatabaseError('User creation failed');
      }

      const token = jwt.sign(
        {
          userId: newlyCreatedUser.userId,
          username: newlyCreatedUser.username,
          email: newlyCreatedUser.email,
        },
        "JWT_SECRET",
        { expiresIn: '1h' }
      );

      return { token: token };

    } catch (error) {
      // Handle custom errors and send appropriate response
      if (error instanceof UnauthorizedError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else if (error instanceof DatabaseError || error instanceof NotFoundError || error instanceof ValidationError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      // Handle other errors using default error handling mechanism
      return res.status(500).json({
        message: 'User registration failed',
        error: (error as Error).message,
      });
    }
  }
}
