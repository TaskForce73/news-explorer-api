import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { searchArticles } from '../../utils/NewsApi';

const SearchForm = ({ setArticles, setSearchQuestion, setIsLoading }) => {
  const [values, setValues] = useState({question : ""});

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  function handleSearch(e) {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    searchArticles(values.question, token)
      .then((res) => {
        setIsLoading(true);
        setArticles(res.articles);
        setSearchQuestion(values.question);
      })
      .catch((err) => console.log(err))
      .finally(()=>{
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
  }
  

  let location = useLocation();
  return (
    <div
      className="form"
      style={{ display: location.pathname === '/saved-news' ? 'none' : 'flex' }}
    >
      <h1 className="form__heading">What's going on in the world?</h1>
      <p className="form__pharagraph">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="form__field" onSubmit={handleSearch}>
        <input
          type="text"
          name="question"
          placeholder="Enter topic"
          minLength="2"
          maxLength="40"
          required
          className="form__field-topic"
          onChange={handleChange}
        ></input>
        <button type="submit" className="form__field-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
