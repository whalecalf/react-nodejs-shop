'use client'
import { getGoodsDetails } from "@/apis/goods";
import GoodsForm from "@/components/GoodsForm";
import { GoodsType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoodsEdit() {

  const params=useParams()
  const id=params.id
  const [data,setData] = useState({})

  useEffect(()=>{
    const fetchData=async ()=>{
      if (id) {
         const res = await getGoodsDetails(id as string)
          console.log(res);
          setData(res.data)
      }
     
    }
    fetchData()
  },[params])

  return (
    <GoodsForm title="商品编辑" data={data as GoodsType}/>
  );
}
