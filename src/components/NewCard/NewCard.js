import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveArticles, deleteSavedArticles } from '../../utils/auth';
import Mark from '../../images/Mark.svg';
import savedMark from '../../images/Mark-active.svg';

const NewCard = ({
  isLogin,
  article,
  searchQuestion,
  setSavedArticles,
  setKeywords,
  savedArticles,
  setIsSignUpPopupOpen
}) => {
  let location = useLocation();
  const [isHome, setIsHome] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSave, setIsSave] = useState(false);


  function registerClick() {
    setIsSignUpPopupOpen(true)
  }
  useEffect(() => {
    if (isLogin) {
      savedArticles.forEach((element) => {
        if (element.title === article.title) {
          setIsSave(true);
        }
      });
    }
  }, [isLogin, article.title, savedArticles]);

  useEffect(() => {
    const toDate = (date) => {
      return new Intl.DateTimeFormat('en-EN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(date));
    };

    const date = document.querySelectorAll('.element__date');

    date.forEach((i) => {
      i.textContent = toDate(i.textContent);
    });
  }, [article]);

  function check() {
    const logout = document.querySelector('.navigation__signout');

    if (logout == null) {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  }
  useEffect(() => {
    check();
  }, [isLogin]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);
  }, []);

  function saveArticlesFromClient() {
    const token = localStorage.getItem('jwt');
    saveArticles({
      fromDate: article.publishedAt,
      question: searchQuestion,
      token,
    }).then((res) => {
      setSavedArticles(res);
    });
  }

  function deleteCard() {
    const token = localStorage.getItem('jwt');
    deleteSavedArticles(token, article._id).then((res) => {
      setSavedArticles(res.data);
      const words = res.data.map((i) => i.keyword);
      setKeywords([...new Set(words)]);
    });
  }

  return (
    <li className="element">
      <img
        className="element__picture"
        src={article.urlToImage}
        alt={article.title}
      />
      <p
        className="element__kind"
        style={{
          display: location.pathname === '/saved-news' ? 'block' : 'none',
        }}
      >
        {location.pathname === '/saved-news' ? article.keyword : null}
      </p>
      {isLogin ? (
      <button
        className="element__mark"
        aria-label="mark"
        type="button"
        onClick={saveArticlesFromClient}
        style={{
          display: location.pathname === '/saved-news' ? 'none' : 'block',
          backgroundImage: isSave ? `url(${savedMark})` : `url(${Mark})`,
        }}
      ></button>
      ) : (
        <button
        className="element__mark"
        aria-label="mark"
        type="button"
        onClick={registerClick}
      ></button>
      )}
      {screenWidth >= 1024 && (
        <div
          className={
            isHome && location.pathname === '/'
              ? 'element__save_display_none'
              : 'element__save'
          }
          aria-label="add"
          type="button"
        >
          Sign in to save articles
        </div>
      )}

      <button
        className="element__bin"
        aria-label="delete"
        type="button"
        onClick={deleteCard}
        style={{
          display: location.pathname === '/saved-news' ? 'block' : 'none',
        }}
      ></button>

      {screenWidth >= 1024 ? (
        location.pathname === '/saved-news' ? (
          <button className="element__signin" aria-label="remove" type="button">
            Remove from saved
          </button>
        ) : null
      ) : null}
      <p className="element__date">{article.publishedAt}</p>
      <h2 className="element__header">{article.title}</h2>
      <p
        className="element__description"
        dangerouslySetInnerHTML={{ __html: article.description }}
      ></p>
      <a
        className="element__tag"
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        {article.source.name}
      </a>
    </li>
  );
};

export default NewCard;
