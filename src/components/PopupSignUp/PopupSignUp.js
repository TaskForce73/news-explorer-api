import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
function PopupSignUp({
  isOpen,
  onClose,
  onRegister,
  onStateChange,
  errorText,
}) {
  const { values, errors, isValid, handleChange } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  };

  return (
    <PopupWithForm
      name="signup"
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="popup__heading">Email</p>
      <input
        value={values.email || ''}
        onChange={handleChange}
        name="email"
        className="popup__input"
        type={'email'}
        placeholder={'Enter email'}
        autoComplete="current-email"
        required
      />
      <span className="popup__error">{errors.email}</span>
      <p className="popup__heading">Password</p>
      <input
        className="popup__input"
        value={values.password || ''}
        type={'password'}
        name="password"
        placeholder={'Enter password'}
        minLength="8"
        maxLength="16"
        required
        autoComplete="current-password"
        onChange={handleChange}
      />
      <span className="popup__error">{errors.password}</span>
      <p className="popup__heading">Username</p>
      <input
        value={values.username || ''}
        onChange={handleChange}
        name="username"
        className="popup__input"
        type={'string'}
        placeholder={'Enter your username'}
        minLength="4"
        required
      />
      <span className="popup__error">{errors.username}</span>
      {errorText && (
        <span className="popup__server-error">This email is not available</span>
      )}
      <button
        className="popup__button"
        type="submit"
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? '#2F71E5' : '#E6E8EB',
          color: isValid ? '#FFFFFF' : '#B6BCBF',
        }}
      >
        Sign up
      </button>
      <p className="popup__signup">
        or
        <Link to="/" onClick={onStateChange} className="popup__signup-link">
          {' '}
          Sign in
        </Link>
      </p>
    </PopupWithForm>
  );
}

export default PopupSignUp;
