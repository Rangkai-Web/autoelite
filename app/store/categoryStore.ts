import { defineStore } from "pinia";
import { useApi } from "~/services/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as Category[],
    loading: false,
  }),
  actions: {
    async fetchCategories() {
      this.loading = true;
      try {
        const api = useApi();
        const res = await api.getCategories();
        if (res && res.data) {
          this.categories = res.data;
        }
      } catch (error) {
        console.error("Gagal mengambil daftar kategori:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
