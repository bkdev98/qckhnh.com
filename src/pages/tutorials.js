import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const TutorialsPage = ({ data: { tutorials } }) => (
  <Layout>
    <SEO title="Tutorials" />
    <Menu prefix="/tutorials" data={tutorials.edges} />
  </Layout>
)

export default TutorialsPage

export const pageQuery = graphql`
  query TutorialsQuery {
    tutorials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/tutorials/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`