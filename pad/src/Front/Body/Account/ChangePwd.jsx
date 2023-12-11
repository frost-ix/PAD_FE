import './css/ChangePwd.css'

function ChangePwd(){

    // 기존 memPW
    // 새비번 newPW
    return(
        <div className="ChangePwd">
            
            <div className="change-pass-title">
                <h1>비밀번호 변경</h1>
                <p><b>다른 사이트에서 사용하지 않는 비밀번호</b>가 안전합니다.</p>
                <p><b>이전에 사용하지 않은 비밀번호</b>가 안전합니다.</p>
            </div>

            <div className="change-pass-input">
                <input type="password" placeholder='기존 비밀번호' required className="old-pass"/>
                <input type="password" placeholder='새 비밀번호' required className="new-pass"/>
                <input type="password" placeholder='비밀번호 확인' required className="check-pass"/>
                <button className="change-pass-button">변경하기</button>
            </div>

        </div>
    )
}

export default ChangePwd