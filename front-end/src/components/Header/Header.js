import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.Header}>

      <div className={styles.LogoSlogan}>
      <h1 className={styles.HeaderTitle}>Semesterkollen</h1>
      <p className={styles.Byline}>Var åker vi?</p>
      </div>
      <nav className={styles.MainNav}>
        <a href="#">Om appen</a>
      </nav>
    </header>
  );
};