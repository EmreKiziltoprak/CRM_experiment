// Define a type for the icon
export type IconType =
  | string
  | {
      content: string // The actual SVG code
      width?: number // Optional width for the icon
      height?: number // Optional height for the icon
    }

// Define a type for the menu item without navigation
export interface IconMenuItem {
  id: number
  name: string
  icon: IconType
}

// Define a type for the menu item with navigation
export interface MenuItemWithNavigation extends IconMenuItem {
  href: string
}

// Define a discriminated union type for menu items
export type MenuItem = IconMenuItem | MenuItemWithNavigation

// Define a type for the menu
export type TopBarMenu = MenuItem[]
