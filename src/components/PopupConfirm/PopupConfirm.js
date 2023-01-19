import React from 'react';

function PopupConfirm(props) {
  function afterConfirm() {
    props.setIsConfirmPopupOpen(false);
    props.setIsSignInPopupOpen(true);
  }

  return (
    <div
      className={`popup popup_type_${props.name} && ${
        props.isOpen && 'popup_open'
      } `}
    >
      <div className="popup-confirm__body">
        <button
          aria-label="close"
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup-confirm__title">
          Registration successfully completed!
        </h2>
        <p className="popup-confirm__link" onClick={afterConfirm}>
          Sign in
        </p>
      </div>
    </div>
  );
}

export default PopupConfirm;
