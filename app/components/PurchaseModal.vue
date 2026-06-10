<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      @click.self="closeModal"
    >
      <div
        class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all duration-300 scale-100 max-h-[90vh] flex flex-col"
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50"
        >
          <div>
            <h3 class="text-xl font-bold text-gray-900">
              Form Pemesanan Kendaraan
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">
              Lengkapi formulir di bawah untuk mengirim detail pesanan via
              WhatsApp.
            </p>
          </div>
          <button
            @click="closeModal"
            :disabled="isSubmitting"
            class="text-gray-400 hover:text-gray-600 transition-colors p-1.5 flex justify-center items-center hover:bg-gray-100 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Form Content (Scrollable) -->
        <form
          @submit.prevent="handleSubmit"
          class="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <!-- Data Diri Section -->
          <div>
            <h4
              class="text-sm font-semibold uppercase tracking-wider text-blue-900 mb-4 flex items-center gap-2"
            >
              <Icon name="heroicons:user" class="w-4 h-4" />
              Informasi Pelanggan
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nama Lengkap *</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nomor HP / WhatsApp *</label
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email *</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Contoh: budi@gmail.com"
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Alamat Lengkap *</label
                >
                <textarea
                  v-model="form.address"
                  required
                  rows="2"
                  placeholder="Tulis alamat rumah lengkap untuk pengiriman/surat..."
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-sm text-gray-900 placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <hr class="border-gray-100" />

          <!-- Pilihan Kendaraan Section -->
          <div>
            <div
              class="flex items-start justify-start md:justify-between flex-col md:flex-row gap-4 mb-4"
            >
              <h4
                class="text-sm font-semibold uppercase tracking-wider text-blue-900 flex items-center gap-2"
              >
                <Icon name="heroicons:shopping-bag" class="w-4 h-4" />
                Kendaraan yang Dipesan
              </h4>
              <button
                type="button"
                @click="addVehicle"
                class="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 hover:underline"
              >
                <Icon name="heroicons:plus-circle" class="w-4 h-4" />
                Tambah Tipe Kendaraan
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="(item, index) in form.items"
                :key="index"
                class="flex flex-col gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100"
              >
                <!-- Row 1: Vehicle and Qty -->
                <div
                  class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
                >
                  <div class="flex-1">
                    <label
                      class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                      >Tipe Kendaraan *</label
                    >
                    <div class="relative">
                      <input
                        type="text"
                        v-model="item.searchQuery"
                        placeholder="-- Cari & Pilih Kendaraan --"
                        @focus="handleFocus($event, index)"
                        @blur="handleBlur(index)"
                        @input="item.isEdited = true"
                        required
                        class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none pr-8 cursor-text"
                      />
                      <span
                        class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      >
                        <Icon name="heroicons:chevron-down" class="w-4 h-4" />
                      </span>

                      <!-- Dropdown Options List -->
                      <div
                        v-if="item.isOpen"
                        class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                      >
                        <div
                          v-if="vehicleStore.allVehicles.length === 0"
                          class="px-3 py-2 text-sm text-gray-500 italic"
                        >
                          Memuat daftar kendaraan...
                        </div>
                        <div
                          v-else-if="filteredVehicles(item).length === 0"
                          class="px-3 py-2 text-sm text-gray-500 italic"
                        >
                          Tidak ada kendaraan ditemukan
                        </div>
                        <button
                          v-else
                          v-for="vehicle in filteredVehicles(item)"
                          :key="vehicle.id"
                          type="button"
                          @mousedown="selectVehicle(index, vehicle)"
                          class="w-full text-left px-3.5 py-2.5 text-sm hover:bg-blue-50/70 hover:text-blue-900 text-gray-900 transition-colors block cursor-pointer"
                        >
                          {{ vehicle.name }} (Rp
                          {{ formatRupiah(vehicle.price) }})
                        </button>
                      </div>
                    </div>
                    <!-- Dynamic Price Tag -->
                    <div
                      v-if="item.vehicleId"
                      class="mt-1 text-xs font-bold text-blue-900"
                    >
                      Harga: Rp {{ formatRupiah(getItemPrice(item)) }}
                    </div>
                  </div>
                  <div class="w-full sm:w-28">
                    <label
                      class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                      >Jumlah (Qty) *</label
                    >
                    <div
                      class="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        @click="decrementQty(index)"
                        class="px-2.5 py-2 text-gray-500 hover:bg-gray-100 transition-colors font-medium border-r border-gray-100"
                      >
                        -
                      </button>
                      <input
                        v-model.number="item.qty"
                        type="number"
                        min="1"
                        required
                        class="w-full text-center py-2 text-sm font-semibold text-gray-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        @click="incrementQty(index)"
                        class="px-2.5 py-2 text-gray-500 hover:bg-gray-100 transition-colors font-medium border-l border-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div class="flex items-end justify-end sm:pt-4">
                    <button
                      type="button"
                      @click="removeVehicle(index)"
                      :disabled="form.items.length <= 1"
                      class="text-gray-400 hover:text-red-600 disabled:opacity-40 disabled:hover:text-gray-400 p-2 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <!-- Row 2: Varian & Warna Selection -->
                <div
                  v-if="getVehicleVariants(item.vehicleId).length > 0"
                  class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100"
                >
                  <!-- Variant Dropdown -->
                  <div>
                    <label
                      class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                      >Varian Kendaraan *</label
                    >
                    <select
                      :value="item.variantId"
                      @change="
                        selectVariantInModal(
                          index,
                          Number(($event.target as HTMLSelectElement).value),
                        )
                      "
                      class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none"
                    >
                      <option
                        v-for="variant in getVehicleVariants(item.vehicleId)"
                        :key="variant.id"
                        :value="variant.id"
                      >
                        {{ variant.name }} (Rp
                        {{ formatRupiah(variant.price) }})
                      </option>
                    </select>
                  </div>

                  <!-- Color Dropdown -->
                  <div>
                    <label
                      class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                      >Warna *</label
                    >
                    <select
                      v-model="item.color"
                      class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none"
                    >
                      <option
                        v-for="color in getVehicleVariantColors(
                          item.vehicleId,
                          item.variantId,
                        )"
                        :key="typeof color === 'object' ? color.name : color"
                        :value="typeof color === 'object' ? color.name : color"
                      >
                        {{ typeof color === "object" ? color.name : color }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="border-gray-100" />

          <!-- Informasi Perusahaan Section (Opsional) -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4
                class="text-sm font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2"
              >
                <Icon name="heroicons:building-office" class="w-4 h-4" />
                Informasi Perusahaan (Opsional)
              </h4>
              <span class="text-xs text-gray-400">Opsional</span>
            </div>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nama Perusahaan</label
                >
                <input
                  v-model="form.companyName"
                  type="text"
                  placeholder="Contoh: PT. Maju Bersama Jaya"
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Alamat Perusahaan</label
                >
                <textarea
                  v-model="form.companyAddress"
                  rows="2"
                  placeholder="Tulis alamat kantor atau perusahaan..."
                  class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-sm text-gray-900 placeholder:text-gray-400 resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </form>

        <!-- Footer Actions -->
        <div
          class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <!-- Total Price Info -->
          <div class="text-left w-full sm:w-auto">
            <span
              class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >Estimasi Total</span
            >
            <span class="text-lg font-black text-blue-900">
              Rp {{ formatRupiah(totalCalculatedPrice) }}
            </span>
          </div>

          <!-- Buttons -->
          <div
            class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <button
              type="button"
              @click="closeModal"
              :disabled="isSubmitting"
              class="w-full sm:w-auto px-5 py-2.5 border border-gray-200 hover:bg-gray-100 rounded-xl text-sm font-semibold text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              @click="handleSubmit"
              type="submit"
              :disabled="isSubmitting"
              class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Icon
                v-if="isSubmitting"
                name="heroicons:arrow-path"
                class="w-5 h-5 animate-spin"
              />
              <Icon v-else name="mdi:whatsapp" class="w-5 h-5" />
              {{ isSubmitting ? "Mengirim..." : "Kirim ke WhatsApp Admin" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from "vue";
import type { Vehicle } from "~/types";
import { usePurchaseModal } from "~/composables/usePurchaseModal";
import { useVehicleStore } from "~/store/vehicleStore";
import { useSettingsStore } from "~/store/settingsStore";
import { useApi } from "~/services/api";

const {
  isOpen,
  prefilledVehicleId,
  prefilledVariantId,
  prefilledColor,
  closeModal,
} = usePurchaseModal();
const toast = useToast();
const vehicleStore = useVehicleStore();
const settingsStore = useSettingsStore();

const isSubmitting = ref(false);

// Form Reactive State
const form = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  items: [] as Array<{
    vehicleId: string;
    variantId: number | null;
    color: string;
    qty: number;
    searchQuery: string;
    isOpen: boolean;
    isEdited: boolean;
  }>,
  companyName: "",
  companyAddress: "",
});

// Helper for formatting currencies
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

const updatePrefilledSearchQueries = () => {
  form.items.forEach((item) => {
    if (item.vehicleId && !item.searchQuery) {
      const v = vehicleStore.allVehicles.find(
        (vehicle: Vehicle) => vehicle.id === item.vehicleId,
      );
      if (v) {
        item.searchQuery = v.name;
        item.isEdited = false;

        // Auto-select variant and color if we haven't already
        if (item.variantId === null && v.variants && v.variants.length > 0) {
          if (prefilledVariantId.value) {
            item.variantId = prefilledVariantId.value;
            const selectedVar = v.variants.find(
              (varItem) => varItem.id === prefilledVariantId.value,
            );
            const firstColor = selectedVar?.colors?.[0];
            const colorName = firstColor
              ? typeof firstColor === "object"
                ? firstColor.name
                : firstColor
              : "";
            item.color = prefilledColor.value || colorName;
          } else {
            const defaultVariant = v.variants[0];
            item.variantId = defaultVariant?.id ?? null;
            const firstColor = defaultVariant?.colors?.[0];
            item.color = firstColor
              ? typeof firstColor === "object"
                ? firstColor.name
                : firstColor
              : "";
          }
        }
      }
    }
  });
};

onMounted(() => {
  if (vehicleStore.allVehicles.length === 0) {
    vehicleStore.fetchAllVehicles();
  }
});

// Watch allVehicles to update queries once data is fetched
watch(
  () => vehicleStore.allVehicles,
  () => {
    updatePrefilledSearchQueries();
  },
  { deep: true },
);

// Watch modal state to pre-fill dynamic values
watch(isOpen, (newVal) => {
  if (newVal) {
    // Reset Form Fields
    form.name = "";
    form.phone = "";
    form.email = "";
    form.address = "";
    form.companyName = "";
    form.companyAddress = "";

    // Initialize items array
    if (prefilledVehicleId.value) {
      form.items = [
        {
          vehicleId: prefilledVehicleId.value,
          variantId: prefilledVariantId.value,
          color: prefilledColor.value || "",
          qty: 1,
          searchQuery: "",
          isOpen: false,
          isEdited: false,
        },
      ];
    } else {
      form.items = [
        {
          vehicleId: "",
          variantId: null,
          color: "",
          qty: 1,
          searchQuery: "",
          isOpen: false,
          isEdited: false,
        },
      ];
    }

    // Load all vehicles unfiltered for the dropdown list
    if (vehicleStore.allVehicles.length === 0) {
      vehicleStore.fetchAllVehicles();
    } else {
      updatePrefilledSearchQueries();
    }
  }
});

// Item Modifiers
const addVehicle = () => {
  form.items.push({
    vehicleId: "",
    variantId: null,
    color: "",
    qty: 1,
    searchQuery: "",
    isOpen: false,
    isEdited: false,
  });
};

const removeVehicle = (index: number) => {
  if (form.items.length > 1) {
    form.items.splice(index, 1);
  }
};

const incrementQty = (index: number) => {
  const item = form.items[index];
  if (item) {
    item.qty++;
  }
};

const decrementQty = (index: number) => {
  const item = form.items[index];
  if (item && item.qty > 1) {
    item.qty--;
  }
};

// Search Dropdown Handlers
const handleFocus = (event: FocusEvent, index: number) => {
  const item = form.items[index];
  if (item) {
    item.isOpen = true;
  }
  if (event.target instanceof HTMLInputElement) {
    event.target.select();
  }
};

const handleBlur = (index: number) => {
  setTimeout(() => {
    const item = form.items[index];
    if (item) {
      item.isOpen = false;
      // Restore selected vehicle text if not edited/selected
      const v = vehicleStore.allVehicles.find(
        (vehicle: Vehicle) => vehicle.id === item.vehicleId,
      );
      if (v) {
        item.searchQuery = v.name;
      } else {
        item.searchQuery = "";
        item.vehicleId = "";
        item.variantId = null;
        item.color = "";
      }
      item.isEdited = false;
    }
  }, 200);
};

const selectVehicle = (index: number, vehicle: any) => {
  const item = form.items[index];
  if (item) {
    item.vehicleId = vehicle.id;
    item.searchQuery = vehicle.name;
    item.isEdited = false;
    item.isOpen = false;

    // Auto-select first variant and color if variants exist
    if (vehicle.variants && vehicle.variants.length > 0) {
      const defaultVariant = vehicle.variants[0];
      item.variantId = defaultVariant.id;
      const firstColor = defaultVariant.colors?.[0];
      item.color = firstColor
        ? typeof firstColor === "object"
          ? firstColor.name
          : firstColor
        : "";
    } else {
      item.variantId = null;
      item.color = "";
    }
  }
};

const getVehicleVariants = (vehicleId: string) => {
  if (!vehicleId) return [];
  const v = vehicleStore.allVehicles.find(
    (vehicle: Vehicle) => vehicle.id === vehicleId,
  );
  return v?.variants || [];
};

const getVehicleVariantColors = (
  vehicleId: string,
  variantId: number | null,
) => {
  if (!vehicleId || variantId === null) return [];
  const variants = getVehicleVariants(vehicleId);
  const selectedVar = variants.find((varItem) => varItem.id === variantId);
  return selectedVar?.colors || [];
};

const selectVariantInModal = (index: number, variantId: number) => {
  const item = form.items[index];
  if (!item) return;

  const v = vehicleStore.allVehicles.find(
    (vehicle: Vehicle) => vehicle.id === item.vehicleId,
  );
  if (!v || !v.variants) return;

  const selectedVar = v.variants.find((varItem) => varItem.id === variantId);
  if (selectedVar) {
    item.variantId = selectedVar.id;
    const firstColor = selectedVar.colors?.[0];
    item.color = firstColor
      ? typeof firstColor === "object"
        ? firstColor.name
        : firstColor
      : "";
  }
};

const getItemPrice = (item: any) => {
  const v = vehicleStore.allVehicles.find(
    (vehicle: Vehicle) => vehicle.id === item.vehicleId,
  );
  if (!v) return 0;
  const selectedVar = v.variants?.find(
    (varItem) => varItem.id === item.variantId,
  );
  return selectedVar ? selectedVar.price : v.price;
};

const totalCalculatedPrice = computed(() => {
  return form.items.reduce((total, item) => {
    return total + getItemPrice(item) * item.qty;
  }, 0);
});

const filteredVehicles = (item: any) => {
  const query = item.searchQuery || "";
  if (!item.isEdited || !query) {
    return vehicleStore.allVehicles;
  }
  const lowercaseQuery = query.toLowerCase();
  return vehicleStore.allVehicles.filter((vehicle: Vehicle) => {
    const nameMatch = vehicle.name.toLowerCase().includes(lowercaseQuery);
    const priceString = `rp ${formatRupiah(vehicle.price)}`.toLowerCase();
    const priceMatch = priceString.includes(lowercaseQuery);
    return nameMatch || priceMatch;
  });
};

// WA Form Submission
const handleSubmit = async () => {
  // Prevent duplicate submissions
  if (isSubmitting.value) return;

  // Manual Validation check for required fields
  if (!form.name || !form.phone || !form.email || !form.address) {
    toast.add({
      title: "Validasi Gagal",
      description: "Harap isi semua informasi wajib (*) sebelum mengirim.",
      color: "error",
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }

  // Verify at least one vehicle is selected
  const hasInvalidItem = form.items.some((item) => !item.vehicleId);
  if (hasInvalidItem) {
    toast.add({
      title: "Validasi Gagal",
      description: "Harap pilih tipe kendaraan untuk semua pesanan Anda.",
      color: "error",
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }

  // Format Vehicle List text
  const itemsText = form.items
    .map((item, idx) => {
      const v = vehicleStore.allVehicles.find(
        (vehicle: Vehicle) => vehicle.id === item.vehicleId,
      );
      const vehicleName = v ? v.name : "Unknown Vehicle";

      const selectedVar = v?.variants?.find(
        (varItem) => varItem.id === item.variantId,
      );
      const displayName = selectedVar
        ? `${vehicleName} - ${selectedVar.name}`
        : vehicleName;
      const displayColor = item.color ? `\n   Warna: ${item.color}` : "";

      const vehiclePrice = selectedVar ? selectedVar.price : v ? v.price : 0;
      const totalItemPrice = vehiclePrice * item.qty;
      return `${idx + 1}. ${displayName}${displayColor}\n   Jumlah: ${item.qty} unit\n   Harga Satuan: Rp ${formatRupiah(vehiclePrice)}\n   Subtotal: Rp ${formatRupiah(totalItemPrice)}`;
    })
    .join("\n\n");

  // Format Total Price
  const totalPrice = totalCalculatedPrice.value;

  let orderIdMessage = "";

  isSubmitting.value = true;
  try {
    // 1. Submit order to Backend API
    try {
      const api = useApi();
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        company_name: form.companyName || null,
        company_address: form.companyAddress || null,
        items: form.items.map((item) => ({
          vehicle_id: Number(item.vehicleId),
          variant_id: item.variantId ? Number(item.variantId) : null,
          color: item.color || null,
          qty: Number(item.qty),
        })),
      };

      const response = await api.submitOrder(payload);
      if (response && response.order_id) {
        orderIdMessage = `\n🆔 ID PESANAN: #AE-100${response.order_id}\n───────────────────`;
        toast.add({
          title: "Pemesanan Tercatat",
          description:
            "Pesanan Anda berhasil dicatat di server. Menghubungkan ke WhatsApp...",
          color: "success",
          icon: "i-heroicons-check-circle",
        });
      }
    } catch (error: any) {
      console.error("Gagal mencatat pemesanan ke server:", error);
      // Graceful error fallback: Notify user but do not block WhatsApp flow
      toast.add({
        title: "Info",
        description: "Menghubungkan langsung ke WhatsApp Admin...",
        color: "info",
        icon: "i-heroicons-information-circle",
      });
    }

    // Compile final WhatsApp text template
    const textMessage = `Halo Admin Sentraoto,
${orderIdMessage}
Saya ingin melakukan pemesanan kendaraan dengan rincian berikut:

👤 DETAIL PELANGGAN:
───────────────────
• Nama Lengkap : ${form.name}
• No. WhatsApp : ${form.phone}
• Alamat Email : ${form.email}
• Alamat Kirim : ${form.address}

🛒 KENDARAAN YANG DIPESAN:
───────────────────
${itemsText}

───────────────────
💰 ESTIMASI TOTAL PEMBAYARAN:
Rp ${formatRupiah(totalPrice)}

${
  form.companyName
    ? `🏢 DETAIL PERUSAHAAN (OPSIONAL):
───────────────────
• Perusahaan   : ${form.companyName}
• Alamat Kantor: ${form.companyAddress || "-"}`
    : ""
}

Mohon segera diproses dan dihubungi lebih lanjut. Terima kasih!`;

    // Encode message for URL
    const encodedText = encodeURIComponent(textMessage);

    // WhatsApp admin target configuration (dynamic)
    const adminPhoneNumber = settingsStore.whatsappNumber || "6282298187929";
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedText}`;

    // Redirect and close modal safely
    window.open(whatsappUrl, "_blank");
    closeModal();
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Scrollbar Customization for Modal */
form::-webkit-scrollbar {
  width: 6px;
}
form::-webkit-scrollbar-track {
  background: transparent;
}
form::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>
