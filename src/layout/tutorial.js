import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import "./style.css"

const TutorialLayout = ({ data: { tutorials, article, prev, next, serie, sameSerie } }) => (
  <Layout>
    <SEO
      title={article.frontmatter.title}
      description={article.frontmatter.description}
      thumbnail={article.frontmatter.thumbnail}
    />
    <Menu prefix="/tutorials" data={tutorials.edges} selected={article.id} />
    <article>
      {article.frontmatter.thumbnail && <img alt={article.frontmatter.title} src={article.frontmatter.thumbnail} />}
      <div className="meta">
        <h1>{article.frontmatter.title}</h1>
        <i>Published on {article.frontmatter.date} {serie && <>, in <Link to={'/series' + serie.fields.slug}>{article.frontmatter.serie}</Link></>}</i>
      </div>
      <div className="html-content" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
    {serie && (
      <div style={{ marginBottom: 20 }}>
        <i>This tutorial belongs to serie <Link to={'/series' + serie.fields.slug}>{article.frontmatter.serie}</Link>:</i>
        <Menu prefix="/tutorials" data={sameSerie ? sameSerie.edges : []} />
      </div>
    )}
    {prev && <Link className="nav" to={'/tutorials' + prev.fields.slug}>← previous</Link>}
    {next && <Link className="nav" to={'/tutorials' + next.fields.slug}>next →</Link>}
  </Layout>
)

export default TutorialLayout

export const artice = graphql`
  query($slug: String!, $prev: String, $next: String, $serie: String) {
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
    serie: markdownRemark(frontmatter: { title: { eq: $serie } }) {
      fields {
        slug
      }
    }
    sameSerie: allMarkdownRemark(
      filter: { frontmatter: { serie: { eq: $serie } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
          }
        }
      }
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        description
        thumbnail
        serie
        date(formatString: "DD-MM-YYYY")
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