import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/Result.css";
import "../css/noscript.css";
import "../App.css";
const axios = require("axios");

// axios.defaults.withCredentials = true;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false,
      isPassword: false,
      passwordMessage: null,
      showStore2: false,
      idMessage: "",
      showStore: false,
      color: "blue",
      arr: [],
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
    if (key === "id") {
      axios
        .post(
          "http://15.165.161.83:5000/user/idcheck",
          {
            real_user_id: e.target.value
          },
          {
            withCredentials: true
          }
        )
        .then(res => {
          if (res.data !== "사용가능하지 않는 아이디 입니다. ") {
            this.setState({ showStore2: true });
            this.setState({ idMessage: res.data });
          } else {
            this.setState({ showStore2: false });
          }
        });
    }
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
  //? setGender 함수는
  //? input='radio' 박스를 클릭하면 gender 에 Male Female 이 담긴다
  setGender(event) {
    this.setState({ gender: event.target.value });
    console.log("event.target.value: ", event.target.value);
  }
  checkPassWord() {
    for (let key in this.state) {
      if (this.state[key] === "") {
        alert(key + "가 입력되지 않았습니다.");
        return;
      }
    }
    if (
      this.state.id !== "" &&
      this.state.password1 !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.gender !== "" &&
      this.state.name !== "" &&
      this.state.moblie !== "" &&
      this.state.email !== "" &&
      this.state.gender !== "" &&
      this.state.age !== "" &&
      this.state.idMessage === "사용가능한 아이디입니다."
    ) {
      alert("회원가입이 완료되었습니다. ");
      this.setState({ isPassword: true });
    } else {
      alert("회원정보가 올바르지 않습니다.");
    }
  }
  passwordCheck() {
    axios
      .post(
        "http://15.165.161.83:5000/user/idcheck",
        {
          real_user_id: this.state.id
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        if (res.data === "사용가능한 아이디입니다.") {
          this.setState({ showStore2: this.state.showStore2 });
        } else {
          this.setState({ showStore2: this.state.showStore2 });
        }
      });
  }

  render() {
    console.log("this.state.showStore: ", this.state.showStore);

    console.log("this.state.showStore2:", this.state.showStore2);
    console.log("this.state: ", this.state);
    if (this.state.isSignUp && this.state.isPassword) {
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
          <h1 style={{ color: "white" }}>회원가입을 해주세요</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.checkPassWord();
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
                  "http://15.165.161.83:5000/user/signup",

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
              아이디
              <input
                className="signup-id"
                type="id"
                onChange={this.handleInputValue("id")}
              ></input>
              {
                <span
                  className="checkPassword"
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    display: this.state.showStore2 ? "block" : "none"
                  }}
                >
                  {this.state.idMessage}
                </span>
              }
            </div>
            <div>
              비밀번호
              <input
                className="signup-password"
                type="password"
                onChange={this.handleInputValue("password1")}
              ></input>
            </div>
            <div>
              비밀번호 확인
              <input
                className="signup-cofirm-password"
                type="password"
                onChange={this.handleInputValue("confirmPassword")}
                onKeyUp={() => {
                  if (this.state.password1 === this.state.confirmPassword) {
                    this.setState({ showStore: true });
                  } else {
                    this.setState({
                      showStore: false,
                      passwordMessage: "비밀번호가 일치하지 않습니다."
                    });
                  }
                }}
              ></input>
            </div>
            <span
              className="success"
              style={{
                fontSize: "20px",
                color: "red",
                display: this.state.showStore ? "none" : "block"
              }}
            >
              {this.state.passwordMessage}
            </span>

            <div>
              이름
              <input
                className="signup-name"
                type="text"
                onChange={this.handleInputValue("name")}
              ></input>
            </div>
            <div>
              휴대폰 번호
              <input
                className="signup-mobile"
                type="text"
                onChange={this.handleInputValue("moblie")}
              ></input>
            </div>
            <div>
              이메일 주소
              <input
                className="signup-email"
                type="email"
                onChange={this.handleInputValue("email")}
              ></input>
            </div>

            <div className="radio-wrap">
              <div onChange={this.setGender.bind(this)}>
                성별 :
                <input id="gender1" type="radio" value="남" name="gender" />
                <label htmlFor="gender1">남</label>
                <input id="gender2" type="radio" value="여" name="gender" />
                <label htmlFor="gender2">여</label>
              </div>
            </div>

            <div>
              나이
              <input
                className="signup-age"
                type="text"
                onChange={this.handleInputValue("age")}
              ></input>
            </div>

            <div>
              <Link to="/login">홈으로 가기</Link>
            </div>

            <button className="signup-btn" type="submit">
              회원가입하기
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default Signup;

// <div>
// 성별:
// <div>
//   <button onChange={this.setGender.bind(this)}>남</button>
//   <button onChange={this.setGender.bind(this)}>남</button>
// </div>
// </div>
