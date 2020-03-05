import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/Result.css";
import "../css/noscript.css";
import log2 from "../log2.png";
// const axios = require("axios");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  componentDidMount() {
    this.googleSDK();
  }
  prepareLoginButton = () => {
    console.log("버튼 위치", this.refs.googleLoginBtn);

    this.auth2.attachClickHandler(this.refs.googleLoginBtn, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      console.log("Token || " + googleUser.getAuthResponse().id_token);
      console.log("ID: " + profile.getId());
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());
      //YOUR CODE HERE
      if (googleUser.getAuthResponse().id_token) {
        this.props.googleStateUpdate();
      }
      console.log("logOut");
      // googleUser.isSignedIn.get();
      //     fetch(
      //       "http://15.165.161.83:5000/user/signin",
      //       {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           real_user_id: id,
      //           password: password
      //         })
      //       },
      //       { credentials: "include" }
      //     )
      //       .then(data => {
      //         // 만약 데이터가 성공적으로 요청되고 응답을 받는다면
      //         // 응답은  200 서버로부터 받는다.
      //         console.log("data.status: ", data.status);
      //         if (data.status === 200) {
      //           return data.json();
      //         }
      //       })

      //   },
      //   error => {
      //     alert(JSON.stringify(error, undefined, 2));
    });
  };

  googleSDK() {
    window["googleSDKLoaded"] = () => {
      window["gapi"].load("auth2", () => {
        this.auth2 = window["gapi"].auth2.init({
          client_id:
            "801027389803-tfu2h0n2ijt1robtubjasn0sooc047p8.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          scope: "profile email"
        });
        this.prepareLoginButton();
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  }

  render() {
    // console.log("this.state1: ", this.state);
    console.log("this.props.isLogin", this.props.isLogin);
    // console.log("this.googleLogin: ", this.props.googleLogin);
    if (this.props.isLogin) {
      // console.log("this.state2: ", this.state);
      // console.log("Home_this.props.isLogin: ", this.props.isLogin);
      return (
        <div>
          <Redirect push to="/mypage" />
        </div>
      );
      //? form tag 안에 onSubmit 함수를 작성하고 input tag 에 onChange 이벤트를 발생시켜
      //? 사용자가 작성한 정보가 Home 컴퍼넌트에 state안에  담기게 하고
      //? 그다음에 state 에 담긴 정보들을 서버에 post 요청해서 저장시키고
      //? loginStateUpdate 함수를 사용해 로그인상태를 true 로 변경시켜서
      //? redirect 로 사용자를 mypage 로 이동시킨다.
    } else if (this.props.googleLogin) {
      return (
        <div>
          <Redirect push to="/survey" />
        </div>
      );
    } else {
      return (
        <div
          style={{
            marginBottom: "30px",
            marginTop: "30px",
            borderRadius: "10px"
          }}
        >
          <center>
            <h1 className="main-home">
              Dreammaker
            </h1>
            <img src={log2} alt="log2" width="200" height="200" />
            <form
              style={{ marginLight: "200px" }}
              onSubmit={e => {
                e.preventDefault();

                const { id, password } = this.state;
                fetch(
                  "http://15.165.161.83:5000/user/signin",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      real_user_id: id,
                      password: password
                    })
                  },
                  { credentials: "include" }
                )
                  .then(data => {
                    // 만약 데이터가 성공적으로 요청되고 응답을 받는다면
                    // 응답은  200 서버로부터 받는다.

                    if (data.status === 200) {
                      return data.json();
                    }
                  })
                  .then(data => {
                    if (data.name && data.age && data.gender && data.moblie) {
                      this.props.loginStateUpdate();
                      this.props.userInfoUpdate(
                        data.name,
                        data.age,
                        data.gender,
                        data.moblie
                      );
                    }
                  })
                  .catch(error => console.log("잘못된 요청입니다. ", error));
                //! ??????????how to get infro from server?
                // .then(data => {
                //   axios
                //     .get("http://15.165.161.83:5000/user/info")
                //     .then(function(response) {
                //       // handle success
                //       console.log("data:", response);
                //     });
                // });
              }}
            >
              <div>
                아이디
                <input
                  className="login-id"
                  type="text"
                  onChange={this.handleInputValue("id")}
                ></input>
              </div>
              <div>


                비밀번호

                <input
                  className="login-password"
                  type="password"
                  onChange={this.handleInputValue("password")}
                >
                </input>
              </div>
              <button className="login-btn" type="submit">
                로그인
              </button>
            </form>
            
            
            
            <div>
              <span
                style={{
                  margin: "32px",
                  // fontSize: "35px"
                }}
              >
                <Link to="/signup">회원가입</Link>
              </span>
              <span
                style={{
                   margin: "32px",
                  // fontSize: "35px"
                }}
              >
                <Link to="/nonuser/signup">비회원가입</Link>
              </span>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="card mt-3">
                    <div className="card-body">
                      <div className="row mt-5 mb-5">
                        <div className="col-md-4 mt-2 m-auto ">
                          <button
                            className="loginBtn loginBtn--google"
                            style={{ marginLeft: "790px" }}
                            ref="googleLoginBtn"
                          >
                            Login with Google
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </center>
        </div>
      );
    }
  }
}

export default Home;
