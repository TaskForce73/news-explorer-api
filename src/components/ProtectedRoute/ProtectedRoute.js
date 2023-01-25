import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ setIsSignUpPopupOpen, isLogin, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isLogin && location.pathname === '/saved-news') {
      navigate('/');
      setIsSignUpPopupOpen(true);
    }
    if (localStorage.getItem('jwt')) {
      setIsSignUpPopupOpen(false);
      navigate('/saved-news');
    }
  }, [isLogin, location.pathname, navigate, setIsSignUpPopupOpen, currentUser]);

  return isLogin && children;
}
export default ProtectedRoute;
