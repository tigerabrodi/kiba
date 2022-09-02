import { createSignal, Show } from 'solid-js'
import { MuteTrailer } from '../../icons/MuteTrailer'
import { Play } from '../../icons/Play'
import { Replay } from '../../icons/Replay'
import { SoundTrailer } from '../../icons/SoundTrailer'
import type { MovieWithTrailerImage } from '../../lib/schemas'
import './Trailer.css'

type TrailerProps = {
  movie: MovieWithTrailerImage
}

export function Trailer(props: TrailerProps) {
  const [shouldShowImage, setShouldShowImage] = createSignal(false)
  const [videoVolume, setVideoVolume] = createSignal(1)

  let trailerVideoElement: HTMLVideoElement | undefined

  function handleTrailerEnd() {
    setShouldShowImage(true)
  }

  function handleVideoVolumeChange() {
    if (trailerVideoElement) {
      const isTrailerMuted = trailerVideoElement?.volume === 0
      if (isTrailerMuted) {
        trailerVideoElement.volume = 1
        setVideoVolume(1)
      } else {
        trailerVideoElement.volume = 0
        setVideoVolume(0)
      }
    }
  }

  function onReplay() {
    if (trailerVideoElement) {
      setShouldShowImage(false)
      setVideoVolume(1)
      trailerVideoElement.currentTime = 0
    }
  }

  return (
    <div class="trailer__wrapper">
      <Show
        when={shouldShowImage()}
        fallback={
          <video
            ref={trailerVideoElement}
            autoplay
            src={props.movie.trailerUrl}
            class="trailer__graphic"
            onEnded={handleTrailerEnd}
            preload="metadata"
            poster={props.movie.imageUrl}
          />
        }
      >
        <img
          src={props.movie.imageUrl}
          alt={props.movie.title}
          class="trailer__graphic"
        />
      </Show>
      <div class="trailer__overlay" />
      <div class="trailer__info-wrapper">
        <h1 class="trailer__info-title">{props.movie.title}</h1>
        <p class="trailer__info-description">{props.movie.description}</p>
        <a class="trailer__info-link" href={`/${props.movie.id}`}>
          <Play />
          Play
        </a>
      </div>

      <div class="trailer__tag">
        <Show when={shouldShowImage()}>
          <button
            aria-label="Replay trailer"
            class="trailer__tag-button"
            onClick={onReplay}
          >
            <Replay />
          </button>
        </Show>

        <Show when={!shouldShowImage()}>
          <button
            aria-label={
              videoVolume() === 0
                ? 'Play sound of trailer'
                : 'Mute sound of trailer'
            }
            class="trailer__tag-button"
            onClick={handleVideoVolumeChange}
          >
            <Show when={videoVolume() === 0} fallback={<SoundTrailer />}>
              <MuteTrailer />
            </Show>
          </button>
        </Show>

        <div class="trailer__tag-age">
          <span class="trailer__tag-age-text">12</span>
        </div>
      </div>
    </div>
  )
}
