import "./WritingBoard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function WritingBoard(props) {
  const [editorData, setEditorData] = useState("");
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
        const data = {
            contents: editorData, 
            boardTitle : title,
            };

        const response = await fetch(`/proxy/board/Write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate(-1);
      } else {
        alert("게시판 올리기 실패");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="WritingBoard">
      <div className="ckeditor">
      <h2 className="WritingH2">홍보 게시판 작성</h2>
      <input type="text" className="WritingTitle" data={title} id="title" onChange={handleEditorChange2} placeholder="제목을 입력하세요"/>  
      {/* <input type="file" className="WritingFile"/> */}
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={handleEditorChange}
        //   config={{
        //     toolbar: {
        //       items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "insertTable"],
        //       shouldNotGroupWhenFull: true,
        //     },
        //   }}
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
