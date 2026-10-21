// Vercel Serverless Function: Trusted Meta Conversions API (CAPI) Endpoint
// Securely relays conversion events from the backend to Meta Graph API
// Performs server-side hashing, genuine IP & User-Agent forwarding, and deduplication verification

import crypto from 'crypto';

const DEFAULT_PIXEL_ID = '1015807421436461';
const DEFAULT_ACCESS_TOKEN = 'EAA9aZA7khMiYBSFRYIDL5gxUn46o1CbXl7NhxUPty56ZAbvy8vrOCrUQT0HBKjFLqEe8CfX05IMB1HMsb2VxBrs84qvHzIKpqX6mRhLjxkF9iTM9ZC1RZBPSAP0pQO9ujgnYNgyyq6I3YpjTxAAZAiKqB3vxb31mtfazw3fKK3qKgZAVxxRvQE9CpG94PrMQZDZD';
const DEFAULT_TEST_CODE = 'TEST5589';

/**
 * Standard SHA-256 hash helper for normalized data.
 */
function sha256(val) {
  if (!val || typeof val !== 'string') return null;
  const normalized = val.trim().toLowerCase();
  if (!normalized) return null;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalize and hash phone numbers according to Meta requirements.
 */
function hashPhone(phone) {
  if (!phone || typeof phone !== 'string') return null;
  const digitsOnly = phone.replace(/\D/g, '');
  if (!digitsOnly) return null;

  const hashes = [];
  // Hash clean raw input digits
  const rawHash = sha256(digitsOnly);
  if (rawHash) hashes.push(rawHash);

  // If local Bangladeshi number starting with 01X (11 digits), include 88 country-code variant
  if (digitsOnly.startsWith('0') && digitsOnly.length === 11) {
    const withBd = sha256(`88${digitsOnly}`);
    if (withBd && !hashes.includes(withBd)) hashes.push(withBd);
  } else if (digitsOnly.startsWith('1') && digitsOnly.length === 10) {
    const withBd = sha256(`880${digitsOnly}`);
    if (withBd && !hashes.includes(withBd)) hashes.push(withBd);
  }

  return hashes.length > 0 ? hashes : null;
}

/**
 * Parse and hash customer names into first and last name.
 */
function hashName(fullName) {
  if (!fullName || typeof fullName !== 'string') return { fn: null, ln: null };
  const trimmed = fullName.trim();
  if (!trimmed) return { fn: null, ln: null };

  const parts = trimmed.split(/\s+/);
  const fn = parts.length > 0 ? [sha256(parts[0])].filter(Boolean) : null;
  const ln = parts.length > 1 ? [sha256(parts.slice(1).join(' '))].filter(Boolean) : null;

  return { fn, ln };
}

export default async function handler(req, res) {
  // CORS Preflight & Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const pixelId = process.env.FB_PIXEL_ID || process.env.VITE_FB_PIXEL_ID || DEFAULT_PIXEL_ID;
    const accessToken = process.env.FB_ACCESS_TOKEN || process.env.VITE_FB_ACCESS_TOKEN || DEFAULT_ACCESS_TOKEN;
    const testEventCode = process.env.FB_TEST_EVENT_CODE || process.env.VITE_FB_TEST_EVENT_CODE || req.body?.test_event_code || DEFAULT_TEST_CODE;

    if (!pixelId || !accessToken) {
      return res.status(500).json({
        error: 'MissingConfiguration',
        message: 'Meta Pixel ID or Access Token is not configured.'
      });
    }

    const {
      event_name,
      event_id,
      event_source_url,
      user_data = {},
      custom_data = {}
    } = req.body || {};

    if (!event_name || !event_id) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'event_name and event_id are required fields.'
      });
    }

    // 1. Extract genuine Client IP (check trusted proxy headers first)
    const forwardedHeader = req.headers['x-forwarded-for'];
    let clientIp = '';
    if (typeof forwardedHeader === 'string' && forwardedHeader.length > 0) {
      clientIp = forwardedHeader.split(',')[0].trim();
    } else if (req.headers['x-real-ip']) {
      clientIp = req.headers['x-real-ip'];
    } else if (req.socket?.remoteAddress) {
      clientIp = req.socket.remoteAddress;
    }
    // Clean IPv6-mapped IPv4 (e.g. ::ffff:1.2.3.4)
    if (clientIp.startsWith('::ffff:')) {
      clientIp = clientIp.substring(7);
    }
    if (!clientIp && user_data.client_ip_address) {
      clientIp = user_data.client_ip_address;
    }

    // 2. Extract genuine User-Agent
    const clientUserAgent = req.headers['user-agent'] || user_data.client_user_agent || '';

    // 3. Normalize & Hash User Data
    const formattedUserData = {};

    if (clientIp) formattedUserData.client_ip_address = clientIp;
    if (clientUserAgent) formattedUserData.client_user_agent = clientUserAgent;

    // FBP and FBC (Must NOT be hashed)
    if (user_data.fbp) formattedUserData.fbp = String(user_data.fbp);
    if (user_data.fbc) formattedUserData.fbc = String(user_data.fbc);

    // Hashed Phone
    const phoneHashes = hashPhone(user_data.phone);
    if (phoneHashes) formattedUserData.ph = phoneHashes;

    // Hashed Name
    const { fn, ln } = hashName(user_data.name);
    if (fn) formattedUserData.fn = fn;
    if (ln) formattedUserData.ln = ln;

    // Hashed Email (if provided)
    if (user_data.email) {
      const emailHash = sha256(user_data.email);
      if (emailHash) formattedUserData.em = [emailHash];
    }

    // 4. Build Custom Data
    const formattedCustomData = {};
    if (custom_data.currency) formattedCustomData.currency = String(custom_data.currency).toUpperCase();
    if (custom_data.value !== undefined && custom_data.value !== null) {
      const numVal = parseFloat(custom_data.value);
      if (!isNaN(numVal)) formattedCustomData.value = numVal;
    }
    if (custom_data.content_name) formattedCustomData.content_name = String(custom_data.content_name);
    if (custom_data.content_category) formattedCustomData.content_category = String(custom_data.content_category);
    if (custom_data.content_type) formattedCustomData.content_type = String(custom_data.content_type);
    if (Array.isArray(custom_data.content_ids)) formattedCustomData.content_ids = custom_data.content_ids;
    if (custom_data.num_items !== undefined) formattedCustomData.num_items = parseInt(custom_data.num_items, 10) || 1;

    // 5. Build Meta Graph API Payload
    const eventTime = Math.floor(Date.now() / 1000);
    const sourceUrl = event_source_url || req.headers['referer'] || '';

    const metaPayload = {
      data: [
        {
          event_name,
          event_time: eventTime,
          event_id,
          action_source: 'website',
          event_source_url: sourceUrl,
          user_data: formattedUserData,
          custom_data: formattedCustomData
        }
      ]
    };

    if (testEventCode) {
      metaPayload.test_event_code = testEventCode;
    }

    // 6. Dispatch to Meta Graph API v21.0 with Safe Timeout and Retry
    const apiUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

    let lastError = null;
    let metaResponse = null;

    for (let attempt = 1; attempt <= 2; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metaPayload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (response.ok) {
          metaResponse = data;
          break; // Success
        } else {
          lastError = data;
          console.error(`Meta CAPI error on attempt ${attempt}:`, data.error ? data.error.message : data);
          // Only retry on server errors (5xx)
          if (response.status < 500) break;
        }
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err;
        console.error(`Meta CAPI network error on attempt ${attempt}:`, err.message || err);
      }
    }

    if (metaResponse) {
      return res.status(200).json({
        success: true,
        events_received: metaResponse.events_received || 1,
        event_name,
        event_id,
        fbtrace_id: metaResponse.fbtrace_id,
        messages: metaResponse.messages || []
      });
    }

    // If Meta rejected or failed
    const errorMessage = lastError?.error?.message || lastError?.message || 'Failed to dispatch event to Meta';
    return res.status(502).json({
      success: false,
      error: 'MetaApiError',
      message: errorMessage,
      fbtrace_id: lastError?.error?.fbtrace_id || lastError?.fbtrace_id || null
    });

  } catch (outerErr) {
    console.error('Unhandled CAPI server error:', outerErr.message || outerErr);
    return res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to process conversion event.'
    });
  }
}
