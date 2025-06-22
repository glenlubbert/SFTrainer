import OpenAI from 'openai';
import { OPENAI_CONFIG, isOpenAIConfigured } from '../config/openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_CONFIG.apiKey,
  dangerouslyAllowBrowser: true // Note: This exposes the API key to the browser
});

export interface CoachingSession {
  theme: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface ClientResponse {
  content: string;
  feedback?: {
    aboveLine: boolean;
    suggestion: string;
    score: number;
  };
}

// Generate initial client response based on theme and difficulty
export const generateInitialClientResponse = async (
  theme: string, 
  difficulty: string
): Promise<string> => {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API not configured');
  }

  const systemPrompt = `You are a health coaching client participating in a role-play session. 
  
Theme: ${theme}
Difficulty Level: ${difficulty}

Respond as a client who:
- Has a realistic health-related challenge
- Shows some motivation but also some resistance
- Uses natural, conversational language
- Provides enough detail for a coach to work with
- Doesn't immediately solve their own problem

Keep your response to 2-3 sentences maximum. Be authentic and relatable.`;

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Please introduce yourself as a client with a health coaching challenge.' }
      ],
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content || 'I\'m having trouble with my health goals lately.';
  } catch (error) {
    console.error('Error generating client response:', error);
    throw new Error('Failed to generate client response');
  }
};

// Generate client response to coach's question
export const generateClientResponse = async (
  session: CoachingSession,
  coachQuestion: string
): Promise<ClientResponse> => {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API not configured');
  }

  const systemPrompt = `You are a health coaching client in a role-play session. 

Theme: ${session.theme}
Difficulty Level: ${session.difficulty}

Guidelines:
- Respond naturally to the coach's question
- Show some progress or insight, but also some challenges
- Keep responses to 1-2 sentences
- Be authentic and conversational
- Don't immediately solve your own problem
- Show some resistance or uncertainty at times

Previous conversation context:
${session.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Respond as the client:`;

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: coachQuestion }
      ],
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: 100,
    });

    const content = completion.choices[0]?.message?.content || 'I\'m not sure how to answer that.';

    // Analyze the coach's question for solution-focused feedback
    const feedback = await analyzeCoachQuestion(coachQuestion);

    return {
      content,
      feedback
    };
  } catch (error) {
    console.error('Error generating client response:', error);
    throw new Error('Failed to generate client response');
  }
};

// Analyze coach's question for solution-focused approach
export const analyzeCoachQuestion = async (question: string): Promise<{
  aboveLine: boolean;
  suggestion: string;
  score: number;
}> => {
  if (!isOpenAIConfigured()) {
    return {
      aboveLine: false,
      suggestion: 'OpenAI API not configured for feedback analysis.',
      score: 0
    };
  }

  const systemPrompt = `You are an expert in Solution-Focused Brief Therapy (SFBT) coaching. Analyze the coach's question and provide feedback on whether it follows SFBT principles.

SFBT "Above the Line" Principles:
- Focus on solutions, not problems
- Ask about what's working
- Explore exceptions to the problem
- Ask about the preferred future
- Focus on strengths and resources
- Use scaling questions
- Ask "what else?" to expand possibilities

"Below the Line" Patterns to Avoid:
- Focusing on problems and causes
- Asking "why" questions
- Exploring feelings extensively
- Giving advice or solutions
- Diagnosing or labeling

Rate the question from 0-10 (10 being excellent SFBT practice) and provide specific feedback.`;

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze this coach question: "${question}"` }
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    const analysis = completion.choices[0]?.message?.content || '';
    
    // Extract score from analysis (look for numbers 0-10)
    const scoreMatch = analysis.match(/(\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 5;
    
    const aboveLine = score >= 6;
    
    return {
      aboveLine,
      suggestion: analysis,
      score
    };
  } catch (error) {
    console.error('Error analyzing coach question:', error);
    return {
      aboveLine: false,
      suggestion: 'Unable to analyze question due to API error.',
      score: 0
    };
  }
}; 