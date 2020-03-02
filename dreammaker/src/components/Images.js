import React from 'react';
import Smile from '../images/smile.png';
import Normal from '../images/normal.png';
import Heart from '../images/heart.png';

// 이미지 버튼에 대한 값 따라서 보여주는 이미지가 다르다 
// 현재 import된 이미지는 예시용 이미지 입니다.
// 설문조사시에 예 아니오 잘모르겠습니다 버튼을 누르게 되는데 버튼을 누름에 따라 다음 화면에서 보여주는 이미지를 변화시켜 재미를 줍니다.
// 버튼에 따른 이미지의 결과가 상황에 맞아야 하므로, 랜덤이미지 보다는 조건문에 따른 이미지를 보여주는 것이 좋다고 판단.


export function Images(props){

    // pic_app페이지로 넘어올 설문 응답 버튼 값 
  const {answerBTN} = props;
  console.log("pic_app.js에 넘어온 버튼 번호 값은? :", answerBTN);

    // 대답버튼이 1을 선택 했을 경우(네)  -> 웃는 이미지 
    if(answerBTN === 1){
        return (
            <div className ="">
               <img src ={Smile} 
               alt ='Smile' 
               width ='100' 
               height ='200'/>
            </div>
        );
    } 


    // 대답버튼이 2를 선택했을 경우(아니오)   -> 무표정 이미지
    if(answerBTN === 2){
       return (
           <div className ="">
               <img 
               src ={Normal} 
               alt ='Normal'  
               width ='100' 
               height ='200'/>
           </div>
       )
    }


    
    // 대답버튼이 0을 선택했을 경우(잘 모르겠습니다.)  -> 하트 이미지
    if(answerBTN === 3){
        return(
             <div className ="">
                <img 
                src ={Heart} 
                alt ='Heart'  
                width ='100' 
                height ='200'/>
            </div>
        )
    }
    // 기본값 이미지는 없어야 한다 block 처리
     if(answerBTN === 0){
        return(
            <div className ="">
               
           </div>
       )
     }



}

