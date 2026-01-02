import type { CertificatePlatform } from './types';

export const certificatePlatforms: CertificatePlatform[] = [
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/',
    logo: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg',
    logo_dark: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg',
    description:
      'Offers thousands of hours of free, self-paced learning in web development, data science, and more. Earn verified certifications upon completing major curriculum sections.',
    tags: ['web development', 'javascript', 'python', 'data science', 'machine learning', 'cybersecurity'],
  },
  {
    id: 'google-digital-garage',
    name: 'Google Digital Garage',
    url: 'https://learndigital.withgoogle.com/digitalgarage/courses',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
    description:
      'Provides a wide range of free courses from Google on topics like digital marketing, data, and tech. Many include a free certificate from Google.',
    tags: ['digital marketing', 'data analysis', 'ai', 'cloud', 'career development'],
  },
  {
    id: 'coursera-free',
    name: 'Coursera (Free Courses)',
    url: 'https://www.coursera.org/courses?query=free',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg',
    description:
      'While known for paid degrees, Coursera offers hundreds of free courses from top universities and companies. Some provide a free certificate of completion.',
    tags: ['computer science', 'business', 'ai', 'data science', 'language learning', 'health'],
  },
   {
    id: 'ibm-skillsbuild',
    name: 'IBM SkillsBuild',
    url: 'https://skillsbuild.org/courses',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    description:
      'IBM\'s free education program focuses on core technology and professional skills for students, educators, and job seekers. Earn free digital credentials from IBM.',
    tags: ['ai', 'cybersecurity', 'data science', 'cloud computing', 'professional skills'],
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/collections/6791696099368828928',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg',
    description:
      'LinkedIn Learning offers a rotating selection of free courses each week, plus many free courses on specific topics like AI. Certificates can be added to your profile.',
    tags: ['software development', 'business', 'leadership', 'ai', 'marketing', 'design'],
  },
  {
    id: 'kaggle',
    name: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn',
    logo: 'https://www.kaggle.com/static/images/site-logo.svg',
    logo_dark: 'https://www.kaggle.com/static/images/site-logo.svg',
    description:
      'Offers hands-on, micro-courses in data science and machine learning. Learn skills like Python, Pandas, and SQL and earn certificates for completing each course.',
    tags: ['data science', 'machine learning', 'python', 'sql', 'data visualization', 'deep learning'],
  },
  {
    id: 'analytics-vidhya',
    name: 'Analytics Vidhya',
    url: 'https://www.analyticsvidhya.com/courses/',
    logo: 'https://www.analyticsvidhya.com/wp-content/uploads/2020/01/logo.png',
    logo_dark: 'https://www.analyticsvidhya.com/wp-content/uploads/2020/01/logo.png',
    description:
      'A community-based knowledge portal for Analytics and Data Science professionals, offering several free courses to get started in the field.',
    tags: ['data science', 'analytics', 'machine learning', 'business intelligence'],
  },
  {
    id: 'nvidia-dli',
    name: 'NVIDIA DLI',
    url: 'https://www.nvidia.com/en-us/training/online/',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    description:
      'NVIDIA\'s Deep Learning Institute (DLI) offers self-paced, online courses on AI, data science, and accelerated computing. Many introductory courses are free.',
    tags: ['deep learning', 'ai', 'cuda', 'data science', 'accelerated computing'],
  },
  {
    id: 'cisco-networking-academy',
    name: 'Cisco Networking Academy',
    url: 'https://www.netacad.com/courses/all-courses',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
    description:
      'Cisco offers many free introductory courses in networking, cybersecurity, and IoT. Complete courses to earn badges and prepare for industry certifications.',
    tags: ['networking', 'cybersecurity', 'iot', 'python', 'linux'],
  },
   {
    id: 'aws-skill-builder',
    name: 'AWS Skill Builder',
    url: 'https://explore.skillbuilder.aws/learn/public',
    logo: 'https://d1.awsstatic.com/training-and-certification/page-header-t-c-logo.87c2c922a91e5077e6b72af17c76a9c1186e2454.png',
    logo_dark: 'https://d1.awsstatic.com/training-and-certification/page-header-t-c-logo-white.8e33250f10a8f9f096232b7194f4c243851b9e28.png',
    description:
      'Amazon Web Services provides a massive library of free digital courses covering cloud computing fundamentals, machine learning on AWS, and more.',
    tags: ['cloud computing', 'aws', 'machine learning', 'devops', 'security'],
  },
   {
    id: 'microsoft-learn',
    name: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Microsoft_Learn_logo.svg',
    logo_dark: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Microsoft_Learn_logo.svg',
    description:
      'Master Microsoft products and services like Azure, Power BI, and .NET with free, interactive learning paths. Earn trophies and badges upon completion.',
    tags: ['azure', 'cloud', '.net', 'c#', 'power bi', 'data'],
  },
];
