import { useState, useEffect } from "react";

export function useSimulation(prompt) {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);

  const generate = async (userPrompt) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const { data } = await response.json();

      setExplanation(data.explanation);
      setCode(data.code);

      // Create the sandbox environment string
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.min.js"></script>
            <style>
              body { margin: 0; padding: 0; overflow: hidden; background: #0f172a; }
              canvas { display: block; }
            </style>
          </head>
          <body>
            <script>${data.code}<\/script>
          </body>
        </html>
      `;

      // Convert string to a Blob and create a URL
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      // Cleanup old URL to save memory
      if (blobUrl) URL.revokeObjectURL(blobUrl);

      setBlobUrl(url);
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, explanation, blobUrl };
}
