import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { ITopBar } from '@/app/interface/topbar/topbarInterface';
import { nonNavigatingMenuItems } from './items/menuItems/menuItems';
import Icon from '@/app/components/icon/Icon';
import classes from "./style.module.scss";

const TopBar: React.FC<ITopBar>  = (props) => {
  return (
    <AppBar className={classes.topbar} position="static">
      <Toolbar className={classes.topbar__toolbar}>

        {/* shows current mode */}
        <h6>{props.currentMode}</h6>
        
        <SearchBox/>
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
