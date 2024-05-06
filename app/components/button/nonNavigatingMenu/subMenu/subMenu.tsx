import React from 'react'
import classes from "./style.module.scss";

export enum positionEnum {
  absolute = "absolute",
  relative = "relative",
  static = "static"
};

type Props = {
  width: string;
  height: string;
  borderRadius?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  position: positionEnum
}

function SubMenu({ width, height, borderRadius, backgroundColor, children, position }: Props) {
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        position: position,
        right: 20
      }}
      className={classes.submenu}
    >
      {children} {/* Render children components here */}
    </div>
  );
}

export default SubMenu;
