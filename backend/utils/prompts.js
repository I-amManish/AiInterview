const getCodeLanguage = (question) => {
  const q = question.toLowerCase();
  if (q.includes("react") || q.includes("javascript") || q.includes("js")) return "js";
  if (q.includes("python")) return "python";
  if (q.includes("java")) return "java";
  if (q.includes("c++") || q.includes("cpp")) return "cpp";
  return "plaintext";
};

const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => {
  if (!role?.trim()) throw new Error("Role cannot be empty");
  if (!experience?.trim()) throw new Error("Experience level cannot be empty");
  if (typeof numberOfQuestions !== 'number' || numberOfQuestions < 1 || numberOfQuestions > 10) {
    throw new Error("Number of questions must be between 1-10");
  }

  const topicsArray = Array.isArray(topicsToFocus)
    ? topicsToFocus.filter(Boolean).map(topic => topic.trim())
    : typeof topicsToFocus === 'string'
      ? topicsToFocus.split(',').map(topic => topic.trim()).filter(Boolean)
      : [];

  if (topicsArray.length === 0) throw new Error("At least one topic must be provided");

  return `
You are an AI interview assistant.

Generate ${numberOfQuestions} concise technical interview questions and answers for the following role:

Role: ${role}
Experience Level: ${experience}
Topics to focus: ${topicsArray.join(', ')}

**Instructions**:
- Each answer should be easy to understand for beginners.
- Limit answers to 40–50 words.
- Format strictly like this (no extra markdown or symbols):

{
  "question": "Your question?",
  "answer": "Answer with clear explanation, 40–50 words max.",
  "category": "One of: ${topicsArray.join(', ')}"
}

Output a pure JSON array of ${numberOfQuestions} such objects. Do NOT include any markdown, extra formatting, or explanatory text.
`.trim();
};

const conceptExplainPrompt = (question) => {
  if (!question?.trim()) throw new Error("Question cannot be empty");

  return `
**Concept Explanation: "${question}"**

**Definition**: [Brief overview]
**Key Details**: [How it works, technical aspects]
**Usage**: [Where and why it’s used]
**Example**: 
\`\`\`${getCodeLanguage(question)}
[Minimal example]
\`\`\`
**Common Mistakes**: [Key pitfalls to avoid]

**Begin Explanation**:
`.trim();
};

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
