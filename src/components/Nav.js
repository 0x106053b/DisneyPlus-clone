import React from 'react'
import styled from 'styled-components'
import {useState, useEffect} from 'react'

// useEffect 의존성 배열
// (1) Components가 mount될 때 : 빈 배열을 입력하면 컴포넌트가 화면에 처음 렌더링 될 때에만 useEffect() 실행됨
// ** 만약 배열 자체를 생략한다면 리랜더링 될때마다 useEffect가 실행된다.
// (2) Components가 update될 때 : 특정 props 혹은 state의 값을 배열 안에 입력
// ** 업데이트 될 때 뿐만 아니라 mount될 때도 실행된다.
const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // 일정 수준 이상 스크롤 다운 하면 nav의 색이 표시됨
      if (window.scrollY > 50){
        setShow(true);
      }
      // 50 이하로 스크롤 다운 한 경우 nav가 투명으로 표시됨
      else{
        setShow(false);
      }
    });
    
    // components가 더 이상 호출되지 않을 때
    return () => {
      window.removeEventListener("scroll", () => {});
    };

  // 의존성 배열
  }, []);

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
      </NavWrapper>
    </div>
  )
}

export default Nav

const NavWrapper = styled.nav`
  position : fixed;
  top : 0;
  bottom : 0;
  left : 0;
  right : 0;
  height : 70px;
  background-color : ${props => props.show ? "#090b13" : "transparent"};
  diplay : flex;
  justify-content : space-between;
  align-items : center;
  padding : 0 36px;
  letter-spacing : 16px;
  z-index : 3;
  transition-property : background-color;
  transition-duration : 0.7s;
  transition-timing-function: ease-out;
`;

const Logo = styled.a`
  padding : 0;
  width : 80px;
  margin-top : 15px;
  max-height : 70px;
  font-size : 0;
  display : inline-block;
  img {
    display : block;
    width : 100%;
  }
`;

