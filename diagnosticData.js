const CYAN = "#00BCD4";
const RED_ACCENT = "#ef4444";

// ============================================
// COMPANY DIAGNOSTIC - AI Readiness (v2)
// 5 dimensions x 5 questions = 25 questions, max 125
// ============================================
export const companyConfig = {
  title: "AI Readiness Diagnostic",
  subtitle: "Where does your organization actually sit on the AI adoption curve?",
  description: "25 questions across 5 dimensions. Takes about 10 minutes.\nBe honest. This is a mirror, not a report card.",
  diagnosticType: "Company",
  empathyGap: { leadershipId: "leadership", sentimentId: "sentiment" },
  sections: [
    {
      id: "clarity",
      title: "Strategic Clarity",
      subtitle: "Do you know what you are actually trying to achieve with AI?",
      icon: "🎯",
      questions: [
        "We can name the top 3 business problems AI should help us solve",
        "Our AI ambitions are connected to our broader business strategy, not a separate initiative",
        "We are focused on a small number of high-impact use cases (not trying to do everything)",
        "We measure success in business outcomes (time saved, quality improved), not tool adoption",
        "We have a realistic timeline for seeing meaningful results from AI",
      ],
    },
    {
      id: "leadership",
      title: "Leadership Readiness",
      subtitle: "Do the people at the top actually use AI themselves?",
      icon: "👔",
      questions: [
        "Our senior leaders have personally used AI tools (not just seen demos)",
        "Leadership can clearly explain why AI matters for our business, beyond \"everyone else is doing it\"",
        "Leaders talk about AI in terms of people and outcomes, not just efficiency and cost savings",
        "There is clear accountability for AI adoption. Someone can be asked \"how is it going?\" and give a real answer",
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
        "Most employees see AI as something that helps them, not a threat to their job",
        "There are people in the organization already experimenting with AI on their own initiative",
        "We have actually asked employees how they feel about AI (not assumed)",
      ],
    },
    {
      id: "culture",
      title: "Culture of Change",
      subtitle: "Does your organization have the muscle to adopt something new?",
      icon: "🔄",
      questions: [
        "When we introduce new tools or processes, people generally give them a fair try",
        "We celebrate early experiments, even when they do not work perfectly",
        "Managers are empowered to decide how their teams use AI, without waiting for permission from the top",
        "We have stopped doing at least one thing the old way because AI now handles it better",
        "People trust that leadership has their interests in mind during change",
      ],
    },
    {
      id: "foundations",
      title: "Practical Foundations",
      subtitle: "Are the basics in place to actually start?",
      icon: "🔧",
      questions: [
        "Employees have access to at least one AI tool (ChatGPT, Claude, Copilot, etc.)",
        "We have basic guidelines about what data can and cannot go into AI tools",
        "There is a budget or willingness to invest in AI tools and training",
        "We can identify 5 to 10 enthusiastic early adopters who would join an AI pilot project tomorrow",
        "The AI tools we provide are good enough that employees do not need to find their own",
      ],
    },
  ],
  tierData: [
    {
      range: [113, 125], label: "AI-Driven Organization", color: "#10b981",
      summary: "AI is embedded in how your organization operates. You have moved past pilots into systematic use. Processes have been retired, teams are enabled, and leadership is walking the talk.",
      action: "Your focus now is governance, scaling, and staying ahead. Build the systems that make AI adoption self-sustaining: shared prompt libraries, onboarding that includes AI, and regular reviews of what else can be retired. Your biggest risk is complacency.",
    },
    {
      range: [100, 112], label: "Ready to Accelerate", color: "#059669",
      summary: "Your organization has the foundations in place. Leadership is engaged, employees are willing, and you have clarity on what you are trying to achieve. There are still gaps to close before AI is truly embedded.",
      action: "Move from pockets of adoption to systematic rollout. Form a pilot group of 5 to 10 early adopters who solve real problems with AI. Focus on creating visible wins fast and scaling from there.",
    },
    {
      range: [75, 99], label: "Ready to Start, With Focus", color: CYAN,
      summary: "You have pockets of readiness but some gaps. Most likely, leadership is keen but employees are uncertain, or you have enthusiasm but lack structure.",
      action: "Start with the curious. Do not try to fix every gap first. Launch a small pilot and let the results build the case. Get your early adopters their first real AI experience this week.",
    },
    {
      range: [50, 74], label: "Groundwork Needed", color: "#f59e0b",
      summary: "There is interest but not enough safety, clarity, or trust to launch an initiative yet. Pushing ahead now risks creating compliance without buy-in.",
      action: "Start with leadership. Leaders need to use AI themselves first because you cannot coach what you have not practiced. Focus on building psychological safety and identifying your natural early adopters.",
    },
    {
      range: [25, 49], label: "Not Yet. And That's Okay", color: RED_ACCENT,
      summary: "Your organization is not ready for an AI initiative right now. That does not mean it is a failure. It means other things need to come first: trust, change fatigue, leadership alignment, or basic access to tools.",
      action: "Do not force it. Work on the underlying culture of change first. Start with one-on-one conversations with leaders about what is really getting in the way. Come back to AI once the foundation of trust is stronger.",
    },
  ],
  sectionAdvice: {
    clarity: {
      low: "Lots of enthusiasm, no focus. The danger here is trying to do everything at once and achieving nothing. Pick one business problem, one team, one quarter. Prove it works there before expanding.",
      mid: "There is a general sense of direction but it may not be specific enough. Sharpen your focus: can you name the exact problem AI will solve, for whom, and how you will know it worked? If not, spend time on that before launching.",
      high: "Strategic clarity is strong. You know what you are solving and how to measure it. This is rare and valuable, so protect this focus. The biggest threat now is scope creep as other teams want in.",
    },
    leadership: {
      low: "Leaders are delegating AI without experiencing it themselves. Before rolling out anything, get leaders hands-on. Have each one spend 30 minutes using AI on a real work problem. You cannot credibly lead a change you have not lived through.",
      mid: "Leadership is engaged but may not be modeling the behavior consistently. Make AI usage visible at the top. Share what you are using it for in team meetings, show your prompts, and be honest about what did not work.",
      high: "Leadership readiness is strong. Your leaders are walking the talk. Now use that credibility to create safety for others. When the CEO says \"I tried this and it was terrible at first,\" it gives everyone permission to be imperfect.",
    },
    sentiment: {
      low: "Employees are likely fearful or hiding their AI use. This is the biggest red flag because it means people do not feel safe. Before any initiative, create psychological safety. Start by asking (not telling) how people feel. The question \"Are you already using AI?\" asked without judgment can surface a lot.",
      mid: "There is a mix of curiosity and caution. Some people are experimenting quietly. Your job is to bring those quiet experimenters into the light. Celebrate them, give them a platform, and let their peers see that it is safe to try.",
      high: "Employees are open and willing. This is your fuel. Do not waste it with heavy-handed rollouts. Channel this energy into a pilot group where their enthusiasm can produce visible results.",
    },
    culture: {
      low: "This is not an AI problem. It is a trust and change fatigue problem. Your organization has been through too many initiatives that did not stick. Address the underlying culture before adding more change. AI will still be there when you are ready.",
      mid: "The organization can handle change but needs proof that this time is different. Start small, show results quickly, and critically, do not over-promise. Under-promise and over-deliver to rebuild change credibility.",
      high: "Your change muscle is strong. People are willing to try new things and trust that leadership has their back. Use this to move fast. Your biggest risk is actually moving too slowly and losing the momentum.",
    },
    foundations: {
      low: "Good intentions but no infrastructure. People cannot adopt AI if they cannot access it. Solve the basics first: get tools in people's hands, create simple data guidelines (not a 50-page policy), and make sure IT is not blocking access \"for security\" without a real plan.",
      mid: "The basics are partially in place but may be inconsistent. Some teams have access, others do not. Some guidelines exist but people are not sure about them. Standardize access and simplify your guidelines into a one-page \"what is okay and what is not\" document.",
      high: "Foundations are solid. People have tools, there are guardrails, and you can identify your early adopters. You are ready to move. Do not let planning become a substitute for action.",
    },
  },
};

