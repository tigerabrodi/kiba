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
            <div class="movies__movie-link-wrapper">
              <a
                class="movies__movie-link"
                href={`/${movie.id}`}
                aria-label={movie.title}
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  class="movies__movie-image"
                />

                <div class="movies__movie-info">
                  <h3 class="movies__movie-info-heading">{movie.title}</h3>
                  <span class="movies__movie-info-length">{movie.length}</span>
                </div>
              </a>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
