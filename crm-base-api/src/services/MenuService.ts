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
    try {
      const menu = await this.menuRepository.getMenuDetails(menuId)
      return menu || null
    } catch (error) {
      console.error(`Error retrieving menu details for ID ${menuId}:`, error)
      throw error // Optionally, handle or rethrow the error as needed
    }
  }
}
