import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';

function PopupSignIn({
  isOpen,
  onClose,
  onLogin,
  onStateChange,
  errorText,
  buttonText,
}) {
  const { values, errors, isValid, handleChange } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(values);
    }
  };

  return (
    <PopupWithForm
      name="signin"
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="popup__heading">Email</p>
      <input
        value={values.email || ''}
        className="popup__input"
        type={'email'}
        name="email"
        placeholder={'Enter email'}
        required
        autoComplete="current-email"
        onChange={handleChange}
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
      {errorText && (
        <span className="popup__server-error">Invalid email or password</span>
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
        {buttonText ? 'Saving...' : 'Save'}
      </button>
      <p className="popup__signup">
        or
        <Link to="/" onClick={onStateChange} className="popup__signup-link">
          {' '}
          Sign Up
        </Link>
      </p>
    </PopupWithForm>
  );
}

export default PopupSignIn;
