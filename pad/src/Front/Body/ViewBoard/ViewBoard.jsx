import './ViewBoard.css'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

function ViewBoard(){
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useLocation();
    const Session = useSelector((state) => state.Session.value);

    const boardID = state ? state : 'default value';
     //BoardID 에 따라서 저장된 정보 불러오기
     const [boardIDinfo, setBoardIDinfo] = useState();
     const [favValue, setFavValue]=useState();
     const [renderedHtml, setRenderdHtml] = useState();
     const [favButton, setFavButton] = useState("즐겨찾기");
     let cnt = 0


    const ViewBoardinfo = async () => {
        try {
            const data = { boardID : boardID }
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
            setFavValue(data.favv)
          } else {
            // console.log("ID정보 실패");
          }
        } catch (error) {
          console.error("ID정보불러오기 실패", error);
        }
        
    }; 
    useEffect(()=>{
        ViewBoardinfo(boardID);
    },[]);



    const extractElements = (htmlString,imgPaths,imgIndex = 0) => { // 문자열에서 HTML 요소 추출 및 재귀적 처리
        const wrapper = document.createElement('div')
        wrapper.innerHTML = htmlString

        return Array.from(wrapper.childNodes).map((node, index) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                let tagName = node.tagName.toLowerCase()
                let content = null
                if(tagName!=='img' && tagName !=='br' && tagName!=='figure') content = extractElements(node.innerHTML,imgPaths,tagName === 'img'? imgIndex+1:imgIndex);
                const classList = node.classList
                const props = { key: index, className: classList.value}
                // 스타일 처리
                if(node.style.cssText) {
                    props.style = node.style.cssText.split(';').reduce((acc, cssProperty) => {
                        const [key, value] = cssProperty.split(':').map(str => str.trim());
                        if(key && value) {
                            acc[key] = value;
                        }
                        return acc;
                    }, {});
                }
                if(tagName==='figure'){
                    tagName = 'img'
                    props.src = imgPaths[cnt++]
                    props.className += ' test'
                }
               
                let element = tagName
                if(node.id) props.id = node.id // id 추가
                return React.createElement(element, props, content)
            }
            return null
        })
    }


    const viewBoardDelete = async () =>{
        try {
            const data = { boardID : boardID }
            const response = await fetch(`/proxy/board/Delete`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(data)
            if (response.ok) {
                // console.log(data);
                alert("게시물 삭제 성공!");
                navigate("/Hboard");
            } else {
                // console.log(data);
                // console.log("ID정보 실패");
                alert("게시물 삭제 실패!");
            }
        } catch (error) {
            console.error("ID정보불러오기 실패", error);
        }
        

    };
      useEffect(() => {
        if (boardIDinfo) { // boardIDinfo가 로드되었을 때만 htmlString을 생성
            const htmlString = boardIDinfo.boardContent; // boardIDinfo.contents를 htmlString으로 사용
            const imgPaths = Array.isArray(boardIDinfo.imgPath) ? boardIDinfo.imgPath : [];
            const renderedHtml = extractElements(htmlString,imgPaths);
            setRenderdHtml(renderedHtml);
        }
    }, [boardIDinfo]); // 의존성 배열에 boardIDinfo 추가
   

    const fav = async() => {
        try {
        const data = { boardID : boardID }
            const response = await fetch(`/proxy/member/fav`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("즐겨찾기 게시물로 등록하였습니다.");
                setFavValue(true)
            } else {
                // alert("즐겨찾기 게시물로 등록 실패!");
            }
        } catch (error) {
            console.error("ID정보불러오기 실패", error);
        }
    }

    const favCancle = async() => {
        try {
        const data = { boardID : boardID }
            const response = await fetch(`/proxy/member/favCancle`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("즐겨찾기 취소.");
                setFavValue(false)
            } else {
                // alert("즐겨찾기 게시물로 등록 실패!");
            }
        } catch (error) {
            console.error("ID정보불러오기 실패", error);
        }
    }

    useEffect(() => {
        if (favValue) {
            setFavButton("즐겨찾기 취소")
        }else{
            setFavButton("즐겨찾기")
        }

    }, [favValue]);
    return(      
        <div className="ViewBoard">
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <div className="ViewBoardBar">
                <div className='viewBoradBarSmall'>
                {boardIDinfo ? (
                    <>
                    {boardIDinfo.memID == Session.memID ? (//자기 게시물일떄
                    <>
                        <button className='viewbutton' onClick={() => {navigate(-1);}}>돌아가기</button>
                        <button className='viewbutton' onClick={() => {navigate("/WritingBoard");}}>생성</button>
                        <button className='viewbutton' onClick={() => {navigate("/");}}>수정</button>
                        <button id="favButton"  onClick={() => {
                            if(Session.memID==null){
                                alert("로그인 후 이용해주세요!")
                            }else{
                                if(favValue){
                                    favCancle()
                                }else{
                                    fav()
                                }
                            }
                            }}>{favButton}</button>
                        <button className='viewbutton' onClick={viewBoardDelete}>삭제</button>
                    </>
                    ) : (//자기 게시물아닐때
                    <>
                        <button className='viewbutton' onClick={() => {navigate(-1);}}>돌아가기</button>
                        <button className='viewbutton' onClick={() => {navigate("/WritingBoard");}}>생성</button>
                        <button className='viewbutton' onClick={() => {navigate("/");}}>수정</button>
                        <button id="favButton" onClick={() => {
                            if(Session.memID==null){
                                alert("로그인 후 이용해주세요!")
                            }else{
                                if(favValue){
                                    favCancle()
                                }else{
                                    fav()
                                }
                            }
                            }}>{favButton}</button>
                    </>
                    )}
                    </>
                ):(
                    <>
                    </>
                )}    
            </div>               
            </div>
            {boardIDinfo ? (
                <div className="ViewBoardTable">                  
                    <div className='viewTitle'>
                        <div className='viewOneTitle'>
                            {boardIDinfo.boardTitle} 
                            <div className='viewTitleSmallData'>
                                {boardIDinfo.regDate}
                            </div>    
                        </div>
                                         
                    </div>
                    <div className='viewContentAll' >
                        <div className='viewRealContnent'>{renderedHtml}</div>
                    </div>
                       
                </div>
            ):(
                <div className="ViewBoardTable">                  
                    <div className='viewTitle'>
                        <div className='viewOneTitle'>
                            로딩중....
                            <div className='viewTitleSmallData'>
                            로딩중....
                            </div>    
                        </div>                    
                    </div>
                    <div className='viewContentAll' >
                        <div className='viewRealContnent'>로딩중....</div>
                    </div>
                </div>
            )}
         
        
        </div>
    )
}

export default ViewBoard