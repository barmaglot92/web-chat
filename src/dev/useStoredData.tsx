/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

type ICallback = (val: any) => void;

export function useStoredData<T>(
  key: string,
  defaultValue: T,
): [val: T, setVal: (newVal: T | ICallback) => void] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      try {
        const parsed = JSON.parse(storedValue as string);
        return parsed;
      } catch (err) {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  const updateValue = useCallback(
    (newVal: any) => {
      setValue(newVal);
      localStorage.setItem(key, JSON.stringify(newVal));
    },
    [key],
  );

  return [value, updateValue];
}
