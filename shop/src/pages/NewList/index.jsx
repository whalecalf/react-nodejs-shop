import React from 'react'
import PubHeader from '../../components/PubHeader'
import './style.less'
import { Link } from 'react-router-dom'

const hot2List = [
    {
        id: '65e046e8a971e828a8a3692d',
        title: "正版时光代理人低语诗篇系列工艺色纸",
        img: 'http://sbwwsba9t.hn-bkt.clouddn.com/list1.jpg',
    },
    {
        id: Math.random().toString().slice(2),
        title: "非人哉游园系列周边",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list2.jpg",
    },
    {
        id: "65e876775c0bbfaa3bd9109d",
        title: "《道诡异仙》官方授权正版周边套装",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list3.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "明日方舟罗德厨房 回甘：上下册",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list4.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "名侦探柯南梦中画系列马口铁徽章",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list5.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "2024盗墓笔记新年系列 有龙则灵一寸照",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list6.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "跃动青春校服系列 帆布包",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list7.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "《有兽焉》- 第一弹收藏卡 - 凡间有神兽",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list8.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "星河动漫 鬼灯的冷彻 官方正版杯垫",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list9.jpg",
    },
    {
        id: Math.random().toString().slice(2),
        title: "星河动漫 排球少年 官方正版金属挂链徽章",
        img: "http://sbwwsba9t.hn-bkt.clouddn.com/list10.jpg",
    },
]

const NewList=()=> {
  return (
    <div>
      <PubHeader title={'新品推荐'}/>
      <div>
        <ul>
            {
                hot2List.map((element,index)=>{
                    return(
                    <div >
                       <Link to={`/details/${element.id}`}>
                    <li className='list-item' key={index}>
                        <img src={element.img} alt="" />
                        <span>{element.title}</span>
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
export default NewList