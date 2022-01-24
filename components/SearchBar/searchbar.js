import React from 'react';
import Script from 'next/script';
import styles from './searchbar.module.css';

export function SearchBar({ catNames }) {
  const [search, setSearch] = React.useState('');

  return (
    <div className={styles.search}>
      <input 
        type='search' 
        placeholder='Enter your breed' 
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <i className="fas fa-search" style={{ color: 'black', alignSelf: 'center'}}></i>

      <Script src="https://kit.fontawesome.com/65fd9b8384.js" crossOrigin="anonymous"></Script>
    </div>
  );
}