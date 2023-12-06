//모듈 임포트
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//컴포넌트 임포트
import Menubar from './Front/Menubar/Menubar';
import Footer from './Front/Footer/Footer';

import Mainmenu from './Front/Body/Mainmenu/Mainmenu';
import Hboard from './Front/Body/Hboard/Hboard';

import Account from './Front/Body/Account/Account';
import MyAccount from './Front/Body/Account/MyAccount';
import MyBoard from './Front/Body/Account/MyBoard';
import ChangePwd from './Front/Body/Account/ChangePwd';
import Bookmark from './Front/Body/Account/Bookmark';
import AccountWithdrawal from './Front/Body/Account/AccountWithdrawal';
import SignIn from './Front/Body/Sign-In-Up/SignIn';
import SignUp from './Front/Body/Sign-In-Up/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Menubar/>
      <Routes>
        <Route path='/' element={<Mainmenu/>}/>

        <Route path='/Hboard' element={<Hboard/>}/>

        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>

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
