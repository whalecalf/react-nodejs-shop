import { React, useEffect, useState } from "react";
import PubHeader from '../../components/PubHeader'
import './style.less'
import { Link } from 'react-router-dom'
import api from "../../api";


const NewList=()=> {

    const [hot2List, setHotList2] = useState([])




    useEffect(() => {
       
        const fetchList2 = async () => {
            await api.getGoodsList({ pageSize: 10 }).then((res) => {
                console.log(res.data.data);

                setHotList2(res.data.data)
            })
        }

        fetchList2()
    }, [])

  return (
    <div>
      <PubHeader title={'新品推荐'}/>
      <div>
        <ul>
            {
                hot2List.map((element,index)=>{
                    return(
                    <div key={element._id}>
                       <Link to={`/details/${element._id}`}>
                    <li className='list-item' key={index}>
                        <img src={element.pics[0].url} alt="" />
                        <span>{element.name}</span>
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