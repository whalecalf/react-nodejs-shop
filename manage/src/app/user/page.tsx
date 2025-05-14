'use client'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.css"
import dayjs from "dayjs";
import { userDelete, getUserList, userUpdate } from "@/apis/user";
import { UserQueryType, UserType } from "@/types";
import Content from "@/components/Content";
import { STATUS, STATUS_OPTIONS } from "@/constant/user";


const COLUMNS = [
  {
    title: '账号',
    dataIndex: 'name',
    key: 'name',
    width: 170
  },
  {
    title: '用户名',
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (text: string) => {
      return text === STATUS.ON?
      (<Tag color="green">正常</Tag>):
      (<Tag color="red">禁用</Tag>)
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



export default function User(props:any) {

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
      const list = await getUserList({
        current: pagination.current,
        pageSize:pagination.pageSize,
        ...values}) as any
      console.log(list);
      const {data}=list
      setData(data)
      setPagination({...pagination, current:1, total:list.total})
    }

  useEffect(()=>{
    
    fetchData()
  },[props.visible])

  const handleTableChange=async (pagination:TablePaginationConfig)=>{
    // console.log(pagination);
    setPagination(pagination)
    const query=form.getFieldsValue()
    const list = await getUserList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
    const {data}=list
    setData(data)
  }

  const handleUserEdit=(id:string)=>{
    router.push(`/user/edit/${id}`)
  }

  const handleUserDelete=(id:string)=>{
    Modal.confirm({
      title:"确定删除?",
      okText:"确定",
      cancelText:"取消",
      async onOk(){
        await userDelete(id)
        message.success("删除成功")
        fetchData(form.getFieldsValue())
      }
    })
  }

  const handleStatusChange = async (row:UserType)=>{
    const status=row.status === STATUS.ON ? STATUS.OFF : STATUS.ON
    await userUpdate(row._id!, {
      ...row,
      status: status as STATUS
    })
    fetchData(form.getFieldsValue())
  }

  const columns = [...COLUMNS,
  {
    title:'操作',key:"action",render:(_:any, row:any) => {
      return <Space>
        <Button type="link" onClick={()=>{handleUserEdit(row._id)}}>编辑</Button>
        <Button type="link" 
        danger={row.status === STATUS.ON ? true : false} 
        onClick={()=>{
          handleStatusChange(row)
          }}>{row.status === STATUS.ON ?"禁用":"启用"}</Button>
        <Button type="link" danger onClick={()=>{
          handleUserDelete(row._id)
          }}>删除</Button>
      </Space>
    }
  }]

  const handleSearchFinish = async (e:UserQueryType) => {
    // console.log(e);
    const res = await getUserList({...e, current:pagination.current,pageSize:pagination.pageSize}) as any
    
    setData(res.data)
    setPagination({...pagination, current:1, total:res.total})
  }

  const handleSearchClear = () => {
    console.log(form);
    form.resetFields()
  }

  return (
    <Content title={'用户列表'} operation={<Button
            onClick={()=>{
                router.push("/user/add")
            }}
            >添加</Button>}>
      
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          name: '',
          status: ''
        }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="name" label="名称" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="status" label="状态" >
              <Select placeholder="请选择" options={STATUS_OPTIONS}
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
