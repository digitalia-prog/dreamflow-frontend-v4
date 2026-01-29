const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remplacer le DEUXIÈME bloc (lignes 278-338)
html = html.replace(
  /if\(contentType==='script'\)\{[\s\S]*?script=`[\s\S]*?`;\s*\}else if\(contentType==='hook'\)\{[\s\S]*?script=`[\s\S]*?`;\s*\}else if\(contentType==='prompt'\)\{[\s\S]*?script=`[\s\S]*?`;\s*\}else if\(contentType==='hack'\)\{[\s\S]*?script=`[\s\S]*?`;\s*\}/m,
  `if(contentType==='script'){
    script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "script");
  }else if(contentType==='hook'){
    script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "hook");
  }else if(contentType==='prompt'){
    script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "prompt");
  }else if(contentType==='hack'){
    script = await generateWithOpenAI(brand, platform, prod, 1, lang, style, "hack");
  }`
);

fs.writeFileSync('index.html', html);
console.log('✅ Bloc 2 remplacé!');
