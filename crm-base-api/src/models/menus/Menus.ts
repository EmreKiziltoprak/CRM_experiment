import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Represents the RoleMenu entity which links roles with menus.
 */
@Entity({ name: 'role_menus' })
export class RoleMenu {

    /**
     * Primary key, auto-incremented.
     */
    @PrimaryGeneratedColumn({ name: 'role_menu_id' })
    roleMenuId: number;

    /**
     * Foreign key referencing the role.s
     */
    @Column({ name: 'role_id', type: 'int' })
    roleId: number;

    /**
     * Foreign key referencing the menu.
     */
    @Column({ name: 'menu_id', type: 'int' })
    menuId: number;
}

/**
 * Represents the Menu entity which defines application menus.
 */
@Entity({ name: 'menus' })
export class Menu {

    /**
     * Primary key, auto-incremented.
     */
    @PrimaryGeneratedColumn({ name: 'menu_id' })
    menuId: number;

    /**
     * Name of the menu.
     */
    @Column({ name: 'menu_name', length: 100, type: 'varchar' })
    menuName: string;

    /**
     * URL or path the menu links to.
     */
    @Column({ name: 'href', length: 20, type: 'varchar' })
    href: string;

    /**
     * Icon for the menu, stored as long text.
     */
    @Column({ name: 'icon', type: 'longtext' })
    icon: string; 
}