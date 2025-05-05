
import { ReelProcessResponse, Category } from "./types";

// OpenAI API Key from environment
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
    
    console.log("Processing with OpenAI:", reelText);
    
    try {
      // Try to make an API call to OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
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
      
      if (!response.ok) {
        throw new Error(`OpenAI API returned ${response.status}`);
      }
      
      const data = await response.json();
      
      try {
        // Try to parse OpenAI response as JSON
        const aiResponse = JSON.parse(data.choices[0].message.content);
        return {
          title: aiResponse.title || "New Reel",
          summary: aiResponse.summary || reelText.substring(0, 150),
          category: validateCategory(aiResponse.category) || determineCategory(categoryHint)
        };
      } catch (parseError) {
        // If JSON parsing fails, use the raw response text
        const content = data.choices[0].message.content;
        const title = content.split('\n')[0].substring(0, 50) || "New Reel";
        const summary = content.substring(0, 150) || reelText.substring(0, 150);
        
        return {
          title,
          summary,
          category: determineCategory(categoryHint)
        };
      }
    } catch (apiError) {
      console.error("Error calling OpenAI API:", apiError);
      // Fall back to local processing
      return processFallback(reelText, categoryHint);
    }
  } catch (error) {
    console.error("Error processing with OpenAI:", error);
    throw new Error("Failed to process reel content with AI");
  }
}

// Validate that the category is one of our defined categories
function validateCategory(category: string): Category | null {
  const normalizedCategory = category?.toLowerCase() || '';
  
  const categoryMap: Record<string, Category> = {
    'recipe': 'Recipes',
    'recipes': 'Recipes',
    'food': 'Recipes',
    'cooking': 'Recipes',
    'movie': 'Movies',
    'movies': 'Movies',
    'film': 'Movies',
    'cinema': 'Movies',
    'tool': 'Tools',
    'tools': 'Tools',
    'gadget': 'Tools',
    'tech': 'Tools',
    'anime': 'Anime',
    'animation': 'Anime',
    'manga': 'Anime',
    'hack': 'LifeHacks',
    'life hack': 'LifeHacks',
    'lifehack': 'LifeHacks',
    'life hacks': 'LifeHacks',
    'book': 'Books',
    'books': 'Books',
    'literature': 'Books',
    'fitness': 'Fitness',
    'workout': 'Fitness',
    'exercise': 'Fitness',
    'health': 'Fitness',
    'note': 'Notes',
    'notes': 'Notes',
  };
  
  for (const [key, value] of Object.entries(categoryMap)) {
    if (normalizedCategory.includes(key)) {
      return value;
    }
  }
  
  return null;
}

// Determine category based on keyword hints
function determineCategory(hint: string): Category {
  if (!hint) return "Uncategorized";
  
  if (hint.includes("recipe")) return "Recipes";
  if (hint.includes("movie")) return "Movies";
  if (hint.includes("tool")) return "Tools";
  if (hint.includes("anime")) return "Anime";
  if (hint.includes("hack") || hint.includes("life")) return "LifeHacks";
  if (hint.includes("book")) return "Books";
  if (hint.includes("fitness")) return "Fitness";
  if (hint.includes("note")) return "Notes";
  
  return "Uncategorized";
}

// Fallback processing when OpenAI API fails
function processFallback(reelText: string, categoryHint: string): ReelProcessResponse {
  // Extract a title from the text
  const possibleTitle = reelText.split(':')[1]?.trim().split(' ').slice(0, 6).join(' ') || "New Reel";
  const title = possibleTitle.length > 50 ? possibleTitle.substring(0, 47) + "..." : possibleTitle;
  
  // Generate a summary from the text
  const summary = reelText.length > 100 
    ? reelText.substring(0, 150) + "..."
    : reelText;
  
  return {
    title: title,
    summary: summary,
    category: determineCategory(categoryHint)
  };
}
