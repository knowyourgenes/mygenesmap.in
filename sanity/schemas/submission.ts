import { defineType, defineField } from "sanity";

// User-generated submissions from the on-site composers (Ask a question /
// Add your answer). They land here as a moderation queue; nothing is published
// to the live feed automatically.
export const submission = defineType({
  name: "submission",
  title: "Submission (moderation queue)",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Question", value: "question" },
          { title: "Answer", value: "answer" },
        ],
      },
    }),
    defineField({ name: "text", type: "text", rows: 5 }),
    defineField({ name: "authorName", type: "string" }),
    defineField({ name: "authorCredential", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "questionSlug",
      type: "string",
      description: "For answer submissions: the question being answered.",
    }),
    defineField({ name: "questionTitle", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewing", value: "reviewing" },
          { title: "Published", value: "published" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "new",
    }),
    defineField({ name: "createdAt", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "newest",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      text: "text",
      kind: "kind",
      status: "status",
      q: "questionTitle",
    },
    prepare: ({ text, kind, status, q }) => ({
      title: text || "(empty)",
      subtitle: `${kind ?? "?"} · ${status ?? "new"}${q ? ` · on: ${q}` : ""}`,
    }),
  },
});
