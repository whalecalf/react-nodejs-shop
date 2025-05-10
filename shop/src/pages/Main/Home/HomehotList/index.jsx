import {React} from "react";
import HomehotView from "../HomehotView";

const HomehotList=(props)=>{

    const hot1List = [
        {
            id: Math.random().toString().slice(2),
            title: "徽章",
            img: 'http://sbwwsba9t.hn-bkt.clouddn.com/pic1.jpg',
        },
        {
            id: Math.random().toString().slice(2),
            title: "亚克力制品",
            img: "http://sbwwsba9t.hn-bkt.clouddn.com/pic2.jpg",
        },
        {
            id: Math.random().toString().slice(2),
            title: "纺织品",
            img: "http://sbwwsba9t.hn-bkt.clouddn.com/pic3.jpg",
        },
        {
            id: Math.random().toString().slice(2),
            title: "数码",
            img: "http://sbwwsba9t.hn-bkt.clouddn.com/pic4.jpg",
        },
    ]
    const hot2List = [
        {
            id: Math.random().toString().slice(2),
            title: "正版时光代理人低语诗篇系列工艺色纸",
            img: 'http://sbwwsba9t.hn-bkt.clouddn.com/list1.jpg',
            link:'/#/details/:id'
        },
        {
            id: Math.random().toString().slice(2),
            title: "非人哉游园系列周边",
            img: "http://sbwwsba9t.hn-bkt.clouddn.com/list2.jpg",
            link:'/#/details/:id'
        },
        {
            id: Math.random().toString().slice(2),
            title: "《道诡异仙》官方授权正版周边套装",
            img: "http://sbwwsba9t.hn-bkt.clouddn.com/list3.jpg",
            link:'/#/details/:id'
        },
        {
            id: Math.random().toString().slice(2),
            title: "明日方舟罗德厨房 回甘：上下册",
            img: "http://sbwwsba9t.hn-bkt.clouddn.com/list4.jpg",
            link:'/#/details/:id'
        },
    ]

    return(
        <div>
            {
                hot1List.length>0?
                <HomehotView data={hot1List} title={'分类'}/>:
                <div>等待数据加载</div>
            }
            {
                hot2List.length>0?
                <HomehotView data={hot2List} title={'新品推荐'}/>:
                <div>等待数据加载</div>
            }
        </div>
    )
}

export default HomehotList