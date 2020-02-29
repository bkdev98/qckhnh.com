import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from "../layout"
import SEO from "../components/seo"

const IndexPage = ({ data: { file } }) => (
  <Layout>
    <SEO title="Home" />
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Img style={{ maxWidth: 500, maxHeight: 500 }} fixed={file.childImageSharp.fixed} />
    </div>
    <blockquote>
      tạm đóng cửa để bảo trì người viết
    </blockquote>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    file(relativePath: { eq: "home-art.png" }) {
      childImageSharp {
        fixed(width: 1000, height: 1000) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
        }
      }
    }
  }
`