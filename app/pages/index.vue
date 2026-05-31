<template>
  <div class="space-y-16 pb-20">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Beranda | Sentraoto - Showroom Mobil Premium</Title>
        <Meta
          name="description"
          content="Selamat datang di Sentraoto. Temukan jajaran mobil terbaik dengan performa tanpa batas dan eksklusivitas murni."
        />
      </Head>
    </Html>

    <!-- Section 1: Hero Carousel + Search Filter Component -->
    <HeroCarousel />

    <!-- Spacing for floating bar -->
    <div class="h-24 sm:h-12"></div>

    <!-- Section 2: Koleksi Terkini -->
    <section
      id="koleksi-terkini"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-5"
      >
        <div>
          <h2
            class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight"
          >
            Koleksi Terkini
          </h2>
          <p class="text-sm text-gray-500 font-medium mt-1">
            Eksplorasi jajaran kendaraan terbaru kami secara real-time.
          </p>
        </div>
        <NuxtLink
          to="/katalog"
          class="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:text-blue-800 hover:underline transition-colors"
        >
          Lihat Semua di Katalog
          <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Loading State (Pulse Skeleton Loader) -->
      <div
        v-if="loading && homeVehicles.length === 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs p-5 space-y-4 animate-pulse"
        >
          <div class="aspect-video bg-gray-100 rounded-xl"></div>
          <div class="space-y-3">
            <div class="h-3 bg-gray-100 rounded-md w-1/4"></div>
            <div class="h-5 bg-gray-100 rounded-md w-3/4"></div>
            <div class="h-4 bg-gray-100 rounded-md w-1/2"></div>
          </div>
          <div class="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
            <div class="h-3 bg-gray-100 rounded-md w-3/4"></div>
            <div class="h-3 bg-gray-100 rounded-md w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- Catalog Product Grid -->
      <div
        v-else-if="homeVehicles.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="vehicle in homeVehicles"
          :key="vehicle.id"
          class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Thumbnail Image -->
          <NuxtLink
            :to="`/katalog/${vehicle.id}`"
            class="relative block overflow-hidden aspect-video bg-gray-100"
          >
            <img
              :src="vehicle.image"
              :alt="vehicle.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <!-- Badges -->
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

          <!-- Content Details -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div class="space-y-1.5">
              <span
                class="text-[10px] font-bold text-blue-900 uppercase tracking-widest"
                >{{ vehicle.brand }}</span
              >
              <NuxtLink :to="`/katalog/${vehicle.id}`" class="block">
                <h3
                  class="text-base font-extrabold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-1"
                >
                  {{ vehicle.name }}
                </h3>
              </NuxtLink>
              <p class="text-sm font-black text-gray-800">
                Rp {{ formatRupiah(vehicle.price) }}
              </p>
            </div>

            <!-- Features -->
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
        class="bg-white border border-gray-100 rounded-2xl py-16 px-4 text-center space-y-4 shadow-2xs max-w-xl mx-auto"
      >
        <div
          class="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mx-auto"
        >
          <Icon name="heroicons:information-circle" class="w-9 h-9" />
        </div>
        <div class="space-y-1">
          <h3 class="text-lg font-extrabold text-gray-900">
            Kendaraan Tidak Ditemukan
          </h3>
          <p class="text-sm text-gray-500 font-medium">
            Tidak ada kendaraan yang cocok dengan kata kunci atau filter
            pencarian Anda saat ini.
          </p>
        </div>
        <button
          @click="resetHomeSearch"
          class="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Atur Ulang Pencarian
        </button>
      </div>

      <!-- Load More Button -->
      <div v-if="currentPage < homeMeta.last_page" class="pt-8 text-center">
        <button
          @click="loadMore"
          :disabled="loading"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          <span v-if="loading">Memuat...</span>
          <span v-else>Tampilkan Lebih Banyak</span>
          <Icon v-if="!loading" name="heroicons:chevron-down" class="w-4 h-4" />
        </button>
      </div>
    </section>

    <!-- Section 3: Berita & Tips Otomotif -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <h2
          class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight"
        >
          Berita & Tips Otomotif
        </h2>
        <p class="text-sm text-gray-500 font-medium">
          Ikuti perkembangan terbaru seputar dunia otomotif dan penawaran
          eksklusif dari kami.
        </p>
      </div>

      <!-- Loading State (Pulse Skeleton Loader) -->
      <div
        v-if="blogStore.loading && latestBlogs.length === 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs animate-pulse flex flex-col justify-between"
        >
          <!-- Blog Image Skeleton -->
          <div class="aspect-video bg-gray-100 w-full relative">
            <div class="absolute bottom-3 right-3 w-16 h-5 bg-gray-200 rounded-lg"></div>
          </div>

          <!-- Blog Details Skeleton -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="h-3 bg-gray-200 rounded-md w-1/4"></div>
                <div class="h-3 bg-gray-200 rounded-md w-1/6"></div>
              </div>
              <div class="space-y-2">
                <div class="h-5 bg-gray-200 rounded-md w-11/12"></div>
                <div class="h-5 bg-gray-200 rounded-md w-3/4"></div>
              </div>
              <div class="space-y-1.5 pt-1">
                <div class="h-3.5 bg-gray-100 rounded-md w-full"></div>
                <div class="h-3.5 bg-gray-100 rounded-md w-full"></div>
                <div class="h-3.5 bg-gray-100 rounded-md w-5/6"></div>
              </div>
            </div>

            <div class="pt-2">
              <div class="h-4 bg-gray-200 rounded-md w-1/3"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blogs Grid -->
      <div
        v-else-if="latestBlogs.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div
          v-for="blog in latestBlogs"
          :key="blog.id"
          class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Blog Image -->
          <NuxtLink
            :to="`/blog/${blog.id}`"
            class="relative block overflow-hidden aspect-video bg-gray-100"
          >
            <img
              :src="blog.image"
              :alt="blog.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              class="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg bg-gray-900/80 text-white backdrop-blur-xs"
            >
              {{ blog.category }}
            </span>
          </NuxtLink>

          <!-- Blog Details -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <div
                class="flex items-center gap-3 text-xs font-semibold text-gray-400"
              >
                <span class="flex items-center gap-1">
                  <Icon name="heroicons:calendar" class="w-3.5 h-3.5" />
                  {{ blog.date }}
                </span>
                <span>•</span>
                <span>{{ blog.readTime }}</span>
              </div>
              <NuxtLink :to="`/blog/${blog.id}`" class="block">
                <h3
                  class="text-base font-extrabold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug"
                >
                  {{ blog.title }}
                </h3>
              </NuxtLink>
              <p class="text-xs text-gray-500 leading-relaxed line-clamp-3">
                {{ blog.excerpt }}
              </p>
            </div>

            <div class="pt-2">
              <NuxtLink
                :to="`/blog/${blog.id}`"
                class="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-800 hover:underline group/btn transition-all"
              >
                Baca Selengkapnya
                <Icon
                  name="heroicons:arrow-right"
                  class="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="bg-white border border-gray-100 rounded-2xl py-16 px-4 text-center space-y-4 shadow-2xs max-w-xl mx-auto"
      >
        <div
          class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 mx-auto"
        >
          <Icon name="heroicons:document-text" class="w-9 h-9" />
        </div>
        <div class="space-y-1">
          <h3 class="text-lg font-extrabold text-gray-900">
            Belum Ada Berita & Tips
          </h3>
          <p class="text-sm text-gray-500 font-medium">
            Saat ini belum ada artikel berita atau tips otomotif yang diterbitkan. Silakan kembali lagi nanti.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useVehicleStore, normalizeVehicle } from "~/store/vehicleStore";
