// import "./WritingBoard.css";
// import React, { useState } from "react";
// import { json, useNavigate } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// function WritingBoard() {
//   const [editorData, setEditorData] = useState("내용을 입력해 주세요.");
//   const [title, setTitle] = useState("");
//   const [imgName, setImgName] = useState([]);
//   const navigate = useNavigate();

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditorData(data);
//   };

//   const handleEditorChange2 = (e) => {
//     const data = e.target.value
//     setTitle(data);
//   };
  
//     const imgDelete = (indexToRemove) => {
//       const updatedImgName = imgName.filter((name, index) => index !== indexToRemove);
//       setImgName(updatedImgName);
//     };
    
//     const handleDeleteImage = () => {
//       console.log('Image deleted!');
//     };


//   const saveData = async () => {
//     try {
//         const data = { 
//           boardTitle : title,
//           contents : editorData,
//           imgName : imgName
//         }

//         const response = await fetch(`/proxy/board/Write`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body : JSON.stringify(data)
//       });
//       if (response.ok) {
//         // navigate(-1);
//       } else {
//         alert("게시판 올리기 실패");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };


//   const customUploadAdapter = (loader) => {
//       return {
//               upload(){
//               return new Promise ((resolve, reject) => {
//                     const data = new FormData();
//                     loader.file.then( async (file) => {
//                         data.append("file", file);
//                         try {
//                               const response = await fetch('/proxy/image', {
//                               method: "POST",
//                               body: data,
//                               });
//                               if (response.ok) {
//                                   const data = await response.json();
//                                   console.log(data.imgName)
//                                   setImgName((imgName) => [...imgName, data.imgName])
//                                   } else {
//                                   alert("사진업로드 실패");
//                                   }
//                                   } catch (error) {
//                                   alert(error);
//                                    }
//   })})}}}

//   function uploadPlugin (editor){
//       editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//           return customUploadAdapter(loader);
//       }
//   }
//   return (
//     <div className="WritingBoard">
//       <div className="ckeditor">
//       <div className="WritingH2-div">
//         <h2 className="WritingH2">홍보 게시물 쓰기</h2>
//       </div>
//       <input type="text" className="WritingTitle" data={title} id="title" onChange={handleEditorChange2} placeholder="제목을 입력하세요"/>  
//         <CKEditor
//           editor={ClassicEditor}
//           data={editorData}
//           onChange={handleEditorChange}
//           config={{
//             toolbar: {
//               items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList","|", "uploadImage"],
//               shouldNotGroupWhenFull: true,
//             },extraPlugins: [uploadPlugin]
//           }}
//             onReady={(editor) => {
//               editor.model.document.on('change:data', () => {
//                 const changes = Array.from(editor.model.document.differ.getChanges());
//                 changes.forEach((change) => {
//                   if (change.type === 'remove' && change.name === "imageBlock") {
//                     handleDeleteImage();
//                   }
//                 });
//               });
//             }}
//         />
//       </div>
//       <button onClick={saveData} className="saveButton">
//         등록
//       </button>

//         <h3>사용중 이미지</h3>
//         {imgName.map((imgName, index) => (
//         <div key={index}>
//           {index + 1}번째 사진
//           <button onClick={() => imgDelete(index)}>Delete</button>
//         </div>
//         ))}
        
//     </div>
//   );
// }

// export default WritingBoard;

import "./WritingBoard.css";
import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function WritingBoard() {
  const [editorData, setEditorData] = useState("내용을 입력해 주세요.");
  const [title, setTitle] = useState("");
  const [imgName, setImgName] = useState();
  const [imgId, setImgId] = useState();
  // const [imageInformation,setImageInformation] = useState({});
  const [imageInformation,setImageInformation] = useState([]);
  const [move, setMove]=useState(1);
  const navigate = useNavigate();

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
  
  useEffect(() => {
      console.log("정보",imageInformation)
  }, [imageInformation]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleEditorChange2 = (e) => {
    const data = e.target.value
    setTitle(data);
  };

  const saveData = async () => {
    try {
      const imgNames = imageInformation.map(info => info.imgName);
        const data = { 
          boardTitle : title,
          contents : editorData,
          imgName : imgNames
        }

        const response = await fetch(`/proxy/board/Write`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
      });
      if (response.ok) {
        // navigate(-1);
      } else {
        alert("게시판 올리기 실패");
      }
    } catch (error) {
      alert(error);
    }
  };


  const customUploadAdapter = (loader) => {
      return {
              upload(){
              return new Promise ((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then( async (file) => {
                        data.append("file", file);
                        try {
                              const response = await fetch('/proxy/image', {
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
                                  alert(error);
                                   }
  })})}}}

  function uploadPlugin (editor){
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return customUploadAdapter(loader);
      }
  }

    useEffect(() => {
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
        <h2 className="WritingH2">홍보 게시물 쓰기</h2>
      </div>
      <input type="text" className="WritingTitle" data={title} id="title" onChange={handleEditorChange2} placeholder="제목을 입력하세요"/>  
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
      <button onClick={saveData} className="saveButton">
        등록
      </button>
{/* -----------------------테스트--------------------- */}
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
{/* -------------------------------------------- */}
    </div>
  );
}

export default WritingBoard;
