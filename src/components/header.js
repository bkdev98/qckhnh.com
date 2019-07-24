import { Link } from "gatsby"
import React from "react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const Header = () => (
  <header>
    <span className="title">
      <Link to="/" style={{ display: 'inline-block' }}>
        q<span style={{ textDecoration: 'line-through' }}>uo</span>c kh<span style={{ textDecoration: 'line-through' }}>a</span>nh
      </Link>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <span style={{ cursor: 'pointer', marginTop: 3 }} onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀' : '☾'}
          </span>
        )}
      </ThemeToggler>
    </span>
    <ul>
      <li><Link partiallyActive={true} to="/now" activeClassName="active">now</Link></li>
      <li><Link partiallyActive={true} to="/tutorials" activeClassName="active">tutorials</Link></li>
      <li><Link partiallyActive={true} to="/blog" activeClassName="active">blog</Link></li>
      <li><Link partiallyActive={true} to="/projects" activeClassName="active">projects</Link></li>
      <li><Link partiallyActive={true} to="/lab" activeClassName="active">lab</Link></li>
      <li><Link partiallyActive={true} to="/tracks" activeClassName="active">tracks</Link></li>
      <li><Link partiallyActive={true} to="/movies" activeClassName="active">movies</Link></li>
      <li><Link partiallyActive={true} to="/about" activeClassName="active">about</Link></li>
      <li><Link partiallyActive={true} to="/contact" activeClassName="active">connect</Link></li>
    </ul>
  </header>
)

export default Header
