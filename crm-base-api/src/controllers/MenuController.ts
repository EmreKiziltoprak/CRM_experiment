import { Request, Response } from 'express';
import { Controller, Post, Res, Body, HttpError, Get, Req, Param } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { sendSuccessResponse } from '../successResponse/success';
import { MenusService } from '../services/MenuService';
import { CreateMenuRequest } from '../models/menus/payload/request/CreateMenuRequest';
import { NotFoundError } from '../errors/customErrors';
import { UpdateMenuRequest } from '../models/menus/payload/request/UpdateMenuRequest';

/**
 * Controller responsible for handling menu-related endpoints.
 * @see {@link MenusController}
 */
@Controller('/menu')
@Service()
export class MenusController {

    /**
     * Creates an instance of MenusController.
     * @param {MenusService} menusService - The menus service instance for handling menu-related operations.
     */
    constructor(@Inject() public menusService: MenusService) { }

    /**
     * Creates a new menu.
     * @param {CreateMenuRequest} body - The request body containing menu creation information.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the newly created menu if creation is successful.
     * @throws {HttpError} Throws an HTTP error if menu creation fails.
     */
    
    @Post('/create')
    async createMenu(@Body() body: CreateMenuRequest, @Res() res: Response): Promise<any> {
        try {
            const newMenu = await this.menusService.createMenu(body);
            return sendSuccessResponse(res, newMenu, 'Menu created successfully', 201);
        } catch (error) {
            throw new HttpError(500, 'Failed to create menu');
        }
    }

    /**
     * Retrieves menus by role ID.
     * @param {number} roleId - The ID of the role.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the menus if found, or an empty array if not.
     */

    @Get('/role/:roleId')
    async getMenusByRoleId(@Param('roleId') roleId: number, @Res() res: Response): Promise<any> {
        try {
            const menus = await this.menusService.findMenusByRoleId(roleId);
            return sendSuccessResponse(res, menus, 'Menus retrieved successfully', 200);
        } catch (error) {
            throw new HttpError(500, 'Failed to retrieve menus');
        }
    }

    /**
     * Retrieves details of a specific menu by its ID.
     * @param {number} menuId - The ID of the menu.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the menu details if found, or null if not.
     * @throws {NotFoundError} Throws a not found error if the menu is not found.
     */
    @Get('/details/:menuId')
    async getMenuDetails(@Param('menuId') menuId: number, @Res() res: Response): Promise<any> {
        try {
            const menu = await this.menusService.getMenuDetails(menuId);
            if (!menu) {
                throw new NotFoundError('Menu not found');
            }
            return sendSuccessResponse(res, menu, 'Menu details retrieved successfully', 200);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a specific menu by its ID.
     * @param {number} menuId - The ID of the menu.
     * @param {UpdateMenuRequest} body - The request body containing menu update information.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to the updated menu if update is successful.
     * @throws {HttpError} Throws an HTTP error if menu update fails.
     */
 /*    @Post('/update/:menuId')
    async updateMenu(@Param('menuId') menuId: number, @Body() body: UpdateMenuRequest, @Res() res: Response): Promise<any> {
        try {
            const updatedMenu = await this.menusService.updateMenu(menuId, body);
            return sendSuccessResponse(res, updatedMenu, 'Menu updated successfully', 200);
        } catch (error) {
            throw new HttpError(500, 'Failed to update menu');
        }
    } */

    /**
     * Deletes a specific menu by its ID.
     * @param {number} menuId - The ID of the menu.
     * @param {Response} res - The response object for sending HTTP responses.
     * @returns {Promise<any>} A promise resolving to a success message if deletion is successful.
     * @throws {HttpError} Throws an HTTP error if menu deletion fails.
     */
  /*   @Post('/delete/:menuId')
    async deleteMenu(@Param('menuId') menuId: number, @Res() res: Response): Promise<any> {
        try {
            await this.menusService.deleteMenu(menuId);
            return sendSuccessResponse(res, null, 'Menu deleted successfully', 200);
        } catch (error) {
            throw new HttpError(500, 'Failed to delete menu');
        }
    } */
}
