import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Users } from '../users/Users'
import { IUserDetails } from './IUserDetails'

@Entity({ name: 'user_details' })
export class UserDetails implements IUserDetails {
  @PrimaryGeneratedColumn({ name: 'detail_id' })
  detailId!: number

  @Column({ name: 'first_name', length: 50, type: 'varchar' })
  firstName!: string

  @Column({ name: 'last_name', length: 50, type: 'varchar' })
  lastName!: string

  @Column({ name: 'language', length: 20, type: 'varchar' })
  language!: string

  @Column({ name: 'date_format', length: 20, type: 'varchar' })
  dateFormat!: string

  @Column({ name: 'phone_number', length: 20, type: 'varchar' })
  phoneNumber!: string

  @Column({ name: 'profile_picture', type: 'text', nullable: true })
  profilePicture?: string

  @OneToOne(() => Users, (user) => user.userDetails)
  @JoinColumn({ name: 'user_id' })
  user!: Users
}
