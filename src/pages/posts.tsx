import React from "react";
import { graphql, Link } from "gatsby";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import {
  BreadCrumb,
  BreadCrumbList,
  BreadCrumbItem,
  BreadCrumbItemSeparator,
} from "../components/Breadcrumb";
import {
  SkipToContent,
  SkipToContentDestination,
} from "../components/SkipToContent";
import Helmet from "react-helmet";
import { Title } from "../components/Title";

const PostsPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      <li key={edge.node.id}>
        <Link to={edge.node.frontmatter.slug}>
          {edge.node.frontmatter.title}
        </Link>
      </li>
    ));

  return (
    <Layout>
      <Helmet>
        <html lang="en" />

        <title>Marvin Frachet · Product engineering at scale</title>

        <meta
          name="description"
          content="Marvin Frachet is a senior software engineer building product at scale, with a passion for code quality and automation."
        />
      </Helmet>

      <SkipToContent>Jump to content</SkipToContent>
      <Wrapper>
        <nav>
          <BreadCrumb label="Last visited page">
            <BreadCrumbList>
              <BreadCrumbItem>
                <Link to="/">Home</Link>
              </BreadCrumbItem>
              <BreadCrumbItemSeparator />
              <BreadCrumbItem emphasized>
                <Link to="/posts">Blog posts</Link>
              </BreadCrumbItem>
            </BreadCrumbList>
          </BreadCrumb>
        </nav>

        <SkipToContentDestination />
        <main>
          <Title>All posts</Title>

          <ul css={theme => ({marginTop: theme.spaces[5]})}>{Posts}</ul>
        </main>
      </Wrapper>
    </Layout>
  );
};

export default PostsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`;
