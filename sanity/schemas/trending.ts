import { defineType, defineField } from "sanity";

export const trending = defineType({
  name: "trending",
  title: "Trending question",
  type: "document",
  fields: [
    defineField({
      name: "rank",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "spaceLabel",
      type: "string",
      description: "Space name shown beside it.",
    }),
    defineField({
      name: "relatedQuestion",
      type: "reference",
      to: [{ type: "question" }],
      description: "Optional link to the full question page.",
    }),
  ],
  orderings: [
    { title: "Rank", name: "rank", by: [{ field: "rank", direction: "asc" }] },
  ],
  preview: {
    select: { title: "question", rank: "rank", subtitle: "spaceLabel" },
    prepare: ({ title, rank, subtitle }) => ({
      title: `${rank}. ${title}`,
      subtitle,
    }),
  },
});
