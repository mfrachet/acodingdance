import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Time } from '../components/time'
import { rhythm } from '../utils/typography'
import { Tag } from '../components/tag'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    const marginBottom = 0

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />

        <h4>Latest Blog Posts</h4>

        {posts.map(({ node }) => {
          const tags = node.frontmatter.tags || []
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} style={{ marginBottom: rhythm(2) }}>
              <h3
                style={{
                  marginBottom,
                }}
              >
                <Link to={node.fields.slug}>{title}</Link>
              </h3>

              <span>
                <small>
                  <em>{node.frontmatter.date}</em> {' • '}
                  <Time value={node.fields.readingTime.minutes} />
                </small>
              </span>

              <p
                style={{
                  marginBottom,
                }}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />

              {tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )
        })}
      </Layout>
    )
  }
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
