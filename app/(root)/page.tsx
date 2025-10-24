import StartupCard, {StartupCardType} from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import { Suspense } from "react";

async function StartupsList({ query }: { query?: string }) {
  const params = { search: query || null};
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post : StartupCardType) => (
          <StartupCard key={post?._id} post={post} />
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}

async function HomeContent({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br/>
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading max-w-3xl!">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <Suspense fallback={<div>Loading startups...</div>}>
          <StartupsList query={query} />
        </Suspense>
      </section>
    </>
  );
}

export default function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent searchParams={searchParams} />
      </Suspense>
      <SanityLive />
    </>
  );
}