/* 🚀 InvestAI: Frontend RAG Retrieval Engine
   Similarity Search for Contextual AI Interaction
*/

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  (import.meta as any).env.VITE_SUPABASE_URL, 
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY
);

// Note: In a production app, the OpenAI call should happen in a secure backend (Vercel Edge Function).
// For the Alpha release, we are using the browser-safe client approach (Vite Env).
const openai = new OpenAI({ 
  apiKey: (import.meta as any).env.VITE_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true // ONLY for development prototyping/alpha
});

export interface RAGInsight {
  content: string;
  metadata: any;
  similarity: number;
}

export async function retrieveMarketContext(query: string): Promise<string> {
  console.log('🔍 Retrieving context for query:', query);

  try {
    // 1. Generate an embedding for the user's question
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const [{ embedding }] = embeddingResponse.data;

    // 2. Perform a similarity search in Supabase (calling our match_market_insights RPC)
    const { data: insights, error } = await supabase.rpc('match_market_insights', {
      query_embedding: embedding,
      match_threshold: 0.5, // Minimum similarity threshold
      match_count: 5        // Top 5 contextually relevant pieces of data
    });

    if (error) {
      console.error('❌ RAG Retrieval Error:', error.message);
      return '';
    }

    if (!insights || insights.length === 0) {
      console.log('⚠️ No matching market insights found in RAG.');
      return '';
    }

    // 3. Combine matching insights into a context string
    const context = insights
      .map((i: any) => `[MARKET DATA]: ${i.content}`)
      .join('\n');

    console.log(`✅ Retrieved ${insights.length} matching insights.`);
    return context;

  } catch (error) {
    console.error('🛑 RAG Engine Critical Failure:', error);
    return '';
  }
}
