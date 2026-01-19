import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import {
  generateUserPrompt,
  SYSTEM_INSTRUCTION,
} from "../prompts/p5prompts.js";

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const responseSchema = z.object({
  explanation: z.string(),
  code: z.string(),
});

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export async function geminiExecution(topic) {
  const result = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: generateUserPrompt(topic),
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      },
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(responseSchema),
    },
  });

  const data = responseSchema.parse(JSON.parse(result.text));
  console.log(data);

  try {
    return data;
  } catch (err) {
    console.error("Failed to parse AI output as JSON:", data);
    throw new Error("AI returned invalid JSON");
  }
}
