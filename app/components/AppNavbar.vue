<template>
  <header
    class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <NuxtImg src="/img/sentra-oto-logo.png" alt="SentraOto" class="h-10 w-auto" />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8 lg:space-x-12">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative text-sm font-semibold tracking-wide py-2 transition-colors duration-200"
            :class="
              isActive(link.path)
                ? 'text-blue-900'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            {{ link.name }}
            <!-- Active Underline Indicator -->
            <span
              v-if="isActive(link.path)"
              class="absolute bottom-0 left-0 right-0 h-[2.5px] bg-orange-500 rounded-full"
            ></span>
          </NuxtLink>
        </nav>

        <!-- Desktop Action Buttons -->
        <div class="hidden md:flex items-center gap-5">
          <NuxtLink
            to="/katalog"
            class="text-gray-500 hover:text-gray-900 p-1.5 hover:bg-gray-50 rounded-lg transition-all"
            title="Cari Kendaraan"
          >
            <Icon name="heroicons:magnifying-glass" class="w-5.5 h-5.5" />
          </NuxtLink>
          <button
            @click="openModal()"
            class="text-gray-500 hover:text-gray-900 p-1.5 hover:bg-gray-50 rounded-lg transition-all relative cursor-pointer"
            title="Keranjang Pemesanan"
          >
            <Icon name="heroicons:document-text" class="w-5.5 h-5.5" />
          </button>

          <button
            @click="chatWhatsapp()"
            class="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-bold rounded-xl shadow-md shadow-orange-500/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            Hubungi Kami
          </button>
        </div>

        <!-- Mobile Hamburger Button -->
        <div class="flex items-center md:hidden gap-3">
          <button
            @click="openModal()"
            class="text-gray-500 p-1.5 hover:bg-gray-50 rounded-lg"
          >
            <Icon name="heroicons:document-text" class="w-5.5 h-5.5" />
          </button>
          <button
            @click="isMobileMenuOpen = true"
            class="text-gray-700 p-2 hover:bg-gray-50 rounded-xl transition-all"
            aria-label="Buka Menu"
          >
            <Icon name="heroicons:bars-3" class="w-6.5 h-6.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Slideover Navigation Drawer -->
    <Teleport to="body">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
          @click="isMobileMenuOpen = false"
        ></div>

        <!-- Panel container -->
        <div
          class="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between p-6 transform transition-transform duration-300"
        >
          <div>
            <!-- Header -->
            <div
              class="flex items-center justify-between pb-6 border-b border-gray-100"
            >
              <NuxtLink
                to="/"
                @click="isMobileMenuOpen = false"
                class="flex items-center"
              >
                <NuxtImg src="/img/sentra-oto-logo.png" alt="SentraOto" class="h-9 w-auto" />
              </NuxtLink>
              <button
                @click="isMobileMenuOpen = false"
                class="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full"
                aria-label="Tutup Menu"
              >
                <Icon name="heroicons:x-mark" class="w-6 h-6" />
              </button>
            </div>

            <!-- Links -->
            <div class="flex flex-col gap-2 mt-6">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                @click="isMobileMenuOpen = false"
                class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all"
                :class="
                  isActive(link.path)
                    ? 'bg-gray-100 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                "
              >
                {{ link.name }}
                <Icon
                  v-if="isActive(link.path)"
                  name="heroicons:chevron-right"
                  class="w-4 h-4 text-blue-900"
                />
              </NuxtLink>
            </div>
          </div>

          <!-- Bottom CTA -->
          <div class="pt-6 border-t border-gray-100 space-y-3">
            <button
              @click="handleMobileCta"
              class="w-full py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-center text-sm cursor-pointer"
            >
              Hubungi Kami
            </button>
            <p
              class="text-center text-[10px] text-gray-400 font-semibold tracking-wide"
            >
              © {{ new Date().getFullYear() }} Sentraoto All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePurchaseModal } from "~/composables/usePurchaseModal";

const route = useRoute();
const { openModal } = usePurchaseModal();

const isMobileMenuOpen = ref(false);

const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Katalog", path: "/katalog" },
  { name: "Blog", path: "/blog" },
  { name: "Tentang", path: "/tentang" },
];

// Helper to determine active class based on current route
const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};

const handleMobileCta = () => {
  isMobileMenuOpen.value = false;
  openModal();
};

const chatWhatsapp = () => {
  // window.open("https://wa.me/628123456789?text=Halo Sentraoto", "_blank");
  const textMessage = `Halo Sentraoto, Saya adalah konsumen yang berkeinginan untuk berkonsultasi mengenai pemesanan kendaraan khusus, unit langka, atau konsultasi pembiayaan khusus. Mohon arahannya lebih lanjut. Terima kasih!`;

  const encodedText = encodeURIComponent(textMessage);

  // Custom direct target or owner's placeholder
  const adminPhoneNumber = "6281234567890";
  const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedText}`;

  window.open(whatsappUrl, "_blank");
};
</script>
