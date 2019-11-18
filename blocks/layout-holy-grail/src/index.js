import React from 'react';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.wrapper}>
      <header>INSERT_BLOCK_PLACEHOLDER:HEADER</header>
      <div className={styles.body}>
        <main>INSERT_BLOCK_PLACEHOLDER:CONTENT</main>
        <nav>INSERT_BLOCK_PLACEHOLDER:NAV</nav>
        <aside>INSERT_BLOCK_PLACEHOLDER:ASIDE</aside>
      </div>
      <footer>INSERT_BLOCK_PLACEHOLDER:FOOTER</footer>
    </div>
  );
}
