import React, { useState, useEffect } from 'react'
import axios from 'axios'
//此HOOKS 的作用的 调用传入的接口 返回数据 还有loading状态
//url 接口地址 deps 是 useEffect 第二个参数 即需要触发的对象
const useURLLoader = (url: string, deps: any[] = []) => {
  // 如果不给<any> 那么data默认是null
  const [data, setData] = useState<any>(null)
  const [loading, setloading] = useState(true)

  useEffect(() => {
    console.log('useURLLoader')
    setloading(true)
    axios.get(url).then(res => {
      setData(res.data)
      setloading(false)
    })
  }, deps)

  return [data, loading]

}

export default useURLLoader