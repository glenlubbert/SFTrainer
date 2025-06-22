import { useState } from 'react'
import { BookOpen, Target, Users, Brain, CheckCircle } from 'lucide-react'

export default function LearnMode() {
  const [activeModule, setActiveModule] = useState('overview')

  const learningModules = [
    {
      id: 'overview',
      title: 'SFBT Overview',
      icon: BookOpen,
      description: 'Core principles and philosophy of Solution-Focused Brief Therapy',
      content: (
        <div className="space-y-6">
          <div className="bg-[#D5EDF0] border border-[#2F5169] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#2F5169] mb-4">What is SFBT?</h3>
            <p className="text-[#2F5169] leading-relaxed">
              Solution-Focused Brief Therapy (SFBT) is a goal-directed collaborative approach to psychotherapeutic change 
              that is conducted through direct observation of clients' responses to a series of precisely constructed questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-3">Key Principles</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Focus on solutions, not problems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Client is the expert on their life</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Change is constant and inevitable</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Small changes lead to bigger changes</span>
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-3">Core Techniques</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Miracle Question</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Scaling Questions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Exception Finding</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Coping Questions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'techniques',
      title: 'Core Techniques',
      icon: Target,
      description: 'Master the essential SFBT techniques and questions',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Miracle Question</h3>
              <p className="text-gray-700 mb-4">
                "Suppose that one night, while you were asleep, there was a miracle and this problem was solved. 
                How would you know? What would be different?"
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Purpose:</h4>
                <p className="text-yellow-800 text-sm">
                  Helps clients imagine a future without their problem and identify specific, observable changes.
                </p>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scaling Questions</h3>
              <p className="text-gray-700 mb-4">
                "On a scale of 1-10, where 1 is the worst it's ever been and 10 is where you want to be, 
                where are you today?"
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Purpose:</h4>
                <p className="text-yellow-800 text-sm">
                  Measures progress, motivation, and helps clients identify what's already working.
                </p>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Exception Finding</h3>
              <p className="text-gray-700 mb-4">
                "When was the last time you felt a little bit better? What was different about that time?"
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Purpose:</h4>
                <p className="text-yellow-800 text-sm">
                  Discovers times when the problem doesn't occur and identifies existing resources.
                </p>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Coping Questions</h3>
              <p className="text-gray-700 mb-4">
                "How have you managed to keep going despite these difficulties?"
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Purpose:</h4>
                <p className="text-yellow-800 text-sm">
                  Acknowledges client's resilience and helps them recognize their existing strengths.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'coaching-process',
      title: '9-Step Process',
      icon: Users,
      description: 'Learn the structured 9-step SFBT coaching process',
      content: (
        <div className="space-y-6">
          <div className="bg-[#F5AC3A] border border-[#F5AC3A] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">The 9-Step SFBT Process</h3>
            <p className="text-white">
              This structured approach guides coaches through a complete solution-focused session, 
              from initial rapport building to goal setting and progress tracking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: 1, title: "How Can I Help You?", desc: "Open with warm, inviting questions" },
              { step: 2, title: "Hear What the Client Wants", desc: "Listen actively for desired outcomes" },
              { step: 3, title: "Check It Out", desc: "Clarify and explore their goals" },
              { step: 4, title: "Goal Formation", desc: "Help formulate clear, specific goals" },
              { step: 5, title: "Scaling & Coping", desc: "Assess progress and explore coping" },
              { step: 6, title: "Exceptions", desc: "Find times when problems are less present" },
              { step: 7, title: "Next Step", desc: "Identify concrete next actions" },
              { step: 8, title: "24-Hour Goal", desc: "Set immediate, specific goals" },
              { step: 9, title: "Feedback", desc: "Provide supportive, strength-based feedback" }
            ].map((item) => (
              <div key={item.step} className="card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-[#D5EDF0] rounded-full flex items-center justify-center">
                    <span className="text-[#2F5169] font-semibold text-sm">{item.step}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                </div>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: Brain,
      description: 'Essential tips and common pitfalls to avoid',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Do's</h3>
              <ul className="space-y-3">
                {[
                  "Focus on the client's strengths and resources",
                  "Ask about exceptions and times when things work better",
                  "Use scaling questions to measure progress",
                  "Help clients set specific, achievable goals",
                  "Acknowledge and validate their experiences",
                  "Stay curious and avoid giving advice"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Don'ts</h3>
              <ul className="space-y-3">
                {[
                  "Don't focus on problems or past failures",
                  "Don't give advice or tell clients what to do",
                  "Don't analyze or interpret their situation",
                  "Don't rush to solutions without understanding goals",
                  "Don't ignore their existing resources and strengths",
                  "Don't use problem-focused language"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">✕</div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="card bg-purple-50 border-purple-200">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">Language Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Instead of:</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• "Why do you think that happened?"</li>
                  <li>• "What's wrong with your current approach?"</li>
                  <li>• "You need to change your behavior"</li>
                  <li>• "Let's analyze your problem"</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Try:</h4>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• "What would you like to be different?"</li>
                  <li>• "What's working well for you?"</li>
                  <li>• "What would success look like for you?"</li>
                  <li>• "Let's explore your goals"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const currentModule = learningModules.find(module => module.id === activeModule)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#D5EDF0] rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#2F5169]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5169]">
              Learn SFBT
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Master the principles and techniques of Solution-Focused Brief Therapy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Learning Modules</h3>
              <div className="space-y-2">
                {learningModules.map((module) => {
                  const Icon = module.icon
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeModule === module.id
                          ? 'bg-[#D5EDF0] text-[#2F5169] border border-[#2F5169]'
                          : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {module.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                {currentModule && (
                  <>
                    <div className="w-10 h-10 bg-[#D5EDF0] rounded-lg flex items-center justify-center">
                      <currentModule.icon className="w-6 h-6 text-[#2F5169]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#2F5169]">
                        {currentModule.title}
                      </h2>
                      <p className="text-gray-600">{currentModule.description}</p>
                    </div>
                  </>
                )}
              </div>
              
              {currentModule && currentModule.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 