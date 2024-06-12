import React from 'react'
import classes from './style.module.scss'
import OutsideAlerter from '@/app/hooks/outsideClickHook'

export enum positionEnum {
  absolute = 'absolute',
  relative = 'relative',
  static = 'static',
}

type Props = {
  width: string
  height: string
  borderRadius?: string
  backgroundColor?: string
  children?: React.ReactNode
  position: positionEnum
  setActiveButtonIndex: React.Dispatch<React.SetStateAction<number | null>>
}

function SubMenu({
  width,
  height,
  borderRadius,
  backgroundColor,
  children,
  position,
  setActiveButtonIndex,
}: Props) {
  return (
    <OutsideAlerter
      onOutsideClick={() => {
        setActiveButtonIndex(null)
      }}
    >
      <div
        style={{
          width: width,
          height: height,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          position: position,
          right: 10,
        }}
        className={classes.submenu}
      >
        {children} {/* Render children components here */}
      </div>
    </OutsideAlerter>
  )
}

export default SubMenu
