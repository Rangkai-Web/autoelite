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

  // 1. Inject Google Tag (gtag.js) script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // 2. Initialize Google Analytics (gtag)
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  // @ts-ignore
  gtag("js", new Date());
  // @ts-ignore
  gtag("config", gaId);

  // 3. Listen to route changes for SPA page tracking
  router.afterEach((to) => {
    // @ts-ignore
    gtag("config", gaId, {
      page_path: to.fullPath,
    });
  });
});
