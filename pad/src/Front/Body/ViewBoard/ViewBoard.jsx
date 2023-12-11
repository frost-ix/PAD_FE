import './ViewBoard.css'
import { useLocation } from 'react-router-dom';

function ViewBoard(){
    const location = useLocation();
    const { state } = useLocation();
    const boardID = state ? state : 'default value';
    return(      
        <div className="ViewBoard">
            {/* <div className='View-Table'>
                <img src={img} className='View-Board-Img'/>

                <div className='View-Table-Writing'>
                    {Wi}
                </div>
            </div> */}
            {boardID}
         </div>
    )
}

export default ViewBoard