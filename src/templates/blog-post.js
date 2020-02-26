import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Wrapper } from '../components/wrapper'
import { css } from '@emotion/core'
import { Container } from '../components/container'
import { Navbar } from '../components/navbar'

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />

      <Wrapper>
        <Navbar />

        <Container>
          {/* 
          <DateBlock>
            <FaRegCalendarAlt />{' '}
            {new Intl.DateTimeFormat('en-US').format(
              new Date(frontmatter.date)
            )}
          </DateBlock> */}

          <h1>{frontmatter.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
      </Wrapper>
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
