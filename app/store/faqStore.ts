import { defineStore } from "pinia";
import { useApi } from "~/services/api";

export const useFaqStore = defineStore("faq", {
  state: () => ({
    faqs: [] as Array<{ id: number; question: string; answer: string; sort_order: number }>,
    loading: false,
  }),
  actions: {
    async fetchFaqs() {
      this.loading = true;
      try {
        const api = useApi();
        const res = await api.getFaqs();
        if (res && res.data) {
          this.faqs = res.data.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        }
      } catch (error) {
        console.error("Gagal mengambil daftar FAQ:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
