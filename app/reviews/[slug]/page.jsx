import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import { getMdFiles, getReview, getSlug } from "@/lib/reviews";

export async function generateStaticParams() {
  const mdFiles = await getMdFiles();
  const slugs = mdFiles.map((mdFile) => getSlug(mdFile));
  console.log("slugs:", slugs);

  const slugParams = slugs.map((slug) => ({ slug: slug }));
  // return [{ slug: "hellblade" }, { slug: "hollow-knight" }];
  return slugParams;
}

export async function generateMetadata({ params: { slug } }) {
  const filename = `${slug}.md`;
  const review = await getReview(filename);
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const filename = `${slug}.md`;
  const review = await getReview(filename);
  console.log("[ReviewPage] rendering", slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex py-2 gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareButtons />
      </div>
      <img
        src={review.image}
        alt="Stardew Valley"
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  );
}
