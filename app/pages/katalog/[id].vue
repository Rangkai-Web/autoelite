<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Handle Not Found Safe Check -->
    <div v-if="!vehicle" class="py-20 text-center space-y-4">
      <Html lang="id">
        <Head>
          <Title>Kendaraan Tidak Ditemukan | Sentraoto</Title>
        </Head>
      </Html>
      <div
        class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto"
      >
        <Icon name="heroicons:exclamation-triangle" class="w-9 h-9" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">Kendaraan Tidak Ditemukan</h2>
      <p class="text-sm text-gray-500 max-w-sm mx-auto">
        Maaf, tautan produk kendaraan yang Anda tuju tidak valid atau telah
        dihapus dari inventaris kami.
      </p>
      <NuxtLink
        to="/katalog"
        class="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        Kembali ke Katalog
      </NuxtLink>
    </div>

    <!-- Main Dynamic Vehicle Detail Content -->
    <div v-else class="space-y-10">
      <!-- SEO Optimization -->
      <Html lang="id">
        <Head>
          <Title>{{ vehicle.name }} | Sentraoto - Spesifikasi dan Harga</Title>
          <Meta
            name="description"
            content="Pelajari detail lengkap, spesifikasi teknis, galeri gambar, dan harga dari kendaraan premium kami: ${vehicle.name}."
          />
        </Head>
      </Html>

      <!-- Breadcrumbs -->
      <div
        class="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest"
      >
        <NuxtLink to="/" class="hover:text-blue-900 transition-colors"
          >Beranda</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <NuxtLink to="/katalog" class="hover:text-blue-900 transition-colors"
          >Katalog</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-blue-900">{{ vehicle.type }}s</span>
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900 font-bold line-clamp-1">{{
          vehicle.name
        }}</span>
      </div>

      <!-- Section 1: Gallery & Summary Details Block -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Gallery Block (Takes 2 Cols on Desktop) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Active Hero Frame -->
          <div
            class="relative bg-gray-950 aspect-16/10 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center group cursor-zoom-in"
            @click="openLightbox"
          >
            <img
              :src="activeImage"
              :alt="vehicle.name"
              class="w-full h-full object-cover select-none"
            />

            <!-- Prev / Next Navigation Buttons (Fades on desktop hover, always active) -->
            <button
              @click.stop="prevImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-md flex items-center justify-center border border-white/10 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Foto Sebelumnya"
            >
              <Icon name="heroicons:chevron-left" class="w-5.5 h-5.5" />
            </button>
            <button
              @click.stop="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-xl bg-gray-900/40 hover:bg-gray-900/60 text-white backdrop-blur-md flex items-center justify-center border border-white/10 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Foto Selanjutnya"
            >
              <Icon name="heroicons:chevron-right" class="w-5.5 h-5.5" />
            </button>

            <!-- Photo Indicator Count -->
            <div
              class="absolute bottom-4 right-4 bg-gray-900/75 backdrop-blur-xs text-[10px] font-extrabold uppercase text-white tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm z-10"
            >
              <Icon name="heroicons:camera" class="w-4 h-4" />
              <span
                >{{ activeImageIndex + 1 }} /
                {{ vehicle.images.length }} Galeri</span
              >
            </div>
          </div>

          <!-- Thumbnails Strip -->
          <div class="grid grid-cols-4 gap-3 sm:gap-4">
            <button
              v-for="(img, index) in vehicle.images"
              :key="index"
              @click="setActiveImage(img, index)"
              class="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border-2 transition-all focus:outline-none"
              :class="
                activeImageIndex === index
                  ? 'border-blue-900 scale-[0.98] shadow-md shadow-blue-900/10'
                  : 'border-transparent hover:border-gray-200'
              "
            >
              <img
                :src="img"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
              <!-- overlay on final thumbnail to mimic the mockup '+X photos' -->
              <div
                v-if="index === 3 && vehicle.images.length > 4"
                class="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center"
              >
                <span
                  class="text-[10px] sm:text-xs font-black uppercase text-white tracking-wider"
                >
                  +{{ vehicle.images.length - 4 }} Photos
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- Right Highlight Box (Takes 1 Col on Desktop) -->
        <div
          class="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs gap-6"
        >
          <div class="space-y-4">
            <!-- Header Specs and tags -->
            <div class="flex items-center justify-between gap-3">
              <span
                class="text-xs font-bold text-blue-900 uppercase tracking-widest"
                >{{ vehicle.brand }} • {{ vehicle.year }}</span
              >
              <span
                v-if="vehicle.tags[0]"
                class="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-lg text-white"
                :class="getTagColorClass(vehicle.tags[0])"
              >
                {{ vehicle.tags[0] }}
              </span>
            </div>

            <!-- Title & Pricing -->
            <div class="space-y-1.5 border-b border-gray-100 pb-5">
              <h1
                class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase leading-tight"
              >
                {{ vehicle.name }}
              </h1>
              <p class="text-xs font-semibold text-gray-400">
                VIN: WBAJB1C54M98XXXXX &bull; Stock: #AE-10{{
                  vehicle.year - 1920
                }}
              </p>
              <p class="text-2xl font-black text-blue-900 pt-2">
                Rp {{ formatRupiah(vehicle.price) }}
              </p>
            </div>

            <!-- Preselected key metrics list -->
            <div class="space-y-3 py-1">
              <div class="flex justify-between items-center text-xs">
                <span
                  class="font-semibold text-gray-400 uppercase tracking-wider"
                  >Tipe Bodi</span
                >
                <span class="font-bold text-gray-800">{{ vehicle.type }}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span
                  class="font-semibold text-gray-400 uppercase tracking-wider"
                  >Transmisi</span
                >
                <span class="font-bold text-gray-800">{{
                  vehicle.transmission
                }}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span
                  class="font-semibold text-gray-400 uppercase tracking-wider"
                  >Bahan Bakar</span
                >
                <span class="font-bold text-gray-800">{{ vehicle.fuel }}</span>
              </div>
            </div>
          </div>

          <!-- Checkout Button -->
          <div class="pt-5 border-t border-gray-100">
            <button
              @click="openModal(vehicle.id)"
              class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon name="mdi:whatsapp" class="w-5.5 h-5.5" />
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>

      <!-- Section 2: Detailed Descriptions -->
      <section
        class="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4"
      >
        <h3
          class="text-lg font-black text-gray-900 tracking-tight uppercase flex items-center gap-2 border-b border-gray-100 pb-3"
        >
          <Icon name="heroicons:document-text" class="w-5 h-5 text-blue-900" />
          Detail Kendaraan
        </h3>
        <div
          class="space-y-4 text-sm text-gray-600 leading-relaxed font-medium"
        >
          <p v-for="(paragraph, index) in vehicle.description" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- Section 3: Technical Specifications Grid (3x2) -->
      <section
        class="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        <h3
          class="text-lg font-black text-gray-900 tracking-tight uppercase flex items-center gap-2 border-b border-gray-100 pb-3"
        >
          <Icon
            name="heroicons:presentation-chart-bar"
            class="w-5 h-5 text-blue-900"
          />
          Spesifikasi Teknis
        </h3>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <!-- Spec 1: Engine -->
          <div
            class="flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-100"
          >
            <span
              class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-900 shrink-0"
            >
              <Icon name="heroicons:wrench-screwdriver" class="w-5 h-5" />
            </span>
            <div>
              <span
                class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
                >Mesin</span
              >
              <span class="text-sm font-black text-gray-800 leading-snug">{{
                vehicle.specs.engine
              }}</span>
            </div>
          </div>

          <!-- Spec 2: Fuel consumption -->
          <div
            class="flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-100"
          >
            <span
              class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-900 shrink-0"
            >
              <Icon name="heroicons:fire" class="w-5 h-5" />
            </span>
            <div>
              <span
                class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
                >Konsumsi BBM</span
              >
              <span class="text-sm font-black text-gray-800 leading-snug">{{
                vehicle.specs.fuelConsumption
              }}</span>
            </div>
          </div>

          <!-- Spec 3: Horse power -->
          <div
            class="flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-100"
          >
            <span
              class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-900 shrink-0"
            >
              <Icon name="heroicons:bolt" class="w-5 h-5" />
            </span>
            <div>
              <span
                class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
                >Tenaga Kuda</span
              >
              <span class="text-sm font-black text-gray-800 leading-snug">{{
                vehicle.specs.horsePower
              }}</span>
            </div>
          </div>

          <!-- Spec 4: Drive system -->
          <div
            class="flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-100"
          >
            <span
              class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-900 shrink-0"
            >
              <Icon name="heroicons:globe-alt" class="w-5 h-5" />
            </span>
            <div>
              <span
                class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
                >Sistem Penggerak</span
              >
              <span class="text-sm font-black text-gray-800 leading-snug">{{
                vehicle.specs.driveSystem
              }}</span>
            </div>
          </div>

          <!-- Spec 5: Transmission -->
          <div
            class="flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-100"
          >
            <span
              class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-900 shrink-0"
            >
              <Icon name="heroicons:cog-8-tooth" class="w-5 h-5" />
            </span>
            <div>
              <span
                class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
                >Transmisi</span
              >
              <span class="text-sm font-black text-gray-800 leading-snug">{{
                vehicle.specs.transmission
              }}</span>
            </div>
          </div>

          <!-- Spec 6: Acceleration -->
          <div
            class="flex items-start gap-3.5 p-4 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-100"
          >
            <span
              class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-blue-900 shrink-0"
            >
              <Icon name="heroicons:clock" class="w-5 h-5" />
            </span>
            <div>
              <span
                class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
                >Akselerasi 0-100 km/h</span
              >
              <span class="text-sm font-black text-gray-800 leading-snug">{{
                vehicle.specs.acceleration
              }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Premium Image Lightbox / Zoom Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
      >
        <!-- Lightbox Top bar: title + close -->
        <div class="flex items-center justify-between text-white p-2">
          <div class="space-y-0.5">
            <span
              class="text-[10px] font-bold text-orange-400 uppercase tracking-widest"
              >{{ vehicle?.brand }}</span
            >
            <h4
              class="text-sm sm:text-base font-black uppercase tracking-tight"
            >
              {{ vehicle?.name }}
            </h4>
          </div>
          <button
            @click="closeLightbox"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            aria-label="Tutup"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Lightbox Main Frame: prev + image + next -->
        <div
          class="flex-1 flex items-center justify-between relative max-w-7xl mx-auto w-full px-4"
        >
          <!-- Prev button -->
          <button
            @click="prevImage"
            class="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-black/10"
            aria-label="Foto Sebelumnya"
          >
            <Icon name="heroicons:chevron-left" class="w-6 h-6" />
          </button>

          <!-- Main Zoomed Image -->
          <div
            class="w-full h-full max-h-[75vh] flex items-center justify-center select-none overflow-hidden rounded-2xl"
          >
            <img
              :src="activeImage"
              :alt="vehicle?.name"
              class="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
            />
          </div>

          <!-- Next button -->
          <button
            @click="nextImage"
            class="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-black/10"
            aria-label="Foto Selanjutnya"
          >
            <Icon name="heroicons:chevron-right" class="w-6 h-6" />
          </button>
        </div>

        <!-- Lightbox Bottom bar: index count -->
        <div
          class="text-center text-white py-3 text-xs font-extrabold uppercase tracking-widest"
        >
          {{ activeImageIndex + 1 }} / {{ vehicle?.images.length }} Galeri
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { VEHICLES } from "~/utils/data";
import { usePurchaseModal } from "~/composables/usePurchaseModal";

const route = useRoute();
const { openModal } = usePurchaseModal();

// Lightbox state
const isLightboxOpen = ref(false);

const openLightbox = () => {
  isLightboxOpen.value = true;
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

// Keyboard listener for interactive desktop transitions
const handleKeyDown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

// Query DB using current parameter string
const vehicle = computed(() => {
  const vehicleId = route.params.id as string;
  return VEHICLES.find((v) => v.id === vehicleId) || null;
});

// Image display state (default: main image)
const activeImage = ref("");
const activeImageIndex = ref(0);

// Initialize image display safely
if (vehicle.value) {
  activeImage.value = vehicle.value.images[0] || vehicle.value.image;
}

const setActiveImage = (url: string, idx: number) => {
  activeImage.value = url;
  activeImageIndex.value = idx;
};

const nextImage = () => {
  if (!vehicle.value) return;
  const nextIdx = (activeImageIndex.value + 1) % vehicle.value.images.length;
  const imgUrl = vehicle.value.images[nextIdx];
  if (imgUrl) {
    setActiveImage(imgUrl, nextIdx);
  }
};

const prevImage = () => {
  if (!vehicle.value) return;
  const prevIdx =
    (activeImageIndex.value - 1 + vehicle.value.images.length) %
    vehicle.value.images.length;
  const imgUrl = vehicle.value.images[prevIdx];
  if (imgUrl) {
    setActiveImage(imgUrl, prevIdx);
  }
};

// Return tag colors
const getTagColorClass = (tag: string) => {
  const norm = tag.toLowerCase();
  if (norm === "baru") return "bg-blue-900";
  if (norm === "elektrik") return "bg-emerald-600";
  if (norm === "promo") return "bg-amber-500";
  return "bg-gray-600";
};

// Currency formatter
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};
</script>
