import React from 'react'
import BuyAndStoreView from '../BuyAndStoreView'
import "./style.less"
import {useSelector} from 'react-redux'

const BuyAndStore=(props)=>{

  const login=useSelector(state=>state.login)

  return (
    <div className='buy-and-store'>
      <BuyAndStoreView id={props.id} login={login}/>
    </div>
  )
}

export default BuyAndStore
