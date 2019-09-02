import { Link } from "gatsby"
import React, { useState } from "react"
// import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Lottie from 'react-lottie'

// import welcomeAnimation from '../assets/animations/welcome.json'
// import sparkleAnimation from '../assets/animations/sparkle.json'
// import tracksAnimation from '../assets/animations/tracks.json'
// import moviesAnimation from '../assets/animations/movies.json'
// import hurraaaAnimation from '../assets/animations/hurraaa.json'

const Header = () => {
  const [
    count,
    // setCount,
  ] = useState(0);
  const [animationData, setAnimationData] = useState(null);

  return (
    <header>
      <span className="title noselect">
        <Link to="/" style={{ display: 'inline-block' }}>
          q<span style={{ textDecoration: 'line-through' }}>uo</span>c kh<span style={{ textDecoration: 'line-through' }}>a</span>nh
        </Link>
        {/* <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <span
              style={{ cursor: 'pointer', marginTop: 3 }}
              onClick={() => {
                toggleTheme(theme === 'dark' ? 'light' : 'dark');
                setCount(count + 1)
                if (count === 4) {
                  setAnimationData(sparkleAnimation)
                } else if (count === 9) {
                  setAnimationData(tracksAnimation)
                } else if (count === 24) {
                  setAnimationData(moviesAnimation)
                } else if (count === 49) {
                  setAnimationData(hurraaaAnimation)
                }
              }}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </span>
          )}
        </ThemeToggler> */}
      </span>
      <ul>
        {count > -1  && <li><Link partiallyActive={true} to="/now" activeClassName="active">now</Link></li>}
        <li><Link partiallyActive={true} to="/tutorials" activeClassName="active">tutorials</Link></li>
        <li><Link partiallyActive={true} to="/blog" activeClassName="active">blog</Link></li>
        <li><Link partiallyActive={true} to="/projects" activeClassName="active">projects</Link></li>
        <li><Link partiallyActive={true} to="/lab" activeClassName="active">lab</Link></li>
        {count > 9 && <li><Link partiallyActive={true} to="/tracks" activeClassName="active">tracks</Link></li>}
        {count > 24 && <li><Link partiallyActive={true} to="/movies" activeClassName="active">movies</Link></li>}
        <li><Link partiallyActive={true} to="/about" activeClassName="active">about</Link></li>
        <li><Link partiallyActive={true} to="/contact" activeClassName="active">connect</Link></li>
      </ul>
      {animationData && <div className="animation-wrapper">
        <Lottie
          options={{ loop: false, autoplay: true, animationData }}
          isClickToPauseDisabled
          eventListeners={[{
            eventName: 'complete',
            callback: () => setAnimationData(null),
          }]}
        />
      </div>}
    </header>
  );
}

export default Header
