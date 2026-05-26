<template>
  <div class="space-y-16 pb-20">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Beranda | AUTOELITE - Dealer Mobil & Motor Premium</Title>
        <Meta
          name="description"
          content="Selamat datang di AUTOELITE. Temukan jajaran mobil dan motor premium terbaik dengan performa tanpa batas dan eksklusivitas murni."
        />
      </Head>
    </Html>

    <!-- Section 1: Hero Carousel + Search Filter Component -->
    <HeroCarousel />

    <!-- Spacing for floating bar -->
    <div class="h-24 sm:h-12"></div>

    <!-- Section 2: Koleksi Terkini -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            Eksplorasi jajaran kendaraan terbaru kami.
          </p>
        </div>
        <NuxtLink
          to="/katalog"
          class="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Lihat Semua Kendaraan
          <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Grid of 8 Vehicles -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        <div
          v-for="vehicle in latestVehicles"
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

      <!-- Blogs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  class="text-base font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VEHICLES, BLOGS } from "~/utils/data";

// Get the first 8 vehicles from database for "Koleksi Terkini"
// 2024 Luxury SUV (id: '2024-luxury-suv') is a prominent showcase in detailed images, we want it and other 7
const latestVehicles = ref(VEHICLES.slice(0, 8));

// Get all 3 blogs for the footer-grid tips section
const latestBlogs = ref(BLOGS);

// Helper for formatting currencies
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

// Return matching colors for vehicle tags
const getTagColorClass = (tag: string) => {
  const norm = tag.toLowerCase();
  if (norm === "baru") return "bg-blue-600";
  if (norm === "elektrik") return "bg-emerald-600";
  if (norm === "promo") return "bg-amber-500";
  return "bg-gray-600";
};
</script>
