export interface CoachingStep {
  id: number
  title: string
  description: string
  clientPrompt: string
  coachTips: string[]
  reflectivePrompts: string[]
}

export const coachingSteps: CoachingStep[] = [
  {
    id: 1,
    title: "How Can I Help You?",
    description: "Open the session with a warm, inviting question that shows genuine interest in the client's needs.",
    clientPrompt: "Hi, I'm Sarah. I've been struggling with my weight for years and I'm feeling really frustrated. I've tried so many diets but nothing seems to work long-term. I'm here because I want to feel better about myself and have more energy for my kids.",
    coachTips: [
      "Use a warm, welcoming tone",
      "Show genuine curiosity about their situation",
      "Avoid jumping into problem-solving mode",
      "Create a safe space for them to share"
    ],
    reflectivePrompts: [
      "How did your opening question set the tone for the session?",
      "What did you notice about the client's initial response?",
      "How might you have responded differently?"
    ]
  },
  {
    id: 2,
    title: "Hear What the Client Wants",
    description: "Listen actively and reflect back what you hear about their desired outcomes.",
    clientPrompt: "I want to lose about 30 pounds, but more than that, I want to feel confident in my own skin again. I miss being able to play with my kids without getting tired so quickly. I want to be the energetic mom I used to be.",
    coachTips: [
      "Listen for both stated and underlying desires",
      "Reflect back what you hear without adding interpretation",
      "Pay attention to emotional language",
      "Notice what's important to them beyond the surface goal"
    ],
    reflectivePrompts: [
      "What did you hear the client really wanting?",
      "How did you reflect back their desires?",
      "What emotional themes emerged?"
    ]
  },
  {
    id: 3,
    title: "Check It Out",
    description: "Clarify and explore their goals to ensure you understand what they're seeking.",
    clientPrompt: "Well, I guess I want to feel like I have control over my eating habits. Right now, I feel like food controls me. I want to make healthy choices without feeling deprived. And I want to have the energy to keep up with my kids - they're 5 and 7, so they're always on the go!",
    coachTips: [
      "Ask clarifying questions about their goals",
      "Explore what success would look like",
      "Check your understanding of their priorities",
      "Help them articulate specific, achievable outcomes"
    ],
    reflectivePrompts: [
      "How did you clarify their goals?",
      "What specific outcomes did you help them identify?",
      "How might you have explored their goals further?"
    ]
  },
  {
    id: 4,
    title: "Goal Formation",
    description: "Help the client formulate clear, specific, and achievable goals.",
    clientPrompt: "I think my main goal is to feel more confident and energetic. Maybe start with walking 20 minutes a day with my kids? And I want to stop eating when I'm stressed - that's a big problem for me. I'd like to find other ways to cope.",
    coachTips: [
      "Help them break down large goals into smaller steps",
      "Focus on what they want to do, not what they want to stop",
      "Make goals specific and measurable",
      "Ensure goals are within their control"
    ],
    reflectivePrompts: [
      "How did you help them formulate specific goals?",
      "What made these goals achievable?",
      "How did you keep the focus on positive actions?"
    ]
  },
  {
    id: 5,
    title: "Scaling & Coping",
    description: "Use scaling questions to assess current progress and explore coping strategies.",
    clientPrompt: "On a scale of 1-10, where 1 is 'I have no energy and feel terrible' and 10 is 'I feel confident and energetic,' I'd say I'm at a 3 right now. I do have some good days, especially when I get enough sleep. And I've noticed that when I take the kids to the park, I feel better afterward.",
    coachTips: [
      "Use scaling questions to assess current situation",
      "Explore what's already working (even a little)",
      "Ask about coping strategies they're already using",
      "Help them recognize their existing strengths"
    ],
    reflectivePrompts: [
      "How did the scaling question help assess their situation?",
      "What existing resources did you discover?",
      "How did you help them recognize their strengths?"
    ]
  },
  {
    id: 6,
    title: "Exceptions",
    description: "Explore times when the problem is less present or when they're already making progress.",
    clientPrompt: "Actually, there was this one week last month when I felt really good. I had started taking the kids for walks after dinner, and I was sleeping better. I wasn't eating as much junk food because I was too busy with the walks. I felt more in control then.",
    coachTips: [
      "Look for times when things are going better",
      "Explore what's different during those times",
      "Help them identify what they're already doing right",
      "Build on existing successes"
    ],
    reflectivePrompts: [
      "What exceptions did you discover?",
      "How did you help them explore what was different?",
      "What existing successes did you help them recognize?"
    ]
  },
  {
    id: 7,
    title: "Next Step",
    description: "Help the client identify a small, concrete next step they can take.",
    clientPrompt: "I think I could start with the evening walks again. That worked before, and the kids loved it. Maybe just 15 minutes to start, three times this week. And I could try to go to bed 30 minutes earlier - I know that helps my energy levels.",
    coachTips: [
      "Keep the next step small and achievable",
      "Build on what's already working",
      "Make it specific and concrete",
      "Ensure it's something they want to do"
    ],
    reflectivePrompts: [
      "How did you help them identify a manageable next step?",
      "What made this step achievable?",
      "How did you build on their existing successes?"
    ]
  },
  {
    id: 8,
    title: "24-Hour Goal",
    description: "Set a very specific, immediate goal for the next 24 hours.",
    clientPrompt: "Tomorrow, I'll take the kids for a 15-minute walk after dinner. I know they'll be excited about it, and that will help me stick to it. And I'll try to be in bed by 10:30 instead of 11:00.",
    coachTips: [
      "Make the goal very specific and immediate",
      "Focus on what they can do in the next 24 hours",
      "Help them identify what will help them succeed",
      "Keep it simple and achievable"
    ],
    reflectivePrompts: [
      "How specific was the 24-hour goal?",
      "What supports did they identify?",
      "How achievable did this goal seem?"
    ]
  },
  {
    id: 9,
    title: "Feedback",
    description: "Provide supportive feedback that reinforces their strengths and progress.",
    clientPrompt: "I feel really hopeful about this. I can see that I already have some good habits, and I know what works for me. The walking idea feels doable, and I'm excited to try it. Thank you for helping me see that I'm not starting from zero.",
    coachTips: [
      "Acknowledge their strengths and insights",
      "Reinforce their existing resources",
      "Validate their feelings and experiences",
      "End on a positive, hopeful note"
    ],
    reflectivePrompts: [
      "What strengths did you acknowledge?",
      "How did you reinforce their existing resources?",
      "How did you end the session on a positive note?"
    ]
  }
] 