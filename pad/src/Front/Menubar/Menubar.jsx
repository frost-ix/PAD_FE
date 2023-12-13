import "./Menubar.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/Session";


const WritingLink = ({ isLoggedIn }) => {
  const targetURL = isLoggedIn ? "/WritingBoard" : "/Nomainmenu";
  return targetURL;
};

function Menubar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Session = useSelector((state) => state.Session.value);
  const targetURL = WritingLink({ isLoggedIn: Session.memNN });

  const Logout = async () => {
    try {
      const response = await fetch(`/proxy/member/Logout`, {
        method: "POST",
      });
      if (response.ok) {
        alert("로그아웃 성공");
        dispatch(
          login({
            memNN: null,
            memID: null,
            memTel: null,
            memMail: null,
          })
        );
        navigate("/");
      } else {
        alert("로그아웃 실패");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="Menubar">
      <Link to="/" className="Header-logo">PAD</Link>
      <div className="Header-navbar">
        <Link className="Header-nav-item" to="/">메인</Link>
        <Link className="Header-nav-item" to="/Hboard">홍보</Link>
        {/* <Link className="Header-nav-item" to="/WritingBoard">글쓰기</Link> */}
        <Link className="Header-nav-item" to={targetURL}>글쓰기</Link>
        {Session.memNN ? (
          <>
            <Link className="Header-nav-item" to="/Account/MyAccount">계정</Link>
            <span className="Header-nav-item" onClick={Logout}>로그아웃</span>
          </>
        ) : (
          <>
            <Link className="Header-nav-item" to="/SignIn">로그인</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Menubar;
