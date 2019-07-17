import React, { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"

import Layout from "../layout"
import SEO from "../components/seo"

const API_URL = "https://kqp-service.herokuapp.com"

const Timestamp = ({ time }) => {
  const hours = moment.utc(time * 1000).format('H');
  const minutes = moment.utc(time * 1000).format('mm');
  const seconds = moment.utc(time * 1000).format('ss');
  return (
    <i style={{ marginRight: 20 }}>
      {hours !== '0' && `${hours} hours `}
      {minutes !== '00' && `${minutes} minutes `}
      {(seconds !== '00' && hours === '0') && `${seconds} seconds `}
    </i>
  );
};

const data = [
  {
    time: 'July 17, 2019',
    text: `Working remotely 🏝. A bit busy with both side and client projects, 4 at a time 🤷🏻‍. I have a crush on someone, and this feeling is wonderful, as it once was.`,
  }, {
    time: 'Jun 28, 2019',
    text: `I got depressed more often, can't write much. But I can still work on a new project. This project is gonna be a big one, an updated version of the offline POS I developed last year. I will finish it, no matter what happens.`,
  },
]

const NowPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios.get(`${API_URL}`);
      setLoading(false)
      if (result.status === 200) {
        setCategories(result.data.categories)
      } else {
        setError(true)
      }
    }
    fetchData();
  }, [])

  return (
    <Layout>
      <SEO title="Now" />
      <h3>What I'm doing now</h3>
      <i>Last updated {data[0].time}.</i>
      <p>{data[0].text}</p>
      <br />
      <h3>Today tasks</h3>
      {loading && <i>Crunching latest data...</i>}
      {categories.length > 0 && categories.map((data, idx) => {
        return (
          <span key={data.category}>
            <i
              onClick={() => setSelected(idx)}
              className={idx === selected ? 'link link-active' : 'link'}
              style={{ cursor: 'pointer', marginRight: idx === selected ? '5px' : '20px' }}
            >
              {data.category}
            </i>
            {idx === selected && <Timestamp time={data.time} />}
          </span>
        )
      })}
      {error && <p>Cannot get activities data now.</p>}
      {categories.length > 0 && selected >= 0 && (
        <div>
          <br />
          {categories[selected].activities.map(item => <i key={item} style={{ marginRight: 20 }}>{item}</i>)}
        </div>
      )}
    </Layout>
  )
}

export default NowPage
