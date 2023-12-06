import './Hboard.css'
import { Outlet } from 'react-router-dom';

function Hboard(){
    return(
        <div className="Hboard">
            <div className='HboardBar'>
                분류 대분류
            </div>
            <div className='HboardTable'>
                게시물
            </div>
        </div>
    )
}

export default Hboard