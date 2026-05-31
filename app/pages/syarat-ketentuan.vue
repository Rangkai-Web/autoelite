<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Ketentuan Layanan | Sentraoto</Title>
        <Meta
          name="description"
          content="Syarat dan Ketentuan Layanan Sentraoto. Harap baca dengan seksama sebelum melakukan pemesanan kendaraan kami."
        />
      </Head>
    </Html>

    <!-- Header -->
    <div class="border-b border-gray-100 pb-6 space-y-2">
      <h1
        class="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight"
      >
        Ketentuan <span class="text-blue-900">Layanan</span>
      </h1>
      <p class="text-sm text-gray-400 font-medium">
        Terakhir diperbarui: 26 Mei 2026
      </p>
    </div>

    <!-- Content -->
    <div
      class="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6 text-sm sm:text-base terms-rich-content"
      v-html="settingsStore.termsConditions"
    ></div>

    <!-- Back button -->
    <div class="pt-6 border-t border-gray-100">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-800 transition-colors"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "~/store/settingsStore";
const settingsStore = useSettingsStore();
</script>

<style scoped>
.terms-rich-content :deep(p) {
  margin-bottom: 1.2rem;
}
.terms-rich-content :deep(h3) {
  font-size: 1.25rem !important;
  font-weight: 800 !important;
  color: #1f2937 !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.75rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.025em !important;
}
.terms-rich-content :deep(ul) {
  list-style-type: disc !important;
  margin-left: 1.5rem !important;
  margin-bottom: 1.2rem !important;
  padding-left: 0.5rem !important;
}
.terms-rich-content :deep(li) {
  margin-bottom: 0.5rem !important;
  line-height: 1.6 !important;
  display: list-item !important;
}
.terms-rich-content :deep(strong) {
  font-weight: 800;
  color: #111827;
}
</style>
