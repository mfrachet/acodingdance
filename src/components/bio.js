import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <div>
            <div>
              <span>
                {author} (
                <a href={`https://twitter.com/${social.twitter}`}>@mfrachet</a>)
              </span>
            </div>
            <p>I'm sharing my understanding discoveries.</p>
          </div>
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
