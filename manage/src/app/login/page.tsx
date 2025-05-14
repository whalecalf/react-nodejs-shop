'use client'
import { Button, Form, Input, Space, message } from "antd";
import styles from './index.module.css'
import request from "@/utils/request";
import { login } from "@/apis/user";
import { useRouter } from "next/navigation";
import { USER_ROLE } from "@/constant/user";

export default function Login() {

  const router=useRouter()

  const handleFinish = async (values:{name:string; password:string;})=>{
    const res = await login(values);
    console.log(res);
    
    if (res.data) {
      message.success("登录成功")
      // user save
      localStorage.setItem("user", JSON.stringify({info:res.data.user, token: res.data.token}));
      console.log(res.data.user.role);
      if (res.data.user.role===USER_ROLE.SELLER) {
        router.push("/goods")
      } else {
        router.push("/log")
      } 
      
    }
  }

  const handleReg=()=>{
    router.push('/sign')
  }

  return (
    <>
      
     <div className={styles.container}>
      <h1 className={styles.title}>商城管理系统</h1>
      <Form onFinish={handleFinish}>
        <Form.Item label="账号" name="name" 
        rules={[{
          required:true,
          message:"请输入账号"
        }]}>
          <Input placeholder="请输入账号"/>
        </Form.Item>
        <Form.Item label="密码" name="password" 
        rules={[{
          required:true,
          message:"请输入账号"
        }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
              <Button className={styles.btn} type="primary" ghost htmlType="submit">登陆</Button>
              <Button onClick={()=>handleReg()} className={styles.btn} type="primary" ghost>注册</Button>
        </Form.Item>
      </Form>
    </div>
    </>
   
  );
}
