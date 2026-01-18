import { geminiExecution } from "../services/gemini.js";

export const generateSimulation = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await geminiExecution(prompt);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Generation Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate simulation. Try refining your prompt.",
    });
  }
};
