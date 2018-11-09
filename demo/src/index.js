import { getText } from '@/utils/helper';
import styles from './index.less';

export default () => {
  return <div className={styles.container}>{getText()}</div>
}
