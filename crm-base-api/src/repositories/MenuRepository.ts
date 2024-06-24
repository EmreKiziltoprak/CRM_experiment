import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Service } from 'typedi';
import { Menu, RoleMenu } from '../models/menus/Menus';

/**
 * Repository class for managing menu data.
 */
@Service()
@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {

  private roleMenuRepository: Repository<RoleMenu>;

  /**
   * Creates an instance of MenuRepository.
   */
  constructor() {
    super();
    this.roleMenuRepository = getRepository(RoleMenu);
  }

  /**
   * Returns menus related to a specific role.
   * @param roleId - The ID of the role.
   * @returns A promise that resolves to an array of menus.
   */
  async findMenusByRoleId(roleId: number): Promise<Menu[]> {
    const roleMenus = await this.roleMenuRepository.find({ where: { roleId } });
    const menuIds = roleMenus.map(roleMenu => roleMenu.menuId);
    return await this.findByIds(menuIds);
  }

  /**
   * Creates a new menu.
   * @param menu - The data for the new menu.
   * @returns A promise that resolves to the newly created menu.
   * @throws Will throw an error if menu creation fails.
   */
  async createMenu(menu: Omit<Menu, 'menuId'>): Promise<Menu> {
    try {
      const newMenu = await this.save(menu);
      return newMenu; // Return the newly created menu
    } catch (error) {
      // Handle creation errors appropriately (e.g., log the error)
      console.error('Error creating menu:', error);
      throw error; // Re-throw the error for further handling
    }
  }

  /**
   * Updates a menu by ID.
   * @param menuId - The ID of the menu to update.
   * @param menu - The updated menu data.
   * @returns A promise that resolves to the updated menu.
   * @throws Will throw an error if menu update fails.
   */
  async updateMenu(menuId: number, menu: Partial<Menu>): Promise<Menu> {
    try {
      await this.update(menuId, menu);
      return await this.findOne(menuId);
    } catch (error) {
      // Handle update errors appropriately (e.g., log the error)
      console.error('Error updating menu:', error);
      throw error; // Re-throw the error for further handling
    }
  }

  /**
   * Deletes a menu by ID.
   * @param menuId - The ID of the menu to delete.
   * @returns A promise that resolves when the menu is deleted.
   * @throws Will throw an error if menu deletion fails.
   */
  async deleteMenu(menuId: number): Promise<void> {
    try {
      await this.delete(menuId);
    } catch (error) {
      // Handle deletion errors appropriately (e.g., log the error)
      console.error('Error deleting menu:', error);
      throw error; // Re-throw the error for further handling
    }
  }
}
