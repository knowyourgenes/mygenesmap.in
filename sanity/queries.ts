import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  brandName, brandTld, tagline,
  navLinks[]{ label, href },
  navCtaLabel, navCtaHref,
  heroEyebrow, heroHeadline, heroSubhead,
  heroPrimaryCtaLabel, heroPrimaryCtaHref, heroSecondaryLabel,
  searchPlaceholder, searchExamples,
  feedTitle, feedIntro,
  spacesEyebrow, spacesTitle, spacesIntro,
  howTitle, howBody,
  trustItems,
  newsletterTitle, newsletterBody, newsletterPlaceholder, newsletterCta,
  communityTitle, communityIntro, communityBlocks[]{ title, lead, body }, trendingTitle,
  missionLine,
  footerLinks[]{ label, href },
  footerCopy
}`;

export const spacesQuery = groq`*[_type == "space"] | order(order asc) {
  "slug": slug.current,
  title, blurb, followers, featured, iconKey, order,
  "count": count(*[_type == "question" && references(^._id)])
}`;

// Feed card projection reused on the homepage and space pages.
const feedCard = `{
  "slug": slug.current,
  title,
  followers,
  topAnswerLine,
  "spaceTitle": space->title,
  "spaceSlug": space->slug.current,
  "answerCount": count(answers),
  "top": answers[0]{
    upvotes,
    "name": expert->name,
    "credential": expert->credential,
    "verified": expert->verified
  },
  order
}`;

export const feedQuery = groq`*[_type == "question"] | order(order asc) ${feedCard}`;

export const questionSlugsQuery = groq`*[_type == "question" && defined(slug.current)][].slug.current`;

// Sitemap projection: slug + a guaranteed-real date for lastModified.
export const questionSitemapQuery = groq`*[_type == "question" && defined(slug.current)]{
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt)
}`;

export const questionBySlugQuery = groq`*[_type == "question" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  followers,
  topAnswerLine,
  "spaceTitle": space->title,
  "spaceSlug": space->slug.current,
  answers[]{
    upvotes,
    body,
    "name": expert->name,
    "credential": expert->credential,
    "verified": expert->verified
  },
  "related": *[_type == "question" && space._ref == ^.space._ref && slug.current != ^.slug.current] | order(order asc)[0...4] ${feedCard}
}`;

export const spaceSlugsQuery = groq`*[_type == "space" && defined(slug.current)][].slug.current`;

// Sitemap projection: slug + a guaranteed-real date for lastModified.
export const spaceSitemapQuery = groq`*[_type == "space" && defined(slug.current)]{
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt)
}`;

export const spaceBySlugQuery = groq`*[_type == "space" && slug.current == $slug][0] {
  "slug": slug.current,
  title, blurb, followers, iconKey,
  "questions": *[_type == "question" && references(^._id)] | order(order asc) ${feedCard}
}`;

export const trendingQuery = groq`*[_type == "trending"] | order(rank asc) {
  rank,
  question,
  spaceLabel,
  "relatedSlug": relatedQuestion->slug.current
}`;
