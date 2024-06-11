
export interface UpdateMenuRequest {

    /**
     * Primary key, auto-incremented.
     */
    menuId: number;

    /**
     * Name of the menu.
     */
    menuName: string;

    /**
     * URL or path the menu links to.
     */
    href: string;

    /**
     * Icon for the menu, stored as long text.
     */
    icon: string; 
}
