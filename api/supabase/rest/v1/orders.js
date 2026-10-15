// Vercel Serverless Function: Dedicated proxy for /api/supabase/rest/v1/orders
// Handles order creations (POST), updates (PATCH), reads (GET), and preflights (OPTIONS)

const DEFAULT_TARGET_BASE = 'http://supabasekong-a5tg2fvpwj6emkewfdknamid.187.77.159.209.sslip.io';
const DEFAULT_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc4ODc3MzEwMCwiZXhwIjo0OTQ0NDQ2NzAwLCJyb2xlIjoiYW5vbiJ9.xKr5ARhjhbCSpBSFNjU9LuAl7Do_CMfN0So9h43swaQ';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const targetBase = process.env.SUPABASE_INTERNAL_URL || process.env.VITE_SUPABASE_URL || DEFAULT_TARGET_BASE;
    const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

    // Extract query string from request URL
    const rawUrl = req.url || '';
    const queryIdx = rawUrl.indexOf('?');
    const queryString = queryIdx !== -1 ? rawUrl.slice(queryIdx) : '';

    const targetUrl = `${targetBase}/rest/v1/orders${queryString}`;

    // Target host header for ingress routing on VPS
    const urlObj = new URL(targetBase);
    const hostHeader = urlObj.host;

    const headers = {};
    for (const [key, val] of Object.entries(req.headers)) {
      const lower = key.toLowerCase();
      if (!['host', 'connection', 'content-length'].includes(lower)) {
        headers[key] = val;
      }
    }
    headers['host'] = hostHeader;
    if (!headers['apikey']) headers['apikey'] = anonKey;
    if (!headers['authorization']) headers['authorization'] = `Bearer ${anonKey}`;
    if (!headers['content-type'] && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
      headers['content-type'] = 'application/json';
    }

    const fetchOptions = {
      method: req.method,
      headers
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const upstreamRes = await fetch(targetUrl, fetchOptions);
    res.status(upstreamRes.status);

    upstreamRes.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (!['content-encoding', 'transfer-encoding', 'content-length'].includes(lower)) {
        res.setHeader(key, val);
      }
    });

    const buffer = await upstreamRes.arrayBuffer();
    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('Orders proxy error:', err.message || err);
    return res.status(502).json({ error: 'Database Proxy Error', details: err.message });
  }
}
