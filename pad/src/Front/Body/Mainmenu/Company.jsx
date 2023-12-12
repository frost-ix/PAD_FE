import './Company.css';
import company from './image/company.jpg';

function Company(){

    return(

        <div className="Company">
            <img src={company}></img>
            <h1>서울호서 전문학교 프로젝트</h1>
            <p><strong>[팀장] 성현우 : </strong> <br/>
            <strong>[팀원] 정송훈 : </strong> <br/>
            <strong>[팀원] 박수현 : </strong> <br/>
            <strong>[팀원] 최용규 : </strong> <br/>
            <strong>[팀원] 김수겸 : </strong> <br/></p>
        </div>
    );
}
export default Company