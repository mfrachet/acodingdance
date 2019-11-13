import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Wrapper } from '../components/wrapper'
import { css } from '@emotion/core'

const classes = css`
  margin: 3rem 0;

  hr {
    margin: 2rem 0;
  }

  p,
  li {
    letter-spacing: 0.05em;
    font-size: 1.2em;
    line-height: 1.6em;
    color: #373737;
  }

  p {
    margin-bottom: 1.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul {
    margin: 1.5rem 0;
  }

  li {
    margin-left: 2rem;
  }

  h1 {
    font-size: 2.5em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  h2 {
    font-size: 2em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  h3 {
    font-size: 1.6em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  h4 {
    font-size: 1.2em;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  img,
  iframe {
    margin-bottom: 2rem;
    margin-top: 2rem;
    max-width: 100%;
  }

  pre {
    margin: 5rem 5vw;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
    border: 1px solid #dfdfdf;
    padding: 0 1rem 1rem 1rem;
    font-family: inherit;

    &.language-jsx:before {
      content: 'JSX Snippet';
    }

    &.language-js:before {
      content: 'JavaScript Snippet';
    }

    &.language-shell:before {
      content: 'Shell Snippet';
    }

    &:before {
      content: 'Code snippet';
      background: red;
      display: block;
      padding: 0.3rem 1rem;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #dfdfdf;
      background-color: #f4f4f4;
      margin: 0 -1rem 1rem -1rem;
    }
  }
`

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />

      <Link to="/">Go back</Link>

      <Wrapper>
        <div css={classes}>
          <Date>{frontmatter.date}</Date>

          <h1>{frontmatter.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
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
