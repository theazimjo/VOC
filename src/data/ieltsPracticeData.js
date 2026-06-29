// ============================================================================
// IELTS Practice Data — Topics and variants for individual sections
// ============================================================================

export const PRACTICE_WRITING_TOPICS = {
  task1: [
    {
      id: 'w_t1_1',
      title: 'Technology in Education (Bar Chart)',
      prompt: 'The chart below shows the percentage of schools using different types of digital technologies in education between 2015 and 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
      chartData: {
        xAxisLabel: 'Years',
        yAxisLabel: 'Percentage (%) of Schools',
        categories: ['2015', '2019', '2023'],
        series: [
          { label: 'Smartboards', values: [15, 55, 92] },
          { label: 'Tablets', values: [8, 38, 76] },
          { label: 'Virtual VR Kits', values: [2, 10, 35] }
        ]
      }
    },
    {
      id: 'w_t1_2',
      title: 'Global Energy Source Consumption (Pie Chart Comparison)',
      prompt: 'The chart below shows the share of global energy consumption by source in 2000 compared to 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
      chartData: {
        xAxisLabel: 'Energy Sources',
        yAxisLabel: 'Share Percentage (%)',
        categories: ['Oil', 'Coal', 'Gas', 'Renewables'],
        series: [
          { label: 'Year 2000', values: [40, 32, 22, 6] },
          { label: 'Year 2020', values: [31, 26, 23, 20] }
        ]
      }
    },
    {
      id: 'w_t1_3',
      title: 'Global Fresh Water Consumption (Line Graph)',
      prompt: 'The chart below shows the global freshwater use by sectors (Agriculture, Industry, Domestic) between 1980 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
      chartData: {
        xAxisLabel: 'Sectors',
        yAxisLabel: 'Water Use (km³ per year)',
        categories: ['Agriculture', 'Industry', 'Domestic'],
        series: [
          { label: '1980', values: [2100, 650, 250] },
          { label: '2000', values: [2800, 780, 380] },
          { label: '2020', values: [3400, 920, 500] }
        ]
      }
    }
  ],
  task2: [
    {
      id: 'w_t2_1',
      title: 'Technology and Social Connections',
      fullPrompt: 'Some people believe that technology has made education more accessible and effective, while others argue that it has created new problems such as digital addiction and reduced face-to-face interaction. Discuss both views and give your own opinion.',
      minWords: 250
    },
    {
      id: 'w_t2_2',
      title: 'Climate Change and Individual Responsibility',
      fullPrompt: 'Many scientists believe that climate change is the greatest threat to humanity. Some argue that governments should take primary responsibility for dealing with it, while others believe that individuals should change their lifestyles. Discuss both views and give your opinion.',
      minWords: 250
    },
    {
      id: 'w_t2_3',
      title: 'Higher Education vs Practical Training',
      fullPrompt: 'Today, more and more school-leavers choose to enter university. However, some people believe that it is better for them to pursue practical vocational training or start working directly. Discuss both views and give your opinion.',
      minWords: 250
    },
    {
      id: 'w_t2_4',
      title: 'Impact of Remote Working',
      fullPrompt: 'Working from home has become increasingly popular in many businesses. While this offers greater flexibility and reduces commuting times, some argue it harms teamwork and leads to isolation. Do the advantages of remote working outweigh the disadvantages?',
      minWords: 250
    }
  ]
};

