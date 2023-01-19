import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import PopupSignIn from '../PopupSignIn/PopupSignIn';
import PopupSignUp from '../PopupSignUp/PopupSignUp';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [name, setIsName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  const [articles, setArticles] = useState([]);
  const [searchQuestion, setSearchQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);
  const [errorText, setErrorText] = useState(false);
  const navigate = useNavigate();

  function handleSignInPopupClick() {
    setIsSignInPopupOpen(true);
  }

  function handleChangePopupState() {
    if (isSignInPopupOpen) {
      setIsSignInPopupOpen(false);
      setIsSignUpPopupOpen(true);
    }
    if (isSignUpPopupOpen) {
      setIsSignUpPopupOpen(false);
      setIsSignInPopupOpen(true);
    }
  }

  function closeAllPopups() {
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeAllPopups();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    const closeOutside = (e) => {
      if (
        e.target.classList.contains('popup_open') ||
        e.target.classList.contains('popup__close')
      ) {
        closeAllPopups();
      }
    };
    window.addEventListener('mousedown', closeOutside);
    return () => window.removeEventListener('mousedown', closeOutside);
  }, []);

  function signin({ email, password }) {
    auth
      .authorize(password, email)
      .then((res) => {
        setIsLogin(true);
        setIsName(res.name);
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
        setCurrentUser(res);
        setIsSignInPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorText(true);
        setTimeout(() => {
          setErrorText(false);
        }, 3000);
      });
  }

  function signup({ username, email, password }) {
    auth
      .register(email, password, username)
      .then(() => {
        setIsSignUpPopupOpen(false);
        setIsConfirmPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorText(true);
        setTimeout(() => {
          setErrorText(false);
        }, 3000);
      });
  }

  useEffect(() => {
    if (token) {
      auth
        .validateToken(token)
        .then((res) => {
          if (res.data._id) {
            setIsLogin(true);
            setCurrentUser(res.data);
            setIsName(res.data.name);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLogin(false);
        });
    }
  }, [token, setIsLogin]);

  function Logout() {
    localStorage.removeItem('jwt');
    setIsLogin(false);
    setIsName('');
    setCurrentUser({});
    setIsSignUpPopupOpen(false);
    navigate('/');
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          name={name}
          isLogin={isLogin}
          onSignInClick={handleSignInPopupClick}
          Logout={Logout}
          setArticles={setArticles}
          setSearchQuestion={setSearchQuestion}
          setIsLoading={setIsLoading}
        />
        <Routes>
          <Route
            path="saved-news"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                setIsSignUpPopupOpen={setIsSignUpPopupOpen}
              >
                <SavedNewsHeader
                  name={name}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <Main
                isLogin={isLogin}
                articles={articles}
                searchQuestion={searchQuestion}
                isLoading={isLoading}
                savedArticles={savedArticles}
                setSavedArticles={setSavedArticles}
                setIsSignUpPopupOpen={setIsSignUpPopupOpen}
              />
            }
          />
        </Routes>
        <Footer />
        <PopupSignIn
          onLogin={signin}
          isOpen={isSignInPopupOpen}
          onClose={closeAllPopups}
          onStateChange={handleChangePopupState}
          errorText={errorText}
        />
        <PopupSignUp
          onRegister={signup}
          isOpen={isSignUpPopupOpen}
          onClose={closeAllPopups}
          onStateChange={handleChangePopupState}
          errorText={errorText}
        />

        <PopupConfirm
          name="confirm"
          setIsSignInPopupOpen={setIsSignInPopupOpen}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          setIsConfirmPopupOpen={setIsConfirmPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
