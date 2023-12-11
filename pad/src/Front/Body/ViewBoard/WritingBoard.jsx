import './WritingBoard.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function WritingBoard(props){
    const [editorData, setEditorData] = useState('');
    const navigate = useNavigate();

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    const saveData = async() => {
        try {
            const response = await fetch(`/proxy/board`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ htmlContent: editorData }),
            });
            if (response.ok) {
              navigate(-1);
            } else {
              alert('게시판 올리기 실패');
            }
            } catch (error) {
              alert(error);
            }
        }

    return(      
        <div className="WritingBoard">
            <h2>CKEditor in React</h2>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
                config={{
                    toolbar: [ 'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'blockQuote',
                    'undo',
                    'redo',
                    'alignment',
                    'fontFamily',
                    'fontSize',
                    'fontColor',
                    'highlight',
                    ]
                  }}
            />
            <button onClick={saveData} className='saveButton'>등록</button>
            <div>
                <h3>Editor Content</h3>
                <p>{editorData}</p>
            </div>          
         </div>
    )
}

export default WritingBoard

