import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  homepageQuery,
  spacesQuery,
  feedQuery,
  questionSlugsQuery,
  questionSitemapQuery,
  questionBySlugQuery,
  spaceSlugsQuery,
  spaceSitemapQuery,
  spaceBySlugQuery,
  trendingQuery,
} from "./queries";

// Portable text
export type AnswerSpan = { _type?: string; text?: string; marks?: string[] };
export type AnswerBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: AnswerSpan[];
};

export type NavLink = { label: string; href: string };
export type CommunityBlock = { title: string; lead?: string; body?: string };

export type HomepageContent = {
  brandName: string;
  brandTld: string;
  tagline: string;
  navLinks: NavLink[];
  navCtaLabel?: string;
  navCtaHref?: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryLabel: string;
  searchPlaceholder: string;
  searchExamples: string[];
  feedTitle: string;
  feedIntro?: string;
  spacesEyebrow: string;
  spacesTitle: string;
  spacesIntro: string;
  howTitle: string;
  howBody: string;
  trustItems: string[];
  newsletterTitle: string;
  newsletterBody: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  communityTitle: string;
  communityIntro: string;
  communityBlocks: CommunityBlock[];
  trendingTitle: string;
  missionLine: string;
  footerLinks: NavLink[];
  footerCopy: string;
};

export type Space = {
  slug: string;
  title: string;
  blurb?: string;
  followers?: string;
  featured?: boolean;
  iconKey?: string;
  order: number;
  count: number;
};

export type FeedTop = {
  upvotes?: number;
  name?: string;
  credential?: string;
  verified?: boolean;
};

export type FeedQuestion = {
  slug: string;
  title: string;
  followers?: string;
  topAnswerLine: string;
  spaceTitle?: string;
  spaceSlug?: string;
  answerCount: number;
  top?: FeedTop;
  order?: number;
};

export type Answer = {
  upvotes?: number;
  body?: AnswerBlock[];
  name?: string;
  credential?: string;
  verified?: boolean;
};

export type QuestionFull = {
  slug: string;
  title: string;
  followers?: string;
  topAnswerLine: string;
  spaceTitle?: string;
  spaceSlug?: string;
  answers: Answer[];
  related: FeedQuestion[];
};

export type SpaceWithQuestions = {
  slug: string;
  title: string;
  blurb?: string;
  followers?: string;
  iconKey?: string;
  questions: FeedQuestion[];
};

export type Trending = {
  rank: number;
  question: string;
  spaceLabel?: string;
  relatedSlug?: string;
};

// Used by the sitemap. `publishedAt` is always a real date thanks to
// `coalesce(publishedAt, _updatedAt)` in the query.
export type SitemapEntry = {
  slug: string;
  publishedAt: string;
};

export type HomeData = {
  content: HomepageContent;
  spaces: Space[];
  feed: FeedQuestion[];
};

// Data needed by the app shell (top bar + left sidebar) on every page.
export type ShellData = {
  content: HomepageContent;
  spaces: Space[];
  searchIndex: FeedQuestion[];
};

function ensureClient() {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env, then run `pnpm seed`.",
    );
  }
  return client;
}

export async function getHomeData(): Promise<HomeData> {
  const client = ensureClient();
  const [content, spaces, feed] = await Promise.all([
    client.fetch<HomepageContent | null>(homepageQuery),
    client.fetch<Space[]>(spacesQuery),
    client.fetch<FeedQuestion[]>(feedQuery),
  ]);
  if (!content) {
    throw new Error("No homepage document found in Sanity. Run `pnpm seed`.");
  }
  return { content, spaces: spaces ?? [], feed: feed ?? [] };
}

export async function getShell(): Promise<ShellData> {
  const client = ensureClient();
  const [content, spaces, searchIndex] = await Promise.all([
    client.fetch<HomepageContent | null>(homepageQuery),
    client.fetch<Space[]>(spacesQuery),
    client.fetch<FeedQuestion[]>(feedQuery),
  ]);
  if (!content) throw new Error("No homepage document found. Run `pnpm seed`.");
  return { content, spaces: spaces ?? [], searchIndex: searchIndex ?? [] };
}

export async function getSiteContent(): Promise<HomepageContent> {
  const client = ensureClient();
  const content = await client.fetch<HomepageContent | null>(homepageQuery);
  if (!content) throw new Error("No homepage document found. Run `pnpm seed`.");
  return content;
}

export async function getQuestionSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(questionSlugsQuery)) ?? [];
}

export async function getQuestionBySlug(
  slug: string,
): Promise<QuestionFull | null> {
  const client = ensureClient();
  return await client.fetch<QuestionFull | null>(questionBySlugQuery, { slug });
}

export async function getSpaceSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(spaceSlugsQuery)) ?? [];
}

export async function getQuestionSitemapEntries(): Promise<SitemapEntry[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<SitemapEntry[]>(questionSitemapQuery)) ?? [];
}

export async function getSpaceSitemapEntries(): Promise<SitemapEntry[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<SitemapEntry[]>(spaceSitemapQuery)) ?? [];
}

export async function getSpaceBySlug(
  slug: string,
): Promise<SpaceWithQuestions | null> {
  const client = ensureClient();
  return await client.fetch<SpaceWithQuestions | null>(spaceBySlugQuery, {
    slug,
  });
}

export async function getTrending(): Promise<Trending[]> {
  const client = ensureClient();
  return (await client.fetch<Trending[]>(trendingQuery)) ?? [];
}
