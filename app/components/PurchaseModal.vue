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
            class="text-gray-400 hover:text-gray-600 transition-colors p-1.5 flex justify-center items-center hover:bg-gray-100 rounded-full cursor-pointer"
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
            <div class="flex items-center justify-between mb-4">
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
                class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-gray-50 p-3.5 rounded-xl border border-gray-100"
              >
                <div class="flex-1">
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Tipe Kendaraan *</label
                  >
                  <select
                    v-model="item.vehicleId"
                    required
                    class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none"
                  >
                    <option value="" disabled>-- Pilih Kendaraan --</option>
                    <option
                      v-for="vehicle in VEHICLES"
                      :key="vehicle.id"
                      :value="vehicle.id"
                    >
                      {{ vehicle.name }} (Rp {{ formatRupiah(vehicle.price) }})
                    </option>
                  </select>
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
          class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-end gap-3"
        >
          <button
            type="button"
            @click="closeModal"
            class="w-full sm:w-auto px-5 py-2.5 border border-gray-200 hover:bg-gray-100 rounded-xl text-sm font-semibold text-gray-700 transition-colors"
          >
            Batal
          </button>
          <button
            @click="handleSubmit"
            type="submit"
            class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="mdi:whatsapp" class="w-5 h-5" />
            Kirim ke WhatsApp Admin
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { usePurchaseModal } from "~/composables/usePurchaseModal";
import { VEHICLES } from "~/utils/data";

const { isOpen, prefilledVehicleId, closeModal } = usePurchaseModal();
const toast = useToast();

// Form Reactive State
const form = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  items: [] as Array<{ vehicleId: string; qty: number }>,
  companyName: "",
  companyAddress: "",
});

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
      form.items = [{ vehicleId: prefilledVehicleId.value, qty: 1 }];
    } else {
      form.items = [{ vehicleId: "", qty: 1 }];
    }
  }
});

// Helper for formatting currencies
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

// Item Modifiers
const addVehicle = () => {
  form.items.push({ vehicleId: "", qty: 1 });
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

// WA Form Submission
const handleSubmit = () => {
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
      const v = VEHICLES.find((vehicle) => vehicle.id === item.vehicleId);
      const vehicleName = v ? v.name : "Unknown Vehicle";
      const vehiclePrice = v ? v.price : 0;
      const totalItemPrice = vehiclePrice * item.qty;
      return `${idx + 1}. ${vehicleName}\n   Jumlah: ${item.qty} unit\n   Harga Satuan: Rp ${formatRupiah(vehiclePrice)}\n   Subtotal: Rp ${formatRupiah(totalItemPrice)}`;
    })
    .join("\n\n");

  // Format Total Price
  const totalPrice = form.items.reduce((total, item) => {
    const v = VEHICLES.find((vehicle) => vehicle.id === item.vehicleId);
    return total + (v ? v.price : 0) * item.qty;
  }, 0);

  // Compile final WhatsApp text template
  const textMessage = `Halo Admin Sentraoto,

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

  // WhatsApp admin target configuration (placeholder)
  const adminPhoneNumber = "6281234567890";
  const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedText}`;

  // Redirect and close modal safely
  window.open(whatsappUrl, "_blank");
  closeModal();
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
