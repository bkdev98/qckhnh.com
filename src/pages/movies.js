import React, { useState } from "react"
// import { Link } from 'gatsby'

import Layout from "../layout"
import SEO from "../components/seo"

const data = [
  { title: `Synecdoche, New York`, dir: 'Charlie Kaufman', year: 2008, image: '/assets/synecdoche.jpg' },
  { title: `Lost In Translation`, dir: 'Sofia Coppola', year: 2003, image: '/assets/lost-in-translations.jpg' },
  { title: `A Single Man`, dir: 'Tom Ford', year: 2009, image: '/assets/a-single-man.png' },
  { title: `Melancholia`, dir: 'Lars von Trier', year: 2011, image: '/assets/melancholia.jpg' },
]

const MoviesPage = () => {
  const [selected, setSelected] = useState(-1);
  return (
    <Layout>
      <SEO title="Favourite films" />
      <h3>Favourite films</h3>
      {data.map(({ title, year }, idx) => {
        return (
          <span
            className={idx === selected ? 'link link-active' : 'link'}
            style={{ cursor: 'pointer' }}
            key={title}
            onClick={() => setSelected(idx)}
          >
            {title}
          </span>
        )
      })}
      {data[selected] && (
        <div>
          <img alt={data[selected].title} src={data[selected].image} />
          <i>{data[selected].dir} ({data[selected].year})</i>
        </div>
      )}
      {/* <div style={{ marginTop: 10 }}>
        <Link to='/' className='nav'>← back</Link>
      </div> */}
    </Layout>
  )
}

export default MoviesPage
