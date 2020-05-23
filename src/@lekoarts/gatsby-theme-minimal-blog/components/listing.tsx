/** @jsx jsx */
import { jsx } from "theme-ui";
import BlogListItem from "@lekoarts/gatsby-theme-minimal-blog/src/components/blog-list-item";

type ListingProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
  className?: string;
  showTags?: boolean;
};

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV;

const Listing = ({ posts, className, showTags = true }: ListingProps) => {
  return (
    <section sx={{ mb: [5, 6, 7] }} className={className}>
      {posts
        .filter(
          (post) =>
            activeEnv === "development" || !post.slug.includes(`__draft`)
        )
        .map((post) => (
          <BlogListItem key={post.slug} post={post} showTags={showTags} />
        ))}
    </section>
  );
};

export default Listing;
