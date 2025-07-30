import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string, initialValue: string) {
  const [state, setState] = useState(() => {
    try {
      return (localStorage.getItem(key) as string) || initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('searchInput', state);
    } catch (error) {
      console.error('Error writing to local storage' + error);
    }
  }, [state]);
  return [state, setState] as const;
}
