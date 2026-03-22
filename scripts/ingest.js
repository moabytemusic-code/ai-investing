/* 🚀 InvestAI: Daily Market Data Ingestor
   Uses Alpha Vantage for Market News & OpenAI for Embeddings
   Saves to Supabase Vector Store
*/

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// For backend ingestion, preferably use the SERVICE_ROLE_KEY to bypass RLS.
// Falls back to ANON_KEY if service role is not defined.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY && process.env.VITE_SUPABASE_SERVICE_ROLE_KEY !== '') 
  ? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY 
  : process.env.VITE_SUPABASE_ANON_KEY;

if (supabaseKey === process.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ WARNING: Using the anon key for backend ingestion. This will likely fail Row-Level Security (RLS) policies for INSERT.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function ingestMarketNews() {
  const tickers = ['AAPL', 'NVDA', 'BTC', 'ETH', 'TSLA', 'SPY'];
  const alphaVantageUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickers.join(',')}&limit=10&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  console.log('📡 Fetching Market News Sentiment...');
  try {
    const response = await fetch(alphaVantageUrl);
    let data = await response.json();

    if (!data.feed || data.feed.length === 0) {
      console.log('⚠️ No specific news found or API quota hit. checking fallback/Information...');
      
      const rateLimitMessage = data.Information || data.Note;
      if (rateLimitMessage) {
         console.warn('📡 ALPHA VANTAGE QUOTA: ', rateLimitMessage.substring(0, 100) + '...');
      }

      console.log('⏳ Waiting 2s to respect burst limits before fallback attempt...');
      await new Promise(r => setTimeout(r, 2000));

      const fallbackUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&limit=20&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
      const fallbackResponse = await fetch(fallbackUrl);
      const fallbackData = await fallbackResponse.json();
      
      if (!fallbackData.feed || fallbackData.feed.length === 0) {
         console.warn('📤 STATUS: News ingestion bypassed. Alpha Vantage returned no feed.');
         if (fallbackData.Information || fallbackData.Note) {
            console.warn('⚠️ QUOTA EXCEEDED: Alpha Vantage free tier (25 req/day) likely reached.');
         } else {
            console.log('📝 Raw Fallback Response:', JSON.stringify(fallbackData, null, 2));
         }
         return;
      }
      data = fallbackData;
    }

    console.log(`✅ Fetched ${data.feed.length} news articles.`);

    for (const article of data.feed) {
      const textToEmbed = `${article.title}. ${article.summary}`;
      console.log(`🧠 Embedding: ${article.title.substring(0, 50)}...`);

      // 1. Generate text embeddings (RAG)
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: textToEmbed,
      });

      const [{ embedding }] = embeddingResponse.data;

      // 2. Prepare metadata
      const metadata = {
        title: article.title,
        url: article.url,
        published_at: article.time_published,
        source: article.source,
        overall_sentiment_label: article.overall_sentiment_label,
        overall_sentiment_score: article.overall_sentiment_score,
      };

      // 3. Upsert into Supabase Vector Store
      const { error } = await supabase
        .from('market_insights')
        .insert({
          content: textToEmbed,
          metadata: metadata,
          embedding: embedding,
          sentiment_score: article.overall_sentiment_score,
          category: article.topics?.[0]?.topic || 'General'
        });

      if (error) {
        console.error('❌ Error saving to Supabase:', error.message);
      } else {
        console.log(`✅ Saved RAG Insight: ${article.title.substring(0, 30)}`);
      }
    }

    console.log('🚀 SYSTEM STATUS: Daily Market News Ingestion COMPLETE.');

  } catch (error) {
    console.error('🛑 MISSION FAILED: Ingestion Error:', error);
  }
}

// Running the ingestor
ingestMarketNews();