// ============================================
// LEADER DIAGNOSTIC - AI Leadership (v2)
// 6 dimensions x 4 questions = 24 questions, max 120
// ============================================
export const leaderConfig = {
  title: "AI Leadership Diagnostic",
  subtitle: "How is AI changing how you lead?",
  description: "24 questions across 6 dimensions. Takes about 8 minutes.\nThis is about your personal AI leadership journey, not your organization's.",
  diagnosticType: "Leader",
  empathyGap: null,
  sections: [
    {
      id: "integration",
      title: "Integration",
      subtitle: "Is AI part of how you lead, not just something you have tried?",
      icon: "🎯",
      questions: [
        "I use AI multiple times a week as part of how I lead",
        "I am using AI for more parts of my leadership role now than I was three months ago",
        "When I start a new task or project, I naturally consider whether AI should be involved",
        "I have tried using AI for a leadership challenge that is outside my usual comfort zone",
      ],
    },
    {
      id: "depth",
      title: "Depth",
      subtitle: "Are you using AI for strategic thinking, or just admin tasks?",
      icon: "🧠",
      questions: [
        "I use AI for strategic thinking, not just routine tasks like drafting emails or summarizing documents",
        "I have used AI to test my thinking before making a decision",
        "I go back and forth with AI to sharpen my thinking, rather than accepting the first response",
        "AI has helped me see a leadership challenge differently than I would have on my own",
      ],
    },
    {
      id: "deletion",
      title: "Deletion",
      subtitle: "Have you actually retired old processes for your team?",
      icon: "✂️",
      questions: [
        "I can name at least one report, meeting, or process that my team no longer does the old way because AI handles it",
        "I have told my team they can stop doing a task by hand because AI handles it",
        "AI has directly reduced the time my team spends on routine or repetitive work",
        "When my team starts using AI for something new, I ask what we can stop doing as a result",
      ],
    },
    {
      id: "enabling",
      title: "Enabling",
      subtitle: "Are you helping your team adopt AI, or just expecting them to figure it out?",
      icon: "🤝",
      questions: [
        "I have shared my own AI prompts, workflows, or techniques with my team",
        "I encourage my team to try AI, even if it does not work perfectly at first",
        "I have helped at least one person on my team move from basic AI use to something more meaningful",
        "I make time for my team to learn and experiment with AI, not just expect them to figure it out on their own",
      ],
    },
    {
      id: "judgment",
      title: "Judgment",
      subtitle: "Do you use AI wisely and model that for others?",
      icon: "⚖️",
      questions: [
        "I have caught and corrected a meaningful error in AI output before acting on it",
        "I know when AI is the wrong tool for a leadership decision and I choose not to use it",
        "I know that AI can sound certain even when it is wrong, and I check for that",
        "I can explain to others why I used AI and how I checked the result",
      ],
    },
    {
      id: "environment",
      title: "Environment",
      subtitle: "Are you creating the conditions for your team to use AI safely and well?",
      icon: "🌱",
      questions: [
        "I openly talk about my own AI use with my team, including what works and what does not",
        "I have made it clear to my team that experimenting with AI is safe and will not be held against them",
        "The rules my organization has around AI help my team rather than block them",
        "The AI tools my organization provides are good enough that my team does not need to use other AI tools",
      ],
    },
  ],
  tierData: [
    {
      range: [109, 120], label: "AI Pioneer", color: "#7c3aed",
      summary: "You are not just using AI as a leader. You are reshaping how your team works. You have retired old processes, you actively enable others, and you model wise AI use.",
      action: "Your biggest impact now is beyond your own team. Help other leaders in your organization see what is possible. Share your process openly. Coach your peers. Build the case for what AI leadership looks like.",
    },
    {
      range: [97, 108], label: "AI Advanced", color: "#10b981",
      summary: "AI is woven into how you lead. You are strong across most dimensions, but there are still one or two areas where you can go deeper, most likely in Deletion or Enabling.",
      action: "Look at which dimensions are pulling your score down. If Deletion is low, identify one process your team can stop doing the old way. If Enabling is low, share one prompt with your team this week. If Environment is low, ask your team: do you feel safe experimenting with AI?",
    },
    {
      range: [73, 96], label: "Active Explorer", color: CYAN,
      summary: "You are using AI regularly and seeing real results. You have good personal habits forming, but there is room to go deeper on the leadership dimensions: enabling your team and retiring old processes.",
      action: "Look at which dimensions are lagging. If Deletion is low, identify one process your team can stop doing the old way this month. If Enabling is low, share one prompt with your team this week. If Environment is low, ask your team directly: do you feel safe experimenting with AI?",
    },
    {
      range: [49, 72], label: "Getting Started", color: "#f59e0b",
      summary: "You have dipped into AI but it has not become part of how you lead yet. You probably use it for simple tasks and have not explored its potential as a strategic thinking partner or a team enabler.",
      action: "Pick one leadership task you do every week and commit to using AI for it. Preparing for a meeting, reviewing a proposal, thinking through a decision. Build the personal habit first. Then share what you learn with your team.",
    },
    {
      range: [24, 48], label: "Untapped Potential", color: RED_ACCENT,
      summary: "AI could transform how you lead, but you have not started yet. That is not a criticism. It is an opportunity. Most leaders are in the same position.",
      action: "Start with one conversation. Open an AI tool and say: \"I am a leader dealing with [your biggest challenge]. Ask me questions to help me think this through.\" That single experience often changes everything.",
    },
  ],
  sectionAdvice: {
    integration: {
      low: "AI is not part of how you lead yet. Before you can enable your team, you need the personal habit first. Pick one leadership task you do every week, such as preparing for a meeting, reviewing a proposal, or thinking through a decision, and commit to using AI for it.",
      mid: "You are using AI regularly but it has not become automatic. Look for the leadership moments where AI could help but you forget to reach for it. The goal is to reach the point where not using AI feels like a missed opportunity.",
      high: "AI is woven into how you lead. This consistency is what separates leaders who \"get\" AI from those who are still experimenting. Now the question is whether your team sees this and learns from it.",
    },
    depth: {
      low: "You are probably using AI for routine tasks like drafting emails or summarizing. That is a fine start, but AI can be a genuine thinking partner for leadership decisions. Try asking AI to challenge your thinking on a decision before you act on it. That single shift changes everything.",
      mid: "You are starting to use AI for strategic work, not just admin. Push further by iterating. The best AI results come from going back and forth, not from a single prompt. Before your next big decision, have a multi-turn conversation with AI about it.",
      high: "You are using AI as a real thinking partner for leadership work. You challenge it, it challenges you, and your decisions are better for it. Share this approach with your peers. Most leaders have not discovered this yet.",
    },
    deletion: {
      low: "Your team is probably doing everything the old way and adding AI on top. That means more work, not less. The most powerful thing you can do as a leader is give your team explicit permission to stop doing something. Name one task, meeting, or report that AI can replace, and tell your team to let it go.",
      mid: "You have started retiring some old processes, but there is more to cut. Ask your team: \"What are you still doing by hand that AI could handle?\" You will be surprised how many things persist simply because nobody said it was okay to stop.",
      high: "You are actively subtracting, not just adding. You give your team permission to stop, and you model that behavior yourself. This is the hardest leadership behavior to build and the most transformative.",
    },
    enabling: {
      low: "Your team is figuring out AI on their own, or not figuring it out at all. This is the biggest gap in most AI leadership. Share one prompt that works for you. Encourage one person to try something new. Show your team that you care about their AI growth, not just your own.",
      mid: "You are actively helping your team, but it may not be consistent yet. The next step is making AI development part of how your team works: dedicate time for learning, celebrate experiments, and pair stronger users with those who are still starting out.",
      high: "You are building AI capability across your team. You share, you coach, you make time, and you create safety for experimentation. This is leadership at its best. Your team's AI growth is a direct reflection of your investment in them.",
    },
    judgment: {
      low: "You may be accepting AI output without checking it, or avoiding AI for important decisions because you do not trust it. Either way, your team is watching. Model the right behavior: use AI for real work, but always review what it gives you. When you catch an error, share that story with your team.",
      mid: "You have good judgment about AI output. Keep developing your ability to spot when AI sounds confident but is wrong. And importantly, share those moments with your team. When you say \"AI got this wrong and here is how I caught it,\" you are teaching judgment by example.",
      high: "You have excellent judgment and you model it openly. You know when to trust AI, when to push back, and when not to use it at all. This critical thinking sets the standard for your entire team.",
    },
    environment: {
      low: "Your team may not feel safe experimenting with AI, or the tools and rules are getting in the way. This is the dimension where leaders have the most direct control. Ask your team: \"Do you feel safe trying AI at work?\" If the answer is no, that is your first problem to solve, before any training or tools.",
      mid: "Some conditions are in place but not all. You might be encouraging AI use verbally but not making time for it, or providing tools but not clarity on the rules. Identify the one biggest blocker your team faces and remove it.",
      high: "You are creating an environment where AI adoption can flourish. Your team feels safe, the tools work, and the rules help rather than block. This is the foundation everything else is built on. Protect it.",
    },
  },
};

