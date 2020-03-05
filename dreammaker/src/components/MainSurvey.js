import React, { Component } from "react";
import { SurvayData } from "./SurveyData";
import axios from "axios";
import ResultPage from "./ResultPage";
import { Redirect, Link, withRouter, Route } from "react-router-dom";
import Home from "../pages/Home";
import styled from "styled-components";
import heart from "../images/heart.png";

axios.defaults.withCredentials = true;
class MainSurvey extends Component {
  // constructor(props) 와 super 를 만듬.
  // 밑에 render() 밑에 확인할수 있음.
  //  console.log(">>>>>>>>nonUserId:>>>>>>>>>>>>>>>:", this.props.nonUserId);
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userCheck: false, //회원인지..체크
      nonuserCheck: false, //비회원인지 쳌,
      currentQuestion: 0, // 배열 인덱스 초기 번호 [0]   ->  SurveyData[0]
      myAnswer: null, // 대답은 선택 안되어 있음
      answer_options: [], // 선택 버튼 묶은 초기 값 []
      disabled: true, // 안보이기
      endPage: false, // 마지막 페이지인지.
      obj_result: {}, //유형별 점수를 모두는 객체
      question_data: null, //filer를 거친 내용만 뿌려질 데이터
      answer_table: null, //뿌리지않은 질문데이터 객체타입
      user_answer_reord: [], // 유저가 답변한 기록
      imagedata: heart
      // userLoginfromHome: this.props.userinfo.name
    };
  }

  imageDataRandom() {
    let newArr = [];
    newArr.push();
    newArr.push();
    newArr.push();
    let index = Math.floor(Math.random() * 3);
    this.setState({ imagedata: newArr[index] });
  }

  filetquestionTable = async (n1, n2) => {
    const { answer_table } = this.state;

    let object = {};
    object[n1] = answer_table[n1];
    object[n2] = answer_table[n2];
    this.setState({
      answer_table: object
    });
    return object;
  };

  filterAnswerTable(n) {
    //배열형식으로 수정 []
    let newArr = [];
    for (let key in this.state.answer_table) {
      let count = 0;
      while (count !== n) {
        let index = Math.floor(
          Math.random() * this.state.answer_table[key].length //배열중에 랜덤으로 인덱스 추출
        );
        newArr.push(this.state.answer_table[key][index]);
        this.state.answer_table[key].splice(index, 1); //특정 배열 인덱스 를 뺸다.
        count++;
      }
    }
    //   console.log(newArr);
    //  이부분을 좀
    //   console.log(this.state.question_data); // 90 개잧의 배열에서
    //   console.log(this.state.answer_table);

    //  console.log(this.state);

    if (JSON.stringify(this.state.obj_result) === "{}") {
      //배열안객
      this.setState({
        question_data: newArr //n개씩 유형별로 나눈것을 question_data 에 셋팅
      });
    } else {
      this.setState({
        question_data: this.state.question_data.concat(newArr)
      });
    }
  }

  //이전 버튼에 대한 핸들링이 없다.

  // 질문지 불러오는 것
  SurvayHandler = () => {
    console.log("질문지 데이터입니다.[{...}]", this.state.question_data);
    let question1 = this.state.question_data[this.state.currentQuestion]
      .ques_msg; //질문
    console.log("SurvayHandler -질문 입니다.", question1);
    let result_answer1 = this.state.question_data[this.state.currentQuestion]
      .answers; //  답변
    console.log("SurvayHandler -답변 입니다.", result_answer1);

    this.setState(() => {
      // 클릭하면 다음 순서대로 데이터 보여준다.
      // 새로 화면이 렌더 되어지므로 생명주기 api를 사용해야할듯?
      return {
        questions: question1,
        answer_options: result_answer1
      };
    });
  };
  changedGoogleUserName() {
    this.setState({
      username: this.props.googleUserName
    });
    this.props.loginStateUpdate();
  }

  // 첫 렌더 후에는 질문지 불러 온다.
  componentDidMount() {
    //  어떤 유저 인지 체크..
    console.log(this.state);
    console.log(this.props);
    const { nonuserCheck } = this.props;
    if (this.props.nonUserId) {
      axios
        .post(" http://15.165.161.83:5000/nonuser/info", {
          non_user_id: this.props.nonUserId
        })
        .then(result => {
          console.log(result);
          this.setState({
            username: result.data.name,
            nonuserCheck: this.props.nonUserId,
            userCheck: false
          });
        });
    } else if (this.props.googleUserName) {
    } else {
      axios
        .get("http://15.165.161.83:5000/user/info", { withCredentials: true })
        .then(result => {
          this.setState({
            username: result.data[0].name,
            userCheck: result.data[0].user_id,
            nonuserCheck: false
          });
        });
    }

    axios.get("http://15.165.161.83:5000/ques/anyques").then(result => {
      let object = {};

      this.setState({ question_data: result.data }); //데이터 셋팅을 하고
      for (let i = 0; i < result.data.length; i++) {
        if (!object[result.data[i].hol_id]) {
          object[result.data[i].hol_id] = [];
        }
        object[result.data[i].hol_id].push(result.data[i]);
      }
      this.setState({
        answer_table: object
      });

      console.log("홀랜드 유형별 질문-객체", object);
      this.filterAnswerTable(2);
      this.SurvayHandler(); //질문지 불러오는 것을 셋팅한다
      this.changedGoogleUserName();
    });
  }

  // 다음 질문 핸들러
  nextQuestionHandler = () => {
    // console.log('test')

    const {
      myAnswer,
      obj_result,
      question_data,
      currentQuestion,
      user_answer_reord
    } = this.state;

    let holland = question_data[currentQuestion].holland;
    // 선택한 답변과  정답이 맞으면 스코어 점수 올라간다.
    if (!obj_result[holland.hol_name]) {
      obj_result[holland.hol_id] = 0;
    }
    //answer 중에 어떤 answer 인지 그에 맞게 스코어 값가져오올수있도록
    let selanswer = question_data[currentQuestion].answers.filter(result => {
      return result.ans_msg === myAnswer;
    });

    //이부분이 또 문제가 된다.. 음...
    selanswer[0]["hol_id"] = holland.hol_id;
    user_answer_reord.push(selanswer[0]);

    obj_result[holland.hol_id] += selanswer[0].score;
    // 그와 동시에 질문 인덱스 번호 +1 해서 다음 질문으로 넘어가게 한다.

    if (currentQuestion !== question_data.length - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1
      });
    } else if (currentQuestion === question_data.length - 1) {
      let newArr = [];
      for (let key in obj_result) {
        newArr.push(key + ":" + obj_result[key]);
      }
      newArr.sort(function(a, b) {
        return -Number(a.slice(-1)) + Number(b.slice(-1));
      });
      newArr = newArr.slice(0, 2);
      let newObj = {};
      newObj[newArr[0][0]] = 0;
      newObj[newArr[1][0]] = 0;
      //2개의 유형으로 질문을 줄이고 거기서 유형별 3개의 질문을 뽑아온다.
      this.filetquestionTable(newArr[0][0], newArr[1][0]).then(result => {
        this.filterAnswerTable(3);
      }); //두개가져온다. 그뒤에 그 유형에 맞는 질문을 3개씩 해서 배열로 붙인다.
      this.setState({
        obj_result: newObj
      });
    }

    //console.log(this.state.currentQuestion);
  };

  //  이전 질문 핸들러
  prevQuestionHandler = () => {
    // console.log('test')
    const { result_answer, user_answer_reord, obj_result } = this.state;
    let data = user_answer_reord.pop(); //맨 마지막에 넣은 값 삭제..
    // console.log(data);
    obj_result[data["hol_id"]] -= data["score"];

    // 그와 동시에 질문 인덱스 번호 -1 해서 이전 질문으로 넘어가게 한다.
    this.setState({
      currentQuestion: this.state.currentQuestion - 1
    });
  };

  //! 홈으로 돌아가기 핸들링
  backHomeQuestionHandler = () => {
    // if (this.state.isLogin) {
    //   console.log("현재 눌려지는 것", this.state.isLogin);
    //   return <Redirect to="/mypage" />;
    // }
    //console.log("홈버튼 누름");
    return (
      <div>
        <Route path="/" exact={true} component={Home} />
      </div>
    );
  };

  // 컴포넌트가 리렌더링을 마친 뒤에 실행된다.

  //  componentDidUpdate(prevProps, prevState){
  //   console.log("componentDidUpdate: " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
  // }

  // 이전 props와  이전  state에 대한 정보
  // https://feel5ny.github.io/2017/12/23/log_002/

  componentDidUpdate(prevProps, prevState) {
    // 현재 보여줄 질문지랑 지난 질문지가 다를 때 처리????
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      // 화면에 안보이게 한다.

      let question1 = this.state.question_data[this.state.currentQuestion]
        .ques_msg; //질문
      console.log("question", question1);

      let result_answer1 = this.state.question_data[this.state.currentQuestion]
        .answers;

      console.log("componentDid부분-답변데이터", result_answer1);
      this.setState(() => {
        return {
          disabled: true,
          questions: question1,
          answer_options: result_answer1
        };
      });
    }
  }

  //답변 클릭시 핸들링 대답은 선택되어지고, 버튼은 활성화 된다.
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  // 마지막 완료 버튼 핸들링   SurvayData[마지막질문] === SurvayData.length -1 이 같으면
  surveyFinish = () => {
    //object 타입의 경우가 2개이하일때만...더많을떄는 필터링을 시도한다...
    let typeId = this.state.question_data[this.state.currentQuestion].hol_id; // 홀랜드 유형 아이디.
    console.log("surveyFinish부분 - 홀란드 id입니다.", typeId);
    const { obj_result } = this.state;
    let object_length = 0;
    let max_hol_id = "";
    let max_score = Number.MIN_VALUE;
    for (let key in obj_result) {
      if (obj_result[key] !== 0) {
        object_length++;
        if (max_score < obj_result[key]) {
          max_hol_id = key;
          max_score = obj_result[key];
        }
      }
    }
    this.putuserData(max_score, max_hol_id);
    if (
      this.state.currentQuestion === this.state.question_data.length - 1 &&
      object_length <= 2
    ) {
      this.setState({
        max_score: max_score,
        max_hol_id: max_hol_id,
        endPage: true
      });
    }
  };

  putuserData(score, hol_id) {
    const { userCheck, nonuserCheck } = this.state;
    if (userCheck) {
      axios.post(" http://15.165.161.83:5000/user/inuser", {
        user_id: userCheck,
        score: score,
        hol_id: hol_id
      });
    } else if (nonuserCheck) {
      axios.post("http://15.165.161.83:5000/nonuser/inresult", {
        non_user_id: nonuserCheck,
        score: score,
        hol_id: hol_id
      });
    }
  }

  render() {
    //! 만약 비회원PK ID를 가져온다면  this.props.nonUserId 쓰세요 이것은 App.js에서 내려옵니다.
    //! 만약 사용자이름을 가져오고싶다면  this.props.userinfo.name 쓰세요 이것은 App.js에서 내려옵니다.
    //  isLogin={this.state.isLogin}
    // funGoogleLogOut={this.funGoogleLogOut.bind(this)}
    // console.log("isLoginprops=>>>: ", this.props.googleLogin);
    // console.log("비회원아이디 서베이 페이지 :", this.props.nonUserName);
    console.log("googleUserName: ", this.props.googleUserName);

    const {
      username,
      answer_options,
      myAnswer,
      currentQuestion,
      endPage,
      question_data,
      obj_result,
      max_hol_id,
      max_score,
      imagedata
    } = this.state;

    const SLink = styled(Link)`
      text-decoration-color: red;
    `;

    let object_length = 0;
    for (let key in obj_result) {
      if (obj_result[key] !== 0) {
        object_length++;
      }
    }

    //  !질문이 다 끝났을 경우 합산 스코어 보여준다.
    if (endPage) {
      return (
        <div className="result">
          <ResultPage
            surveyFinish={max_hol_id}
            username={username}
          ></ResultPage>
        </div>
      );

      // 마지막 질문이 끝나지 않을 경우의 화면 렌더
      //!===========================================================================
    } else if (question_data) {
      return (
        <div className="App">
          {/* //! 질문지 폼 */}
          <div style={{ paddingLeft: "1600px" }}>
            <span>{username}</span>
            <span
              style={{
                margin: "15px",
                fontSize: "15px"
              }}
            >
              <Link to="/logout">로그아웃하기</Link>
            </span>
          </div>
          <form className="question-form">
            <fieldset className="question-fieldset">
              <legend>DreamMaker가 여러분의 꿈을 응원합니다!</legend>
              <center>
                {/*  질문이 들어갈 곳  */}
                <h1>
                  Q{currentQuestion + 1}. {username}님은 {this.state.questions}{" "}
                </h1>

                {/* 총 질문 중에 몇번째 질문인지 
                <h2>{`총${
                  this.state.question_data.length
                }개 질문 중 ${currentQuestion + 1}번째 질문입니다.`}</h2> */}
              </center>
            </fieldset>
          </form>

          {/* 답변에 대한 배열 다루기 */}
          {answer_options.map((option, index) => (
            <div
              key={index}
              // 내가 클릭한 답변과 선택지가 일치시에  선택된거고, 아니면 null 이다.
              className={`answerOptions  ${
                myAnswer === option.ans_msg ? "selected" : null
              }`}
              // 그와 동시에 옵션버튼이 클릭된다.

              onClick={() => this.checkAnswer(option.ans_msg)}
            >
              {/*  화면에 보여질 옵션 내용 ->  네, 아니오, 잘 모르겠어요 */}

              <button className="ans_msg">
                <h3>{option.ans_msg}</h3>
              </button>
            </div>
          ))}

          {/* //! 맨 첫페이지 일 경우에는 이전버튼이 아니라 홈으로 가기 버튼이 나와야 한다.  */}

          <div className="choiceBTN-group">
            {/* //!이전 버튼 클릭시에 이전 페이지로 넘어가기*/}

            {currentQuestion === 0 && (
              // 다음 버튼

              <SLink to="/">
                <button
                  className="backHome_button"
                  // ! 사실 원클릭은 필요없다.
                  onClick={this.backHomeQuestionHandler}
                >
                  홈으로
                </button>
              </SLink>
            )}

            {currentQuestion !== 0 &&
              currentQuestion < this.state.question_data.length - 1 && (
                // 이전버튼

                <button
                  className="prev_button"
                  // 버튼은 답 클릭전에는 비활성화 되어있다. 클릭시에 활성화된다.
                  // disabled={this.state.disabled}
                  // 여기서 이전 질문 핸들러가 된다.
                  onClick={this.prevQuestionHandler}
                >
                  이전 질문
                </button>
              )}

            {/* 다음버튼 클릭시에 질문이 더 남았다면 다음 질문이 나오게 하고, 총 질문의 갯수를 줄여나간다.(끝까지)*/}
            {(currentQuestion < this.state.question_data.length - 1 ||
              object_length > 2) && (
              // 다음 버튼

              <button
                className="next_button"
                // 버튼은 답 클릭전에는 비활성화 되어있다. 클릭시에 활성화된다.
                disabled={this.state.disabled}
                // 여기서 다음 질문 핸들러가 된다.
                onClick={this.nextQuestionHandler}
              >
                다음 질문
              </button>
            )}

            {/* //! 질문지의 마지막에는 finish 버튼 작동하게 한다. */}
            {/* //adding a finish button */}
            {currentQuestion === this.state.question_data.length - 1 &&
              object_length <= 2 && (
                <button
                  className="survey-finish-button"
                  onClick={this.surveyFinish}
                >
                  제출하기
                </button>
              )}
          </div>
        </div>
      );
    } else if (question_data === null) {
      return <div className="App">되었어요...</div>;
    }
  }
}

export default MainSurvey;
