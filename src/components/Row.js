import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import instance from '../api/axios'
import MovieModal from './moviemodal/MovieModal'
import './Row.css'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Row({ title, id, fetchUrl }) {

  // request하여 Array(20)의 영화 데이터 목록을 불러옴
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  // useCallback()의 deps 안의 값이 변화하지 않는 이상
  // Row 컴포넌트가 리랜더링 될 때마다 fetchMovieData 함수를 새롭게 정의하지 않고,
  // 메모이제이션 되어있는 fetchMovieData를 그대로 사용한다.
  // 그러면 항상 useCallback을 사용하는것이 효과적인거 아닌가?
  // --> fetchUrl이 자주 변경되는 경우 useCallback를 사용하면 오히려 더 비효율적일 수 있겠다~!!
  const fetchMovieData = useCallback(
    async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      // return request;
    }, [fetchUrl]
  )

  // deps 배열에는 state 변수가 아니어도 ok --> props ok!
  //  --> fetchMovieData가 바뀔 때 (즉, fetchUrl이 바뀔 때) useEFfect 실행
  //  --> fetchMovieData를 deps로 사용하므로 fetchMovieData가 먼저 오고 그 이후에 useEffect().
  //  (참고) deps 배열 == [] : 컴포넌트가 '맨 처음' 마운트 될 때 실행
  //  (참고) deps 배열 == none : 컴포넌트가 랜더링 될 때마다 실행
  //  (참고) 리액트는 부모 컴포넌트가 랜더링 될 때 자식 컴포넌트도 함께 랜더링 됨
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <Container>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1378: { 
            slidesPerView : 6,
            slidesPerGroup : 6,
          },
          998: {
            slidesPerView : 5,
            slidesPerGroup : 5,
          },
          625: {
            slidesPerView : 4,
            slidesPerGroup : 4,
          },
          0: {
            slidesPerView : 3,
            slidesPerGroup : 3,
          }
        }}
      >
        <Content id={id}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Wrap>
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}></img>
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>

      {/* && 을 이용하여 Modal 생성 여부를 판단 */}
      {modalOpen &&
        <MovieModal
          {...movieSelected}
          setModalOpen={setModalOpen}></MovieModal>}
    </Container>
  )
}

const Container = styled.div`
  padding : 0 0 26px;
  `;

const Content = styled.div``;

const Wrap = styled.div`
  width : 95%;
  height : 95%;
  border-radius : 10px;
  box-shadow : rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor : pointer;
  overflow : hidden;
  position : relative; 
  transition : all 250ms cubic-beizer(0.25, 0.46, 0.45, 0.94) 0s;
  border : 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset : 0px;
    display : block;
    height : 100%;
    width : 100%;
    object-fit : cover;
    opacity : 1;
    transition : opacity 500ms ease-in-out;
    z-index : 1;
  }

  &:hover{
    box-shadow : rgb(0 0 0 / 80%) 0px 40px 58px -16px,
    rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform : scale(0.98);
    border-color : rgba(249, 249, 249, 0.8);
  }
  `;