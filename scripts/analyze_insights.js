import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Setup ES module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY && process.env.VITE_SUPABASE_SERVICE_ROLE_KEY !== '') 
  ? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY 
  : process.env.VITE_SUPABASE_ANON_KEY;

if (supabaseKey === process.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ WARNING: Using the anon key for backend access. This might fail read policies.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BLOG_DATA_PATH = path.join(__dirname, '../src/data/blogPosts.json');

async function generateBlogArticle() {
  console.log('🔍 Querying RAG Engine for latest market insights to synthesize blog post...');

  // 1. Fetch top 5 insights for a comprehensive overview
  const { data: insights, error } = await supabase
    .from('market_insights')
    .select('content, metadata, sentiment_score, category')
    .order('sentiment_score', { ascending: false })
    .limit(5);

  if (error || !insights || insights.length === 0) {
    console.error('⚠️ No data found in RAG engine. Run "npm run ingest" first.', error);
    return;
  }

  const contextText = insights.map(i => `- [${i.category}] (Sentiment: ${i.sentiment_score}): ${i.content}`).join('\n');
  console.log(`✅ Analyzed ${insights.length} market insights for the blog.`);

  // 2. Generate a professional blog post
  const prompt = `
    You are an elite financial analyst and writer for "InvestAI PRO," a platform leveraging AI to find market edge.
    Based on the following RAG market data Context, write ONE highly compelling, insightful blog article.
    
    CONTEXT:
    ${contextText}
    
    GUIDELINES:
    1. Title: Create a catchy, professional title. Do not include the word "Title:" in your response. just output the title as the first line.
    2. Slug: Give a URL-friendly slug based on the title on the second line. e.g. "ai-invest-apple-growth". Do not label it.
    3. Category: Provide one of these categories on the third line: "Technology", "Macro Economics", "Crypto", "Alternative", "Markets".
    4. Content: Starting on the fourth line, write the full content of the post (at least 3 paragraphs). 
       Format it nicely using markdown (but only use paragraphs, basic bolding, or lists. Do NOT wrap it in a code block or use markdown headers).
       Ensure the tone is analytical, sophisticated, and shows how AI investing gives an edge.
  `;

  console.log('🤖 Synthesizing blog post with GPT-4o...');
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are the head of research and content at InvestAI PRO. Output ONLY EXACTLY what is requested. No polite intros." },
      { role: "user", content: prompt }
    ],
  });

  const rawOutput = completion.choices[0].message.content.trim().split('\n');
  const title = rawOutput[0].replace(/^[#* ]+/, '').trim();
  const slug = rawOutput[1].trim();
  const category = rawOutput[2].trim();
  const content = rawOutput.slice(3).join('\n').trim();

  const newPost = {
    id: `post-${Date.now()}`,
    title,
    slug,
    content,
    category,
    publishedAt: new Date().toISOString()
  };

  console.log('\n--- 📝 BLOG GENERATION PREVIEW ---');
  console.log(`Title: ${title}`);
  console.log(`Category: ${category}`);
  console.log(`Slug: ${slug}`);
  console.log(`Preview: ${content.substring(0, 150)}...`);
  console.log('----------------------------------\n');

  // 3. Save to Local JSON Map
  let existingPosts = [];
  try {
    if (fs.existsSync(BLOG_DATA_PATH)) {
      const data = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');
      existingPosts = JSON.parse(data);
    }
  } catch (e) {
    console.error('⚠️ Could not parse existing blog data. Starting fresh.');
  }

  existingPosts.unshift(newPost); // Add to front
  fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(existingPosts, null, 2));

  console.log('💾 Successfully saved new blog post to src/data/blogPosts.json!');
  console.log('🚀 SYSTEM STATUS: AI Insight Blog Generation COMPLETE.');
}

generateBlogArticle();
