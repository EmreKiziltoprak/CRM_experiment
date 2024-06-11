import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { IUsers } from './IUsers'
import { UserDetails } from '../userdetails/UserDetails'

@Entity({ name: 'user' })
export class Users implements IUsers {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId!: number

  @Column({ name: 'username', length: 50, unique: true, type: 'varchar' })
  username!: string

  @Column({ name: 'email', length: 100, unique: true, type: 'varchar' })
  email!: string

  @Column({ name: 'password', length: 100, type: 'varchar' })
  password!: string

  @Column({ name: 'role_id', type: 'int' })
  roleId!: number

  @OneToOne(() => UserDetails, (details) => details.user)
  userDetails!: UserDetails
}
