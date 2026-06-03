"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FeedQuestion } from "../sanity/fetch";
import { SearchIcon } from "./Icons";

type Props = {
  index: FeedQuestion[];
  placeholder: string;
};

export default function SearchBox({ index, placeholder }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((item) => {
        const hay =
          `${item.title} ${item.topAnswerLine} ${item.spaceTitle ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 7);
  }, [query, index]);

  const showResults = open && query.trim().length > 0;

  return (
    <div className="search">
      <div className="search__field">
        <SearchIcon className="search__icon" />
        <input
          className="search__input"
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          aria-label="Ask or search the community"
        />
      </div>

      {showResults ? (
        <div className="search__results">
          {results.length > 0 ? (
            results.map((r) => (
              <Link
                key={r.slug}
                href={`/questions/${r.slug}`}
                className="search__result"
              >
                <div className="search__result-q">{r.title}</div>
                {r.spaceTitle ? (
                  <div className="search__result-topic">{r.spaceTitle}</div>
                ) : null}
              </Link>
            ))
          ) : (
            <div className="search__empty">No matching question yet.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
