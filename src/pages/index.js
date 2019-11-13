import React from 'react'
import { Link, graphql } from 'gatsby'
import { MdModeEdit } from 'react-icons/md'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Container } from '../components/container'
import { Wrapper } from '../components/wrapper'
import { Title } from '../components/title'

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

      <Wrapper>
        <Title>
          <MdModeEdit /> A coding dance
        </Title>
        <Container>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug

            return (
              <PostItem key={node.fields.slug}>
                <h2>
                  <Link to={node.fields.slug}>{title}</Link>
                </h2>

                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
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
