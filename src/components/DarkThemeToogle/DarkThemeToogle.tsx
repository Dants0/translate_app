import Toggle from 'react-toggle';
import { useColorScheme } from '../useColorScheme/UseColorScheme';

import styles from './styles.module.scss'

export const DarkThemeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: <span className={styles.icons}>🌙</span>, unchecked: <span  className={styles.icons}>🔆</span> }}
      aria-label="Dark mode toggle"
      hidden
    />
  );
}
