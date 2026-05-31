<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>FAQ / Tanya Jawab | Sentraoto</Title>
        <Meta
          name="description"
          content="Pertanyaan yang Sering Diajukan (FAQ) seputar pemesanan kendaraan, pembiayaan, dan layanan VIP di Sentraoto."
        />
      </Head>
    </Html>

    <!-- Header -->
    <div class="border-b border-gray-100 pb-6 space-y-2">
      <h1
        class="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight"
      >
        Tanya <span class="text-blue-900">Jawab</span> (FAQ)
      </h1>
      <p class="text-sm text-gray-400 font-medium">
        Temukan jawaban cepat atas pertanyaan seputar pemesanan, pengiriman, dan
        layanan VIP kami.
      </p>
    </div>

    <!-- Loading State (Pulse Skeleton Loader) -->
    <div v-if="faqStore.loading" class="space-y-4 animate-pulse">
      <div
        v-for="i in 4"
        :key="i"
        class="bg-white border border-gray-100 rounded-2xl p-5 space-y-3"
      >
        <div class="h-5 bg-gray-100 rounded-md w-2/3"></div>
        <div class="h-4 bg-gray-100 rounded-md w-1/3"></div>
      </div>
    </div>

    <!-- Accordion Grid -->
    <div v-else class="space-y-4">
      <details
        v-for="(faq, index) in faqStore.faqs"
        :key="faq.id"
        class="group bg-white border border-gray-100 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-xs hover:shadow-md transition-all"
        :open="index === 0"
      >
        <summary
          class="flex items-center justify-between gap-4 font-bold text-gray-900 text-base sm:text-lg"
        >
          <span>{{ faq.question }}</span>
          <span
            class="shrink-0 transition-transform duration-300 group-open:rotate-180 text-blue-900"
          >
            <Icon name="heroicons:chevron-down" class="w-5 h-5" />
          </span>
        </summary>
        <div
          class="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-4"
        >
          <span v-html="faq.answer"></span>
        </div>
      </details>
    </div>

    <!-- Back button -->
    <div class="pt-6 border-t border-gray-100">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFaqStore } from "~/store/faqStore";

const faqStore = useFaqStore();

onMounted(() => {
  faqStore.fetchFaqs();
});
</script>
