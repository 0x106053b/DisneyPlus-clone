import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

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


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // components가 더 이상 호출되지 않을 때
    return () => {window.removeEventListener("scroll", handleScroll)};
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


  // 이미지에 하이퍼링크를 거는 법 : 
  // <a href="https://google.com"><img src="img/logo.png"></a>
  return (
    <div>
      <NavWrapper show={show}>
        <Logo>
          <img alt="Disney Plus Logo"
            src="/images/logo.svg"
            onClick={() => (window.location.href = "/")}></img>
        </Logo>
        {pathname === "/" ? (
          <Login>login</Login>
        ) : (
          <Input value={searchValue}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="영화를 검색하세요."></Input>
        )}
        </NavWrapper>
    </div>
  )
}

export default Nav

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

