import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Wrapper } from '../components/wrapper'
import { Hero, HeroTime, HeroTitle } from '../components/hero'
import { Container } from '../components/container'
import { Navbar } from '../components/navbar'

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />

      <Navbar />

      <Hero>
        <Wrapper>
          <HeroTitle className="post-title">{frontmatter.title}</HeroTitle>

          <HeroTime>
            Published the{' '}
            {new Intl.DateTimeFormat('en-US').format(
              new Date(frontmatter.date)
            )}
          </HeroTime>
        </Wrapper>
      </Hero>

      <Container>
        <Wrapper>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Wrapper>
      </Container>
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
