import './css/MyAccount.css'
import { useSelector } from 'react-redux' //컴포넌트에서 state조회가능하게 해주는 모듈

function MyAccount(){
    const Session = useSelector((state) => state.Session.value) // 세션 state 넣기
    return(

        
        <div className="MyAccount">
            
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>

        <div className="account-page">
            <div className="myaccount-intro">
            <h1>내 정보</h1>
            <p>나의 정보를 확인하기 위한 옵션입니다.</p>
            </div>
        
            <div className="account-list">
                <div className="account-vlaue">
                    <h4><i class='bx bx-user'></i> 닉네임 </h4> <h5>{Session.memNN}</h5>
                </div>

                <div className="account-vlaue">
                    <h4><i class='bx bx-envelope'></i> 아이디</h4> <h5>{Session.memID}</h5>
                </div>
                
                <div className="account-vlaue">
                    <h4><i class='bx bxs-envelope'></i> 이메일</h4> <h5>{Session.memMail}</h5>
                </div>

                <div className="account-vlaue">
                    <h4><i class='bx bxs-phone'></i> 연락처</h4> <h5>{Session.memTel}</h5>
                </div>              
            
            </div>   
                {/* <button className="change-button">나의 정보 변경하기</button> */}
            </div>


                
         </div>
    )
}

export default MyAccount