import './Menubar.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menubar() {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(true);

    const Logout = () => {
        navigate('/SignIn');
        setLoggedIn(false);
    };

    return(
        <div className="Menubar">
            <Link to='/' className="Header-logo">PAD</Link>
            <div className="Header-navbar">
                <Link className='Header-nav-item' to='/'>메인</Link>   
                <Link className='Header-nav-item' to='/Hboard'>홍보</Link>
                {isLoggedIn ? (
                    <>
                    <Link className='Header-nav-item' to='/Account/MyAccount'>계정</Link> 
                    <span className='Header-nav-item' onClick={Logout}>로그아웃</span>
                    </>
                ) : (
                    <>
                    <Link className='Header-nav-item' to='/SignIn'>로그인</Link>
                    {/* 개발용 */}
                    <Link className='Header-nav-item' to='/Account/MyAccount'>계정</Link> 
                    <span className='Header-nav-item' onClick={Logout}>로그아웃</span>
                    {/* 개발용 */}
                    </>
                )}       
            </div>
        </div>
    )
}

export default Menubar