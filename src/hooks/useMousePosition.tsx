import React, { useState, useEffect } from 'react'


//这里只是摘出MouseTracker.tsx的 逻辑  最后 return postion
const useMouseTracker = () => {
  const [postion, setPostion] = useState({ x: 0, y: 0 })
  useEffect(() => {
    // console.log('add effect')
    const updateMouse = (e: MouseEvent) => {
      // console.log('inner')
      setPostion({
        x: e.clientX,
        y: e.clientY
      })
    }
    document.addEventListener('mousemove', updateMouse)
    // console.log('before render')
    //useEffect 最后return 是组件销毁的时候需要执行的方法
    return () => {
      // console.log('remove effect')
      document.removeEventListener('mousemove', updateMouse)
    }
  })
  return postion
}

export default useMouseTracker