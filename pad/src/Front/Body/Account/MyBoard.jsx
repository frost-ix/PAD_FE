import './css/MyBoard.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import img from './a.png';

function MyBoard(){
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState()
    const [boardData, setBoardData] = useState([{
        boardTitle: "레고 조립",
        contents: "포스터1",
        image_url: "./image/포차코/포챠코8.png"
    },{
        boardTitle: "영어 스터디",
        contents: "포스터2",
        image_url: "../image/스누피1.png",
    },{
        boardTitle: "자동차",
        contents: "포스터3",
    },{
        boardTitle: "title4",
        contents: "포스터4",
    }, {
        boardTitle: "title5",
        contents: "포스터5",
    },
    {
        boardTitle: "title6",
        contents: "포스터6",
    },{
        boardTitle: "title7",
        contents: "포스터7",
    },{
        boardTitle: "title8",
        contents: "포스터8",
    },{
        boardTitle: "title9",
        contents: "포스터9",
    }
    ])
    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };
    const chunkedDataArray = chunkArray(boardData, 3);

    return(
        <div className="MyBoard">
            <div className='MyboardTable'>
              <table className='MyboardInTable'>
                <tbody>
                {chunkedDataArray.map((rowItems) => (
                    <tr>
                        {rowItems.map((item) => (
                        
                            <td className="MyoneBoard" data-title={item.boardTitle} onClick={() => {navigate('/')}}   >
                                {/* {item.contents} */}
                                <div className='imgposter'>
                                  <img src={img} alt={item.boardTitle} className='Myposterimg'/>
                                </div>
                               <p>
                                {/* <button>button</button> */}
                               </p>
                            </td>                
                        ))}
                    </tr>
                ))}
                </tbody>
              </table>
              <div className='Mybuttondiv'>
                <button className='Myprev' onClick={()=>{if(page>1)setPage(page-1)}}>이전</button>
                <p className='pagep'>{page}</p>
                <button className='Mynext' onClick={()=>{if(maxPage>page)setPage(page+1)}}>다음</button>
                </div>
                </div>
        </div>
    )
}

export default MyBoard