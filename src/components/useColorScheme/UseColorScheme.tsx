/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useColorScheme() {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );


  const initialColorScheme = localStorage.getItem("colorScheme");
  const [isDark, setIsDark] = useState(
    initialColorScheme === null ? systemPrefersDark : JSON.parse(initialColorScheme)
  );

  useEffect(() => {
    localStorage.setItem("colorScheme", JSON.stringify(isDark));
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleColorScheme = () => {
    setIsDark((prevIsDark: any) => !prevIsDark);
  };


  return {
    isDark,
    setIsDark,
    toggleColorScheme,
  };
}
