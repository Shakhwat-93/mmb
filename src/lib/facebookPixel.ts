// Facebook Pixel and Conversions API (CAPI) Integration Utility
// Pixel ID: 1015807421436461
// Test Event Code: TEST5589

const PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '1015807421436461';
const ACCESS_TOKEN = import.meta.env.VITE_FB_ACCESS_TOKEN || 'EAA9aZA7khMiYBSFRYIDL5gxUn46o1CbXl7NhxUPty56ZAbvy8vrOCrUQT0HBKjFLqEe8CfX05IMB1HMsb2VxBrs84qvHzIKpqX6mRhLjxkF9iTM9ZC1RZBPSAP0pQO9ujgnYNgyyq6I3YpjTxAAZAiKqB3vxb31mtfazw3fKK3qKgZAVxxRvQE9CpG94PrMQZDZD';
const TEST_EVENT_CODE = import.meta.env.VITE_FB_TEST_EVENT_CODE || 'TEST5589';

/**
 * SHA-256 Hashing helper using Web Crypto API.
 */
async function sha256(text: string): Promise<string> {
  const trimmed = text.trim().toLowerCase();
  const msgBuffer = new TextEncoder().encode(trimmed);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Helper to retrieve cookies by name.
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

interface UserData {
  phone?: string;
  name?: string;
  ipAddress?: string | null;
}

/**
 * Main Facebook Event Tracking Function (Fires Browser Pixel + Server CAPI).
 * Handled with proper deduplication using the exact same eventID.
 */
export async function trackFacebookEvent(
  eventName: string,
  eventId: string,
  rawUserData: UserData = {},
  customData: any = {}
) {
  // 1. Browser-Side Meta Pixel Tracking
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, customData, { eventID: eventId });
  }

  // 2. Server-Side Conversions API (CAPI) Tracking
  try {
    const hashedUserData: Record<string, any> = {};

    // Capture User Agent and Client IP
    if (typeof navigator !== 'undefined') {
      hashedUserData.client_user_agent = navigator.userAgent;
    }
    if (rawUserData.ipAddress) {
      hashedUserData.client_ip_address = rawUserData.ipAddress;
    }

    // Capture Facebook FBP and FBC cookies
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc') || new URLSearchParams(window.location.search).get('fbclid');
    if (fbp) hashedUserData.fbp = fbp;
    if (fbc) hashedUserData.fbc = fbc;

    // Process & Hash Phone Number (Supports multiple hashes for matching)
    if (rawUserData.phone) {
      const cleanPhone = rawUserData.phone.replace(/\D/g, ''); // Numbers only
      const phoneHashes: string[] = [];

      // Raw input hash
      phoneHashes.push(await sha256(cleanPhone));

      // With BD country code prepended (if typed as 017...)
      if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
        phoneHashes.push(await sha256(`88${cleanPhone}`));
      } else if (cleanPhone.startsWith('1') && cleanPhone.length === 10) {
        phoneHashes.push(await sha256(`880${cleanPhone}`));
      }

      hashedUserData.ph = phoneHashes;
    }

    // Process & Hash First/Last Names
    if (rawUserData.name) {
      const trimmedName = rawUserData.name.trim();
      const parts = trimmedName.split(/\s+/);
      if (parts.length > 0) {
        hashedUserData.fn = [await sha256(parts[0])]; // First name
      }
      if (parts.length > 1) {
        hashedUserData.ln = [await sha256(parts[parts.length - 1])]; // Last name
      }
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: typeof window !== 'undefined' ? window.location.href : '',
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: customData
        }
      ],
      test_event_code: TEST_EVENT_CODE
    };

    // Dispatch payload to Facebook Conversions Graph API
    await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

  } catch (error) {
    console.error('Conversions API event tracking failed:', error);
  }
}
