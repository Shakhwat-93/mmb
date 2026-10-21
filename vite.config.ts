import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function metaConversionsDevPlugin() {
  return {
    name: 'meta-conversions-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/meta-conversions', (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
          res.statusCode = 200;
          return res.end();
        }

        if (req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', async () => {
            try {
              const parsedBody = bodyStr ? JSON.parse(bodyStr) : {};
              req.body = parsedBody;

              res.setHeader('Content-Type', 'application/json');
              res.status = (code) => { res.statusCode = code; return res; };
              res.json = (data) => {
                res.end(JSON.stringify(data));
                return res;
              };

              const { default: handler } = await import('./api/meta-conversions.js');
              await handler(req, res);
            } catch (err) {
              console.error('Local CAPI dev proxy error:', err);
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end('Method Not Allowed');
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), metaConversionsDevPlugin()],
  server: {
    proxy: {
      '/api/supabase': {
        target: 'http://supabasekong-a5tg2fvpwj6emkewfdknamid.187.77.159.209.sslip.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/supabase/, '')
      }
    }
  }
})