// ============================================
// TEAM DIAGNOSTIC - Personal AI Use (v2)
// 6 dimensions x 4 questions = 24 questions, max 120
// ============================================
export const teamConfig = {
  title: "Personal AI Diagnostic",
  subtitle: "How is AI actually changing your work?",
  description: "24 questions across 6 dimensions. Takes about 8 minutes.\nThis is about you, not your team or organization.",
  diagnosticType: "Team",
  empathyGap: null,
  sections: [
    {
      id: "integration",
      title: "Integration",
      subtitle: "Has AI moved from something you try occasionally to something woven into your daily work?",
      icon: "🎯",
      questions: [
        "I use AI multiple times a week as part of how I get real work done",
        "I am using AI for more things now than I was three months ago",
        "When I start a new task, I naturally consider whether AI should be part of it",
        "I have tried using AI for a task that is outside my usual job responsibilities",
      ],
    },
    {
      id: "depth",
      title: "Depth",
      subtitle: "Are you using AI for real thinking, or just surface tasks?",
      icon: "🧠",
      questions: [
        "I use AI for tasks that require real thinking, not just formatting or summarizing",
        "I have used AI to test my thinking before making a decision",
        "I go back and forth with AI to improve results, rather than accepting the first response",
        "AI has helped me see a problem differently than I would have on my own",
      ],
    },
    {
      id: "deletion",
      title: "Deletion",
      subtitle: "Have you actually stopped doing things the old way?",
      icon: "✂️",
      questions: [
        "I can name at least one task or deliverable I no longer do by hand because AI handles it",
        "AI has helped me cut down or remove at least one regular meeting or report",
        "AI has directly reduced the time I spend on routine or repetitive work",
        "When I find a new way to use AI, I look for what I can stop doing as a result",
      ],
    },
    {
      id: "influence",
      title: "Influence",
      subtitle: "Are you helping others change how they work, or just changing your own habits?",
      icon: "🤝",
      questions: [
        "I have shared a prompt, template, or workflow with a colleague that they now use",
        "People on my team or in my network come to me with AI questions",
        "I have helped at least one other person move from basic AI use to something more meaningful",
        "I actively look for ways to bring AI into team processes, not just my own tasks",
      ],
    },
    {
      id: "judgment",
      title: "Judgment",
      subtitle: "Do you use AI wisely, not just frequently?",
      icon: "⚖️",
      questions: [
        "I have caught and corrected a meaningful error in AI output before using it",
        "I know when AI is the wrong tool and I choose not to use it in those situations",
        "I know that AI can sound certain even when it is wrong, and I check for that",
        "I can explain to others why I used AI and how I checked the result",
      ],
    },
    {
      id: "environment",
      title: "Environment",
      subtitle: "Do the conditions around you actually support using AI?",
      icon: "🌱",
      questions: [
        "I feel safe experimenting with AI at work without fear of judgment or blame if something goes wrong",
        "My manager or leadership team openly encourages using AI and models it themselves",
        "The rules my organization has around AI help me rather than block me",
        "The AI tools my organization provides are good enough that I do not need to use other AI tools",
      ],
    },
  ],
  tierData: [
    {
      range: [109, 120], label: "AI Pioneer", color: "#7c3aed",
      summary: "You are not just using AI. You are reshaping how work gets done around you. You have deleted old processes, you help others grow, and your judgment about AI is mature.",
      action: "Your biggest impact now is beyond your own work. Help your organization build the systems, habits, and culture that make AI adoption stick. You are the proof of what is possible.",
    },
    {
      range: [97, 108], label: "AI Advanced", color: "#10b981",
      summary: "AI is part of how you work, think, and collaborate. You are strong across most dimensions, but there are still one or two areas where you can go deeper.",
      action: "Look at which dimensions are pulling your score down. That is where your next breakthrough lives. If Deletion is lagging, challenge yourself to retire one more process. If Influence is low, start sharing what you know.",
    },
    {
      range: [73, 96], label: "Gaining Momentum", color: CYAN,
      summary: "You have moved past experimentation into regular, meaningful use. AI is part of your toolkit, and you are starting to see real benefits. There is still room to go deeper.",
      action: "Look at which dimensions are lagging. If Depth is low, push yourself beyond basic tasks into using AI for real thinking. If Deletion is low, identify one manual process you can retire this week. If Influence is low, share one useful prompt with a colleague.",
    },
    {
      range: [49, 72], label: "Early Progress", color: "#f59e0b",
      summary: "You are using AI, but it has not yet changed how you actually work. You are likely still doing everything the old way and adding AI as an extra step on top.",
      action: "Pick one recurring task and commit to doing it with AI for two weeks straight. Do not try to transform everything. Build one habit first. Once one workflow clicks, the rest follows naturally.",
    },
    {
      range: [24, 48], label: "Starting Out", color: RED_ACCENT,
      summary: "You are at the beginning. That is perfectly fine. Most people are here.",
      action: "Start with something simple and personal. Ask AI to help you draft an email, summarize a document, or explain a concept you have been meaning to learn. The first experience should feel easy and useful, not overwhelming.",
    },
  ],
  sectionAdvice: {
    integration: {
      low: "AI is not part of how you work yet. That is the single biggest thing to fix. Pick one task you do every week and commit to trying it with AI for the next two weeks. Do not aim for perfection. Aim for a habit.",
      mid: "You are using AI regularly but it is not automatic yet. Look for the moments in your day where AI could help but you forget to reach for it: starting a new document, preparing for a meeting, facing a blank page. Those are your triggers.",
      high: "AI is woven into how you work. This consistency is what builds real skill over time. You have moved past \"should I use AI?\" to \"how should I use AI for this?\" Keep pushing into new areas.",
    },
    depth: {
      low: "You are probably using AI for simple tasks like drafting or summarizing. That is a good start, but AI can do much more. Try asking AI to challenge your thinking on a decision you are making. The shift from \"do this for me\" to \"help me think about this\" is where the real value lives.",
      mid: "You are starting to use AI for real thinking, not just tasks. Go deeper by iterating: send a prompt, review the response, then push back or ask for a different angle. The best results come from the second or third exchange, not the first.",
      high: "You are using AI as a genuine thinking partner. You iterate, you challenge, and you let AI challenge you back. This depth is rare and valuable. Consider sharing your approach with others who are still at the surface level.",
    },
    deletion: {
      low: "You are adding AI on top of everything you already do. That means more work, not less. The question to ask yourself: \"Now that AI can do this, what can I stop doing?\" Start with one thing. Even a small deletion proves the concept.",
      mid: "You have started to cut back on some old ways of working, but there is more to retire. Look at your calendar and your recurring tasks. Which meetings could be shorter? Which reports could be replaced? Which manual steps are still there just because \"we have always done it that way\"?",
      high: "You are actively subtracting, not just adding. This is the hardest behavior to build and the most valuable. You understand that real transformation means doing less of the old, not just more of the new.",
    },
    influence: {
      low: "You are keeping your AI use to yourself. That is fine as a starting point, but the biggest impact comes from sharing. Next time AI helps you with something useful, share the prompt or the result with one colleague. That is all it takes to start.",
      mid: "You are starting to share and help others. Keep going. The people who come to you with AI questions are your signal that you are becoming a multiplier. Pay attention to what they struggle with, because those struggles point to where the whole team needs help.",
      high: "You are a natural AI champion. People come to you, you share what works, and you help others grow. This is one of the most valuable roles in any organization right now. Make sure your manager and leadership know what you are doing, because they need people like you to lead adoption.",
    },
    judgment: {
      low: "You may be accepting AI output without checking it, or avoiding AI for important work because you do not trust it. The sweet spot is in between: use AI for real work, but always review what it gives you. Every AI output deserves a human check.",
      mid: "You have a healthy relationship with AI output. You check it but you are willing to use it for work that matters. Keep developing your ability to spot when AI sounds confident but is wrong. That is the most important skill.",
      high: "You have strong judgment about AI. You know when to trust it, when to push back, and when not to use it at all. This critical thinking is exactly what makes AI useful rather than risky.",
    },
    environment: {
      low: "The conditions around you are not supporting AI use. This might mean you do not feel safe experimenting, your manager is not encouraging it, or the rules and tools are getting in the way. This is not your fault, but it is worth raising. If your leader does not know the environment is blocking you, nothing will change.",
      mid: "Some conditions are in place but not all. You might feel safe but lack good tools, or have good tools but unclear rules. Identify the one biggest blocker and raise it with your manager. Often, leaders do not realize what is getting in the way.",
      high: "Your environment actively supports AI use. You feel safe, your leader encourages it, the rules help, and the tools work. This is rare. Make the most of it by pushing yourself on the other dimensions, especially Depth and Deletion.",
    },
  },
};
