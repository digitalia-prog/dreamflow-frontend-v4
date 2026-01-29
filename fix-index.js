const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remplacer les blocs if/else par des appels OpenAI
html = html.replace(
  /if\(contentType==='script'\)\{[\s\S]*?\}else if\(contentType==='hook'\)\{[\s\S]*?\}else if\(contentType==='prompt'\)\{[\s\S]*?\}else if\(contentType==='hack'\)\{[\s\S]*?\}/,
  `if(contentType==='script'){
    script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "script");
  }else if(contentType==='hook'){
    script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "hook");
  }else if(contentType==='prompt'){
    script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "prompt");
  }else if(contentType==='hack'){
    script = await generateWithOpenAI(niche, platform, sub, 1, lang, style, "hack");
  }`
);

fs.writeFileSync('index.html', html);
console.log('✅ Done!');
