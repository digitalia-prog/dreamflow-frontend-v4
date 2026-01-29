const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remplacer bloc 1 (FUN - lignes 243-297)
html = html.replace(
  /if\(contentType==='script'\)\{[\s\S]*?\}else if\(contentType==='hack'\)\{[\s\S]*?`;\s*\}/,
  `if(contentType==='script'){script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "script");}
  else if(contentType==='hook'){script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "hook");}
  else if(contentType==='prompt'){script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "prompt");}
  else if(contentType==='hack'){script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "hack");}`
);

// Remplacer bloc 2 (BUSINESS - lignes 325-385)
html = html.replace(
  /if\(contentType==='script'\)\{[\s\S]*?\}else if\(contentType==='hack'\)\{[\s\S]*?`;\s*\}/,
  `if(contentType==='script'){script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "script");}
  else if(contentType==='hook'){script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "hook");}
  else if(contentType==='prompt'){script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "prompt");}
  else if(contentType==='hack'){script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "hack");}`
);

fs.writeFileSync('index.html', html);
console.log('✅ Tous les blocs remplacés!');
