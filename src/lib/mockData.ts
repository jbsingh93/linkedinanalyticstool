// Mock data structure for LinkedIn posts
// This is temporary data used for development and will be replaced with real data from Supabase

export interface LinkedInPost {
  id: string;
  content: string;
  publishedAt: string;
  url: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
  };
  engagement: {
    likes: number;
    comments: number;
  };
  comments?: Array<{
    id: string;
    author: string;
    content: string;
    publishedAt: string;
  }>;
}

export const mockPosts: LinkedInPost[] = [
  {
    id: '1',
    content: `Just launched a new feature that's been months in the making! 🚀 

Our team has been working tirelessly to bring this to life, and I couldn't be more proud of what we've accomplished together.

Key highlights:
• Reduced load time by 50%
• Improved user engagement by 30%
• Added real-time collaboration features

Thank you to everyone who contributed to this milestone. This is just the beginning!

#ProductLaunch #TeamWork #Innovation`,
    publishedAt: '2025-05-20T10:30:00Z',
    url: 'https://www.linkedin.com/posts/example-1',
    media: {
      type: 'image',
      url: 'https://via.placeholder.com/800x400',
      thumbnailUrl: 'https://via.placeholder.com/200x100'
    },
    engagement: {
      likes: 342,
      comments: 28
    },
    comments: [
      {
        id: 'c1',
        author: 'Sarah Johnson',
        content: 'Congratulations! This looks amazing.',
        publishedAt: '2025-05-20T11:00:00Z'
      },
      {
        id: 'c2',
        author: 'Mike Chen',
        content: 'Great work! Can\'t wait to try the new features.',
        publishedAt: '2025-05-20T12:15:00Z'
      }
    ]
  },
  {
    id: '2',
    content: `Reflecting on my journey in tech over the past 5 years...

When I started, I never imagined I'd be where I am today. From junior developer to leading a team of incredible engineers, every challenge has been a learning opportunity.

My biggest lessons:
1. Embrace failure as a teacher
2. Never stop learning
3. Lift others as you climb
4. Technical skills matter, but soft skills make the difference

What's your biggest career lesson? Would love to hear your thoughts below! 👇`,
    publishedAt: '2025-05-18T14:45:00Z',
    url: 'https://www.linkedin.com/posts/example-2',
    engagement: {
      likes: 567,
      comments: 45
    }
  },
  {
    id: '3',
    content: `Excited to announce that I'll be speaking at TechConf 2025! 🎤

Topic: "Building Scalable Systems with Modern Architecture"

Join me on June 15th where I'll be sharing insights on:
- Microservices best practices
- Event-driven architecture
- Performance optimization strategies

Register here: [link] 
See you there!`,
    publishedAt: '2025-05-15T09:00:00Z',
    url: 'https://www.linkedin.com/posts/example-3',
    media: {
      type: 'image',
      url: 'https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=TechConf+2025',
      thumbnailUrl: 'https://via.placeholder.com/200x100/4A90E2/FFFFFF?text=TechConf'
    },
    engagement: {
      likes: 892,
      comments: 67
    }
  },
  {
    id: '4',
    content: `Quick tip for developers: 

Always write code as if the person who ends up maintaining it is a violent psychopath who knows where you live. 😄

But seriously, clean code matters:
• Use meaningful variable names
• Comment complex logic
• Keep functions small and focused
• Write tests

Your future self will thank you!`,
    publishedAt: '2025-05-12T16:20:00Z',
    url: 'https://www.linkedin.com/posts/example-4',
    engagement: {
      likes: 1203,
      comments: 89
    }
  },
  {
    id: '5',
    content: `Just completed my AWS Solutions Architect certification! 🏆

The journey was challenging but incredibly rewarding. Here are my study tips for anyone preparing:

📚 Resources I used:
- AWS official documentation
- A Cloud Guru courses
- Hands-on labs (crucial!)
- Practice exams

⏰ Study schedule:
- 2 hours daily for 3 months
- Weekend lab sessions
- Weekly study group meetings

Remember: It's not just about passing the exam, but truly understanding the concepts.

#AWS #CloudComputing #CertificationJourney #NeverStopLearning`,
    publishedAt: '2025-05-10T11:30:00Z',
    url: 'https://www.linkedin.com/posts/example-5',
    media: {
      type: 'image',
      url: 'https://via.placeholder.com/800x400/FF9900/FFFFFF?text=AWS+Certified',
      thumbnailUrl: 'https://via.placeholder.com/200x100/FF9900/FFFFFF?text=AWS'
    },
    engagement: {
      likes: 754,
      comments: 52
    }
  }
];
