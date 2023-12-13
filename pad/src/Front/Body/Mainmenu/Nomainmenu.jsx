import './Mainmenu.css'
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';

function Mainmenu(){
    const navigate = new useNavigate();
    return(
        <div className="Mainmenu">
            <div className="main-title">
                <h1>오늘은 어떤 소식이 있을까요?</h1>
                <p>PAD에서 여러분의 아이디어를 홍보하세요!</p>
                <button className="main-button" onClick={()=>navigate('/SignUp')}>무료로 가입하기</button>
            </div>
            <div className="main-comp" >
            </div>
        </div>
    )
}

export default Mainmenu