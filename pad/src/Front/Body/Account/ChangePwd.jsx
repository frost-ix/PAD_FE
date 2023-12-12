import './css/ChangePwd.css'
import { useNavigate } from "react-router-dom";

function ChangePwd() {
    const navigate = useNavigate();

    const chagePassword = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const memPW = form.elements.memPW.value;
        const newPW = form.elements.newPW.value;
        const checkPW = form.elements.checkPW.value;
        console.log(checkPW);

        const data = {
            memPW: memPW,
            newPW: newPW,
        }

        if(newPW === checkPW) {
            const response = await fetch(`/proxy/member/Update`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                if(data == 1) {
                    alert("비밀번호 변경을 완료하였습니다.");
                    navigate(-1);
                }
                else alert("현재 비밀번호를 다시 확인해주세요.");
            }
        }
        else alert('입력한 새 비밀번호가 일치하지 않습니다.');
        
    }

    return(
        <div className="ChangePwd">
            
            <div className="change-pass-title">
                <h1>비밀번호 변경</h1>
                <p><b>다른 사이트에서 사용하지 않는 비밀번호</b>가 안전합니다.</p>
                <p><b>이전에 사용하지 않은 비밀번호</b>가 안전합니다.</p>
            </div>

            <form onSubmit={chagePassword} className="change-pass-input">
                <input type="password" name='memPW' placeholder='기존 비밀번호' required className="old-pass"/>
                <input type="password" name='newPW' placeholder='새 비밀번호' required className="new-pass"/>
                <input type="password" name='checkPW' placeholder='새 비밀번호 확인' required className="check-pass"/>
                <input type='submit' className="change-pass-button"/>
            </form>

        </div>
    )
}

export default ChangePwd