import React, { useEffect, useState } from 'react'
import "./style.less"

import { Link } from 'react-router-dom'

 const Item=(props)=>{
    const data=props.data
    
   
   
  return (
    <div className="list-item">
        <Link to={`/details/${data._id}`}>
        <img src={data.pics.length>0?data.pics[0].url:""} alt="" />
            <div className="mask">
                <div className="left">
                    <p>{data.name}</p>
                </div>
                <div className="right">
                    <div className="btn">
                        {data.category.name}
                    </div>
                    <p>￥{data.price}元</p>
                </div>
            </div>
        </Link>
            
        </div>
  )
}
export default Item