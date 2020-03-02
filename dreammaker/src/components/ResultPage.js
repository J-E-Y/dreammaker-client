import React, { Component } from 'react';
import Youtuber from '../images/youtuber.jpg';
// import Smile from '../images/smile.png';
// import Normal from '../images/normal.png';
// import Heart from '../images/heart.png';
import "../css/Result.css";
import "../css/noscript.css";
import Logo from '../images/logo.svg';


// !  결과페이지 입니다.
// !  템플릿을 가져왔기 때문에 수정해야할 부분들이 많습니다.
// !  css는 건드릴 필요는 없고, 
// !  렌더 부분의 태그들 수정해 주시면 됩니다.

class ResultPage extends Component {

      state = {

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
      }


    render() {
        // const {resultData, person} = this.state;
        console.log(this.state.resultData[0]);
      
        return (



	<div id="wrapper">
{/* 
    <!-- Header --> */}
        <header id="header" class="alt">
            <span class="logo"><img src={Logo} alt="" /></span>
            <h1>큰 제목 - 결과에 대한 유형을 보여줄 페이지112233</h1>
            <p>Just another free, fully responsive site template<br />
            built by <a href="www.naver.com">www.naver.com</a>.</p>
        </header>

    {/* <!-- Nav --> */}
        <nav id="nav">
            <ul>
                <li><a href="#intro" class="active">반응형 클릭버튼 1</a></li>
                <li><a href="#first">반응형 클릭버튼 2</a></li>
                <li><a href="#second">반응형 클릭버튼 3</a></li>
                <li><a href="#cta">반응형 클릭버튼 4</a></li>
            </ul>
        </nav>
{/* 
    <!-- Main --> */}
        <div id="main">

            {/* <!-- Introduction --> */}
                <section id="intro" class="main">
                    <div class="spotlight">
                        <div class="content">
                            <header class="major">
                                <h2>예술형 타입</h2>
                            </header>
                            <p>예술형타입은 어쩌구 저쩌구 블라블라 ~~~ 데이터 넣을 때는 어떻게 하냐??
                               시간돌리도 ~~~~~~
                            </p>
                            <ul class="actions">
                                <li><a href="generic.html" class="button">유형타입 보러가기 링크</a></li>
                            </ul>
                        </div>
                        <span class="image"><img src="images/pic01.jpg" alt="" /></span>
                    </div>
                </section>

            {/* <!-- First Section --> */}
                <section id="first" class="main special">
                    <header class="major">
                        <h2>여기는 추천 직업 공간 - Ex. 예술형에 어울리는 직업은?</h2>
                    </header>
                    <ul class="features">
                        <li>
              <span class="icon solid major style1 fa-code">
                  <img src={Youtuber} alt="유튜버" width='100%' height='100%' 
                  style={{objectFit:'fill',borderRadius:'50%'}}/>
                     

                      </span>
                            <h3>유튜브 크리에이터</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                        <li>
                            <span class="icon major style3 fa-copy"></span>
                            <h3>연예인 매니저</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                        <li>
                            <span class="icon major style5 fa-gem"></span>
                            <h3>펭수</h3>
                            <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                        </li>
                    </ul>
                    <footer class="major">
                        <ul class="actions special">
                            <li><a href="generic.html" class="button">Learn More- 더보기란 없앨예정</a></li>
                        </ul>
                    </footer>
                </section>

            {/* <!-- Second Section --> */}
                <section id="second" class="main special">
                    <header class="major">
                        <h2>여기는 뭘로 해야하나?? 유형 점수별 분포??</h2>
                        <h2>아니면 여기다가 추천 직업??</h2>
                        <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
                        posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                    </header>
                    <ul class="statistics">
                        <li class="style1">
                            <span class="icon solid fa-code-branch"></span>
                            <strong>5,120</strong> Etiam
                        </li>
                        <li class="style2">
                            <span class="icon fa-folder-open"></span>
                            <strong>8,192</strong> Magna
                        </li>
                        <li class="style3">
                            <span class="icon solid fa-signal"></span>
                            <strong>2,048</strong> Tempus
                        </li>
                        <li class="style4">
                            <span class="icon solid fa-laptop"></span>
                            <strong>4,096</strong> Aliquam
                        </li>
                        <li class="style5">
                            <span class="icon fa-gem"></span>
                            <strong>1,024</strong> Nullam
                        </li>
                    </ul>
                    <p class="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
                    <footer class="major">
                        <ul class="actions special">
                            <li><a href="generic.html" class="button">Learn More</a></li>
                        </ul>
                    </footer>
                </section>

            {/* <!-- Get Started --> */}
                <section id="cta" class="main special">
                    <header class="major">
                        <h2>도움이 필요한가요??</h2>
                        <p>검사를 해도 어려운 당신! 전문가에게 질문을 해보세요!<br />
                        posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                    </header>
                    <footer class="major">
                        <ul class="actions special">
                            <li><a href="generic.html" class="button primary">메시지 보내기</a></li>
                            <li><a href="generic.html" class="button">다시 설문하기</a></li>
                        </ul>
                    </footer>
                </section>

        </div>

    {/* <!-- Footer --> */}
        <footer id="footer">
            <section>
                <h2>아 오늘 한게 없다 </h2>
                <p>Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas velit, vitae tincidunt odio.</p>
                <ul class="actions">
                    <li><a href="generic.html" class="button">Learn More</a></li>
                </ul>
            </section>
            <section>
                <h2>박성용</h2>
                <dl class="alt">
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
            <p class="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>

</div>
        )

        }
}

export default ResultPage;










