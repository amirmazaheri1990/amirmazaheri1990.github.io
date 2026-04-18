export const site = {
  name: 'Amir Mazaheri',
  role: 'Computer Vision Researcher & Engineer',
  tagline:
    'Research and engineering at the intersection of computer vision, deep learning, and language.',
  location: '',
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
    { href: '/publications', label: 'Publications' },
    { href: '/projects', label: 'Projects' },
    { href: '/cv', label: 'CV' },
  ],
} as const;

export type SiteConfig = typeof site;
