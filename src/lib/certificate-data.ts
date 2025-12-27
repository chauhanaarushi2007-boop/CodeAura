import type { CertificatePlatform } from './types';

export const certificatePlatforms: CertificatePlatform[] = [
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/',
    description:
      'Offers thousands of hours of free, self-paced learning in web development, data science, and more. Earn verified certifications upon completing major curriculum sections.',
    tags: ['web development', 'javascript', 'python', 'data science', 'machine learning', 'cybersecurity'],
  },
  {
    id: 'google-digital-garage',
    name: 'Google Digital Garage',
    url: 'https://learndigital.withgoogle.com/digitalgarage/courses',
    description:
      'Provides a wide range of free courses from Google on topics like digital marketing, data, and tech. Many include a free certificate from Google.',
    tags: ['digital marketing', 'data analysis', 'ai', 'cloud', 'career development'],
  },
  {
    id: 'coursera-free',
    name: 'Coursera (Free Courses)',
    url: 'https://www.coursera.org/courses?query=free',
    description:
      'While known for paid degrees, Coursera offers hundreds of free courses from top universities and companies. Some provide a free certificate of completion.',
    tags: ['computer science', 'business', 'ai', 'data science', 'language learning', 'health'],
  },
   {
    id: 'ibm-skillsbuild',
    name: 'IBM SkillsBuild',
    url: 'https://skillsbuild.org/courses',
    description:
      'IBM\'s free education program focuses on core technology and professional skills for students, educators, and job seekers. Earn free digital credentials from IBM.',
    tags: ['ai', 'cybersecurity', 'data science', 'cloud computing', 'professional skills'],
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning (Free)',
    url: 'https://www.linkedin.com/learning/collections/6791696099368828928',
    description:
      'LinkedIn Learning offers a rotating selection of free courses each week, plus many free courses on specific topics like AI. Certificates can be added to your profile.',
    tags: ['software development', 'business', 'leadership', 'ai', 'marketing', 'design'],
  },
  {
    id: 'kaggle',
    name: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn',
    description:
      'Offers hands-on, micro-courses in data science and machine learning. Learn skills like Python, Pandas, and SQL and earn certificates for completing each course.',
    tags: ['data science', 'machine learning', 'python', 'sql', 'data visualization', 'deep learning'],
  },
  {
    id: 'analytics-vidhya',
    name: 'Analytics Vidhya',
    url: 'https://www.analyticsvidhya.com/courses/',
    description:
      'A community-based knowledge portal for Analytics and Data Science professionals, offering several free courses to get started in the field.',
    tags: ['data science', 'analytics', 'machine learning', 'business intelligence'],
  },
  {
    id: 'nvidia-dli',
    name: 'NVIDIA DLI',
    url: 'https://www.nvidia.com/en-us/training/online/',
    description:
      'NVIDIA\'s Deep Learning Institute (DLI) offers self-paced, online courses on AI, data science, and accelerated computing. Many introductory courses are free.',
    tags: ['deep learning', 'ai', 'cuda', 'data science', 'accelerated computing'],
  },
  {
    id: 'cisco-networking-academy',
    name: 'Cisco Networking Academy',
    url: 'https://www.netacad.com/courses/all-courses',
    description:
      'Cisco offers many free introductory courses in networking, cybersecurity, and IoT. Complete courses to earn badges and prepare for industry certifications.',
    tags: ['networking', 'cybersecurity', 'iot', 'python', 'linux'],
  },
   {
    id: 'aws-skill-builder',
    name: 'AWS Skill Builder',
    url: 'https://explore.skillbuilder.aws/learn/public',
    description:
      'Amazon Web Services provides a massive library of free digital courses covering cloud computing fundamentals, machine learning on AWS, and more.',
    tags: ['cloud computing', 'aws', 'machine learning', 'devops', 'security'],
  },
   {
    id: 'microsoft-learn',
    name: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/',
    description:
      'Master Microsoft products and services like Azure, Power BI, and .NET with free, interactive learning paths. Earn trophies and badges upon completion.',
    tags: ['azure', 'cloud', '.net', 'c#', 'power bi', 'data'],
  },
];
