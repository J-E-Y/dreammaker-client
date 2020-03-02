import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../App.css";
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

  render() {
    if (this.props.isLogin) {
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
    } else
      return (
        <div>
          <center>
            <h1>Dreammaker</h1>
            <form
              onSubmit={e => {
                e.preventDefault();

                const { id, password } = this.state;
                fetch(
                  "http://localhost:5000/user/signin",
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
                    console.log("data.status: ", data.status);
                    if (data.status === 200) {
                      return data.json();
                    }
                  })
                  .then(data => {
                    if (data) {
                      console.log("data: ", data);
                      this.props.loginStateUpdate();
                      this.props.userInfoUpdate(
                        data.name,
                        data.age,
                        data.gender,
                        data.moblie
                      );
                    }
                  });
              }}
            >
              <div>
                <input
                  className="login-id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  onChange={this.handleInputValue("id")}
                ></input>
              </div>
              <div>
                <input
                  className="login-password"
                  type="password"
                  placeholder="비밀번호를 입력 해주세요"
                  onChange={this.handleInputValue("password")}
                ></input>
              </div>
              <button className="login-btn" type="submit">
                로그인
              </button>
            </form>
            <div>
              <Link to="/signup">회원가입</Link>
            </div>
            <div>
              <Link to="/Nonsignup">비회원가입후 검사시작</Link>
            </div>
          </center>
        </div>
      );
  }
}

export default Home;
