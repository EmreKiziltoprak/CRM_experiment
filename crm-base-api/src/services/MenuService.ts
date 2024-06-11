import { Service, Inject } from 'typedi'
import { MenuRepository } from '../repositories/MenuRepository'
import { Menu, RoleMenu } from '../models/menus/Menus'

/**
 * Service class for managing menus.
 * @see {@link MenusService}
 */
@Service()
export class MenusService {
  /**
   * Creates an instance of MenusService.
   * @param menuRepository - The repository for accessing menu data.
   */
  constructor(@Inject() public menuRepository: MenuRepository) {}

  /**
   * Finds menus by their role ID.
   * @param roleId - The ID of the role.
   * @returns A promise that resolves to an array of menus if found, or an empty array if not.
   */
  async findMenusByRoleId(roleId: number): Promise<Menu[]> {
    return await this.menuRepository.findMenusByRoleId(roleId)
  }

  /**
   * Creates a new menu.
   * @param menuData - The data for the new menu, excluding menuId.
   * @returns A promise that resolves to the newly created menu.
   * @throws Will throw an error if menu creation fails.
   */
  async createMenu(menuData: Omit<Menu, 'menuId'>): Promise<Menu> {
    try {
      const newMenu = await this.menuRepository.createMenu(menuData)
      return newMenu // Return the newly created menu
    } catch (error) {
      // Handle creation errors appropriately (e.g., log the error)
      console.error('Error creating menu:', error)
      throw error // Re-throw the error for further handling
    }
  }

  /**
   * Retrieves menu details for a given menu ID.
   * @param menuId - The ID of the menu.
   * @returns A promise that resolves to a Menu object if found, or null if not.
   */
  async getMenuDetails(menuId: number): Promise<Menu | null> {
    const menu = await this.menuRepository.findOne(menuId)
    return menu || null
  }
}
