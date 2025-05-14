'use client'
import Content from "@/components/Content";
import { Button, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig, Tag, Tooltip } from "antd";
import styles from './index.module.css'
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogsQueryType, UserType } from "@/types";
import { getLogsDetails, getLogsList } from "@/apis/log";
import { getUserDetails, getUserList } from "@/apis/user";
import { USER_ROLE, USER_STATUS } from "@/constant/user";

const COLUMNS = [
  {
    title: '操作名称',
    dataIndex: 'name',
    key: 'name',
    width: 170
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,//内容超出省略
    width: 300,
    // 移动光标显示折叠内容
    render: (text: string) => {
      return <Tooltip title={text} placement="topLeft">
        {text}
      </Tooltip>
    }
  },
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
    width: 170,
    render:(text:string) => {
      // return <Tag>{text}</Tag>
      if (text=="新增") {
        return <Tag color="green">{text}</Tag>
      }
      if (text=="删除") {
        return <Tag color="red">{text}</Tag>
      }
      if (text=="修改") {
        return <Tag color="yellow">{text}</Tag>
      }
    }
  },
  {
    title: 'ip地址',
    dataIndex: 'address',
    key: 'address',
    width: 170,
  },
  {
    title: '操作用户',
    dataIndex: 'user',
    key: 'user',
    width: 170,
    render:(text:any) => {
      console.log(text);
      
      return text.nickName
    }
  },
  {
    title: '操作时间',
    dataIndex: 'time',
    key: 'time',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    width: 130,
  },
];

export default function Log() {

  const [form] = Form.useForm()
  const router = useRouter()
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })
  const [data, setData] = useState()
  const [userList, setAdminUserList] = useState<UserType[]>([])

  async function fetchData(search?: LogsQueryType) {
    const list = await getLogsList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search
    }) as any
    // console.log(list);
    const { data } = list
    setData(data)
    setPagination({ ...pagination, current: 1, total: list.total })
  }

  useEffect(() => {
    fetchData()
    getUserList({ role: USER_ROLE.ADMIN }).then((res: any) => {
      // console.log(res);
      setAdminUserList(res.data)
    })
  }, [])

  const handleTableChange = async (pagination: TablePaginationConfig) => {
    // console.log(pagination);
    setPagination(pagination)
    const query = form.getFieldValue(name)
    const res = await getLogsList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
    setData(res.data)
  }

  const handleLogsCheck = async (id: string) => {
    router.push(`/log/show/${id}`)
  }


  const columns = [...COLUMNS,
  {
    title: '操作', key: "action", render: (_: any, row: any) => {
      return <Space>
        <Button color="green" type="link" onClick={() => { handleLogsCheck(row._id) }}>查看</Button>
      </Space>
    }
  }]

  const handleSearchFinish = async (e: LogsQueryType) => {
    // console.log(e);
    const res = await getLogsList({ ...e, current: pagination.current, pageSize: pagination.pageSize }) as any

    setData(res.data)
    setPagination({ ...pagination, current: 1, total: res.total })
  }

  const handleSearchClear = () => {
    console.log(form);
    form.resetFields()
  }



  return (
    <Content title={'日志列表'} operation={<Button
      onClick={() => {
        router.push("/log/add")
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
          <Col span={6}>
            <Form.Item name="name" label="操作名称" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="user" label="操作用户" >
              <Select placeholder="请选择"
                options={userList.map((item) => ({
                  label: item.name,
                  value: item._id
                }))}
                optionFilterProp="label"
                allowClear
                showSearch
                style={{ width: '150' }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="操作类型"
              name="type"
             >
              <Select placeholder='请选择' >
                <Select.Option>新增</Select.Option>
                <Select.Option>修改</Select.Option>
                <Select.Option>删除</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item>
              <Space>
                <Button htmlType="submit">
                  搜索
                </Button>
                <Button
                  // onClick={handleSearchClear}
                  htmlType="submit">
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
