'use client'

import React, { useEffect, useState } from 'react';
import Icon from '../../icon/Icon';
import classes from './style.module.scss';
import SubMenu, { positionEnum } from './subMenu/subMenu';
import { IconMenuItem } from '@/app/interface/topbar/topbarConstants';

export enum IconPosition {
  Left = 'left',
  Right = 'right',
  Top = 'top',
}

type Props = {
  iconString: string;
  height: number;
  width: number;
  position: IconPosition;
  borderRadius: number;
  hoverColor: string;
  backgroundColor: string;
  isActive: boolean;
  setActiveButtonIndex: React.Dispatch<React.SetStateAction<number | null>>;
  iconItem: IconMenuItem;
};

function NonNavigatingMenu({
  iconString,
  height,
  width,
  position,
  borderRadius,
  hoverColor,
  backgroundColor,
  isActive,
  setActiveButtonIndex,
  iconItem,
}: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [showRelativeMenu,setShowRelativeMenu] = useState<boolean>(false);
  // Determine CSS position class based on the position prop
  useEffect(() => {
    // Use a mapping to set the correct CSS position class
    const positionClass =
      position === IconPosition.Top
        ? classes.nonNavigatingMenu__top
        : classes.nonNavigatingMenu__left;

    // Update the state with the calculated class
    setCssPosition(positionClass);
  }, [position]);

  const [cssPosition, setCssPosition] = useState<string>('');

  return (
    <div className={`${classes.nonNavigatingMenu} ${cssPosition}`}>
      {/* Button */}
      <div
        className={classes.nonNavigatingMenu__button}
        style={{
          borderRadius: borderRadius,
          backgroundColor: hover ? hoverColor : backgroundColor,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {

          setActiveButtonIndex(iconItem.id);
          setShowRelativeMenu((prev) => !prev);
        }}
      >
        <Icon height={height} width={width} content={iconString} />
      </div>

      {/* Opened menu (SubMenu) */}
      {position === IconPosition.Top &&  isActive && (
        <SubMenu
          backgroundColor='white'
          height="150px"
          width="150px"
          borderRadius="15px"
          setActiveButtonIndex={setActiveButtonIndex}
          position={positionEnum.absolute}
        />
      )}
    </div>
  );
}

export default NonNavigatingMenu;
