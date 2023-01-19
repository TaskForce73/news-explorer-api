import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

const Header = ({
  name,
  isLogin,
  onSignInClick,
  Logout,
  setArticles,
  setSearchQuestion,
  setIsLoading,
}) => {
  return (
    <div className="header">
      <Navigation
        name={name}
        isLogin={isLogin}
        Logout={Logout}
        onSignInClick={onSignInClick}
      />
      <SearchForm
        setArticles={setArticles}
        setSearchQuestion={setSearchQuestion}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Header;
