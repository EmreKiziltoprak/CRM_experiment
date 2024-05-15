import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'username', length: 50, unique: true, type: 'varchar' })
  username!: string;

  @Column({ name: 'email', length: 100, unique: true, type: 'varchar' })
  email!: string;

  @Column({ name: 'password', length: 100, type: 'varchar' })
  password!: string;

  @Column({ name: 'role_id', type: 'int' })
  roleId!: number;
  
}
