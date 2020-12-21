import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { FaTwitter, FaLinkedin, FaGithub, FaBook } from 'react-icons/fa';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { Title } from '../components/Title';

const IndexPage = () => {
    const description =
        'Marvin Frachet is a senior software engineer building products at scale, with a passion for code quality, refactoring and automation.';
    const keywords = `react,react native,gatsby,nextjs,next,jamstack,javascript,nodejs,product engineering,feature flags, a/b testing`;

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

            <Wrapper>
                <main>
                    <div css={(theme) => ({ marginTop: theme.spaces[8] })}>
                        <Title>
                            Hey there,
                            <br /> {`I'm Marvin Frachet`}
                        </Title>
                    </div>

                    <p css={(theme) => ({ marginTop: theme.spaces[5] })}>
                        {`I'm a french software developer loving testing automation,`}{' '}
                        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
                            TypeScript
                        </a>
                        ,{' '}
                        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                            React
                        </a>{' '}
                        and{' '}
                        <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
                            React Native
                        </a>
                        . {`I'm mostly doing`} <strong>product engineering</strong> but I also like to dive into deep
                        technical concepts and learn new languages.
                    </p>

                    <p>
                        {`I'm actually building some pieces of`}{' '}
                        <a href="https://gatsbyjs.com/" target="_blank" rel="noreferrer">
                            Gatsby Cloud
                        </a>{' '}
                        that aims to be the fastest platform to build Gatsby sites.
                    </p>

                    <ul
                        css={(theme) => ({
                            listStyleType: 'none',
                            margin: 0,
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',

                            li: {
                                marginBottom: theme.spaces[4],
                            },

                            svg: {
                                marginRight: theme.spaces[1],
                            },

                            [theme.mq.desktop]: {
                                flexDirection: 'row',
                                li: {
                                    marginBottom: 'unset',
                                    marginRight: theme.spaces[4],
                                },
                            },
                        })}
                    >
                        <li>
                            <Link to="/posts">
                                <FaBook />
                                Blog posts
                            </Link>
                        </li>

                        <li>
                            <a href="https://github.com/mfrachet" target="_blank" rel="noreferrer">
                                <FaGithub />
                                Github
                            </a>
                        </li>

                        <li>
                            <a href="https://twitter.com/mfrachet" target="_blank" rel="noreferrer">
                                <FaTwitter />
                                Twitter
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.linkedin.com/in/marvin-frachet-49165365/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedin />
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </main>
            </Wrapper>
        </Layout>
    );
};

export default IndexPage;
