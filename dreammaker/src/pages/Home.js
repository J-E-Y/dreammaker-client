import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/Result.css";
import "../css/noscript.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
    //? 첫번째로 input 핸들링할방법
    //? this.handleInputValue = this.handleInputValue.bind(this);
    //? 두번째로 input 핸들링할방법
    //? this.handleChange = this.handleChange.bind(this);
  }
  //? 첫번째로 input 핸들링할방법
  //? handleInputValue = key => e => {
  //?   this.setState({ [key]: e.target.value });
  //? };

  //? 두번째로 input 핸들링할방법
  //? handleChange = e => {
  //?   this.setState({
  //?     name: e.target.value
  //?   });
  //? };

  render() {
    if (this.props.isLogin) {
      return (
        <div>
          <Redirect push to="/mypage" />
        </div>
      );
    } else
      return (
        <div>
          <center>
            <h1>Dreammaker</h1>
            <form>
              <div>
                <input
                  className="login-id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  //? 두번째로 input 핸들링할방법
                  // onChange={this.namehandleChange("id")}
                ></input>
              </div>
              <div>
                <input
                  className="login-password"
                  type="password"
                  placeholder="비밀번호를 입력 해주세요"
                  //? 두번째로 input 핸들링할방법
                  // onChange={this.handleInputValue("password")}
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
              <button type="submit"><Link to="/Nonsignup">비회원가입후 검사시작</Link></button>
            </div>
          </center>
        </div>
      );
  }
}

export default Home;
