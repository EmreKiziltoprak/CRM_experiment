import {
  IconMenuItem,
  MenuItemWithNavigation,
  TopBarMenu,
} from '@/app/interface/topbar/topbarConstants'
import { appsIcon, assistantIcon, helpIcon } from '../icons/icons'

// Non-navigating menu items
export const nonNavigatingMenuItems: IconMenuItem[] = [
  {
    id: 1,
    name: 'myApps',
    icon: appsIcon,
  },
  {
    id: 2,
    name: 'quickHelp',
    icon: helpIcon,
  },
  {
    id: 3,
    name: 'salesAssistant',
    icon: assistantIcon,
  },
  {
    id: 4,
    name: 'profile',
    icon: assistantIcon,
  },
  // Add more non-navigating menu items as needed
]

// Navigating menu items
export const navigatingMenuItems: MenuItemWithNavigation[] = [
  {
    id: 3,
    name: 'Home',
    icon: 'home',
    href: '/',
  },
  {
    id: 4,
    name: 'About',
    icon: 'info',
    href: '/about',
  },
  // Add more navigating menu items as needed
]

// Combine non-navigating and navigating menu items
export const topBarMenuItems: TopBarMenu = [...nonNavigatingMenuItems]
