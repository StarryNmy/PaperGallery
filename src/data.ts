import { Image, LayoutTemplate, Palette, GitMerge, Users, Box, FileText, Mail, FileImage } from 'lucide-react';

export const categories = [
  {
    id: 'headers',
    tag: 'IMAGES',
    title: 'Headers',
    description: 'Top result showcase figures from selected papers.',
    icon: FileImage,
    bgIcon: Image,
    link: '#headers'
  },
  {
    id: 'examples',
    tag: 'PROJECTS',
    title: 'Examples',
    description: 'Direct links to official paper homepages and project sites.',
    icon: LayoutTemplate,
    bgIcon: LayoutTemplate,
    link: '#examples'
  },
  {
    id: 'pipeline',
    tag: 'IMAGES',
    title: 'Pipeline',
    description: 'Methodology and model architecture diagrams.',
    icon: GitMerge,
    bgIcon: GitMerge,
    link: '#pipeline'
  },
  {
    id: 'templates',
    tag: 'PROJECTS',
    title: 'Templates',
    description: 'Classic GitHub projects for paper presentation and websites.',
    icon: FileText,
    bgIcon: FileText,
    link: '#templates'
  },
  {
    id: 'team',
    tag: 'ABOUT',
    title: 'Team',
    description: 'Member information and research group introductions.',
    icon: Users,
    bgIcon: Users,
    link: '#team'
  },
  {
    id: 'colors',
    tag: 'TOOLS',
    title: 'Colors',
    description: 'Color palette templates for academic figures and posters.',
    icon: Palette,
    bgIcon: Palette,
    link: '#colors'
  },
  {
    id: 'icons',
    tag: 'TOOLS',
    title: 'Icons',
    description: 'Icon sets and vector assets for research diagrams.',
    icon: Box,
    bgIcon: Box,
    link: '#icons'
  },
  {
    id: 'contact',
    tag: 'ABOUT',
    title: 'Contact',
    description: 'Reach out for collaborations or general inquiries.',
    icon: Mail,
    bgIcon: Mail,
    link: '#contact'
  }
];

export const mockData: Record<string, any[]> = {
  headers: [
    { id: 1, title: 'Stable Diffusion XL Results', image: 'https://picsum.photos/seed/sdxl/800/400', paper: 'SDXL: Improving Latent Diffusion Models', link: 'https://arxiv.org/abs/2307.01952' },
    { id: 2, title: 'DALL-E 3 Generation', image: 'https://picsum.photos/seed/dalle3/800/400', paper: 'DALL-E 3 System Card', link: 'https://openai.com/dall-e-3' },
  ],
  examples: [
    { id: 1, title: 'Gaussian Splatting', url: 'https://repo-lp.github.io/gaussian-splatting/', description: 'Official project page for 3D Gaussian Splatting.' },
    { id: 2, title: 'Segment Anything (SAM)', url: 'https://segment-anything.com/', description: 'Meta AI research project for image segmentation.' },
  ],
  pipeline: [
    { id: 1, title: 'Transformer Architecture', image: 'https://picsum.photos/seed/transformer/800/600', description: 'The original encoder-decoder structure from Attention Is All You Need.' },
    { id: 2, title: 'ResNet Residual Block', image: 'https://picsum.photos/seed/resnet/800/600', description: 'Skip connection mechanism in Deep Residual Learning.' },
  ],
  templates: [
    { id: 1, title: 'Academic Project Page Template', github: 'https://github.com/lewisjellis/academic-project-page-template', description: 'A popular Jekyll-based template for research projects.' },
    { id: 2, title: 'Nerfies Template', github: 'https://github.com/nerfies/nerfies.github.io', description: 'The template used by many top-tier vision papers.' },
  ],
  team: [
    { id: 1, name: 'Dr. Alice Smith', role: 'Principal Investigator', bio: 'Expert in Computer Vision and Generative Models.', avatar: 'https://i.pravatar.cc/150?u=alice', link: 'https://github.com' },
    { id: 2, name: 'Bob Johnson', role: 'PhD Student', bio: 'Focusing on efficient Transformer architectures.', avatar: 'https://i.pravatar.cc/150?u=bob', link: 'https://github.com' },
  ],
  colors: [
    { id: 1, name: 'Nature Publishing Group', palette: ['#E64B35', '#4DBBD5', '#00A087', '#3C8DBC'], description: 'Standard colors used in Nature journals.' },
    { id: 2, name: 'Material Design Academic', palette: ['#2196F3', '#FFC107', '#4CAF50', '#F44336'], description: 'Vibrant colors for modern posters.' },
  ],
  icons: [
    { id: 1, name: 'Academicons', url: 'https://jpswalsh.github.io/academicons/', description: 'Specialist icons for academia (ORCID, arXiv, etc.).' },
    { id: 2, name: 'Lucide React', url: 'https://lucide.dev/', description: 'Clean, consistent icons for web interfaces.' },
  ],
  contact: [
    { id: 1, type: 'Email', value: 'contact@papergallery.edu', link: 'mailto:contact@papergallery.edu' },
    { id: 2, type: 'Twitter', value: '@PaperGalleryAI', link: 'https://twitter.com' },
  ]
};
