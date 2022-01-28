import styles from './statbar.module.css';

export function Statbar({ level }) {
  switch (level) {
    case 0:
      return (
        <div className={styles['stat-bar']}>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
        </div>
      );
    case 1:
      return (
        <div className={styles['stat-bar']}>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
        </div>
      );
    case 2:
      return (
        <div className={styles['stat-bar']}>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
        </div>
      );
    case 3:
      return (
        <div className={styles['stat-bar']}>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
        </div>
      );
    case 4:
      return (
        <div className={styles['stat-bar']}>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--unfilled']}></span>
        </div>
      );
    case 5:
      return (
        <div className={styles['stat-bar']}>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
          <span className={styles['stat-bar__cell--filled']}></span>
        </div>
      );
    default:
      return null;
  }
}