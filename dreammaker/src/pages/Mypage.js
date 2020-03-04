import React from "react";
import { Link } from "react-router-dom";
import logo from "../usericon.png";
// const axios = require("axios");

//! 로그인 상태에서 link로 로그아웃 하기
//* <Link to="/logout">로그아웃</Link> */

export function Mypage(props) {
  if (!props.isLogin) {
    return (
      <center>
        <h1>NOT FOUND</h1>
        <Link to="/login">로그인하러 가기</Link>
      </center>
    );
  }
  // const logo = require("./usericon.png");
  //? 사용자가 로그인 정보를 적고 로그인 버튼을 누르고 정보가 맞다면
  //? Home.js 에서는 2가지 함수를 실행시킨다 .
  //! 1번째:
  // this.props.loginStateUpdate();
  //! 2번째:
  // this.props.userInfoUpdate(
  //   data.name,
  //   data.age,
  //   data.gender,
  //   data.mobile
  // );
  //? 그러면 isLogin 은 true 상태가 되고
  //? Home 에 있는 state.userinfo 에 "" 에서 정보들이 담기게 된다.
  //? 만약 state.userinfo.name  에 값이 들어와 있는 상태가 된다.
  //? name ,age, gender, moblie 값들이 채워진다.
  //?! 근데 mobile 값만 안들어온다 왜그럴까?
  if (props.userinfo.name) {
    console.log("(props.isLogin: ", props.isLogin);
    return (
      <div>
        <center>
          <h1 style={{ color: "white" }}>나의 정보</h1>

          <div className="logo">
            <img src={logo} alt="logo" width="300" height="350" />
          </div>
          <div className="mypage">
            <div className="mypage-name">이름: {props.userinfo.name}</div>
            <div className="mypage-age">나이: {props.userinfo.age}</div>
            <div className="mypage-gender">성별: {props.userinfo.gender}</div>
            <div className="mypage-moblie">
              핸드폰번호:
              {props.userinfo.moblie}
            </div>
          </div>
          <span
            style={{
              margin: "32px",
              fontSize: "35px"
            }}
          >
            <Link to="/survey">검사하러가기</Link>
          </span>
          <span
            style={{
              margin: "32px",
              fontSize: "35px"
            }}
          >
            <Link to="/logout">로그아웃하기</Link>
          </span>
          <span></span>
        </center>
      </div>
    );
  }

  return <div>Loading.....</div>;
}
