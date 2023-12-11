import { useNavigate } from 'react-router-dom';
import './Hboard.css';
import { useState } from 'react';
import img from './a.png';

function Hboard(){
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([{
    boardTitle: "레고 조립",
    contents: "포스터1",
    image_url: "./image/포차코/포챠코8.png"
  },{
    boardTitle: "영어 스터디",
    contents: "포스터2",
    image_url: "../image/스누피1.png",
  },{
    boardTitle: "자동차",
    contents: "포스터3",
  },{
    boardTitle: "title4",
    contents: "포스터4",
  }, {
    boardTitle: "title5",
    contents: "포스터5",
  },
   {
    boardTitle: "title6",
    contents: "포스터6",
  },{
    boardTitle: "title7",
    contents: "포스터7",
  },{
    boardTitle: "title8",
    contents: "포스터8",
  },{
    boardTitle: "title9",
    contents: "포스터9",
  }
])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState()


    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };
    const chunkedDataArray = chunkArray(boardData, 3);

    // // 데이터 베이스에서 게시물값 모두 가져오기 함수
    // const BoardGet = async () => {
    //       const first = (page-1)*20
      
    //       const formData = new URLSearchParams();
    //       formData.append("first", first);
      
    //       try {
    //         const response = await fetch(`/pass/Board_Get_server`, {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //           },
    //           body: formData
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //           const initialData = data.values
    //           setBoardData(initialData);
    //           // console.log("게시판불러오기 성공");
    //           // console.log(data.values)
    //         } else {
    //           // console.log("게시판불러오기 실패");
    //         }
    //       } catch (error) {
    //         // console.error("게시판불러오기 실패", error);
    //       }
    //     };
  
    // // 최대 페이지 구하는 함수
    //     const BoardIndexCount = async () => {
    //       try {
    //         const response = await fetch(`/pass/Board_Index_Count_server`, {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //           },
    //         });
      
    //         const data = await response.json();
    //         // console.log(data)
    
    //         if (data.success) {
    //           var count = data.values[0].total_rows / 20;
    //           count =  Math.floor(count)
    //           if(data.values[0].total_rows % 20 >= 1){count++}
    //           setMaxPage(count)
    //           // console.log("게시판카운트세기 성공");
    //         } else {
    //           console.log("게시판카운트세기 실패");
    //         }
    //       } catch (error) {
    //         console.error("게시판카운트세기 실패", error);
    //       }
    //     };
  
    // useEffect(()=>{
    //   BoardGet();
    // },[page])
  
    // useEffect(()=>{
    //   BoardIndexCount();
    // },[boardData])
  
    return(
        <div className="Hboard">
            <div className='HboardBar'>
                분류 대분류
            </div>

            <div className='HboardTable'>
              <table className='HboardInTable'>
                <tbody>
                {chunkedDataArray.map((rowItems) => (
                    <tr>
                        {rowItems.map((item) => (
                        
                            <td className="oneBoard" data-title={item.boardTitle} onClick={() => {navigate('/')}}   >
                                {/* {item.contents} */}
                                <div className='imgposter'>
                                  <img src={img} alt={item.boardTitle} className='posterimg'/>
                                </div>
                               <p>
                                {/* <button>button</button> */}
                               </p>
                            </td>                
                        ))}
                    </tr>
                ))}
                </tbody>
              </table>
              <div className='buttondiv'>
                <button className='prev' onClick={()=>{if(page>1)setPage(page-1)}}>이전</button>
                <p className='pagep'>{page}</p>
                <button className='next' onClick={()=>{if(maxPage>page)setPage(page+1)}}>다음</button>
                </div>
            </div>
        </div>
    )
}

export default Hboard