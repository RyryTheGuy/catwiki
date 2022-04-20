import Layout from "../../components/Layout/layout";
import Image from "next/image";
import Error from "next/error";
import styles from './[id].module.css';
import utilStyles from '../../styles/utils.module.css';
import { get8BreedImages, getSpecificCatInfo } from "../../lib/catAPI";
import { Statbar } from "../../components/StatBar/statbar";
import Head from "next/head";
import { PhotoDisplayGrid } from "../../components/PhotoDisplayGrid/photodisplaygrid";
import { getPlaiceholder } from "plaiceholder";
import missingCatPhoto from '../../public/kitten-silhouette-2993fc-lg+copy_ForgottenKitten_2.jpg';

export default function Cat({ cat, images, statusCode }) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout>
      <Head>
        <title>Cat Wiki | {cat.name}</title>
      </Head>
      {/* Cat Info */}
      <section className={styles['cat-information']}>
        {/* Cat Image */}
        <div className={styles['cat-image']}>
          <div className={styles['cat-image__container']}>
            <Image src={cat.image?.url ?? missingCatPhoto} alt={`${cat.name}`} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={cat.blurDataURL} />
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
            <p>Adaptability: </p> <Statbar level={cat.adaptability} />
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Affection level: </p> <Statbar level={cat.affection_level} />
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Child Friendly: </p> <Statbar level={cat.child_friendly}/>
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Grooming: </p> <Statbar level={cat.grooming} />
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Intelligence: </p> <Statbar level={cat.intelligence} />
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Health issues: </p> <Statbar level={cat.health_issues} />
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Social needs: </p> <Statbar level={cat.social_needs} />
          </div>
          <div className={styles['cat-stats__bars']}>
            <p>Stranger friendly: </p> <Statbar level={cat.stranger_friendly} />
          </div>
        </div>
      </section>

      {/* Other Photos */}
      <section className={styles['other-photos']}>
        <h2 className={styles['other-photos__title']}>Other photos</h2>
        <PhotoDisplayGrid images={images} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const [cat, images] = await Promise.allSettled([getSpecificCatInfo(params.id), get8BreedImages(params.id)]);

  if (cat.status === 'fulfilled' && images.status === 'fulfilled') {
    const imagesWithBlur = await Promise.all(images.value.map( async (image) => {
      const { base64, img } = await getPlaiceholder(image.url);
      return {
        id: image.id,
        image: img,
        blurDataURL: base64
      };
    }));

    return {
      props: {
        cat: cat.value,
        images: imagesWithBlur,
        statusCode: 200,
      }
    };
  }

  return { props: { statusCode: 503 }};
}