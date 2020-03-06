import React from 'react';
import './EmailModal.scss';
import emailjs from 'emailjs-com';
import ReactTransitionGroup from 'react-addons-css-transition-group';

function Modal ({ isOpen, close }) {
       
    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('woody_gmail', 'template_PflyT5OP', e.target, "user_dUMuBzr7eeVB6qOLCeDvo")
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }

  


  if(isOpen) {
  return (
    <React.Fragment>
      <ReactTransitionGroup
        transitionName={'Modal-anim'}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
           <br>
           </br>
           <br>
           </br>
          <p className="title">메시지를 보내는 곳입니다.</p>
          <div className="content">
          <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <input type="hidden" name="to_name" />
      <label>이름</label>
      <input type="text" name="to_name" placeholder="이름을 입력해주세요" />
      <label>이메일 주소</label>
      <input type="email" name="from_name" placeholder="연락받고 싶은 메일 주소를 입력해주세요"/>
      <label>내용 입력하기</label>
      <textarea name="message_html" placeholder="상담받고 싶은 내용을 입력해주세요"></textarea>
    
        
          <div className="button-wrap">
            <button className="sendMessage" type="submit"onClick={close}>보내기완료</button>
            <button className="closeMessage" onClick={close}>접기</button>
          </div>
          </form>
          </div>
        </div>
         
       </ReactTransitionGroup>
       </React.Fragment>
  )
} else {
      return(
        <React.Fragment>
       <ReactTransitionGroup transitionName={'Modal-anim'} transitionEnterTimeout={200} transitionLeaveTimeout={200} />
       </React.Fragment>
      )
  }


  
}// 함수받고
export default Modal; 

