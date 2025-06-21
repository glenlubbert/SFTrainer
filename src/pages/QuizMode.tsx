import { useState } from 'react'
import { Brain, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react'

interface QuizQuestion {
  id: string
  scenario: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const QuizMode = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      scenario: 'Your client Sarah says: "I\'ve been trying to lose weight for years, but nothing works. I\'m so frustrated and I feel like giving up."',
      question: 'What would be the best initial response to help Sarah feel heard and understood?',
      options: [
        'I understand you\'re frustrated. Let\'s talk about what diets you\'ve tried and why they didn\'t work.',
        'It sounds like you\'ve been through a lot with your weight loss journey. What brings you here today?',
        'Don\'t give up! I have some great new diet plans that might work for you.',
        'Weight loss is really hard. What\'s your current eating plan like?'
      ],
      correctAnswer: 1,
      explanation: 'The second option shows genuine empathy and curiosity about what brings them to coaching now. It avoids problem-focused language and opens the door for them to share their current goals and hopes.',
      category: 'Rapport Building'
    },
    {
      id: '2',
      scenario: 'Your client Mike says: "I want to exercise more, but I\'m so busy with work and family. I just don\'t have time."',
      question: 'Which response best uses solution-focused language?',
      options: [
        'You need to make time for exercise. It\'s important for your health.',
        'What would it look like if you were able to fit some exercise into your busy schedule?',
        'Let\'s look at your schedule and find time for exercise.',
        'Many people struggle with finding time to exercise. What have you tried before?'
      ],
      correctAnswer: 1,
      explanation: 'The second option uses future-focused, solution-oriented language that helps the client imagine possibilities rather than focusing on the problem of being busy.',
      category: 'Goal Formation'
    },
    {
      id: '3',
      scenario: 'Your client Lisa says: "I\'m at a 3 on the scale of feeling confident about my health, where 1 is terrible and 10 is amazing."',
      question: 'What would be the best follow-up question?',
      options: [
        'Why are you only at a 3? What\'s holding you back?',
        'What would it take to get you to a 4?',
        'What tells you you\'re at a 3 and not a 2?',
        'How long have you been at a 3?'
      ],
      correctAnswer: 2,
      explanation: 'This question helps the client recognize what\'s already working and their existing resources, which builds confidence and provides clues about what they can build upon.',
      category: 'Scaling'
    },
    {
      id: '4',
      scenario: 'Your client John says: "I want to stop eating junk food when I\'m stressed."',
      question: 'How would you help John reframe this goal in positive terms?',
      options: [
        'What would you like to do instead of eating junk food when you\'re stressed?',
        'What healthy foods could you eat when you\'re stressed?',
        'How can you avoid stress so you don\'t eat junk food?',
        'What would it look like if you were managing stress in a healthy way?'
      ],
      correctAnswer: 3,
      explanation: 'This reframes the goal from stopping a behavior to starting a positive behavior, which is more motivating and solution-focused.',
      category: 'Goal Formation'
    },
    {
      id: '5',
      scenario: 'Your client Emma says: "I actually felt really good last week when I went for walks with my dog. I had more energy and wasn\'t eating as much junk food."',
      question: 'What would be the best response to build on this exception?',
      options: [
        'That\'s great! Walking is really good for you.',
        'What was different about last week that made the walks possible?',
        'You should definitely keep doing that.',
        'How often did you walk with your dog?'
      ],
      correctAnswer: 1,
      explanation: 'This question explores what made the exception possible, helping the client identify the conditions that support their success and what they can replicate.',
      category: 'Exception Finding'
    }
  ]

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString())
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return { message: 'Excellent! You have a strong understanding of SFBT principles.', color: 'text-green-600' }
    if (percentage >= 60) return { message: 'Good work! You\'re on the right track with your SFBT skills.', color: 'text-blue-600' }
    return { message: 'Keep practicing! Review the explanations and try again.', color: 'text-orange-600' }
  }

  if (quizCompleted) {
    const scoreMessage = getScoreMessage()
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-coaching-orange mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-gray-600 mb-6">Great job completing the SFBT coaching quiz</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-coaching-green mb-2">
              {score}/{quizQuestions.length}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {Math.round((score / quizQuestions.length) * 100)}% Correct
            </div>
            <p className={`text-lg font-medium ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz & Challenge Mode</h1>
        <p className="text-gray-600">
          Test your understanding of solution-focused coaching with scenario-based challenges
        </p>
      </div>

      {/* Progress */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </h2>
            <p className="text-sm text-gray-600">Category: {currentQuestion.category}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-coaching-green">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-coaching-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario:</h3>
          <div className="bg-blue-50 border-l-4 border-coaching-blue p-4 rounded-r-lg">
            <p className="text-gray-800">{currentQuestion.scenario}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question:</h3>
          <p className="text-gray-700 mb-6">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index.toString()
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                } disabled:cursor-not-allowed`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedAnswer === index.toString()
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index.toString() && (
                      index === currentQuestion.correctAnswer ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )
                    )}
                  </div>
                  <span className="text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      {selectedAnswer !== null && (
        <div className="card mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-coaching-purple" />
            <h3 className="text-lg font-semibold text-gray-900">Explanation</h3>
          </div>
          <div className="bg-purple-50 border-l-4 border-coaching-purple p-4 rounded-r-lg">
            <p className="text-gray-800">{currentQuestion.explanation}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="btn-primary flex items-center space-x-2"
          >
            <span>{isLastQuestion ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizMode 