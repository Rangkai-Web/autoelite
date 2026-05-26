<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title
          >Katalog Kendaraan | AUTOELITE - Dealer Mobil & Motor Premium</Title
        >
        <Meta
          name="description"
          content="Temukan katalog lengkap mobil dan motor mewah premium di AUTOELITE. Saring berdasarkan kategori, merek, dan rentang harga terbaik."
        />
      </Head>
    </Html>

    <!-- Page Title Header -->
    <div class="mb-10">
      <div
        class="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2"
      >
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
          >Beranda</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900 font-bold">Katalog</span>
      </div>
      <h1
        class="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase"
      >
        Katalog Kendaraan Kami
      </h1>
      <p class="text-sm text-gray-500 font-medium mt-1">
        Jelajahi koleksi terlengkap kendaraan roda empat dan roda dua eksklusif.
      </p>
    </div>

    <!-- Main Content Area (Layout Grid) -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <!-- Sidebar Filters: Desktop (hidden on lg, visible as sidebar on desktop) -->
      <aside
        class="hidden lg:block lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6"
      >
        <div
          class="flex items-center justify-between border-b border-gray-100 pb-4"
        >
          <span
            class="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2"
          >
            <Icon
              name="heroicons:adjustments-horizontal"
              class="w-5 h-5 text-blue-600"
            />
            Filter
          </span>
          <button
            @click="resetFilters"
            class="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Icon name="heroicons:arrow-path" class="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <!-- Filter Category -->
        <div class="space-y-3">
          <h4
            class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
          >
            Kategori
          </h4>
          <div class="space-y-2">
            <label
              v-for="cat in categories"
              :key="cat"
              class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer select-none"
            >
              <div class="relative flex items-center justify-center shrink-0">
                <input
                  v-model="filters.selectedTypes"
                  type="checkbox"
                  :value="cat"
                  class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all"
                />
                <Icon
                  name="heroicons:check-20-solid"
                  class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              {{ cat }}
            </label>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- Filter Brands -->
        <div class="space-y-3">
          <h4
            class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
          >
            Merek
          </h4>
          <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            <label
              v-for="brand in brands"
              :key="brand"
              class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer select-none"
            >
              <div class="relative flex items-center justify-center shrink-0">
                <input
                  v-model="filters.selectedBrands"
                  type="checkbox"
                  :value="brand"
                  class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all"
                />
                <Icon
                  name="heroicons:check-20-solid"
                  class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              {{ brand }}
            </label>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- Filter Prices -->
        <div class="space-y-3">
          <h4
            class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
          >
            Rentang Harga (Rp)
          </h4>
          <div class="space-y-3">
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                >Min</label
              >
              <input
                v-model.number="filters.minPrice"
                type="number"
                placeholder="Contoh: 500000000"
                class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                >Max</label
              >
              <input
                v-model.number="filters.maxPrice"
                type="number"
                placeholder="Contoh: 4000000000"
                class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Product Grid Section -->
      <section class="lg:col-span-3 space-y-6">
        <!-- Controls Bar -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs"
        >
          <!-- Search input embedded -->
          <div class="relative flex items-center flex-1 max-w-md">
            <span class="absolute left-3.5 text-gray-400">
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4" />
            </span>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Cari katalog..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder:text-gray-400 font-semibold"
            />
            <button
              v-if="filters.search"
              @click="filters.search = ''"
              class="absolute right-3.5 text-gray-400 hover:text-gray-600"
            >
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </div>

          <!-- Right Sorting -->
          <div class="flex items-center gap-3 justify-between sm:justify-end">
            <!-- Mobile Toggle Filter button -->
            <button
              @click="isMobileFilterOpen = true"
              class="lg:hidden flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <Icon
                name="heroicons:adjustments-horizontal"
                class="w-4 h-4 text-blue-600"
              />
              Saring
            </button>

            <!-- Sorting selector -->
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline"
                >Urutkan:</span
              >
              <select
                v-model="sortBy"
                class="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
              >
                <option value="terbaru">Terbaru</option>
                <option value="harga-rendah">Harga Terendah</option>
                <option value="harga-tinggi">Harga Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filters Bar -->
        <div
          v-if="hasActiveFilters"
          class="flex flex-wrap gap-2 items-center bg-blue-50/40 border border-blue-100/50 p-3.5 rounded-2xl"
        >
          <span
            class="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mr-1.5"
            >Filter Aktif:</span
          >

          <!-- Search Badge -->
          <span
            v-if="filters.search"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            Cari: "{{ filters.search }}"
            <button
              @click="filters.search = ''"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Type Badges -->
          <span
            v-for="type in filters.selectedTypes"
            :key="type"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            {{ type }}
            <button
              @click="removeTypeFilter(type)"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Brand Badges -->
          <span
            v-for="brand in filters.selectedBrands"
            :key="brand"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            {{ brand }}
            <button
              @click="removeBrandFilter(brand)"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Min Price Badge -->
          <span
            v-if="filters.minPrice"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            Min: Rp {{ formatRupiah(filters.minPrice) }}
            <button
              @click="filters.minPrice = null"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Max Price Badge -->
          <span
            v-if="filters.maxPrice"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            Max: Rp {{ formatRupiah(filters.maxPrice) }}
            <button
              @click="filters.maxPrice = null"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>
        </div>

        <!-- Catalog Product Grid -->
        <div
          v-if="paginatedVehicles.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="vehicle in paginatedVehicles"
            :key="vehicle.id"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <!-- Image Frame -->
            <NuxtLink
              :to="`/katalog/${vehicle.id}`"
              class="relative block overflow-hidden aspect-video bg-gray-100"
            >
              <img
                :src="vehicle.image"
                :alt="vehicle.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in vehicle.tags"
                  :key="tag"
                  class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg text-white shadow-sm"
                  :class="getTagColorClass(tag)"
                >
                  {{ tag }}
                </span>
              </div>
            </NuxtLink>

            <!-- Card Body -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div class="space-y-1.5">
                <span
                  class="text-[10px] font-bold text-blue-600 uppercase tracking-widest"
                  >{{ vehicle.brand }}</span
                >
                <NuxtLink :to="`/katalog/${vehicle.id}`" class="block">
                  <h3
                    class="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1"
                  >
                    {{ vehicle.name }}
                  </h3>
                </NuxtLink>
                <p class="text-sm font-black text-gray-800">
                  Rp {{ formatRupiah(vehicle.price) }}
                </p>
              </div>

              <!-- Action Indicators -->
              <div
                class="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500"
              >
                <div class="flex items-center gap-1.5">
                  <Icon
                    name="heroicons:cog-8-tooth"
                    class="w-4 h-4 text-gray-400"
                  />
                  <span>{{ vehicle.transmission }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Icon name="heroicons:fire" class="w-4 h-4 text-gray-400" />
                  <span>{{ vehicle.fuel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="bg-white border border-gray-100 rounded-2xl py-20 px-4 text-center space-y-4 shadow-2xs"
        >
          <div
            class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mx-auto"
          >
            <Icon name="heroicons:information-circle" class="w-9 h-9" />
          </div>
          <div class="max-w-md mx-auto space-y-1">
            <h3 class="text-lg font-extrabold text-gray-900">
              Kendaraan Tidak Ditemukan
            </h3>
            <p class="text-sm text-gray-500 font-medium">
              Tidak ada kendaraan yang cocok dengan filter atau kata kunci Anda
              saat ini. Silakan atur ulang pencarian.
            </p>
          </div>
          <button
            @click="resetFilters"
            class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Atur Ulang Semua Filter
          </button>
        </div>

        <!-- Pagination (Static representation matching mockups) -->
        <div
          v-if="filteredVehicles.length > 0"
          class="pt-6 flex justify-center items-center gap-1.5"
        >
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="w-10 h-10 border rounded-xl flex items-center justify-center text-xs font-bold transition-all"
            :class="
              currentPage === page
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            "
          >
            {{ page }}
          </button>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>

    <!-- Mobile Filter Slideover Overlay -->
    <Teleport to="body">
      <div
        v-if="isMobileFilterOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/55 backdrop-blur-xs"
          @click="isMobileFilterOpen = false"
        ></div>
        <div
          class="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300"
        >
          <!-- Drawer Header -->
          <div
            class="px-5 py-4 border-b border-gray-100 flex items-center justify-between"
          >
            <span
              class="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Icon
                name="heroicons:adjustments-horizontal"
                class="w-5 h-5 text-blue-600"
              />
              Saring Kendaraan
            </span>
            <button
              @click="isMobileFilterOpen = false"
              class="text-gray-400 p-1 hover:bg-gray-100 rounded-full"
            >
              <Icon name="heroicons:x-mark" class="w-5.5 h-5.5" />
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-6">
            <!-- Filter Category -->
            <div class="space-y-3">
              <h4
                class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
              >
                Kategori
              </h4>
              <div class="space-y-2">
                <label
                  v-for="cat in categories"
                  :key="cat"
                  class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  <div class="relative flex items-center justify-center shrink-0">
                    <input
                      v-model="filters.selectedTypes"
                      type="checkbox"
                      :value="cat"
                      class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all"
                    />
                    <Icon
                      name="heroicons:check-20-solid"
                      class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    />
                  </div>
                  {{ cat }}
                </label>
              </div>
            </div>

            <hr class="border-gray-100" />

            <!-- Filter Brands -->
            <div class="space-y-3">
              <h4
                class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
              >
                Merek
              </h4>
              <div class="space-y-2">
                <label
                  v-for="brand in brands"
                  :key="brand"
                  class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  <div class="relative flex items-center justify-center shrink-0">
                    <input
                      v-model="filters.selectedBrands"
                      type="checkbox"
                      :value="brand"
                      class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all"
                    />
                    <Icon
                      name="heroicons:check-20-solid"
                      class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    />
                  </div>
                  {{ brand }}
                </label>
              </div>
            </div>

            <hr class="border-gray-100" />

            <!-- Filter Prices -->
            <div class="space-y-3">
              <h4
                class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
              >
                Rentang Harga (Rp)
              </h4>
              <div class="space-y-3">
                <div>
                  <label
                    class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                    >Min</label
                  >
                  <input
                    v-model.number="filters.minPrice"
                    type="number"
                    placeholder="Contoh: 500000000"
                    class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label
                    class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                    >Max</label
                  >
                  <input
                    v-model.number="filters.maxPrice"
                    type="number"
                    placeholder="Contoh: 4000000000"
                    class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer Cta -->
          <div class="p-5 border-t border-gray-100 space-y-2">
            <button
              @click="isMobileFilterOpen = false"
              class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md text-center cursor-pointer"
            >
              Tampilkan Hasil ({{ filteredVehicles.length }} kendaraan)
            </button>
            <button
              @click="resetFilters"
              class="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold rounded-xl text-xs text-center cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { VEHICLES } from "~/utils/data";

const route = useRoute();

// Lists of filter options
const categories = ["SUV", "Sedan", "Electric", "Motor"];
const brands = ["Mercedes-Benz", "BMW", "Audi", "Porsche", "Ducati"];

// Mobile states
const isMobileFilterOpen = ref(false);

// Reactive Filter States
const filters = reactive({
  search: "",
  selectedTypes: [] as string[],
  selectedBrands: [] as string[],
  minPrice: null as number | null,
  maxPrice: null as number | null,
});

const sortBy = ref("terbaru");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 6;

// Load query parameters on mount
onMounted(() => {
  if (route.query.search) {
    filters.search = route.query.search as string;
  }
  if (route.query.type) {
    const qType = route.query.type as string;
    if (categories.includes(qType)) {
      filters.selectedTypes.push(qType);
    }
  }
});

// Check if any filter is currently applied
const hasActiveFilters = computed(() => {
  return (
    filters.search !== "" ||
    filters.selectedTypes.length > 0 ||
    filters.selectedBrands.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null
  );
});

// Watch filters to reset page to 1
watch(
  [
    () => filters.search,
    () => filters.selectedTypes,
    () => filters.selectedBrands,
    () => filters.minPrice,
    () => filters.maxPrice,
  ],
  () => {
    currentPage.value = 1;
  },
  { deep: true },
);

// Format Rupiah helper
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

// Return tag backgrounds
const getTagColorClass = (tag: string) => {
  const norm = tag.toLowerCase();
  if (norm === "baru") return "bg-blue-600";
  if (norm === "elektrik") return "bg-emerald-600";
  if (norm === "promo") return "bg-amber-500";
  return "bg-gray-600";
};

// Filter Dismiss actions
const removeTypeFilter = (type: string) => {
  filters.selectedTypes = filters.selectedTypes.filter((t) => t !== type);
};

const removeBrandFilter = (brand: string) => {
  filters.selectedBrands = filters.selectedBrands.filter((b) => b !== brand);
};

const resetFilters = () => {
  filters.search = "";
  filters.selectedTypes = [];
  filters.selectedBrands = [];
  filters.minPrice = null;
  filters.maxPrice = null;
  sortBy.value = "terbaru";
  currentPage.value = 1;
};

// Filtering Calculations
const filteredVehicles = computed(() => {
  let result = [...VEHICLES];

  // 1. Search Query
  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (v) =>
        v.name.toLowerCase().includes(query) ||
        v.brand.toLowerCase().includes(query) ||
        v.type.toLowerCase().includes(query),
    );
  }

  // 2. Kategori filter
  if (filters.selectedTypes.length > 0) {
    result = result.filter((v) => filters.selectedTypes.includes(v.type));
  }

  // 3. Merek filter
  if (filters.selectedBrands.length > 0) {
    result = result.filter((v) => filters.selectedBrands.includes(v.brand));
  }

  // 4. Min Price
  if (filters.minPrice !== null && filters.minPrice > 0) {
    result = result.filter((v) => v.price >= (filters.minPrice || 0));
  }

  // 5. Max Price
  if (filters.maxPrice !== null && filters.maxPrice > 0) {
    result = result.filter((v) => v.price <= (filters.maxPrice || Infinity));
  }

  // 6. Sorting
  if (sortBy.value === "terbaru") {
    // Sort descending by year
    result.sort((a, b) => b.year - a.year);
  } else if (sortBy.value === "harga-rendah") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "harga-tinggi") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
});

// Pagination Calculations
const totalPages = computed(() => {
  return Math.ceil(filteredVehicles.value.length / itemsPerPage) || 1;
});

const paginatedVehicles = computed(() => {
  const startIdx = (currentPage.value - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  return filteredVehicles.value.slice(startIdx, endIdx);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Scroll window smoothly to top of catalog results
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>
