import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Layout from '../components/Layout/layout';
import { getAllBreeds } from '../lib/catAPI';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import { SearchBar } from '../components/SearchBar/searchbar';

export async function getServerSideProps() {
  const cats = await getAllBreeds();
  const fourCats = chooseFourCats(cats);
  const catNames = cats.map(cat => ({id: cat.id, name: cat.name}));

  return {
    props: {
      catNames,
      fourCats
    }
  };
}

const chooseFourCats = (cats) => {
  const max = cats.length;
  const indexOfChosenCats = [];

  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * max);
    if (indexOfChosenCats.includes(index)) {
      i--;
      continue;
    }
    indexOfChosenCats.push(index);
  }

  return [
    cats[indexOfChosenCats[0]],
    cats[indexOfChosenCats[1]],
    cats[indexOfChosenCats[2]],
    cats[indexOfChosenCats[3]],
  ];
};

export default function Home({ catNames, fourCats }) {
  return (
    <Layout>
      <Head>
        <title>Cat Wiki</title>
      </Head>

      {/* CatWiki Search */}
      <header className={styles.header}>
        <div className={styles['cat-background']}>
          <div className={styles['cat-background__container']}>
            <Image src='/CatWikiLogo.svg' alt='Cat Wiki Logo' height={100} width={300} className={utilStyles.whiteLogo} />
            <h3 className={styles['cat-background__title']}>
              Get to know more about your cat breed
            </h3>
            {/* Search bar */}
            <SearchBar 
              catNames={catNames} 
              handleCatSelection={(catId) => console.log('Cat chosen!', catId)} 
            />
          </div>
        </div>

        <div className={styles['discover-breeds']}>
          <p className={utilStyles.underline}>Most Searched Breeds</p>
          <div className={styles['discover-breeds__title-container']}>
            <h2 className={styles['discover-breeds__title']}>66+ Breeds For you to discover</h2>
            {/* todo: make this work */}
            <a className={styles['discover-breeds__link']}>SEE MORE &#8594;</a>
          </div>
          <div className={styles['cat-display']}>
            {fourCats.map((cat) => (
              <div key={cat.id}>
                {/* Cat Image */}
                <div className={styles['cat-display__image']}>
                  <Image src={cat.image?.url ?? '/kitten-silhouette-2993fc-lg+copy_ForgottenKitten_2.jpg'} alt={cat.name} layout='fill' objectFit='cover' />
                </div>
                {/* Cat Name */}
                <p style={{ fontWeight: '500'}}>{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className={styles['cat-benefits']}>
        <div className={styles['benefits-container']}>
          <h2 className={styles['benefits-container__title']}>Why should you have a cat?</h2>
          <p className={styles['benefits-container__text']}>
            Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety levels.
          </p>
          {/* todo: make this work */}
          <a className={styles['benefits-container__link']}>READ MORE &#8594;</a>
        </div>
        <div className={styles['benefits-container--flex']} style={{ display: 'flex' }}>
          <div className={styles['image-container']}>
            <div className={styles['image2']}>
              <Image 
                src='/image 2.png'
                alt='Cat Image'
                layout='fill'
                objectFit='cover'
              />
            </div>
            <div className={styles['image1']}>
              <Image 
                src='/image 1.png'
                alt='Cat Image'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
          <div className={styles['image3']}>
            <Image 
              src='/image 3.png'
              alt='Cat Image'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
