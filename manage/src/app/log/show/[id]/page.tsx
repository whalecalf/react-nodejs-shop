'use client'
import { getLogsDetails } from "@/apis/log";
import { getUserDetails } from "@/apis/user";
import Content from "@/components/Content";
import LogsForm from "@/components/LogsForm";
import { LogsType } from "@/types";
import { Form } from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogEdit() {

  const params=useParams()
  const id=params.id
  const [data,setData] = useState<LogsType>()

  useEffect(()=>{
    const fetchData=async ()=>{
      if (id) {
         const {data} = await getLogsDetails(id as string) as any
         console.log(data);
         data.time = dayjs(data.time).format('YYYY-MM-DD')
         data.user = (await getUserDetails(data.user)).data
         setData(data)         
      }
    }
    fetchData()
  },[params])



  return (
    <Content title="日志详情">
    <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
    >
        <Form.Item
            label="操作名称"
            name="name"
            >
              <div>{data?.name}</div>
        </Form.Item>
        <Form.Item
            label="操作类型"
            name="type"
            >
           <div>{data?.type}</div>
        </Form.Item>

        <Form.Item
            label="ip地址"
            name="address"
           >
            <div>{data?.address}</div>
        </Form.Item>
        <Form.Item
            label="描述"
            name="description"
            >
            <div>{data?.description}</div>
        </Form.Item>

        
        <Form.Item 
          label="操作用户"
          name="user">
          <div>{data?.user?.nickName}</div>
        </Form.Item>
        <Form.Item 
          label="操作时间"
          name="time">
          <div>{data?.time}</div>
        </Form.Item>
    </Form>
</Content>
  );
}
