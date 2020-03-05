import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Nonsignup from "./pages/Nonsignup";
//import Sub from "./components/SubApp";
import Result from "./components/ResultPage";
import Surbey from "./components/MainSurvey";
import { Mypage } from "./pages/Mypage";
import { Logout } from "./pages/Logout";

//! package 설치
//! npm install react-router-dom
//! npm install axios

class App extends React.Component {
  state = {
    //? isLogin 은 로그인상태를 핸들링하기위한 변수
    isLogin: false,
    googleLogin: false,
    nonUserId: null,
    // UserId: null,
    googleUserName: null,
    nonUserName: "",
    //? 로그인 버튼을 누르면 서버로부터응답받은 정보들이 담긴다.
    userinfo: {
      id: "",
      password1: "",
      password2: "",
      name: "",
      moblie: "",
      email: "",
      gender: "",
      age: ""
    }
  };

  //? 로그인 버튼 클릭시 state 에 로그인상태를 true 로 바꾼다.
  loginStateUpdate() {
    this.setState({
      isLogin: true
    });
  }
  funGoogleLogin() {
    this.setState({
      googleLogin: true
    });
  }
  funGoogleLogOut() {
    this.setState({
      isLogin: false
    });
  }
  getChanged(name) {
    this.setState({
      nonUserName: name
    });
  }

  //? Logout.js 함수에서 사용하기위한 메소드
  //? 로그아웃버튼을 누르면 로그인상태에서 로그아웃상태로 바꾼다.
  //? 만약 로그인상태라면
  //? upDate() 함수를 사용해 isLogin : false로 바꿔서 "/" 보내버린다.

  update() {
    if (this.state.isLogin === false) {
      this.setState({
        isLogin: true
      });
    } else {
      this.setState({ isLogin: false });
    }
  }
  //? userInfoUpdate  함수는 사용자가 Mypage 에서 정보를 보여주기 위한 함수이다.
  //? 사용자가 로그인버튼을 누르면 정보는 서버로 전송된다.
  //? 서버는 정보를 확인하고 맞으면 응답 200 그리고 유저 정보들이 담긴 객체를 준다.
  //? 이객체를  userInfoUpdate(여기) 인자값으로 넣어서 실행시킨다.
  //? 그럼 App.js  state  안에 값이 저장되고
  //? 그것을 mypage 에 보여주는 것이다.
  userInfoUpdate(name, age, gender, moblie) {
    this.setState({
      userinfo: {
        name: name,
        age: age,
        gender: gender,
        moblie: moblie
      }
    });
  }
  NonSignupUserId(e) {
    this.setState({
      nonUserId: e
    });
  }
  //? 비회원 가입시 사용될 함수

  render() {
    console.log(this.state.userinfo.name);
    //? url => home은  처음화면 > 로그인 버튼 누르면 mypage 로 이동
    //? url => signup은 회원가입버튼누르면 이동 >  완료누르면 > home 다시 이동
    //? url => Nonsignup 비회원가입하면 이동 > 완료 누르면 > question 이동

    //! 이동경로
    //! home(로그인) -> mypage -> question
    //! home(로그인) -> signup -> home(로그인) -> mypage -> question
    // console.log("nonUserId: ", this.state.nonUserId);
    // console.log("nonLogin:", this.state.isLogin);
    // nonUserId: null,
    return (
      <div>
        <Switch>
          <Route
            path="/home"
            render={() => (
              <Home
                isLogin={this.state.isLogin}
                loginStateUpdate={this.loginStateUpdate.bind(this)}
                userInfoUpdate={this.userInfoUpdate.bind(this)}
                googleLogin={this.state.googleLogin}
                funGoogleLogin={this.funGoogleLogin.bind(this)}
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
            path="/nonuser/signup"
            render={() => (
              <Nonsignup
                nonUserId={this.state.nonUserId}
                NonSignupUserId={this.NonSignupUserId.bind(this)}
                getChanged={this.getChanged.bind(this)}
                nonUserName={this.state.nonUserName}
              />
            )}
          />
          <Route
            exact
            path="/survey"
            render={() => (
              <Surbey
                nonUserId={this.state.nonUserId}
                userinfo={this.state.userinfo}
                googleLogin={this.state.googleLogin}
                funGoogleLogOut={this.funGoogleLogOut.bind(this)}
                isLogin={this.state.isLogin}
                nonUserName={this.state.nonUserName}
              />
            )}
          />

          {/* 결과 페이지로 넘어갈 수 있게 하는  Route 부분 입니다. */}
          <Route exact path="/result" render={() => <Result />} />

          <Route
            exact
            path="/mypage"
            render={() => (
              <Mypage
                isLogin={this.state.isLogin}
                userinfo={this.state.userinfo}
                googleLogin={this.state.googleLogin}
              />
            )}
          />
          <Route
            path="/logout"
            render={() => (
              <Logout
                isLogin={this.state.isLogin}
                loginStateUpdate={this.loginStateUpdate.bind(this)}
                upDate={this.update.bind(this)}
              />
            )}
          />
          <Route
            path="/"
            render={() => {
              if (this.state.isLogin) {
                console.log("현재 눌려지는 것", this.state.isLogin);
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
