import './Footer.css';
import hoseologo from './image/hoseologo.png'

function Footer() {
    return(
        <div className="Footer">
            <div className='FooterLogo'>
                <a href="https://www.shoseo.ac.kr" target="_blank">
                    <img className="hoseologo" src={hoseologo} alt="서울호서직업전문학교" />
                </a>
            </div>
            <div className='FooterText'>
                팀원 : 성현우, 정송훈, 김수겸, 박수연, 최용규
            </div>

        </div>
    )
}

export default Footer