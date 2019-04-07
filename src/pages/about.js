import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} title="About me">
        <SEO
          title="About me"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />

        <img src="/img.JPG" alt="This is me!" />
        <div>About me bro</div>
      </Layout>
    )
  }
}

export default About
