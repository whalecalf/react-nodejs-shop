import React from "react";
import PubHeader from "../../../components/PubHeader";
import './style.less'
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const User = () => {

  const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).info : ""
  const isLogin = userInfo ? true : false
  const id = userInfo._id
  const navigator = useNavigate()

  const aboutList = [{
    icon: "icon-zhanghaoxinxi",
    name: "账号信息",
    link: `/userinfo/${id}`
  },
  {
    icon: "icon-dizhi",
    name: "地址管理",
    link: `/address/${id}`
  },
  {
    icon: "icon-shoucang",
    name: "我的收藏",
    link: `/collect/${id}`
  },

  ]

  const handleLogout = () => {
    localStorage?.removeItem("user")
    message.success("登出成功")
    navigator('/login')
  }

  return (
    <div className="all">
      <div className="my">
        <PubHeader title="个人中心" ishidden={true} />
        <div className="bodyblock">
          <div className="top">
            <div className="actor">
              <div className="set-avator">
                {!isLogin && <img
                  // src={this.state.avator} 
                  alt="" />}
                {isLogin && (
                  <img
                    src={userInfo?.avatar}
                    alt="" />
                )}
              </div>
              <div className="text">
                <span className="user-name">{isLogin?userInfo?.nickName:<Link style={{fontSize:'0.5rem'}} to={'/login'}>请先点此登录</Link> }</span>
              </div>
            </div>
          </div>
          <div className="about">
            <ul className="about-ul">
              {aboutList.map((item, index) => {
                return (
                  <Link to={item.link}>
                    <li className="about-li" key={item + index}>
                      <div className="left">
                        <i
                          className={`iconfont ` + item.icon}
                          alt=""
                        />
                      </div>
                      <div
                        className={
                          index < aboutList.length - 1
                            ? "right"
                            : "right noborder"
                        }
                      >
                        <span className="lt">{item.name}</span>
                        <div className="rt">
                          <i
                            className="iconfont icon-youjiantou"
                            //   src={require("../common/images/arrow.png")}
                            alt=""
                          />
                        </div>
                      </div>
                    </li>
                  </Link>

                );
              })}
            </ul>
            <div className="pay-resource">
              <div className="about-li">
                <div className="left">
                  <i
                    className="iconfont icon-lianxikefu"
                    alt=""
                  />
                </div>
                <div className="right noborder">
                  <span className="lt">联系客服</span>
                  <div className="rt">
                    <i
                      className="iconfont icon-youjiantou"
                      alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pay-resource">
              <a href="javascript:void(0)" onClick={handleLogout} className="about-li">
                <div className="left">
                  <i
                    className="iconfont icon-tuichudenglu"
                    alt=""
                  />
                </div>
                <div className="right noborder">
                  <span className="lt">退出登录</span>
                  <div className="rt">
                    <i
                      className="iconfont icon-youjiantou"
                      alt="" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div></div>

  )
}

export default User;