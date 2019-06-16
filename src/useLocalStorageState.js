import { useState } from "react";

export const useLocalStorageState = (key, initialValue, parse, serialize) => {
  const [value, setValue] = useState(
    parse(window.localStorage.getItem(key)) || initialValue
  );

  const setLocalStorageValue = _value => {
    window.localStorage.setItem(key, serialize(_value));
    setValue(_value);
  };
  return [value, setLocalStorageValue];
};
