import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, Sparkles } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Onboarding = () => {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    setUserProfile(formData)
    navigate('/practice')
  }

  const steps = [
    {
      title: "Welcome to Stamina Lab Coach Trainer!",
      subtitle: "We're excited to help you master the solution-focused approach to health coaching.",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-coaching-green to-coaching-blue rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Coaching Journey
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You're about to embark on a transformative learning experience that will help you become a more effective, 
              solution-focused health coach. Our interactive platform combines proven SFBT techniques with real-time 
              practice and feedback.
            </p>
          </div>
          <button
            onClick={() => setCurrentStep(2)}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <span>Let's Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )
    },
    {
      title: "Tell Us About Yourself",
      subtitle: "This helps us personalize your learning experience.",
      content: (
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coaching-green focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Can you tell me a bit about your background and what brings you to learn about solution-focused health coaching?
            </label>
            <textarea
              value={formData.background}
              onChange={(e) => handleInputChange('background', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coaching-green focus:border-transparent"
              placeholder="Share your background, current role, and what interests you about SFBT coaching..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your current experience level with coaching?
            </label>
            <select
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coaching-green focus:border-transparent"
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner - New to coaching</option>
              <option value="intermediate">Intermediate - Some coaching experience</option>
              <option value="advanced">Advanced - Experienced coach</option>
              <option value="trainer">Trainer/Supervisor - Teaching others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are your learning goals?
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coaching-green focus:border-transparent"
              placeholder="What specific skills or knowledge do you hope to gain?"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.background}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Start Learning</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-4xl">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">
              {currentStepData.subtitle}
            </p>
          </div>
          
          {currentStepData.content}
        </div>
      </div>
    </div>
  )
}

export default Onboarding 