import { useBlogStore } from "~/store/blogStore";
import { useCategoryStore } from "~/store/categoryStore";
import { useApi } from "~/services/api";
import type { Vehicle } from "~/types";

const vehicleStore = useVehicleStore();
const blogStore = useBlogStore();
const categoryStore = useCategoryStore();

// Local dynamic home search states
const homeVehicles = ref<Vehicle[]>([]);
const homeMeta = ref({ current_page: 1, last_page: 1, total: 0 });
const currentPage = ref(1);
const loading = ref(true);

const fetchHomeVehicles = async (page = 1, append = false) => {
  loading.value = true;
  try {
    const api = useApi();

    // Map category name or slug dynamically using categoryStore
    let categorySlug = "";
    if (vehicleStore.homeSelectedCategory) {
      const match = categoryStore.categories.find(
        (c) =>
          c.slug.toLowerCase() ===
            vehicleStore.homeSelectedCategory.toLowerCase() ||
          c.name.toLowerCase() ===
            vehicleStore.homeSelectedCategory.toLowerCase(),
      );
      categorySlug = match
        ? match.slug
        : vehicleStore.homeSelectedCategory.toLowerCase();
    }

    const params = {
      page,
      per_page: 8,
      search: vehicleStore.homeSearchQuery || undefined,
      category: categorySlug || undefined,
    };

    const res = await api.getVehicles(params);
    if (res && res.data) {
      const normalized = res.data.map(normalizeVehicle);
      if (append) {
        homeVehicles.value = [...homeVehicles.value, ...normalized];
      } else {
        homeVehicles.value = normalized;
      }
      homeMeta.value = res.meta || {
        current_page: page,
        last_page: 1,
        per_page: 8,
        total: homeVehicles.value.length,
      };
      currentPage.value = page;
    }
  } catch (error) {
    console.error("Gagal memuat kendaraan beranda:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // Ensure categories are loaded for dynamic mapping
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories();
  }

  // Load initial vehicles and blogs
  await Promise.all([
    fetchHomeVehicles(1, false),
    blogStore.fetchBlogs({ per_page: 3 }),
  ]);
});

// Watch home filter states (no debounce needed since it only updates on submit click)
watch(
  [() => vehicleStore.homeSearchQuery, () => vehicleStore.homeSelectedCategory],
  async () => {
    await fetchHomeVehicles(1, false);
  },
);

// Reset Search
const resetHomeSearch = () => {
  vehicleStore.homeSearchQuery = "";
  vehicleStore.homeSelectedCategory = "";
};

// Load More
const loadMore = async () => {
  if (currentPage.value < homeMeta.value.last_page) {
    await fetchHomeVehicles(currentPage.value + 1, true);
  }
};

// Get all 3 blogs for the footer-grid tips section
const latestBlogs = computed(() => blogStore.blogs.slice(0, 3));

// Helper for formatting currencies
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

// Return matching colors for vehicle tags
const getTagColorClass = (tag: string) => {
  const norm = tag.toLowerCase();
  if (norm === "baru") return "bg-blue-900";
  if (norm === "elektrik") return "bg-emerald-600";
  if (norm === "promo") return "bg-amber-500";
  return "bg-gray-600";
};
</script>
