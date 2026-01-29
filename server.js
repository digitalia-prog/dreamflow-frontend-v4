const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate', async (req, res) => {
  const { type, niche, platform, subject } = req.body;
  
  console.log('Reçu:', { type, niche, platform, subject });
  
  const prompts = {
    script: `Crée un SCRIPT UGC complet pour ${platform}. Niche: ${niche}. Sujet: ${subject}. Format: Hook (3s) + Body (20s) + CTA.`,
    hook: `Génère 5 HOOKS VIRAUX pour ${platform}. Niche: ${niche}. Sujet: ${subject}.`,
    prompt: `Crée un PROMPT HOOK OPTIMISÉ pour ${platform}. Niche: ${niche}. Sujet: ${subject}.`,
    hack: `Génère un GROWTH HACK pour ${platform}. Niche: ${niche}. Sujet: ${subject}.`
  };
  
  if (!prompts[type]) {
    return res.status(400).json({ error: `Type invalide: ${type}` });
  }
  
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompts[type] }],
      max_tokens: 1500
    });
    
    res.json({
      content: completion.choices[0].message.content,
      type
    });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static('.'));

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
