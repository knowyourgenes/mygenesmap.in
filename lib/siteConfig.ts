// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://mygenesmap.in",
  siteName: "mygenesmap.in",
  description:
    "A community where real questions about DNA, inheritance, testing, and health get clear " +
    "answers from researchers, clinicians, and genetic counsellors. Plain language, " +
    "India-aware, free for everyone.",
} as const;
