import { getText } from '@/utils';
import styles from './index.less';

export default () => {
  return <div className={styles.container}>{getText()}</div>
}
