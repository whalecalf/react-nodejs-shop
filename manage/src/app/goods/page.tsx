'use client'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, TablePaginationConfig, Tooltip, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.css"
import dayjs from "dayjs";
import { getGoodsList, goodsDelete } from "@/apis/goods";
import { GoodsQueryType } from "@/types";
import Content from "@/components/Content";
import { getCategoryList } from "@/apis/category";
import { CategoryType } from "@/types/category";

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 170
  },
  {
    title: '图片',
    dataIndex: 'pics',
    key: 'pics',
    width: 300,
    render:(pics:any)=>{
      // console.log(pics);
      var res
      if (pics.length>0) {
        res=<Image
              src={pics[0].url}
              width={200}
              height={200}
              alt=""/>
      }
      
      return ""||res
    }
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis:true,//内容超出省略
    width: 300,
    // 移动光标显示折叠内容
    render: (text:string) => {
      return <Tooltip title={text} placement="topLeft">
        {text}
      </Tooltip>
    }
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width:150,
    render:(text:any) => {
      // console.log(text);
      
      return text?.name
    }
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width:80,
  },
  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
    width:80,
  },
  {
    title: '上架时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text:string)=>dayjs(text).format('YYYY-MM-DD'),
    width:130,
  },
];

export default function Goods() {

  const [form] = Form.useForm()
  const router=useRouter()
  const [pagination,setPagination] = useState<TablePaginationConfig>({
    current:1,
    pageSize:20,
    showSizeChanger:true,
    total:0
  })
  const [data,setData]=useState()
  const [categoryList,setCategoryList]=useState<CategoryType[]>([])

  async  function fetchData(search?:GoodsQueryType){
      const list = await getGoodsList({
        current:pagination.current,
        pageSize:pagination.pageSize,
        ...search}) as any
      console.log(list);
      const {data}=list
      setData(data)
      setPagination({...pagination, current:1, total:list.total})
  }

  useEffect(()=>{    
    fetchData()
    getCategoryList({all:true}).then((res:any)=>{
      console.log(res);
      setCategoryList(res.data.data)
    })
  },[])

  const handleTableChange=async (pagination:TablePaginationConfig)=>{
    // console.log(pagination);
    setPagination(pagination)
    const query=form.getFieldValue(name)
    const res = await getGoodsList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
    setData(res.data)
  }

  const handleGoodsEdit=(id:string)=>{
    router.push(`/goods/edit/${id}`)
  }

  const handleGoodsDelete=(id:string)=>{
    Modal.confirm({
      title:"确定删除?",
      okText:"确定",
      cancelText:"取消",
      async onOk(){
        await goodsDelete(id)
        message.success("删除成功")
        fetchData(form.getFieldsValue())
      }
    })
  }

  const columns = [...COLUMNS,
  {
    title:'操作',key:"action",render:(_:any, row:any) => {
      return <Space>
        <Button type="link" onClick={()=>{handleGoodsEdit(row._id)}}>编辑</Button>
        <Button type="link" danger onClick={()=>handleGoodsDelete(row._id)}>删除</Button>
      </Space>
    }
  }]

  const handleSearchFinish = async (e:GoodsQueryType) => {
    // console.log(e);
    const res = await getGoodsList({...e, current:pagination.current,pageSize:pagination.pageSize}) as any
    
    setData(res.data)
    setPagination({...pagination, current:1, total:res.total})
  }

  const handleSearchClear = () => {
    console.log(form);
    form.resetFields()
  }

  return (
    <Content title={'商品列表'} operation={<Button
            onClick={()=>{
                router.push("/goods/add")
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
            <Form.Item name="category" label="分类" >
              <Select placeholder="请选择" options={categoryList.map((item)=>({
                label:item.name,
                value:item._id
              }))}
              optionFilterProp="label"
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
