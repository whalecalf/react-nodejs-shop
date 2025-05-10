import React, { useEffect,useRef, useState } from 'react'
import "./style.less"

const LoadMore=(props)=>{
    
    const more=useRef();
    const [loadTop,setLoadTop]=useState(10000)
    
    useEffect(()=>{
            // console.log(more.current);
            let timer=null
            //视图高度
            const WinHeight=document.documentElement.clientHeight
            window.addEventListener("scroll",scrollHandler)
            function scrollHandler() {
              if (more.current) {
                    setLoadTop(more.current.getBoundingClientRect().top)
                    if (timer) {
                        clearTimeout(timer)
                    } else {
                        setTimeout(()=>{
                           if (loadTop<WinHeight){
                                // console.log(props);
                                props.onLoadMore()
                            } 
                        },300)
                    }                    
                }     
            }
            // return()=>{
            //   window.removeEventListener("scroll",scrollHandler)
            //   clearTimeout(timer)
            // }
            
    },[loadTop])

  return (
    <div className='load' ref={more}>
      加载更多
    </div>
  )
}

export default LoadMore
