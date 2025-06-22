import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, RefreshCw, Settings, Lightbulb, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: {
    aboveLine: boolean;
    suggestion: string;
  };
}

interface PracticeSettings {
  theme: string;
  feedbackMode: 'immediate' | 'end';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function AIPracticeMode() {
  const { userProfile } = useAppContext();
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

  const generateSessionPrompt = () => {
    const themeText = themes.find(t => t.value === settings.theme)?.label || 'health and wellness';
    const feedbackInstruction = settings.feedbackMode === 'immediate' 
      ? 'After each of my questions, give me brief feedback: Was that above or below the line? How could I make it more effective?'
      : 'At the end of our conversation, give me brief feedback: Was that above or below the line? How could I make it more effective?';

    return `I am a student health coach practicing Solution-Focused coaching using the Dialogic Orientation Quadrant (DOQ). Please act as my client and choose an issue related to ${themeText} for me to help you with. Respond with a mix of problem- and resource-talk each time you speak so I can practice "staying above the line." ${feedbackInstruction}`;
  };

  const startSession = async () => {
    setIsLoading(true);
    const prompt = generateSessionPrompt();
    
    // Simulate AI response (replace with actual ChatGPT API call)
    setTimeout(() => {
      const clientResponse = generateClientResponse(settings.theme, settings.difficulty);
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: clientResponse,
        timestamp: new Date()
      };
      
      setMessages([newMessage]);
      setSessionStarted(true);
      setIsLoading(false);
    }, 1500);
  };

  const generateClientResponse = (theme: string, difficulty: string): string => {
    const responses = {
      nutrition: {
        beginner: "I've been trying to eat healthier, but I keep falling back into old habits. I know I should be eating more vegetables, but I just don't have the time to cook, and when I do try, it doesn't taste very good. I used to be really good at meal planning, but that was years ago. I'm just feeling overwhelmed by all the conflicting advice out there.",
        intermediate: "I'm struggling with emotional eating, especially in the evenings. I can do well during the day, but when I get home from work, I just want comfort food. I've tried different diets before, and I know what works for me when I'm in the right mindset. But right now, I feel like I'm stuck in this cycle.",
        advanced: "I'm dealing with some digestive issues that make healthy eating complicated. I've been working with a nutritionist, but I'm finding it hard to balance their recommendations with my busy schedule and family preferences. I have some strategies that work when I'm feeling well, but stress seems to trigger both my symptoms and my old eating patterns."
      },
      exercise: {
        beginner: "I want to get more active, but I'm not sure where to start. I used to enjoy walking, but I've been so busy with work that I haven't made time for it. I know exercise is important, but I feel like I need to do something intense to see results, and that's intimidating.",
        intermediate: "I'm trying to build a consistent exercise routine, but I keep getting injured or burning out. I love the feeling when I'm active regularly, and I know I have more energy and better sleep. But I tend to go too hard and then have to stop completely.",
        advanced: "I'm training for a specific goal, but I'm hitting plateaus and dealing with some performance anxiety. I have a good foundation of fitness habits, but I'm struggling to balance pushing myself with listening to my body. I know what works for me when I'm in the right headspace."
      },
      stress: {
        beginner: "I'm feeling really stressed lately, and I don't know how to manage it. Everything feels overwhelming, and I'm not sleeping well. I used to be better at handling stress, but lately, it's just getting to me.",
        intermediate: "I'm dealing with chronic stress from work, and it's affecting my relationships and health. I have some coping strategies that work sometimes, but I feel like I'm constantly playing catch-up. I know I need to set better boundaries.",
        advanced: "I'm experiencing burnout symptoms and need to rebuild my stress management toolkit. I have a good understanding of what triggers my stress and some effective strategies, but I'm struggling to implement them consistently in my current situation."
      }
    };

    const themeResponses = responses[theme as keyof typeof responses] || responses.stress;
    return themeResponses[difficulty as keyof typeof themeResponses] || themeResponses.beginner;
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

    // Simulate AI response with feedback
    setTimeout(() => {
      const feedback = analyzeQuestion(inputMessage);
      const clientResponse = generateClientResponse(settings.theme, settings.difficulty);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: clientResponse,
        timestamp: new Date(),
        feedback: settings.feedbackMode === 'immediate' ? feedback : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Update stats
      setSessionStats(prev => ({
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        aboveLineCount: prev.aboveLineCount + (feedback.aboveLine ? 1 : 0),
        belowLineCount: prev.belowLineCount + (feedback.aboveLine ? 0 : 1)
      }));
    }, 1500);
  };

