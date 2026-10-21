// Facebook Pixel and Conversions API (CAPI) Integration Utility
// Dispatches browser events via fbq and server events via trusted /api/meta-conversions proxy

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
  email?: string;
  ipAddress?: string | null;
}

/**
 * Main Facebook Event Tracking Function (Fires Browser Pixel + Server CAPI).
 * Handled with proper deduplication using the exact same eventID and eventName.
 */
export async function trackFacebookEvent(
  eventName: string,
  eventId: string,
  rawUserData: UserData = {},
  customData: any = {}
) {
  // 1. Browser-Side Meta Pixel Tracking
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, customData, { eventID: eventId });
    }
  } catch (err) {
    console.warn('[Pixel] Browser tracking skipped or blocked:', err);
  }

  // 2. Server-Side Conversions API (CAPI) Tracking via trusted backend proxy
  try {
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc') || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('fbclid') : null);

    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_source_url: typeof window !== 'undefined' ? window.location.href : '',
      user_data: {
        phone: rawUserData.phone,
        name: rawUserData.name,
        email: rawUserData.email,
        client_ip_address: rawUserData.ipAddress || null,
        fbp: fbp || undefined,
        fbc: fbc || undefined
      },
      custom_data: customData,
      test_event_code: import.meta.env.VITE_FB_TEST_EVENT_CODE || 'TEST5589'
    };

    const response = await fetch('/api/meta-conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('[CAPI] Server-side event returned status', response.status, errData);
    }
  } catch (error) {
    console.warn('[CAPI] Failed to relay conversion event to server:', error);
  }
}
