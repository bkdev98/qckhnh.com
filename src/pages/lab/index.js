import React from "react"
import { Link } from 'gatsby'

import Layout from "../../layout"
import SEO from "../../components/seo"

const data = [
  { title: `Demo AbortController`, url: '/lab/demo-abort-controller' },
]

export const LabHeader = () => (
  <>
    <SEO title="Lab" />
    <h3>Phòng thí nghiệm</h3>
    <p>Giải quyết vấn đề thực tế bằng những thí nghiệm chim chuột.</p>
    {data.map(({ title, url }) => {
      return (
        <Link className='link' activeClassName='link-active' key={title} to={url}>
          {title}
        </Link>
      )
    })}
  </>
)

const LabPage = () => {
  return (
    <Layout>
      <LabHeader />
    </Layout>
  )
}

export default LabPage
