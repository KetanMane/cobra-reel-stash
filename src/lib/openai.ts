
import { ReelProcessResponse, Category } from "./types";

// OpenAI API Key - Note: In a production app, this should be stored securely on the server side
const OPENAI_API_KEY = "sk-1234abcd1234abcd1234abcd1234abcd1234abcd";

export async function processReelWithOpenAI(reelText: string): Promise<ReelProcessResponse> {
  try {
    // Check if input is a URL or text content
    const isUrl = reelText.startsWith('http') || reelText.startsWith('www.');
    
    // Extract any category hint that might be in the text
    const categoryHint = reelText.split(':')[0]?.toLowerCase();
    
    // Prepare the prompt for OpenAI
    const prompt = isUrl
      ? `This is an Instagram reel URL: ${reelText}. Extract and summarize the key content, provide a concise title, and categorize it. Format the response as JSON with fields: "title", "summary", and "category".`
      : `This is content from an Instagram reel: ${reelText}. Summarize the key points, provide a concise title, and categorize it. Format the response as JSON with fields: "title", "summary", and "category".`;
    
    // In a production app, this would be an API call to OpenAI
    console.log("Processing with OpenAI:", reelText);
    console.log("Using API key:", OPENAI_API_KEY);
    
    // For now, since we're using a placeholder API key, we'll simulate the response
    // In a real app, this would be:
    /*
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that processes Instagram Reels content. Extract key information and summarize it concisely."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);
    */
    
    // Determine appropriate category based on the hint
    let category: Category = "Uncategorized";
    if (categoryHint.includes("recipe")) category = "Recipes";
    else if (categoryHint.includes("movie")) category = "Movies";
    else if (categoryHint.includes("tool")) category = "Tools";
    else if (categoryHint.includes("anime")) category = "Anime";
    else if (categoryHint.includes("hack") || categoryHint.includes("life")) category = "LifeHacks";
    else if (categoryHint.includes("book")) category = "Books";
    else if (categoryHint.includes("fitness")) category = "Fitness";
    else if (categoryHint.includes("note")) category = "Notes";
    
    // Extract a title from the text
    const possibleTitle = reelText.split(':')[1]?.trim().split(' ').slice(0, 6).join(' ') || "New Reel";
    const title = possibleTitle.length > 50 ? possibleTitle.substring(0, 47) + "..." : possibleTitle;
    
    // Generate a summary from the text
    const summary = reelText.length > 100 
      ? reelText.substring(0, 150) + "..."
      : reelText;
    
    // For demo purposes, simulate a processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      title: title,
      summary: summary,
      category: category
    };
    
  } catch (error) {
    console.error("Error processing with OpenAI:", error);
    throw new Error("Failed to process reel content with AI");
  }
}
