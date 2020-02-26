import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Container } from '../components/container'
import { Wrapper } from '../components/wrapper'
import { Navbar } from '../components/navbar'

const PostItem = ({ children }) => (
  <div style={{ paddingBottom: '4rem' }}>{children}</div>
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

      <Navbar />

      <Wrapper>
        <Container>
          <h3>Latest</h3>

          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug

            return (
              <PostItem key={node.fields.slug}>
                <h4>{title}</h4>

                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />

                <Link to={node.fields.slug}>Read the post</Link>
              </PostItem>
            )
          })}
        </Container>
      </Wrapper>
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
