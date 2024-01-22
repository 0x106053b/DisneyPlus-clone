import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../api/axios';
import "./DetailPage.css"

const DetailPage = () => {

  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  // movieId가 바뀔 때마다 실행됨
  // useCallback()이랑 뭐가 다른거지 ... ?
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(
        `/movie/${movieId}`
      )
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  // 클릭되지 않았거나 request 실패하여 movie에 값이 할당되지 않은 경우
  if (!movie) return null;
  return(
    <section className="modal__container2">
      <div className="modal__blackbox2"></div>
      <img
      className="modal__poster-img2"
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt="modal__poster-img"></img>
      <h1 className="modal__movie-title2">{movie.title ? movie.title : movie.name}</h1>
      <p className="modal__movie-overview2">{movie.overview ? movie.overview : ""}</p>
    </section>
  )
}

export default DetailPage
