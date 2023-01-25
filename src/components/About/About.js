import React from 'react';

const About = () => {
  return (
    <div className="about">
      <div className="about__image"></div>
      <div className="about__blog">
        <h2 className="about__blog-author">About the author</h2>
        <div>
          <p className="about__blog-description">
          Hi! My name is Anton. I'm a full-stack web developer familiar with frameworks such as React.js, rest API, JavaScript, MongoDB, HTML, CSS, NodeJS, Express, etc. Much of this can be seen in this project.
          </p>
          <p className="about__blog-description">
          The Pracitcum100 program by Yandex & Masterschool has given me a unique experience, which I'm ready to implement in new, more complex projects on the way to an ideal user experience. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
