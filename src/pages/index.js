import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const PostItem = ({ children }) => (
  <div style={{ paddingBottom: '1rem' }}>{children}</div>
)

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={['blog', 'gatsby', 'javascript', 'react']}
      />

      {posts.map(({ node }) => {
        const tags = node.frontmatter.tags || []
        const title = node.frontmatter.title || node.fields.slug

        return (
          <PostItem key={node.fields.slug}>
            <h2 className="no-margin">
              <Link to={node.fields.slug}>{title}</Link>
            </h2>

            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </PostItem>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
