import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Comment, Avatar } from 'antd'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <Comment
            author={
              <span>
                {author} (
                <a href={`https://twitter.com/${social.twitter}`}>@mfrachet</a>)
              </span>
            }
            avatar={
              <Avatar
                src="https://avatars1.githubusercontent.com/u/3874873?s=460&v=4"
                alt={author}
              />
            }
            content={<p>I'm sharing my understanding discoveries.</p>}
          />
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
