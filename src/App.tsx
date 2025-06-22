import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import PracticeMode from './pages/PracticeMode'
import AIPracticeMode from './pages/AIPracticeMode'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/practice" element={
            <main className="container mx-auto px-4 py-8">
              <PracticeMode />
            </main>
          } />
          <Route path="/ai-practice" element={<AIPracticeMode />} />
          <Route path="/trainer" element={
            <main className="container mx-auto px-4 py-8">
              <TrainerMode />
            </main>
          } />
          <Route path="/learn" element={
            <main className="container mx-auto px-4 py-8">
              <LearnMode />
            </main>
          } />
          <Route path="/quiz" element={
            <main className="container mx-auto px-4 py-8">
              <QuizMode />
            </main>
          } />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App 