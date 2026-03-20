---
description: 🤖 AI Insight Generation (Daily Asset Builder)
---

This workflow generates daily market insights, technical takeaways, and affiliate tool suggestions for the InvestAI engine.

### 📋 STEPS

1. **Synthesize Top 10 Insights**
   // turbo
   `npm run synthesize -- --top=10 --market=dynamic`
   
2. **Assign Monetization Tags**
   // turbo
   `npm run tag-tools -- --category="AlphaVantage,TrendSpider,Danelfin"`
   
3. **Draft Featured Insights**
   // turbo
   `npm run draft-insights -- --format="ShortsHook"`
   
4. **Export to AI Engine**
   // turbo
   `npm run export-insights -- --status=live`

---
*Status: Daily Insight Engine Complete.*
