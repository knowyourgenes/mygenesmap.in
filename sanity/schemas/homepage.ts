import { defineType, defineField, defineArrayMember } from "sanity";

const linkArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "link",
        fields: [
          defineField({
            name: "label",
            type: "string",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "href",
            type: "string",
            validation: (r) => r.required(),
          }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }),
    ],
  });

export const homepage = defineType({
  name: "homepage",
  title: "Homepage & Site",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & Nav" },
    { name: "hero", title: "Hero" },
    { name: "feed", title: "Feed" },
    { name: "spaces", title: "Spaces section" },
    { name: "how", title: "How it works" },
    { name: "trust", title: "Trust strip" },
    { name: "newsletter", title: "Newsletter" },
    { name: "community", title: "Community page" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "brandName",
      type: "string",
      group: "brand",
      initialValue: "mygenesmap",
    }),
    defineField({
      name: "brandTld",
      type: "string",
      group: "brand",
      initialValue: ".in",
    }),
    defineField({ name: "tagline", type: "string", group: "brand" }),
    { ...linkArray("navLinks", "Nav links"), group: "brand" },
    defineField({ name: "navCtaLabel", type: "string", group: "brand" }),
    defineField({ name: "navCtaHref", type: "string", group: "brand" }),

    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", type: "string", group: "hero" }),
    defineField({ name: "heroSubhead", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaHref", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryLabel", type: "string", group: "hero" }),
    defineField({ name: "searchPlaceholder", type: "string", group: "hero" }),
    defineField({
      name: "searchExamples",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
    }),

    defineField({ name: "feedTitle", type: "string", group: "feed" }),
    defineField({ name: "feedIntro", type: "text", rows: 2, group: "feed" }),

    defineField({ name: "spacesEyebrow", type: "string", group: "spaces" }),
    defineField({ name: "spacesTitle", type: "string", group: "spaces" }),
    defineField({
      name: "spacesIntro",
      type: "text",
      rows: 3,
      group: "spaces",
    }),

    defineField({ name: "howTitle", type: "string", group: "how" }),
    defineField({ name: "howBody", type: "text", rows: 4, group: "how" }),

    defineField({
      name: "trustItems",
      type: "array",
      of: [{ type: "string" }],
      group: "trust",
    }),

    defineField({
      name: "newsletterTitle",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterBody",
      type: "text",
      rows: 3,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      type: "string",
      group: "newsletter",
    }),
    defineField({ name: "newsletterCta", type: "string", group: "newsletter" }),

    // Community ("How it works") page
    defineField({ name: "communityTitle", type: "string", group: "community" }),
    defineField({
      name: "communityIntro",
      type: "text",
      rows: 3,
      group: "community",
    }),
    defineField({
      name: "communityBlocks",
      title: "Community model blocks",
      type: "array",
      group: "community",
      of: [
        defineArrayMember({
          type: "object",
          name: "cblock",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "lead", type: "text", rows: 2 }),
            defineField({ name: "body", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "title", subtitle: "lead" } },
        }),
      ],
    }),
    defineField({ name: "trendingTitle", type: "string", group: "community" }),

    defineField({
      name: "missionLine",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    { ...linkArray("footerLinks", "Footer links"), group: "footer" },
    defineField({ name: "footerCopy", type: "string", group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Homepage & Site content" }) },
});
