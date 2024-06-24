import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  username!: string

  @IsEmail()
  email!: string

  @IsString()
  @IsNotEmpty()
  password!: string
}
