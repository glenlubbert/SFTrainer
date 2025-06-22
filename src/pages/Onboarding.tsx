import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, Sparkles } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export default function Onboarding() {
  const navigate = useNavigate()
  const { setUserProfile } = useAppContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    background: '',
    experience: '',
    goals: '',
    preferredLearningStyle: ''
  })

  const steps = [
    {
      title: "Welcome to Stamina Lab Coach Trainer",
      subtitle: "Let's get to know you better to personalize your learning experience",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-[#D5EDF0] rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-[#2F5169]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2F5169] mb-2">Welcome!</h2>
            <p className="text-gray-600 text-lg">
              You're about to embark on a journey to master solution-focused coaching.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What's your name?",
      subtitle: "Let's start with the basics",
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field text-lg"
          />
        </div>
      )
    },
    {
      title: "What's your background?",
      subtitle: "Tell us about your professional experience",
      content: (
        <div className="space-y-4">
          <textarea
            placeholder="Describe your current role, experience level, and background in coaching or related fields..."
            value={formData.background}
            onChange={(e) => setFormData({ ...formData, background: e.target.value })}
            className="input-field text-lg resize-none"
            rows={4}
          />
        </div>
      )
    },
    {
      title: "What are your goals?",
      subtitle: "What do you hope to achieve through this training?",
      content: (
        <div className="space-y-4">
          <textarea
            placeholder="What specific skills do you want to develop? What challenges do you face in your coaching practice?"
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            className="input-field text-lg resize-none"
            rows={4}
          />
        </div>
      )
    },
    {
      title: "How do you prefer to learn?",
      subtitle: "This helps us tailor your experience",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: 'visual', label: 'Visual Learning', desc: 'Diagrams, charts, and visual aids' },
              { value: 'practical', label: 'Practical Exercises', desc: 'Hands-on practice and role-playing' },
              { value: 'theoretical', label: 'Theory & Concepts', desc: 'Deep understanding of principles' },
              { value: 'mixed', label: 'Mixed Approach', desc: 'Combination of all methods' }
            ].map((style) => (
              <button
                key={style.value}
                onClick={() => setFormData({ ...formData, preferredLearningStyle: style.value })}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  formData.preferredLearningStyle === style.value
                    ? 'border-[#2F5169] bg-[#D5EDF0]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{style.label}</div>
                <div className="text-sm text-gray-600 mt-1">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      setUserProfile(formData)
      navigate('/practice')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    if (currentStep === 0) return true
    if (currentStep === 1) return formData.name.trim() !== ''
    if (currentStep === 2) return formData.background.trim() !== ''
    if (currentStep === 3) return formData.goals.trim() !== ''
    if (currentStep === 4) return formData.preferredLearningStyle !== ''
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5EDF0] to-[#b8e0e5] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="card">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2F5169]">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#2F5169] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5169] mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {steps[currentStep].subtitle}
            </p>
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary flex items-center space-x-2"
            >
              <span>
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              </span>
              {currentStep === steps.length - 1 ? (
                <Sparkles className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 