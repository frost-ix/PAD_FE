import './css/AccountWithdrawal.css'

function AccountWithdrawal(){
    return(
        <div className="AccountWithdrawal">
            <div className="delete-account-page">
                <h1>계정 탈퇴</h1>
                <p> 계정을 탈퇴 하시면 활동한 정보들이 사라집니다.</p>
                <p> 사용하시는 아이디를 탈퇴하실 경우 <b>재사용 및 복구가 불가능</b>합니다.</p>    
                <button className="delete-button">탈퇴하기</button>
            </div>
        </div>
    )
}

export default AccountWithdrawal