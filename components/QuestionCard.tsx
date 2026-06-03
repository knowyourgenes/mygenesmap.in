import Link from "next/link";
import type { FeedQuestion } from "../sanity/fetch";
import {
  UpArrow,
  DownArrow,
  CommentIcon,
  ShareIcon,
  VerifiedBadge,
  initials,
} from "./Icons";

export default function QuestionCard({ q }: { q: FeedQuestion }) {
  const top = q.top;
  return (
    <article className="post">
      <div className="post__vote" aria-hidden>
        <span className="post__vbtn post__vbtn--up">
          <UpArrow />
        </span>
        <span className="post__score">{top?.upvotes ?? 0}</span>
        <span className="post__vbtn post__vbtn--down">
          <DownArrow />
        </span>
      </div>

      <div className="post__main">
        <div className="post__top">
          {q.spaceTitle ? (
            <span className="post__space">{q.spaceTitle}</span>
          ) : null}
          {q.followers ? (
            <span className="post__followers">{q.followers} followers</span>
          ) : null}
        </div>

        <Link href={`/questions/${q.slug}`} className="post__title">
          {q.title}
        </Link>
        <p className="post__snippet">{q.topAnswerLine}</p>

        <div className="post__foot">
          {top?.name ? (
            <span className="post__author">
              <span className="avatar avatar--sm" aria-hidden>
                {initials(top.name)}
              </span>
              <span>
                <span className="post__author-name">
                  {top.name}
                  {top.verified ? <VerifiedBadge className="verified" /> : null}
                </span>
                {top.credential ? (
                  <span className="post__author-cred">{top.credential}</span>
                ) : null}
              </span>
            </span>
          ) : null}

          <span className="post__actions">
            <Link href={`/questions/${q.slug}`} className="post__action">
              <CommentIcon /> {q.answerCount}{" "}
              {q.answerCount === 1 ? "answer" : "answers"}
            </Link>
            <span className="post__action">
              <ShareIcon /> Share
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
