import { useState } from 'react'
import { Search, BookOpen, Filter, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

interface KnowledgeItem {
  id: string
  title: string
  category: string
  tags: string[]
  content: string
  examples: string[]
}

const LearnMode = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const knowledgeBase: KnowledgeItem[] = [
    {
      id: 'scaling-questions',
      title: 'Scaling Questions',
      category: 'Techniques',
      tags: ['scaling', 'assessment', 'progress'],
      content: 'Scaling questions help clients assess their current situation and progress on a scale of 1-10. They are powerful tools for measuring change and identifying what\'s already working.',
      examples: [
        'On a scale of 1-10, where 1 is "I have no energy" and 10 is "I feel great," where are you today?',
        'What would it take to move from a 4 to a 5?',
        'What tells you you\'re at a 4 and not a 3?'
      ]
    },
    {
      id: 'exception-finding',
      title: 'Finding Exceptions',
      category: 'Techniques',
      tags: ['exceptions', 'strengths', 'resources'],
      content: 'Exception finding involves looking for times when the problem is less present or when things are going better. These exceptions provide clues about what works and can be built upon.',
      examples: [
        'When was the last time you felt more confident about your health?',
        'What was different about that day?',
        'What were you doing that helped you feel better?'
      ]
    },
    {
      id: 'goal-formation',
      title: 'Goal Formation',
      category: 'Process',
      tags: ['goals', 'planning', 'outcomes'],
      content: 'Effective goal formation involves helping clients articulate specific, achievable, and meaningful goals. Goals should be stated in positive terms and be within the client\'s control.',
      examples: [
        'What would you like to see happening in your life that would tell you this coaching is working?',
        'What would be a small step toward that goal?',
        'How would you know you\'ve achieved this goal?'
      ]
    },
    {
      id: 'coping-questions',
      title: 'Coping Questions',
      category: 'Techniques',
      tags: ['coping', 'resilience', 'strengths'],
      content: 'Coping questions help clients recognize their existing resources and resilience. They explore how clients have managed difficult situations in the past.',
      examples: [
        'How have you managed to keep going despite these challenges?',
        'What has helped you get through difficult times before?',
        'What do you know about yourself that tells you you can handle this?'
      ]
    },
    {
      id: 'miracle-question',
      title: 'The Miracle Question',
      category: 'Techniques',
      tags: ['miracle', 'future', 'vision'],
      content: 'The miracle question helps clients imagine a future where their problem is solved and identify specific changes they would notice. It\'s a powerful tool for goal clarification.',
      examples: [
        'Suppose tonight, while you\'re sleeping, a miracle happens and your problem is solved. What would you notice tomorrow that would tell you the miracle happened?',
        'What would be the first small sign that things are getting better?',
        'Who else would notice the change?'
      ]
    },
    {
      id: 'rapport-building',
      title: 'Building Rapport',
      category: 'Foundation',
      tags: ['rapport', 'relationship', 'trust'],
      content: 'Building rapport is essential for effective coaching. It involves creating a safe, supportive environment where clients feel heard and understood.',
      examples: [
        'Use warm, welcoming language',
        'Show genuine curiosity about their situation',
        'Match their energy and pace',
        'Validate their experiences and feelings'
      ]
    }
  ]

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'Techniques', label: 'Techniques' },
    { id: 'Process', label: 'Process' },
    { id: 'Foundation', label: 'Foundation' }
  ]

  const filteredItems = knowledgeBase.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isExpanded = (itemId: string) => expandedItems.includes(itemId)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn Mode</h1>
        <p className="text-gray-600">
          Explore the knowledge base and deepen your understanding of solution-focused coaching
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coaching-green focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-coaching-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{item.content}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isExpanded(item.id) && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                          <Lightbulb className="w-4 h-4 text-coaching-orange" />
                          <span>Examples</span>
                        </h4>
                        <ul className="space-y-2">
                          {item.examples.map((example, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-coaching-orange rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {isExpanded(item.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-coaching-green mb-1">{knowledgeBase.length}</div>
          <div className="text-gray-600">Knowledge Articles</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-coaching-blue mb-1">{categories.length - 1}</div>
          <div className="text-gray-600">Categories</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-coaching-purple mb-1">{filteredItems.length}</div>
          <div className="text-gray-600">Results Found</div>
        </div>
      </div>
    </div>
  )
}

export default LearnMode 