  const analyzeQuestion = (question: string): { aboveLine: boolean; suggestion: string } => {
    const aboveLineKeywords = [
      'hope', 'better', 'different', 'notice', 'working', 'helpful', 'improve',
      'progress', 'success', 'achieved', 'managed', 'handled', 'learned',
      'strategies', 'resources', 'support', 'strengths', 'capabilities'
    ];

    const belowLineKeywords = [
      'problem', 'issue', 'struggle', 'difficult', 'hard', 'bad', 'wrong',
      'fix', 'solve', 'cure', 'treatment', 'therapy', 'diagnosis',
      'feel', 'emotion', 'upset', 'angry', 'sad', 'depressed'
    ];

    const questionLower = question.toLowerCase();
    const aboveLineScore = aboveLineKeywords.filter(keyword => questionLower.includes(keyword)).length;
    const belowLineScore = belowLineKeywords.filter(keyword => questionLower.includes(keyword)).length;

    const isAboveLine = aboveLineScore > belowLineScore;
    
    let suggestion = '';
    if (isAboveLine) {
      suggestion = 'Great! This question stays above the line by focusing on possibilities and resources.';
    } else {
      suggestion = 'Consider reframing to focus on what\'s working, what will be different, or what the client will notice in the better future.';
    }

    return { aboveLine: isAboveLine, suggestion };
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
                className="btn-outline flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                    className="input-field"
                  >
                    {themes.map(theme => (
                      <option key={theme.value} value={theme.value}>
                        {theme.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Mode
                  </label>
                  <select
                    value={settings.feedbackMode}
                    onChange={(e) => setSettings(prev => ({ ...prev, feedbackMode: e.target.value as 'immediate' | 'end' }))}
                    className="input-field"
                  >
                    <option value="immediate">Immediate Feedback</option>
                    <option value="end">End of Session</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={settings.difficulty}
                    onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                    className="input-field"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Session Stats */}
          {sessionStarted && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Questions: {sessionStats.totalQuestions}
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    Above Line: {sessionStats.aboveLineCount}
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <ArrowDown className="w-4 h-4" />
                    Below Line: {sessionStats.belowLineCount}
                  </span>
                </div>
                {sessionStats.totalQuestions > 0 && (
                  <span className="text-sm text-gray-600">
                    {Math.round((sessionStats.aboveLineCount / sessionStats.totalQuestions) * 100)}% Above Line
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat Interface */}
        <div className="card h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!sessionStarted ? (
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 text-[#F5AC3A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#2F5169] mb-2">
                  Ready to Practice?
                </h3>
                <p className="text-gray-600 mb-6">
                  Start a coaching session with an AI client. Focus on staying "above the line" 
                  with solution-focused questions.
                </p>
                <button
                  onClick={startSession}
                  disabled={isLoading}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Starting Session...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      Start Session
                    </>
                  )}
                </button>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#2F5169] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.feedback && (
                        <div className={`mt-2 p-2 rounded text-xs ${
                          message.feedback.aboveLine 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <div className="flex items-center gap-1 mb-1">
                            {message.feedback.aboveLine ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            <span className="font-medium">
                              {message.feedback.aboveLine ? 'Above Line' : 'Below Line'}
                            </span>
                          </div>
                          <p>{message.feedback.suggestion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Client is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {sessionStarted && (
            <div className="border-t p-4">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask your coaching question..."
                  className="flex-1 input-field resize-none"
                  rows={2}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="btn-primary px-4 self-end"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          )}
        </div>

        {/* DOQ Guidelines */}
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-[#2F5169] mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Dialogic Orientation Quadrant (DOQ) Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                <ArrowUp className="w-4 h-4" />
                Above the Line (Solution-Focused)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "What will you notice that tells you things are getting better?"</li>
                <li>• "When has this been less of a struggle for you?"</li>
                <li>• "What strategies have worked for you before?"</li>
                <li>• "How will you know this approach is working?"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                <ArrowDown className="w-4 h-4" />
                Below the Line (Problem-Focused)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "What's causing this problem?"</li>
                <li>• "How does that make you feel?"</li>
                <li>• "Why do you think this is happening?"</li>
                <li>• "What's wrong with your current approach?"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}