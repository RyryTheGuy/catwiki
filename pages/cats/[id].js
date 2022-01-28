import Layout from "../../components/Layout/layout";
import Image from "next/image";
import styles from './[id].module.css';
import utilStyles from '../../styles/utils.module.css';
import { get8BreedImages, getSpecificCatInfo } from "../../lib/catAPI";
import { Statbar } from "../../components/StatBar/statbar";

export async function getServerSideProps({ params }) {
  const [cat, images] = await Promise.allSettled([getSpecificCatInfo(params.id), get8BreedImages(params.id)]);

  if (cat.status === 'fulfilled' && images.status === 'fulfilled') {
    return {
      props: {
        cat: cat.value,
        images: images.value,
      }
    };
  }

  throw new Error('Unable to get information to load the page');
}

export default function Cat({ cat, images }) {
  console.log(cat, images);

  return (
    <Layout>
      {/* Cat Info */}
      <section className={styles['cat-information']}>
        {/* Cat Image */}
        <div className={styles['cat-image']}>
          <div className={styles['cat-image__container']}>
            <Image src={cat.image.url ?? '/kitten-silhouette-2993fc-lg+copy_ForgottenKitten_2.jpg'} alt={`${cat.name}`} layout="fill" objectFit="cover" />
          </div>
        </div>

        {/* Cat Stats */}
        <div className={styles['cat-stats']}>
          <h2 className={styles['cat-stats__name']}>{cat.name}</h2>
          <p className={styles['cat-stats__text']}>{cat.description}</p>
          <p className={styles['cat-stats__text']}>
            <span className={utilStyles.bold}>Temperament: </span>{cat.temperament}
          </p>
          <p className={styles['cat-stats__text']}>
            <span className={utilStyles.bold}>Origin: </span>{cat.origin}
          </p>
          <p className={styles['cat-stats__text']}>
            <span className={utilStyles.bold}>Life Span: </span>{cat.life_span} years
          </p>
          <div className={styles['cat-stats__bars']}>
            Adaptability: <Statbar level={cat.adaptability} />
          </div>
          <div className={styles['cat-stats__bars']}>
            Affection level: <Statbar level={cat.affection_level} />
          </div>
          <div className={styles['cat-stats__bars']}>
            Child Friendly: <Statbar level={cat.child_friendly}/>
          </div>
          <div className={styles['cat-stats__bars']}>
            Grooming: <Statbar level={cat.grooming} />
          </div>
          <div className={styles['cat-stats__bars']}>
            Intelligence: <Statbar level={cat.intelligence} />
          </div>
          <div className={styles['cat-stats__bars']}>
            Health issues: <Statbar level={cat.health_issues} />
          </div>
          <div className={styles['cat-stats__bars']}>
            Social needs: <Statbar level={cat.social_needs} />
          </div>
          <div className={styles['cat-stats__bars']}>
            Stranger friendly: <Statbar level={cat.stranger_friendly} />
          </div>
        </div>
      </section>

      {/* Other Photos */}
      <section className={styles['other-photos']}>
        <h2 className={styles['other-photos__title']}>Other photos</h2>
        <div className={styles['photos']}>
          {images.map(image => (
            <div key={image.id} className={styles['photos__image-container']}>
              <Image src={image.url} alt="Image" layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}