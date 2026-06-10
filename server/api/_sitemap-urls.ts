export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBaseUrl;

  try {
    // 1. Fetch vehicles (katalog)
    const vehiclesRes = await $fetch<{ data: any[] }>(`${apiBase}/vehicles?per_page=100`);
    const vehicleUrls = (vehiclesRes?.data || []).map((vehicle) => ({
      loc: `/katalog/${vehicle.id}`,
      lastmod: vehicle.updated_at || vehicle.created_at || new Date().toISOString()
    }));

    // 2. Fetch blog posts
    const postsRes = await $fetch<{ data: any[] }>(`${apiBase}/posts?per_page=100`);
    const postUrls = (postsRes?.data || []).map((post) => ({
      loc: `/blog/${post.slug || post.id}`,
      lastmod: post.updated_at || post.published_at || new Date().toISOString()
    }));

    return [
      ...vehicleUrls,
      ...postUrls
    ];
  } catch (e) {
    console.error("Error fetching sitemap URLs:", e);
    return [];
  }
});
