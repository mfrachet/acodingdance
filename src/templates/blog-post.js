import React from 'react'
import { Link, graphql } from 'gatsby'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Wrapper } from '../components/wrapper'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { MdKeyboardBackspace } from 'react-icons/md'
import { Container } from '../components/container'

const DateBlock = styled.div`
  float: right;
  color: #373737;
  font-weight: bold;
`

const backLink = css`
  color: black;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-self: center;
  border-bottom: 0px !important;

  & svg {
    transition: all 0.3s;
  }

  &:hover svg {
    transform: translateX(-0.5rem);
  }
`

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />

      <Wrapper>
        <Container>
          <Link to="/" css={backLink}>
            <MdKeyboardBackspace
              css={css`
                margin-right: 0.3rem;
              `}
            />{' '}
            Go back
          </Link>

          <DateBlock>
            <FaRegCalendarAlt />{' '}
            {new Intl.DateTimeFormat('en-US').format(
              new Date(frontmatter.date)
            )}
          </DateBlock>

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
