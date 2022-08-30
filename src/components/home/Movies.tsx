import { For } from 'solid-js'
import './Movies.css'
import type { MovieWithTrailerImage } from '../../lib/schemas'

type MoviesProps = {
  movies: Array<MovieWithTrailerImage>
}

export function Movies(props: MoviesProps) {
  return (
    <section class="movies__section">
      <h2 class="movies__heading">Movies</h2>
      <div class="movies__wrapper">
        <For each={props.movies}>
          {(movie) => (
            <a class="movies__movie-link" href={`/${movie.id}`}>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                class="movies__movie-image"
              />
            </a>
          )}
        </For>
      </div>
    </section>
  )
}
