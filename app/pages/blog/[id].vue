<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Safe fallback for missing article -->
    <div v-if="!blog" class="py-20 text-center space-y-4">
      <Html lang="id">
        <Head>
          <Title>Artikel Tidak Ditemukan | AUTOELITE</Title>
        </Head>
      </Html>
      <div
        class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto"
      >
        <Icon name="heroicons:exclamation-triangle" class="w-9 h-9" />
      </div>
      <h2 class="text-xl font-bold text-gray-900">Artikel Tidak Ditemukan</h2>
      <p class="text-sm text-gray-500 max-w-sm mx-auto">
        Maaf, tautan artikel berita atau tips yang Anda kunjungi tidak valid
        atau telah dihapus.
      </p>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        Kembali ke Blog
      </NuxtLink>
    </div>

    <!-- Active Blog Detail content -->
    <div v-else class="space-y-8">
      <!-- SEO Optimization -->
      <Html lang="id">
        <Head>
          <Title>{{ blog.title }} | AUTOELITE</Title>
          <Meta name="description" content="${blog.excerpt}" />
        </Head>
      </Html>

      <!-- Breadcrumbs & Navigation -->
      <div
        class="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest"
      >
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
          >Beranda</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <NuxtLink to="/blog" class="hover:text-blue-600 transition-colors"
          >Blog</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900 font-bold line-clamp-1">{{
          blog.title
        }}</span>
      </div>

      <!-- Main Layout: Sidebar & Main reader -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <!-- Article Reader Column (Takes 2 cols) -->
        <main class="lg:col-span-2 space-y-6">
          <div
            class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xs p-6 sm:p-8 space-y-6"
          >
            <!-- Category & Title -->
            <div class="space-y-4">
              <span
                class="inline-block px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg bg-blue-50 text-blue-600 border border-blue-100"
              >
                {{ blog.category }}
              </span>
              <h1
                class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase"
              >
                {{ blog.title }}
              </h1>

              <!-- Meta info row -->
              <div
                class="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 border-b border-gray-100 pb-5"
              >
                <span class="flex items-center gap-1.5">
                  <Icon
                    name="heroicons:user-circle"
                    class="w-4 h-4 text-gray-400"
                  />
                  {{ blog.author }}
                </span>
                <span>•</span>
                <span class="flex items-center gap-1.5">
                  <Icon
                    name="heroicons:calendar"
                    class="w-4 h-4 text-gray-400"
                  />
                  {{ blog.date }}
                </span>
                <span>•</span>
                <span class="flex items-center gap-1.5">
                  <Icon name="heroicons:clock" class="w-4 h-4 text-gray-400" />
                  {{ blog.readTime }}
                </span>
              </div>
            </div>

            <!-- Big Cover Picture -->
            <div
              class="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xs border border-gray-100"
            >
              <img
                :src="blog.image"
                :alt="blog.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Paragraph Contents -->
            <div
              class="text-sm sm:text-base text-gray-600 leading-relaxed font-medium space-y-5"
            >
              <p v-for="(paragraph, index) in blog.content" :key="index">
                {{ paragraph }}
              </p>
            </div>

            <!-- CTA Share / Back row -->
            <div
              class="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <NuxtLink
                to="/blog"
                class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors py-2 px-4 hover:bg-slate-50 rounded-xl"
              >
                <Icon name="heroicons:arrow-long-left" class="w-4 h-4" />
                Kembali ke Daftar Blog
              </NuxtLink>

              <div class="flex items-center gap-2">
                <span
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1"
                  >Bagikan:</span
                >
                <button
                  class="w-8 h-8 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center"
                  title="Salin Tautan"
                >
                  <Icon name="heroicons:link" class="w-4 h-4" />
                </button>
                <button
                  class="w-8 h-8 rounded-lg bg-gray-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors flex items-center justify-center"
                  title="Bagikan ke WhatsApp"
                >
                  <Icon name="mdi:whatsapp" class="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        <!-- Sidebar Related Articles Column (Takes 1 col) -->
        <aside class="space-y-6">
          <div
            class="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-5"
          >
            <h3
              class="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3"
            >
              <Icon
                name="heroicons:document-duplicate"
                class="w-5 h-5 text-blue-600"
              />
              Artikel Terkait
            </h3>

            <div class="space-y-4">
              <div
                v-for="related in relatedBlogs"
                :key="related.id"
                class="group flex gap-3 items-center border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
              >
                <!-- Thumbnail image -->
                <NuxtLink
                  :to="`/blog/${related.id}`"
                  class="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 shadow-3xs border border-gray-100"
                >
                  <img
                    :src="related.image"
                    :alt="related.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </NuxtLink>

                <!-- Titles and date info -->
                <div class="space-y-1">
                  <span
                    class="text-[9px] font-bold text-blue-600 uppercase tracking-wider"
                    >{{ related.category }}</span
                  >
                  <NuxtLink :to="`/blog/${related.id}`" class="block">
                    <h4
                      class="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
                    >
                      {{ related.title }}
                    </h4>
                  </NuxtLink>
                  <span class="block text-[10px] text-gray-400">{{
                    related.date
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { BLOGS } from "~/utils/data";

const route = useRoute();

// Query DB using current parameter string
const blog = computed(() => {
  const blogId = route.params.id as string;
  return BLOGS.find((b) => b.id === blogId) || null;
});

// Compile related articles list (omit current active article)
const relatedBlogs = computed(() => {
  if (!blog.value) return [];
  return BLOGS.filter((b) => b.id !== blog.value?.id).slice(0, 3);
});
</script>
