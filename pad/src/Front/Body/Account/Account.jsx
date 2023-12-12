import './css/Account.css'
import { Outlet,useNavigate } from 'react-router-dom';
import Accountbar from './AccountBar'

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux' //컴포넌트에서 state조회가능하게 해주는 모듈

function Account(){
    const navigate = useNavigate();
    const Session = useSelector((state) => state.Session.value) // 세션 state 넣기

    // useEffect(()=>{
    //     if(Session.memNN === null){
    //         alert("로그인 후 이용해주세요")
    //         navigate('/SignIn') 
    //     }
    // },[navigate])
    
    return(
        <div className="Account">
            <Accountbar/>
            <Outlet/>
        </div>
    )
}

export default Account