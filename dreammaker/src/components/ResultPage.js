import React, { Component } from "react";
import { Link, Route, withRouter, Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import "../css/Result.css";
import "../css/noscript.css";
import Logo from "../images/logo.svg";
import axios from "axios";
import Modal from './EmailModal';

// !  결과페이지 입니다.
// !  템플릿을 가져왔기 때문에 수정해야할 부분들이 많습니다.
// !  css는 건드릴 필요는 없고,
// !  렌더 부분의 태그들 수정해 주시면 됩니다.1

class ResultPage extends Component {
  constructor(props) {
    super(props);

    console.log("프롭스값1", this.props.surveyFinish);
    // surveyFinish: 1~6
    this.state = {
      HollandData: null,
      currentResult: 0, // 배열 인덱스 초기 번호 [0]
      hol_id: this.props.surveyFinish,
      job_options: [], // 직업 묶은 초기 값 []
      isModalOpen: false, 
    };
  }

  HollandHandler = () => {
    console.log("홀란드데이터 ", this.state.HollandData);
    console.log(this.state.hol_id, "hol_id값?");
    let hol_title = this.state.HollandData[0].hol_name; // 홀란드 유형
    console.log("홀란드유형은?:", hol_title);

    let hol_image = this.state.HollandData[0].holland_detail.hol_image;
    console.log("홀란드이미지", hol_image);

    let hol_message = this.state.HollandData[0].holland_detail.message_detail; //홀란드 유형 내용
    console.log("유형내용 :", hol_message);

    let hol_jobs = this.state.HollandData[0].jobs; // 유형별 직업들
    console.log("유형별 직업들", hol_jobs);

    let hol_jobs_name1 = this.state.HollandData[0].jobs[0].job_name; // 세부 직업이름
    console.log("직업이름1", hol_jobs_name1);

    let hol_jobs_detail1 = this.state.HollandData[0].jobs[0].job_detail;
    console.log("직업설명1", hol_jobs_detail1);

    let hol_jobs_image1 = this.state.HollandData[0].jobs[0].job_image;
    console.log("직업이미지1", hol_jobs_image1);

    let hol_jobs_name2 = this.state.HollandData[0].jobs[1].job_name; // 세부 직업이름
    console.log("직업이름2", hol_jobs_name2);

    let hol_jobs_detail2 = this.state.HollandData[0].jobs[1].job_detail;
    console.log("직업설명2", hol_jobs_detail2);

    let hol_jobs_image2 = this.state.HollandData[0].jobs[1].job_image;
    console.log("직업이미지2", hol_jobs_image2);

    let hol_jobs_name3 = this.state.HollandData[0].jobs[2].job_name; // 세부 직업이름
    console.log("직업이름3", hol_jobs_name3);

    let hol_jobs_detail3 = this.state.HollandData[0].jobs[2].job_detail;
    console.log("직업설명3", hol_jobs_detail3);

    let hol_jobs_image3 = this.state.HollandData[0].jobs[2].job_image;
    console.log("직업이미지3", hol_jobs_image3);
    console.log(this.state.hol_id, "hol_id값?");

    let result_id = this.state.hol_id;
    console.log("리절트 아이디 값: ", result_id);

    this.setState(() => {
      // 클릭하면 다음 순서대로 데이터 보여준다.
      // 새로 화면이 렌더 되어지므로 생명주기 api를 사용해야할듯?
      return {
        hol_title: hol_title,
        hol_message: hol_message,
        hol_image: hol_image,
        hol_jobs_name1: hol_jobs_name1,
        hol_jobs_detail1: hol_jobs_detail1,
        hol_jobs_image1: hol_jobs_image1,

        hol_jobs_name2: hol_jobs_name2,
        hol_jobs_detail2: hol_jobs_detail2,
        hol_jobs_image2: hol_jobs_image2,

        hol_jobs_name3: hol_jobs_name3,
        hol_jobs_detail3: hol_jobs_detail3,
        hol_jobs_image3: hol_jobs_image3,

        answer_options: hol_jobs,
        hol_id: result_id
      };
    });
  };

  go = () => {
    this.props.history.go();
  };

  goBack = () => {
    this.props.history.push("/survey");
  };




openModal = () => {
    this.setState({ isModalOpen: true });
  }
  
  closeModal = () => {
    this.setState({ isModalOpen: false }); 
  }


  componentDidMount() {

    // if(this.state.isModalOpen && this.props.history.action === "POP") {
    //     this.setState({ isModalOpen: false }); 
    //   }



    axios
      .post(`http://15.165.161.83:5000/holland/selhol`, {
        headers: { "Content-type": "application/json" },
        hol_id: this.props.surveyFinish
      })
      .then(res => {
        this.setState({
          HollandData: res.data
        });
        this.HollandHandler();
        //  console.log('홀란드:' , this.state.HollandData);
        // console.log('response', JSON.stringify(res.data, null, 2));
        console.log("job", res.data[0].jobs[0]); //
      })
      .catch(err => {
        console.log("응답실패..", err);
      });
  }




  render() {
    const { answer_options, hol_title, hol_message, hol_image } = this.state;

    console.log(this.state, "디스스테이트");

    const SLink = styled(Link)`
      text-decoration-color: red;
    `;

    return (
      <div id="wrapper">
        <div className="result_username">
          <span className="user_name">{this.props.username}</span>
          <span className="logOut">
          {/* <div style={{ paddingLeft: "1600px" }}> */}
            {/* <span>{username}</span>
            <span style={{margin: "15px",fontSize: "25px"}}> */}
              <Link to="/logout">로그아웃</Link>
            {/* </span> */}
          </span>
        </div>
        {/* 
    <!-- Header --> */}
        <header id="header" className="alt">
          <span className="logo">
            <img src={Logo} alt="" />
          </span>
          <h1 className="user_name">
            {this.props.username}님의 검사 결과는 {hol_title}입니다.
          </h1>
          <p>DreamMaker와 여러분의 꿈을 찾아보아요</p>
        </header>

        {/* <!-- Nav --> */}
        <nav id="nav">
          <ul>
            <li>
              <a href="#intro" className="active">
                타입
              </a>
            </li>
            <li>
              <a href="#first">직업</a>
            </li>
            <li>
              <a href="#cta">메일 보내기</a>
            </li>
          </ul>
        </nav>

        {/*  <!-- Main --> */}
        <div id="main">
          {/* <!-- Introduction --> */}
          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>{hol_title} 타입</h2>
                </header>
                <p>{hol_message}</p>
                <ul className="actions">
                  {/* <li><a href="generic.html" className="button">유형타입 보러가기 링크</a></li> */}
                </ul>
              </div>
              <span className="image">
                <img src={hol_image} alt="타입이미지" />
              </span>
            </div>
          </section>

          {/* <!-- First Section --> */}
          <section id="first" className="main special">
            {/* //! major : css-> 배경색으로 된 밑줄 관련 클래스 입니다. */}
            <header className="major">
            <h1 className="job_user_name">
              {this.props.username} 님께 추천드려요 - {hol_title} 타입에 어울리는 직업은?
              </h1>
            </header>
            <ul className="features">
              <li>
                <span className="icon major style5">
                  <img
                    src={this.state.hol_jobs_image1}
                    alt={this.state.hol_jobs_name1}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "fill", borderRadius: "50%" }}
                  />

                  {/* // Todo 배열로 된 직업 내용들을 풀어야 한다.  */}
                </span>
                <h2>{this.state.hol_jobs_name1}</h2>
                <p className="job_content">{this.state.hol_jobs_detail1}</p>
              </li>

              <li>
                <span className="icon major style5">
                  <img
                    src={this.state.hol_jobs_image2}
                    alt={this.state.hol_jobs_name2}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "fill", borderRadius: "50%" }}
                  />
                </span>
                <h2>{this.state.hol_jobs_name2}</h2>
                <p className="job_content">{this.state.hol_jobs_detail2}</p>
              </li>
              <li>
                <span className="icon major style5 ">
                  <img
                    src={this.state.hol_jobs_image3}
                    alt={this.state.hol_jobs_name3}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "fill", borderRadius: "50%" }}
                  />
                </span>
                <h2>{this.state.hol_jobs_name3}</h2>
                <p className="job_content">{this.state.hol_jobs_detail3}</p>
              </li>
            </ul>
          </section>

          {/* <!-- Second Section --> */}

          {/* <!-- Get Started --> */}
          <section id="cta" className="main special">
            <header className="major">
            <h2 className="job_user_name">도움이 필요한가요??</h2>
              <p>
                검사를 해도 망설이고 계시는 <h1 style={{fontFamily:`Nanum Pen Script, cursive`,  fontSize :'50px'}}>{this.props.username}님</h1>  이젠 전문가에게 질문을 해보세요!
                <br />
              </p>
            </header>
            <footer className="major">
              <ul className="actions special">
                <li>
                <button className="send_m" onClick={this.openModal}>메일 보내기</button>
                <Modal 
                isOpen={this.state.isModalOpen} 
                close={this.closeModal} />

                  {/* <a href="generic.html" className="button primary">메시지 보내기</a> */}
                </li>
              </ul>
            </footer>
          </section>
        </div>
        <h1 style={{fontFamily:`Nanum Pen Script, cursive`,  fontSize :'50px'}}>Made by Dreammaker</h1>
      </div>
    );
  }
}

export default withRouter(ResultPage);
