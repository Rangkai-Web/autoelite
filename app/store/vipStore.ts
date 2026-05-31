import { defineStore } from "pinia";
import { useApi } from "~/services/api";

export interface VipContact {
  id: number;
  name: string;
  role: string;
  initials: string;
  whatsapp_number: string;
  custom_text: string;
}

export const useVipStore = defineStore("vip", {
  state: () => ({
    vipContacts: [] as VipContact[],
    loading: true,
  }),
  actions: {
    async fetchVipContacts() {
      this.loading = true;
      try {
        const api = useApi();
        const res = await api.getVipContacts();
        if (res && res.data) {
          this.vipContacts = res.data;
        }
      } catch (error) {
        console.error("Gagal mengambil daftar kontak VIP:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
