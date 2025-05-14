'use client'
import { getCategoryDetails } from "@/apis/category";
import CategoryForm from "@/components/CategoryForm";
import { CategoryType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryEdit() {

  const params=useParams()
  const id=params.id
  console.log(id);
  
  const [data,setData] = useState({})

  useEffect(()=>{
    const fetchData=async ()=>{
      if (id) {
         const res = await getCategoryDetails(id as string)
          console.log(res);
          setData(res.data)
      }
     
    }
    fetchData()
  },[params])

  return (
    <CategoryForm title="分类编辑" data={data as CategoryType}/>
  );
}
