import { IUsers } from '../users/IUsers'

export interface IUserDetails {
  detailId: number
  firstName: string
  lastName: string
  language: string
  dateFormat: string
  phoneNumber: string
  profilePicture?: string
  user: IUsers // Reference to the user
}
