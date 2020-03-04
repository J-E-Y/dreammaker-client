import React, { Component } from 'react';
import Youtuber from '../images/youtuber.jpg';
import { Redirect, Link, withRouter, Route } from "react-router-dom";
import styled from "styled-components";
import "../css/Result.css";
import "../css/noscript.css";
import Logo from '../images/logo.svg';
import axios from 'axios';

// !  결과페이지 입니다.
// !  템플릿을 가져왔기 때문에 수정해야할 부분들이 많습니다.
// !  css는 건드릴 필요는 없고, 
// !  렌더 부분의 태그들 수정해 주시면 됩니다.

class ResultPage extends Component {

      state = {
        
        HollandData: null,

        hol_id: null,

        job_options : [],  
    

         person: "박성용",
          resultData : [
              { id: 0,
                title: '예술형',
				message: `예술형은 예술 작업에 직접 참여하거나 관객 또는 관찰자가 되는 것을 좋아합니다.
				예술형이라고 해서 꼭 예술가가 되는 것은 아니고 예술과 관련된 여가를 즐기는 사람도 해당됩니다.  
				자신에게 예술형의 특징이 있다고 해서 꼭 예술 분야 직업을 갖는게 아니라 예술을 즐기는 사람들도 많다는 뜻입니다. 
				예술형은 창의성을 지향합니다.아이디어를 새로운 방식으로 표현해 내는 작업, 똑같은 사물이나 현상을 보았어도자신만의 독특한 방식으로 표현하는 것을 좋아합니다. 
				항상 뭔가를 그리거나 만들고,곡을 만들고 장식하기를 좋아합니다.`, 

                jobName: '유튜브 크리에이터' 

              }
    ]
      };

    HollandHandler = () => {
    console.log("홀란드데이터", this.state.HollandData);
    
    let hol_title = this.state.HollandData[0].hol_name; // 홀란드 유형
     console.log("홀란드유형은?:" , hol_title);

    let hol_image = this.state.HollandData[0].holland_detail.hol_image;
    console.log("홀란드이미지", hol_image);
    
    let hol_message = this.state.HollandData[0].holland_detail.message_detail; //홀란드 유형 내용
    console.log("유형내용 :" , hol_message);

    let hol_jobs = this.state.HollandData[0].jobs;  // 유형별 직업들 
    console.log("유형별 직업들" ,hol_jobs);

    let hol_jobs_name = this.state.HollandData[0].jobs[0].job_name; // 세부 직업이름
    console.log('직업이름' , hol_jobs_name);

    let hol_jobs_detail = this.state.HollandData[0].jobs[0].job_detail;
    console.log('직업설명' , hol_jobs_detail);
    
    let hol_jobs_image = this.state.HollandData[0].jobs[0].job_image;
    console.log('직업이미지' , hol_jobs_image);
    
    this.setState(() => {
        // 클릭하면 다음 순서대로 데이터 보여준다.
        // 새로 화면이 렌더 되어지므로 생명주기 api를 사용해야할듯?
        return {
            hol_title:  hol_title,
            hol_message: hol_message,
            hol_image : hol_image,
            hol_jobs_name: hol_jobs_name,
            hol_jobs_detail: hol_jobs_detail,
            hol_jobs_image : hol_jobs_image,
            answer_options: hol_jobs
        };
      });



}





    
      componentDidMount(){
 
        axios.post(`http://15.165.161.83:5000/holland/selhol`, 
        { headers:  {'Content-type': 'application/json'}, 
         hol_id : '1'})
        .then(res => { 
            this.setState({HollandData : res.data});
            this.HollandHandler();
         //  console.log('홀란드:' , this.state.HollandData);
        // console.log('response', JSON.stringify(res.data, null, 2));
        console.log('job', res.data[0].jobs[0]);  // 정원사
        })
        .catch( err => { 
            console.log('응답실패..', err) 
        })

       
      }







