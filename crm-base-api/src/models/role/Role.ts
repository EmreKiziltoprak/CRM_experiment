import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {

    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId: number;

    @Column({ name: 'role_name', length: 50, type: 'varchar' })
    roleName: string;
}