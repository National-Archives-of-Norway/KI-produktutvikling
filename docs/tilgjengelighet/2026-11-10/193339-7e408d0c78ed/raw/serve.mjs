import {serveExport} from '/Users/khadah/Documents/ChatGPT/KI-utvikling/scripts/a11y/native.mjs';
const {server,baseUrl}=await serveExport('/private/tmp/portal-a11y-060/fixture');
console.log(baseUrl);
process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
