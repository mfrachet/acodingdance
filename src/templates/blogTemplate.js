import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { Progressbar } from "../components/Progressbar";
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

export default function Template({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [percentage, setPercentage] = React.useState(0);

  React.useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.body.offsetHeight;
          const winHeight = window.innerHeight;
          const scrollPercent = scrollTop / (docHeight - winHeight);
          const scrollPercentRounded = Math.round(scrollPercent * 100);

          isScrolling = false;
          setPercentage(scrollPercentRounded);
        });

        isScrolling = true;
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <html lang="en" />

        <title>{frontmatter.title}</title>

        <meta name="description" content={markdownRemark.excerpt} />
      </Helmet>

      <SkipToContent>Jump to content</SkipToContent>
      <Progressbar width={percentage} />
      <Wrapper>
        <nav>
          <BreadCrumb label="Last visited page">
            <BreadCrumbList>
              <BreadCrumbItem>
                <Link to="/">Home</Link>
              </BreadCrumbItem>
              <BreadCrumbItemSeparator />
              <BreadCrumbItem>
                <Link to="/posts">Blog posts</Link>
              </BreadCrumbItem>

              <BreadCrumbItemSeparator />
              <BreadCrumbItem emphasized>
                <Link to={frontmatter.slug}>{frontmatter.title}</Link>
              </BreadCrumbItem>
            </BreadCrumbList>
          </BreadCrumb>
        </nav>

        <SkipToContentDestination />
        <main>
          <h1>{frontmatter.title}</h1>

          <time dateTime={frontmatter.date}>{frontmatter.date}</time>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>
      </Wrapper>
    </Layout>
  );
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
