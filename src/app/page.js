import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button type="button">HELLO WORLD!</button>
      </div>
    </main>
  );
}
