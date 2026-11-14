import { useEffect, useState } from "react";

// State'i tarayıcının LocalStorage'ında saklayan basit bir hook.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // LocalStorage kullanılamıyorsa uygulama yine de çalışmaya devam eder.
    }
  }, [key, value]);

  return [value, setValue];
}
