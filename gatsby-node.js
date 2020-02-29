const { createFilePath } = require('gatsby-source-filesystem');

const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

function getThumbnailRelativePath(thumbnail) {
  if (typeof thumbnail === 'string') {
    return path.basename(thumbnail);
  }
  return null;
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve) => {
    graphql(`
      {
        articles: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/articles/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                thumbnail
              }
            }
          }
        }
        projects: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/projects/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                thumbnail
              }
            }
          }
        }
        tutorials: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/tutorials/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                thumbnail
                serie
              }
            }
          }
        }
        series: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/series/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
                thumbnail
              }
            }
          }
        }
      }
    `).then(result => {
      // const { articles, tutorials, series, projects } = result.data;
      // articles.edges.forEach(({ node }, index) => {
      //   const prev = index === 0 ? null : articles.edges[index - 1].node.fields.slug
      //   const next = index === articles.edges.length - 1 ? null : articles.edges[index + 1].node.fields.slug
      //   createPage({
      //     path: '/blog' + node.fields.slug,
      //     component: path.resolve('./src/layout/blog.js'),
      //     context: {
      //       slug: node.fields.slug,
      //       thumbnail: getThumbnailRelativePath(node.frontmatter.thumbnail),
      //       prev,
      //       next,
      //     },
      //   });
      //   createPage({
      //     path: node.fields.slug,
      //     component: path.resolve('./src/layout/blog.js'),
      //     context: {
      //       slug: node.fields.slug,
      //       thumbnail: getThumbnailRelativePath(node.frontmatter.thumbnail),
      //       prev,
      //       next,
      //     },
      //   });
      // });
      // projects.edges.forEach(({ node }, index) => {
      //   const prev = index === 0 ? null : projects.edges[index - 1].node.fields.slug
      //   const next = index === projects.edges.length - 1 ? null : projects.edges[index + 1].node.fields.slug
      //   createPage({
      //     path: '/projects' + node.fields.slug,
      //     component: path.resolve('./src/layout/project.js'),
      //     context: {
      //       slug: node.fields.slug,
      //       thumbnail: getThumbnailRelativePath(node.frontmatter.thumbnail),
      //       prev,
      //       next,
      //     },
      //   });
      // });
      // tutorials.edges.forEach(({ node }, index) => {
      //   const prev = index === 0 ? null : tutorials.edges[index - 1].node.fields.slug
      //   const next = index === tutorials.edges.length - 1 ? null : tutorials.edges[index + 1].node.fields.slug
      //   createPage({
      //     path: '/tutorials' + node.fields.slug,
      //     component: path.resolve('./src/layout/tutorial.js'),
      //     context: {
      //       slug: node.fields.slug,
      //       serie: node.frontmatter.serie || 'no-serie',
      //       thumbnail: getThumbnailRelativePath(node.frontmatter.thumbnail),
      //       prev,
      //       next,
      //     },
      //   });
      //   createPage({
      //     path: node.fields.slug,
      //     component: path.resolve('./src/layout/tutorial.js'),
      //     context: {
      //       slug: node.fields.slug,
      //       serie: node.frontmatter.serie || 'no-serie',
      //       thumbnail: getThumbnailRelativePath(node.frontmatter.thumbnail),
      //       prev,
      //       next,
      //     },
      //   });
      // });
      // series.edges.forEach(({ node }) => {
      //   createPage({
      //     path: '/series' + node.fields.slug,
      //     component: path.resolve('./src/layout/serie.js'),
      //     context: {
      //       slug: node.fields.slug,
      //       title: node.frontmatter.title,
      //       description: node.frontmatter.description,
      //       thumbnail: getThumbnailRelativePath(node.frontmatter.thumbnail),
      //     },
      //   });
      // });
      resolve();
    });
  });
};
