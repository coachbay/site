const CYAN = "#00BCD4";
const RED_ACCENT = "#ef4444";

// ============================================
// COMPANY DIAGNOSTIC - AI Readiness
// ============================================
export const companyConfig = {
  title: "AI Readiness Diagnostic",
  subtitle: "Where does your organisation actually sit on the AI adoption curve?",
  description: "25 questions across 5 dimensions. Takes about 10 minutes.\nBe honest. This is a mirror, not a report card.",
  diagnosticType: "Company",
  empathyGap: { leadershipId: "leadership", sentimentId: "sentiment" },
  sections: [
    {
      id: "clarity",
      title: "Strategic Clarity",
      subtitle: "Do you know what you're actually trying to achieve with AI?",
      icon: "🎯",
      questions: [
        "We can name the top 3 business problems AI should help us solve",
        "Our AI ambitions are connected to our broader business strategy, not a separate initiative",
        "We're focused on a small number of high-impact use cases (not trying to do everything)",
        "We measure success in business outcomes (time saved, quality improved), not tool adoption",
        "We have a realistic timeline for meaningful results, measured in months not weeks",
      ],
    },
    {
      id: "leadership",
      title: "Leadership Readiness",
      subtitle: "Do the people at the top actually use AI themselves?",
      icon: "👔",
      questions: [
        "Our senior leaders have personally used AI tools (not just seen demos)",
        "Leadership can articulate why AI matters for our business, beyond \"everyone else is doing it\"",
        "Leaders talk about AI in terms of people and outcomes, not just efficiency and cost savings",
        "There is a named person (not a committee) who owns AI adoption",
        "Leadership has allocated time, not just budget, for AI exploration",
      ],
    },
    {
      id: "sentiment",
      title: "Employee Sentiment",
      subtitle: "How do the people who will actually use AI feel about it?",
      icon: "💬",
      questions: [
        "Employees feel safe experimenting with AI without fear of judgment",
        "People talk openly about using AI at work (not hiding it)",
        "Employees see AI as a tool that helps them, not a threat to their job",
        "There are people in the organisation already playing with AI on their own",
        "We've actually asked employees how they feel about AI (not assumed)",
      ],
    },
    {
      id: "culture",
      title: "Culture of Change",
      subtitle: "Does your organisation have the muscle to adopt something new?",
      icon: "🔄",
      questions: [
        "When we introduce new tools or processes, people generally give them a fair try",
        "We celebrate early experiments, even when they don't work perfectly",
        "Managers are empowered to make local decisions about how their teams work",
        "We've successfully adopted a new technology or way of working in the last 2 years",
        "People trust that leadership has their interests in mind during change",
      ],
    },
    {
      id: "foundations",
      title: "Practical Foundations",
      subtitle: "Are the basics in place to actually start?",
      icon: "🔧",
      questions: [
        "Employees have access to at least one paid AI tool (ChatGPT, Claude, Copilot, etc.)",
        "We have basic guidelines about what data can and can't go into AI tools",
        "There is a budget or willingness to invest in AI tools and training",
        "We can identify 5 to 10 people who would eagerly join a Pilot Squad tomorrow",
        "We have at least one clear, specific use case where AI could make a visible difference",
      ],
    },
  ],
  tierData: [
    {
      range: [100, 125], label: "Ready to Accelerate", color: "#10b981",
      summary: "Your organisation has the foundations in place. Leadership is engaged, employees are willing, and you have clarity on what you're trying to achieve.",
      action: "Skip the awareness phase. Go straight to forming a Pilot Squad, a small group of 5 to 10 early adopters who solve real problems with AI. Focus on creating visible wins fast and scaling from there.",
    },
    {
      range: [75, 99], label: "Ready to Start, With Focus", color: CYAN,
      summary: "You have pockets of readiness but some gaps. Most likely, leadership is keen but employees are uncertain, or you have enthusiasm but lack structure.",
      action: "Start with the curious. Don't try to fix every gap first. Launch a small pilot and let the results build the case. Get your early adopters their first real AI experience this week using a simple prompt framework like CRIT (Context, Role, Interview, Task).",
    },
    {
      range: [50, 74], label: "Groundwork Needed", color: "#f59e0b",
      summary: "There's interest but not enough safety, clarity, or trust to launch an initiative yet. Pushing ahead now risks creating \"prisoners\", compliance without buy-in.",
      action: "Start with leadership. Leaders need to use AI themselves first because you can't coach what you haven't practised. Focus on building psychological safety and identifying your natural early adopters. A 60-minute AI Kickoff workshop can open the door without forcing anything.",
    },
    {
      range: [0, 49], label: "Not Yet. And That's Okay", color: RED_ACCENT,
      summary: "Your organisation isn't ready for an AI initiative right now. That doesn't mean it's a failure. It means other things need to come first: trust, change fatigue, leadership alignment, or basic access to tools.",
      action: "Don't force it. Work on the underlying culture of change first. Start with one-on-one conversations with leaders about what's really getting in the way. Come back to AI once the foundation of trust is stronger.",
    },
  ],
  sectionAdvice: {
    clarity: {
      low: "Lots of enthusiasm, no focus. The danger here is trying to do everything at once and achieving nothing. Pick one business problem, one team, one quarter. That's it. Prove it works there before expanding.",
      mid: "There's a general sense of direction but it may not be specific enough. Sharpen your focus: can you name the exact problem AI will solve, for whom, and how you'll know it worked? If not, spend time on that before launching.",
      high: "Strategic clarity is strong. You know what you're solving and how to measure it. This is rare and valuable, so protect this focus. The biggest threat now is scope creep as other teams want in.",
    },
    leadership: {
      low: "Leaders are delegating AI without experiencing it themselves. Before rolling out anything, get leaders hands-on. Have each one spend 30 minutes using AI on a real work problem. You can't credibly lead a change you haven't lived through.",
      mid: "Leadership is engaged but may not be modelling the behaviour consistently. Make AI usage visible at the top. Share what you're using it for in team meetings, show your prompts, and be honest about what didn't work.",
      high: "Leadership readiness is strong. Your leaders are walking the talk. Now use that credibility to create safety for others. When the CEO says \"I tried this and it was terrible at first,\" it gives everyone permission to be imperfect.",
    },
    sentiment: {
      low: "Employees are likely fearful or hiding their AI use. This is the biggest red flag because it means people don't feel safe. Before any initiative, create psychological safety. Start by asking (not telling) how people feel. The question \"Are you already using AI?\" asked without judgment can surface a lot.",
      mid: "There's a mix of curiosity and caution. Some people are experimenting quietly. Your job is to bring those quiet experimenters into the light. Celebrate them, give them a platform, and let their peers see that it's safe to try.",
      high: "Employees are open and willing. This is your fuel. Don't waste it with heavy-handed rollouts. Channel this energy into a Pilot Squad where their enthusiasm can produce visible results.",
    },
    culture: {
      low: "This isn't an AI problem. It's a trust and change fatigue problem. Your organisation has been through too many initiatives that didn't stick. Address the underlying culture before adding more change. AI will still be there when you're ready.",
      mid: "The organisation can handle change but needs proof that this time is different. Start small, show results quickly, and critically, don't over-promise. Under-promise and over-deliver to rebuild change credibility.",
      high: "Your change muscle is strong. People are willing to try new things and trust that leadership has their back. Use this to move fast. Your biggest risk is actually moving too slowly and losing the momentum.",
    },
    foundations: {
      low: "Good intentions but no infrastructure. People can't adopt AI if they can't access it. Solve the basics first: get tools in people's hands, create simple data guidelines (not a 50-page policy), and make sure IT isn't blocking access \"for security\" without a real plan.",
      mid: "The basics are partially in place but may be inconsistent. Some teams have access, others don't. Some guidelines exist but people aren't sure about them. Standardise access and simplify your guidelines into a one-page \"what's okay and what's not\" document.",
      high: "Foundations are solid. People have tools, there are guardrails, and you can identify your early adopters. You're ready to move. Don't let planning become a substitute for action.",
    },
  },
};

