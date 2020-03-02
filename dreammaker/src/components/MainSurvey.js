import React ,{Component}from "react";
import { SurvayData } from "./SurveyData";
import ResultPage from "./ResultPage";


class MainSurvey extends Component {
  state = {
    currentQuestion: 0,          // 배열 인덱스 초기 번호 [0]   ->  SurveyData[0]
    myAnswer: null,              // 대답은 선택 안되어 있음 
    answer_options: [],          // 선택 버튼 묶은 초기 값 []
    score: 0,                    // 최종 스코어러 
    disabled: true,              // 안보이기 
    endPage: false                 // 마지막 페이지인지.
  };



  // 질문지 불러오는 것 
  SurvayHandler = () => {
    // console.log(SurvayData[0].question)
    this.setState(() => {
        // 클릭하면 다음 순서대로 데이터 보여준다.

    // 새로 화면이 렌더 되어지므로 생명주기 api를 사용해야할듯?
      return {
        questions: SurvayData[this.state.currentQuestion].question,
        result_answer: SurvayData[this.state.currentQuestion].result_answer,
        answer_options: SurvayData[this.state.currentQuestion].answer_options
      };
    });
  };



  // 첫 렌더 후에는 질문지 불러 온다. 
  componentDidMount() {
    this.SurvayHandler();
  }








  // 다음 질문 핸들러 
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer,  result_answer, score } = this.state;




    // 선택한 답변과  정답이 맞으면 스코어 점수 올라간다.
    if (myAnswer ===  result_answer) {
      this.setState({
        score: score + 1
      });
    }

    // 그와 동시에 질문 인덱스 번호 +1 해서 다음 질문으로 넘어가게 한다. 
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });


    console.log(this.state.currentQuestion);
  };







 // 컴포넌트가 리렌더링을 마친 뒤에 실행된다. 

//  componentDidUpdate(prevProps, prevState){
//   console.log("componentDidUpdate: " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
// }

 // 이전 props와  이전  state에 대한 정보 
// https://feel5ny.github.io/2017/12/23/log_002/

  componentDidUpdate(prevProps, prevState) {


    // 현재 보여줄 질문지랑 지난 질문지가 다를 때 처리 
    if (this.state.currentQuestion !== prevState.currentQuestion) {
     
        // 화면에 안보이게 한다. 
        this.setState(() => {
        return {
          disabled: true,
          questions: SurvayData[this.state.currentQuestion].question,
          answer_options: SurvayData[this.state.currentQuestion].answer_options,
          result_answer: SurvayData[this.state.currentQuestion].result_answer
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
    if (this.state.currentQuestion === SurvayData.length - 1) {
      this.setState({
        endPage: true
      });

    }
  };




  render() {
    const { answer_options, myAnswer, currentQuestion, endPage } = this.state;


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
    } else {
      return (
        <div className="App">

          {/*  질문이 들어갈 곳  */}
          <h1>{this.state.questions} </h1>


          {/* 총 질문 중에 몇번째 질문인지  */}
          <span>{`Questions ${currentQuestion + 1}  out of ${SurvayData.length} remaining `}</span>



         {/* 답변에 대한 배열 다루기 */}
          {answer_options.map(option => (
            <p key={option.id}
              // 내가 클릭한 답변과 선택지가 일치시에  선택된거고, 아니면 null 이다. 
              className={`answerOptions  ${myAnswer === option ? "selected" : null}`}
             
              // 그와 동시에 옵션버튼이 클릭된다.
              onClick={() => this.checkAnswer(option)}
            >
              {/*  화면에 보여질 옵션 내용 ->  네, 아니오, 잘 모르겠어요 */}
              {option}
            </p>
          ))}




          {/* 다음버튼 클릭시에 질문이 더 남았다면 다음 질문이 나오게 하고, 총 질문의 갯수를 줄여나간다.(끝까지)*/}
          {currentQuestion < SurvayData.length - 1 && (
          
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
          {currentQuestion === SurvayData.length - 1 && (
            <button className="survey-finish-button" onClick={this.surveyFinish}>
              제출하기
            </button>
          )}
        </div>
      );
    }
  }
}

export default MainSurvey;
