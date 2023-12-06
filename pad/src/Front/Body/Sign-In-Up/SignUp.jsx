import './SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
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
        fetch('/SignUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(member),
        })
          .then(response => response.json())
          .then(data => {
            alert("회원가입 성공")
            console.log('응답 데이터:', data);
          })
          .catch(error => {
            alert("회원가입 실패")
            console.error('오류 발생:', error);
          })
    };
    return(
        <div className="SignUp">
            <form onSubmit={handleSubmit}>
            <p className='plogin'>회원가입</p>
            <input type="text" name="memID" placeholder="&nbsp;&nbsp;&nbsp;아이디" required /><br />
            <input type="password" name="memPW" placeholder="&nbsp;&nbsp;&nbsp;비밀번호" required /><br />
            <input type="text" name="memNN" placeholder="&nbsp;&nbsp;&nbsp;닉네임" required /><br />
            <input type="text" name="memTel" placeholder="&nbsp;&nbsp;&nbsp;연락처" required /><br />
            <input type="text" name="memMail" placeholder="&nbsp;&nbsp;&nbsp;이메일" required /><br />
            <input type="submit" value="회원가입" />
        </form>
        </div>
    )
}

export default SignUp