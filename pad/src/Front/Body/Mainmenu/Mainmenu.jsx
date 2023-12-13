import './Mainmenu.css'
import { useNavigate } from 'react-router-dom';
import open from './image/open.jpeg';
import sang from './image/sang.jpg';
import war from './image/war.jpg';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux'

function Mainmenu(){
    const Session = useSelector((state) => state.Session.value)
    const navigate = new useNavigate();
    
    const calling = () =>{

        alert("' 02-123-4567 '로 문의해주세요");
    }

    const settings = {
        arrows:false,
        dots:false,
        infinite: true,
        slidesToSHow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 5000
    };
    return(
        <div className="LoginAfter">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <div className="popular">
            <h1>{Session.memNN}님, <strong>PAD</strong>에 오신것을 환영합니다!</h1>
            <p>오늘의 추천 게시물을 확인하세요</p>
            <div className="popular-img" >
                <Slider {...settings}>
                    <div className="img-value">
                        <img src={open}></img>
                        <h2>오펜하이머</h2>
                    </div>
                    <div className="img-value">
                        <img src={sang}></img>
                        <h2>상견니</h2>
                    </div>    
                    <div className="img-value">
                        <img src={war}></img>
                        <h2>1917</h2>
                    </div>
                    <div className="img-value">
                        <img src={war}></img>
                        <h2>1917</h2>
                    </div>
                    <div className="img-value">
                        <img src={war}></img>
                        <h2>1917</h2>
                    </div>
                    <div className="img-value">
                        <img src={war}></img>
                        <h2>1917</h2>
                    </div>
                    </Slider>
            </div>

        </div>

         <div className="notice">
            
            <div className="notice-list">
            <h1>공지사항</h1>
                <div className="notice-top">
                    <div className="n-num"><strong>번호</strong></div>
                    <div className="n-title"><strong>제목</strong></div>
                    <div className="n-date"><strong>날짜</strong></div>
                </div>

                <div className="notice-body">
                    <div className="n-num">1</div>
                    <div className="n-title">공지사항 안내입니다.</div>
                    <div className="n-date">2023-12-12</div>
                </div>

                <div className="notice-body-even">
                    <div className="n-num">2</div>
                    <div className="n-title">공지사항 안내입니다.</div>
                    <div className="n-date">2023-12-12</div>

                </div>

                <div className="notice-body">
                    <div className="n-num">3</div>
                    <div className="n-title">공지사항 안내입니다.</div>
                    <div className="n-date">2023-12-12</div>

                </div>

                <div className="notice-body-even">
                    <div className="n-num">4</div>
                    <div className="n-title">공지사항 안내입니다.</div>
                    <div className="n-date">2023-12-12</div>

                </div>

                <div className="notice-body">
                    <div className="n-num">5</div>
                    <div className="n-title">공지사항 안내입니다.</div>
                    <div className="n-date">2023-12-12</div>

                </div>

                
            </div>
            
            <div className="button-area">
            <div className="button-value">
                <button className="question" onClick={()=>navigate('/question')}><i className='bx bx-question-mark'></i><br/>자주묻는질문</button>
                <button className="company-info" onClick={()=>navigate('/company')}><i class='bx bxs-buildings'></i><br/>회사정보</button>
                <button className="call" onClick={calling}><i class='bx bx-headphone' ></i><br/>전화 문의</button>
            </div>
            </div>
        </div>
        </div> 
      )
}

export default Mainmenu