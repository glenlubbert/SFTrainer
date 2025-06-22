import { useState } from 'react'
import { Lightbulb, ChevronLeft, ChevronRight, CheckCircle, MessageSquare } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { coachingSteps } from '../data/coachingSteps'

export default function PracticeMode() {
  const { isTrainerMode } = useAppContext()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [userResponse, setUserResponse] = useState('')
  const [feedback, setFeedback] = useState('')

  const currentStep = coachingSteps[currentStepIndex]

  const generateFeedback = () => {
    // Simulated feedback generation
    const feedbackOptions = [
      "Great approach! You're focusing on the client's strengths.",
      "Consider asking more open-ended questions to explore possibilities.",
      "Excellent use of scaling questions to measure progress.",
      "Try to avoid problem-focused questions and stay solution-focused.",
      "Good use of the miracle question technique!",
      "Remember to acknowledge the client's progress and achievements."
    ]
    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
  }

  const handleSubmitResponse = () => {
    if (userResponse.trim()) {
      const newFeedback = generateFeedback()
      setFeedback(newFeedback)
      if (!completedSteps.includes(currentStep.id.toString())) {
        setCompletedSteps([...completedSteps, currentStep.id.toString()])
      }
    }
  }

  const handleNextStep = () => {
    if (currentStepIndex < coachingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setUserResponse('')
      setFeedback('')
    }
  }

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setUserResponse('')
      setFeedback('')
    }
  }

  const progressPercentage = (completedSteps.length / coachingSteps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5169]">
              Practice Mode
            </h1>
            {isTrainerMode && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-[#F5AC3A] text-white rounded-full text-sm font-medium">
                <Lightbulb className="w-4 h-4" />
                <span>Trainer Mode</span>
              </div>
            )}
          </div>
          
          {/* Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2F5169]">
                Progress: {completedSteps.length} of {coachingSteps.length} steps
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#2F5169] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Practice Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Step */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Step {currentStepIndex + 1}: {currentStep.title}
                </h2>
                <div className="flex items-center space-x-2">
                  {completedSteps.includes(currentStep.id.toString()) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Client Scenario */}
              <div className="bg-[#D5EDF0] border border-[#2F5169] rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#2F5169] mb-2">Client Scenario:</h3>
                <p className="text-[#2F5169]">{currentStep.clientPrompt}</p>
              </div>

              {/* Response Area */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Coaching Response:
                </label>
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your coaching response here..."
                  className="input-field resize-none"
                  rows={6}
                />
                <button
                  onClick={handleSubmitResponse}
                  disabled={!userResponse.trim()}
                  className="btn-primary w-full sm:w-auto"
                >
                  Get Feedback
                </button>
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="card bg-green-50 border-green-200">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Feedback:</h3>
                    <p className="text-green-800">{feedback}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Step Navigation */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Step Navigation</h3>
              <div className="space-y-2">
                {coachingSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentStepIndex
                        ? 'bg-[#D5EDF0] text-[#2F5169] border border-[#2F5169]'
                        : completedSteps.includes(step.id.toString())
                        ? 'bg-[#F5AC3A] text-white border border-[#F5AC3A]'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Step {index + 1}</span>
                      {completedSteps.includes(step.id.toString()) && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm mt-1 truncate">{step.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStepIndex === 0}
                  className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === coachingSteps.length - 1}
                  className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 