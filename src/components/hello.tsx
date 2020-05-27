import React, { useContext } from "react";
//导入主题context
import { ThemeContext } from '../App'
interface HelloProps {
  message?: string; //如果设置defaultProps  这里要变成可选的
}
//React.FC 也可以是 React.FunctionComponent REACT提供的interface 它接受一个泛型
const Hello: React.FC<HelloProps> = props => {
  //console.log(props.children); //多了这个属性

  const theme = useContext(ThemeContext)
  // console.log('theme', theme) //{color: "#000", background: "#eee"}


  return <h2 style={theme}>{props.message}</h2>;
};
//设置了React.FunctionComponent TS默认给增加静态类的使用方法，可设置默认值
Hello.defaultProps = {
  message: "hello world"
};
export default Hello;

// APP.tsx
// <Hello></Hello> or <Hello message="new world"></Hello> 都可以
