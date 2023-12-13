import "./WritingBoard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


function WritingBoard() {
  const [editorData, setEditorData] = useState(
      `<p>안녕하세요!</p>
      <p>&nbsp;</p>
      <p>홍보 게시판을 이용해 주셔서 감사합니다. 이 공간은 회원 여러분이 자신의</p> 
      <p>이벤트, 프로모션, 또는 다양한 홍보 활동을 공유하고 소개할 수 있는 곳입니다.</p>
      <p>-------------------------------------------------------------------------------------------------------------------------</p>
      <p>주의사항</p>
      <p>&nbsp;</p>
      <p>욕설 및 비방 글은 삼가주세요.상호 존중과 예의가 중요합니다.</p>
      <p>불법적인 활동이나 부적절한 콘텐츠는 금지됩니다.이는 서비스 이용 약관에 따라 엄격히 제한됩니다.</p>
      <p>&nbsp;</p>
      <p>문제 발생 시 도움이 필요하신 경우, 고객지원팀에 문의해 주세요.
      <p>즐거운 홍보 활동 되시길 바랍니다!</p>
      <p>&nbsp;</p>
      <p>감사합니다.</p>`
    );
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState();
  const [imgName, setImgName] = useState();
  const [imgId, setImgId] = useState();
  const [imageInformation,setImageInformation] = useState([]);
  const [move, setMove]=useState();
  const [cateselect, setCateselect] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const cateServer = async () => {
      try {
        const response = await fetch(`/proxy/board/cate`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json()
          setCate(data)
        } else {
          // console.log("카테고리 못가져옴")
        }
      } catch (error) {
        alert(error);
      }
    };
    if(cate == null){
      cateServer();
    }
  },[])

  useEffect(() => {
    if(imgId != null && imgName != null){
      setImageInformation(prevImageInformation => [
        ...prevImageInformation,
        { imgId: imgId, imgName: imgName }
      ]);
      setImgId(null)
      setImgName(null)
    }
  }, [imgId, imgName]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleEditorChange2 = (e) => {
    const data = e.target.value
    setTitle(data);
  };

  const saveData = () => {
    const save = async() => {
      try {
        const imgNames = imageInformation.map(info => info.imgName);
          const data = { 
            boardTitle : title,
            contents : editorData,
            imgName : imgNames,
            cateName : cateselect
          }
  
          const response = await fetch(`/proxy/board/Write`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(data)
        });
        if (response.ok) {
          navigate(-1);
        } else {
          alert("게시판 올리기 실패");
        }
      } catch (error) {
        alert(error);
      }
    }

    if(title == null | title == ""){
      alert("제목을 입력해주세요")
    }else if(editorData == null | editorData == ""){
      alert("내용을 입력해주세요")
    }else{
      save()
    }
  };


  const customUploadAdapter = (loader) => {
      return {
              upload(){
              return new Promise ((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then( async (file) => {
                        data.append("file", file);
                        data.append("option", "upload")
                        try {
                              const response = await fetch('/proxy/board/image', {
                              method: "POST",
                              body: data,
                              });
                              if (response.ok) {
                                  const data = await response.json();
                                  setImgName(data.imgName)
                                  } else {
                                  alert("사진업로드 실패");
                                  }
                                  } catch (error) {
                                  alert(error+"사진업로드");
                                   }
  })})}}}

  function uploadPlugin (editor){
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return customUploadAdapter(loader);
      }
  }

    useEffect(() => {
      const del = async()=>{
        try {
          const targetObject = imageInformation.find(obj => obj.imgId == move);
          const imgNameval = targetObject.imgName;
          const data = new FormData();
          data.append("imgName", imgNameval);
          data.append("option", "upload");
        const response = await fetch(`/proxy/board/image`, {
        method: "POST",
        body : data
      });
      if (response.ok) {
        
      } else {
        alert("사진 삭제요청 실패");
      }
    } catch (error) {
      alert(error);
    }
    }

    if(move != null){
        del()
        setMove(null)
    }
    
    const updatedInformation = imageInformation.filter(info => info.imgId !== move);
    setImageInformation(updatedInformation);
    }, [move]);

    const deleteImgId= (value) =>{
      setMove(value)
    }
  
    const insertImgId= (value) =>{
      setImgId(value)
    }
    
  return (
    <div className="WritingBoard">
      <div className="ckeditor">
      <div className="WritingH2-div">
        <h2 className="WritingH2">홍보 글쓰기</h2>
        <button onClick={saveData} className="saveButton">등록</button></div>
      <div className="cate-div">
        {/* ------------------------------------자동완성기능 보류 */}
        {/* <input type="text" className="cate-input" list="categories" placeholder="카테고리 선택" onChange={(e)=> {setCateselect(e.target.value)}}/>
        <datalist id="categories" className="cate-list" >
        {cate ? (
          <>
          {cate.map((item, index) => (
          <option key={index} value={item.value} label={item.name}/>))}
          </>
        ) : (
        <option value="카테고리오류">카테고리 오류</option>
        )}
        </datalist> */}
        {/* ------------------------------------자동완성기능 보류 */}
        
        <select className="cate-input" value={cateselect} onChange={(e)=> {setCateselect(e.target.value)}} required>
        <option value="" disabled>카테고리 선택</option>
        {cate ? (
          <>
            {cate.map((item, index) => (
              <option key={index} value={item.value}>{item.name}</option>
            ))}
          </>
        ) : (
          <option value="카테고리오류">카테고리 오류</option>
        )}
      </select>
      </div>

      <input type="text" className="WritingTitle" data={title} id="title" onChange={handleEditorChange2} placeholder="제목을 입력하세요" required/>  
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={handleEditorChange}
          config={{
            toolbar: {
              items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList","|", "uploadImage"],
              shouldNotGroupWhenFull: true,
            },extraPlugins: [uploadPlugin]
            }}
            onReady={(editor) => {
              editor.model.document.on('change:data', () => {
                const changes = Array.from(editor.model.document.differ.getChanges());

                changes.forEach((change) => {
                if (change.type === 'remove' && change.name === "imageBlock") {
                  const attributesMap = change.attributes;
                  const uploadId = attributesMap.get('uploadId');
                  deleteImgId(uploadId)
                  }
                });
                  changes.forEach((change) => {
                  if (change.type === 'insert' && change.name === "imageBlock") {
                    const attributesMap = change.attributes;
                    const uploadId = attributesMap.get('uploadId');
                    insertImgId(uploadId)
                  }
                });
              });
            }}
        />
      </div>
      
      
{/* -----------------------테스트--------------------- */}
      {/* {editorData} */}
      {/* {imgId.map((item, index) => (
        <div key={index}>
          {index}번쨰 사진 아이디 : {item}
        </div>
      ))}

      {imgName.map((item, index) => (
        <div key={index}>
          {index}번쨰 사진 이름 : {item}
        </div>
      ))}  */}
      
      {imageInformation.map((item, index) => (
        <div key={index}>
          {index}번쨰 사진 이름 : {item.imgId}
        </div>
      ))}

      {/* {cate.map((item, index) => (
          <div key={index}>
            {item.name} : {item.value}
          </div>
        ))} */}
        {/* {cateselect} */}
{/* -------------------------------------------- */}
    </div>
  );
}

export default WritingBoard;
