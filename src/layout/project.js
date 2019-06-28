import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import "./style.css"

const ProjectLayout = ({ data: { projects, project, prev, next } }) => (
  <Layout>
    <SEO
      title={project.frontmatter.title}
      description={project.frontmatter.description}
      thumbnail={project.frontmatter.thumbnail}
    />
    <Menu prefix="/projects" data={projects.edges} />
    <article>
      {project.frontmatter.thumbnail && <img alt={project.frontmatter.title} src={project.frontmatter.thumbnail} />}
      <span style={{ marginRight: 20 }}>{project.frontmatter.title}</span>
      <span style={{ marginRight: 20 }}>{project.frontmatter.date}</span>
      <span>{project.frontmatter.description}</span>
      <div className="html-content" dangerouslySetInnerHTML={{ __html: project.html }} />
    </article>
    {prev && <Link className="nav" to={'/projects' + prev.fields.slug}>previous</Link>}
    {next && <Link className="nav" to={'/projects' + next.fields.slug}>next</Link>}
  </Layout>
)

export default ProjectLayout

export const project = graphql`
  query($slug: String!, $prev: String, $next: String) {
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
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        thumbnail
        date(formatString: "MM-YYYY")
      }
    }
    prev: markdownRemark(fields: { slug: { eq: $prev } }) {
      fields {
        slug
      }
    }
    next: markdownRemark(fields: { slug: { eq: $next } }) {
      fields {
        slug
      }
    }
  }
`