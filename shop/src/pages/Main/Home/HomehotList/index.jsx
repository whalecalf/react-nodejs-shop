import { React, useEffect, useState } from "react";
import HomehotView from "../HomehotView";
import api from '../../../../api';


const HomehotList = (props) => {

    const [hot1List, setHotList1] = useState([])
    const [hot2List, setHotList2] = useState([])




    useEffect(() => {
        const fetchList1 = async () => {
            await api.category({ level: 2, pageSize: 4 }).then((res) => {
                console.log(res.data.data.data);
                setHotList1(res.data.data.data)
            })
        }
        const fetchList2 = async () => {
            await api.getGoodsList({ pageSize: 4 }).then((res) => {
                console.log(res.data.data);

                setHotList2(res.data.data)
            })
        }

        fetchList1()
        fetchList2()
    }, [])



    return (
        <div>
            {
                hot1List.length > 0 ?
                    <HomehotView data={hot1List} title={'分类'} /> :
                    <div>等待数据加载</div>
            }
            {
                hot2List.length > 0 ?
                    <HomehotView data={hot2List} title={'新品推荐'} /> :
                    <div>等待数据加载</div>
            }
        </div>
    )
}

export default HomehotList