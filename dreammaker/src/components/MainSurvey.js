import React, { Component } from "react";
import { SurvayData } from "./SurveyData";
import axios from "axios";
import ResultPage from "./ResultPage";

class MainSurvey extends Component {
  state = {
    currentQuestion: 0, // 배열 인덱스 초기 번호 [0]   ->  SurveyData[0]
    myAnswer: null, // 대답은 선택 안되어 있음
    answer_options: [], // 선택 버튼 묶은 초기 값 []
    disabled: true, // 안보이기
    endPage: false, // 마지막 페이지인지.
    obj_result: {}, //유형별 점수를 모두는 객체
    question_data: null, //filer를 거친 내용만 뿌려질 데이터
    answer_table: null //뿌리지않은 질문데이터 객체타입
  };

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
    let newArr = [];
    for (let key in this.state.answer_table) {
      debugger;
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
    this.setState({
      currentQuestion: 0,
      question_data: newArr //n개씩 유형별로 나눈것을 question_data 에 셋팅
    });
  }

  //이전 버튼에 대한 핸들링이 없다.

  // 질문지 불러오는 것
  SurvayHandler = () => {
    // console.log(SurvayData[0].question)
    console.log(this.state.question_data);

    let question1 = this.state.question_data[this.state.currentQuestion]
      .ques_msg; //질문
    console.log("question", question1);
    let result_answer1 = this.state.question_data[this.state.currentQuestion]
      .answers;
    console.log("answer", result_answer1);

    this.setState(() => {
      // 클릭하면 다음 순서대로 데이터 보여준다.
      // 새로 화면이 렌더 되어지므로 생명주기 api를 사용해야할듯?
      return {
        questions: question1,
        answer_options: result_answer1
      };
    });
  };

  // 첫 렌더 후에는 질문지 불러 온다.
  componentDidMount() {
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

      this.filterAnswerTable(2);
      this.SurvayHandler(); //질문지 불러오는 것을 셋팅한다.
    });
  }

  // 다음 질문 핸들러
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, obj_result, question_data, currentQuestion } = this.state;

    console.log(myAnswer);
    console.log("question_data");
    console.log(question_data[currentQuestion]);
    let holland = question_data[currentQuestion].holland;
    // 선택한 답변과  정답이 맞으면 스코어 점수 올라간다.
    if (!obj_result[holland.hol_name]) {
      obj_result[holland.hol_id] = 0;
    }
    //answer 중에 어떤 answer 인지 그에 맞게 스코어 값가져오올수있도록
    let selanswer = question_data[currentQuestion].answers.filter(result => {
      return result.ans_msg === myAnswer;
    });
    console.log(selanswer);
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
      }); //두개가져온다.
      this.setState({
        obj_result: newObj
      });
    }

    console.log(this.state.currentQuestion);
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
    const { obj_result } = this.state;
    let object_length = 0;
    for (let key in obj_result) {
      object_length++;
    }
    debugger;
    if (
      this.state.currentQuestion === this.state.question_data.length - 1 &&
      object_length <= 2
    ) {
      this.setState({
        endPage: true
      });
    }
  };

  render() {
    console.log(this.state);
    const {
      answer_options,
      myAnswer,
      currentQuestion,
      endPage,
      question_data,
      obj_result
    } = this.state;
    let object_length = 0;
    for (let key in obj_result) {
      object_length++;
    }
    //  !질문이 다 끝났을 경우 합산 스코어 보여준다.
    if (endPage) {
      return (
        <div className="result">
          <h1>질문에 대한 결과로 총합점수가{this.state.score}점 입니다.</h1>
          <h3>이 데이타 기반으로 유형별 점수 및 결론 도출 가능!</h3>

          {/*  //?여기서는 이제 정답지 보여주는 것 인데 사실 필요는 없다. */}
          <p>
            선택한 내용입니다.
            <ul>
              {SurvayData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.result_answer}
                </li>
              ))}
            </ul>
          </p>

          {/* //! 결과페이지 컴포넌트 입니다. 위 isEnd 시 페이지와 연동 필요합니다. */}
          <ResultPage></ResultPage>
        </div>
      );

      // 마지막 질문이 끝나지 않을 경우의 화면 렌더
    } else if (question_data) {
      return (
        <div className="App">
          {/*  질문이 들어갈 곳  */}
          <h1>{this.state.questions} </h1>

          {/* 총 질문 중에 몇번째 질문인지  */}
          <span>{`Questions ${currentQuestion + 1}  out of ${
            this.state.question_data.length
          } remaining `}</span>

          {/* 답변에 대한 배열 다루기 */}
          {answer_options.map((option, index) => (
            <p
              key={index}
              // 내가 클릭한 답변과 선택지가 일치시에  선택된거고, 아니면 null 이다.
              className={`answerOptions  ${
                myAnswer === option.ans_msg ? "selected" : null
              }`}
              // 그와 동시에 옵션버튼이 클릭된다.
              onClick={() => this.checkAnswer(option.ans_msg)}
            >
              {/*  화면에 보여질 옵션 내용 ->  네, 아니오, 잘 모르겠어요 */}
              {option.ans_msg}
            </p>
          ))}
          {/*이전 버튼 클릭시에 이전 페이지로 넘어가기*/}

          {/* 다음버튼 클릭시에 질문이 더 남았다면 다음 질문이 나오게 하고, 총 질문의 갯수를 줄여나간다.(끝까지)*/}
          {(currentQuestion < this.state.question_data.length - 1 ||
            object_length > 2) && (
            // 다음 버튼
            <button
              className="ui inverted button"
              // 버튼은 답 클릭전에는 비활성화 되어있다. 클릭시에 활성화된다.
              disabled={this.state.disabled}
              // 여기서 다음 질문 핸들러가 된다.
              onClick={this.nextQuestionHandler}
            >
              다음 질문
            </button>
          )}

          {/* 질문지의 마지막에는 finish 버튼 작동하게 한다. */}
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
      );
    } else if (question_data === null) {
      return <div className="App"> </div>;
    }
  }
}

export default MainSurvey;