import React, { useState } from 'react'
import "./style.less"
import LoginHeader from '../../../components/PubHeader'
import api from '../../../api'
import validator from '../../../utils/validator'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

function LoginView(props) {

  const [name, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors,setErrors] = useState({})
  const navigate=useNavigate()
  

  function changeHandle(e) {
    if (e.target.name === 'name') {
      setUsername(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  async function SubmitHandler(e) {
    e.preventDefault()
    // console.log(username,password);

    var { isValid, errors } = validator({
      name,
      password,
    })

    console.log(isValid);
    

    if (isValid) {
      await api.login({
        name,
        password
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          // 登录成功
          console.log(res.data);
          props.onLoginEvent(res.data)
          setErrors({})
        } else {
          console.log("登录失败");
        }
      }).catch(err=>{
        console.log(err);
      })
    } else {
      setErrors(errors)
    }


  }

  return (
    <div>
      <LoginHeader title={'登录页'} />
      <div id='login-container'>
        <form onSubmit={SubmitHandler}>
          <div className={classnames('input-container phone-container',{'input-container-error':errors.username})}>
            <i className='icon-tablet'></i>
            <input
              name='name'
              type="text"
              placeholder='用户名'
              onChange={changeHandle}
            />
          </div>
          <div className={classnames('input-container password-container',{'input-container-error':errors.password})}>
            <i className='icon-key'></i>
            <input
              name='password'
              type="text"
              placeholder='输入密码'
              onChange={changeHandle} />
          </div>
          <div className='btn-group'><button type='submit' className='btn-login'>登录</button><button onClick={()=>navigate('/sign')} className='btn-login'>注册</button></div>
        </form>
      </div>
    </div>
  )
}

export default LoginView
