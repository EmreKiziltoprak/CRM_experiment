import 'reflect-metadata'
import { HttpError } from 'routing-controllers'
import { DatabaseError, NotFoundError } from '../../errors/customErrors'
import { CreateMenuRequest } from '../../models/menus/payload/request/CreateMenuRequest'
import { sendSuccessResponse } from '../../successResponse/success'
import { MenusService } from '../../services/MenuService'
import { MenusController } from '../../controllers/MenuController'
import { MenuRepository } from '../../repositories/MenuRepository'

// Mocking UsersRepository
jest.mock('../../repositories/MenuRepository')

// Mocking MenusService and related dependencies
jest.mock('../../services/MenuService', () => ({
  MenusService: jest.fn().mockImplementation(() => ({
    createMenu: jest.fn(),
    findMenusByRoleId: jest.fn(),
    getMenuDetails: jest.fn(),
  })),
}))

jest.mock('../../successResponse/success', () => ({
  sendSuccessResponse: jest.fn(),
}))

// Mocking CustomError classes
jest.mock('../../errors/customErrors', () => ({
  UnauthorizedError: class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
      super(message)
      this.name = 'UnauthorizedError'
    }
  },
  DatabaseError: class DatabaseError extends Error {
    constructor(message = 'Database Error') {
      super(message)
      this.name = 'DatabaseError'
    }
  },
  NotFoundError: class NotFoundError extends Error {
    constructor(message = 'Not Found') {
      super(message)
      this.name = 'NotFoundError'
    }
  },
}))

describe('MenusController', () => {
  let menusController: MenusController
  let menusService: MenusService
  let menuRepository: MenuRepository
  let res: any

  beforeEach(() => {
    menuRepository = new MenuRepository()
    menusService = new MenusService(menuRepository)
    menusController = new MenusController(menusService)
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any // Type assertion to Partial<Response>
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createMenu', () => {
    it('should create a new menu', async () => {
      const createMenuRequest: CreateMenuRequest = {
        menuId: 1,
        menuName: 'New Menu',
        href: '/new-menu',
        icon: 'icon',
      }

      // Mocking menusService.createMenu to return the created menu
      jest
        .spyOn(menusService, 'createMenu')
        .mockResolvedValue(createMenuRequest)

      const expectedResult = {
        ...createMenuRequest,
      }

      await menusController.createMenu(createMenuRequest, res)

      // Assertions
      expect(menusService.createMenu).toHaveBeenCalledWith(createMenuRequest)
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        expectedResult,
        'Menu created successfully',
        201,
      )
    })

    it('should handle menu creation failure', async () => {
      const createMenuRequest: CreateMenuRequest = {
        menuId: 1,
        menuName: 'New Menu',
        href: '/new-menu',
        icon: 'icon',
      }

      // Mocking menusService.createMenu to throw a DatabaseError
      jest
        .spyOn(menusService, 'createMenu')
        .mockRejectedValue(new DatabaseError('Failed to create menu'))

      // Call createMenu and expect it to throw HttpError
      await expect(
        menusController.createMenu(createMenuRequest, res),
      ).rejects.toThrow(HttpError)

      // Ensure sendSuccessResponse was not called in case of error
      expect(sendSuccessResponse).not.toHaveBeenCalled()
    })
  })


  describe('getMenuDetails', () => {
    it('should retrieve menu details by menu ID', async () => {
      const menuId = 1
      const mockMenuDetails = {
        menuId: 1,
        menuName: 'Menu 1',
        href: '/menu-1',
        icon: 'icon1',
      }

      // Mocking menusService.getMenuDetails to return mockMenuDetails
      jest
        .spyOn(menusService, 'getMenuDetails')
        .mockResolvedValue(mockMenuDetails)

      await menusController.getMenuDetails(menuId, res)

      // Assertions
      expect(menusService.getMenuDetails).toHaveBeenCalledWith(menuId)
      expect(sendSuccessResponse).toHaveBeenCalledWith(
        res,
        mockMenuDetails,
        'Menu details retrieved successfully',
        200,
      )
    })

    it('should handle menu details retrieval failure', async () => {
      const menuId = 1

      // Mocking menusService.getMenuDetails to throw a NotFoundError
      jest
        .spyOn(menusService, 'getMenuDetails')
        .mockRejectedValue(new NotFoundError('Menu details not found'))

      // Call getMenuDetails and expect it to throw NotFoundError
      await expect(menusController.getMenuDetails(menuId, res)).rejects.toThrow(
        NotFoundError,
      )

      // Ensure sendSuccessResponse was not called in case of error
      expect(sendSuccessResponse).not.toHaveBeenCalled()
    })
  })
})
