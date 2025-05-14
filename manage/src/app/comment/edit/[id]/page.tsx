'use client'
import { CommentUpdate, commentAdd, getCommentDetails } from "@/apis/comment";
import Content from "@/components/Content";
import { CommentType } from "@/types/comment";
import { Button, Col, Form, Input, Rate, Row, Space, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from './index.module.css'

export default function CommentEdit() {

    const params = useParams()
    const id = params.id
    const [data, setData] = useState<CommentType>()
    const [showTA,setShowTA] = useState(false)
    const [text,setText] = useState('')
    const [form] = Form.useForm()

    const fetchData = async () => {
        if (id) {
            const { data } = await getCommentDetails(id as string) as any
            console.log(data);
            data.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD')
            setData(data)
            form.setFieldValue('star',data.star)
        }
    }

    useEffect(() => {
        
        fetchData()
    }, [params])    

    const handleReply=async ()=>{
        // console.log(text);
        
        const sellerId=JSON.parse(localStorage.getItem('user')||'').info._id
        const res=await commentAdd({
            user:sellerId,
            description:text,
        })
        const replyid=res.data.id
        await CommentUpdate(id as string,{
            response:replyid
        })
        await fetchData()
    }

    return (
        <Content title="评价详情">
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                layout="horizontal"
              
            form={form}
            >
                <Form.Item
                    label='评分'
                    name="star"
                >
                    <Rate disabled></Rate>
                </Form.Item>

                <Form.Item
                    label="评价内容">
                    <div>{data?.description}</div>
                </Form.Item>

                <Form.Item
                    label="评价用户">
                    <div>{data?.user?.nickName}</div>
                </Form.Item>

                <Form.Item
                    label="评价时间"
                    name="createdAt">
                    <div>{data?.createdAt}</div>
                </Form.Item>

                <Form.Item
                label="回复状态">
                    {data?.response?<Tag color="green">已回复</Tag>:<Tag>未回复</Tag>}
                </Form.Item>
                <Form.Item
                label="回复内容">
                    {data?.response?data.response.description:<Button type="link" onClick={()=>{setShowTA(!showTA)}}>回复评价</Button>}
                </Form.Item>
                {
                    showTA?<Form.Item
                    name="reply">
                            <TextArea value={text} onChange={(e)=>{setText(e.target.value)}} className={styles.ta} placeholder="请输入回复"></TextArea>
                            <Button onClick={()=>handleReply()}type="primary" className={styles.btn}>提交</Button>
                </Form.Item>
                :""
                }
                
            </Form>
        </Content>
    );
}
