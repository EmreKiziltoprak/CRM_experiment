import { Response } from 'express';
import { UsersService } from '../services/UsersService';
import { Controller, Post, Res, Body } from 'routing-controllers';
import { RegisterRequest } from '../models/users/payload/request/RegisterRequest';

@Controller('/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() body: RegisterRequest, @Res() res: Response) {
    const { username, email, password } = body;

    try {
      console.log("UsersController findByEmail")
      const user = await this.usersService.findByEmail(email);
      if (user) {
        return res.status(400).json({
          message: 'User with this email already exists',
        });
      }

      await this.usersService.createUser({
        username: username,
        email: email,
        password: password,
        roleId: 1, // Assuming role 1 is for regular users
      });

      return res.status(201).json({
        message: 'User registered successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'User registration failed',
        error: (error as Error).message,
      });
    }
  }
}
