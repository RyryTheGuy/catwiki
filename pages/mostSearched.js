import Error from "next/error";
import Image from "next/image";
import Layout from "../components/Layout/layout";
import styles from '../styles/MostSearched.module.css';
import { getAllBreeds } from "../lib/catAPI";
import Head from "next/head";

export async function getServerSideProps() {
  const response = await getAllBreeds();
  const cats = await response.json();

  if (response.status !== 200) 
    return { props: { statusCode: response.status }};

  const topTenCats = chooseTenCats(cats);

  return { props: { cats: topTenCats, statusCode: 200 }};
  
}

const chooseTenCats = (cats) => {
  const max = cats.length;
  const indexOfChosenCats = [];

  for (let i = 0; i < 10; i++) {
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
    cats[indexOfChosenCats[4]],
    cats[indexOfChosenCats[5]],
    cats[indexOfChosenCats[6]],
    cats[indexOfChosenCats[7]],
    cats[indexOfChosenCats[8]],
    cats[indexOfChosenCats[9]],
  ];
};

export default function MostSearched({ cats, statusCode }) {
  if (statusCode !== 200) return <Error statusCode={statusCode} />;

  return (
    <Layout>
      <Head>
        <title>Cat Wiki | Most Searched</title>
      </Head>

      <h2 className={styles.title}>Top 10 most searched breeds</h2>
      <section className={styles['cat-list']}>
        {cats.map((cat, index) => {
          return (
            <div key={cat.id} className={styles['cat-list-item']}>
              <div className={styles['cat-list-item__image']}>
                <Image src={cat.image?.url ?? '/kitten-silhouette-2993fc-lg+copy_ForgottenKitten_2.jpg'} alt={`${cat.name} image`} layout="fill" objectFit="cover" />
              </div>

              <div className={styles['cat-list-item__text']}>
                <h3>{index + 1}. {cat.name}</h3>
                <p>{cat.description}</p>
              </div>
            </div>
          );
        })}
      </section>
    </Layout>
  );
}