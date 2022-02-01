import React from 'react';
import Select from 'react-select';
import Script from 'next/script';
import styles from './searchbar.module.css';

export function SearchBar({ catNames, handleCatSelection }) {
  const [onMobile, setOnMobile] = React.useState(false);

  React.useEffect(() => {
    if (window.innerWidth < 601) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }

    const updateMedia = () => {
      if (window.innerWidth < 601) {
        setOnMobile(true);
      } else {
        setOnMobile(false);
      }
    };

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  
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
    }),
    menu: styles => ({
      ...styles,
      padding: '.5rem',
      width: onMobile ? '250%' : '100%'
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
        placeholder="Search"
        isSearchable={true}
      />
      <i className="fas fa-search" style={{ color: 'black', alignSelf: 'center'}}></i>

      <Script src="https://kit.fontawesome.com/65fd9b8384.js" crossOrigin="anonymous"></Script>
    </div>
  );
}