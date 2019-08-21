import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from "../layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const IndexPage = ({ data: { image, articles, article } }) => (
  <Layout>
    <SEO title="Sorry, this post is being tired & lonely." />
    <Menu prefix="/blog" data={articles.edges} selected={article.id} />
    <div style={{ maxWidth: '100%', overflow: 'hidden', marginTop: 20 }}>
      <Img style={{ maxWidth: 500, maxHeight: 500 }} fixed={image.childImageSharp.fixed} />
    </div>
    <i>Sorry, this post is being tired & lonely.</i>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query($slug: String!) {
    image: file(relativePath: { eq: "home-art.png" }) {
      childImageSharp {
        fixed(width: 1000, height: 1000) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
      id
    }
  }
`