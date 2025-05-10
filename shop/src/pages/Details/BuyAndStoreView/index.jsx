import React,{useState,useEffect} from 'react'
import "./style.less"
import {useNavigate} from 'react-router-dom'
import api from '../../../api'
import { message } from 'antd'


function BuyAndStoreView(props) {

  // console.log(props.id);

  const navigate=useNavigate()
  const [isCollect,setIsCollect]=useState(false)
  const [collectList,setCollectList]=useState([])
  const userinfo=JSON.parse(localStorage.getItem("user")).info
  const id=props.id

  // 初始化操作
  useEffect(()=>{
    const fetchData=async()=>{
    await api.getCollect({user:userinfo._id}).then(res=>{
      setCollectList(res.data.data)
    })
    } 
    fetchData()
   
  },[userinfo._id])

  useEffect(()=>{
     console.log(isStore());
    setIsCollect(isStore())
  },[collectList])

  const storeHandle= async()=>{
    if (props.login.user.token) {
      // 允许收藏
      if (isCollect) {
        console.log("未收藏");
        setIsCollect(false)
        await api.deleteCollect(id)
      } else {
        setIsCollect(true)
        console.log("已收藏");
        await api.setCollect({goods:id,user:userinfo._id})
      }
    }else{
      // 请登录
      navigate("/login")
    }
  }

  function isStore(){
    return collectList.some(item=>{
      return item.goods._id===id
    })
  }

  const handleAdd=async ()=>{
    await api.AddCart({user:userinfo._id,goods:props.id}).then(res=>{
      if (res.data.success) {
        message.success('已加入购物车')
      }
    });
  }

  return (
    <div className='buy-store-container clear-fix'>
        <div className='item-container float-left'>
            {
              isCollect?
              <button className='selcted' onClick={storeHandle}>已收藏</button>:
              <button className='selcted o' onClick={storeHandle}>收藏</button>
            }            
        </div>
        <div className='item-container float-left'>
            <button onClick={handleAdd} className='selcted'>加入购物车</button>
        </div>
        <div className='item-container float-left'>
            <button className='selcted'>购买</button>
        </div>
    </div>
  )
}

export default BuyAndStoreView
