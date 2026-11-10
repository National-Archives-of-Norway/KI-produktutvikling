import {serveExport} from '/Users/khadah/Documents/ChatGPT/KI-utvikling/scripts/a11y/native.mjs';
const {server,baseUrl}=await serveExport('/private/tmp/portal-a11y-fix-060/fixture');
console.log(JSON.stringify({baseUrl,pid:process.pid}));
process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
