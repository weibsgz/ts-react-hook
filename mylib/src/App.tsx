import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu'

function App() {


  return (
    <div className="App">
      <Button onClick={() => { alert(1) }}>hello </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>hello </Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" >Link</Button>
      <Menu defaultIndex={0}
        onSelect={(index) => { console.log('调用页面的index', index) }}>
        <MenuItem > link 1</MenuItem>
        <MenuItem disabled> link 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
        <MenuItem > link 3</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
