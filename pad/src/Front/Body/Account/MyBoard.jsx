import './css/MyBoard.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import img from './a.png';
import { useEffect } from "react";

function MyBoard(){
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState([]);
    //기본 셋팅 페이지 변수, 함수
    const [page, setPage] = useState(1);
    //가장 최대 페이지 변수, 함수
    const [maxPage, setMaxPage] = useState();  
  
    const chunkArray = (arr, chunkSize) => {
      const result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    };
    const chunkedDataArray = chunkArray(boardData, 3);
  
    //page 변수 부분이 달라 질 떄 마다 BoardAll부분이 실행
    useEffect(() => {
      BoardAll();
    }, [page]);
    //최대 페이지의 개수 부분이 달라 질 때 마다 BoardMax 실행
    useEffect(() => {
      BoardMax();
    }, [maxPage]);
  
    //데이터 베이스에서 한 페이지 당 9개 게심물 가져오기
    const BoardAll = async () => {
      const first = {
        start : (page - 1) * 9 + 1,
        end : page * 9
      };
      try {
        const response = await fetch(`/proxy/board/myBoard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(first),
        });
        if (response.ok) {
          const data = await response.json();
          setBoardData(data);
          console.log(data);
        } else {
          console.log("게시판불러오기 실패");
        }
      } catch (error) {
        console.error("게시판불러오기 실패", error);
      }
    };
    //최대 페이지 구하는 방법
    const BoardMax = async () => {
      try {
        const response = await fetch(`/proxy/board/myBoardCount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          var count = data.total_rows / 9;
          count = Math.floor(count);
          if (data.total_rows % 9 > 0) {
            count += 1;
          }
          //최대 페이지 개수
          setMaxPage(count);
        } else {
          console.log("게시판카운트세기 실패");
        }
      } catch (error) {
        console.error("게시판카운트세기 실패(에러요)", error);
      }
    };

    return(
        <div className="MyBoard">
      {maxPage ? (
               <div className="MyboardTable">
               <table className="HboardInTable">
                 <tbody>
                   {chunkedDataArray.map((rowItems) => (
                     <tr>
                       {rowItems.map((item) => (
                         <td
                           className="oneBoard"
                           onClick={() => {
                             navigate("/ViewBoard",{ state : item.boardID });
                           }}>
                     <div className="dataTitles"><span>{item.boardTitle}</span></div>
       
                     <img src={img}  className="posterimg" />
                        
                         </td>
                       ))}
                     </tr>
                   ))}
                 </tbody>
               </table>
               <div className="buttondiv">
                 {/* 최대로 나올 수 있는 페이지보다 작을 경우까지, 현재 페이지에 페이지 +1 추가 */}
                 <button
                   className="prev"
                   onClick={() => {
                     if (page > 1) setPage(page - 1);
                   }}
                 >
                   이전
                 </button>
                 <p className="pagep">{page}</p>
                 {/* 최대로 나올 수 있는 페이지보다 작을 경우까지, 현재 페이지에 페이지 +1 추가 */}
                 <button
                   className="next"
                   onClick={() => {
                     if (maxPage > page) setPage(page + 1);
                   }}
                 >
                   다음
                 </button>
               </div>
             </div>
        ):(
          <div className='board-null'>
            <div className='board-null-h2'>작성하신 게시물이 존재하지 않습니다.</div>
          </div>
        )} 
        </div>
    )
}

export default MyBoard