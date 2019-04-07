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

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />

        {posts.map(({ node }) => {
          const tags = node.frontmatter.tags || []
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginTop: rhythm(2),
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={node.fields.slug}>{title}</Link>
              </h3>

              <p
                style={{ marginBottom: 0 }}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />

              <small>
                {node.frontmatter.date} -
                <Time value={node.fields.readingTime.minutes} />
              </small>

              <div>
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
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
