'use client';
import { getStoreDetails } from "@/apis/store";
import StoreForm from "@/components/StoreForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserEdit() {
  
  const params = useParams()
  const id=params.id
  // console.log(id);
  const [data, setData] = useState()


  async function fetchData() {
        const res=await getStoreDetails(id as string)
        const {data}=res
        setData(data);
  }


  
  useEffect(() => {
    if (id) {
     fetchData() 
    }
  }, [id]);
  

  return (
    <StoreForm title="店铺编辑" editData={data} />
  );
}
