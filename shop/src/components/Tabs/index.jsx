import React, {useState} from 'react'
import classnames from 'classnames'
import "./style.less"

const Tabs=(props)=>{

  const [currentIndex,setCurrentIndex]=useState(0)

  function tabClickHandle(index) {
    // console.log(currentIndex===index);
    setCurrentIndex(index)
  }

  return (
    <div>
      <ul className='Tab_title_wrap'>
        {
            React.Children.map(props.children,(element,index)=>{
                return <li onClick={()=>tabClickHandle(index)} className={classnames('Tab_title',{'active':currentIndex===index})} key={index}>{element.props.label}</li>
            })
        }
      </ul>
      <div>
        {
            React.Children.map(props.children,(element,index)=>{
                return(
                    <div>
                        {currentIndex===index?
                        element.props.children:
                        ' '}
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Tabs
