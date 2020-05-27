import React, { createContext, useState } from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './menuItem'


type MenuMode = 'horizontal' | 'vertical'
type selectCallBack = (selcetIndex: number) => void
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallBack
}

interface MenuContextInterface {
  index: number;
  onSelect?: selectCallBack;
  mode?: MenuMode
}

export const MenuContextObj: MenuContextInterface = {
  index: 0
}
//创建context 为传递index  onselect 方法
export const MenuContext = React.createContext(MenuContextObj)

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const [currentIndex, setIndex] = useState(defaultIndex);

  const handelClick = (index: number) => {
    console.log('menu的click', index)
    setIndex(index);
    onSelect && onSelect(index)
  }

  const passContext: MenuContextInterface = {
    //currentIndex是  number或者undfined 所以判断下
    index: currentIndex ? currentIndex : 0,
    onSelect: handelClick,
    mode: mode
  }

  const classes = classnames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  //使用组件的时候 <Menu> 里只能放 <MenuItem>
  const childRender = () => {
    return React.Children.map(children, (child, index) => {
      //这么写才能取到设置到MenuItems上的displayName
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === "MenuItem" || displayName === 'SubMenu') {
        //用cloneElement混入index  传给 menuItems 让他 自带INDEX
        return React.cloneElement(childElement, { index })
      }
      else {
        console.error('必须传递MenuItem类型的')
      }
    })
  }

  return (
    <ul className={classes} style={style} >
      <MenuContext.Provider value={passContext}>
        {
          childRender()
        }
      </MenuContext.Provider>

    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu