import { createSignal } from 'solid-js'
import type { MovieWithTrailerImage } from '../../lib/schemas'
import './MovieItem.css'

type MovieItemProps = {
  movie: MovieWithTrailerImage
}

export function MovieItem(props: MovieItemProps) {
  const [hasImageLoaded, setHasImageLoaded] = createSignal(false)

  function handleOnLoad() {
    setHasImageLoaded(true)
  }

  return (
    <div class="movies__movie-link-wrapper">
      <a
        class="movies__movie-link"
        href={`/${props.movie.id}`}
        aria-label={props.movie.title}
      >
        <div class="movies__movie-graphic">
          <video src={props.movie.trailerUrl} autoplay muted />
          <img
            src={props.movie.imageUrl}
            alt={props.movie.title}
            onLoad={handleOnLoad}
            style={{ height: hasImageLoaded() ? '100%' : '0%' }}
          />

          <div
            class="movies__movie-graphic-placeholder"
            style={{ display: hasImageLoaded() ? 'none' : 'block' }}
          >
            <div />
          </div>
        </div>

        <div class="movies__movie-info">
          <h3 class="movies__movie-info-heading">{props.movie.title}</h3>
          <span class="movies__movie-info-length">{props.movie.length}</span>
        </div>
      </a>
    </div>
  )
}
