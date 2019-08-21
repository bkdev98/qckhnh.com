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
    {/* <blockquote>
      A few times in my life I’ve had moments of absolute clarity. When for a few brief seconds the silence drowns out the noise and I can feel rather than think, and things seem so sharp and the world seems so fresh. It’s as though it had all just come into existence. I can never make these moments last. I cling to them, but like everything, they fade. I have lived my life on these moments. They pull me back to the present, and I realize that everything is exactly the way it was meant to be.
    </blockquote> */}
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