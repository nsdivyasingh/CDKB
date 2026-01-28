export async function generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedText?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error("Gemini embedding failed");
    }
  
    const data = await response.json();
  
    // Gemini returns: { embedding: { values: number[] } }
    return data.embedding.values;
  }
  