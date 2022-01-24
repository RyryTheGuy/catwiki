import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

export default function Layout({children}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className={styles.nav}>
        {/* catwiki logo */}
        <Image src="/CatwikiLogo.svg" alt='Cat Wiki Logo' height={50} width={150} />
      </nav>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Image src="/CatwikiLogo.svg" alt='Cat Wiki Logo' height={50} width={150} className={utilStyles.whiteLogo} />
        <p>
          &copy; created by{' '}
          <a>RyryTheGuy</a>
          - devChallenge.io 2022
        </p>
      </footer>
    </div>
  );
}