import './css/AccountWithdrawal.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/Session';
import { useNavigate } from 'react-router-dom';



function AccountWithdrawal(){
    const Session = useSelector((state) => state.Session.value)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const enteredPassword = window.prompt('회원탈퇴를 진행하려면 비밀번호를 입력하세요.');
      
        if (enteredPassword === null) {
          alert('회원탈퇴가 취소되었습니다.');
          return;
        }
      
        const member = {
          memID: Session.memID,
          memPW: enteredPassword,
        };
      
        try {
          const response = await fetch(`/proxy/AccountWithdrawal`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(member),
          });
      
          if (response.ok) {
            alert('회원탈퇴 성공');
            const data = await response.json();
            console.log(data);
            dispatch(
              login({
                memNN: null,
                memID: null,
                memTel: null,
                memMail: null,
              })
            );
            navigate('/');
          } else {
            alert('회원탈퇴 실패\n비밀번호가 올바르지 않습니다.');
          }
        } catch (error) {
          alert(error);
        }
      };

    return(
        <div className="AccountWithdrawal">
            <div className="delete-account-page">
                <h1>계정 탈퇴</h1>
                <p> 계정을 탈퇴 하시면 활동한 정보들이 사라집니다.</p>
                <p> 사용하시는 아이디를 탈퇴하실 경우 <b>재사용 및 복구가 불가능</b>합니다.</p>    
                <button className="delete-button" onClick={handleSubmit}>탈퇴하기</button>
            </div>
        </div>
    )
}

export default AccountWithdrawal