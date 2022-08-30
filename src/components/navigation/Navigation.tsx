import { NarutoMainArt } from '../../arts/NarutoMainArt'
import './Navigation.css'

export function Navigation() {
  return (
    <nav class="navigation__wrapper">
      <a href="/" class="navigation__link" aria-label="to home">
        <NarutoMainArt class="navigation__art" />
      </a>
    </nav>
  )
}
