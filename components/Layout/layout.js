import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';
import utilStyles from '../../styles/utils.module.css';

export default function Layout({children}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className={styles.nav}>
        {/* catwiki logo */}
        <Link href='/'>
          <a>
            <Image src="/CatwikiLogo.svg" alt='Cat Wiki Logo' height={50} width={150} />
          </a>
        </Link>
      </nav>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Image src="/CatwikiLogo.svg" alt='Cat Wiki Logo' height={50} width={150} className={utilStyles.whiteLogo} />
        <p>
          &copy; created by{' '}
          <a target='_blank' href='https://github.com/RyryTheGuy' rel="noreferrer noopener">RyryTheGuy</a>
          - devChallenge.io 2022
        </p>
      </footer>
    </div>
  );
}