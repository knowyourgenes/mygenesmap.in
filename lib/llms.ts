// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full answer bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer.

import { siteConfig } from "./siteConfig";
import {
  getSiteContent,
  getQuestionSlugs,
  getQuestionBySlug,
  getSpaceSlugs,
  getSpaceBySlug,
  type Answer,
} from "../sanity/fetch";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

/** "Name — Credential" byline from an answer's author fields, when present. */
function answerByline(a: Answer): string {
  const parts = [a.name?.trim(), a.credential?.trim()].filter(Boolean);
  return parts.join(" — ");
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const [content, questionSlugs, spaceSlugs] = await Promise.all([
    getSiteContent().catch(() => null),
    getQuestionSlugs(),
    getSpaceSlugs(),
  ]);

  const summary =
    content?.missionLine?.trim() ||
    content?.heroSubhead?.trim() ||
    content?.tagline?.trim() ||
    siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(
    `- [Home](${abs("/")}): The genetics question-and-answer community — plain-language answers to real questions about DNA, inheritance, and testing.`,
  );
  lines.push(
    `- [How it works](${abs("/community")}): How the community works and what we promise.`,
  );
  lines.push("");

  const questions = (
    await Promise.all(questionSlugs.map((slug) => getQuestionBySlug(slug)))
  ).filter((q): q is NonNullable<typeof q> => Boolean(q));

  if (questions.length) {
    lines.push("## Questions");
    for (const q of questions) {
      lines.push(`- [${cleanTitle(q.title)}](${abs(`/questions/${q.slug}`)}): ${q.topAnswerLine}`);
    }
    lines.push("");
  }

  const spaces = (
    await Promise.all(spaceSlugs.map((slug) => getSpaceBySlug(slug)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (spaces.length) {
    lines.push("## Spaces");
    for (const s of spaces) {
      const blurb = s.blurb?.trim() || `${s.questions.length} questions`;
      lines.push(`- [${cleanTitle(s.title)}](${abs(`/spaces/${s.slug}`)}): ${blurb}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const [content, questionSlugs, spaceSlugs] = await Promise.all([
    getSiteContent().catch(() => null),
    getQuestionSlugs(),
    getSpaceSlugs(),
  ]);

  const summary =
    content?.missionLine?.trim() ||
    content?.heroSubhead?.trim() ||
    content?.tagline?.trim() ||
    siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push(`- [How it works](${abs("/community")})`);
  lines.push("");

  // Full question threads. Each question's answers are inlined via
  // portableTextToMarkdown; fetched in parallel and kept in slug order.
  const questions = (
    await Promise.all(questionSlugs.map((slug) => getQuestionBySlug(slug)))
  ).filter((q): q is NonNullable<typeof q> => Boolean(q));

  if (questions.length) {
    lines.push("## Questions");
    lines.push("");
    for (const q of questions) {
      lines.push(`### ${cleanTitle(q.title)}`);
      lines.push(`URL: ${abs(`/questions/${q.slug}`)}`);
      if (q.spaceTitle) lines.push(`Space: ${q.spaceTitle}`);
      lines.push("");
      if (q.topAnswerLine) {
        lines.push(`**Top answer:** ${q.topAnswerLine}`);
        lines.push("");
      }
      const answers = q.answers ?? [];
      answers.forEach((a, i) => {
        const byline = answerByline(a);
        const heading = i === 0 ? "Top answer" : `Answer ${i + 1}`;
        lines.push(`#### ${heading}${byline ? ` — ${byline}` : ""}`);
        lines.push("");
        const md = portableTextToMarkdown(a.body, 2);
        if (md) {
          lines.push(md);
          lines.push("");
        }
      });
    }
  }

  const spaces = (
    await Promise.all(spaceSlugs.map((slug) => getSpaceBySlug(slug)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (spaces.length) {
    lines.push("## Spaces");
    lines.push("");
    for (const s of spaces) {
      lines.push(`### ${cleanTitle(s.title)}`);
      lines.push(`URL: ${abs(`/spaces/${s.slug}`)}`);
      lines.push("");
      if (s.blurb) {
        lines.push(s.blurb);
        lines.push("");
      }
      if (s.questions.length) {
        for (const q of s.questions) {
          lines.push(`- [${cleanTitle(q.title)}](${abs(`/questions/${q.slug}`)}): ${q.topAnswerLine}`);
        }
        lines.push("");
      }
    }
  }

  return lines.join("\n").trim() + "\n";
}
