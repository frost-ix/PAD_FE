//모듈 임포트
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './Redux/Session';



//컴포넌트 임포트
import Menubar from './Front/Menubar/Menubar';
import Footer from './Front/Footer/Footer';

import Mainmenu from './Front/Body/Mainmenu/Mainmenu';
import Hboard from './Front/Body/Hboard/Hboard';
import ViewBoard from './Front/Body/ViewBoard/ViewBoard';
import WritingBoard from './Front/Body/ViewBoard/WritingBoard';

import Account from './Front/Body/Account/Account';
import MyAccount from './Front/Body/Account/MyAccount';
import MyBoard from './Front/Body/Account/MyBoard';
import ChangePwd from './Front/Body/Account/ChangePwd';
import Bookmark from './Front/Body/Account/Bookmark';
import AccountWithdrawal from './Front/Body/Account/AccountWithdrawal';
import SignIn from './Front/Body/Sign-In-Up/SignIn';
import SignUp from './Front/Body/Sign-In-Up/SignUp';
import Question from './Front/Body/Mainmenu/Question'
import Company from './Front/Body/Mainmenu/Company'
import Nomainmenu from './Front/Body/Mainmenu/Nomainmenu'

function App() {
  const Session = useSelector((state) => state.Session.value)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const SessionServer = async () => {
      try {
        const response = await fetch(`/proxy/session`, {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json()
          dispatch(login({
            memNN:data.memNN, 
            memID:data.memID,
            memTel:data.memTel,
            memMail:data.memMail}))
        } else {
          // console.log("세션없음")
        }
      } catch (error) {
        alert(error);
      }
    };
    if(Session.memNN == null){
      SessionServer();
    }
  },[])

  return (
    <div className="App">
      <BrowserRouter>
      <Menubar/>
      <Routes>
        <Route path='/' element={<Mainmenu/>}/>

        <Route path='/Hboard' element={<Hboard/>}/>

        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>

        <Route path='/Question' element={<Question/>}/>
        <Route path='/Company' element={<Company/>}/>

        <Route path='/ViewBoard' element={<ViewBoard/>}/>
        <Route path='/WritingBoard' element={<WritingBoard/>}/>
        <Route path='/Nomainmenu' element={<Nomainmenu/>}/>
 
        <Route path='/Account' element={<Account/>}>
          <Route path='MyAccount' element={<MyAccount/>}/>
          <Route path='MyBoard' element={<MyBoard/>}/>
          <Route path='ChangePwd' element={<ChangePwd/>}/>
          <Route path='Bookmark' element={<Bookmark/>}/>
          <Route path='AccountWithdrawal' element={<AccountWithdrawal/>}/>
        </Route>

      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
