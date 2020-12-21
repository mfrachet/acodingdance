import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { BreadCrumb, BreadCrumbList, BreadCrumbItem, BreadCrumbItemSeparator } from '../components/Breadcrumb';
import { SkipToContent, SkipToContentDestination } from '../components/SkipToContent';
import Helmet from 'react-helmet';
import { Title } from '../components/Title';
import { Time } from '../components/Time';

const PostsPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}: {
    data: any;
}): JSX.Element => {
    const description =
        'Marvin Frachet is a senior software engineer building products at scale, with a passion for code quality, refactoring and automation.';
    const keywords = `react,react native,gatsby,nextjs,next,jamstack,javascript,nodejs,product engineering,feature flags, a/b testing`;

    const Posts = edges
        .filter((edge) => !!edge.node.frontmatter.date)
        .map((edge) => (
            <li key={edge.node.id}>
                <Link to={edge.node.frontmatter.slug} css={(theme) => ({ marginRight: theme.spaces[1] })}>
                    {edge.node.frontmatter.title}
                </Link>{' '}
                <Time>{edge.node.frontmatter.date}</Time>
            </li>
        ));

    return (
        <Layout>
            <Helmet>
                <html lang="en" />

                <title>Marvin Frachet · Product engineering at scale</title>

                <meta name="description" content={description} />

                <meta name="twitter:creator" content="@mfrachet" />
                <meta name="twitter:card" content="summary" />
                <meta property="og:url" content="https://mfrachet.github.io/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Marvin Frachet · Product engineering at scale" />
                <meta property="og:description" content={description} />
                <meta name="keywords" content={keywords} />
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

                    <ul css={(theme) => ({ marginTop: theme.spaces[5] })}>{Posts}</ul>
                </main>
            </Wrapper>
        </Layout>
    );
};

export default PostsPage;

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
