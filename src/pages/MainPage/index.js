import React from 'react'
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Row from '../../components/Row';
import styled from 'styled-components'
import requests from '../../api/requests';
import './index.css'

const MainPage = () => {
    return (
        <Container>
            <Nav></Nav>
            <Banner></Banner>
            <Category></Category>
            <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
            <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
            <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}></Row>
            <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies}></Row>
        </Container>
    );
}

export default MainPage

const Container = styled.main`
  position : relative;
  overflow-x : hidden;
  display : block;
  padding : 0 calc(3.5vw + 5px);
  top : 72px;

  &:after{
    background : url("/images/home-background.png") center center / cover no-repeat fixed;
    content : "";
    position : absolute;
    inset : 0px;
    opacity : 1;
    z-index : -1;
  }
`;