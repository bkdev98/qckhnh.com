import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const BlogPage = ({ data: { articles } }) => (
  <Layout>
    <SEO title="Blog" />
    <Menu style={{ marginTop: 30 }} prefix="/blog" data={articles.edges} />
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/articles/" } }
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