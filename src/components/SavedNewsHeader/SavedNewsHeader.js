import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SavedNews from '../SavedNews/SavedNews';
const SavedNewsHeader = ({ name, savedArticles, setSavedArticles }) => {
  const [keywords, setKeywords] = useState([]);
  let location = useLocation();
  return (
    <div
      className="news"
      style={{ display: location.pathname === '/saved-news' ? 'flex' : 'none' }}
    >
      <div className="news__container">
        <p className="news__articles">Saved articles</p>
        <h1 className="news__heading">
          {name ? name[0].toUpperCase() + name.substring(1) : 'User'}, you have{' '}
          {savedArticles.length} saved articles
        </h1>
        <p className="news__keywords">
          By keywords:{' '}
          <span className="news__tags">
            {keywords.length > 3 ? (
              <>
                {keywords[0]}, {keywords[1]}, {keywords[2]} and{' '}
                {keywords.length - 3} others
              </>
            ) : (
              keywords.join(', ')
            )}
          </span>
        </p>
      </div>
      <SavedNews
        setSavedArticles={setSavedArticles}
        savedArticles={savedArticles}
        setKeywords={setKeywords}
      />
    </div>
  );
};

export default SavedNewsHeader;
