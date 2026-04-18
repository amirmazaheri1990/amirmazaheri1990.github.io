export const site = {
  name: 'Amir Mazaheri',
  role: 'Computer Vision Research Scientist · PhD',
  tagline:
    'Staff ML Engineer at Warner Bros. Discovery (HBO). Deep expertise in large-scale video understanding, Vision-Language Models, and multimodal AI.',
  location: 'Berkeley, CA',
  email: 'amirmazaheri1990@gmail.com',
  url: 'https://amirmazaheri1990.github.io',
  profileImage: '/profile.jpg',
  links: {
    github: 'https://github.com/amirmazaheri1990',
    linkedin: 'https://www.linkedin.com/in/amirmazaheri1990/',
    googleScholar: '',
    twitter: '',
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/cv', label: 'CV' },
  ],
} as const;

export type SiteConfig = typeof site;
