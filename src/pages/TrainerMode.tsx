import { useState } from 'react'
import { Users, BookOpen, Target, Star, TrendingUp, Award } from 'lucide-react'

export default function TrainerMode() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: Target }
  ]

  const mockData = {
    totalCoaches: 24,
    activeCoaches: 18,
    completedModules: 156,
    averageScore: 87,
    recentActivity: [
      { name: 'Sarah Johnson', action: 'Completed Practice Module 3', time: '2 hours ago' },
      { name: 'Mike Chen', action: 'Achieved 95% on Quiz', time: '4 hours ago' },
      { name: 'Lisa Rodriguez', action: 'Started Learning Module 2', time: '6 hours ago' },
      { name: 'David Kim', action: 'Completed Onboarding', time: '1 day ago' }
    ],
    topPerformers: [
      { name: 'Sarah Johnson', score: 95, modules: 8 },
      { name: 'Mike Chen', score: 92, modules: 7 },
      { name: 'Lisa Rodriguez', score: 89, modules: 6 }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#F5AC3A] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F5169]">
              Trainer Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Monitor coach progress and provide guidance for optimal learning outcomes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D5EDF0] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#2F5169]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F5169]">{mockData.totalCoaches}</div>
                <div className="text-sm text-gray-600">Total Coaches</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F5AC3A] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F5169]">{mockData.activeCoaches}</div>
                <div className="text-sm text-gray-600">Active This Week</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D5EDF0] rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#2F5169]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F5169]">{mockData.completedModules}</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F5AC3A] rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F5169]">{mockData.averageScore}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#D5EDF0] text-[#2F5169] border border-[#2F5169]'
                      : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {mockData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-sm font-medium">
                          {activity.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{activity.name}</div>
                        <div className="text-sm text-gray-600">{activity.action}</div>
                        <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {mockData.topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{performer.name}</div>
                          <div className="text-sm text-gray-600">{performer.modules} modules completed</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{performer.score}%</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Progress Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-[#D5EDF0] rounded-lg">
                  <div className="text-3xl font-bold text-[#2F5169] mb-2">75%</div>
                  <div className="text-gray-700">Completion Rate</div>
                </div>
                <div className="text-center p-6 bg-[#F5AC3A] rounded-lg">
                  <div className="text-3xl font-bold text-white mb-2">12.5</div>
                  <div className="text-white">Avg. Hours Spent</div>
                </div>
                <div className="text-center p-6 bg-[#D5EDF0] rounded-lg">
                  <div className="text-3xl font-bold text-[#2F5169] mb-2">4.2</div>
                  <div className="text-gray-700">Avg. Modules/Week</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Training Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'SFBT Manual', type: 'PDF', size: '2.4 MB' },
                  { title: 'Video Tutorials', type: 'Video', size: '45 min' },
                  { title: 'Practice Scenarios', type: 'Interactive', size: '15 exercises' },
                  { title: 'Assessment Tools', type: 'Tools', size: '8 tools' },
                  { title: 'Case Studies', type: 'Document', size: '12 cases' },
                  { title: 'Research Papers', type: 'Academic', size: '25 papers' }
                ].map((resource, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 mb-1">{resource.title}</div>
                    <div className="text-sm text-gray-600">{resource.type}</div>
                    <div className="text-xs text-gray-500 mt-1">{resource.size}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Assessment Overview</h3>
              <div className="space-y-4">
                {[
                  { name: 'SFBT Knowledge Quiz', participants: 24, avgScore: 87, status: 'Active' },
                  { name: 'Practice Session Evaluation', participants: 18, avgScore: 92, status: 'Active' },
                  { name: 'Final Certification Test', participants: 12, avgScore: 85, status: 'Pending' }
                ].map((assessment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{assessment.name}</div>
                      <div className="text-sm text-gray-600">{assessment.participants} participants</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{assessment.avgScore}%</div>
                      <div className="text-sm text-gray-600">Avg Score</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      assessment.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assessment.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 