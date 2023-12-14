import "./ViewBoard.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./ViewBoard.css";
import React, { useEffect, useState } from "react";

function ViewBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const boardID = state ? state : "default value";
  //BoardID 에 따라서 저장된 정보 불러오기
  const [boardIDinfo, setBoardIDinfo] = useState();
  const [renderedHtml, setRenderdHtml] = useState();
  useEffect(() => {
    ViewBoardinfo(boardID);
  }, [boardID]);

  let cnt = 0;

  const extractElements = (htmlString, imgPaths, imgIndex = 0) => {
    // 문자열에서 HTML 요소 추출 및 재귀적 처리
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString;

    return Array.from(wrapper.childNodes).map((node, index) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        let tagName = node.tagName.toLowerCase();
        let content = null;
        if (tagName !== "img" && tagName !== "br" && tagName !== "figure")
          content = extractElements(node.innerHTML, imgPaths, tagName === "img" ? imgIndex + 1 : imgIndex);
        const classList = node.classList;
        const props = { key: index, className: classList.value };
        // 스타일 처리
        if (node.style.cssText) {
          props.style = node.style.cssText.split(";").reduce((acc, cssProperty) => {
            const [key, value] = cssProperty.split(":").map((str) => str.trim());
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          }, {});
        }
        if (tagName === "figure") {
          console.log(cnt);
          console.log(imgPaths[cnt]);
          tagName = "img";
          props.src = imgPaths[cnt++];
          console.log(typeof props.className);
          console.log(props.className);
          props.className += " test";
        }

        let element = tagName;
        if (node.id) props.id = node.id; // id 추가
        return React.createElement(element, props, content);
      }
      return null;
    });
  };

  const ViewBoardinfo = async () => {
    try {
      const data = { boardID: boardID };
      const response = await fetch(`/proxy/board/watch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        setBoardIDinfo(data);
        console.log(data);
      } else {
        console.log("ID정보 실패");
      }
    } catch (error) {
      console.error("ID정보불러오기 실패시발", error);
    }
  };

  useEffect(() => {
    if (boardIDinfo) {
      // boardIDinfo가 로드되었을 때만 htmlString을 생성
      const htmlString = boardIDinfo.boardContent; // boardIDinfo.contents를 htmlString으로 사용
      //const imgPaths = boardIDinfo.imagePath;//boardIDinfo.imagePath를 imgPath로 사용
      const imgPaths = Array.isArray(boardIDinfo.imgPath) ? boardIDinfo.imgPath : [];
      const renderedHtml = extractElements(htmlString, imgPaths);
      setRenderdHtml(renderedHtml);
    }
  }, [boardIDinfo]); // 의존성 배열에 boardIDinfo 추가

  return (
    <div className="ViewBoard">
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"></link>
      {boardIDinfo ? ( // boardIDinfo가 로드되었을 때만 화면에 출력
        <>
          <div className="ViewBoardBar">
            <button
              className="viewbutton"
              onClick={() => {
                navigate("/");
              }}
            >
              수정
            </button>
            <button
              className="viewbutton"
              onClick={() => {
                navigate("/");
              }}
            >
              삭제
            </button>
            <button
              className="viewbutton"
              onClick={() => {
                navigate("/");
              }}
            >
              생성
            </button>
            <button
              className="viewbutton"
              onClick={() => {
                navigate("/HBoard");
              }}
            >
              돌아가기
            </button>

            {/* <div className="big-cate" id="first-big-cate" >
                    <i class='bx bx-menu'></i><span>기타</span> 
                </div>
                <div className="big-cate" id="second-big-cate" >
                    <i class='bx bx-menu'></i><span>기타</span> 
                </div> */}
          </div>

          <div className="ViewBoardTable">
            <div className="viewTitle">
              <div className="viewOneTitle">
                {boardIDinfo.boardTitle}
                <div className="viewTitleSmallData">{boardIDinfo.regDate}</div>
              </div>
            </div>
            <div className="viewContentAll">
              <div className="viewRealContnent">{renderedHtml}</div>
            </div>
          </div>
        </>
      ) : (
        // boardIDinfo가 아직 로드되지 않았을 때 출력
        <>
          <div className="WrongViewBoardBar">
            <h4>DATA 넘어오지 않음 실패</h4>
          </div>
          <div className="WrongViewBoardTable"></div>
        </>
      )}
    </div>
  );
}

export default ViewBoard;
