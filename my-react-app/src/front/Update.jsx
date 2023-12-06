import { useNavigate, useLocation } from 'react-router-dom';
function Update() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const memID = form.elements.memID.value;
        const memPW = form.elements.memPW.value;
        
        // const formData = new FormData();
        // formData.append("memID", memID);
        // formData.append("memPW", memPW);
    
        // try {
        //   const response = await fetch(`/Update`, {
        //     method: "POST",
        //     body: formData,
        //   });

        //   if (response.ok) {
        //     console.log("비밀번호 변경 성공");
        //     navigate('/Read');
        //   } else {
        //     alert("회원가입 실패");
        //     navigate('/Create');
        //   }
        // } catch (error) {
        //   navigate('/Create');
        //   console.error("회원가입 프론트 에러", error);
        // }

        const member = {
          memID : memID,//변경할 아이디
          memPW : memPW,//그아이디의 바꿀 비밀번호
        };
        fetch('/비밀번호변경백엔드경로', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(member),
        })
          .then(response => response.json())
          .then(data => {
            alert("비밀번호 변경 성공")
            console.log('응답 데이터:', data);
          })
          .catch(error => {
            alert("비밀번호 변경 실패")
            console.error('오류 발생:', error);
          })
      };
    return(
        <div className="Update">
        <form onSubmit={handleSubmit}>
            <p className='plogin'>비밀번호 변경</p>
            <input type="text" name="memID" placeholder="&nbsp;&nbsp;&nbsp;아이디" required /><br />
            <input type="password" name="memPW" placeholder="&nbsp;&nbsp;&nbsp;변경할 비밀번호" required /><br />
            <input type="submit" value="비밀번호 변경"/>
        </form>
        </div>
    );
}

export default Update
