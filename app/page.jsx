import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";
import Link from "next/link";

export default async function HomePage() {
  console.log("[HomePage] rendering");
  const featuredReview = await getFeaturedReview();

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <div className="border w-80 bg-white rounded shadow hover:shadow-lg sm:w-full">
        <Link
          href={`/reviews/${featuredReview.slug}`}
          className="flex flex-col sm:flex-row"
        >
          <img
            src={featuredReview.image}
            alt={featuredReview.title}
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
            {featuredReview.title}
          </h2>
        </Link>
      </div>
    </>
  );
}
