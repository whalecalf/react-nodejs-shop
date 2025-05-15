import React from 'react'
import LoginView from './LoginView'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as LoginAction from '../../redux/actions/login'
import md5 from 'js-md5'

function Login() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  function LoginHandle(user) {
    let userinfo = user.data.user
    console.log(userinfo);
    
    userinfo.password = md5(userinfo.password)
    // 写入redux
    dispatch(LoginAction.setLogin(userinfo))
    // 写入本地
    
    localStorage.setItem("user",JSON.stringify({info:user.data, token: user.data.token}))
    navigate('/')
  }

  return (
    <div>
      <LoginView onLoginEvent={LoginHandle}/>
    </div>
  )
}

export default Login
