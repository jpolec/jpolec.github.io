(() => {
  const host = window.location.hostname.toLowerCase();
  const config = Array.from(document.querySelectorAll('meta[name="qj-ga4-id"]')).find((node) =>
    (node.dataset.hosts || "").split(",").map((value) => value.trim().toLowerCase()).includes(host),
  );
  if (!config || window.__qjAnalyticsLoaded) return;

  const measurementId = config.content.trim();
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;
  window.__qjAnalyticsLoaded = true;

  const cookieDomain = config.dataset.cookieDomain || "";
  let active = false;
  let lastPage = "";

  // Remove cookies left by the former opt-in implementation. The Google tag
  // remains permanently in denied-storage mode and must not create a visitor ID.
  const expireCookie = (name, domain = "") => {
    const domainAttribute = domain ? `; Domain=${domain}` : "";
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure${domainAttribute}`;
  };
  const legacyCookies = document.cookie
    .split(";")
    .map((item) => item.split("=")[0].trim())
    .filter((name) =>
      name === "qj_analytics_consent" ||
      name === "_ga" ||
      name.startsWith("_ga_") ||
      name === "_gid" ||
      name.startsWith("_gat"),
    );
  for (const name of new Set(legacyCookies)) {
    expireCookie(name);
    if (cookieDomain) expireCookie(name, cookieDomain);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "denied",
  });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", false);

  if (navigator.doNotTrack === "1") return;

  const safeUrl = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      return `${url.origin}${url.pathname}`;
    } catch {
      return window.location.origin + window.location.pathname;
    }
  };

  const trackPage = () => {
    if (!active) return;
    const pageLocation = safeUrl(window.location.href);
    const key = `${pageLocation}|${document.title}`;
    if (key === lastPage) return;
    lastPage = key;
    window.gtag("config", measurementId, {
      send_page_view: false,
      page_location: pageLocation,
      page_referrer: "",
      page_title: document.title,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    window.gtag("event", "page_view", {
      page_location: pageLocation,
      page_referrer: "",
      page_title: document.title,
    });
  };

  const startAnalytics = () => {
    if (active) return;
    active = true;
    window.gtag("js", new Date());
    const loader = document.createElement("script");
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(loader);
    trackPage();
  };

  window.trackPageView = trackPage;
  document.addEventListener("astro:page-load", trackPage);
  startAnalytics();
})();
