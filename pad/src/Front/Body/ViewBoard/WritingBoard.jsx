// import "./WritingBoard.css";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// function WritingBoard(props) {
//   const [editorData, setEditorData] = useState("내용을 입력해 주세요.");
//   const [title, setTitle] = useState("");
//   const navigate = useNavigate();

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditorData(data);
//   };

//   const handleEditorChange2 = (e) => {
//     const data = e.target.value
//     setTitle(data);
//   };


//   const saveData = async () => {
//     try {
//         const formData = new FormData();
//         formData.append("contents", editorData);
//         formData.append("boardTitle", title);

//         const response = await fetch(`/proxy/board/Write`, {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         navigate(-1);
//       } else {
//         alert("게시판 올리기 실패");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };

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
//               items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "uploadImage"],
//               shouldNotGroupWhenFull: true,
//             },
//              ckfinder: {
//                uploadUrl: '/proxy/image' // 서버 측 업로드 URL 지정
//              }
//           }}
//         />
//       </div>
//       <button onClick={saveData} className="saveButton">
//         등록
//       </button>
//       <div>
//         <h3>제목</h3>
//         <p>{title}</p>
//         <h3>Editor Content</h3>
//         <p>{editorData}</p>
//       </div>
//     </div>
//   );
// }

// export default WritingBoard;

import "./WritingBoard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function WritingBoard(props) {
  const [editorData, setEditorData] = useState("내용을 입력해 주세요.");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
        const formData = new FormData();
        // formData.append("contents", editorData);
        formData.append("htmlContent", editorData);
        formData.append("boardTitle", title);

        const response = await fetch(`/proxy/board/Write`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // navigate(-1);
        console.log(editorData)
      } else {
        alert("게시판 올리기 실패");
      }
    } catch (error) {
      alert(error);
    }
  };

  const [flag, setFlag] = useState(false);
  const imgLink = "http://localhost:5000/images/"

  const customUploadAdapter = (loader) => {
      return {
          upload(){
              return new Promise ((resolve, reject) => {
                  const data = new FormData();
                   loader.file.then( async (file) => {
                          // data.append("name", file.name);
                          data.append("file", file);
                          try {
                                 const response = await fetch('/proxy/image', {
                                       method: "POST",
                                          body: data,
                                        });
                                        if (response.ok) {
                                          // navigate(-1);
                                        } else {
                                          alert("사진업로드 실패");
                                        }
                                      } catch (error) {
                                        alert(error);
                                      }
                      })
              })
          }
      }
  }

  function uploadPlugin (editor){ // (3)
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return customUploadAdapter(loader);
      }
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
              items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "uploadImage"],
              shouldNotGroupWhenFull: true,
            },extraPlugins: [uploadPlugin]
          }}
        />
      </div>
      <button onClick={saveData} className="saveButton">
        등록
      </button>
      <div>
        <h3>제목</h3>
        <p>{title}</p>
        <h3>Editor Content</h3>
        <p>{editorData}</p>
      </div>
    </div>
  );
}

export default WritingBoard;
