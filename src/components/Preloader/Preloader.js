import React from 'react';
import './Preloader.css';
const Preloader = () => {
  return (
    <div className="preloader">
      <i className="circle-preloader"></i>
      <p className="pharagraph-preloader">Searching for news...</p>
    </div>
  );
};

export default Preloader;
