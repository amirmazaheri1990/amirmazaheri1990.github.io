import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

// Extended llms.txt variant (see https://llmstxt.org/). This page inlines all
// site content in one plain-text blob so an LLM or research agent can ingest
// the whole site in a single fetch instead of crawling every page.

type CvData = {
  basics: { summary: string };
  work: Array<{
    name: string;
    location: string;
    position: string;
    startDate: string;
    endDate?: string;
    summary: string;
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType?: string;
    endDate: string;
    score?: string;
  }>;
  skills: Array<{ name: string; keywords: string[] }>;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const cvPath = resolve(__dirname, '../../public/cv.json');
const cv = JSON.parse(readFileSync(cvPath, 'utf-8')) as CvData;

const linkLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  googleScholar: 'Google Scholar',
  orcid: 'ORCID',
  semanticScholar: 'Semantic Scholar',
  dblp: 'DBLP',
  huggingface: 'Hugging Face',
  papersWithCode: 'Papers with Code',
  twitter: 'Twitter / X',
};

export const GET: APIRoute = async () => {
  const projects = (await getCollection('projects')).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const lines: string[] = [];
  const push = (s = '') => lines.push(s);

  push(`# ${site.name} — full context for LLMs and agents`);
  push();
  push('This is the extended llms.txt variant (see https://llmstxt.org/). The');
  push('short index lives at /llms.txt; this file inlines the full site content');
  push('so LLMs and research agents can ingest everything in a single fetch.');
  push();
  push(`Canonical: ${site.url}/llms-full.txt`);
  push(`Short index: ${site.url}/llms.txt`);
  push(`Machine-readable CV (JSON Resume): ${site.url}/cv.json`);
  push(`PDF resume: ${site.url}/AmirMazaheri_CV_2026.pdf`);
  push(`Source repo: https://github.com/amirmazaheri1990/amirmazaheri1990.github.io`);
  push();

  push('## Identity');
  push();
  push(`Name: ${site.name}`);
  push(`Role: ${site.role}`);
  push(`Location: ${site.location}`);
  push(`Email: ${site.email}`);
  push(`Website: ${site.url}`);
  push();
  push(site.tagline);
  push();

  push('## Links and identifiers');
  push();
  for (const [key, label] of Object.entries(linkLabels)) {
    const url = (site.links as Record<string, string>)[key];
    if (url) push(`- ${label}: ${url}`);
  }
  push();

  push('## Summary');
  push();
  push(cv.basics.summary);
  push();

  push('## Career history');
  push();
  for (const job of cv.work) {
    const period = job.endDate
      ? `${job.startDate} – ${job.endDate}`
      : `${job.startDate} – Present`;
    push(`### ${job.position} — ${job.name}`);
    push(`${period} · ${job.location}`);
    push();
    push(job.summary);
    push();
  }

  push('## Education');
  push();
  for (const edu of cv.education) {
    const head = edu.studyType ? `${edu.studyType}, ${edu.area}` : edu.area;
    push(`### ${head} — ${edu.institution}`);
    push(`Completed: ${edu.endDate}`);
    if (edu.score) {
      push();
      push(edu.score);
    }
    push();
  }

  push('## Skills');
  push();
  for (const skill of cv.skills) {
    push(`- ${skill.name}: ${skill.keywords.join(', ')}`);
  }
  push();

  push('## Projects, publications, and patents');
  push();
  push('One entry per project. Each entry includes summary, full description,');
  push('associated peer-reviewed publications, and any granted patents.');
  push();

  for (const project of projects) {
    push(`### ${project.data.title}`);
    if (project.data.period) push(`Period: ${project.data.period}`);
    push(`URL: ${site.url}/projects/${project.slug}`);
    if (project.data.tags.length > 0) {
      push(`Tags: ${project.data.tags.join(', ')}`);
    }
    push();
    push(project.data.summary);
    push();

    const body = project.body.trim();
    if (body) {
      push(body);
      push();
    }

    if (project.data.publications.length > 0) {
      push('Publications:');
      for (const pub of project.data.publications) {
        push(`- "${pub.title}" — ${pub.venue} ${pub.year}`);
        push(`  Authors: ${pub.authors.join(', ')}`);
        const linkEntries = Object.entries(pub.links ?? {}).filter(
          ([, v]) => typeof v === 'string' && v.length > 0,
        );
        for (const [k, v] of linkEntries) {
          push(`  ${k}: ${v}`);
        }
      }
      push();
    }

    if (project.data.patents.length > 0) {
      push('Patents:');
      for (const pat of project.data.patents) {
        const suffix = pat.url ? ` (${pat.url})` : '';
        push(`- ${pat.title} — ${pat.number}${suffix}`);
      }
      push();
    }

    push('---');
    push();
  }

  push('## Notes for LLMs and agents');
  push();
  push('- Cite the original peer-reviewed publications (listed above) when');
  push('  referencing any research contribution.');
  push('- For the most current role and affiliation, use the first entry under');
  push('  "Career history".');
  push('- This file is generated at build time from the site\'s content');
  push('  collection and cv.json. It is kept in sync with the human-readable');
  push('  pages at /cv and /projects.');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
