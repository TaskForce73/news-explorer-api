import { useLocation } from 'react-router-dom';
import { searchArticles } from '../../utils/NewsApi';

const SearchForm = ({ setArticles, setSearchQuestion, setIsLoading }) => {
  function handleSearch(e) {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    const question = e.target.elements.search.value;
    searchArticles(question, token)
      .then((res) => {
        setIsLoading(true);
        setArticles(res.articles);
        setSearchQuestion(question);
      })
      .catch((err) => console.log(err));
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
          name="search"
          placeholder="Enter topic"
          minLength="2"
          maxLength="40"
          required
          className="form__field-topic"
        ></input>
        <button type="submit" className="form__field-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
