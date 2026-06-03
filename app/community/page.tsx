import type { Metadata } from "next";
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Check } from "../../components/Icons";
import { getShell, getTrending } from "../../sanity/fetch";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getShell();
  return {
    title: content.communityTitle || "How it works",
    description: content.communityIntro,
  };
}

export default async function CommunityPage() {
  const [shell, trending] = await Promise.all([getShell(), getTrending()]);
  const { content } = shell;

  const rail = (
    <>
      <div className="widget widget--brand">
        <div className="widget__title">About the community</div>
        <p className="widget__text">{content.missionLine}</p>
      </div>
      {content.trustItems?.length ? (
        <div className="widget">
          <div className="widget__title">Our promises</div>
          <div className="widget__list">
            {content.trustItems.map((item) => (
              <span className="widget__li" key={item}>
                <Check className="widget__check" />
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );

  return (
    <AppShell
      content={content}
      spaces={shell.spaces}
      searchIndex={shell.searchIndex}
      active="community"
      rail={rail}
    >
      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb__sep">›</span>
        <span>How it works</span>
      </nav>

      <h1 className="page-title">{content.communityTitle}</h1>
      {content.communityIntro ? (
        <p className="page-intro">{content.communityIntro}</p>
      ) : null}

      <div className="cblocks">
        {content.communityBlocks?.map((b) => (
          <div className="cblock" key={b.title}>
            <h2 className="cblock__title">{b.title}</h2>
            {b.lead ? <p className="cblock__lead">{b.lead}</p> : null}
            {b.body ? <p className="cblock__body">{b.body}</p> : null}
          </div>
        ))}
      </div>

      {trending.length > 0 ? (
        <>
          <h2 className="section-sub">
            {content.trendingTitle || "Trending this week"}
          </h2>
          <div className="widget" style={{ marginTop: 6 }}>
            <div className="trending">
              {trending.map((t) => (
                <div className="trend-row" key={t.rank}>
                  <span className="trend-row__rank">
                    {String(t.rank).padStart(2, "0")}
                  </span>
                  {t.relatedSlug ? (
                    <Link
                      href={`/questions/${t.relatedSlug}`}
                      className="trend-row__q"
                    >
                      {t.question}
                    </Link>
                  ) : (
                    <span className="trend-row__q">{t.question}</span>
                  )}
                  {t.spaceLabel ? (
                    <span className="trend-row__space">{t.spaceLabel}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </AppShell>
  );
}
