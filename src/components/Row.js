import React, { useCallback, useEffect, useState } from 'react'
import instance from '../api/axios'
import MovieModal from './moviemodal/MovieModal'
import './Row.css'


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
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow"
            onClick={() => { document.getElementById(id).scrollLeft -= window.innerWidth - 80 }}>{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {/* map을 이용하여 동일한 element 여러개 생성하는 경우,
          꼭 key를 지정하여 virtualDOM의 조작을 효율적으로 할 수 있도록 한다. */}
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}></img>
          ))}
        </div>
        <div className="slider__arrow-right">
          {/* 여기서 id란 각 행의 아이디("TN", "TR", "AM", "CM") */}
          <span className="arrow"
            onClick={() => { document.getElementById(id).scrollLeft += window.innerWidth - 80 }}>{">"}</span>
        </div>
      </div>

      {/* && 을 이용하여 Modal 생성 여부를 판단 */}
      {modalOpen &&
        <MovieModal 
        {...movieSelected}
        setModalOpen={setModalOpen}></MovieModal>}
    </div>
  )
}
