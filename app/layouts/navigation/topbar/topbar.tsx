'use client'

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { ITopBar } from '@/app/interface/topbar/topbarInterface';
import { nonNavigatingMenuItems } from './items/menuItems/menuItems';
import Icon from '@/app/components/icon/Icon';
import classes from "./style.module.scss";
import SearchBox from './searchbox/searchbox';


const TopBar: React.FC<ITopBar>  = (props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Perform search functionality here
  };


  return (
    <AppBar className={classes.topbar} position="static">
      <Toolbar className={classes.topbar__toolbar}>

        {/* shows current mode */}
        <h6>{props.currentMode}</h6>
        
        <SearchBox onChange={handleSearchChange} value={searchTerm} />
        {/* non navigating buttons */}
        {nonNavigatingMenuItems.map((e)=>{
          return(
            <Icon content={e.icon} width={24} height={24} />
          )
        })}

      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
