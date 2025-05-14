'use client'
import { commentAdd } from "@/apis/comment";
import { OrderUpdate, getOrderDetails } from "@/apis/order";
import Content from "@/components/Content";
import { OrderType } from "@/types";
import { Button, Col, Form, Input, Row, Space } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function OrderEdit() {

  const params=useParams()
  const id=params.id
  const [data,setData] = useState<OrderType>()
  const router = useRouter()
  var ems=""

  useEffect(()=>{
    const fetchData=async ()=>{
      // const comment = await commentAdd() as any
      // console.log(comment);
      
      // await OrderUpdate(id as string,{comment:comment.id})
      if (id) {
         const {data} = await getOrderDetails(id as string) as any
         console.log(data);
         data.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD')
         data.confirmedAt = dayjs(data.confirmedAt).format('YYYY-MM-DD')
         setData(data)         
      }
    }
    fetchData()
  },[params])

  const handleComment=(id:string)=>{
    router.push(`/comment/edit/${id}`)
  }

  return (
    <Content title="订单详情">
    <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        // form={form}
    >
        <Form.Item
            label="商品名称"
            name="name"
            >
              <div>{data?.goods.name}</div>
        </Form.Item>
        <Form.Item
            label="订单状态"
            name="status"
            >
           {data?.status=="paid"&&<Space>未发货<Input onChange={(e)=>{
            ems=e.target.value
           }} placeholder="请输入物流单号"></Input><Button onClick={async ()=>{
            data.status="delivered"
            data.createdAt = dayjs(data.createdAt).valueOf()
            data.confirmedAt = dayjs(data.confirmedAt).valueOf()
            data.ems = ems
            await OrderUpdate(id as string,data)
            router.push('/store/order')
           }}>发货</Button></Space>}
           {data?.status==="delivered"&&<div>已发货</div>}
           {data?.status==="received"&&<div>已收货</div>}
           {data?.status==="waitRefund"&&<Space>待退款<Button onClick={async ()=>{
            data.status="refunded"
            data.createdAt = dayjs(data.createdAt).valueOf()
            data.confirmedAt = dayjs(data.confirmedAt).valueOf()
            await OrderUpdate(id as string,data)
            router.push('/store/order')
           }}>同意退款</Button><Button danger>拒绝退款</Button></Space>}
           {data?.status==="refunded"&&<div>已退款</div>}
        </Form.Item>
           {
            data?.status!=="paid"?
            <Form.Item
              label="物流单号"
            >
              <a style={{'color':'blue'}}>{data?.ems} </a>
            </Form.Item>:""
           }
        <Form.Item
            label="交易金额"
            name="sum"
           >
            <div>{((data?.num||0)*(data?.goods.price||0))}元</div>
        </Form.Item>
        <Form.Item
            label="商品数量"
            name="num"
           >
            <div>{data?.num}</div>
        </Form.Item>
        <Form.Item
            label="买家"
            name="buyer"
            >
            <div>{data?.buyer.nickName}</div>
        </Form.Item>

        
        <Form.Item 
          label="创建时间"
          name="createdAt">
          <div>{data?.createdAt}</div>
        </Form.Item>
        {
          data?.status=="recieved"?
          <Form.Item 
          label="确认收货时间"
          name="confirmedAt">
          <div>{data?.confirmedAt}</div>
        </Form.Item>:""
        }
        <Form.Item 
          label="商品图片"
          name="pics">
          <Image
        src={data?.goods.pics[0].url}
        width={200}
        height={200}
        alt="" />
        </Form.Item>

        <Form.Item
          label="订单评价">
            {data?.comment?<Space>{data.comment.description}
            <Button onClick={()=>handleComment(data.comment._id)} type="link" >查看评价</Button></Space>:"尚未评价"}
        </Form.Item>
    </Form>
</Content>
  );
}
