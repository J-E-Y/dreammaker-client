import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
//const axios = require("axios");
class Nonsignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNonSignUp: false,
      isPassword: false,
      name: "",
      gender2: "",
      age: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  //? 사용자가 입력한 내용들을
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };
  checkBlank() {
    for (let key in this.state) {
      if (this.state[key] === "") {
        alert(key + " 가 입력되지 않았습니다.");
        return;
      }
    }
    if (this.state.name !== "" && this.state.age !== "") {
      alert("비회원 가입이 완료되었습니다.");
      this.setState({ isPassword: true });
    }
  }

  nonSetGender(event) {
    this.setState({ gender2: event.target.value });
    console.log("event.target.value: ", event.target.value);
  }

  render() {
    console.log("this.state: ", this.state);
    //? 만약 사용자가 정보를 입력하고 완료 검사시작하기 버튼을 누르면
    //? isNonSignUp : true 로 바뀐다.
    //? 그러면 Redirect 로 question페이지로 이동시킨다.
    if (this.state.isNonSignUp && this.state.isPassword) {
      return (
        <div>
          <Redirect to="/survey"/>
        </div>
      );
    }
    return (
      //? form tag 안에 onSubmit 함수를 작성하고 input tag 에 onChange 이벤트를 발생시켜
      //? 사용자가 작성한 정보가 Nonsignup 컴퍼넌트에  state안에  담기게 하고
      //? 그다음에 state 에 담긴 정보들을 서버에 post 요청해서 저장시키고
      //? 저장시킨후 isNonSignUp 상태를 setState 사용해  true 로 바꾸어 주어서
      //? 비회원가입이 완료시킨다.
      <div>
        <center>
          <h1 style={{ color: "white" }}>비회원가입</h1>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.checkBlank();
              // this.props.history.push("/survey");
              const { name, gender2, age } = this.state;
              axios
                .post(
                  "http://15.165.161.83:5000/nonuser/signup",
                  {
                    name: name,
                    gender: gender2,
                    age: age
                  },
                  { withCredentials: true }
                )
                .then(res => {
                  console.log("res:", res);
                  if (res.data.non_user_id) {
                    console.log("res.data.non_user_id:", res.data.non_user_id);
                    this.props.NonSignupUserId(res.data.non_user_id);
                    this.setState({ isNonSignUp: true });
                  }
                });
            }}
          >
            <div>
              이름 :
              <input
                className="Nonsignup-name"
                type="text"
                onChange={this.handleInputValue("name")}
              ></input>
            </div>
            <div className="radio-wrap">
              <div onChange={this.nonSetGender.bind(this)}>
                성별 :
                <input id="gender10" type="radio" value="남" name="gender" />
                <label htmlFor="gender10">남</label>
                <input id="gender20" type="radio" value="여" name="gender" />
                <label htmlFor="gender20">여</label>
              </div>
            </div>
            <div>
              나이 :
              <input
                className="Nonsignup-age"
                type="text"
                onChange={this.handleInputValue("age")}
              ></input>
            </div>
            <div>
              <Link to="/login">이미 계정이 있나요?</Link>
            </div>
            <button
              style={
                {
                  // fontSize: "35px",
                  // height: "100px",
                  // width: "100px"
                }
              }
              className="Nonsignup-btn"
              type="submit"
            >
              검사 시작
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default Nonsignup;
