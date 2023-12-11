import './css/AccountBar.css'
import { useNavigate } from 'react-router-dom';

function AccountBar(){
    const navigate = useNavigate();
    return(
        <div className="AccountBar">
            <div className="account-bar-list">
                    <button onClick={() => {navigate('/Account/MyAccount')}} className="myinfo">내 정보</button>             
                    <button onClick={() => {navigate('/Account/MyBoard')}} className="mypost">내 게시물</button>             
                    <button onClick={() => {navigate('/Account/ChangePwd')}} className="change-pass">비밀번호 변경</button>             
                    <button onClick={() => {navigate('/Account/Bookmark')}} className="favorite">즐겨찾기</button>              
                    <button onClick={() => {navigate('/Account/AccountWithdrawal')}} className="secession">탈퇴</button>
               
            </div>
        </div>
    )
}

export default AccountBar