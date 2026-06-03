/**
 * Single source of truth for mygenesmap.in, pushed into Sanity by `pnpm seed`.
 * The site renders entirely from Sanity. Content transcribed from content.docx
 * (Batch 04 - the genetics Q&A community).
 */

export type Segment = string | { b: string };
export type Paragraph = Segment[];

export const homepageContent = {
  brandName: "mygenesmap",
  brandTld: ".in",
  tagline: "the genetics question-and-answer community",
  navLinks: [
    { label: "Questions", href: "/#feed" },
    { label: "Spaces", href: "/#spaces" },
    { label: "How it works", href: "/community" },
  ],
  navCtaLabel: "Ask a question",
  navCtaHref: "/community",

  heroEyebrow:
    "Ask anything about your genes. Get an answer from someone who knows.",
  heroHeadline: "The genetics questions you were too unsure to ask, answered.",
  heroSubhead:
    "A community where real questions about DNA, inheritance, testing, and health get clear answers from researchers, clinicians, and genetic counsellors. Read what others asked, follow a topic, or ask your own. Plain language, India-aware, free for everyone.",
  heroPrimaryCtaLabel: "Browse questions",
  heroPrimaryCtaHref: "/#feed",
  heroSecondaryLabel: "Ask your own question",
  searchPlaceholder:
    "Ask or search: 'Is balding from my mother's side?' · 'Can two brown-eyed parents have a blue-eyed child?'",
  searchExamples: [
    "Is depression genetic?",
    "Is balding from my mother's side?",
    "Can a DNA test expose a relative?",
  ],

  feedTitle: "Questions the community is answering",
  feedIntro:
    "Real questions, in people's own words — answered by verified experts, with the most useful answer on top.",

  spacesEyebrow: "Topic spaces",
  spacesTitle: "Follow the spaces you care about",
  spacesIntro:
    "Questions are organised into spaces, the way a community organises itself. Follow the ones you care about and their best questions surface for you.",

  howTitle: "How this community works",
  howBody:
    "Anyone can ask. We surface the questions whose answers will help the most people. Anyone with genuine expertise can answer, and we verify credentials before a professional title appears. The most useful answers rise to the top, and we never sell anything, no products, no affiliate links, just the questions and the people who can answer them.",

  trustItems: [
    "Answers from verified experts",
    "Credentials checked",
    "Plain language",
    "India-aware",
    "Free, no selling",
  ],

  newsletterTitle:
    "The week's most useful question and its best answer, in your inbox every Friday.",
  newsletterBody:
    "Five minutes, no jargon, often the exact thing you were wondering.",
  newsletterPlaceholder: "your@email.com",
  newsletterCta: "Subscribe",

  communityTitle: "Ask, answer, follow",
  communityIntro:
    "The three things a reader can do here, kept simple. This page explains the community model and sets expectations, the way a good community's about-page does.",
  communityBlocks: [
    {
      title: "Anyone can ask a question",
      lead: "Ask anything about genes, DNA, inheritance, testing, or genetic health, in plain words, and the questions most useful to others get surfaced and answered.",
      body: "You do not need to phrase it scientifically. The best questions usually come from real confusion or a real worry, asked plainly. We curate which questions reach the homepage based on how useful the answer is likely to be for other people, not on upvotes alone.",
    },
    {
      title: "Experts answer, and we verify them",
      lead: "Researchers, clinicians, genetic counsellors, and credentialled enthusiasts answer, and any professional title is verified before it appears beside a name.",
      body: "Expertise is the currency here, so we check it. When someone claims a clinical or research title, we verify their background before that credential shows publicly. Multiple experts may answer the same question, and honest disagreement between them is welcome, it is how nuance survives.",
    },
    {
      title: "We do not sell anything",
      lead: "There are no products, no affiliate links, and no sponsored answers, the community exists because the questions are interesting and the answers help.",
      body: "This is a deliberate line. No answer is ever paid for, no product is ever pushed, and no result steers you toward a purchase. That independence is exactly what makes an answer here worth trusting.",
    },
  ],
  trendingTitle: "Trending this week",

  missionLine:
    "A community where genetics questions get real answers from people who actually know, plain-language, India-aware, free for everyone.",
  footerLinks: [
    { label: "Questions", href: "/#feed" },
    { label: "Spaces", href: "/#spaces" },
    { label: "How it works", href: "/community" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
  footerCopy: "mygenesmap.in · the genetics question-and-answer community",
};

export const spaces = [
  {
    slug: "inheritance-family",
    title: "Inheritance & family",
    blurb: "Why I look like one parent, what gets passed down, family patterns",
    featured: true,
    iconKey: "family",
    order: 1,
  },
  {
    slug: "disease-risk",
    title: "Disease risk",
    blurb: "Is X genetic, what a risk score means, family history worries",
    featured: true,
    iconKey: "risk",
    order: 2,
  },
  {
    slug: "genetic-testing",
    title: "Genetic testing",
    blurb: "Which test, how accurate, what the report means",
    featured: true,
    iconKey: "testing",
    order: 3,
  },
  {
    slug: "ancestry",
    title: "Ancestry",
    blurb: "Where my DNA traces to, why results change, relative matching",
    featured: true,
    iconKey: "ancestry",
    order: 4,
  },
  {
    slug: "traits-lifestyle",
    title: "Traits & lifestyle",
    blurb: "Caffeine, sleep type, height, baldness, diet response",
    featured: true,
    iconKey: "traits",
    order: 5,
  },
  {
    slug: "ethics-privacy-law",
    title: "Ethics, privacy & law",
    blurb: "Who owns my data, can it leak, can it expose relatives",
    featured: true,
    iconKey: "ethics",
    order: 6,
  },
  {
    slug: "got-my-results",
    title: "Got my results",
    blurb: "Questions from people who just got their DNA report back.",
    featured: false,
    iconKey: "results",
    order: 7,
  },
  {
    slug: "pop-culture",
    title: "Pop culture",
    blurb: "Genetics in the headlines, the myths, and the movies.",
    featured: false,
    iconKey: "popculture",
    order: 8,
  },
];

export const experts = [
  {
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    credential: "PhD candidate, population genetics",
    verified: true,
    order: 1,
  },
  {
    slug: "priya-iyer",
    name: "Dr. Priya Iyer",
    credential: "Genetic counsellor · 11 years",
    verified: true,
    order: 2,
  },
  {
    slug: "vikram-k",
    name: "Dr. Vikram K.",
    credential: "Medical geneticist",
    verified: true,
    order: 3,
  },
  {
    slug: "maya-subramaniam",
    name: "Maya Subramaniam",
    credential: "Science journalist",
    verified: false,
    order: 4,
  },
  {
    slug: "manas-k",
    name: "Dr. Manas K.",
    credential: "Molecular biologist",
    verified: true,
    order: 5,
  },
  {
    slug: "aruna-g",
    name: "Dr. Aruna G.",
    credential: "Preventive medicine",
    verified: true,
    order: 6,
  },
];

export type SeedAnswer = {
  expertSlug: string;
  upvotes: number;
  body: Paragraph[];
};
export type SeedQuestion = {
  slug: string;
  title: string;
  spaceSlug: string;
  followers: string;
  topAnswerLine: string;
  answers: SeedAnswer[];
  order: number;
};

export const questions: SeedQuestion[] = [
  {
    slug: "look-more-like-one-parent",
    title:
      "If I share 50% of my DNA with both parents, why do I look so much more like one of them?",
    spaceSlug: "inheritance-family",
    followers: "3.4k",
    order: 1,
    topAnswerLine:
      "You got 50% of your DNA from each parent, but appearance is decided by a small subset of variants, and the random draw can hand you most of the looks-related ones from a single side.",
    answers: [
      {
        expertSlug: "arjun-mehta",
        upvotes: 412,
        body: [
          [
            "Yes, you inherited half your DNA from each parent. But 'looks like' is driven by a few hundred variants that influence facial features, skin tone, hair, and eye shape. Which half of each parent's DNA you received is random, and that draw can give you most of the appearance-relevant variants from one side. So you can be 50/50 by total DNA and 80/20 by visible-trait DNA. That is not a contradiction, it is exactly what the maths predicts will sometimes happen.",
          ],
          [
            "There is also dominance. If your mother passed a dominant variant for, say, a strong jawline and your father a recessive one, you show your mother's jawline even though you carry both. Your own children could still inherit the recessive version and resemble your father's side.",
          ],
        ],
      },
      {
        expertSlug: "priya-iyer",
        upvotes: 188,
        body: [
          [
            "To add to Arjun's answer: parents often notice a child looks like one of them for a few years, then seems to switch. That is real too. The genes shaping facial structure express at different rates as the face grows, so the same child at 3, 13, and 30 can convincingly resemble a different parent in each photo.",
          ],
        ],
      },
    ],
  },
  {
    slug: "is-depression-genetic",
    title: "Is depression genetic?",
    spaceSlug: "disease-risk",
    followers: "9.3k",
    order: 2,
    topAnswerLine:
      "Partly. Twin studies put the heritability of major depression at roughly 35 to 40 percent, which means genes explain part of the risk while life circumstances explain most of the rest.",
    answers: [
      {
        expertSlug: "priya-iyer",
        upvotes: 621,
        body: [
          [
            "'Genetic' is doing a lot of work in that question, so let me unpack it. Heritability estimates for major depressive disorder cluster around 35 to 40 percent. That means roughly that share of the variation in who develops depression is explained by genetic differences across the population. The remaining 60 to 65 percent is environmental, trauma, stress, sleep, social context, and life events.",
          ],
          [
            "What it does not mean: there is no single depression gene. Hundreds, possibly thousands, of variants each add a tiny amount of risk. A polygenic score for depression is real but still weakly predictive for any one person. What it does mean: if a parent or sibling has depression, your own risk is roughly two to three times the general population. That is meaningful, but still smaller than what your circumstances and access to support will do. Genetics loads the dice, environment rolls them.",
          ],
        ],
      },
      {
        expertSlug: "maya-subramaniam",
        upvotes: 297,
        body: [
          [
            "One more piece of context. The hunt for 'depression genes' had a rough decade. Several early candidate genes, especially the serotonin-transporter variant, failed to replicate in larger studies. The field shifted from single genes to the cumulative effect of thousands of small-effect variants. The honest summary today: depression has a real genetic component that is complex, distributed across the genome, and not yet useful for personal prediction. Your own history and family history remain more informative than a DNA test.",
          ],
        ],
      },
    ],
  },
  {
    slug: "brca-test-no-family-history",
    title:
      "Should I get tested for BRCA if no one in my family has had breast cancer?",
    spaceSlug: "disease-risk",
    followers: "5.8k",
    order: 3,
    topAnswerLine:
      "For most people with no family history, a full clinical BRCA test is not the first step, but consumer BRCA screens only read a few variants, so a negative one does not rule out risk.",
    answers: [
      {
        expertSlug: "vikram-k",
        upvotes: 344,
        body: [
          [
            "Two things are worth separating. Clinical BRCA testing, ordered through a doctor, sequences the full BRCA1 and BRCA2 genes and is recommended when there is a meaningful personal or family history, breast or ovarian cancer at a young age, multiple affected relatives, or certain ancestries with known founder variants. Without those flags, routine full BRCA testing is usually not the first move.",
          ],
          [
            "Consumer tests are a different animal. Some screen only a handful of the most common BRCA variants, often those most frequent in specific populations. A negative result there does not rule out a BRCA-related risk, because the test never read the rest of the gene. If you have a real family history, the right path is a clinical test through an oncologist or genetic counsellor, not a consumer kit.",
          ],
        ],
      },
      {
        expertSlug: "priya-iyer",
        upvotes: 156,
        body: [
          [
            "Echoing Vikram. Also remember that most breast cancer is not hereditary at all, the majority of cases occur in people with no inherited high-risk variant. So a normal BRCA result, clinical or consumer, is reassuring about one specific pathway, not a guarantee. Standard screening guidance for your age still applies either way.",
          ],
        ],
      },
    ],
  },
  {
    slug: "balding-mothers-side",
    title: "Is balding really inherited only from my mother's side?",
    spaceSlug: "traits-lifestyle",
    followers: "5.6k",
    order: 4,
    topAnswerLine:
      "No, that is a half-truth. A major hair-loss variant does sit on the X chromosome that men inherit from their mothers, but more than 200 markers from both sides of the family contribute.",
    answers: [
      {
        expertSlug: "manas-k",
        upvotes: 289,
        body: [
          [
            "The old rule captures something real but oversimplifies badly. One important androgen-receptor variant linked to male-pattern baldness does sit on the X chromosome, which a man inherits from his mother, so the maternal line genuinely matters. That is where the folk wisdom comes from.",
          ],
          [
            "But male-pattern hair loss is polygenic. Large studies have identified well over 200 genetic markers associated with it, spread across many chromosomes, and they can come from either parent. Looking only at your mother's father tells you part of the story at best. If you want a real sense of your odds, look at hair-loss patterns across both sides of the family, not just one.",
          ],
        ],
      },
    ],
  },
  {
    slug: "dna-test-expose-relative",
    title: "If I take a DNA test, can it expose a relative I have never met?",
    spaceSlug: "ethics-privacy-law",
    followers: "7.3k",
    order: 5,
    topAnswerLine:
      "Yes. Because you share DNA with relatives, your test can make a relative partially identifiable through you, even if they never tested themselves.",
    answers: [
      {
        expertSlug: "maya-subramaniam",
        upvotes: 503,
        body: [
          [
            "This is one of the genuinely unsettling implications of consumer genetic testing, and it is no longer hypothetical. The well-known example is the Golden State Killer case, where investigators uploaded crime-scene DNA to a public ancestry database, identified distant relatives, and used traditional genealogy to narrow down the individual. Nobody in that chain had to test the suspect directly.",
          ],
          [
            "The implication for ordinary people: you do not have to take a test for your DNA to be partly searchable. If a cousin you have never met tests and uploads to a public database, some of your own genetic information becomes inferable through them. For most people with no criminal exposure the practical risk is small, but the privacy principle is real, and it is one reason to read a company's data-sharing and law-enforcement policy before uploading anywhere.",
          ],
        ],
      },
      {
        expertSlug: "aruna-g",
        upvotes: 201,
        body: [
          [
            "And it is why consent is not purely individual with genetic data. When you test, you are making a small decision on behalf of parents, siblings, and children who share your DNA. That is not a reason to avoid testing, but it is a reason to choose a provider with clear, restrictive data policies and to think of the choice as a family one.",
          ],
        ],
      },
    ],
  },
  {
    slug: "diabetes-risk-95th-percentile",
    title:
      "My polygenic risk score for type 2 diabetes is in the 95th percentile. Should I panic?",
    spaceSlug: "got-my-results",
    followers: "4.7k",
    order: 6,
    topAnswerLine:
      "No, but pay attention. A 95th-percentile score means your genetic risk is higher than 95 percent of people, not that you have a 95 percent chance of diabetes, and lifestyle can move the real outcome a lot.",
    answers: [
      {
        expertSlug: "priya-iyer",
        upvotes: 478,
        body: [
          [
            "A 95th-percentile polygenic risk score does not mean a 95 percent chance of developing diabetes. It means that, against the population the score was built on, your genetic risk sits above 95 percent of people. Translating that into absolute lifetime risk depends on the population, the model, and your other risk factors, but for type 2 diabetes it usually works out to roughly two to three times average risk.",
          ],
          [
            "What changes the picture most is lifestyle. Type 2 diabetes risk responds strongly to body composition, diet, activity, and sleep, and large studies show lifestyle change can roughly halve risk even in genetically susceptible people. Practical order: get baseline labs including HbA1c, and if you are South Asian get them earlier than the general guidance, because diabetes tends to present earlier and at lower BMI in our population. Then re-test periodically to see where you actually trend. The score tells you which dial to watch, the labs tell you whether it is moving.",
          ],
        ],
      },
    ],
  },
];

export type SeedTrending = {
  rank: number;
  question: string;
  spaceLabel: string;
  relatedSlug?: string;
};

export const trending: SeedTrending[] = [
  {
    rank: 1,
    question: "Can a DNA test expose a relative I have never met?",
    spaceLabel: "Ethics & law",
    relatedSlug: "dna-test-expose-relative",
  },
  {
    rank: 2,
    question: "Is balding really from my mother's side?",
    spaceLabel: "Traits",
    relatedSlug: "balding-mothers-side",
  },
  {
    rank: 3,
    question:
      "My diabetes risk score is in the 95th percentile, should I panic?",
    spaceLabel: "Got my results",
    relatedSlug: "diabetes-risk-95th-percentile",
  },
  {
    rank: 4,
    question: "Is there really a 'warrior gene'?",
    spaceLabel: "Pop culture",
  },
  {
    rank: 5,
    question: "Should I get a BRCA test with no family history?",
    spaceLabel: "Disease risk",
    relatedSlug: "brca-test-no-family-history",
  },
];
