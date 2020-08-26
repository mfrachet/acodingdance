import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";

const IndexPage = () => {
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

      <Wrapper>
        <main>
          <h1>
            <span aria-hidden={true}>👋</span> Hey there, I'm Marvin Frachet
          </h1>

          <p>
            I'm a french software developer loving testing automation,{" "}
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
            >
              TypeScript
            </a>
            ,{" "}
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              React
            </a>{" "}
            and{" "}
            <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
              React Native
            </a>
            . I'm mostly doing <strong>product engineering</strong> but I also
            like to dive into deep technical concepts and learn new languages.
          </p>

          <p>
            I'm actually building some pieces of{" "}
            <a href="https://gatsbyjs.com/" target="_blank" rel="noreferrer">
              Gatsby Cloud
            </a>{" "}
            that aims to be the fastest platform to build Gatsby sites.
          </p>

          <ul>
            <li>
              <Link to="/posts">Blog posts</Link>
            </li>

            <li>
              <a
                href="https://github.com/mfrachet"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com/mfrachet"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/marvin-frachet-49165365/"
                target="_blank"
                rel="noreferrer"
              >
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
