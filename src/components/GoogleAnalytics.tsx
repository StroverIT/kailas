"use client";

import {
  GoogleTagManager,
  GoogleAnalytics,
  sendGTMEvent,
} from "@next/third-parties/google";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalyticsProvider() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}

/** Track custom events (use in client components) */
export { sendGTMEvent };
