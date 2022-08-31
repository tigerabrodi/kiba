import { For } from 'solid-js'
import './Movies.css'
import type { MovieWithTrailerImage } from '../../lib/schemas'
import { MovieItem } from './MovieItem'

type MoviesProps = {
  movies: Array<MovieWithTrailerImage>
}

export function Movies(props: MoviesProps) {
  return (
    <section class="movies__section">
      <h2 class="movies__heading">Movies</h2>
      <div class="movies__wrapper">
        <For each={props.movies}>{(movie) => <MovieItem movie={movie} />}</For>
      </div>
    </section>
  )
}
