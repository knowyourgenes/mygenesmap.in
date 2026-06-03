import Link from "next/link";
import type {
  HomepageContent,
  Space,
  FeedQuestion,
  Trending,
} from "../sanity/fetch";
import AppShell from "./AppShell";
import QuestionCard from "./QuestionCard";
import AskBox from "./AskBox";
import { Check } from "./Icons";

type Props = {
  content: HomepageContent;
  spaces: Space[];
  feed: FeedQuestion[];
  trending: Trending[];
};

export default function Home({ content, spaces, feed, trending }: Props) {
  const rail = (
    <>
      <div className="widget widget--brand">
        <div className="widget__title">About the community</div>
        <p className="widget__text">{content.missionLine}</p>
      </div>

      {trending.length > 0 ? (
        <div className="widget">
          <div className="widget__title">
            {content.trendingTitle || "Trending this week"}
          </div>
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
      ) : null}

      {content.trustItems?.length ? (
        <div className="widget">
          <div className="widget__title">Why answers here are trusted</div>
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

      <div className="widget widget--brand">
        <div className="widget__title">Weekly digest</div>
        <p className="widget__text">
          {content.newsletterBody || content.newsletterTitle}
        </p>
        <div className="widget__form">
          <input
            className="widget__input"
            type="email"
            placeholder={content.newsletterPlaceholder || "your@email.com"}
            aria-label="Email address"
          />
          <button type="button" className="btn widget__btn">
            {content.newsletterCta || "Subscribe"}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <AppShell
      content={content}
      spaces={spaces}
      searchIndex={feed}
      active="home"
      rail={rail}
    >
      <AskBox />

      <div className="feed-head">
        <div>
          <h1 className="feed-head__title">{content.feedTitle}</h1>
          {content.feedIntro ? (
            <p className="feed-head__intro">{content.feedIntro}</p>
          ) : null}
        </div>
        <div className="feed-tabs">
          <span className="feed-tab feed-tab--active">Top</span>
          <span className="feed-tab">New</span>
        </div>
      </div>

      <div className="feed__list">
        {feed.map((q) => (
          <QuestionCard key={q.slug} q={q} />
        ))}
      </div>
    </AppShell>
  );
}
