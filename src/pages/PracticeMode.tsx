import { useState } from 'react'
import { MessageCircle, Lightbulb, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { coachingSteps, CoachingStep } from '../data/coachingSteps'
import { useAppContext } from '../context/AppContext'

const PracticeMode = () => {
  const { isTrainerMode, userProfile } = useAppContext()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [coachResponse, setCoachResponse] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showSidePanel, setShowSidePanel] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const currentStep = coachingSteps[currentStepIndex]
  const isCompleted = completedSteps.includes(currentStep.id)

  const generateFeedback = (step: CoachingStep, response: string) => {
    // This would integrate with GPT API in a real implementation
    const feedbackPrompts = isTrainerMode ? [
      "How would you teach this step to a new coach?",
      "What might confuse a new coach about this step?",
      "What are the key principles to emphasize?"
    ] : step.reflectivePrompts

    const randomPrompt = feedbackPrompts[Math.floor(Math.random() * feedbackPrompts.length)]
    
    return `Great work on Step ${step.id}: ${step.title}! 

${randomPrompt}

Your response showed good understanding of the ${step.title.toLowerCase()} phase. Remember to:
${step.coachTips.slice(0, 2).map(tip => `• ${tip}`).join('\n')}

Keep practicing and you'll continue to improve!`
  }

  const handleSubmitResponse = () => {
    if (coachResponse.trim()) {
      const newFeedback = generateFeedback(currentStep, coachResponse)
      setFeedback(newFeedback)
      if (!completedSteps.includes(currentStep.id)) {
        setCompletedSteps([...completedSteps, currentStep.id])
      }
    }
  }

  const handleNextStep = () => {
    if (currentStepIndex < coachingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setCoachResponse('')
      setFeedback('')
    }
  }

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setCoachResponse('')
      setFeedback('')
    }
  }

  const getStepStatus = (stepId: number) => {
    if (stepId === currentStep.id) return 'active'
    if (completedSteps.includes(stepId)) return 'completed'
    return 'pending'
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isTrainerMode ? 'Trainer Practice Mode' : 'Coach Practice Mode'}
        </h1>
        <p className="text-gray-600">
          Practice the 9-Step SFBT Coaching Process with simulated client scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Practice Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step Progress */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Step {currentStep.id} of 9: {currentStep.title}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSidePanel(!showSidePanel)}
                  className="btn-secondary"
                >
                  {showSidePanel ? 'Hide' : 'Show'} Tips
                </button>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-6">
              {coachingSteps.map((step) => (
                <div
                  key={step.id}
                  className={`step-indicator ${getStepStatus(step.id) === 'active' ? 'step-active' : 
                    getStepStatus(step.id) === 'completed' ? 'step-completed' : 'step-pending'}`}
                >
                  {getStepStatus(step.id) === 'completed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
              ))}
            </div>

            <p className="text-gray-700 mb-6">{currentStep.description}</p>
          </div>

          {/* Client Scenario */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-coaching-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">C</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Client (Sarah)</h3>
            </div>
            <div className="bg-blue-50 border-l-4 border-coaching-blue p-4 rounded-r-lg">
              <p className="text-gray-800">{currentStep.clientPrompt}</p>
            </div>
          </div>

          {/* Coach Response */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-coaching-green rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">Y</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Your Response</h3>
            </div>
            <textarea
              value={coachResponse}
              onChange={(e) => setCoachResponse(e.target.value)}
              placeholder="Type your coaching response here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coaching-green focus:border-transparent"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmitResponse}
                disabled={!coachResponse.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Response
              </button>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-coaching-orange" />
                <h3 className="text-lg font-semibold text-gray-900">Feedback</h3>
              </div>
              <div className="bg-yellow-50 border-l-4 border-coaching-orange p-4 rounded-r-lg">
                <p className="text-gray-800 whitespace-pre-line">{feedback}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === coachingSteps.length - 1}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side Panel */}
        {showSidePanel && (
          <div className="space-y-6">
            {/* Coach Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coach Tips</h3>
              <ul className="space-y-2">
                {currentStep.coachTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-coaching-green rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reflective Prompts */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isTrainerMode ? 'Teaching Prompts' : 'Reflective Prompts'}
              </h3>
              <ul className="space-y-2">
                {currentStep.reflectivePrompts.map((prompt, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-coaching-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed Steps:</span>
                  <span className="font-medium">{completedSteps.length}/9</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-coaching-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSteps.length / 9) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PracticeMode 