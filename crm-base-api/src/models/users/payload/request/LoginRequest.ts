import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class LoginRequest {
  @IsEmail()
  email!: string

  @IsString()
  @IsNotEmpty()
  password!: string
}