export const PRACTICE_SPEAKING_TOPICS = [
  {
    id: 's_topic_1',
    title: 'Tourism and Travel Experience',
    part1: {
      questions: [
        'What is your full name?',
        'Do you prefer travelling alone or with friends?',
        'What is the most beautiful place you have visited in your country?',
        'What kinds of places do you enjoy visiting most?'
      ]
    },
    part2: {
      cueCard: {
        topic: 'Describe a memorable journey you have taken',
        points: [
          'Where you went',
          'When you went there',
          'Who you went with',
          'And explain why it was memorable'
        ]
      },
      followUp: 'Would you recommend this journey to other people?'
    },
    part3: {
      questions: [
        'How has the way people travel changed in recent decades?',
        'What are the advantages and disadvantages of international tourism?',
        'Do you think governments should do more to promote eco-tourism?',
        'In what ways can travellers protect the environment of the places they visit?'
      ]
    }
  },
  {
    id: 's_topic_2',
    title: 'Technology and Daily Life',
    part1: {
      questions: [
        'How often do you use computers or smartphones?',
        'What is your favorite website or app, and why?',
        'Do you think children spend too much time on digital devices?',
        'What technology could you not live without?'
      ]
    },
    part2: {
      cueCard: {
        topic: 'Describe a piece of technology you find extremely useful',
        points: [
          'What it is',
          'How long you have used it',
          'What you use it for',
          'And explain why you find it so useful'
        ]
      },
      followUp: 'Is this technology popular among your friends?'
    },
    part3: {
      questions: [
        'How has technology changed the way people communicate?',
        'Do you think artificial intelligence will replace humans in many jobs?',
        'What are the security risks associated with sharing personal data online?',
        'How can older generations be helped to adapt to modern technology?'
      ]
    }
  },
  {
    id: 's_topic_3',
    title: 'Sports and Healthy Lifestyle',
    part1: {
      questions: [
        'Do you play any sports or do physical exercises?',
        'What is the most popular sport in your country?',
        'Did you enjoy physical education classes at school?',
        'How do you stay healthy?'
      ]
    },
    part2: {
      cueCard: {
        topic: 'Describe a healthy habit you have recently started',
        points: [
          'What the habit is',
          'Why you decided to start it',
          'How easy or difficult it is to maintain',
          'And explain how it has improved your health'
        ]
      },
      followUp: 'Have you told anyone else about this habit?'
    },
    part3: {
      questions: [
        'Why do some people find it difficult to maintain a healthy lifestyle?',
        'What role should schools play in encouraging students to be active?',
        'Do you think professional athletes are paid too much money?',
        'Should governments tax unhealthy foods to discourage consumption?'
      ]
    }
  }
];

export const PRACTICE_READING_PASSAGES = [
  {
    id: 'r_pass_1',
    title: 'The Rise of Smart Cities',
    text: 'A smart city is a framework, predominantly composed of Information and Communication Technologies (ICT), to develop, deploy, and promote sustainable development practices to address growing urbanization challenges.\n\nCitizens engage with smart city ecosystems in various ways using smartphones and mobile devices. Pairing devices and data with a city’s physical infrastructure and services cuts costs and improves sustainability. Communities can improve energy distribution, streamline trash collection, decrease traffic congestion, and improve air quality with help from IoT technologies.\n\nFor example, smart traffic lights can receive data from sensors and adjust timing dynamically to reduce wait times at empty intersections. Smart parking systems can notify drivers when a space opens up, reducing the time spent circling blocks and decreasing emissions.',
    questions: [
      {
        id: 1,
        type: 'choice',
        text: 'What is the primary technology used to build smart cities?',
        options: ['A) Information and Communication Technologies', 'B) Traditional manufacturing systems', 'C) Fossil fuel energy networks', 'D) Heavy mechanical construction'],
        answer: 'A'
      },
      {
        id: 2,
        type: 'tfng',
        text: 'Smart parking systems increase traffic congestion.',
        answer: 'FALSE'
      },
      {
        id: 3,
        type: 'gap_fill',
        text: 'Smart traffic lights can adjust timing dynamically based on information received from ___ .',
        answer: 'sensors'
      }
    ]
  },
  {
    id: 'r_pass_2',
    title: 'The History of Photography',
    text: 'The word photography comes from two Greek words: "phos" meaning light, and "graphē" meaning drawing. Literally, it means drawing with light. The concept of photography has been around since antiquity, with the camera obscura used by artists to project images onto walls.\n\nHowever, it was not until the early 19th century that scientists succeeded in capturing and preserving these projected images. Joseph Nicéphore Niépce produced the first permanent photograph in 1826, using a pewter plate coated with bitumen. This process required an exposure time of eight hours in bright sunlight.\n\nLater, Louis Daguerre developed the daguerreotype, which reduced exposure time to minutes and created sharp, detailed images. The commercial success of the daguerreotype quickly spread throughout Europe and America, marking the birth of modern photography.',
    questions: [
      {
        id: 1,
        type: 'choice',
        text: 'Who created the first permanent photograph?',
        options: ['A) Louis Daguerre', 'B) Joseph Nicéphore Niépce', 'C) William Henry Fox Talbot', 'D) John Herschel'],
        answer: 'B'
      },
      {
        id: 2,
        type: 'tfng',
        text: 'The first photograph required an exposure time of eight hours.',
        answer: 'TRUE'
      },
      {
        id: 3,
        type: 'gap_fill',
        text: 'The daguerreotype was successful because it significantly reduced the ___ required.',
        answer: 'exposure time'
      }
    ]
  }
];
