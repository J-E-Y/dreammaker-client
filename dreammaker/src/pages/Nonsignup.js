import React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
class Nonsignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNonSignUp: false
    };
    //? 두번째로 input 핸들링할방법
    //* this.handleInputValue = this.handleInputValue.bind(this);
  }
  //? 두번째로 input 핸들링할방법
  //* handleInputValue = key => e => {
  //*   this.setState({ [key]: e.target.value });
  //* };
  render() {
    if (this.state.isNonSignUp) {
      return (
        <div>
          <Redirect to="/subApp" />
        </div>
      );
    }
    return (
      <div>
        <center>
          <h1>Non Sign Up</h1>
          <form onSubmit = {event => {
            event.preventDefault();
             this.props.history.push('/survey');
            //this.props.history.push('/subApp');
          }}>

            <div>
              <input
                className="Nonsignup-name"
                type="text"

                // onChange={this.handleInputValue("email")}
              ></input>
            </div>
            <div>
              <input
                className="Nonsignup-gender"
                type="text"
                // onChange={this.handleInputValue("password")}
              ></input>
            </div>
            <div>
              <input
                className="Nonsignup-age"
                type="text"
                // onChange={this.handleInputValue("password")}
              ></input>
            </div>
            <div>
              <Link to="/login">이미 계정이 있나요?</Link>
            </div>
            <button className="Nonsignup-btn" type="submit">
              완료! 검사 시작하기
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Nonsignup);
