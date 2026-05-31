<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Berita & Tips Otomotif | Sentraoto</Title>
        <Meta
          name="description"
          content="Kumpulan artikel otomotif terbaru, review mobil, panduan tips & trik perawatan kendaraan di Sentraoto."
        />
      </Head>
    </Html>

    <!-- Header Title -->
    <div class="mb-10 text-center max-w-2xl mx-auto space-y-3">
      <div
        class="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest"
      >
        <NuxtLink to="/" class="hover:text-blue-900 transition-colors"
          >Beranda</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900 font-bold">Blog</span>
      </div>
      <h1
        class="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase"
      >
        Berita & Tips Otomotif
      </h1>
      <p class="text-sm text-gray-500 font-medium">
        Ikuti perkembangan terbaru, panduan perawatan mesin, serta review
        mendalam jajaran kendaraan kelas atas dari para ahli kami.
      </p>
    </div>

    <!-- Search and Categories Filter Bar -->
    <div class="space-y-6 mb-12">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs"
      >
        <!-- Category Pills -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in blogCategories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            :class="
              activeCategory === cat
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/10'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            "
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search box -->
        <div class="relative flex items-center w-full md:w-80">
          <span class="absolute left-3.5 text-gray-400">
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari artikel..."
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900 placeholder:text-gray-400 font-semibold"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3.5 text-gray-400 hover:text-gray-600"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State (Pulse Skeleton Loader - Only shown on initial page load) -->
    <div
      v-if="blogStore.loading && filteredBlogs.length === 0"
      class="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs p-6 space-y-4 animate-pulse"
      >
        <div class="aspect-video bg-gray-100 rounded-xl"></div>
        <div class="space-y-3">
          <div class="h-3 bg-gray-100 rounded-md w-1/4"></div>
          <div class="h-5 bg-gray-100 rounded-md w-3/4"></div>
          <div class="h-3 bg-gray-100 rounded-md w-full"></div>
        </div>
      </div>
    </div>

    <!-- Articles Grid & Load More -->
    <div v-else-if="filteredBlogs.length > 0" class="space-y-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="blog in filteredBlogs"
          :key="blog.id"
          class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Article Image -->
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

          <!-- Article Summary -->
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

              <p
                class="text-xs text-gray-500 leading-relaxed line-clamp-3 font-medium"
              >
                {{ blog.excerpt }}
              </p>
            </div>

            <div class="pt-2">
              <NuxtLink
                :to="`/blog/${blog.id}`"
                class="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-700 hover:underline group/btn transition-all"
              >
                Baca Selengkapnya
                <Icon
                  name="heroicons:arrow-right"
                  class="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
                />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div
        v-if="currentPage < blogStore.meta.last_page"
        class="pt-4 text-center"
      >
        <button
          @click="loadMore"
          :disabled="loadMoreLoading"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loadMoreLoading" class="flex items-center gap-2">
            <svg
              class="animate-spin h-4 w-4 text-blue-900"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Memuat...
          </span>
          <span v-else>Tampilkan Lebih Banyak</span>
          <Icon
            v-if="!loadMoreLoading"
            name="heroicons:chevron-down"
            class="w-4 h-4"
          />
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-white border border-gray-100 rounded-2xl py-20 px-4 text-center space-y-4 shadow-2xs"
    >
      <div
        class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-blue-900 mx-auto"
      >
        <Icon name="heroicons:document-text" class="w-9 h-9" />
      </div>
      <div class="max-w-md mx-auto space-y-1">
        <h3 class="text-lg font-extrabold text-gray-900">
          Artikel Tidak Ditemukan
        </h3>
        <p class="text-sm text-gray-500 font-medium">
          Maaf, tidak ada artikel yang cocok dengan kata kunci atau kategori
          yang Anda pilih.
        </p>
      </div>
      <button
        @click="resetFilters"
        class="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        Atur Ulang Pencarian
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useBlogStore } from "~/store/blogStore";

const blogStore = useBlogStore();

const blogCategories = ["Semua", "Tips & Trik", "Berita", "Ulasan", "Promo"];

// Filter & Pagination States
const activeCategory = ref("Semua");
const searchQuery = ref("");
const currentPage = ref(1);
const loadMoreLoading = ref(false);

const fetchBlogsFromApi = async (page = 1, append = false) => {
  if (append) {
    loadMoreLoading.value = true;
  }

  const params: any = {
    page,
    per_page: 9,
    search: searchQuery.value || undefined,
  };

  if (activeCategory.value !== "Semua") {
    let catParam = activeCategory.value;
    if (catParam === "Tips & Trik") catParam = "Tips";
    params.category = catParam;
  }

  try {
    await blogStore.fetchBlogs(params, append);
    currentPage.value = page;
  } catch (error) {
    console.error("Gagal mengambil blog:", error);
  } finally {
    loadMoreLoading.value = false;
  }
};

onMounted(() => {
  fetchBlogsFromApi(1, false);
});

// Watch category changes - resets pagination to page 1
watch(activeCategory, () => {
  fetchBlogsFromApi(1, false);
});

// Watch search text changes - debounced at 400ms to avoid API spam, resets pagination to page 1
watchDebounced(
  searchQuery,
  () => {
    fetchBlogsFromApi(1, false);
  },
  { debounce: 400 },
);

const loadMore = async () => {
  if (currentPage.value < blogStore.meta.last_page) {
    await fetchBlogsFromApi(currentPage.value + 1, true);
  }
};

const resetFilters = () => {
  activeCategory.value = "Semua";
  searchQuery.value = "";
  fetchBlogsFromApi(1, false);
};

const filteredBlogs = computed(() => blogStore.blogs);
</script>
