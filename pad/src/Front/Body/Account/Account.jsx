import './css/Account.css'
import { Outlet } from 'react-router-dom';
import Accountbar from './AccountBar'
// import MyAccount from './MyAccount';

function Account(){
    return(
        <div className="Account">
            <Accountbar/>
            <Outlet/>
        </div>
    )
}

export default Account