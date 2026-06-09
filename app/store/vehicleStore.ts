import { defineStore } from "pinia";
import { useApi } from "~/services/api";
import type { Vehicle } from "~/types";

const mapType = (category: any): any => {
  if (!category) return "SUV";
  const slug = category.slug?.toLowerCase();
  if (slug === "ev" || slug === "electric") return "Electric";
  if (slug === "suv") return "SUV";
  if (slug === "sedan") return "Sedan";
  if (slug === "sport") return "Sport";
  return category.name;
};

export const normalizeVehicle = (item: any): Vehicle => {
  const fuelMapped = item.fuel || "Bensin";

  const transLower = (item.transmission || "").toLowerCase();
  const transMapped = transLower.includes("manual") ? "Manual" : "Otomatis";

  const paragraphs = typeof item.description === "string"
    ? item.description.split("\n\n").filter(Boolean)
    : (Array.isArray(item.description) ? item.description : []);

  const specs = item.specs ? {
    engine: item.specs.engine || "",
    fuelConsumption: item.specs.fuelConsumption || item.specs.fuel_consumption || "12.5 km/Liter",
    horsePower: item.specs.power || item.specs.horsePower || item.specs.horse_power || "",
    driveSystem: item.specs.driveSystem || item.specs.drive_system || "",
    transmission: item.specs.transmission || item.transmission || "",
    acceleration: item.specs.acceleration || "",
  } : {
    engine: "",
    fuelConsumption: "12.5 km/Liter",
    horsePower: "",
    driveSystem: "",
    transmission: item.transmission || "",
    acceleration: "",
  };

  return {
    id: String(item.id),
    name: item.name || "",
    type: mapType(item.category),
    vehicle_type: (item.vehicle_type === "motor" || item.type === "motor") ? "motor" : "mobil",
    brand: item.brand || "",
    price: Number(item.price) || 0,
    year: Number(item.year) || new Date().getFullYear(),
    fuel: fuelMapped,
    transmission: transMapped,
    image: item.image || "",
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.image || ""],
    tags: Array.isArray(item.tags) ? item.tags : [],
    description: paragraphs,
    specs,
    variants: Array.isArray(item.variants)
      ? item.variants.map((v: any) => ({
          id: Number(v.id),
          name: v.name || "",
          price: Number(v.price) || 0,
          colors: Array.isArray(v.colors) ? v.colors : [],
        }))
      : [],
  };
};

export const useVehicleStore = defineStore("vehicle", {
  state: () => ({
    vehicles: [] as Vehicle[],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: 0,
    },
    vehicleDetail: null as Vehicle | null,
    loading: true,
    detailLoading: false,
    homeSearchQuery: "",
    homeSelectedCategory: "",
    allVehicles: [] as Vehicle[],
    allLoading: false,
  }),
  actions: {
    async fetchVehicles(params: any = {}) {
      this.loading = true;
      try {
        const api = useApi();
        const res = await api.getVehicles(params);
        if (res && res.data) {
          this.vehicles = res.data.map(normalizeVehicle);
          this.meta = res.meta || {
            current_page: 1,
            last_page: 1,
            per_page: 12,
            total: this.vehicles.length,
          };
        }
      } catch (error) {
        console.error("Gagal mengambil katalog kendaraan:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAllVehicles() {
      this.allLoading = true;
      try {
        const api = useApi();
        const res = await api.getVehicles({ per_page: 100 });
        if (res && res.data) {
          this.allVehicles = res.data.map(normalizeVehicle);
        }
      } catch (error) {
        console.error("Gagal mengambil seluruh kendaraan untuk pemesanan:", error);
      } finally {
        this.allLoading = false;
      }
    },
    async fetchVehicleDetail(id: string | number) {
      this.detailLoading = true;
      this.vehicleDetail = null;
      try {
        const api = useApi();
        const data = await api.getVehicleDetail(id);
        if (data) {
          this.vehicleDetail = normalizeVehicle(data);
        }
      } catch (error) {
        console.error(`Gagal mengambil detail kendaraan ${id}:`, error);
      } finally {
        this.detailLoading = false;
      }
    },
  },
});
