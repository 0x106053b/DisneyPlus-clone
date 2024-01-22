import React from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'
import Nav from "./components/Nav"
import DetailPage from './pages/DetailPage/DetailPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import './App.css'


/* 전체 Layout */
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};


/* 중첩 라우팅을 이용하여 Layout을 적용한다. */
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="main" element={<MainPage />}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App