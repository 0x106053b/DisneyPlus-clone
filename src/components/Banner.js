import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import instance from '../api/axios'
import requests from '../api/requests'
import "./Banner.css"

const Banner = () => {

  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  // 배너가 새롭게 렌더링 될 떄마다 useEffect 실행
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await instance.get(requests.fetchNowPlaying);

    const movieId =
      // response.data.results는 Array(20)
      // Array(20)에서 데이터 한 줄을 랜덤으로 뽑아 뽑힌 영화의 id를 movieId에 저장
      response.data.results[Math.floor(Math.random() * response.data.results.length)].id;

    // response.data.results 에 담긴 '간단한' 영화 정보보다도 디테일한 영화 정보를 불러오기 위해서
    // 추출한 movieId를 이용하여 더 디테일한 영화 정보를 불러오기.
    // params : {append_to_response : "videos"} 하여 비디오 정보도 포함하여 불러오기
    // ** await을 이용한 비동기 요청 필수!
    const { data: movieDetail } = await instance.get(`movie/${movieId}`,
      { params: { append_to_response: "videos" } });

    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    // 길이가 n이상인 문자열은 n자로 자른 truncate한 후 "..." 붙이기
    // 길이가 n보다 짧은 문자열은 그냥 return
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  if (isClicked) {
    return (
      <div style={{display : 'flex'}}>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
            ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen">
            </Iframe>
          </HomeContainer>
        </Container>
        <button className="exit__button" onClick={() => setIsClicked(false)}>X</button>
      </div>
    )
  }
  else {
    return (
      <header className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}>
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_title}
          </h1>
          {/* movie.videos.results[0].key 값이 존재할 때만 --> play 버튼을 화면에 표시 */}
          <div className="banner_buttons">
            {movie?.videos?.results[0]?.key &&
              <button className="banner__button play"
                onClick={() => setIsClicked(true)}
              >Play</button>
            }
          </div>
          <p className="banner__description">{truncate(movie?.overview, 100)}</p>
        </div>
        <div className="banner__fadeBottom" />
      </header>
    )
  }
}

export default Banner

const Container = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  width : 100%;
  height : 100vh;
`;

const HomeContainer = styled.div`
  width : 100%;
  height : 100%;
`;

const Iframe = styled.iframe`
  width : 100%;
  height : 100%;
  z-index = -1;
  opacity : 0.65;
  border : none;

  &::after{
    content : "";
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
  }
`;