// Facebook Pixel and Conversions API (CAPI) Integration Utility
// Dispatches browser events via fbq and server events via trusted /api/meta-conversions proxy
// Implements exact Browser + Server event deduplication using matching event_name, eventID, and test_event_code

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
 * Determines any active Meta test event code.
 * Priority: URL param (?test_event_code=...) > sessionStorage > active env variable.
 * Returns null if no test code is active, preventing stale test code errors.
 */
function getActiveTestCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const urlCode = new URLSearchParams(window.location.search).get('test_event_code');
    if (urlCode && urlCode.trim() && urlCode.trim() !== 'undefined' && urlCode.trim() !== 'null') {
      sessionStorage.setItem('meta_test_event_code', urlCode.trim());
      return urlCode.trim();
    }
    const savedCode = sessionStorage.getItem('meta_test_event_code');
    if (savedCode && savedCode.trim() && savedCode.trim() !== 'undefined' && savedCode.trim() !== 'null') {
      return savedCode.trim();
    }
  } catch (e) {}

  const envCode = import.meta.env.VITE_FB_TEST_EVENT_CODE;
  // Ignore known expired codes like TEST84265
  if (envCode && envCode.trim() && envCode.trim() !== 'TEST84265' && envCode.trim() !== 'undefined') {
    return envCode.trim();
  }

  return null;
}

/**
 * Main Facebook Event Tracking Function (Fires Browser Pixel + Server CAPI).
 * Handled with proper deduplication using the exact same eventID, eventName, and testEventCode.
 */
export async function trackFacebookEvent(
  eventName: string,
  eventId: string,
  rawUserData: UserData = {},
  customData: any = {}
) {
  const testEventCode = getActiveTestCode();

  // Format custom data with guaranteed numeric value and ISO currency
  const formattedCustomData: Record<string, any> = {
    ...customData,
    currency: String(customData.currency || 'BDT').toUpperCase(),
    value: customData.value !== undefined && customData.value !== null ? Number(customData.value) : 580
  };

  // 1. Browser-Side Meta Pixel Tracking
  try {
    if (typeof window !== 'undefined') {
      const fbq = (window as any).fbq;
      if (typeof fbq === 'function') {
        // Meta Pixel 4th argument: Event Options object for Deduplication & Test Routing
        const eventOptions: Record<string, any> = {
          eventID: eventId
        };

        if (testEventCode) {
          eventOptions.test_event_code = testEventCode;
        }

        // Add Advanced Matching to Browser Pixel if user data is available
        if (rawUserData.phone) {
          eventOptions.ph = rawUserData.phone.replace(/\D/g, '');
        }
        if (rawUserData.name) {
          const parts = rawUserData.name.trim().split(/\s+/);
          if (parts[0]) eventOptions.fn = parts[0].toLowerCase();
          if (parts.length > 1) eventOptions.ln = parts.slice(1).join(' ').toLowerCase();
        }
        if (rawUserData.email) {
          eventOptions.em = rawUserData.email.trim().toLowerCase();
        }

        // Fire Browser Pixel Event
        fbq('track', eventName, formattedCustomData, eventOptions);

        console.log(`[Meta Pixel] Browser event dispatched: ${eventName}`, {
          eventID: eventId,
          test_event_code: testEventCode || '(production mode)',
          data: formattedCustomData
        });
      } else {
        console.warn('[Meta Pixel] window.fbq is not loaded or blocked by client');
      }
    }
  } catch (err) {
    console.warn('[Meta Pixel] Browser tracking error:', err);
  }

  // 2. Server-Side Conversions API (CAPI) Tracking via trusted backend proxy
  try {
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc') || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('fbclid') : null);

    const payload: Record<string, any> = {
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
      custom_data: formattedCustomData
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const capiPromise = fetch('/api/meta-conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    });

    // Allow up to 2.5 seconds for CAPI response without blocking order UX
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 2500));
    const result = await Promise.race([capiPromise, timeoutPromise]);

    if (result && (result as Response).ok) {
      const resData = await (result as Response).json().catch(() => ({}));
      console.log(`[Meta CAPI] Server event confirmed: ${eventName}`, resData);
    }
  } catch (error) {
    console.warn('[CAPI] Failed to relay conversion event to server:', error);
  }
}
