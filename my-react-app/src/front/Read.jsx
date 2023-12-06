import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Read() {
    const [member, setMember] = useState({
        memID : null,
        memPW : null,
        memNN : null,
        memTel : null,
        memMail : null
    })
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const memID = form.elements.memID.value;

        // const formData = new FormData();
        // formData.append("memID", memID);
    
        // try {
        //   const response = await fetch(`/Read`, {
        //     method: "POST",
        //     body: formData,
        //   });

        //   const res = await response.json();
          
        //   if (res.ok) {
        //     console.log("조회 성공");
        //     setMember(res.member)
        //     navigate('/Read');
        //   } else {
        //     alert("조회 실패");
        //     navigate('/Read');
        //   }
        // } catch (error) {
        //   navigate('/Read');
        //   console.error("조회 프론트 에러", error);
        // }

        const member = {
          memID : memID,//찾을 아이디
        };

        fetch('/계정 하나 찾기 경로', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(member),
        })
          .then(response => response.json())
          .then(data => {
            alert("계정 조회 성공")
            setMember(data.member)
            console.log('응답 데이터:', data);
          })
          .catch(error => {
            alert("계정 조회 실패")
            console.error('오류 발생:', error);
          })
      };
    return(
        <div className="Read">
        <form onSubmit={handleSubmit}>
            <p className='plogin'>계정 조회</p>
            <input type="text" name="memID" placeholder="&nbsp;&nbsp;&nbsp;아이디" required /><br />
            <input type="submit" value="조회"/>
            <br />
            {member.memID && (
            <div>
            아이디 : {member.memID}<br />
            비밀번호 : {member.memPW}<br />
            닉네임 : {member.memNN}<br />
            전화번호 : {member.memTel}<br />
            이메일 : {member.memMail}
            </div>
            )}
        </form>
        </div>
    );
}

export default Read