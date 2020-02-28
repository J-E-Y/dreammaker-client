import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Nonsignup from "./pages/Nonsignup";
// import { Mypage } from "./pages/Mypage";
//! package 설치
//! npm install react-router-dom
//! npm install axios

class App extends React.Component {
  state = {
    //? isLogin 은 로그인상태를 핸들링하기위한 변수
    isLogin: false,
    //? NonisLogin 은 로그인상태를 핸들링하기위한 변수
    NonisLogin: false,
    //? 회원가입시 작성되는 info
    userinfo: {
      id: "",
      password1: "",
      password2: "",
      name: "",
      gender: "",
      age: "",
      mobile: "",
      email: ""
    }
  };
  //? 로그인 버튼 클릭시 state 에 로그인상태를 true 로 바꾼다.
  loginStateUpdate() {
    this.setState({
      isLogin: true
    });
  }

  render() {
    //? url => home은  처음화면 > 로그인 버튼 누르면 mypage 로 이동
    //? url => signup은 회원가입버튼누르면 이동 >  완료누르면 > home 다시 이동
    //? url => Nonsignup 비회원가입하면 이동 > 완료 누르면 > question 이동

    //! 이동경로
    //! home(로그인) -> mypage -> question
    //! home(로그인) -> signup -> home(로그인) -> mypage -> question
    //! home(로그인) -> Nonsignup -> mypage -> question
    return (
      <div>
        <Switch>
          <Route
            path="/home"
            render={() => (
              <Home
                isLogin={this.state.isLogin}
                loginStateUpdate={this.loginStateUpdate.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup isLogin={this.state.isLogin} />}
          />
          <Route
            exact
            path="/nonsignup"
            render={() => <Nonsignup isLogin={this.state.isLogin} />}
          />
          <Route
            path="/"
            render={() => {
              if (this.state.isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Redirect to="/home" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;

// <Route
// exact
// path="/mypage"
// render={() => (
//   <Mypage isLogin={this.state.isLogin} userinfo={userinfo} />
// )}
// />
