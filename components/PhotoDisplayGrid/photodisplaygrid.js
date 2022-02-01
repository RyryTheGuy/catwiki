import styles from './photodisplaygrid.module.css';
import Image from 'next/image';

export function PhotoDisplayGrid({ images }) {
  switch (images.length) {
    case 1:
    case 2:
    case 3:
    case 4:
      return (
        <div className={styles['four-photos']}>
          {images.map(image => (
            <div key={image.id} className={styles['photos__image-container']}>
              <Image src={image.url} alt="Image" layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      );
    case 5:
    case 6:
      return (
        <div className={styles['six-photos']}>
          {images.map(image => (
            <div key={image.id} className={styles['photos__image-container']}>
              <Image src={image.url} alt="Image" layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      );
    case 7:
    case 8:
    default:
      return (
        <div className={styles['eight-photos']}>
          {images.map(image => (
            <div key={image.id} className={styles['photos__image-container']}>
              <Image src={image.url} alt="Image" layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      );
    }
}