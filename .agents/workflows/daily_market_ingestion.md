---
description: 📤 Daily Market Data Ingestion (RAG System)
---

This workflow automates the collection of financial data, news, and SEC filings into the RAG system for the InvestAI Intelligence Engine.

### 📋 STEPS

1. **Scan Market Tickers**
   // turbo
   `npm run ingest -- --tickers="BTC,NVDA,AAPL,SPY,PLTR,TSLA,ETH"`
   
2. **Fetch News & Sentiment**
   // turbo
   `npm run fetch-news -- --source="AlphaVantage,PerplexityResearch"`
   
3. **Analyze SEC Filings**
   // turbo
   `npm run parse-filings -- --recent=24h`
   
4. **Update Vector Database**
   // turbo
   `npm run update-rag -- --status=active`

---
*Status: Engine Primed for Real-time Interaction.*
