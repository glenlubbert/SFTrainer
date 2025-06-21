import { Link, useLocation } from 'react-router-dom'
import { Brain, BookOpen, GraduationCap, Target, Users } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Navigation = () => {
  const location = useLocation()
  const { isTrainerMode, setIsTrainerMode } = useAppContext()

  const navItems = [
    { path: '/practice', label: 'Practice', icon: Target },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/quiz', label: 'Quiz', icon: Brain },
    { path: '/trainer', label: 'Trainer', icon: GraduationCap },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-coaching-green" />
            <span className="text-xl font-bold text-gray-900">Stamina Lab Coach Trainer</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-coaching-green text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTrainerMode(!isTrainerMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isTrainerMode
                  ? 'bg-coaching-purple text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Trainer Mode</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 