import React from 'react'
import Layout from '../components/layout'
import { Time } from '../components/time'
import { Link, graphql } from 'gatsby'

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug, readingTime } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>
                {title} - <Time value={readingTime.minutes} />
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
