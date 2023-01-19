import React, { useEffect, useState } from 'react';
import NewCard from '../NewCard/NewCard';
import { useLocation } from 'react-router-dom';
import { getArticles } from '../../utils/auth';

const NewCardList = ({
  isLogin,
  articles,
  searchQuestion,
  setSavedArticles,
  isLoading,
  setKeywords,
  savedArticles,
  setIsSignUpPopupOpen
}) => {
  let location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    getArticles(token).then((res) => {
      setSavedArticles(res.data);
    });
  }, [setSavedArticles]);

  const [articlesAmount, setArticlesAmount] = useState(3);
  return (
    <>
      {location.pathname === '/' ? (
        <>
          {searchQuestion && articles.length > 0 && !isLoading ? (
            <div className="card-list">
              <h2 className="card-list__heading">Search results</h2>
              <ul className="card-list__container">
                {articles.slice(0, articlesAmount).map((article, index) => (
                  <NewCard
                    key={index}
                    article={article}
                    isLogin={isLogin}
                    searchQuestion={searchQuestion}
                    savedArticles={savedArticles}
                    setSavedArticles={setSavedArticles}
                    setIsSignUpPopupOpen={setIsSignUpPopupOpen}
                  />
                ))}
              </ul>
              <button
                className="card-list__button"
                style={{
                  display: articlesAmount >= articles.length ? 'none' : 'block',
                }}
                onClick={() => setArticlesAmount(articlesAmount + 3)}
              >
                Show more
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="card-list">
          <ul className="card-list__container">
            {articles.map((article, index) => (
              <NewCard
                key={index}
                article={article}
                isLogin={isLogin}
                searchQuestion={searchQuestion}
                setSavedArticles={setSavedArticles}
                setKeywords={setKeywords}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NewCardList;