    render() {
        
   
  const {answer_options,
    hol_title,
    hol_message,
    hol_image,
    hol_jobs_name,
    hol_jobs_detail,
    hol_jobs_image} = this.state;


    const SLink = styled(Link)
    `text-decoration-color: red`

        return (



	<div id="wrapper">
{/* 
    <!-- Header --> */}
        <header id="header" className="alt">
            <span className="logo"><img src={Logo} alt="" /></span>
              <h1>____님의 검사 결과는 {hol_title}입니다.</h1>
            <p>DreamMaker와 여러분의 꿈을 찾아보아요</p>
        </header>

    {/* <!-- Nav --> */}
        <nav id="nav">
            <ul>
                <li><a href="#intro" className="active">반응형 클릭버튼 1</a></li>
                <li><a href="#first">반응형 클릭버튼 2</a></li>
                <li><a href="#second">반응형 클릭버튼 3</a></li>
                <li><a href="#cta">반응형 클릭버튼 4</a></li>
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
                                <li><a href="generic.html" className="button">유형타입 보러가기 링크</a></li>
                            </ul>
                        </div>
                        <span className="image"><img src={hol_image} alt="타입이미지" /></span>
                    </div>
                </section>

            {/* <!-- First Section --> */}
                <section id="first" className="main special">
                    {/* //! major : css-> 배경색으로 된 밑줄 관련 클래스 입니다. */}
                    <header className="major">
                        <h2>여기는 추천 직업 공간 - {hol_title} 타입에 어울리는 직업은?</h2>
                    </header>
                    <ul className="features">
                        <li>
              <span className="icon solid major style1 fa-code">
                  <img src={hol_jobs_image} alt="정원사" width='100%' height='100%' 
                  style={{objectFit:'fill',borderRadius:'50%'}}/>
                     
                     
                     {/* // Todo 배열로 된 직업 내용들을 풀어야 한다.  */}
                      </span>
                            <h3>{hol_jobs_name}</h3>
                            <p>{hol_jobs_detail}</p>
                        </li>


                        <li>
                            <span className="icon major style3 fa-copy">
                            <img src={''} alt="지금은 Null값" width='100%' height='100%' 
                            style={{objectFit:'fill',borderRadius:'50%'}}/>
   
                            </span>
                            <h3>연예인 매니저</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                        <li>
                            <span className="icon major style5 fa-gem"></span>
                            <h3>펭수</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                    </ul>
                    <footer className="major">
                        <ul className="actions special">
                            <li><a href="generic.html" className="button">Learn More- 더보기란 없앨예정</a></li>
                        </ul>
                    </footer>
                </section>

            {/* <!-- Second Section --> */}
                <section id="second" className="main special">
                    <header className="major">
                        <h2>여기는 뭘로 해야하나?? 유형 점수별 분포??</h2>
                        <h2>아니면 여기다가 추천 취미??</h2>
                        <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
                        posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                    </header>
                    <ul className="statistics">
                        <li className="style1">
                            <span className="icon solid fa-code-branch"></span>
                            <strong>5,120</strong> Etiam
                        </li>
                        <li className="style2">
                            <span className="icon fa-folder-open"></span>
                            <strong>8,192</strong> Magna
                        </li>
                        <li className="style3">
                            <span className="icon solid fa-signal"></span>
                            <strong>2,048</strong> Tempus
                        </li>
                        <li className="style4">
                            <span className="icon solid fa-laptop"></span>
                            <strong>4,096</strong> Aliquam
                        </li>
                        <li className="style5">
                            <span className="icon fa-gem"></span>
                            <strong>1,024</strong> Nullam
                        </li>
                    </ul>
                    <p className="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
                    <footer className="major">
                        <ul className="actions special">
                            <li><a href="generic.html" className="button">Learn More</a></li>
                        </ul>
                    </footer>
                </section>

            {/* <!-- Get Started --> */}
                <section id="cta" className="main special">
                    <header className="major">
                        <h2>도움이 필요한가요??</h2>
                        <p>검사를 해도 어려운 당신! 전문가에게 질문을 해보세요!<br />
                        posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                    </header>
                    <footer className="major">
                        <ul className="actions special">
                            <li>
                 
                 <a href="generic.html" className="button primary">메시지 보내기</a>
                
                 </li>
                            <li>
                 <SLink to="/survey">           
                 <a href="generic.html" className="button">다시 설문하기</a>
                 </SLink>
                            </li>
                        </ul>
                    </footer>
                </section>

        </div>

    {/* <!-- Footer --> */}
        <footer id="footer">
            <section>
                <h2>아 오늘 한게 없다 </h2>
                <p>Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas velit, vitae tincidunt odio.</p>
                <ul className="actions">
                    <li><a href="generic.html" className="button">Learn More</a></li>
                </ul>
            </section>
            <section>
                <h2>박성용</h2>
                <dl className="alt">
                    <dt>Address</dt>
                    <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
                    <dt>Phone</dt>
                    <dd>(000) 000-0000 x 0000</dd>
                    <dt>Email</dt>
                    {/* <dd><a href="#">information@untitled.tld</a></dd> */}
                </dl>
                {/* <ul class="icons">
                    <li><a href="#" class="icon brands fa-twitter alt"><span class="label">Twitter</span></a></li>
                    <li><a href="#" class="icon brands fa-facebook-f alt"><span class="label">Facebook</span></a></li>
                    <li><a href="#" class="icon brands fa-instagram alt"><span class="label">Instagram</span></a></li>
                    <li><a href="#" class="icon brands fa-github alt"><span class="label">GitHub</span></a></li>
                    <li><a href="#" class="icon brands fa-dribbble alt"><span class="label">Dribbble</span></a></li>
                </ul> */}
            </section>
            <p className="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>

</div>
        )

        }
}

export default ResultPage;










