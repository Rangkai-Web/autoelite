<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Detail Loader Shimmer -->
    <div v-if="vehicleStore.detailLoading" class="space-y-10 animate-pulse">
      <!-- Breadcrumb Shimmer -->
      <div class="h-4 bg-gray-100 rounded-md w-1/4"></div>

      <!-- Layout Shimmer -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-gray-100 rounded-2xl aspect-16/10"></div>
          <div class="grid grid-cols-4 gap-3 sm:gap-4">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-100 rounded-xl aspect-video"
            ></div>
          </div>
        </div>
        <div
          class="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6"
        >
          <div class="h-4 bg-gray-100 rounded-md w-1/2"></div>
          <div class="h-8 bg-gray-100 rounded-md w-3/4"></div>
          <div class="h-6 bg-gray-100 rounded-md w-1/3"></div>
          <div class="space-y-3 pt-6 border-t border-gray-100">
            <div
              v-for="i in 3"
              :key="i"
              class="h-3 bg-gray-100 rounded-md"
            ></div>
          </div>
          <div class="h-12 bg-gray-100 rounded-xl mt-6"></div>
        </div>
      </div>
    </div>

    <!-- Handle Not Found Safe Check -->
    <div v-else-if="!vehicle" class="py-20 text-center space-y-4">
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
            content="Pelajari detail lengkap, spesifikasi teknis, galeri gambar, dan harga dari kendaraan kami: ${vehicle.name}."
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

          <!-- Thumbnails Strip (Limited to a clean single line of 4 columns) -->
          <div class="grid grid-cols-4 gap-3 sm:gap-4">
            <button
              v-for="(img, index) in vehicle.images.slice(0, 4)"
              :key="index"
              @click="setActiveImage(img, index)"
              class="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border-2 transition-all focus:outline-none"
              :class="
                activeImageIndex === index ||
                (index === 3 && activeImageIndex >= 3)
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
                class="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center pointer-events-none"
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

        <!-- Right Highlight Box -->
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
              <p class="text-2xl font-black text-blue-900 pt-2">
                Rp {{ formatRupiah(displayedPrice) }}
              </p>
            </div>

            <!-- Varian & Warna Selection (Premium Design) -->
            <div
              v-if="vehicle.variants && vehicle.variants.length > 0"
              class="space-y-4 border-b border-gray-100 pb-5"
            >
              <!-- Varian -->
              <div>
                <label
                  class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                  >Pilih Varian</label
                >
                <div class="grid grid-cols-1 gap-2">
                  <button
                    v-for="variant in vehicle.variants"
                    :key="variant.id"
                    type="button"
                    @click="selectVariant(variant)"
                    class="w-full text-left px-4 py-3 border rounded-xl transition-all duration-200 flex justify-between items-center group cursor-pointer"
                    :style="
                      selectedVariantId === variant.id
                        ? 'border-color: #1e3a8a; background-color: rgba(30, 58, 138, 0.03);'
                        : 'border-color: #f3f4f6;'
                    "
                  >
                    <div>
                      <span
                        class="block text-xs font-bold uppercase tracking-wide"
                        :style="
                          selectedVariantId === variant.id
                            ? 'color: #1e3a8a;'
                            : 'color: #1f2937;'
                        "
                      >
                        {{ variant.name }}
                      </span>
                    </div>
                    <span class="text-xs font-black text-blue-900">
                      Rp {{ formatRupiah(variant.price) }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Warna -->
              <div v-if="availableColors.length > 0">
                <label
                  class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                  >Pilih Warna</label
                >
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="color in availableColors"
                    :key="typeof color === 'object' ? color.name : color"
                    type="button"
                    @click="selectColor(color)"
                    class="px-3 py-1.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer"
                    :style="
                      selectedColor ===
                      (typeof color === 'object' ? color.name : color)
                        ? 'border-color: #1e3a8a; background-color: #1e3a8a; color: #ffffff;'
                        : 'border-color: #e5e7eb; color: #4b5563;'
                    "
                  >
                    {{ typeof color === "object" ? color.name : color }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Preselected key metrics list -->
            <div class="space-y-3 py-1">
              <div class="flex justify-between items-center text-xs">
                <span
                  class="font-semibold text-gray-400 uppercase tracking-wider"
                  >Kategori</span
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
              @click="openModal(vehicle.id, selectedVariantId, selectedColor)"
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
                vehicle.specs.engine || "-"
              }}</span>
            </div>
          </div>

          <!-- Spec 2: Fuel consumption -->
          <!-- <div
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
          </div> -->

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
                vehicle.specs.horsePower || "-"
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
                vehicle.specs.driveSystem || "-"
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
                vehicle.specs.transmission || "-"
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
                vehicle.specs.acceleration || "-"
              }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Image Lightbox / Zoom Modal -->
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
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useVehicleStore } from "~/store/vehicleStore";
import { usePurchaseModal } from "~/composables/usePurchaseModal";

