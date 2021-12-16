import { useState, useEffect } from 'react';
const useLocalStorage = (
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
) => {
  const [state, setState] = useState(() => {
    return deserialize(localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => localStorage.setItem(key, serialize(state)), [key, state]);
  return [state, setState];
};
export default useLocalStorage;
