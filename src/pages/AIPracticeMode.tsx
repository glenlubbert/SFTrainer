import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, RefreshCw, Settings, Lightbulb, Target, ArrowUp, ArrowDown, AlertCircle, CheckCircle } from 'lucide-react';
import { generateInitialClientResponse, generateClientResponse, analyzeCoachQuestion } from '../services/openaiService';
import { isOpenAIConfigured, getConfigStatus } from '../config/openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: {
    aboveLine: boolean;
    suggestion: string;
    score?: number;
  };
}

interface PracticeSettings {
  theme: string;
  feedbackMode: 'immediate' | 'end';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function AIPracticeMode() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [settings, setSettings] = useState<PracticeSettings>({
    theme: 'general',
    feedbackMode: 'immediate',
    difficulty: 'beginner'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalQuestions: 0,
    aboveLineCount: 0,
    belowLineCount: 0
  });
  const [apiStatus, setApiStatus] = useState(getConfigStatus());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const themes = [
    { value: 'general', label: 'General Health & Wellness' },
    { value: 'nutrition', label: 'Healthy Eating' },
    { value: 'exercise', label: 'Physical Activity' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'sleep', label: 'Sleep & Recovery' },
    { value: 'burnout', label: 'Burnout & Work-Life Balance' },
    { value: 'confidence', label: 'Building Confidence' },
    { value: 'pain', label: 'Pain Management' }
  ];

  const startSession = async () => {
    if (!isOpenAIConfigured()) {
      alert('Please configure your OpenAI API key first. See the setup instructions below.');
      return;
    }

    setIsLoading(true);
    
    try {
      const clientResponse = await generateInitialClientResponse(settings.theme, settings.difficulty);
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: clientResponse,
        timestamp: new Date()
      };
      
      setMessages([newMessage]);
      setSessionStarted(true);
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Failed to start session. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create session context for the API
      const sessionContext = {
        theme: settings.theme,
        difficulty: settings.difficulty,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      };

      const response = await generateClientResponse(sessionContext, inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        feedback: settings.feedbackMode === 'immediate' ? {
          aboveLine: response.feedback?.aboveLine || false,
          suggestion: response.feedback?.suggestion || '',
          score: response.feedback?.score
        } : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update stats
      if (response.feedback) {
        setSessionStats(prev => ({
          ...prev,
          totalQuestions: prev.totalQuestions + 1,
          aboveLineCount: prev.aboveLineCount + (response.feedback?.aboveLine ? 1 : 0),
          belowLineCount: prev.belowLineCount + (response.feedback?.aboveLine ? 0 : 1)
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to get response. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    setMessages([]);
    setSessionStarted(false);
    setSessionStats({ totalQuestions: 0, aboveLineCount: 0, belowLineCount: 0 });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // API Configuration Instructions Component
  const APIConfigInstructions = () => (
    <div className="card mb-6 border-2 border-[#EB5931] bg-[#F5AC3A]/10">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-[#EB5931] mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-[#2F5169] mb-2">OpenAI API Setup Required</h3>
          <p className="text-gray-700 mb-3">
            To use the AI Practice Mode, you need to configure your OpenAI API key.
          </p>
          <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono mb-3">
            <p className="mb-2">1. Create a file called <code>.env.local</code> in your project root</p>
            <p className="mb-2">2. Add your OpenAI API key:</p>
            <p className="text-[#2F5169]">VITE_OPENAI_API_KEY=your_actual_api_key_here</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>• Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-[#2F5169] underline">OpenAI Platform</a></p>
            <p>• Restart your development server after adding the key</p>
            <p>• The API key is only used locally and never sent to our servers</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5EDF0] to-[#b8e0e5] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2F5169] flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                AI Practice Mode
              </h1>
              <p className="text-gray-600">Practice Solution-Focused coaching with AI-powered role-play</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn-secondary flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={resetSession}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* API Status */}
          {!apiStatus.configured && <APIConfigInstructions />}
          
          {apiStatus.configured && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              {apiStatus.message}
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-[#2F5169] mb-3">Practice Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5169] focus:border-transparent"
                  >
                    {themes.map(theme => (
                      <option key={theme.value} value={theme.value}>{theme.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={settings.difficulty}
                    onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5169] focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Mode</label>
                  <select
                    value={settings.feedbackMode}
                    onChange={(e) => setSettings(prev => ({ ...prev, feedbackMode: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5169] focus:border-transparent"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="end">End of Session</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Session Stats */}
        {sessionStarted && (
          <div className="card mb-6">
            <h3 className="font-semibold text-[#2F5169] mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Session Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-[#2F5169]">{sessionStats.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                  <ArrowUp className="w-5 h-5" />
                  {sessionStats.aboveLineCount}
                </div>
                <div className="text-sm text-gray-600">Above the Line</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 flex items-center justify-center gap-1">
                  <ArrowDown className="w-5 h-5" />
                  {sessionStats.belowLineCount}
                </div>
                <div className="text-sm text-gray-600">Below the Line</div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <div className="card flex-1">
          {!sessionStarted ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <MessageCircle className="w-16 h-16 text-[#2F5169] mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-[#2F5169] mb-2">Ready to Practice?</h2>
                <p className="text-gray-600 mb-6">
                  Start a coaching session with an AI client. Practice your solution-focused questions and get real-time feedback.
                </p>
                <button
                  onClick={startSession}
                  disabled={!apiStatus.configured || isLoading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Starting Session...' : 'Start Session'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto max-h-96 mb-4">
                {messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-[#2F5169] text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Feedback */}
                    {message.feedback && (
                      <div className={`mt-2 p-3 rounded-lg ${
                        message.feedback.aboveLine 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.feedback.aboveLine ? (
                            <ArrowUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className={`text-sm font-medium ${
                              message.feedback.aboveLine ? 'text-green-800' : 'text-red-800'
                            }`}>
                              {message.feedback.aboveLine ? 'Above the Line' : 'Below the Line'}
                              {message.feedback.score && ` (Score: ${message.feedback.score}/10)`}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">{message.feedback.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your solution-focused question..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#2F5169] focus:border-transparent"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="btn-primary px-4 self-end disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* DOQ Guidelines */}
        <div className="card mt-6">
          <h3 className="font-semibold text-[#2F5169] mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Dialogic Orientation Quadrant (DOQ) Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-700 mb-2">Above the Line (Solution-Focused)</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Focus on what's working</li>
                <li>• Ask about exceptions to the problem</li>
                <li>• Explore the preferred future</li>
                <li>• Use scaling questions</li>
                <li>• Ask "what else?" to expand possibilities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">Below the Line (Problem-Focused)</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Focusing on problems and causes</li>
                <li>• Asking "why" questions</li>
                <li>• Exploring feelings extensively</li>
                <li>• Giving advice or solutions</li>
                <li>• Diagnosing or labeling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}