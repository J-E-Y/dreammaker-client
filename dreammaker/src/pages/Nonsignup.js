import React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
class Nonsignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNonSignUp: false,
      name: "",
      gender: "",
      age: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  //? 사용자가 입력한 내용들을
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    //? 만약 사용자가 정보를 입력하고 완료 검사시작하기 버튼을 누르면
    //? isNonSignUp : true 로 바뀐다.
    //? 그러면 Redirect 로 question페이지로 이동시킨다.
    if (this.state.isNonSignUp) {
      return (
        <div>
          <Redirect to="/question" />
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
          <h1>Non Sign Up</h1>
          <form onSubmit = {event => {
            event.preventDefault();
             this.props.history.push('/survey');
            //this.props.history.push('/subApp');
          }}>

            <div>
              이름 :
              <input
                className="Nonsignup-name"
                type="text"
                onChange={this.handleInputValue("name")}
              ></input>
            </div>
            <div>
              성별 :
              <input
                className="Nonsignup-gender"
                type="text"
                onChange={this.handleInputValue("gender")}
              ></input>
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
