const envs = Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('KEY') || k.includes('VITE_'));
console.log(envs.map(k => `${k}=${process.env[k] ? 'present' : 'empty'}`).join('\n'));
