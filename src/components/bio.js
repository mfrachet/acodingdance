import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { Card } from './card'
import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <Card>
      <StaticQuery
        query={bioQuery}
        render={data => {
          const { author, social } = data.site.siteMetadata
          return (
            <div
              style={{
                display: 'flex',
              }}
            >
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  marginRight: rhythm(1 / 2),
                  marginBottom: 0,
                  minWidth: 50,
                  borderRadius: '100%',
                }}
              />
              <p style={{ marginBottom: 0 }}>
                Written by <strong>{author}</strong>{' '}
                <a href={`https://twitter.com/${social.twitter}`}>@mfrachet</a>.
                <br />
                I'm sharing my understanding discoveries.
              </p>
            </div>
          )
        }}
      />
    </Card>
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
