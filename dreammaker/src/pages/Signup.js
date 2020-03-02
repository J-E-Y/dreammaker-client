import React from "react";
import { Link, Redirect } from "react-router-dom";

import "../css/Result.css";
import "../css/noscript.css";
//import "../App.css";

const axios = require("axios");

// axios.defaults.withCredentials = true;


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
      id: "",
      password1: "",
      confirmPassword: "",
      name: "",
      moblie: "",
      email: "",
      gender: "",
      age: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };
  //? 성별(gender)input 을 핸들링하기위한 로직이 필요함
  //? ----------------------------------------
  // handleChange(event) {
  //   this.setState({ gender: event.target.value });
  // }

  //? API post 회원가입요청------------------------------
  // {
  //  real_user_id :"TEST",
  //  password: "TEST" ,
  //  name :"TEST",
  //  moblie: "010-1234-5678",
  //  email : test@gmail.com,
  //  gender : "man" ,
  //  age  : 4
  // }
  setGender(event) {
    this.setState({ gender: event.target.value });
    console.log("event.target.value: ", event.target.value);
  }

  render() {
    console.log("this.state@@: ", this.state);
    if (this.state.isSignUp) {
      return (
        <div>
          <Redirect to="/home" />
        </div>
      );
    }
    //? form tag 안에 onSubmit 함수를 작성하고 input tag 에 onChange 이벤트를 발생시켜
    //? 사용자가 작성한 정보가 isSignUp 컴퍼넌트에  state안에  담기게 하고
    //? 그다음에 state 에 담긴 정보들을 서버에 post 요청해서 저장시키고
    //? 저장시킨후 isSignUp 상태를 setState 사용해  true 로 바꾸어 주어서
    //? 회원가입이 완료시킨다.
    return (
      <div>
        <center>
          <h1>회원가입을 해주세요</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              const {
                id,
                password1,
                name,
                moblie,
                email,
                gender,
                age
              } = this.state;
              //! fetch 와 axios 방법을 사용해보았습니다.
              //!  axios 방법을 사용하였습니다.

              //! 예) fetch 로 post 요청방법
              //? 쿠키를 전송하기 위해서는 자격증명(credentials) 옵션을 반드시 설정해야 합니다.
              // fetch(
              //   "http://localhost:5000/user/signup",
              //   {
              //     method: "POST",
              //     headers: { "Content-Type": "application/json" },
              //     body: JSON.stringify({
              //       real_user_id: id,
              //       password: password1,
              //       name: name,
              //       moblie: moblie,
              //       email: email,
              //       gender: gender,
              //       age: age
              //     })
              //   },
              //   { credentials: "include" }
              // )
              // .then(res => res.json())
              // .then(data => {
              //   console.log("data:", data);

              //   console.log("data_id:", data.user_id);
              //   if (data.user_id) {
              //     this.setState({ isSignUp: true });
              //   }
              // });
              //!  axios 서버 post 요청방법
              axios
                .post(
                  "http://localhost:5000/user/signup",
                  {
                    real_user_id: id,
                    password: password1,
                    name: name,
                    moblie: moblie,
                    email: email,
                    gender: gender,
                    age: age
                  },
                  { withCredentials: true }
                )
                // real_user_id: req.body.real_user_id,
                // name: req.body.name,
                // password: req.body.password,
                // moblie: req.body.moblie,
                // email: req.body.email,
                // gender: req.body.gender,
                // age: req.body.age
                .then(res => {
                  if (res.data.user_id) {
                    this.setState({ isSignUp: true });
                  }
                });
            }}
          >
            <div>
              아이디 :
              <input
                className="signup-id"
                type="id"
                onChange={this.handleInputValue("id")}
              ></input>
            </div>
            <div>
              비밀번호 :
              <input
                className="signup-password"
                type="password"
                onChange={this.handleInputValue("password1")}
              ></input>
            </div>
            <div>
              비밀번호 확인 :
              <input
                className="signup-cofirm-password"
                type="password"
                onChange={this.handleInputValue("confirmPassword")}
              ></input>
            </div>
            <div>
              이름 :
              <input
                className="signup-name"
                type="text"
                onChange={this.handleInputValue("name")}
              ></input>
            </div>
            <div>
              휴대폰 번호 :
              <input
                className="signup-mobile"
                type="text"
                onChange={this.handleInputValue("moblie")}
              ></input>
            </div>
            <div>
              이메일 주소 :
              <input
                className="signup-email"
                type="email"
                onChange={this.handleInputValue("email")}
              ></input>
            </div>
            <div onChange={this.setGender.bind(this)}>
              성별 :
              <input type="radio" value="남" name="gender" /> 남
              <input type="radio" value="여" name="gender" /> 여
            </div>
            {/* <div>
              성별 :
              <input
                className="signup-gender"
                type="text"
                onChange={this.handleInputValue("gender")}
              ></input>
            </div> */}
            <div>
              나이 :
              <input
                className="signup-age"
                type="text"
                onChange={this.handleInputValue("age")}
              ></input>
            </div>

            <div>
              <Link to="/login">이미 계정이 있나요?</Link>
            </div>

            <button className="signup-btn" type="submit">
              회원가입
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default Signup;
