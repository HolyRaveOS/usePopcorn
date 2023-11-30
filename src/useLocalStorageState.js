import { useState, useEffect } from 'react'
export function useLocalStorageState(initialSate, key) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key))
    return storedValue ? storedValue : initialSate
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
