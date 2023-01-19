import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logout from '../../images/logout.svg';
import logoutBlack from '../../images/logout-black.svg';
import hamburger from '../../images/hamburger.svg';
import hamburgerblack from '../../images/hamburger_black.svg';
import close from '../../images/nav_close.svg';

const Navigation = ({ name, isLogin, onSignInClick, Logout }) => {
  let location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);
  }, []);

  return (
    <>
      {isLogin ? (
        <div
          className="navigation__login"
          style={{
            background: toggleMenu && screenWidth <= 767 ? '#1A1B22' : null,
          }}
        >
          <p
            className="navigation__explorer"
            style={{
              color:
                location.pathname === '/saved-news' ? '#1A1B22' : '#FFFFFF',
              color:
                toggleMenu || location.pathname === '/' ? '#FFFFFF' : '#1A1B22',
            }}
          >
            News Explorer
          </p>
          {(screenWidth > 767 || toggleMenu) && (
            <nav className="navigation__wraped">
              <Link
                to="/"
                className="navigation__home"
                style={{
                  color:
                    location.pathname === '/saved-news' ? '#1A1B22' : '#FFFFFF',
                  borderColor:
                    location.pathname === '/saved-news' ? '#1A1B22' : '#FFFFFF',
                  borderBottom:
                    location.pathname === '/saved-news' || screenWidth < 767
                      ? 'none'
                      : '3px solid #ffffff',
                  color:
                    toggleMenu || location.pathname === '/'
                      ? '#FFFFFF'
                      : '#1A1B22',
                }}
              >
                Home
              </Link>
              <Link
                to="/saved-news"
                className="navigation__articles"
                style={{
                  color:
                    location.pathname === '/saved-news' ? '#1A1B22' : '#FFFFFF',
                  color:
                    toggleMenu || location.pathname === '/'
                      ? '#FFFFFF'
                      : '#1A1B22',
                  borderBottom:
                    location.pathname === '/saved-news'
                      ? '3px solid #1A1B22'
                      : 'none',
                }}
              >
                Saved articles
              </Link>
              <button
                className="navigation__signout"
                style={{
                  color:
                    location.pathname === '/saved-news' ? '#1A1B22' : '#FFFFFF',
                  borderColor:
                    location.pathname === '/saved-news' ? '#1A1B22' : '#FFFFFF',
                  color:
                    toggleMenu || location.pathname === '/'
                      ? '#FFFFFF'
                      : '#1A1B22',
                  borderColor:
                    toggleMenu || location.pathname === '/'
                      ? '#FFFFFF'
                      : '#1A1B22',
                }}
              >
                {name}
                <div
                  className="navigation__signout-exit"
                  onClick={Logout}
                  style={{
                    background:
                      location.pathname === '/saved-news'
                        ? `url(${logoutBlack})`
                        : `url(${logout})`,
                    background:
                      toggleMenu || location.pathname === '/'
                        ? `url(${logout})`
                        : `url(${logoutBlack})`,
                  }}
                />
              </button>
            </nav>
          )}
          {location.pathname === '/saved-news' && (
            <div
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
              className="navigation__hamburger-login"
              style={{
                backgroundImage: !toggleMenu
                  ? `url(${hamburgerblack})`
                  : `url(${close})`,
              }}
            ></div>
          )}

          {location.pathname === '/' && (
            <div
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
              className="navigation__hamburger-login"
              style={{
                backgroundImage: !toggleMenu
                  ? `url(${hamburger})`
                  : `url(${close})`,
              }}
            ></div>
          )}
        </div>
      ) : (
        <div
          className="navigation"
          style={{
            background: toggleMenu && screenWidth <= 767 ? '#1A1B22' : null,
          }}
        >
          <p className="navigation__explorer">News Explorer</p>
          {(screenWidth > 767 || toggleMenu) && (
            <nav className="navigation__wraped-signin">
              <Link to="/" className="navigation__home">
                Home
              </Link>
              <button onClick={onSignInClick} className="navigation__signin">
                Sign in
              </button>
            </nav>
          )}
          <div
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
            className="navigation__hamburger"
            style={{
              backgroundImage: !toggleMenu
                ? `url(${hamburger})`
                : `url(${close})`,
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Navigation;
