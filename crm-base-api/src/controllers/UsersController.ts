import { Response } from 'express';
import { UsersService } from '../services/UsersService';
import { Controller, Post, Res, Body, Get, QueryParams } from 'routing-controllers'; // Import Inject decorator
import { RegisterRequest } from '../models/users/payload/request/RegisterRequest';
import Container, { Inject, Service } from 'typedi';
import { UsersRepository } from '../repositories/UsersRepository';

@Controller('/users')
@Service()
export class UsersController {


  /*   public userService: UsersService = Container.get(UsersService)
   */

  constructor(@Inject() public userService: UsersService) { }


  @Get('/am') async aa(@QueryParams() query: any, @Res() res: Response): Promise<any> { }

  @Post('/register')
  async register(@Body() body: RegisterRequest, @Res() res: Response): Promise<any> {

    const { username, email, password } = body;

    try {
      const user = await this.userService.findByEmail(email);
      if (user) {
        return res.status(400).json({
          message: 'User with this email already exists',
        });
      }
      debugger

      await this.userService.createUser({
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
