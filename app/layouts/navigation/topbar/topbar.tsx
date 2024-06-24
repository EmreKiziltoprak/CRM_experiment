'use client'

import React, { useContext, useState } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { ITopBar } from '@/app/interface/topbar/topbarInterface'
import { nonNavigatingMenuItems } from './items/menuItems/menuItems'
import Icon from '@/app/components/icon/Icon'
import classes from './style.module.scss'
import SearchBox from './searchbox/searchbox'
import NonNavigatingMenu, {
  IconPosition,
} from '@/app/components/button/nonNavigatingMenu/nonNavigatingMenu'
import { TopBarContext } from './context/topbarContext'

const TopBar: React.FC<ITopBar> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  /* extract context values */
  const {
    isTopBarOpen,
    toggleTopBar,
    activeButtonIndex,
    setActiveButtonIndex,
  } = useContext(TopBarContext)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    // Perform search functionality here
  }

  return (
    <AppBar className={classes.topbar} position="static">
      <Toolbar className={classes.topbar__toolbar}>
        {/* shows current mode */}
        <h6>{props.currentMode}</h6>

        <SearchBox onChange={handleSearchChange} value={searchTerm} />
        {/* non navigating buttons */}
        <section className={classes.topbar__toolbarMenu}>
          {nonNavigatingMenuItems.map((e) => {
            return (
              <NonNavigatingMenu
                iconString={e.icon}
                width={24}
                height={24}
                iconItem={e}
                setActiveButtonIndex={setActiveButtonIndex}
                isActive={activeButtonIndex == e.id}
                position={IconPosition.Top}
                borderRadius={90}
                backgroundColor="white"
                hoverColor="gray"
              />
            )
          })}
        </section>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
