import { defineCollection, z } from 'astro:content';

const pubLinks = z
  .object({
    pdf: z.string().url().optional(),
    arxiv: z.string().url().optional(),
    code: z.string().url().optional(),
    project: z.string().url().optional(),
    video: z.string().url().optional(),
    slides: z.string().url().optional(),
    doi: z.string().url().optional(),
  })
  .default({});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    // General project links (website, demo, code repo)
    links: z
      .object({
        site: z.string().url().optional(),
        code: z.string().url().optional(),
        demo: z.string().url().optional(),
        video: z.string().url().optional(),
      })
      .default({}),
    // One or more associated peer-reviewed papers
    publications: z
      .array(
        z.object({
          title: z.string(),
          authors: z.array(z.string()),
          venue: z.string(),
          year: z.number(),
          links: pubLinks,
        })
      )
      .default([]),
    // US patents
    patents: z
      .array(
        z.object({
          title: z.string(),
          number: z.string(),
          url: z.string().url().optional(),
        })
      )
      .default([]),
  }),
});

export const collections = { projects };