// ============================================
// LEADER DIAGNOSTIC - AI Leadership
// ============================================
export const leaderConfig = {
  title: "AI Leadership Diagnostic",
  subtitle: "How are you using AI today as a leader?",
  description: "25 questions across 5 dimensions. Takes about 8 minutes.\nThis is about your personal AI journey, not your organisation's.",
  diagnosticType: "Leader",
  empathyGap: null,
  sections: [
    {
      id: "usage",
      title: "What You Use AI For",
      subtitle: "What kinds of tasks are you bringing to AI?",
      icon: "🎯",
      questions: [
        "I use AI to help with routine tasks like drafting emails, summarising documents, or preparing agendas",
        "I use AI to think through complex decisions or strategic challenges",
        "I use AI to prepare for important meetings, presentations, or difficult conversations",
        "I use AI to analyse information, spot patterns, or stress-test my assumptions",
        "I use AI to generate new ideas or explore different perspectives on a problem",
      ],
    },
    {
      id: "frequency",
      title: "How Often You Use AI",
      subtitle: "Has AI become part of your routine?",
      icon: "📅",
      questions: [
        "I use AI tools daily",
        "AI is one of the first places I go when starting a new task or project",
        "I have a regular workflow or routine that includes AI",
        "I find myself reaching for AI more often now than I did three months ago",
        "I would notice a significant gap in my productivity if I lost access to AI tomorrow",
      ],
    },
    {
      id: "depth",
      title: "Tools and Depth",
      subtitle: "How deep have you gone with AI tools?",
      icon: "🔧",
      questions: [
        "I have tried more than one AI tool (e.g. ChatGPT, Claude, Copilot, Gemini)",
        "I know how to write a good prompt that gets useful results without multiple attempts",
        "I use AI for back-and-forth conversations, not just single questions",
        "I have customised or saved prompts that I reuse regularly",
        "I understand the strengths and limitations of the AI tools I use",
      ],
    },
    {
      id: "trust",
      title: "Trust and Judgment",
      subtitle: "How do you evaluate and use AI output?",
      icon: "🧭",
      questions: [
        "I can describe what makes a good AI prompt versus a poor one",
        "I feel confident I can tell when AI gives me a poor or inaccurate response",
        "I use AI output as a starting point for my own thinking, not a final answer",
        "I am comfortable sharing with colleagues that I used AI to help with my work",
        "I trust AI enough to use it for work that matters, not just low-stakes tasks",
      ],
    },
    {
      id: "impact",
      title: "Impact on Your Leadership",
      subtitle: "Is AI changing how you lead?",
      icon: "⚡",
      questions: [
        "AI has changed how I approach at least one important part of my role",
        "I have used AI to tackle a challenge I would have struggled with on my own",
        "AI helps me move faster on decisions without sacrificing quality",
        "I actively think about where else AI could help me be more effective",
        "I believe AI is making me a better leader, not just a more efficient one",
      ],
    },
  ],
  tierData: [
    {
      range: [100, 125], label: "AI-Powered Leader", color: "#10b981",
      summary: "AI is woven into how you lead. You use it for strategic thinking, not just productivity. You're not just keeping up, you're setting the pace.",
      action: "You're ready to multiply your impact. Start coaching others on what you've learned. Share your prompts, show your process, and help your team see what's possible. You are the early adopter your organisation needs to see.",
    },
    {
      range: [75, 99], label: "Active Explorer", color: CYAN,
      summary: "You're using AI regularly and seeing real results. You have good habits forming but there's room to go deeper, especially in using AI for strategic thinking and decision-making.",
      action: "Push into the uncomfortable. Try using AI for your biggest challenge this week, not just the routine stuff. Use the CRIT framework (Context, Role, Interview, Task) to structure a conversation with AI about a strategic decision you're facing.",
    },
    {
      range: [50, 74], label: "Getting Started", color: "#f59e0b",
      summary: "You've dipped into AI but it hasn't become a habit yet. You probably use it for simple tasks and haven't explored its potential as a thinking partner.",
      action: "Pick one recurring task in your week and commit to using AI for it every time. It could be preparing for a meeting, drafting a communication, or thinking through a decision. Build the muscle through repetition, not ambition.",
    },
    {
      range: [0, 49], label: "Untapped Potential", color: RED_ACCENT,
      summary: "AI could transform how you lead, but you haven't started yet. That's not a criticism, it's an opportunity. Most leaders are in the same position.",
      action: "Start with one conversation. Open an AI tool and ask it: \"I'm a leader dealing with [your biggest challenge]. Ask me questions to help me think this through.\" That single experience often changes everything.",
    },
  ],
  sectionAdvice: {
    usage: {
      low: "You're barely using AI, or using it only for the simplest tasks. The biggest unlock is realising AI can be a thinking partner, not just a writing assistant. Try asking it to challenge your assumptions on a decision you're making.",
      mid: "You're using AI for a decent range of tasks but probably leaning toward the routine side. The next step is bringing AI into your strategic work: planning, problem-solving, and preparing for high-stakes conversations.",
      high: "You're using AI across a wide range of tasks, including the strategic ones. You've moved beyond \"AI as tool\" into \"AI as thinking partner.\" Keep pushing the boundary of what you bring to it.",
    },
    frequency: {
      low: "AI isn't part of your routine yet. Without regular use, you can't build the intuition for what it's good at. Set a daily trigger: every morning, bring one task to AI before you start it yourself.",
      mid: "You're building a habit but it's not automatic yet. The goal is to reach the point where not using AI feels like a missed opportunity. Try tracking your usage for a week to see where the gaps are.",
      high: "AI is a natural part of your workflow. This consistency is what separates leaders who \"get\" AI from those who are still experimenting. The habit is the foundation for everything else.",
    },
    depth: {
      low: "You may have tried one tool once or twice but haven't explored what's possible. AI tools are like conversations: the quality depends on how you engage. Learn the CRIT framework (Context, Role, Interview, Task) to structure better prompts.",
      mid: "You have some skill with AI tools but there's room to go deeper. Try using AI for multi-turn conversations where you refine and iterate. The best results come from going back and forth, not from a single prompt.",
      high: "You have real depth with AI tools. You understand prompting, iteration, and the differences between tools. Use this knowledge to help others get started. Your expertise is a leadership asset.",
    },
    trust: {
      low: "You either trust AI too much (accepting output without review) or too little (not using it for anything that matters). The sweet spot is healthy skepticism: use it, but verify. Every AI output deserves a human review.",
      mid: "You have a reasonable relationship with AI output. You check it but you're willing to use it for real work. Keep developing your ability to spot when AI is confidently wrong, that's the most important skill.",
      high: "You have excellent judgment about AI output. You know when to trust it and when to push back. This critical thinking is exactly what makes AI useful rather than dangerous.",
    },
    impact: {
      low: "AI hasn't changed how you work yet. This means you haven't found the right use case. Think about the task you spend the most time on each week. That's where AI can make the biggest visible difference.",
      mid: "AI is starting to change some of your work, but it hasn't fundamentally shifted how you lead. The next level is using AI to tackle problems you've been avoiding because they felt too complex or time-consuming.",
      high: "AI is genuinely changing how you lead. You're not just faster, you're thinking differently. This is the impact that matters. Now the question is: how do you help your team experience the same shift?",
    },
  },
};

