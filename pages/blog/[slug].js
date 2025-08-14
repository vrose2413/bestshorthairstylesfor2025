import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "components/layout/Layout";
import BlogHeader from "components/BlogHeader";
import BlogBody from "components/BlogBody";
import MorePost from "components/MorePost";
import ShareButton from "components/ShareButton";
import Sidebar from "components/Sidebar";
import { Container, Grid, Typography } from "@material-ui/core";
import path from "path";

// SERVER-SIDE: Get all slugs
export async function getStaticPaths() {
  const { getAllPostsWithSlug } = await import("lib/index");
  const allPosts = getAllPostsWithSlug();

  const paths = allPosts.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
}

// SERVER-SIDE: Get data for one post
export async function getStaticProps({ params }) {
  const fs = require("fs"); // ✅ moved inside
  const { remark } = await import("remark");
  const html = (await import("remark-html")).default;
  const { getPostBySlug, getMorePosts } = await import("lib/index");

  // Get the post
  const post = getPostBySlug(params.slug);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  // More posts for sidebar/recent
  const morePosts = getMorePosts(params.slug);

  return {
    props: {
      post: {
        ...post,
        content: contentHtml,
        frontmatter: {
          ...post.frontmatter,
          date: post.frontmatter.date.toString(),
        },
      },
      morePosts: morePosts.map((p) => ({
        ...p,
        frontmatter: {
          ...p.frontmatter,
          date: p.frontmatter.date.toString(),
        },
      })),
    },
  };
}

export default function Blog({ post, morePosts }) {
  const router = useRouter();
  if (!router.isFallback && !post) return <ErrorPage statusCode={404} />;

  const { title, subTitle, author, authorImage, date, coverImage } =
    post.frontmatter;

  return (
    <Layout
      title={title}
      description={subTitle}
      ogImage={coverImage}
      url={`https://yourdomain.com/blog/${post.slug}`}
    >
      <Container maxWidth="lg">
        <BlogHeader
          title={title}
          subtitle={subTitle}
          authorName={author}
          authorImage={authorImage}
          slug={post.slug}
          date={date}
          coverImage={coverImage}
        />

        {/* Grid with sidebar aligned */}
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left - Blog content */}
          <Grid item xs={12} md={8}>
            <BlogBody content={post.content} />

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                - Share -
              </Typography>
              <ShareButton url={`https://yourdomain.com/blog/${post.slug}`} />
            </div>

            <Typography
              align="center"
              gutterBottom
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                margin: "3em 0 1.5em",
                borderBottom: "2px solid rgb(208 208 208)",
              }}
            >
              - Recent Entries -
            </Typography>

            <Grid container spacing={4}>
              {morePosts.map(({ slug, frontmatter }) => (
                <Grid item key={slug} xs={12} sm={6}>
                  <MorePost
                    title={frontmatter.title}
                    subtitle={frontmatter.subTitle}
                    authorName={frontmatter.author}
                    authorImage={frontmatter.authorImage}
                    slug={slug}
                    date={frontmatter.date}
                    coverImage={frontmatter.coverImage}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right - Sidebar */}
          <Grid item xs={12} md={4}>
            <Sidebar posts={morePosts.slice(0, 5)} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
