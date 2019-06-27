import { Link } from "gatsby"
import React from "react"

const Header = () => (
  <header>
    <Link to="/" className="title">q<span style={{ textDecoration: 'line-through' }}>uo</span>c kh<span style={{ textDecoration: 'line-through' }}>a</span>nh</Link>
    <ul>
      <li><Link to="/tutorials" activeClassName="active">tutorials</Link></li>
      <li><Link to="/blog" activeClassName="active">blog</Link></li>
      <li><Link to="/projects" activeClassName="active">projects</Link></li>
      <li><Link to="/about" activeClassName="active">about</Link></li>
      <li><Link to="/contact" activeClassName="active">contact</Link></li>
    </ul>
  </header>
)

export default Header
