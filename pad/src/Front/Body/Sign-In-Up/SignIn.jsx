import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/Session';

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const memID = form.elements.memID.value;
        const memPW = form.elements.memPW.value;
      
        const member = {
          memID : memID,
          memPW : memPW,
        };

          try {
            const response = await fetch(`/proxy/member/SignIn`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(member),
            });
            if (response.ok) {
              const data = await response.json();
              // console.log(data)
              dispatch(login({
                    memNN:data.memNN, 
                    memID:data.memID,
                    memTel:data.memTel,
                    memMail:data.memMail}))
              navigate('/');
            } else {
              alert('로그인 실패');
            }
            } catch (error) {
              alert(error);
            }
      };

    return(
        <div className="SignIn">
          <div className="card">
            <div className="signin-left">

              <h1 className="signin-left-title">PAD</h1>
              <p className="signin-intro">여러분을 우리 클럽에 초대합니다!<br/>
              다양한 사람들을 초대하고<br/>
              다양한 일들을 경험할 수 있는<br/>
              이곳은 PAD입니다.
              </p>
             <span className="signin-ask">계정이 없으신가요?</span>
              <button className="left-button" onClick={()=>navigate('/SignUp')}>Sign Up</button>
              

            </div>

            <div className="signin-right">
              <h3 className="signin-right-title">Login</h3>
              <form onSubmit={handleSubmit} className="signin-right-form">
                <input type="text" name="memID" placeholder="&nbsp;아이디" required className="signin-id"/><br />
                <input type="password" name="memPW"placeholder="&nbsp;비밀번호" required className="signin-pass"/><br />
                <input type="submit" value="로그인" className="right-button"/>
              </form>
            </div>
        </div>
        </div>
      
    )
}

export default SignIn