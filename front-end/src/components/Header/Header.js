import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.LogoSlogan}>
      <img src='images/logo.png'className={styles.HeaderTitle} />
      <p className={styles.Byline}>– När du bara vill bort</p>
      </div>
      <nav className={styles.MainNav}>
      </nav>
    </header>
  );
};