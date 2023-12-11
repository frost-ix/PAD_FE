import './SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const memID = form.elements.memID.value;
        const memPW = form.elements.memPW.value;
        const memNN = form.elements.memNN.value;
        const memTel = form.elements.memTel.value;
        const memMail = form.elements.memMail.value;
      
        const member = {
          memID : memID,
          memPW : memPW,
          memNN : memNN,
          memTel : memTel,
          memMail : memMail
        };
        
        try {
          const response = await fetch(`/proxy/member/SignUp`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
          });
          if (response.ok) {
            alert("회원가입 성공")
            navigate('/SignIn');
          } else {
            alert("회원가입 실패")
          }
          } catch (error) {
            alert(error);
          }

    };
    return(


    <div className="SignUp">
      <div className ="signup-card">
          <div className="signup-left">
            <form onSubmit={handleSubmit} className="signup-left-form">
              <h3 className="signup-left-title">Sign Up</h3>
              <input type="text" name="memID" placeholder="&nbsp;&nbsp;&nbsp;아이디" required className="signup-id"/><br />
              <input type="password" name="memPW" placeholder="&nbsp;&nbsp;&nbsp;비밀번호" required className="signup-pass"/><br />
              <input type="text" name="memNN" placeholder="&nbsp;&nbsp;&nbsp;닉네임" required className="signup-name"/><br />
              <input type="text" name="memTel" placeholder="&nbsp;&nbsp;&nbsp;연락처" required className="signup-tel"/><br />
              <input type="text" name="memMail" placeholder="&nbsp;&nbsp;&nbsp;이메일" required className="signup-mail"/><br />
              <input type="submit" value="회원가입" className="signup-button"/>
            </form>
          </div>

          <div className="signup-right">

            {/* <h1 className="signup-right-title">PAD</h1> */}
            <h1 className="signin-left-title">PAD</h1>
              <p className="signin-intro">여러분을 우리 클럽에 초대합니다!<br/>
              다양한 사람들을 초대하고<br/>
              다양한 일들을 경험할 수 있는<br/>
              이곳은 PAD입니다.
              </p>
             <span className="signin-ask">계정이 있으신가요?</span>
              <button className="left-button" onClick={()=>navigate('/SignIn')}>Login</button>
          </div>
      </div>
        
     </div>
    )
}

export default SignUp