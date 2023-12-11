import './ViewBoard.css'
import img from './a.png'
// import img from './k.jpg'

function ViewBoard(props){
    const Wi = "sdssssssssssssssssssssss";
    return(      
        <div className="ViewBoard">
            <div className='View-Table'>
                <img src={img} className='View-Board-Img'/>

                <div className='View-Table-Writing'>
                    {Wi}
                </div>
            </div>
         </div>
    )
}

export default ViewBoard