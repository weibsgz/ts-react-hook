import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
  const [postion, setPostion] = useState({ x: 0, y: 0 })
  useEffect(() => {
    //MouseEvent TS内置的
    //addEventListener第二个参数定义一个函数 ，因为还要销毁
    //如果不销毁，副作用会绑定很多CLICK
    //每次点击 inner remove add beforeRender 每次绑定前会销毁上一个effect
    //上述每次点击都会 解绑 绑定事件 所以才传入第2个参数 []只在某个参数变化
    //才执行EFFECT 空数组代表只在初在 mount 和 unmount 的时候才执行
    console.log('add effect')
    const updateMouse = (e: MouseEvent) => {
      console.log('inner')
      setPostion({
        x: e.clientX,
        y: e.clientY
      })
    }
    document.addEventListener('click', updateMouse)
    console.log('before render')
    return () => {
      console.log('remove effect')
      document.removeEventListener('click', updateMouse)
    }
  }, [])
  return (
    <p>
      x:{postion.x}, y:{postion.y}
    </p>
  )

}

export default MouseTracker