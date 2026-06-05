import { defineStore } from "pinia";
import { useApi } from "~/services/api";

export const useBrandStore = defineStore("brand", {
  state: () => ({
    brands: [] as Array<{ id: number; name: string; slug: string }>,
    loading: false,
  }),
  actions: {
    async fetchBrands(params: any = {}) {
      this.loading = true;
      try {
        const api = useApi();
        const res = await api.getBrands(params);
        if (res && res.data) {
          this.brands = res.data;
        }
      } catch (error) {
        console.error("Gagal mengambil daftar merek:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
