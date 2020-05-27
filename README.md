### 安装

1. 安装 react 和 typescrpt 完成后会有 tsconfig.json
   `npx create-react-app ts-react --typescript`

2. 第一个组件

```
import React from "react";
interface HelloProps {
  message?: string; //如果设置defaultProps  这里要变成可选的
}
//React.FC 也可以是 React.FunctionComponent REACT提供的interface 它接受一个泛型
const Hello: React.FC<HelloProps> = props => {
  console.log(props.children); //多了这个属性
  return <h2>{props.message}</h2>;
};
//设置了React.FunctionComponent TS默认给增加静态类的使用方法，可设置默认值
Hello.defaultProps = {
  message: "hello world"
};
export default Hello;

// APP.tsx
// <Hello></Hello> or <Hello message="new world"></Hello> 都可以

```

## useState,useEffect,useRef
查看组件  components/likeButton.tsx  hooks/useMousePositon.tsx ,useURLloader.tsx

## useContext 
App.tsx 全局注册一个 theme context
components/hello.tsx 使用