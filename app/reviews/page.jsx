import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Link from "next/link";

export const metadata = {
  title: "Reviews",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <p>List of reviews</p>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li
            key={review.slug}
            className="border w-80 bg-white shadow hover:shadow-lg"
          >
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt={review.title}
                width="320"
                height="180"
                className="mb-2 rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
