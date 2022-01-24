import React from 'react';
import Select from 'react-select';
import Script from 'next/script';
import styles from './searchbar.module.css';

export function SearchBar({ catNames, handleCatSelection }) {
  const options = catNames.map(cat => ({ value: cat.id, label: cat.name }));

  const colorStyles = {
    container: styles => ({
      ...styles, 
      width: '100%', 
      border: 'none', 
      outline: 'none', 
      color: 'black' 
    }),
    control: styles => ({ 
      ...styles, 
      width: '100%', 
      height: '100%', 
      border: 'none', 
      outline: 'none', 
      boxShadow: 'none' 
    }),
    indicatorsContainer: styles => ({
      ...styles, 
      display: 'none'
    })
  };

  return (
    <div className={styles.search}>
      <Select 
        instanceId="cat-search-bar"
        styles={colorStyles}
        options={options} 
        defaultValue={null}
        onChange={({ value }) => handleCatSelection(value)}
        placeholder="Enter your breed"
        isSearchable={true}
      />
      <i className="fas fa-search" style={{ color: 'black', alignSelf: 'center'}}></i>

      <Script src="https://kit.fontawesome.com/65fd9b8384.js" crossOrigin="anonymous"></Script>
    </div>
  );
}