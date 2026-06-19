import { defineType, defineField, defineArrayMember } from "sanity";

export const question = defineType({
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "space",
      type: "reference",
      to: [{ type: "space" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "followers",
      type: "string",
      description: "Follower count label, e.g. 3.4k",
    }),
    defineField({
      name: "topAnswerLine",
      title: "Top-answer one-liner (AEO)",
      type: "text",
      rows: 3,
      description:
        "The bold, self-contained sentence that fully answers the question.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "answer",
          fields: [
            defineField({
              name: "expert",
              type: "reference",
              to: [{ type: "expert" }],
              validation: (r) => r.required(),
            }),
            defineField({ name: "upvotes", type: "number", initialValue: 0 }),
            defineField({
              name: "body",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                },
              ],
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { name: "expert.name", upvotes: "upvotes" },
            prepare: ({ name, upvotes }) => ({
              title: name || "Unknown",
              subtitle: `${upvotes ?? 0} upvotes`,
            }),
          },
        }),
      ],
      description: "First answer is treated as the Top answer.",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "space.title" } },
});
