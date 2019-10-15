import React from 'react'
import { Link, graphql } from 'gatsby'
import { Icon } from 'antd'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Time } from '../components/time'

const PostTitle = ({ children }) => (
  <div style={{ paddingBottom: '1rem' }}>{children}</div>
)

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />

      <PostTitle>
        <h1 className="no-margin">
          <Link to="/">
            <Icon type="arrow-left" />
          </Link>{' '}
          {post.frontmatter.title}
        </h1>

        <span>
          <small>
            <em>{post.frontmatter.date}</em> {' • '}
            <Time value={post.fields.readingTime.minutes} />
          </small>
        </span>
      </PostTitle>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <Bio />

      <ul>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
  }
`
