# 🧠 Stamina Lab Coach Trainer App

An interactive web application for training health coaches in the **solution-focused brief therapy (SFBT)** approach. This app provides structured conversation flows, real-time feedback, roleplay practice, and embedded teaching content.

## ✨ Features

### 🟢 Onboarding
- Warm, personalized welcome experience
- Background and experience assessment
- Learning goals identification
- Customized learning path setup

### 🧪 Coach Practice Mode
- **9-Step SFBT Coaching Process** simulation
- Real-time client scenarios with AI-generated responses
- Step-by-step guidance with coach tips
- Reflective prompts and feedback
- Progress tracking through all coaching steps

### 🎓 Trainer Mode
- Specialized tools for teaching and supervising coaches
- Group learning activities and exercises
- Teaching resources and assessment criteria
- Training scenarios with key teaching points
- Enhanced feedback focused on teaching principles

### 📚 Learn Mode
- Comprehensive knowledge base browsing
- Search and filter functionality
- Expandable explanations with real-world examples
- Categorized content (Techniques, Process, Foundation)
- Interactive learning resources

### 🧠 Quiz & Challenge Mode
- Scenario-based challenges
- Multiple choice questions with explanations
- Instant feedback and scoring
- Progress tracking and performance assessment
- Retake functionality for continued learning

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stamina-lab-coach-trainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to access the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx   # Main navigation component
├── context/            # React context for state management
│   └── AppContext.tsx  # Global app state
├── data/               # Static data and configurations
│   └── coachingSteps.ts # 9-step SFBT process data
├── pages/              # Main application pages
│   ├── Onboarding.tsx  # Welcome and setup page
│   ├── PracticeMode.tsx # Interactive coaching practice
│   ├── TrainerMode.tsx # Trainer-specific tools
│   ├── LearnMode.tsx   # Knowledge base browser
│   └── QuizMode.tsx    # Assessment and challenges
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 9-Step SFBT Coaching Process

The app follows the structured 9-step solution-focused brief therapy process:

1. **How Can I Help You?** - Open with warm, inviting questions
2. **Hear What the Client Wants** - Listen actively and reflect desires
3. **Check It Out** - Clarify and explore goals
4. **Goal Formation** - Help formulate clear, achievable goals
5. **Scaling & Coping** - Use scaling questions and explore coping strategies
6. **Exceptions** - Find times when problems are less present
7. **Next Step** - Identify small, concrete next steps
8. **24-Hour Goal** - Set specific immediate goals
9. **Feedback** - Provide supportive, strengths-based feedback

## 🎨 Design System

The app uses a consistent design system with:

- **Primary Colors**: Green (#10b981) for success and progress
- **Secondary Colors**: Blue (#3b82f6) for information, Purple (#8b5cf6) for trainer mode
- **Typography**: Inter font family for clean, professional appearance
- **Components**: Reusable card, button, and form components
- **Animations**: Subtle transitions and hover effects

## 🔧 Customization

### Adding New Coaching Steps
Edit `src/data/coachingSteps.ts` to add or modify coaching steps:

```typescript
{
  id: 10,
  title: "New Step Title",
  description: "Step description...",
  clientPrompt: "Client scenario text...",
  coachTips: ["Tip 1", "Tip 2"],
  reflectivePrompts: ["Prompt 1", "Prompt 2"]
}
```

### Adding Knowledge Base Content
Edit the `knowledgeBase` array in `src/pages/LearnMode.tsx`:

```typescript
{
  id: 'new-topic',
  title: 'Topic Title',
  category: 'Techniques',
  tags: ['tag1', 'tag2'],
  content: 'Content description...',
  examples: ['Example 1', 'Example 2']
}
```

### Adding Quiz Questions
Edit the `quizQuestions` array in `src/pages/QuizMode.tsx`:

```typescript
{
  id: '6',
  scenario: 'Client scenario...',
  question: 'Question text...',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 1,
  explanation: 'Explanation text...',
  category: 'Category Name'
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Based on solution-focused brief therapy principles
- Designed for health coaching education and training
- Built with modern web technologies for optimal user experience

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository. 