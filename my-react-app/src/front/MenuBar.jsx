import { useNavigate, useLocation } from 'react-router-dom';

function MenuBar() {
    const navigate = useNavigate();
    return(
        <div className="MenuBar">
            <button onClick={() => {navigate('/Create')}}>Create</button>
            <button onClick={() => {navigate('/Read')}}>Read</button>
            <button onClick={() => {navigate('/Update')}}>Update</button>
            <button onClick={() => {navigate('/Delete')}}>Delete</button>
        </div>
    );
}

export default MenuBar