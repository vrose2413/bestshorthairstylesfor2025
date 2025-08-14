import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

// ✅ Get all post slugs
export function getAllPostsWithSlug() {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((file) => file.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));
}

// ✅ Get a single post by slug
export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      ...data,
      date: new Date(data.date).toISOString(), // ✅ Make date serializable
    },
    content,
  };
}

// ✅ Get all posts sorted by date descending
export function getAllPosts() {
  const slugs = getAllPostsWithSlug();

  const posts = slugs.map(({ slug }) => getPostBySlug(slug));

  return posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

// ✅ Get 5 more posts excluding current
export function getMorePosts(currentSlug) {
  const posts = getAllPosts().filter((post) => post.slug !== currentSlug);

  return posts.slice(0, 7); // You can increase this limit if needed
}
