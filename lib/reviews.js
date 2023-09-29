import { readdir, readFile } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getReview(filename) {
  const mdContent = await readFile(`./content/reviews/${filename}`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(mdContent);
  const body = marked(content, {
    headerIds: false,
    mangle: false,
  });
  const slug = getSlug(filename);
  return { filename, slug, title, date, image, body };
}

export async function getFeaturedReview() {
  const featuredReview = (await getReviews())[0];
  return featuredReview;
}

export async function getReviews() {
  const mdFiles = await getMdFiles();
  const reviewsPromises = mdFiles.map(async (mdFile) => {
    return await getReview(mdFile);
  });
  const reviews = await Promise.all(reviewsPromises);
  const sortedReviewsByDate = reviews.sort((reviewA, reviewB) => {
    // return new Date(reviewB.date) - new Date(reviewA.date);
    return reviewB.date.localeCompare(reviewA.date);
  });
  return sortedReviewsByDate;
}

export function getSlug(filename) {
  const slug = filename.slice(0, -3); // remove .md extension
  return slug;
}

export async function getMdFiles() {
  const mdFiles = (await readdir("./content/reviews/")).filter((file) =>
    file.endsWith(".md")
  );
  return mdFiles;
}
