import type { ReactNode } from "react";
import Link from "next/link";
import type { HomepageContent, Space, FeedQuestion } from "../sanity/fetch";
import SearchBox from "./SearchBox";
import { LogoMark, HomeIcon, SparkIcon, AskIcon, SpaceIcon } from "./Icons";

type Props = {
  content: HomepageContent;
  spaces: Space[];
  searchIndex: FeedQuestion[];
  active?: "home" | "community";
  activeSpaceSlug?: string;
  rail?: ReactNode;
  children: ReactNode;
};

export default function AppShell({
  content,
  spaces,
  searchIndex,
  active,
  activeSpaceSlug,
  rail,
  children,
}: Props) {
  const featured = spaces.filter((s) => s.featured !== false);

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar__inner">
          <Link
            href="/"
            className="brand"
            aria-label={`${content.brandName}${content.brandTld}`}
          >
            <span className="brand__mark">
              <LogoMark />
            </span>
            <span className="brand__text">
              <span className="brand__name">
                {content.brandName}
                <span>{content.brandTld}</span>
              </span>
              {content.tagline ? (
                <span className="brand__tag">{content.tagline}</span>
              ) : null}
            </span>
          </Link>

          <div className="topbar__search">
            <SearchBox
              index={searchIndex}
              placeholder={content.searchPlaceholder}
            />
          </div>

          <div className="topbar__actions">
            <Link href="/community" className="topbar__link">
              How it works
            </Link>
            <Link href="/#ask" className="btn btn--primary topbar__cta">
              <AskIcon />
              <span className="topbar__cta-label">
                {content.navCtaLabel || "Ask"}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE SPACE BAR */}
      <nav className="spacebar" aria-label="Spaces">
        <Link
          href="/"
          className={`spacechip${active === "home" ? " spacechip--active" : ""}`}
        >
          <HomeIcon size={16} />
          Home
        </Link>
        {featured.map((s) => (
          <Link
            key={s.slug}
            href={`/spaces/${s.slug}`}
            className={`spacechip${activeSpaceSlug === s.slug ? " spacechip--active" : ""}`}
          >
            {s.title}
          </Link>
        ))}
      </nav>

      {/* SHELL GRID */}
      <div className="shell">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <nav className="side-nav">
            <Link
              href="/"
              className={`side-item${active === "home" ? " side-item--active" : ""}`}
            >
              <span className="side-item__icon">
                <HomeIcon />
              </span>
              Home
            </Link>
            <Link
              href="/community"
              className={`side-item${active === "community" ? " side-item--active" : ""}`}
            >
              <span className="side-item__icon">
                <SparkIcon />
              </span>
              How it works
            </Link>
          </nav>

          <div className="side-heading">Spaces</div>
          <nav className="side-nav">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/spaces/${s.slug}`}
                className={`side-space${activeSpaceSlug === s.slug ? " side-space--active" : ""}`}
              >
                <span className="side-space__icon">
                  <SpaceIcon iconKey={s.iconKey} />
                </span>
                <span className="side-space__title">{s.title}</span>
                <span className="side-space__count">{s.count}</span>
              </Link>
            ))}
          </nav>

          <div className="side-foot">
            {content.footerLinks?.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
            <span className="side-foot__copy">{content.footerCopy}</span>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">{children}</main>

        {/* RIGHT RAIL */}
        {rail ? <aside className="rail">{rail}</aside> : null}
      </div>
    </>
  );
}
