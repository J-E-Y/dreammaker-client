import React from "react";
import { Link, Redirect } from "react-router-dom";
// import "../App.css";
import "../css/Result.css";
import "../css/noscript.css";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUp: false
    };
    //? 두번째로 input 핸들링할방법
    //* this.handleInputValue = this.handleInputValue.bind(this);
  }
  //? 두번째로 input 핸들링할방법
  //* handleInputValue = key => e => {
  //*   this.setState({ [key]: e.target.value });
  //* };
  render() {
    if (this.state.isSignUp) {
      return (
        <div>
          <Redirect to="/home" />
        </div>
      );
    }
    return (
      <div>
        <center>
          <h1>Sign Up</h1>
          <form>
            <div>
              <input
                className="signup-1"
                type="test"
                // onChange={this.handleInputValue("email")}
              ></input>
            </div>
            <div>
              <input
                className="signup-2"
                // onChange={this.handleInputValue("password")}
                type="text"
              ></input>
            </div>
            <div>
              <input
                className="signup-3"

                // onChange={this.handleInputValue("username")}
              ></input>
            </div>
            <div>
              <input
                className="signup-4"

                // onChange={this.handleInputValue("username")}
              ></input>
            </div>
            <div>
              <input
                className="signup-5"

                // onChange={this.handleInputValue("username")}
              ></input>
            </div>
            <div>
              <input
                className="signup-6"

                // onChange={this.handleInputValue("username")}
              ></input>
            </div>
            <div>
              <input
                className="signup-7"
                type="text"
                // onChange={this.handleInputValue("mobile")}
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
