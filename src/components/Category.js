import React from 'react'
import styled from 'styled-components'


export default function Category() {
  // 소리가 꺼진(muted) 상태에서만 자동 재생(autoplay)되는 브라우저가 많으므로 muted 속성을 꼭 추가한다.
  return (
    <Container>
      {/* (1) disney */}
      <Wrap>
        <img src="/images/viewers-disney.png" alt=""></img>
        <video autoPlay loop muted>
          <source src="/videos/disney.mp4" type="video/mp4"></source>
        </video> 
      </Wrap>
      {/* (2) marvel */}
      <Wrap>
        <img src="/images/viewers-marvel.png" alt=""></img>
        <video autoPlay loop muted>
          <source src="/videos/marvel.mp4" type="video/mp4"></source>
        </video> 
      </Wrap>
      {/* (3) national geographic */}
      <Wrap>
        <img src="/images/viewers-national.png" alt=""></img>
        <video autoPlay loop muted>
          <source src="/videos/national-geographic.mp4" type="video/mp4"></source>
        </video> 
      </Wrap>
      {/* (4) pixar */}
      <Wrap>
        <img src="/images/viewers-pixar.png" alt=""></img>
        <video autoPlay loop muted>
          <source src="/videos/pixar.mp4" type="video/mp4"></source>
        </video> 
      </Wrap>
      {/* (5) star wars */}
      <Wrap>
        <img src="/images/viewers-starwars.png" alt=""></img>
        <video autoPlay loop muted>
          <source src="/videos/star-wars.mp4" type="video/mp4"></source>
        </video> 
      </Wrap>
    </Container>
  )
}


const Container = styled.div`
  display : grid;
  gap : 25px;
  grid-template-columns : repeat(5, 1fr);
  margin-top : 30px;
  padding : 30px 0px 26px;

  // 페이지 사이즈가 768px 이하로 줄어드는 경우 repeat(1, 1fr) 꼴로 Grid layout을 정렬한다.
  @media (max-width : 768px){
    grid-template-columns : repeat(1, 1fr);
  }
`;

// Wrap (<div/>) 안에 들어가는 video, img 요소도 여기서 함께 스타일링
// 비디오 + 이미지 테두리 overflow하는 경우 hidden하도록 설계
// Wrap을 relative로 설계해야 하위 컴포넌트인 img와 video를 absolute(inset = 0) 으로 배치할 수 있음!
const Wrap = styled.div`
  position : relative;
  padding-top : 56.25%;
  border-radius : 10px;
  box-shadow : rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor : pointer;
  overflow : hidden;
  transition : all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border : 3px solid rgba(249, 249, 249, 0.1);

  img {
    position : absolute;
    inset : 0px;
    display : block;
    object-fit : cover;
    height : 100%;
    opacity : 1;
    transition : opacity 500ms ease-in-out 0s;
    width : 100%;
    z-index : 1;
  }

  video {
    position : absolute;
    width : 100%;
    height : 100%;
    inset : 0px;
    opacity : 0;
    z-index : 0;
  }

  &:hover{
    box-shadow : rgb(0 0 0 / 80%) 0px 40px 58px -16px,
    rgb(0 0 0 / 72%) 0px 30px 22px -10px;

    transform : scale(1.05);
    border-color : rgba(249, 249, 249, 0.8);

    video {
      opacity : 1;
    }
  }
`;