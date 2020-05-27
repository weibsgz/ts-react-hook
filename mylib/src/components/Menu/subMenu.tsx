import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext);
  const classes = classnames('menu-item sub-item', className, {
    'is-active': context.index === index
  })

  const [menuOpen, setMenuOpen] = useState(false)

  //竖向菜单是click 出子菜单  横向菜单HOVER 出子菜单
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    })
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === "MenuItem") {
        return childElement
      }
      else {
        console.error('必须传递MenuItem类型的')
      }
    })
    const menuClass = classnames('menu-submenu', {
      'menu-opened': menuOpen
    })
    return (
      <ul className={menuClass}>{childrenComponent}</ul>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu