'use client'
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload as AntdUpload, Form, Modal } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { Upload as imgUpload } from '@/apis/upload';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Upload(){    

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // 用来预览弹出预览图片的Modal框框
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // 存储七牛返回的token值
  const [token, setToken] = useState("")
  // 存取上传七牛返回的值
  const [fileList, setFileList] = useState([]);

  useEffect(()=>{
    const fetchToken=async ()=>{
      await imgUpload().then(res=>{
        console.log('token',res.data.token);
        setToken(res.data.token)
      })
      
    }
    fetchToken()
  },[])

  const beforeUpload = (file: FileType) => {   
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }    
    return isJpgOrPng;
  };

  // 预览
  const handlePreview = (file: any) => {
    console.log(file);
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
    setPreviewImage("")
  };


  const handleChange = (info: any) => {
    const file = info.file;
    // console.log(file);
    // console.log('Token',token);
    const fileList = info.fileList
    console.log('fileList', info.fileList);
    
    const { uid, name, type, thumbUrl, status, response = {} } = file;
    const fileItem = {
      uid,
      name,
      type,
      thumbUrl,
      status,
      url: "http://s8vxww55i.hn-bkt.clouddn.com/" + (response.hash || "")
    };
    fileList.pop();
    fileList.push(fileItem);
    setImageUrl(fileItem.url)
    // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
    console.log(fileList);
    setFileList([...fileList as never]);
  };

  const handleRemove=(info:any)=>{
    console.log(info);
    let index = fileList.indexOf(info as never);
    if (index !== -1) {
      fileList.splice(index, 1);
      setPreviewImage("")
    }
    setFileList(fileList)
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </button>
  );

  return (
    <Form>
      <Form.Item>
    <AntdUpload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      action={'http://upload-z2.qiniup.com'}
      data={{ token }}
      beforeUpload={beforeUpload}
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
      onRemove={handleRemove}
    >
      {fileList.length>9 ? "" : uploadButton}
    </AntdUpload>
      </Form.Item>
      <Form.Item>
      <Modal
        open={previewVisible}
        title="预览"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </Form.Item>
      </Form>
  )
}
