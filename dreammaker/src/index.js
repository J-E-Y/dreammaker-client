import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";

//? 브라우저라우터 모듈을 사용한다.
// 1. 설치
// npm install react-router-dom --save
//1. 설치
// npm install axios
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
//!삭제  serviceWorker.unregister();

