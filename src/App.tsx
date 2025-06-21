import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Onboarding from './pages/Onboarding'
import PracticeMode from './pages/PracticeMode'
import TrainerMode from './pages/TrainerMode'
import LearnMode from './pages/LearnMode'
import QuizMode from './pages/QuizMode'
import { AppContext } from './context/AppContext'

function App() {
  const [isTrainerMode, setIsTrainerMode] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: '',
    background: '',
    experience: '',
    goals: ''
  })

  return (
    <AppContext.Provider value={{ isTrainerMode, setIsTrainerMode, userProfile, setUserProfile }}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/practice" element={<PracticeMode />} />
            <Route path="/trainer" element={<TrainerMode />} />
            <Route path="/learn" element={<LearnMode />} />
            <Route path="/quiz" element={<QuizMode />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  )
}

export default App 