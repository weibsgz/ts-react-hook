import React, { useContext } from "react";
import classnames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}



const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props

  const context = useContext(MenuContext)

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    console.log('menuItem的click', index)
    if (context.onSelect && !disabled && typeof index !== 'undefined') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>{children}</li>
  )
}
//React 自带的 displayname
MenuItem.displayName = 'MenuItem'
export default MenuItem