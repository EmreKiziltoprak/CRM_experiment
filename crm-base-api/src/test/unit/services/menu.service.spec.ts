import { Menu } from '../../../models/menus/Menus'
import { MenuRepository } from '../../../repositories/MenuRepository'
import { MenusService } from '../../../services/MenuService'

jest.mock('../../../repositories/MenuRepository')

describe('MenusService', () => {
  let menusService: MenusService
  let menuRepository: jest.Mocked<MenuRepository>

  beforeEach(() => {
    menuRepository = new MenuRepository() as jest.Mocked<MenuRepository>
    menusService = new MenusService(menuRepository)
  })

  describe('createMenu', () => {
    it('should create and return a new menu', async () => {
      const menuData: Omit<Menu, 'menuId'> = {
        menuName: 'New Menu',
        href: '/new-menu',
        icon: 'new-menu-icon',
      }
      const createdMenu: Menu = { menuId: 1, ...menuData }

      menuRepository.createMenu.mockResolvedValue(createdMenu)

      const result = await menusService.createMenu(menuData)

      expect(result).toBe(createdMenu)
      expect(menuRepository.createMenu).toHaveBeenCalledWith(menuData)
      expect(menuRepository.createMenu).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if menu creation fails', async () => {
      const menuData: Omit<Menu, 'menuId'> = {
        menuName: 'New Menu',
        href: '/new-menu',
        icon: 'new-menu-icon',
      }
      const error = new Error('Creation failed')

      menuRepository.createMenu.mockRejectedValue(error)

      await expect(menusService.createMenu(menuData)).rejects.toThrow(
        'Creation failed',
      )
      expect(menuRepository.createMenu).toHaveBeenCalledWith(menuData)
      expect(menuRepository.createMenu).toHaveBeenCalledTimes(1)
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

      menuRepository.getMenuDetails.mockResolvedValue(menu) // Adjusted to mock getMenuDetails

      const result = await menusService.getMenuDetails(1)

      expect(result).toBe(menu)
      expect(menuRepository.getMenuDetails).toHaveBeenCalledWith(1) // Adjusted to use getMenuDetails
      expect(menuRepository.getMenuDetails).toHaveBeenCalledTimes(1) // Adjusted to use getMenuDetails
    })

    it('should return null if menu not found', async () => {
      menuRepository.getMenuDetails.mockResolvedValue(null) // Adjusted to mock getMenuDetails

      const result = await menusService.getMenuDetails(1)

      expect(result).toBeNull()
      expect(menuRepository.getMenuDetails).toHaveBeenCalledWith(1) // Adjusted to use getMenuDetails
      expect(menuRepository.getMenuDetails).toHaveBeenCalledTimes(1) // Adjusted to use getMenuDetails
    })
  })
})
