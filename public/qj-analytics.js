(() => {
  const host = window.location.hostname.toLowerCase();
  const config = Array.from(document.querySelectorAll('meta[name="qj-ga4-id"]')).find((node) =>
    (node.dataset.hosts || "").split(",").map((value) => value.trim().toLowerCase()).includes(host),
  );
  if (!config || window.__qjAnalyticsLoaded) return;

  const measurementId = config.content.trim();
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;
  window.__qjAnalyticsLoaded = true;

  const consentCookie = "qj_analytics_consent";
  const cookieDomain = config.dataset.cookieDomain || "";
  const privacyUrl = config.dataset.privacyUrl || "https://quantjourney.cloud/privacy-policy/";
  let active = false;
  let lastPage = "";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  if (navigator.doNotTrack === "1") return;

  const readConsent = () => {
    const match = document.cookie.split("; ").find((item) => item.startsWith(`${consentCookie}=`));
    return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : "";
  };

  const writeConsent = (value) => {
    const domain = cookieDomain ? `; Domain=${cookieDomain}` : "";
    document.cookie = `${consentCookie}=${encodeURIComponent(value)}; Path=/; Max-Age=15552000; SameSite=Lax; Secure${domain}`;
  };

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
    const pageReferrer = document.referrer ? safeUrl(document.referrer) : undefined;
    window.gtag("config", measurementId, {
      send_page_view: false,
      page_location: pageLocation,
      page_referrer: pageReferrer,
      page_title: document.title,
    });
    window.gtag("event", "page_view", {
      page_location: pageLocation,
      page_referrer: pageReferrer,
      page_title: document.title,
    });
  };

  const startAnalytics = () => {
    if (active) return;
    active = true;
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    const loader = document.createElement("script");
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(loader);
    trackPage();
  };

  const closePrompt = () => document.getElementById("qj-analytics-consent")?.remove();

  const renderPrompt = () => {
    if (document.getElementById("qj-analytics-consent")) return;
    const prompt = document.createElement("section");
    prompt.id = "qj-analytics-consent";
    prompt.className = "qj-analytics-consent";
    prompt.setAttribute("role", "dialog");
    prompt.setAttribute("aria-label", "Analytics preference");

    const copy = document.createElement("p");
    copy.append("We use Google Analytics to understand how this site is used. Analytics starts only if you accept. ");
    const privacy = document.createElement("a");
    privacy.href = privacyUrl;
    privacy.textContent = "Privacy";
    copy.appendChild(privacy);

    const actions = document.createElement("div");
    const decline = document.createElement("button");
    decline.type = "button";
    decline.className = "qj-analytics-consent__secondary";
    decline.textContent = "Decline";
    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "qj-analytics-consent__primary";
    accept.textContent = "Accept analytics";
    actions.append(decline, accept);
    prompt.append(copy, actions);
    document.body.appendChild(prompt);

    decline.addEventListener("click", () => {
      writeConsent("denied");
      window.gtag("consent", "update", { analytics_storage: "denied" });
      closePrompt();
    });
    accept.addEventListener("click", () => {
      writeConsent("granted");
      closePrompt();
      startAnalytics();
    });
  };

  window.qjOpenAnalyticsSettings = renderPrompt;
  window.trackPageView = trackPage;
  document.addEventListener("astro:page-load", trackPage);

  const consent = readConsent();
  if (consent === "granted") startAnalytics();
  else if (consent !== "denied") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderPrompt, { once: true });
    else renderPrompt();
  }
})();
