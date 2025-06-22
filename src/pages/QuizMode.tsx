import { useState } from 'react'
import { Brain, ArrowRight, Trophy } from 'lucide-react'

export default function QuizMode() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizQuestions = [
    {
      question: "What is the primary focus of Solution-Focused Brief Therapy (SFBT)?",
      options: [
        "Analyzing past problems in detail",
        "Exploring future possibilities and solutions",
        "Identifying root causes of issues",
        "Providing expert advice and solutions"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is a key principle of SFBT?",
      options: [
        "The problem is the problem",
        "The client is the expert on their life",
        "The coach should provide solutions",
        "Focus on what's wrong and fix it"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the 'miracle question' designed to do?",
      options: [
        "Help clients imagine a future without their problem",
        "Identify what caused their current problem",
        "Determine if they're ready for change",
        "Assess their current level of motivation"
      ],
      correctAnswer: 0
    },
    {
      question: "In SFBT, what are 'exceptions'?",
      options: [
        "Times when the client failed to achieve their goals",
        "Situations where the problem doesn't occur or is less severe",
        "Occasions when the coach provides direct advice",
        "Moments when the client resists change"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of scaling questions in SFBT?",
      options: [
        "To measure the client's intelligence level",
        "To assess progress and motivation on a scale",
        "To determine the severity of their problem",
        "To rank their problems in order of importance"
      ],
      correctAnswer: 1
    }
  ]

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString())
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (parseInt(selectedAnswer) === currentQuestion.correctAnswer) {
        setScore(score + 1)
      }
      
      if (isLastQuestion) {
        setQuizCompleted(true)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      }
    }
  }

  const handleRestartQuiz = () => {
    setSelectedAnswer(null)
    setScore(0)
    setCurrentQuestionIndex(0)
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return "Excellent! You have a strong understanding of SFBT principles."
    if (percentage >= 60) return "Good job! You're on the right track with SFBT concepts."
    if (percentage >= 40) return "Not bad! Keep learning and practicing SFBT techniques."
    return "Keep studying! Review the SFBT principles and try again."
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="card text-center">
            <div className="w-20 h-20 bg-[#F5AC3A] rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-[#2F5169] mb-4">Quiz Complete!</h1>
            
            <div className="bg-[#D5EDF0] rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-[#2F5169] mb-2">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-lg text-[#2F5169]">
                {Math.round((score / quizQuestions.length) * 100)}% Score
              </div>
            </div>
            
            <p className="text-gray-700 text-lg mb-8">
              {getScoreMessage()}
            </p>
            
            <button
              onClick={handleRestartQuiz}
              className="btn-primary"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#D5EDF0] rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-[#2F5169]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5169]">
              SFBT Knowledge Quiz
            </h1>
          </div>
          
          {/* Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2F5169]">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-500">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#2F5169] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>
          
          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index.toString()
                    ? 'border-[#2F5169] bg-[#D5EDF0]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index.toString()
                      ? 'border-[#2F5169] bg-[#2F5169]'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index.toString() && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 