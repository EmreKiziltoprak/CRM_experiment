import { IUserDetails } from '../userdetails/IUserDetails'

export interface IUsers {
  userId: number
  username: string
  email: string
  password: string
  roleId: number
  userDetails?: IUserDetails // Optional to avoid circular reference issues
}
