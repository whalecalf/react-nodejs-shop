'use client';
import { getUserDetails } from "@/apis/user";
import UserForm from "@/components/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserEdit() {
  
  const params = useParams()
  const id=params.id
  // console.log(id);
  const [data, setData] = useState()


  async function fetchData() {
        const res=await getUserDetails(id as string)
        const {data}=res
        setData(data);
  }


  
  useEffect(() => {
    if (id) {
     fetchData() 
    }
  }, [id]);
  

  return (
    <UserForm title="用户编辑" editData={data} />
  );
}
