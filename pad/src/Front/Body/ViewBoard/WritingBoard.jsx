import "./WritingBoard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function WritingBoard() {
  const [editorData, setEditorData] = useState("내용을 입력해 주세요.");
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState();
  const [imgName, setImgName] = useState();
  const [imgId, setImgId] = useState();
  const [imageInformation, setImageInformation] = useState([]);
  const [move, setMove] = useState();
  const [cateselect, setCateselect] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const cateServer = async () => {
      try {
        const response = await fetch(`/proxy/board/cate`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setCate(data);
        } else {
          // console.log("카테고리 못가져옴")
        }
      } catch (error) {
        alert(error);
      }
    };
    if (cate == null) {
      cateServer();
    }
  }, []);

  useEffect(() => {
    const cateServer = async () => {
      try {
        const response = await fetch(`/proxy/board/cate`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setCate(data);
        } else {
          // console.log("카테고리 못가져옴")
        }
      } catch (error) {
        alert(error);
      }
    };
    if (cate == null) {
      cateServer();
    }
  }, []);

  useEffect(() => {
    if (imgId != null && imgName != null) {
      setImageInformation((prevImageInformation) => [...prevImageInformation, { imgId: imgId, imgName: imgName }]);
      setImgId(null);
      setImgName(null);
    }
  }, [imgId, imgName]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleEditorChange2 = (e) => {
    const data = e.target.value;
    setTitle(data);
  };

  const saveData = async () => {
    try {
      const imgNames = imageInformation.map((info) => info.imgName);
      const data = {
        boardTitle: title,
        boardContent: editorData,
        imageName: imgNames,
        cateName: cateselect,
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

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then(async (file) => {
            data.append("file", file);
            data.append("option", "upload");
            try {
              const response = await fetch("/proxy/board/image", {
                method: "POST",
                body: data,
              });
              if (response.ok) {
                const data = await response.json();
                setImgName(data.imgName);
              } else {
                alert("사진업로드 실패");
              }
            } catch (error) {
              alert(error + "사진업로드");
            }
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  useEffect(() => {
    const del = async () => {
      try {
        const targetObject = imageInformation.find((obj) => obj.imgId == move);
        const imgNameval = targetObject.imgName;
        const data = new FormData();
        data.append("imgName", imgNameval);
        data.append("option", "upload");
        const response = await fetch(`/proxy/board/image`, {
          method: "POST",
          body: data,
        });
        if (response.ok) {
        } else {
          alert("사진 삭제요청 실패");
        }
      } catch (error) {
        alert(error);
      }
    };

    if (move != null) {
      del();
      setMove(null);
    }

    const updatedInformation = imageInformation.filter((info) => info.imgId !== move);
    setImageInformation(updatedInformation);
  }, [move]);

  const deleteImgId = (value) => {
    setMove(value);
  };

  const insertImgId = (value) => {
    setImgId(value);
  };

  return (
    <div className="WritingBoard">
      <div className="ckeditor">
        <div className="WritingH2-div">
          <h2 className="WritingH2">홍보 게시물 쓰기</h2>
        </div>
        <div className="cate-div">
          <input
            type="text"
            className="cate-input"
            list="categories"
            placeholder="카테고리 선택"
            onChange={(e) => {
              setCateselect(e.target.value);
            }}
          />
          <datalist id="categories" className="cate-list">
            {cate ? (
              <>
                {cate.map((item, index) => (
                  <option key={index} value={item.value} label={item.name} />
                ))}
              </>
            ) : (
              <option value="카테고리오류">카테고리 오류</option>
            )}
          </datalist>
        </div>

        <input type="text" className="WritingTitle" data={title} id="title" onChange={handleEditorChange2} placeholder="제목을 입력하세요" />
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={handleEditorChange}
          config={{
            toolbar: {
              items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "|", "uploadImage"],
              shouldNotGroupWhenFull: true,
            },
            extraPlugins: [uploadPlugin],
          }}
          onReady={(editor) => {
            editor.model.document.on("change:data", () => {
              const changes = Array.from(editor.model.document.differ.getChanges());

              changes.forEach((change) => {
                if (change.type === "remove" && change.name === "imageBlock") {
                  const attributesMap = change.attributes;
                  const uploadId = attributesMap.get("uploadId");
                  deleteImgId(uploadId);
                }
              });
              changes.forEach((change) => {
                if (change.type === "insert" && change.name === "imageBlock") {
                  const attributesMap = change.attributes;
                  const uploadId = attributesMap.get("uploadId");
                  insertImgId(uploadId);
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

      {/* {imageInformation.map((item, index) => (
        <div key={index}>
          {index}번쨰 사진 이름 : {item.imgId}
        </div>
      ))} */}

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
