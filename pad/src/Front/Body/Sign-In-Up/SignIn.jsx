import './SignIn.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const memID = form.elements.memID.value;
        const memPW = form.elements.memPW.value;
      
        const member = {
          memID : memID,
          memPW : memPW,
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
            alert("로그인 성공")
            console.log('응답 데이터:', data);
            navigate('/')
          })
          .catch(error => {
            alert("로그인 실패")
            navigate('/SignIn')
            console.error('오류 발생:', error);
          })
      };
    return(
        <div className="SignIn">
            <form onSubmit={handleSubmit}>
                <p className='plogin'>로그인</p>
                <input type="text" name="memID" placeholder="&nbsp;아이디" required /><br />
                <input type="password" name="memPW"placeholder="&nbsp;비밀번호" required /><br />
                <input type="submit" value="로그인" />
            </form>
        </div>
    )
}

export default SignIn