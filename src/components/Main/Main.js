import React from 'react';
import About from '../About/About';
import NewCardList from '../NewCardList/NewCardList';
import NothingFound from '../NothingFound/NothingFound';
import Preloader from '../Preloader/Preloader';
const Main = ({
  isLogin,
  articles,
  searchQuestion,
  isLoading,
  savedArticles,
  setSavedArticles,
  setIsSignUpPopupOpen,
}) => {
  
  return (
    <main className="main">
      {isLoading && searchQuestion && <Preloader />}
      <NewCardList
        isLogin={isLogin}
        articles={articles}
        searchQuestion={searchQuestion}
        isLoading={isLoading}
        savedArticles={savedArticles}
        setSavedArticles={setSavedArticles}
        setIsSignUpPopupOpen={setIsSignUpPopupOpen}
      ></NewCardList>
      <NothingFound
        articles={articles}
        searchQuestion={searchQuestion}
        isLoading={isLoading}
      ></NothingFound>
      <About />
    </main>
  );
};

export default Main;
