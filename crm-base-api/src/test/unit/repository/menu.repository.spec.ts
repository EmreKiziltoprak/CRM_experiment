import { getRepository, Repository } from 'typeorm'
import { MenuRepository } from '../../../repositories/MenuRepository'
import { Menu } from '../../../models/menus/Menus'

// Mock TypeORM functions and repository
jest.mock('typeorm', () => {
  const actualTypeorm = jest.requireActual('typeorm')
  return {
    ...actualTypeorm,
    getRepository: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(() => () => {}),
    Column: jest.fn(() => () => {}),
    Entity: jest.fn(() => () => {}),
  }
})

describe('MenuRepository', () => {
  let menuRepository: MenuRepository
  let mockRepository: jest.Mocked<Repository<Menu>>

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<Repository<Menu>>
    ;(getRepository as jest.Mock).mockReturnValue(mockRepository) // Set up mock once
    menuRepository = new MenuRepository()
  })

  describe('createMenu', () => {
    it('should create and return a new menu', async () => {
      const menu: Omit<Menu, 'menuId'> = {
        menuName: 'Test Menu',
        href: '/test',
        icon: 'test-icon',
      }

      const createdMenu: Menu = {
        menuId: 1,
        ...menu,
      }

      mockRepository.save.mockResolvedValue(createdMenu)

      const result = await menuRepository.createMenu(menu)

      expect(result).toEqual(createdMenu)
      expect(mockRepository.save).toHaveBeenCalledWith(menu)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if menu creation fails', async () => {
      const menu: Omit<Menu, 'menuId'> = {
        menuName: 'Test Menu',
        href: '/test',
        icon: 'test-icon',
      }

      const error = new Error('Creation failed')
      mockRepository.save.mockRejectedValue(error)

      await expect(menuRepository.createMenu(menu)).rejects.toThrow(
        'Creation failed',
      )
      expect(mockRepository.save).toHaveBeenCalledWith(menu)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateMenu', () => {
    it('should update and return the updated menu', async () => {
      const menuId = 1
      const menuUpdate: Partial<Menu> = {
        menuName: 'Updated Menu',
      }

      const updatedMenu: Menu = {
        menuId,
        menuName: 'Updated Menu',
        href: '/test',
        icon: 'test-icon',
      }

      mockRepository.update.mockResolvedValue({ affected: 1 } as any)
      mockRepository.findOne.mockResolvedValue(updatedMenu)

      const result = await menuRepository.updateMenu(menuId, menuUpdate)

      expect(result).toEqual(updatedMenu)
      expect(mockRepository.update).toHaveBeenCalledWith(menuId, menuUpdate)
      expect(mockRepository.update).toHaveBeenCalledTimes(1)
      expect(mockRepository.findOne).toHaveBeenCalledWith(menuId)
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the menu to update is not found', async () => {
      const menuId = 1
      const menuUpdate: Partial<Menu> = {
        menuName: 'Updated Menu',
      }

      mockRepository.update.mockResolvedValue({ affected: 0 } as any)

      await expect(
        menuRepository.updateMenu(menuId, menuUpdate),
      ).rejects.toThrow(`Failed to update menu with ID ${menuId}`)
      expect(mockRepository.update).toHaveBeenCalledWith(menuId, menuUpdate)
      expect(mockRepository.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('deleteMenu', () => {
    it('should delete the menu by ID', async () => {
      const menuId = 1

      mockRepository.delete.mockResolvedValue({ affected: 1 } as any)

      await menuRepository.deleteMenu(menuId)

      expect(mockRepository.delete).toHaveBeenCalledWith(menuId)
      expect(mockRepository.delete).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if menu deletion fails', async () => {
      const menuId = 1

      const error = new Error('Deletion failed')
      mockRepository.delete.mockRejectedValue(error)

      await expect(menuRepository.deleteMenu(menuId)).rejects.toThrow(
        'Deletion failed',
      )
      expect(mockRepository.delete).toHaveBeenCalledWith(menuId)
      expect(mockRepository.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('getMenuDetails', () => {
    it('should return menu details if found', async () => {
      const menu: Menu = {
        menuId: 1,
        menuName: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard-icon',
      }

      mockRepository.findOne.mockResolvedValue(menu)

      const result = await menuRepository.getMenuDetails(1)

      expect(result).toBe(menu)
      expect(mockRepository.findOne).toHaveBeenCalledWith(1)
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should return null if menu not found', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      const result = await menuRepository.getMenuDetails(1)

      expect(result).toBeNull()
      expect(mockRepository.findOne).toHaveBeenCalledWith(1)
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    })
  })
})
