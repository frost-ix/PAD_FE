import './css/AccountBar.css'
import { useNavigate } from 'react-router-dom';

function AccountBar(){
    const navigate = useNavigate();
    return(
        <div className="AccountBar">
            <button onClick={() => {navigate('/Account/MyAccount')}}>내 정보</button>
            <button onClick={() => {navigate('/Account/MyBoard')}}>내 게시물</button>
            <button onClick={() => {navigate('/Account/ChangePwd')}}>비밀번호 변경</button>
            <button onClick={() => {navigate('/Account/Bookmark')}}>즐겨찾기</button>
            <button onClick={() => {navigate('/Account/AccountWithdrawal')}}>탈퇴</button>
        </div>
    )
}

export default AccountBar