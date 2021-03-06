import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Error from 'next/error';
import Layout from '../components/Layout/layout';
import { getAllBreeds } from '../lib/catAPI';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import { SearchBar } from '../components/SearchBar/searchbar';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import image1 from '../public/image 1.png';
import image2 from '../public/image 2.png';
import image3 from '../public/image 3.png';
import missingImagePlaceholder from '../public/kitten-silhouette-2993fc-lg+copy_ForgottenKitten_2.jpg';

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

export default function Home({ catNames, fourCats, catImages, statusCode }) {
  const [catId, setCatId] = React.useState(null);
  const catLink = React.useRef(null);

  React.useEffect(() => {
    if (catId) catLink.current.click();
  }, [catId]);

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout>
      <Head>
        <title>Cat Wiki</title>
      </Head>

      {/* CatWiki Search */}
      <header className={styles.header}>
        <div className={styles['cat-background']}>
          <div className={styles['cat-background__container']}>
            <Image src='/CatwikiLogo.svg' alt='Cat Wiki Logo' height={100} width={300} className={utilStyles.whiteLogo} />
            <h3 className={styles['cat-background__title']}>
              Get to know more about your cat breed
            </h3>
            {/* Search bar */}
            <SearchBar 
              catNames={catNames} 
              handleCatSelection={(catId) => setCatId(catId)} 
            />
            <Link href={`/cats/${catId}`} >
              <a className={utilStyles.hidden} ref={catLink} >
                hidden
              </a>
            </Link>
          </div>
        </div>

        <div className={styles['discover-breeds']}>
          <p className={utilStyles.underline}>Most Searched Breeds</p>
          <div className={styles['discover-breeds__title-container']}>
            <h2 className={styles['discover-breeds__title']}>66+ Breeds For you to discover</h2>
            <Link href={'/mostSearched'} className={styles['discover-breeds__link']}>
              <a>SEE MORE &#8594;</a>

            </Link>
          </div>
          <div className={styles['cat-display']}>
            {fourCats.map((cat, index) => (
              <div key={cat.id}>
                {/* Cat Image */}
                <div className={styles['cat-display__image']}>
                  <Image 
                    src={catImages[index].image} 
                    alt={cat.name} 
                    layout='fill' 
                    objectFit='cover' 
                    placeholder='blur' 
                    blurDataURL={catImages[index].blurDataURL}
                  />
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
          <a className={styles['benefits-container__link']} href='https://animalkind.org/blog/top-5-reasons-cat/' target="_blank" rel="noreferrer noopener">READ MORE &#8594;</a>
        </div>
        <div className={styles['benefits-container--flex']}>
          <div className={styles['image-container']}>
            <div className={styles['image2']}>
              <Image 
                src={image2}
                alt='Cat Image'
                layout='fill'
                objectFit='cover'
                placeholder='blur'
              />
            </div>
            <div className={styles['image1']}>
              <Image 
                src={image1}
                alt='Cat Image'
                layout='fill'
                objectFit='cover'
                placeholder='blur'
              />
            </div>
          </div>
          <div className={styles['image3']}>
            <Image 
              src={image3}
              alt='Cat Image'
              layout='fill'
              objectFit='cover'
              placeholder='blur'
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await getAllBreeds();
  const cats = await response.json();

  if (response.status !== 200) {
    return { props: { statusCode: response.status }};
  }

  const fourCats = chooseFourCats(cats);
  const catNames = cats.map(cat => ({id: cat.id, name: cat.name}));
  const catImages = await Promise.all(fourCats.map(cat => {
    if (cat.image?.url) {
      return getPlaiceholder(cat.image.url).then(({ base64, img }) => {
        return {
          image: img,
          blurDataURL: base64
        };
      });
    }

    return {
      image: missingImagePlaceholder,
      blurDataURL: null,
    };
  }));

  return {
    props: {
      catNames,
      fourCats,
      catImages,
      statusCode: 200,
    }
  };
}