import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpenButtonMenu, setOpenButtonMenu] = useState(false);

  const handleClickMenu = () => {
    setOpenButtonMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenButtonMenu(false);
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={loggedIn} openButtonMenu={handleClickMenu} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header
                loggedIn={true}
                openButtonMenu={handleClickMenu}
                classnames="header__dark"
                navigationIcon="navigation__link-dark"
              />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header
                loggedIn={true}
                openButtonMenu={handleClickMenu}
                classnames="header__dark"
                navigationIcon="navigation__link-dark"
              />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header
                loggedIn={true}
                openButtonMenu={handleClickMenu}
                classnames="header__dark"
                navigationIcon="navigation__link-dark"
              />
              <Profile />
            </>
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Menu isOpenMenu={isOpenButtonMenu} onClose={handleCloseMenu} />
    </div>
  );
}
