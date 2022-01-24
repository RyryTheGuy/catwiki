import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Layout from '../components/layout';
import { getAllBreeds } from '../lib/catAPI';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';

export async function getServerSideProps() {
  const cats = await getAllBreeds();
  const fourCats = chooseFourCats(cats);

  return {
    props: {
      cats,
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

export default function Home({ cats, fourCats }) {
  return (
    <Layout>
      <Head>
        <title>Cat Wiki</title>
      </Head>

      {/* CatWiki Search */}
      <header className={styles.header}>
        <div className={styles.catBg}>
          <div style={{ width: '33%'}}>
            <Image src='/CatWikiLogo.svg' alt='Cat Wiki Logo' height={100} width={300} className={utilStyles.whiteLogo} />
            <h3 style={{ marginBottom: '5rem', fontWeight: 'normal' }}>
              Get to know more about your cat breed
            </h3>
            <div className={styles.catSearch}>
              <input type='search' placeholder='Enter your breed' />
              <i className="fas fa-search" style={{ color: 'black', alignSelf: 'center'}}></i>
            </div>
              {/* todo: add the dropdown with the search results */}
          </div>
        </div>

        <div className={styles.discover}>
          <h4 className={utilStyles.underline} style={{ fontWeight: 'normal' }}>Most Searched Breeds</h4>
          <div className={styles.discoverTitle}>
            <h2 style={{ maxWidth: '30rem'}}>66+ Breeds For you to discover</h2>
            <a style={{ alignSelf: 'flex-end'}}>SEE MORE &#8594;</a>
          </div>
          <div className={styles.catDisplay}>
            {fourCats.map((cat) => (
              /* Todo: make this clickable to go to the cat page */
              <div key={cat.id}>
                {/* Cat Image */}
                <div className={styles.catImage}>
                  <Image  src={cat.image?.url ?? '/kitten-silhouette-2993fc-lg+copy_ForgottenKitten_2.jpg'} alt={cat.name} layout='fill' />
                </div>
                {/* Cat Name */}
                <p style={{ fontWeight: '500'}}>{cat.name}</p>
              </div>
            ))}
          </div>
          <div>

          </div>
        </div>
      </header>
      <Script src="https://kit.fontawesome.com/65fd9b8384.js" crossOrigin="anonymous"></Script>
    </Layout>
  );
}
