import React, { useState } from "react";
import "./App.css";
import Hello from "./components/hello";
import LikeButton from "./components/LikeButton";
// import MouseTracker from './components/MouseTracker'
// import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

//调取图片得接口格式
interface showResult {
  message: string;
  status: string;
}
// context 要保存的 主题
interface themeProps {
  [propName: string]: { color: string, background: string }
}

const themes: themeProps = {
  light: {
    color: '#000',
    background: '#eee'
  },
  dark: {
    color: "#fff",
    background: "blue"
  }
}

//创建context
export const ThemeContext = React.createContext(themes.light)


function App() {
  // const position = useMousePosition()
  const [show, setShow] = useState(true)
  //第二个参数 show 是让她点击按钮得时候才触发 useURLLoader里得useEffct
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])

  //强制指定返回得data  是 showResult 类型 不是必须得
  const _data = data as showResult
  return (
    <div className="App">
      {/* context全局注入 */}
      <ThemeContext.Provider value={show ? themes.dark : themes.light}>
        <header className="App-header">
          <Hello message="new world"></Hello>
          <LikeButton></LikeButton>
          {/* x:{position.x}, y:{position.y} */}
          {/* <MouseTracker></MouseTracker> */}
          <button onClick={() => { setShow(!show) }}>更换图片</button>
          {loading ? <p>loading...</p> : <img src={_data && _data.message}></img>}
        </header>
      </ThemeContext.Provider>

    </div>
  );
}

export default App;
