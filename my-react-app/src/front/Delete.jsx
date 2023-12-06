import { useNavigate } from 'react-router-dom';

function Delete() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const memID = form.elements.memID.value;

    //폼데이터 + try 버전
    // const formData = new FormData();
    // formData.append("memID", memID);
    // try {
    //   const response = await fetch('/Delete', {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     console.log("회원정보 삭제");
    //   } else {
    //     alert("정보 삭제 실패");
    //     navigate("/Create");
    //   }
    // } catch (error) {
    //   navigate('/Create');
    // }

    //제이슨 + then 버전
    const member = {
      memID : memID,
    };
    fetch('/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    })
      .then(response => response.json())
      .then(data => {
        alert("계정삭제 성공")
        console.log('응답 데이터:', data);
      })
      .catch(error => {
        alert("계정삭제 실패")
        console.error('오류 발생:', error);
      })
      
    };

  return (
    <div className="Delete">
      <form onSubmit={handleSubmit}>
        <input type="text" name="memID"placeholder="삭제할 아이디" /><br />
        <input type="submit" value="아이디 삭제" />
      </form>
    </div>
  );
}

export default Delete;
