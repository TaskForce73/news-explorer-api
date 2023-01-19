import React from 'react';
import { useEffect } from 'react';
import { getArticles } from '../../utils/auth';
import NewCardList from '../NewCardList/NewCardList';

const SavedNews = ({ setSavedArticles, savedArticles, setKeywords }) => {
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    getArticles(token).then((res) => {
      setSavedArticles(res.data);
      const words = res.data.map((i) => i.keyword);
      setKeywords([...new Set(words)]);
    });
  }, [setKeywords, setSavedArticles]);
  return (
    <div className="saved-news">
      {savedArticles.length > 0 ? (
        <NewCardList
          articles={savedArticles}
          setSavedArticles={setSavedArticles}
          setKeywords={setKeywords}
        />
      ) : null}
    </div>
  );
};

export default SavedNews;