const route = useRoute();
const { openModal } = usePurchaseModal();
const vehicleStore = useVehicleStore();

// Variant & Color state
const selectedVariantId = ref<number | null>(null);
const selectedColor = ref<string | null>(null);

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

// Image display state (default: main image)
const activeImage = ref("");
const activeImageIndex = ref(0);

// Query DB using current parameter string
const vehicle = computed(() => vehicleStore.vehicleDetail);

// Get available variants
const activeVariant = computed(() => {
  if (!vehicle.value || !vehicle.value.variants) return null;
  return (
    vehicle.value.variants.find((v) => v.id === selectedVariantId.value) || null
  );
});

// Dinamis price
const displayedPrice = computed(() => {
  return activeVariant.value
    ? activeVariant.value.price
    : vehicle.value
      ? vehicle.value.price
      : 0;
});

// Dynamic available colors based on selected variant
const availableColors = computed(() => {
  return activeVariant.value ? activeVariant.value.colors : [];
});

const selectColor = (color: any) => {
  const colorName = typeof color === "object" ? color.name : color;
  selectedColor.value = colorName;

  if (color && typeof color === "object" && color.image) {
    activeImage.value = color.image;
  }
};

const selectVariant = (variant: any) => {
  selectedVariantId.value = variant.id;
  // Auto-select first color of new variant if available
  if (variant.colors && variant.colors.length > 0) {
    const firstColor = variant.colors[0];
    const colorName =
      typeof firstColor === "object" ? firstColor.name : firstColor;
    selectedColor.value = colorName;
    if (firstColor && typeof firstColor === "object" && firstColor.image) {
      activeImage.value = firstColor.image;
    }
  } else {
    selectedColor.value = null;
  }
};

// Initialize image display and variants safely when vehicleDetail loads
watch(
  vehicle,
  (newVal) => {
    if (newVal) {
      activeImage.value = newVal.images[0] || newVal.image;
      activeImageIndex.value = 0;

      // Handle variants initialization
      if (newVal.variants && newVal.variants.length > 0) {
        const defaultVariant = newVal.variants[0];
        if (defaultVariant) {
          selectedVariantId.value = defaultVariant.id;
          if (defaultVariant.colors && defaultVariant.colors.length > 0) {
            const firstColor = defaultVariant.colors[0];
            const colorName =
              typeof firstColor === "object" ? firstColor.name : firstColor;
            selectedColor.value = colorName ?? null;
            if (
              firstColor &&
              typeof firstColor === "object" &&
              firstColor.image
            ) {
              activeImage.value = firstColor.image;
            }
          } else {
            selectedColor.value = null;
          }
        }
      } else {
        selectedVariantId.value = null;
        selectedColor.value = null;
      }
    }
  },
  { immediate: true },
);

onMounted(() => {
  const vehicleId = route.params.id as string;
  vehicleStore.fetchVehicleDetail(vehicleId);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const setActiveImage = (url: string, idx: number) => {
  activeImage.value = url;
  activeImageIndex.value = idx;
  if (idx === 3 && vehicle.value && vehicle.value.images.length > 4) {
    openLightbox();
  }
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
