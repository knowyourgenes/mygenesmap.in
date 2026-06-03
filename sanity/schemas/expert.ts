import { defineType, defineField } from "sanity";

export const expert = defineType({
  name: "expert",
  title: "Expert / Contributor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "credential",
      type: "string",
      description: "e.g. Genetic counsellor · 11 years",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "verified",
      type: "boolean",
      description: "Credential verified (shows a verified mark).",
      initialValue: true,
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "name", subtitle: "credential" } },
});
