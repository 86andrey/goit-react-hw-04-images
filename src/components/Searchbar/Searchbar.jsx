import React from "react";
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
// import PropTypes from 'prop-types';
import { useState } from "react";



const Searchbar = ({ onSubmit }) => {
    const [imageSearch, setImageSearch] = useState('');

    const handleImageChange = e => {
        setImageSearch(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault(); 
        if (imageSearch.trim() === '') {
            return toast.warn('non name');
        }
        onSubmit(imageSearch);
        setImageSearch('');
    };
    
    return (
        <header className={s.searchbar} >
            <form className={s.form} onSubmit={handleSubmit}>
                <button type="submit" className={s.button}>
                    <BsSearch size={20} />
                </button>

                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    name="searchRequest"
                    value={imageSearch}
                    placeholder="Search images and photos"
                    // при каждом изменении в inpute вызывается ф-ция обновления
                    onChange={handleImageChange}
                />
            </form>
        </header>
    );
};
export default Searchbar;

