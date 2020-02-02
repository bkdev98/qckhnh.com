import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import "./style.css"

const BlogLayout = ({ data: { articles, article, prev, next, thumbnail } }) => (
  <Layout>
    <SEO
      title={article.frontmatter.title}
      description={article.frontmatter.description}
      thumbnail={article.frontmatter.thumbnail}
    />
    <Menu prefix="/blog" data={articles.edges} selected={article.id} />
    <article>
      {article.frontmatter.thumbnail && <Img fluid={thumbnail.childImageSharp.fluid} />}
      <div className="meta">
        <h1 className="blog-title">{article.frontmatter.title}</h1>
        <i>Published on {article.frontmatter.date}</i>
      </div>
      <div className="html-content" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
    {prev && <Link className="nav" to={'/blog' + prev.fields.slug}>← previous</Link>}
    {next && <Link className="nav" to={'/blog' + next.fields.slug}>next →</Link>}
  </Layout>
)

export default BlogLayout

export const artice = graphql`
  query($slug: String!, $prev: String, $next: String, $thumbnail: String) {
    thumbnail: file(relativePath: { eq: $thumbnail }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
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
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        description
        thumbnail
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