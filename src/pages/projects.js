import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const ProjectsPage = ({ data: { projects } }) => (
  <Layout>
    <SEO title="Projects" />
    <Menu prefix="/projects" data={projects.edges} />
  </Layout>
)

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectQuery {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
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