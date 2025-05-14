'use client'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.css"
import dayjs from "dayjs";
import Content from "@/components/Content";
import { getOrderList, orderAdd, orderDelete } from "@/apis/order";
import { OrderQueryType, OrderType } from "@/types";
import { getGoodsList } from "@/apis/goods";

const STATUS_OPTIONS = [
  {
    label: "待付款",
    value: "unpaid"
  },
  {
    label: "已付款",
    value: "paid"
  },
  {
    label: "已发货",
    value: "delivered"
  },
  {
    label: "已收货",
    value: "recieved"
  },
  {
    label: "待退款",
    value: "waitRefund"
  },
  {
    label: "已退款",
    value: "refunded"
  },
]

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'goods',
    key: 'name',
    width: 170,
    render:(text:any) =>{
      // console.log(text);
      return text?.name
    }
  },
  {
    title: '图片',
    dataIndex: 'goods',
    key: 'pics',
    width:200,
    render: (text: any) => {
      return <Image
        src={text.pics[0].url}
        width={200}
        height={200}
        alt="" />
    }
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    render: (text: string) => {
      switch (text) {
        case "unpaid":
          return <Tag color="purple">待付款</Tag>
        case "paid":
          return <Tag color="gold">已付款</Tag>;
        case "delivered":
          return <Tag color="green">已发货</Tag>;
        case "received":
          return <Tag color="blue">已收货</Tag>;
        case "waitRefund":
          return <Tag color="red">待退款</Tag>;
        case "refunded":
          return <Tag>已退款</Tag>;
        default:
          return <Tag>{text}</Tag>;
      }
    }
  },
  {
    title: '交易金额',
    dataIndex: 'num',
    key: 'num',
    width: 100,
    render:(_: any, row: any)=>{
      // console.log('row',row);
      return (row.num*row.goods.price).toString()+"元"
    }
  },
  {
    title: '买家',
    dataIndex: 'buyer',
    key: 'buyer',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    width: 130,
  },
  {
    title: '确认收货时间',
    dataIndex: 'confirmedAt',
    key: 'confirmedAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    width: 130,
  },
  {
    title: '订单评价',
    dataIndex: 'comment',
    key: 'comment',
    ellipsis:true,//内容超出省略
    render: (text: any) => {
      console.log(text);
      const content=text?text.description:"-"
      return <Tooltip title={content} placement="topLeft">
      {content}
    </Tooltip>
    },
    width: 130,
  },
];

export default function StoreOrder() {

  const [form] = Form.useForm()
  const router = useRouter()
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })
  const [data, setData] = useState()

  async function fetchData(search?: OrderQueryType) {
    // await orderAdd()
    const list = await getOrderList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
      seller: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")||'').info._id:''
    }) as any
    console.log(list);
    const { data } = list
    const newData = data.map((item:OrderType) => ({
      ...item,
      buyer: item.buyer.nickName,
      name: item.goods.name
    }))
    setData(newData)
    setPagination({ ...pagination, current: 1, total: list.total })
  }

  useEffect(() => {
    fetchData()
    getOrderList({ all: true }).then((res: any) => {
      // console.log(res);
    })
  }, [])

  const handleTableChange = (pagination: TablePaginationConfig) => {
    // console.log(pagination);
    setPagination(pagination)
    const query = form.getFieldsValue()
    getOrderList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
      seller: JSON.parse(localStorage.getItem("user")||'')?.info._id
    })
  }

  const handleOrderEdit = (id: string) => {
    // console.log(id);
    router.push(`/store/order/edit/${id}`)
  }

  const handleOrderDelete = (id: string) => {
    Modal.confirm({
      title: "确定删除?",
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        await orderDelete(id)
        message.success("删除成功")
        fetchData(form.getFieldsValue())
      }
    })
  }

  const columns = [...COLUMNS,
  {
    title: '操作', 
    key: "action",
    width:200, 
    render: (_: any, row: any) => {
      return <Space>
        <Button type="link" onClick={() => { handleOrderEdit(row._id) }}>详情</Button>
        <Button type="link" danger onClick={() => handleOrderDelete(row._id)}>删除</Button>
      </Space>
    }
  }]

  const handleSearchFinish = async (e: OrderQueryType) => {
    console.log(e);
    const goodsRes = await getGoodsList({name:e.goods})
  
    if (goodsRes.data[0]) {  
      // console.log(goodsRes?.data[0]._id);
      e.goods = goodsRes.data[0]._id
    }else{
      e.goods = ''
    }
    
    const res = await getOrderList({ ...e, current: pagination.current, pageSize: pagination.pageSize }) as any
    console.log(res);
    const newData = res.data.map((item:OrderType) => ({
      ...item,
      // name: item.goods.name,
      // buyer: item.buyer.nickName,
    }))
    // console.log(newData);

    setData(newData)
    setPagination({ ...pagination, current: 1, total: res.total })
  }

  const handleSearchClear = () => {
    // console.log(form);
    form.resetFields()
  }

  return (
    <Content title={'订单列表'} >

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
            <Form.Item name="goods" label="商品名称" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="status" label="状态" >
              <Select placeholder="请选择"
                options={STATUS_OPTIONS}
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
          scroll={{ 'x': 1000, 'y': 500 }}
          pagination={{ ...pagination, showTotal: () => `共 ${pagination.total} 条` }}
          onChange={handleTableChange} />
      </div>

    </Content>
  );
}
