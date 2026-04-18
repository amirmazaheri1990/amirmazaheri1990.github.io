import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    date: z.coerce.date().optional(),
    abstract: z.string().optional(),
    links: z
      .object({
        pdf: z.string().url().optional(),
        arxiv: z.string().url().optional(),
        code: z.string().url().optional(),
        project: z.string().url().optional(),
        video: z.string().url().optional(),
        slides: z.string().url().optional(),
        bibtex: z.string().url().optional(),
        doi: z.string().url().optional(),
      })
      .default({}),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z
      .object({
        site: z.string().url().optional(),
        code: z.string().url().optional(),
        paper: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { publications, projects };
