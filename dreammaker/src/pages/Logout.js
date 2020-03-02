import React from "react";
import { Redirect } from "react-router-dom";
// const axios = require("axios");

export function Logout(props) {
  //? 만약 로그인상태라면
  //? upDate() 함수를 사용해 isLogin : false로 바꿔서 "/" 보내버린다.
  if (props.isLogin) {
    props.upDate();
  }

  return <Redirect to="/" />;
}

// export default Logout;
