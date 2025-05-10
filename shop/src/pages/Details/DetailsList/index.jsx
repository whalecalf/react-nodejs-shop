import React,{useState,useEffect} from 'react'
import DetailsView from '../DetailsView';
import api from "../../../api";


const DetailsList=(props)=>{

    const [detailsData,setDetailsData]=useState({})

    useEffect(()=>{
        api.getGoods(props.id).then(res=>{
            console.log(res);
            if (res.data.success) {
                console.log(res.data);
                setDetailsData(res.data.data)
            }
        })
    },[])

    console.log(detailsData);
    

  return (
    <div>
        {
            detailsData.pics?
            <DetailsView detailsData={detailsData} id={props.id}/>:
            <div>等待数据加载</div>
        }
      
    </div>
  )
}

export default DetailsList

