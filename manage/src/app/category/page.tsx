'use client'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.css"
import axios from "axios";
import dayjs from "dayjs";
import { categoryDelete, getCategoryList } from "@/apis/category";
import { GoodsQueryType } from "@/types";
import Content from "@/components/Content";
import { LEVEL_OPTIONS } from "@/constant/category";

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 170
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    render:(text:number)=>{
      return <Tag color={text === 1 ? "green" :"cyan"}>{`级别${text}`}</Tag>
    }
  },
  {
    title: '所属分类',
    dataIndex: 'parent',
    key: 'parent',
    width: 120,
    render: (text:{name: string}) => {
      return text?.name ?? "-";
    }
  },
 
  {
    title: '创建',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text:string)=>dayjs(text).format('YYYY-MM-DD'),
    width:130,
  },
];



export default function Category() {

  const [form] = Form.useForm()
  const router=useRouter()
  const [pagination,setPagination] = useState<TablePaginationConfig>({
    current:1,
    pageSize:20,
    showSizeChanger:true,
    total:0
  })
  const [data,setData]=useState()

  async  function fetchData(values?:any){    
      const list = await getCategoryList({
        current: pagination.current,
        pageSize:pagination.pageSize,
        ...values})
      console.log(list);
      const {data}=list.data
      setData(data)
      setPagination({...pagination, current:pagination.current, total:data.total})
    }

  useEffect(()=>{
    
    fetchData()
  },[])

  const handleTableChange=async (pagination:TablePaginationConfig)=>{
    // console.log(pagination);
    setPagination(pagination)
    const query=form.getFieldsValue()
    const list = await getCategoryList({
      current: pagination.current,
      pageSize:pagination.pageSize,
      ...query})
    console.log(list);
    const {data}=list
    setData(data)
  }

  const handleCategoryEdit=(id:string)=>{
    router.push(`/category/edit/${id}`)
  }

  const handleCategoryDelete=(id:string)=>{
    Modal.confirm({
      title:"确定删除?",
      okText:"确定",
      cancelText:"取消",
      async onOk(){
        await categoryDelete(id)
        message.success("删除成功")
        fetchData(form.getFieldsValue())
      }
    })
  }

  const columns = [...COLUMNS,
  {
    title:'操作',key:"action",render:(_:any, row:any) => {
      return <Space>
        <Button type="link" onClick={()=>{handleCategoryEdit(row._id)}}>编辑</Button>
        <Button type="link" danger onClick={()=>{
          handleCategoryDelete(row._id)
          }}>删除</Button>
      </Space>
    }
  }]

  const handleSearchFinish = async (e:GoodsQueryType) => {
    // console.log(e);
    const res = await getCategoryList({...e, current:pagination.current,pageSize:pagination.pageSize})
    
    setData(res.data)
    setPagination({...pagination, current:1, total:res.data.total})
  }

  const handleSearchClear = () => {
    console.log(form);
    form.resetFields()
  }

  return (
    <Content title={'分类列表'} operation={<Button
            onClick={()=>{
                router.push("/category/add")
            }}
            >添加</Button>}>
      
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          name: '',
          category: ''
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="name" label="名称" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="level" label="级别" >
              <Select placeholder="请选择" options={LEVEL_OPTIONS}
                allowClear
                showSearch
                style={{ width: '150' }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item>
              <Space>
                <Button htmlType="submit">
                  搜索
                </Button>
                <Button onClick={handleSearchClear} htmlType="submit">
                  清空
                </Button>
              </Space>

            </Form.Item>
          </Col>

        </Row>

      </Form>
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
