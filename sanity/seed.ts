/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env vars (in .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (Editor role)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import {
  experts,
  homepageContent,
  questions,
  spaces,
  trending,
  type Paragraph,
} from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    for (const file of [".env.local", ".env"]) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      for (const raw of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN in .env",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

function paragraphsToBlocks(paragraphs: Paragraph[], keyPrefix: string) {
  return paragraphs.map((segments, i) => ({
    _type: "block",
    _key: `${keyPrefix}b${i}`,
    style: "normal",
    markDefs: [],
    children: segments.map((seg, j) => ({
      _type: "span",
      _key: `${keyPrefix}s${i}_${j}`,
      text: typeof seg === "string" ? seg : seg.b,
      marks: typeof seg === "string" ? [] : ["strong"],
    })),
  }));
}

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  const oldIds = await client.fetch<string[]>(
    `*[_type in ["space", "expert", "question", "trending"]]._id`,
  );
  if (oldIds.length > 0)
    console.log(`Deleting ${oldIds.length} existing content docs.`);

  const tx = client.transaction();
  for (const id of oldIds) tx.delete(id);

  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  for (const s of spaces) {
    tx.createOrReplace({
      _id: `space.${s.slug}`,
      _type: "space",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      blurb: s.blurb,
      featured: s.featured,
      iconKey: s.iconKey,
      order: s.order,
    });
  }

  for (const e of experts) {
    tx.createOrReplace({
      _id: `expert.${e.slug}`,
      _type: "expert",
      name: e.name,
      slug: { _type: "slug", current: e.slug },
      credential: e.credential,
      verified: e.verified,
      order: e.order,
    });
  }

  for (const q of questions) {
    tx.createOrReplace({
      _id: `question.${q.slug}`,
      _type: "question",
      title: q.title,
      slug: { _type: "slug", current: q.slug },
      space: { _type: "reference", _ref: `space.${q.spaceSlug}` },
      followers: q.followers,
      topAnswerLine: q.topAnswerLine,
      answers: q.answers.map((a, i) => ({
        _type: "answer",
        _key: `a${i}`,
        expert: { _type: "reference", _ref: `expert.${a.expertSlug}` },
        upvotes: a.upvotes,
        body: paragraphsToBlocks(a.body, `a${i}`),
      })),
      order: q.order,
    });
  }

  trending.forEach((t) => {
    tx.createOrReplace({
      _id: `trending.${t.rank}`,
      _type: "trending",
      rank: t.rank,
      question: t.question,
      spaceLabel: t.spaceLabel,
      ...(t.relatedSlug
        ? {
            relatedQuestion: {
              _type: "reference",
              _ref: `question.${t.relatedSlug}`,
            },
          }
        : {}),
    });
  });

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
