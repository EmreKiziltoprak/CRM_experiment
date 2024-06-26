import { EntityRepository, Repository, getRepository } from 'typeorm'
import { Service } from 'typedi'
import { Menu, RoleMenu } from '../models/menus/Menus'

/**
 * Repository class for managing menu data.
 */
@Service()
export class MenuRepository {
  private menuRepository: Repository<Menu>

  /**
   * Creates an instance of MenuRepository.
   */
  constructor() {
    this.menuRepository = getRepository(Menu)
  }

  /**
   * Creates a new menu.
   * @param menu - The data for the new menu.
   * @returns A promise that resolves to the newly created menu.
   * @throws Will throw an error if menu creation fails.
   */
  async createMenu(menu: Omit<Menu, 'menuId'>): Promise<Menu> {
    try {
      const newMenu = this.menuRepository.save(menu)
      return newMenu // Return the newly created menu
    } catch (error) {
      // Handle creation errors appropriately (e.g., log the error)
      console.error('Error creating menu:', error)
      throw error // Re-throw the error for further handling
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
      const updateResult = await this.menuRepository.update(menuId, menu) // Assuming this.update() returns UpdateResult

      if (updateResult.affected !== 1) {
        throw new Error(`Failed to update menu with ID ${menuId}`)
      }

      const updatedMenu = await this.menuRepository.findOne(menuId) // Assuming this.findOne() returns Menu | undefined

      if (!updatedMenu) {
        throw new Error(`Menu with ID ${menuId} not found after update`)
      }

      return updatedMenu
    } catch (error) {
      console.error('Error updating menu:', error)
      throw error // Re-throw the error for further handling
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
      await this.menuRepository.delete(menuId)
    } catch (error) {
      // Handle deletion errors appropriately (e.g., log the error)
      console.error('Error deleting menu:', error)
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
      const menu = await this.menuRepository.findOne(menuId)
      return menu || null
    } catch (error) {
      console.error(`Error retrieving menu details for ID ${menuId}:`, error)
      throw error // Optionally, handle or rethrow the error as needed
    }
  }
}
