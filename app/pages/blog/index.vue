<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Berita & Tips Otomotif | AUTOELITE</Title>
        <Meta
          name="description"
          content="Kumpulan artikel otomotif terbaru, review mobil premium, panduan tips & trik perawatan kendaraan di AUTOELITE."
        />
      </Head>
    </Html>

    <!-- Header Title -->
    <div class="mb-10 text-center max-w-2xl mx-auto space-y-3">
      <div
        class="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest"
      >
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
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
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
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
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder:text-gray-400 font-semibold"
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

    <!-- Articles Grid -->
    <div
      v-if="filteredBlogs.length > 0"
      class="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
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
                class="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
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
              class="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline group/btn transition-all"
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

    <!-- Empty State -->
    <div
      v-else
      class="bg-white border border-gray-100 rounded-2xl py-20 px-4 text-center space-y-4 shadow-2xs"
    >
      <div
        class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mx-auto"
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
        class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        Atur Ulang Pencarian
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { BLOGS } from "~/utils/data";

const blogCategories = ["Semua", "Tips & Trik", "Review", "Mobil Listrik"];

// Filter States
const activeCategory = ref("Semua");
const searchQuery = ref("");

const resetFilters = () => {
  activeCategory.value = "Semua";
  searchQuery.value = "";
};

// Filter blogs lists
const filteredBlogs = computed(() => {
  let result = [...BLOGS];

  // Category filter
  if (activeCategory.value !== "Semua") {
    result = result.filter(
      (blog) =>
        blog.category.toLowerCase() === activeCategory.value.toLowerCase(),
    );
  }

  // Search input filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (blog) =>
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q),
    );
  }

  return result;
});
</script>
