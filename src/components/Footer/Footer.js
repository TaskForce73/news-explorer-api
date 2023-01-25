import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__rights">© 2021 Supersite, Powered by News API</p>
      <ul className="footer__container">
        <li className="footer__container-item">
          <a href="#" className="footer__container-home">
            Home
          </a>
        </li>
        <li className="footer__container-item">
          <a
            href="https://practicum.com"
            target="_blank"
            rel="noreferrer"
            className="footer__container-practicum"
          >
            Practicum
          </a>
        </li>
        <li className="footer__container-item">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="footer__container-social footer__container-social_type_github"
          ></a>
        </li>
        <li className="footer__container-item">
          <a
            href="https://facebook.com"
            rel="noreferrer"
            target="_blank"
            className="footer__container-social footer__container-social_type_facebook"
          ></a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