// ============================================
// TEAM DIAGNOSTIC - Personal AI Use
// ============================================
export const teamConfig = {
  title: "Personal AI Diagnostic",
  subtitle: "How are you using AI in your work today?",
  description: "25 questions across 5 dimensions. Takes about 8 minutes.\nThis is about you, not your team or organisation.",
  diagnosticType: "Team",
  empathyGap: null,
  sections: [
    {
      id: "tasks",
      title: "What You Use AI For",
      subtitle: "What kinds of work are you bringing to AI?",
      icon: "📋",
      questions: [
        "I use AI to help with everyday tasks like writing, organising, or researching",
        "I use AI to learn new things or understand unfamiliar topics quickly",
        "I use AI to check my work, get feedback, or improve what I've written",
        "I use AI to brainstorm ideas or think through problems from different angles",
        "I critically evaluate AI responses before using them in my work",
      ],
    },
    {
      id: "frequency",
      title: "How Often You Use AI",
      subtitle: "Has AI become part of how you work?",
      icon: "📅",
      questions: [
        "I use AI tools daily",
        "Using AI feels like a natural part of how I work now",
        "I have built AI into at least one regular workflow or process",
        "My AI usage has increased noticeably over the past few months",
        "I would feel less effective at my job if I suddenly lost access to AI",
      ],
    },
    {
      id: "skills",
      title: "Tools and Skills",
      subtitle: "How confident are you with AI tools?",
      icon: "🔧",
      questions: [
        "I have experimented with more than one AI tool",
        "I can usually get a useful response from AI without multiple attempts",
        "I go back and forth with AI to refine and improve results",
        "I have figured out my own tips and techniques for getting better AI results",
        "I understand what AI is good at and where it falls short",
      ],
    },
    {
      id: "confidence",
      title: "Confidence and Openness",
      subtitle: "How comfortable are you with AI at work?",
      icon: "💬",
      questions: [
        "I feel confident using AI for tasks that matter, not just simple ones",
        "I have learned something new about AI in the last month",
        "I am open about using AI with my colleagues and manager",
        "I feel encouraged by my team or organisation to use AI",
        "I believe AI makes my work better, not just faster",
      ],
    },
    {
      id: "growth",
      title: "Impact and Growth",
      subtitle: "Is AI changing how you work and think?",
      icon: "🌱",
      questions: [
        "AI has changed how I approach at least one part of my job",
        "I have used AI to do something I could not easily do before",
        "I actively look for new ways to apply AI in my work",
        "I share AI tips or discoveries with my teammates",
        "I am excited about what AI will help me do in the future",
      ],
    },
  ],
  tierData: [
    {
      range: [100, 125], label: "AI-Fluent", color: "#10b981",
      summary: "AI is a natural part of how you work. You use it confidently, you know its limits, and it's genuinely making you more effective. You're not just using AI, you're thinking with it.",
      action: "You're ready to help others. Share what you've learned with your team. Show them your prompts, explain your process, and help them get their first real win with AI. The best way to learn is to teach.",
    },
    {
      range: [75, 99], label: "Building Momentum", color: CYAN,
      summary: "You're developing real AI skills and using them regularly. You've moved past the curiosity stage and into genuine daily use. There's still room to go deeper.",
      action: "Challenge yourself to use AI for something you've never tried before this week. Move beyond writing and research into problem-solving, decision-making, or learning a new skill. AI can be your assistant, coach, expert, and creative partner.",
    },
    {
      range: [50, 74], label: "Early Days", color: "#f59e0b",
      summary: "You've started using AI but haven't found your rhythm yet. You probably use it for a few simple tasks and aren't sure where else it could help.",
      action: "Pick one thing you do every week that takes more time than it should. Commit to trying it with AI for three weeks straight. The goal isn't perfection, it's building a habit. Once you find one workflow that clicks, the rest follows naturally.",
    },
    {
      range: [0, 49], label: "Untapped Potential", color: RED_ACCENT,
      summary: "There's a world of AI capability waiting for you. You haven't started yet, or you've only scratched the surface. That's perfectly fine because everyone starts here.",
      action: "Start with something small and personal. Ask AI to help you draft an email, summarise a document, or explain a concept you've been meaning to learn. The first experience should feel easy and useful, not overwhelming.",
    },
  ],
  sectionAdvice: {
    tasks: {
      low: "You're not bringing much work to AI yet. Start with the easy wins: drafting emails, summarising long documents, or researching topics. These low-stakes tasks build your confidence for bigger things.",
      mid: "You're using AI for a decent range of tasks. Now look for the tasks you're avoiding because they feel hard or tedious. Those are often where AI adds the most value.",
      high: "You're using AI across a wide range of work. You've discovered that AI isn't just one thing, it's an assistant for routine tasks, a coach for difficult decisions, an expert for learning, and a creative partner for ideas.",
    },
    frequency: {
      low: "AI isn't part of your routine yet. The single most important step is building a habit. Try a \"3-day challenge\": use AI for at least one task every day for three days. Momentum matters more than mastery.",
      mid: "You're using AI regularly but it might not be automatic yet. Look for the triggers in your day where AI could help: starting a new document, preparing for a meeting, or facing a blank page.",
      high: "AI is woven into how you work. This consistency is what builds real skill over time. You've moved past the question of \"should I use AI?\" to \"how should I use AI for this?\"",
    },
    skills: {
      low: "You might not know how to get good results from AI yet. The key insight: AI is a conversation, not a search engine. Tell it what you need, give it context about your situation, and ask it to ask you questions before it responds.",
      mid: "You have decent skills and can get useful results. The next level is learning to iterate: send a prompt, review the response, and then refine it. The best AI results come from the second or third exchange, not the first.",
      high: "You've developed real expertise with AI tools. You know how to prompt well, when to iterate, and what each tool is best at. This skill set is becoming one of the most valuable in the workplace.",
    },
    confidence: {
      low: "You may feel uncertain about AI or worried about using it \"wrong.\" There is no wrong way to start. AI won't judge you, and the more you experiment, the more confident you'll become. Start in private if that helps.",
      mid: "You're reasonably confident but might still hesitate on important tasks. The key to growing confidence is successful experiences. Each time AI helps you with something real, your trust in the process grows.",
      high: "You're confident and open about using AI. This openness is powerful because it gives others permission to try. When you share that you used AI, you're not just being transparent, you're creating safety for your colleagues.",
    },
    growth: {
      low: "AI hasn't changed your work yet, which means the best is still ahead. Think about one skill you wish you had or one part of your job you'd love to improve. That's your starting point with AI.",
      mid: "AI is starting to change some of your work. Pay attention to those moments when you think \"I'm glad I tried that with AI.\" Those are the signals pointing you toward your highest-value use cases.",
      high: "AI is genuinely changing how you work and think. You're not just doing the same work faster, you're doing work differently. This growth mindset is what separates people who thrive with AI from those who just tolerate it.",
    },
  },
};
