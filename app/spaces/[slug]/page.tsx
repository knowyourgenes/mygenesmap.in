import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../components/AppShell";
import QuestionCard from "../../../components/QuestionCard";
import { SpaceIcon } from "../../../components/Icons";
import { getShell, getSpaceBySlug, getSpaceSlugs } from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getSpaceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const space = await getSpaceBySlug(slug);
  if (!space) return { title: "Not found" };
  return { title: space.title, description: space.blurb };
}

export default async function SpacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [space, shell] = await Promise.all([getSpaceBySlug(slug), getShell()]);
  if (!space) notFound();

  const count = space.questions.length;
  const rail = (
    <>
      <div className="widget">
        <div className="widget__title">About this space</div>
        <p className="widget__text">{space.blurb}</p>
      </div>
      <div className="widget widget--brand">
        <div className="widget__title">About the community</div>
        <p className="widget__text">{shell.content.missionLine}</p>
      </div>
    </>
  );

  return (
    <AppShell
      content={shell.content}
      spaces={shell.spaces}
      searchIndex={shell.searchIndex}
      activeSpaceSlug={space.slug}
      rail={rail}
    >
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb__sep">›</span>
        <span>Spaces</span>
        <span className="breadcrumb__sep">›</span>
        <span>{space.title}</span>
      </nav>

      <div className="space-hero">
        <span className="space-hero__icon">
          <SpaceIcon iconKey={space.iconKey} />
        </span>
        <div>
          <h1 className="space-hero__title">{space.title}</h1>
          {space.blurb ? (
            <p className="space-hero__blurb">{space.blurb}</p>
          ) : null}
          <p className="space-hero__count">
            {count} {count === 1 ? "question" : "questions"}
          </p>
        </div>
      </div>

      <div className="feed__list">
        {count > 0 ? (
          space.questions.map((q) => <QuestionCard key={q.slug} q={q} />)
        ) : (
          <p className="page-intro">No questions in this space yet.</p>
        )}
      </div>
    </AppShell>
  );
}
