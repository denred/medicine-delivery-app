export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): {
  setItem: (value: T) => void;
  getItem: () => T;
  removeItem: () => void;
} => {
  const getItem = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  };

  const setItem = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = (): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { setItem, getItem, removeItem };
};
