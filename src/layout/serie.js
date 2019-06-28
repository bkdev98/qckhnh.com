import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const SerieLayout = ({ data: { tutorials }, pageContext }) => (
  <Layout>
    <SEO
      title={pageContext.title}
      description={pageContext.description}
      thumbnail={pageContext.thumbnail}
    />
    <h3>{pageContext.title}</h3>
    <Menu prefix="/tutorials" data={tutorials ? tutorials.edges : []} />
  </Layout>
)

export default SerieLayout

export const pageQuery = graphql`
  query SeriesQuery($title: String!) {
    tutorials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/tutorials/" }, frontmatter: { serie: { eq: $title } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            tag
            thumbnail
            date(formatString: "DD-MM-YYYY")
          }
          html
          fields {
            slug
          }
        }
      }
    }
  }
`;