'use client'
import Content from "@/components/Content";
import { Button, Modal, Space, Table, TablePaginationConfig, Tag, message } from "antd";
import styles from "./index.module.css"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getStoreList, storeAdd, storeDelete } from "@/apis/store";
import { STATUS } from "@/constant/store";

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 170
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      return text === STATUS.ON?
      (<Tag color="green">正常</Tag>):
      (<Tag color="red">禁用</Tag>)
    }
  },
  {
    title: '注册资金',
    dataIndex: 'capital',
    key: 'capital',
    width: 170
  },
  {
    title: '创建日期',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text:string)=>dayjs(text).format('YYYY-MM-DD'),
    width:130,
  },
];



export default function Store() {

  const router=useRouter()
  const [pagination,setPagination] = useState<TablePaginationConfig>({
    current:1,
    pageSize:20,
    showSizeChanger:true,
    total:0
  })
  const [data,setData]=useState()

  async  function fetchData(values?:any){
      // await storeAdd()
      const list = await getStoreList({
        current: pagination.current,
        pageSize:pagination.pageSize,
        owner: JSON.parse(localStorage.getItem("user")||'').info._id,
        ...values}) as any
      console.log(list);
      const {data}=list
      setData(data)
      setPagination({...pagination, current:1, total:list.total})
    }

  useEffect(()=>{
    
    fetchData()
  },[])

  const handleTableChange=(pagination:TablePaginationConfig)=>{
    // console.log(pagination);
    setPagination(pagination)
    getStoreList({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  const handleStoreEdit=(id:string)=>{
    router.push(`/store/edit/${id}`)
  }

  const handleStoreDelete=(id:string)=>{
    Modal.confirm({
      title:"确定删除?",
      okText:"确定",
      cancelText:"取消",
      async onOk(){
        await storeDelete(id)
        message.success("删除成功")
        fetchData()
      }
    })
  }

  const columns = [...COLUMNS,
  {
    title:'操作',key:"action",render:(_:any, row:any) => {
      return <Space>
        <Button type="link" onClick={()=>{handleStoreEdit(row._id)}}>编辑</Button>
        <Button type="link" danger onClick={()=>{
          handleStoreDelete(row._id)
          }}>删除</Button>
      </Space>
    }
  }]


  return (
    <Content title={'店铺列表'} operation={<Button
      onClick={()=>{
          router.push("/store/add")
      }}
      >添加</Button>}>


<div className={styles.tablewrap}>
  <Table 
dataSource={data} 
columns={columns} 
scroll={{'x':1000,'y':500}}
pagination={{...pagination,showTotal:()=>`共 ${pagination.total} 条`}}
onChange={handleTableChange}/>
</div>

</Content>
  );
}


