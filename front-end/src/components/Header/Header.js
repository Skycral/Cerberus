import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.Header}>
      <p className={styles.HeaderTitle}>Cerberus</p>
    </header>
  );
};