import { createSignal, Show } from 'solid-js'
import { BackButton } from '../../icons/BackButton'
import { Backward } from '../../icons/Backward'
import { Forward } from '../../icons/Forward'
import { FullScreen } from '../../icons/FullScreen'
import { MinimizeScreen } from '../../icons/MinimizeScreen'
import { Play } from '../../icons/Play'
import { Stop } from '../../icons/Stop'
import { VolumeEmpty } from '../../icons/VolumeEmpty'
import { VolumeFull } from '../../icons/VolumeFull'
import type { MovieWithMovieImage } from '../../lib/schemas'
import './Movie.css'

type MovieProps = {
  movie: MovieWithMovieImage
}

export function Movie(props: MovieProps) {
  const [isMoviePlaying, setIsMoviePlaying] = createSignal(true)
  const [isMovieMuted, setIsMovieMuted] = createSignal(false)
  const [isFullscreen, setIsFullscreen] = createSignal(false)
  const [currentProgress, setCurrentProgress] = createSignal(0)
  let videoElement: HTMLVideoElement | undefined = undefined

  function togglePauseState() {
    if (videoElement) {
      if (isMoviePlaying()) {
        videoElement.pause()
        setIsMoviePlaying(false)
      } else {
        videoElement.play()
        setIsMoviePlaying(true)
      }
    }
  }

  function toggleVolumeState() {
    if (videoElement) {
      if (isMovieMuted()) {
        videoElement.volume = 1
        setIsMovieMuted(false)
      } else {
        videoElement.volume = 0
        setIsMovieMuted(true)
      }
    }
  }

  function handleSkipBySeconds(secondsToBeSkipped: number) {
    if (videoElement) {
      const newTime = videoElement.currentTime + secondsToBeSkipped
      // Check to not go negative
      videoElement.currentTime = newTime < 0 ? 0 : newTime
    }
  }

  function handleProgressSliderChange(
    event: Event & { currentTarget: HTMLInputElement; target: Element }
  ) {
    const roundedProgress = Math.round(
      Number((event.target as HTMLInputElement).value)
    )

    const percentage = roundedProgress / 100
    if (videoElement) {
      const newTime = percentage * videoElement.duration

      videoElement.currentTime = newTime
      setCurrentProgress(roundedProgress)
    }
  }

  function toggleFullscreen() {
    if (isFullscreen()) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else {
      document.documentElement.requestFullscreen().catch(console.log)
      setIsFullscreen(true)
    }
  }

  return (
    <main class="movie__container">
      <a class="movie__back-link" href="/">
        <BackButton />
      </a>
      <video
        ref={videoElement}
        src={props.movie.movieUrl}
        autoplay
        class="movie__video"
        preload="metadata"
        poster={props.movie.imageUrl}
      />
      <div class="movie__player">
        <div class="movie__slider-wrapper">
          <input
            type="range"
            name="progress"
            min="0"
            max="100"
            step="0.1"
            class="movie__slider"
            onInput={handleProgressSliderChange}
            value={currentProgress()}
          />
          <div
            class="movie__slider-progress"
            style={{
              width: `${currentProgress()}%`,
            }}
          />
        </div>

        <h1 class="movie__player-title">{props.movie.title}</h1>
        <div class="movie__player-buttons">
          <button
            class="movie__player-button"
            onClick={togglePauseState}
            aria-label={isMoviePlaying() ? 'Stop movie' : 'Play movie'}
          >
            <Show when={isMoviePlaying()} fallback={<Play />}>
              <Stop />
            </Show>
          </button>

          <button
            class="movie__player-button"
            aria-label="Go back 10 seconds"
            onClick={() => handleSkipBySeconds(-10)}
          >
            <Backward />
          </button>

          <button
            class="movie__player-button"
            aria-label="Go forward 10 seconds"
            onClick={() => handleSkipBySeconds(10)}
          >
            <Forward />
          </button>

          <button
            class="movie__player-button"
            onClick={toggleVolumeState}
            aria-label={isMovieMuted() ? 'Unmute movie' : 'Mute movie'}
          >
            <Show when={isMovieMuted()} fallback={<VolumeFull />}>
              <VolumeEmpty />
            </Show>
          </button>
        </div>
        <button
          class="movie__player-button movie__player-button-fullscreen"
          onClick={toggleFullscreen}
          aria-label={isFullscreen() ? 'Minimize screen' : 'Fullscreen'}
        >
          <Show when={isFullscreen()} fallback={<FullScreen />}>
            <MinimizeScreen />
          </Show>
        </button>
      </div>
    </main>
  )
}
