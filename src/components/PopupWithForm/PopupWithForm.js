import React from 'react';

function PopupWithForm({ children, name, isOpen, title, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} && ${isOpen && 'popup_open'} `}>
      <div className="popup__body">
        <button
          aria-label="close"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form
          noValidate
          name={`form-${name}`}
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
