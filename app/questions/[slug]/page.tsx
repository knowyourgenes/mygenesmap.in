import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "../../../components/AppShell";
import PortableText from "../../../components/PortableText";
import ContributeBox from "../../../components/ContributeBox";
import {
  UpArrow,
  DownArrow,
  VerifiedBadge,
  ShareIcon,
  initials,
} from "../../../components/Icons";
import {
  getQuestionBySlug,
  getQuestionSlugs,
  getShell,
  type AnswerBlock,
} from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getQuestionSlugs();
  return slugs.map((slug) => ({ slug }));
}

function flatten(blocks?: AnswerBlock[]): string {
  if (!blocks) return "";
  return blocks
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .join(" ")
    .trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const q = await getQuestionBySlug(slug);
  if (!q) return { title: "Not found" };
  return {
    title: q.title,
    description: q.topAnswerLine,
    openGraph: {
      title: q.title,
      description: q.topAnswerLine,
      type: "article",
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [q, shell] = await Promise.all([getQuestionBySlug(slug), getShell()]);
  if (!q) notFound();

  const answers = q.answers ?? [];
  const top = answers[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: q.title,
      answerCount: answers.length,
      acceptedAnswer: {
        "@type": "Answer",
        text: [q.topAnswerLine, flatten(top?.body)].filter(Boolean).join(" "),
        author: top?.name ? { "@type": "Person", name: top.name } : undefined,
      },
      suggestedAnswer: answers.slice(1).map((a) => ({
        "@type": "Answer",
        text: flatten(a.body),
        author: a.name ? { "@type": "Person", name: a.name } : undefined,
      })),
    },
  };

  const rail = (
    <>
      {q.related?.length ? (
        <div className="widget">
          <div className="widget__title">More in {q.spaceTitle}</div>
          <div className="trending">
            {q.related.map((r, i) => (
              <div className="trend-row" key={r.slug}>
                <span className="trend-row__rank">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link href={`/questions/${r.slug}`} className="trend-row__q">
                  {r.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
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
      activeSpaceSlug={q.spaceSlug}
      rail={rail}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb__sep">›</span>
        {q.spaceSlug ? (
          <Link href={`/spaces/${q.spaceSlug}`}>{q.spaceTitle}</Link>
        ) : null}
        <span className="breadcrumb__sep">›</span>
        <span>Question</span>
      </nav>

      <article className="thread">
        <div className="qhead">
          <div className="qhead__vote" aria-hidden>
            <span className="post__vbtn post__vbtn--up">
              <UpArrow />
            </span>
            <span className="post__score">{top?.upvotes ?? 0}</span>
            <span className="post__vbtn post__vbtn--down">
              <DownArrow />
            </span>
          </div>
          <div className="qhead__main">
            <div className="qhead__top">
              {q.spaceTitle ? (
                <span className="post__space">{q.spaceTitle}</span>
              ) : null}
              {q.followers ? (
                <span className="post__followers">{q.followers} followers</span>
              ) : null}
            </div>
            <h1 className="qhead__title">{q.title}</h1>
          </div>
        </div>

        <div className="answer-callout">
          <div className="answer-callout__label">Top answer</div>
          <p className="answer-callout__text">{q.topAnswerLine}</p>
        </div>

        <div className="answers__head">
          {answers.length} {answers.length === 1 ? "answer" : "answers"}
        </div>

        <div className="answers">
          {answers.map((a, i) => (
            <div className="answer" key={i}>
              <div className="answer__vote" aria-hidden>
                <span className="post__vbtn post__vbtn--up">
                  <UpArrow size={18} />
                </span>
                <span className="answer__score">{a.upvotes ?? 0}</span>
              </div>
              <div className="answer__main">
                <div className="answer__head">
                  <span className="avatar" aria-hidden>
                    {initials(a.name)}
                  </span>
                  <span className="answer__who">
                    <span className="answer__name">
                      {a.name}
                      {a.verified ? (
                        <VerifiedBadge className="verified" />
                      ) : null}
                    </span>
                    {a.credential ? (
                      <span className="answer__cred">{a.credential}</span>
                    ) : null}
                  </span>
                  {i === 0 ? (
                    <span className="answer__badge">Top answer</span>
                  ) : null}
                </div>

                <PortableText blocks={a.body} />

                <div className="answer__actions">
                  <span className="answer__action">
                    <ShareIcon /> Share
                  </span>
                  <span className="answer__action">Follow</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <ContributeBox questionSlug={q.slug} questionTitle={q.title} />
    </AppShell>
  );
}
