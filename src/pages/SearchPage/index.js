import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import useDebounce from '../../hooks/useDebounce';
import './index.css'

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  // 검색어로 <Input/>에 입력한 값이 /search/e.target.value 형태로 전달되므로
  // query를 분해하여 searchTerm을 추출한다.
  const debouncedSearchTerm = useDebounce(query.get("q"), 300);
  const navigate = useNavigate();

  // debouncedSearchTerm 값이 변화할 때마다 --> <Input/> 에 입력한 값이 변화할 떄마다
  // useEffect를 실행하여 새롭게 영화 데이터를 불러오기
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // searchTerm을 이용하여 <Input/>에 입력한 값이 바뀔 때마다
  // request 하여 새롭게 영화 데이터를 불러오기
  const fetchSearchMovies = async (debouncedSearchTerm) => {
    try {
      const request = await instance.get(
        `/search/multi?include_adult=true&query=${debouncedSearchTerm}`
      );
      setSearchResults(request.data.results);
    }
    catch (error) {
      console.log("error", error);
    }
  }

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster">
                  <img src={movieImageUrl}
                    alt="movie"
                    className="movie__movie-poster"></img>
                  <p>{movie.title ? movie.title : movie.name}</p>
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  }
  else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>);
  }
}

export default SearchPage
