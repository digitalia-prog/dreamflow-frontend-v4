const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (req, res) => {
  const { type, mode, niche, style, lang, platform, subject } = req.body;
  
  const prompts = {
    script: `Crée un SCRIPT UGC complet pour ${platform} en ${lang}. Niche: ${niche}. Style: ${style}. Sujet: ${subject}. Format: Hook (3s) + Body (20s) + CTA. Sois créatif et viral!`,
    hook: `Génère 5 HOOKS VIRAUX pour ${platform} en ${lang}. Niche: ${niche}. Sujet: ${subject}. Chaque hook < 10 mots. Très accrocheur!`,
    prompt: `Crée un PROMPT HOOK OPTIMISÉ pour ${platform}. Niche: ${niche}. Sujet: ${subject}. Structure + exemples + formules business.`,
    hack: `Génère un GROWTH HACK pour ${platform} spécifique à ${niche}. Sujet: ${subject}. Actionnable et unique!`
  };
  
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
    res.status(500).json({ error: error.message });
  }
};
