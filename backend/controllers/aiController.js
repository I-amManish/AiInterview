const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  questionAnswerPrompt,
  conceptExplainPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Interview Questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    // Optional cleanup: remove markdown code fences and bold formatting
    const cleanedText = rawText
      .replace(/```[a-z]*\n?/gi, '') // Remove starting ```json or similar
      .replace(/```$/, '')           // Remove trailing ```
      .replace(/\*\*/g, '')          // Remove markdown bold
      .trim();

    // Try parsing to JSON
    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch {
      parsed = cleanedText;
    }

    const questions = Array.isArray(parsed)
      ? parsed.map(({ question, answer }) => ({ question, answer }))
      : parsed;

    res.status(200).json({ result: questions });
  } catch (error) {
    console.error("Error in generateInterviewQuestions:", error);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
      stack: error.stack,
    });
  }
};

// Generate Concept Explanation
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res
        .status(400)
        .json({ message: "Please provide a question or concept to explain" });
    }

    // Generate title from question (capitalize first letter)
    const title = question.charAt(0).toUpperCase() + question.slice(1);

    const prompt = conceptExplainPrompt(question);

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    // Clean up the AI response:
    let cleaned = rawText
      // Remove markdown code block fences and language tags like ```js or ```python
      .replace(/```[a-z]*\n?/gi, '')
      .replace(/```/g, '')
      // Remove markdown bold or italic markers (** or *)
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      // Replace escaped newlines and tabs if present
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      // Trim whitespace
      .trim();

    // Optional: further clean multiple consecutive empty lines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    res.status(200).json({ title, explanation: cleaned });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
