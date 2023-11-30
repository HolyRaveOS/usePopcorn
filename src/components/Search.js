import { useRef } from 'react'
import { useKey } from '../useKey'
export default function Search({ query, setQuery }) {
  const inputEL = useRef(null)

  useKey('Enter', () => {
    if (document.activeElement === inputEL.current) return
    inputEL.current.focus()
    setQuery('')
  })

  return (
    <input
      ref={inputEL}
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
