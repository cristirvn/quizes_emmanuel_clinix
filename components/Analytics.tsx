import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Loads GA4 (via @next/third-parties), the Google Ads global tag, and Microsoft
 * Clarity — each only when its env var is present, so local/preview builds stay
 * clean and no tag fires without a configured ID. GA + Ads share the same
 * `gtag`/dataLayer, which the ConversionTracker uses to report the lead and the
 * quiz fires `quiz_step` events into for drop-off funnels. Clarity adds session
 * recordings + heatmaps to explain WHERE and WHY people abandon the quiz.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GADS_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {clarityId ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      ) : null}
      {adsId ? (
        <>
          {/* If GA didn't already load gtag.js, the Ads tag loads it itself. */}
          {!gaId ? (
            <Script
              id="gads-loader"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
            />
          ) : null}
          <Script id="gads-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${adsId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
