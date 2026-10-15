// Vercel Serverless Function Proxy for VPS Supabase
// Bypasses browser Mixed Content (HTTPS -> HTTP) blocking by proxying requests server-side.

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const rawUrl = req.url || '';
    // Strip leading /api/supabase
    let pathAndQuery = rawUrl.replace(/^\/api\/supabase/, '');
    if (!pathAndQuery.startsWith('/')) {
      pathAndQuery = '/' + pathAndQuery;
    }

    const targetUrl = `http://supabasekong-a5tg2fvpwj6emkewfdknamid.187.77.159.209.sslip.io${pathAndQuery}`;

    const headers = {};
    for (const [key, val] of Object.entries(req.headers)) {
      const lower = key.toLowerCase();
      if (!['host', 'connection', 'content-length'].includes(lower)) {
        headers[key] = val;
      }
    }
    // Set Host header explicitly for the VPS ingress
    headers['host'] = 'supabasekong-a5tg2fvpwj6emkewfdknamid.187.77.159.209.sslip.io';

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
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('Supabase serverless proxy error:', err);
    res.status(502).json({ error: 'Proxy error', message: err.message });
  }
}
