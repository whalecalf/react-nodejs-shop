import React, { useEffect, useState, useMemo } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import './style.less'
import PubHeader from '../../components/PubHeader';
import api from '../../api';

const Category = () => {

    // const sub1 = [
    //     {
    //         id: Math.random().toString().slice(2),
    //         title: "徽章",
    //         img: 'http://s8vxww55i.hn-bkt.clouddn.com/pic1.jpg',
    //     },
    //     {
    //         id: Math.random().toString().slice(2),
    //         title: "立牌",
    //         img: "http://s8vxww55i.hn-bkt.clouddn.com/pic2.jpg",
    //     },
    //     {
    //         id: Math.random().toString().slice(2),
    //         title: "抱枕",
    //         img: "http://s8vxww55i.hn-bkt.clouddn.com/pic3.jpg",
    //     },
    //     {
    //         id: Math.random().toString().slice(2),
    //         title: "挂件",
    //         img: "http://s8vxww55i.hn-bkt.clouddn.com/pic4.jpg",
    //     },
    // ]


    // const ITEM = [{
    //     label:'徽章',
    //     key:1,
    //     children:<div className="hot-container">
    //     <ul className="clear-fix">
    //         {
    //             sub1.map((element,index)=>{
    //                 return(<li key={index}>
    //                     <a href={element.link}>
    //                         <img src={element.img} alt="" />
    //                         <span>{element.title}</span>
    //                     </a>
    //                 </li>)

    //             })
    //         }
    //     </ul>
    // </div>
    // },{
    //     label:'亚克力制品',
    //     key:2,
    // },{
    //     label:'纸制品',
    //     key:3,
    // },{
    //     label:'纺织品',
    //     key:4,
    // },{
    //     label:'数码',
    //     key:5,
    // },{
    //     label:'其他',
    //     key:6,
    // },
    // ]

    const [ITEM,setITEM] = useState([])
    const [ITEM2, setITEM2] = useState([])
    const [loading,setLoading] = useState(true)
    // var [sub1,setSub1]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            await api.category({ all: true, level: 1 }).then((res) => {
                console.log(res);
                setITEM2(res.data.data.data);
            })
        }
        fetchData()  
        
    },[])

    

    // const ITEM = useMemo(() => {
    //     return ITEM2.map((item, index) => (
    //         {
    //             value: item._id,
    //             label: item.name,
    //             key: index,
    //         }))
    // }, [ITEM2]);

  useEffect(() => {
  const fetchData = async () => {
    const itemList = await Promise.all(
      ITEM2.map(async (item, index) => {
        const res = await api.category({ parent: item._id });
        const childrenData = res.data.data.data || [];

        return {
          value: item._id,
          label: item.name,
          key: '1' + index,
          forceRender: true,
          children: (
            <div className="hot-container">
              <ul className="clear-fix">
                {childrenData.map((element, idx) => (
                  <li key={idx}>
                    <a href={element.link}>
                      <img src={element.icon} alt="" />
                      <span>{element.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ),
        };
      })
    );

    setITEM(itemList);
    setLoading(false)

  };

  if (ITEM2.length > 0) {
    setLoading(true)
    fetchData();
  }

}, [ITEM2]);


    console.log(ITEM);


    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            /* 这里是你的组件 token */
                            itemSelectedColor: '#fd9535',
                            inkBarColor: '#fd9535',
                            itemHoverColor: '#fd9535',
                        },
                    },
                }}
            >
                <PubHeader title={'全部分类'} />
                {
                    !loading?
                    <Tabs
                    defaultActiveKey="1"
                    tabPosition={'left'}
                    items={ITEM}
                    moreIcon
                    id='tab'
                />:'等待数据加载...'
                }
                
                

            </ConfigProvider>

        </>
    );
};
export default Category;