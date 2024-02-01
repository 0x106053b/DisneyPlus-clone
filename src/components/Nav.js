import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

// useEffect 의존성 배열
// (1) Components가 mount될 때 : 빈 배열을 입력하면 컴포넌트가 화면에 처음 렌더링 될 때에만 useEffect() 실행됨
// ** 만약 배열 자체를 생략한다면 리랜더링 될때마다 useEffect가 실행된다.
// (2) Components가 update될 때 : 특정 props 혹은 state의 값을 배열 안에 입력
// ** 업데이트 될 때 뿐만 아니라 mount될 때도 실행된다.
const Nav = () => {

  const [show, setShow] = useState(false);
  // useLocation() 을 이용해 router path를 get할 수 있음
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // 새로고침 한 후에 localStorage를 탐색하여 ==> 만약 저장된 값이 있다면 불러와서 userData로 사용
  const initialUserData = localStorage.getItem("userData") ? 
  JSON.parse(localStorage.getItem("userData")) : {}
  const [userData, setUserData] = useState(initialUserData);


  // 인증 상태 체크
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") {
          navigate("/main") // (1) Auth 완료된 상태로 + 현재 로그인 페이지라면 ==> 바로 main 페이지로 이동
        } // (2) Auth 완료된 상태로 + 현재 로그인 페이지 외 다른 페이지(main, search...)라면 ==> 페이지 이동 X
      } else {
        // (3) auth된 user가 없다면 login페이지("/")로 이동하기
        navigate("/")
      }
    })
  }, [auth, navigate, pathname]); // 인증상태(auth)가 변경되거나, 현재위지(pathname)이 변경되는 경우 인증 상태를 체크!


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // components가 더 이상 호출되지 않을 때
    return () => { window.removeEventListener("scroll", handleScroll) };
    // 의존성 배열
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    }
    // 50 이하로 스크롤 다운 한 경우 nav가 투명으로 표시됨
    else {
      setShow(false);
    }
  }

  const handleChange = (e) => {
    //searchValue state를 바로바로 업데이트
    setSearchValue(e.target.value);
    // useNavigate를 이용하여 페이지 바로바로 전환하기
    navigate(`/search?q=${e.target.value}`);
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        
        // localStorage에 객체값을 저장할 때에는 JSON.stringtify()를 통해 string화 하여 저장한다.
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserData({});
      navigate(`/`);
    }).catch ((error) => {
      alert(error.message);
    });
  }


  // 이미지에 하이퍼링크를 거는 법 : 
  // <a href="https://google.com"><img src="img/logo.png"></a>

  // login 버튼을 클릭하면 로그인 팝업을 띄울 수 있도록 함
  return (
    <div>
      <NavWrapper show={show}>
        <Logo>
          <img alt="Disney Plus Logo"
            src="/images/logo.svg"
            onClick={() => { window.location.href = "/" }}></img>
        </Logo>
        {pathname === "/" ? (
          <Login onClick={handleAuth}>Login</Login>
        ) : (
          <>
            <Input value={searchValue}
              onChange={handleChange}
              className="nav__input"
              type="text"
              placeholder="영화를 검색하세요." />
            <SignOut>
              <UserImg src={userData.photoURL} alt={userData.displayName} />
                <DropDown>
                  <span onClick={handleLogOut} style={{"width" : "100%"}}>Sign Out</span>
                </DropDown>
            </SignOut>
          </>
        )}
      </NavWrapper>
    </div>
  )
}

export default Nav

const UserImg = styled.img`
  border-radius : 50%;
  width : 100%;
  height : 100%;
  `;

const DropDown = styled.div`
  position : absolute;
  top : 48px;
  right : 0px;
  background : rgb(19, 19, 19);
  border : 1px solid rgb(151, 151, 151, 0.34);
  border-radius : 4px;
  box-shadow : rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding : 10px;
  font-size : 14px;
  letter-spacing : 3px;
  width : 100px;
  opacity : 0;
  display : flex;
  justify-content : center;
  `;

  const SignOut = styled.div`
  position : relative;
  height : 48px;
  width : 48px;
  display : flex;
  cursor : pointer;
  align-items : center;
  justify-content : center;

  &:hover{
    ${DropDown}{
      opacity : 1;
      transition-duration: 1s;
    }
  }
  `;

const Login = styled.a`
  background-color : rgba(0, 0, 0, 0.6);
  padding : 8px 16px;
  text-transform : uppercase;
  letter-spacing : 1.5px;
  border : 1px solid #f9f9f9;
  border-radius : 4px;
  transition : all 0.2s ease 0s;
  
  &:hover{
    background-color : #f9f9f9;
    color : #000;
    border-color : transparent;
  }`;

const Input = styled.input`
  position : fixed;
  left : 50%;
  transform : translate(-50%, 0);
  background-color : rgba(0, 0, 0, 0.582);
  border-radius : 5px;
  color : white;
  padding : 5px;
  border : none;
  `;

const NavWrapper = styled.nav`
  position : fixed;
  top : 0;
  bottom : 0;
  left : 0;
  right : 0;
  height : 70px;
  background-color : ${props => props.show ? "#090b13" : "transparent"};
  display : flex;
  justify-content : space-between;
  align-items : center;
  padding : 0 36px;
  letter-spacing : 16px;
  z-index : 10;
  transition-property : background-color;
  transition-duration : 0.7s;
  transition-timing-function: ease-out;
`;

const Logo = styled.a`
  padding : 0;
  width : 80px;
  margin-top : 10px;
  max-height : 70px;
  font-size : 0;
  display : inline-block;
  img {
    display : block;
    width : 100%;
  }
`;

