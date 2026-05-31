export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBaseUrl;

  const fetchApi = async <T>(path: string, options: any = {}): Promise<T> => {
    return await $fetch<T>(`${apiBase}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  };

  return {
    async getSettings() {
      return await fetchApi<any>("/settings");
    },
    async getBrands() {
      return await fetchApi<{ data: any[] }>("/brands");
    },
    async getCategories() {
      return await fetchApi<{ data: any[] }>("/categories");
    },
    async getVehicles(params: any = {}) {
      return await fetchApi<{ data: any[]; meta: any }>("/vehicles", { query: params });
    },
    async getVehicleDetail(id: string | number) {
      return await fetchApi<any>(`/vehicles/${id}`);
    },
    async getPosts(params: any = {}) {
      return await fetchApi<{ data: any[]; meta: any }>("/posts", { query: params });
    },
    async getPostDetail(slug: string) {
      return await fetchApi<any>(`/posts/${slug}`);
    },
    async getFaqs() {
      return await fetchApi<{ data: any[] }>("/faqs");
    },
    async getVipContacts() {
      return await fetchApi<{ data: any[] }>("/vip-contacts");
    },
    async submitOrder(payload: any) {
      return await fetchApi<any>("/orders", {
        method: "POST",
        body: payload,
      });
    },
  };
};
