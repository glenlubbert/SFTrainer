import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, BookOpen } from 'lucide-react';
import Logo from '../components/Logo';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5EDF0] to-[#b8e0e5] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="card text-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Logo size="lg" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5169]">Coach Trainer</h1>
            <p className="text-gray-700 text-lg">Get started on your solution-focused coaching journey. Choose an action below:</p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="btn-primary flex items-center justify-center space-x-2 w-full"
              onClick={() => navigate('/practice')}
            >
              <span>Start Practice</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="btn-secondary flex items-center justify-center space-x-2 w-full"
              onClick={() => navigate('/learn')}
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn About SFBT</span>
            </button>
            <button
              className="btn-outline flex items-center justify-center space-x-2 w-full"
              onClick={() => navigate('/trainer')}
            >
              <Target className="w-5 h-5" />
              <span>Trainer Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 