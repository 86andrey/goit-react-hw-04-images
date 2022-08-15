import React, {useEffect} from "react";
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const selectedModal = document.querySelector('#modal');

export default function Modal (largePicture, tags, onClose) {
  
  useEffect(() => {
    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
    window.addEventListener('keydown', handleKeyDown);
   
    return () =>
      window.removeEventListener('keydown', handleKeyDown);
  },[onClose]);

  
  const handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
     onClose();
    }
  };

    return createPortal(
      <div className={s.overlay} onClick={handleClickBackdrop}>
        <div className={s.modal}>
          <img src={largePicture} alt={tags} />
        </div>
      </div>,
      selectedModal);
};



Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.array,
  largePicture: PropTypes.string,
};


