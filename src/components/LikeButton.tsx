//useState 单一状态

import React, { useState, Fragment, useEffect, useRef } from "react";

const LikeButton: React.FC = () => {
  // useState 的第一个参数为状态初始值，第二个参数为变更状态值的方法
  //在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。
  // 定义多个STATE 后期可以抽离
  const [like, setlike] = useState(0);
  const [on, setON] = useState(true);
  const likeRef = useRef(like)

  //useRef 做ref 控制DOM 默认是null 强制指称 HTMLInputElement类型
  const inputRef = useRef<HTMLInputElement>(null)

  //useEffect Hook 视作 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合体。
  useEffect(() => {
    document.title = `点击了${like}次`
  }, [like])

  useEffect(() => {
    console.log('执行')
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  })



  //useRef 不仅仅是用来管理 DOM ref 的， 他可以存放任何变量.每次返回这个对象得引用
  //useRef可以很好的解决闭包带来的不方便性.这里不用useRef 点击CLICK多次 再点击ALERT
  //比如 点击了2次CLICK 点击ALERT 再点击多次CLICK 会打印2 不是当前得状态
  //useRef 每次都会返回同一个引用, 所以在 useEffect 中修改的时候 ,在 alert 中也会同时被修改. 这样子, 点击的时候就可以弹出实时的 count 了. useRef更改不会造成组件重新更新，因为他一直是一个引用

  function hanleClick(): void {
    setTimeout(() => {
      alert('您点击了' + like + '加上ref后点击了' + likeRef.current)
    }, 3000)
  }

  return (
    <Fragment>
      <input ref={inputRef} type="text" />

      {/* 点赞的时候 设置like+1 同时让likeRef 也++ 他初始是0 */}
      <button onClick={() => { setlike(like + 1); likeRef.current++ }}>
        {like}点赞
      </button>
      <button onClick={() => { setON(!on) }}>
        {on ? "ON" : "OFF"}
      </button>
      <button onClick={() => { hanleClick() }}>alert</button>
    </Fragment>
  );
};

export default LikeButton;
