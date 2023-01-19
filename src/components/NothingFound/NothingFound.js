import React from 'react';

const NothingFound = ({ articles, searchQuestion, isLoading }) => {
  return (
    <>
      {articles.length === 0 && searchQuestion && !isLoading ? (
        <div className="nothing">
          <div className="nothing__image"></div>
          <h3 className="nothing__heading">Nothing found</h3>
          <p className="nothing__pharagraph">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default NothingFound;
