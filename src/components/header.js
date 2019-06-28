import { Link } from "gatsby"
import React from "react"

const Header = () => (
  <header>
    <Link to="/" className="title">q<span style={{ textDecoration: 'line-through' }}>uo</span>c kh<span style={{ textDecoration: 'line-through' }}>a</span>nh</Link>
    <ul>
      <li><Link partiallyActive={true} to="/tutorials" activeClassName="active">tutorials</Link></li>
      <li><Link partiallyActive={true} to="/blog" activeClassName="active">blog</Link></li>
      <li><Link partiallyActive={true} to="/projects" activeClassName="active">projects</Link></li>
      <li><Link partiallyActive={true} to="/about" activeClassName="active">about</Link></li>
      <li><Link partiallyActive={true} to="/contact" activeClassName="active">connect</Link></li>
    </ul>
  </header>
)

export default Header
