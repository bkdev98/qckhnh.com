import React, { useState, useEffect } from "react"
import axios from "axios"
// import { Link } from 'gatsby'

import Layout from "../layout"
import SEO from "../components/seo"

const API_URL = "https://kqp-service.herokuapp.com"

const TracksPage = () => {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios.get(`${API_URL}`);
      setLoading(false)
      if (result.status === 200) {
        setTracks(result.data.tracks)
      } else {
        setError(true)
      }
    }
    fetchData();
  }, [])

  return (
    <Layout>
      <SEO title="Tracks" />
      <h3>Recent music history</h3>
      {loading && <i>Crunching latest data...</i>}
      {tracks.length > 0 && tracks.map(({ key, title, artist, timestamp, link }) => {
        // const thumb = thumbs.alt ? thumbs.alt : thumbs.yt;
        if (timestamp.nowplaying) {
          return (
            <a
              rel='noopener noreferrer'
              style={{ marginRight: 20, textDecoration: 'none' }}
              className='link-active'
              target='__blank'
              href={link}
              key={key}
            >
              {title} ({artist})
            </a>
          )
        }
        return (
          <a
            rel='noopener noreferrer'
            style={{ marginRight: 20, fontStyle: 'italic', textDecoration: 'none' }}
            target='__blank'
            href={link}
            key={key}
          >
            {title} ({artist})
          </a>
        )
      })}
      {error && <p>Cannot get tracks data now.</p>}
      {/* <div style={{ marginTop: 10 }}>
        <Link to='/' className='nav'>← back</Link>
      </div> */}
    </Layout>
  )
}

export default TracksPage
