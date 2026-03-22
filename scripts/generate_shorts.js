/* 🚀 InvestAI: Viral Script AI Generator
   Uses RAG Data from Supabase to create YouTube Shorts Scripts
*/

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// For backend generation, preferably use the SERVICE_ROLE_KEY to bypass RLS.
// Falls back to ANON_KEY if service role is not defined.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY && process.env.VITE_SUPABASE_SERVICE_ROLE_KEY !== '') 
  ? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY 
  : process.env.VITE_SUPABASE_ANON_KEY;

if (supabaseKey === process.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ WARNING: Using the anon key for backend access. This will likely fail Row-Level Security (RLS) policies for SELECT.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateDailyViralShorts() {
  console.log('🔍 Querying RAG Engine for high-impact market moves...');

  // 1. Fetch top 3 high-sentiment news from Supabase (pgvector sorted by sentiment)
  const { data: insights, error } = await supabase
    .from('market_insights')
    .select('content, metadata, sentiment_score')
    .order('sentiment_score', { ascending: false })
    .limit(3);

  if (error || !insights || insights.length === 0) {
    console.error('⚠️ No data found in RAG engine. Run "npm run ingest" first.');
    return;
  }

  const contextText = insights.map(i => `- ${i.content}`).join('\n');
  console.log(`✅ Analyzed ${insights.length} market insights.`);

  // 2. Generate a viral YouTube Shorts script using the "Pattern Interrupt" framework
  const prompt = `
    You are an elite YouTube Shorts growth specialist.
    Based on the following market data Context, generate ONE viral 30-second script for an "AI Investing Engine" channel.
    Follow the "Pattern Interrupt" framework precisely.
    
    CONTEXT:
    ${contextText}
    
    SCRIPT FORMAT:
    - 0-3s: VISUAL_INTERRUPT (High shock factor) + HOOK (Curiosity/Pain)
    - 3-10s: THE "TRUTH" (The insight based on context)
    - 10-22s: THE REVEAL/ANALYSIS (Deep value)
    - 22-30s: CALL TO ACTION (Link in bio for InvestAI PRO engine)
    
    TONE: Fast-paced, high-stakes, technical authority.
  `;

  console.log('🤖 Generating script with GPT-4o...');
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are the head of traffic for InvestAI PRO." },
      { role: "user", content: prompt }
    ],
  });

  const script = completion.choices[0].message.content;

  console.log('\n--- 🎬 DAILY VIRAL SCRIPT OUTPUT ---');
  console.log(script);
  console.log('------------------------------------\n');

  console.log('🚀 SYSTEM STATUS: Automated Content Generation COMPLETE.');
}

// Running the generator
generateDailyViralShorts();
