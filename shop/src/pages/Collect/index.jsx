import React, { useEffect, useState } from 'react'
import PubHeader from '../../components/PubHeader'
import api from '../../api';
import { Link } from 'react-router-dom';


export default function Collect() {

    const [collectList,setCollectList]=useState([])
    const userinfo=JSON.parse(localStorage.getItem("user")).info


    const fetchData=async()=>{
       await api.getCollect({user:userinfo._id}).then(res=>{
        setCollectList(res.data.data)
       })
    }

    useEffect(()=>{
      fetchData()
    },[])

  return (
    <div>
      <PubHeader title={'我的收藏'} />
      <div>
        <ul>
            {
                collectList.map( (element,index)=>{
                  console.log(element);
                    return(
                    <div >
                       <Link to={`/details/${element.goods._id}`}>
                    <li className='list-item' key={index}>
                        <img src={element.goods.pics[0].url} alt="" />
                        <span>{element.goods.name}</span>
                    </li>
                    </Link> 
                    </div>
                    
                    )
                })
            }
        </ul>
      </div>
    </div>
  )
}
