import React from "react";
import { Redirect, Link } from "react-router-dom";
// const axios = require("axios");
import axios from "axios";
axios.defaults.withCredentials = true;
export function Logout(props, state) {
  console.log("로그아웃 패이지 입니다.: ", props.isLogin);
  //? 만약 로그인상태라면
  //? upDate() 함수를 사용해 isLogin : false로 바꿔서 "/" 보내버린다.
  console.log(props);
  console.log(state);

  if (props.auth2) {
    props.auth2.signOut().then(function() {
      console.log("로그아웃이 되었습니다.");
    });
    props.googleupdate();
    props.auth2.disconnect();
  } else if (props.isLogin) {
    props.upDate();
  }
  return <Redirect to="/" />;
}

// export default Logout;
