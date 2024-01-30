import Toggle from 'react-toggle';
import { useColorScheme } from '../useColorScheme/UseColorScheme';

export const DarkThemeToggle = () => {
  // Using the useColorScheme hook to get the current color scheme and the function to toggle it
  const { isDark, setIsDark } = useColorScheme();

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
      hidden
    />
  );
}
