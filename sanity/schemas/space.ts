import { defineType, defineField } from "sanity";

export const space = defineType({
  name: "space",
  title: "Topic Space",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      type: "text",
      rows: 2,
      description: "What people ask here.",
    }),
    defineField({
      name: "followers",
      type: "string",
      description: "Follower count label, e.g. 3.4k",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show in the homepage spaces grid.",
      initialValue: true,
    }),
    defineField({ name: "iconKey", type: "string" }),
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
  preview: { select: { title: "title", subtitle: "blurb" } },
});
