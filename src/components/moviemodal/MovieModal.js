import React, { useRef } from 'react'
import "./MovieModal.css"
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) => {

  const setModalVisibility = (v) => {
    setModalOpen(v);
  }

  const base_url = "https://image.tmdb.org/t/p/original/";

  const ref = useRef();
  useOnClickOutside(ref, () => {setModalVisibility(false)});

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span
          onClick={() => setModalVisibility(false)}
          className="modal-close">X</span>
          <img
          className="modal__poster-img"
          src={`${base_url}${backdrop_path}`}
          alt="modal__poster-img"></img>
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">
                100% for you
              </span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점 {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
