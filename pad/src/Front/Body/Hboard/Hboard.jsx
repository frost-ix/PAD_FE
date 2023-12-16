import { useNavigate } from "react-router-dom";
import Menubar from "../../Menubar/Menubar.jsx";
import "./Hboard.css";
import { useEffect, useState } from "react";
import img from "./a.png";

function Hboard() {
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
  }, []);

  // 카테고리별 게시판 가져오기
  // 수정 해야할 부분 다수 존재
  // Back-end 연동 테스트 때 cateID 인자값 자체는 정상적으로 넘어옴.
  const cateBoard = async () => {
    try {
      const first = {
        start: (page - 1) * 9 + 1,
        end: page * 9,
        cateID: "S-001",
      };
      const response = fetch(`/proxy/board/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(first),
      });
      console.log(response);
      if (response.ok) {
        const data = response.json();
        console.log(response);
        console.log(data);
        setBoardData(data);
      } else {
        console.log("게시판불러오기 실패 <Category else>");
      }
    } catch (error) {
      console.error("게시판불러오기 실패", error);
    }
  };
  //데이터 베이스에서 한 페이지 당 9개 게심물 가져오기
  const BoardAll = async () => {
    const first = {
      start: (page - 1) * 9 + 1,
      end: page * 9,
    };
    try {
      const response = await fetch(`/proxy/board`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(first),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBoardData(data);
      } else {
        // console.log("게시판불러오기 실패");
      }
    } catch (error) {
      // console.error("게시판불러오기 실패", error);
    }
  };
  //최대 페이지 구하는 방법
  const BoardMax = async () => {
    try {
      const response = await fetch(`/proxy/board/count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data + "카운터");
        var count = data / 9;
        count = Math.floor(count);
        if (data % 9 > 0) {
          count += 1;
        }
        //최대 페이지 개수
        setMaxPage(count);
      } else {
        // console.log("게시판카운트세기 실패");
      }
    } catch (error) {
      // console.error("게시판카운트세기 실패(에러요)", error);
    }
  };

  return (
    <div className="Hboard">
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"></link>
      <div className="HboardBar" onClick={() => cateBoard()}>
        <div className="big-cate" id="first-big-cate">
          <i class="bx bx-run"></i>
          <span>스포츠</span>
          <div className="small-cate">
            <a href="#">런닝</a>
            <a href="#">배드민턴</a>
            <a href="#">테니스</a>
            <a href="#">골프</a>
          </div>
        </div>
        <div className="big-cate">
          <i class="bx bx-music"></i>
          <span>음악/미술</span>
          <div className="small-cate">
            <a href="#">밴드</a>
            <a href="#">재즈</a>
            <a href="#">클래식</a>
            <a href="#">댄스</a>
          </div>
        </div>
        <div className="big-cate">
          <i class="bx bx-trip"></i>
          <span>여행</span>
          <div className="small-cate">
            <a href="#">국내</a>
            <a href="#">해외</a>
          </div>
        </div>
        <div className="big-cate">
          <i className="bx bxl-tiktok"></i>
          <span>문화</span>
          <div className="small-cate">
            <a href="#">공연</a>
            <a href="#">축제</a>
            <a href="#">박람회</a>
            <a href="#">전시회</a>
          </div>
        </div>
        <div className="big-cate">
          <i class="bx bx-book-open"></i>
          <span>스터디</span>
          <div className="small-cate">
            <a href="#">영화</a>
            <a href="#">음악</a>
            <a href="#">미술</a>
          </div>
        </div>
        <div className="big-cate" id="last-big-cate">
          <i class="bx bx-menu"></i>
          <span>기타</span>
        </div>
      </div>
      <div className="HboardTable">
        <table className="HboardInTable">
          <tbody>
            {chunkedDataArray.map((rowItems) => (
              <tr>
                {rowItems.map((item) => (
                  <td
                    className="oneBoard"
                    onClick={() => {
                      navigate("/ViewBoard", { state: item.boardID });
                    }}
                  >
                    <div className="dataTitles">
                      <span>{item.boardTitle}</span>
                    </div>

                    <img src={img} className="posterimg" />
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
    </div>
  );
}

export default Hboard;
