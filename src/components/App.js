import { useState } from 'react'
import NavBar from './NavBar'
import Main from './Main'
import NumResults from './NumResults'
import Search from './Search'
import Box from './Box'
import MovieList from './MovieList'
import WatchedSummary from './WatchedSummary'
import WatchedMovieList from './WatchedMovieList'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import MovieDetails from './MovieDetails'
import { useMovies } from '../useMovies'
import { useLocalStorageState } from '../useLocalStorageState'

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [query, setQuery] = useState('')
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)
  const [watched, setWatched] = useLocalStorageState([], 'watched')
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])
    handleCloseMovie()
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
