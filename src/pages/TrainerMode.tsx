import { useState } from 'react'
import { Users, BookOpen, Target, Brain, Star } from 'lucide-react'

export default function TrainerMode() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'activities', label: 'Group Activities', icon: Target },
    { id: 'resources', label: 'Teaching Resources', icon: BookOpen },
    { id: 'scenarios', label: 'Training Scenarios', icon: Brain },
  ]

  const groupActivities = [
    {
      title: "Best Response Selection",
      description: "Have coaches choose the best response from multiple options",
      duration: "15-20 minutes",
      participants: "3-8 coaches",
      instructions: [
        "Present a client scenario",
        "Show 3-4 different coach responses",
        "Have coaches discuss and vote on the best response",
        "Facilitate discussion about why certain responses work better"
      ]
    },
    {
      title: "Scenario Sorting",
      description: "Sort coaching scenarios by SFBT step",
      duration: "20-25 minutes",
      participants: "4-10 coaches",
      instructions: [
        "Provide 10-15 different client statements",
        "Have coaches sort them into the appropriate SFBT step",
        "Discuss any disagreements and reasoning",
        "Explore how the same statement might fit multiple steps"
      ]
    },
    {
      title: "Role Play Feedback",
      description: "Structured feedback sessions for role play practice",
      duration: "30-45 minutes",
      participants: "3-6 coaches",
      instructions: [
        "One coach practices with a simulated client",
        "Other coaches observe and take notes",
        "Use structured feedback form",
        "Focus on strengths and one area for improvement"
      ]
    }
  ]

  const teachingResources = [
    {
      title: "SFBT Core Principles",
      content: "Focus on what's working, build on exceptions, keep goals small and specific, use scaling questions, and maintain a future-focused orientation."
    },
    {
      title: "Common Teaching Challenges",
      content: "Coaches often struggle with: avoiding problem-talk, keeping goals small enough, using scaling effectively, and building on exceptions rather than focusing on problems."
    },
    {
      title: "Assessment Criteria",
      content: "Evaluate coaches on: warmth and rapport building, active listening, goal clarification, exception finding, scaling usage, and solution-focused language."
    }
  ]

  const trainingScenarios = [
    {
      title: "The Overwhelmed Client",
      description: "Client feels stuck and overwhelmed by multiple issues",
      keyPoints: ["Help them identify one small goal", "Use scaling to break down overwhelm", "Find exceptions to build on"]
    },
    {
      title: "The Resistant Client",
      description: "Client seems resistant to change or coaching",
      keyPoints: ["Validate their perspective", "Find what they do want", "Use their language and concerns"]
    },
    {
      title: "The Perfectionist Client",
      description: "Client sets unrealistic goals and gets discouraged",
      keyPoints: ["Help them set smaller, achievable goals", "Focus on progress over perfection", "Celebrate small wins"]
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Trainer Mode</h3>
              <p className="text-gray-700 mb-4">
                As a trainer or supervisor, you have access to specialized tools and resources to help you 
                effectively teach and support other coaches in learning the solution-focused approach.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Star className="w-8 h-8 text-coaching-green mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Enhanced Feedback</h4>
                  <p className="text-sm text-gray-600">Teaching-focused prompts and assessment criteria</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-coaching-blue mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Group Activities</h4>
                  <p className="text-sm text-gray-600">Structured exercises for group learning</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-coaching-purple mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Teaching Resources</h4>
                  <p className="text-sm text-gray-600">Core principles and common challenges</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Teaching Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-coaching-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium text-gray-900">Start with strengths:</span>
                    <span className="text-gray-700"> Always acknowledge what coaches are doing well before suggesting improvements.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-coaching-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium text-gray-900">Use specific examples:</span>
                    <span className="text-gray-700"> Reference specific moments in their practice when giving feedback.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-coaching-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium text-gray-900">Focus on one area at a time:</span>
                    <span className="text-gray-700"> Don't overwhelm with too many suggestions at once.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-coaching-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium text-gray-900">Model the approach:</span>
                    <span className="text-gray-700"> Use solution-focused language and techniques in your own teaching.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )

      case 'activities':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Learning Activities</h3>
              <p className="text-gray-700 mb-6">
                These structured activities are designed for group learning and can be used in training sessions, 
                supervision groups, or continuing education workshops.
              </p>
            </div>

            {groupActivities.map((activity, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{activity.title}</h4>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{activity.duration}</div>
                    <div>{activity.participants}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Instructions:</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                    {activity.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        )

      case 'resources':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Teaching Resources</h3>
              <p className="text-gray-700 mb-6">
                Key concepts and principles to emphasize when teaching the solution-focused approach to health coaching.
              </p>
            </div>

            {teachingResources.map((resource, index) => (
              <div key={index} className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{resource.title}</h4>
                <p className="text-gray-700">{resource.content}</p>
              </div>
            ))}
          </div>
        )

      case 'scenarios':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Scenarios</h3>
              <p className="text-gray-700 mb-6">
                Common client scenarios that coaches encounter, with key teaching points for each.
              </p>
            </div>

            {trainingScenarios.map((scenario, index) => (
              <div key={index} className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h4>
                <p className="text-gray-600 mb-4">{scenario.description}</p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Key Teaching Points:</h5>
                  <ul className="space-y-1">
                    {scenario.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-coaching-blue rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trainer Mode</h1>
        <p className="text-gray-600">
          Specialized tools and resources for teaching and supervising other coaches
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-coaching-purple text-coaching-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
} 