import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { fakeData } from "./fakeData";
import "../css/Result.css";
import "../css/noscript.css";
import { Images } from "./Images";
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

/* 
! 현재는 SubApp 페이지와의 연결을 막아놨습니다.
? 서베이 기능부터 하는게 우선이기 때문에 
? 기능이 부족한 현재 페이지는 나중에 서베이 기능이 완성되면 합치던지 제거하던지 하려 합니다
*/


// sub-app의 역할은
// 설문 페이지를 전체적으로 보여줄 역할

//!sub-app 안에 user-info(이름, 나이 , 성별,  시작하기)  - 비회원시 입력할 폼
//! sub-app 안에 question.js,  child-q , child-a  그리고 pic-app 이 있다.
//! 한 화면에 설문 데이터 다 보여주고(1번 제외한 나머지는 none) 버튼에 따라 다음 꺼 보여주는 식

class SubApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surveyData: fakeData, // 설문화면을 Fakedata로 보여줌
      answerBTN: 0, // 답변버튼 기본값 0
      firstQuestion: null, // 첫 질문 값은 null
      count: 1, // div용 첫번째 id 값
      display: "block", // 1번째 질문용 display
      otherDisplay: "none" // 나머지 질문용 화면 기본 안보임
    };
  }

  //! '네' 버튼
  yesBTN = event => {
    console.log("네1");
    event.preventDefault();
    this.setState({ answerBTN: 1 });
  };

  //! '아니오' 버튼
  noBTN = event => {
    console.log("아니오");
    event.preventDefault();
    this.setState({ answerBTN: 2 });
  };

  //! '잘 모르겠어요' 버튼
  bothBTN = event => {
    event.preventDefault();
    console.log("잘모르겠어요");
    this.setState({ answerBTN: 3 });
  };

  //! 질문 사라지게 하는 테스트용 핸들러
  //! <div id=q[count]-area>의 값이 바뀌면서 각 id의 display값 도 변한다.
  //! 1회성 밖에 안되어 실패.
  // 클릭시 현재 나와 있는 <id = q1-area>는 none이 되야하고,
  //다음 화면인 <id=q2-area>는 block이 되야한다.
  // 설정을 제대로 못해서 1번 질문은 사라지지만, 나머지 모든 질문이 보이게 된다.
  toggle = e => {
    e.preventDefault();
    this.setState(data => ({
      count: data.count + 1,
      display: "none",
      otherDisplay: "block"
    }));
  };

  render() {
    const { count, display, otherDisplay } = this.state;
    const { answerBTN } = this.state;

    console.log(`현재 id =q${count}-area`, `display : ${display}`);

    return (
      <div className="Sub_app">
        <center className="Sub_app_title">
          <h1>설문조사 페이지입니다</h1>
        </center>

        <div className="c-container">
          {/* <form action="/curation/process" method="post"> */}
          {/* //? 질문 1 */}
          {/* 클릭하면 이 영역이 사라진다. */}
          {/* <div id="qtest-area" className={'hide-' + this.state.hide}> */}

          {/* //! --------- 질문1-------------- */}
          {/* <div id={`q${count}-area`} style={{ display: display }}> */}
          <div id="q1-area" style={{ display: otherDisplay }}>
            <h3 className="u-text-sup u-color-green">1/4</h3>
            <h1 className="u-text-title">Q. 노래방 가는 것을 좋아하나요?</h1>
            <div className="row mt-10">
              <div className="col-sm-12">
                <div className="c-form-group">
                  <div className="c-form-group-label">
                    <label className="u-text-lead" />

                    <label className="u-text-lead" />

                    <label className="u-text-lead" />
                  </div>
                </div>
              </div>
            </div>

            <center>
              <button onClick={this.toggle}>질문사라지기</button>

              <button onClick={this.yesBTN} type="submit">
                네
              </button>

              <button onClick={this.noBTN} type="submit">
                아니오
              </button>

              <button onClick={this.bothBTN} type="submit">
                잘 모르겠어요
              </button>
            </center>
          </div>
          {/* //? ------------질문1 끝----------------------- */}

          {/* //! --------- 질문2-------------- */}
          {/* hide-true : display : none */}
          {/* <div id="q2-area" className={'hide-' + !this.state.hide}> */}

          <div id="q2-area" style={{ display: otherDisplay }}>
            <h3 className="u-text-sup u-color-green">2/4</h3>
            <h1 className="u-text-title">
              Q.박물관을 가거나, 전시회 관람하는 것을 좋아하시나요?
            </h1>
            <div className="row mt-10">
              <div className="col-sm-12">
                <div className="c-form-group">
                  <div className="c-form-group-label">
                    <label className="u-text-lead" />

                    <label className="u-text-lead" />

                    <label className="u-text-lead" />
                  </div>
                </div>
              </div>
            </div>

            <center>
              <button onClick={this.toggle}>질문사라지기</button>

              <button onClick={this.yesBTN} type="submit">
                네
              </button>

              <button onClick={this.noBTN} type="submit">
                아니오
              </button>

              <button onClick={this.bothBTN} type="submit">
                잘 모르겠어요
              </button>
            </center>
          </div>
          {/* //? ------------질문2 끝----------------------- */}

          {/* //! --------- 질문3-------------- */}
          {/* hide-true : display : none */}
          <div id="q3-area" style={{ display: otherDisplay }}>
            <h3 className="u-text-sup u-color-green">3/4</h3>
            <h1 className="u-text-title">Q. 저녁은 드셨나요?</h1>
            <div className="row mt-10">
              <div className="col-sm-12">
                <div className="c-form-group">
                  <div className="c-form-group-label">
                    <label className="u-text-lead" />

                    <label className="u-text-lead" />

                    <label className="u-text-lead" />
                  </div>
                </div>
              </div>
            </div>

            <center>
              <button onClick={this.toggle}>질문사라지기</button>

              <button onClick={this.yesBTN} type="submit">
                네
              </button>

              <button onClick={this.noBTN} type="submit">
                아니오
              </button>

              <button onClick={this.bothBTN} type="submit">
                잘 모르겠어요
              </button>
            </center>
          </div>
          {/* //? ------------질문3 끝----------------------- */}

          {/* //! --------- 질문4-------------- */}
          {/* hide-true : display : none */}
          {/* <div id="q4-area" className={'hide-' + this.state.hide} > */}
          <div id="q4-area" style={{ display: otherDisplay }}>
            <h3 className="u-text-sup u-color-green">4/4</h3>
            <h1 className="u-text-title">Q. 밖에서 활동하는 편인가요?</h1>
            <div className="row mt-10">
              <div className="col-sm-12">
                <div className="c-form-group">
                  <div className="c-form-group-label">
                    <label className="u-text-lead" />

                    <label className="u-text-lead" />

                    <label className="u-text-lead" />
                  </div>
                </div>
              </div>
            </div>

            <center>
              <button onClick={this.toggle}>질문사라지기</button>

              <button onClick={this.yesBTN} type="submit">
                네
              </button>

              <button onClick={this.noBTN} type="submit">
                아니오
              </button>

              <button onClick={this.bothBTN} type="submit">
                잘 모르겠어요
              </button>
            </center>
          </div>
          {/* //? ------------질문4 끝----------------------- */}

          {/* </form> */}

          {/* //! 다시 로그인 화면으로 돌아가는 버튼 입니다. */}
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.history.push("/home");
            }}
          >
            <aside>
              <button className="backHome-btn" type="submit">
                홈 화면으로 돌아가기
              </button>
            </aside>
          </form>

          <div className="Survey-form">
            <form
              onSubmit={event => {
                event.preventDefault();
                this.props.history.push("/subApp/");
              }}
            ></form>

            {/* //! 이미지 컴포넌트에 클릭한 버튼 값을 보내줍니다. 클릭한 버튼 값에 따라 다른 이미지가 보여집니다. */}
            <nav className="Question-Img">
              <Images answerBTN={answerBTN} />
            </nav>
          </div>

          {/* //! 설문조사 ver2로 가는 버튼입니다. */}
          <div>
            <form
              onSubmit={ev => {
                ev.preventDefault();
                this.props.history.push("/survey");
              }}
            >
              <button className="survey2-btn" type="submit">
                설문조사 VER2 로 가기
              </button>
            </form>
          </div>

          {/* //! 결과화면을 보여주는 버튼입니다. */}
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.history.push("/result");
            }}
          >
            <button className="result-btn" type="submit">
              결과화면 보기(테스트)
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SubApp);
