declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const config = useRuntimeConfig();
  const gaId = config.public.gaId || "G-90XVWPM7LF";

  // 1. Initialize Google Analytics (gtag) using standard arguments object
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag as any;

  // @ts-ignore
  gtag("js", new Date());
  // @ts-ignore
  gtag("config", gaId);

  // 2. Inject Google Tag (gtag.js) script AFTER initialization
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // 3. Listen to route changes for SPA page tracking
  router.afterEach((to) => {
    // @ts-ignore
    gtag("config", gaId, {
      page_path: to.fullPath,
    });
  });
});
