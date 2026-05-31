<template>
  <footer class="bg-gray-100/70 border-t border-gray-200 py-16 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
      >
        <!-- Column 1: Brand -->
        <div class="space-y-4">
          <NuxtLink to="/" class="flex items-center">
            <NuxtImg
              src="/img/sentra-oto-logo.png"
              alt="SentraOto"
              class="h-20 w-auto rounded-full"
            />
          </NuxtLink>
          <p class="text-sm text-gray-500 leading-relaxed max-w-xs">
            Nikmati pengalaman berkendara yang nyaman dengan pilihan kendaraan
            berkualitas. Setiap unit kami hadir dengan standar terbaik untuk
            memberikan rasa aman dan kepuasan bagi Anda.
          </p>
          <p class="text-xs text-gray-400 font-medium">
            © {{ new Date().getFullYear() }} Sentraoto All Rights Reserved.
          </p>
        </div>

        <!-- Column 2: Jelajahi -->
        <div>
          <h4
            class="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5"
          >
            Jelajahi
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/katalog"
                class="text-sm text-gray-600 hover:text-blue-900 hover:underline transition-all"
                >Katalog Lengkap</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/tentang#konsultasi"
                class="text-sm text-gray-600 hover:text-blue-900 hover:underline transition-all"
                >Konsultasi</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/blog"
                class="text-sm text-gray-600 hover:text-blue-900 hover:underline transition-all"
                >Koleksi Berita & Tips</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Column 3: Dukungan -->
        <div>
          <h4
            class="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5"
          >
            Dukungan
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/kebijakan-privasi"
                class="text-sm text-gray-600 hover:text-blue-900 hover:underline transition-all"
                >Kebijakan Privasi</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/syarat-ketentuan"
                class="text-sm text-gray-600 hover:text-blue-900 hover:underline transition-all"
                >Ketentuan Layanan</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-sm text-gray-600 hover:text-blue-900 hover:underline transition-all"
                >FAQ / Bantuan</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Column 4: Hubungi Kami / Socials -->
        <div class="space-y-5">
          <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wider">
            Hubungi Kami
          </h4>
          <div class="space-y-3">
            <a
              :href="`mailto:${settingsStore.contactEmail}`"
              class="flex items-center gap-2.5 text-sm text-gray-600 hover:text-blue-900 group transition-all"
            >
              <span
                class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-blue-900 transition-colors shadow-xs"
              >
                <Icon name="heroicons:envelope" class="w-4 h-4" />
              </span>
              {{ settingsStore.contactEmail }}
            </a>
            <a
              :href="`tel:${settingsStore.contactPhone.replace(/\s+/g, '')}`"
              class="flex items-center gap-2.5 text-sm text-gray-600 hover:text-blue-900 group transition-all"
            >
              <span
                class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-blue-900 transition-colors shadow-xs"
              >
                <Icon name="heroicons:phone" class="w-4 h-4" />
              </span>
              {{ settingsStore.contactPhone }}
            </a>
          </div>

          <!-- Social media icons -->
          <div class="pt-2 flex items-center gap-3">
            <a
              v-if="settingsStore.socials.instagram"
              :href="settingsStore.socials.instagram"
              target="_blank"
              class="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-900 hover:border-blue-300 transition-all hover:-translate-y-0.5 shadow-xs"
              title="Instagram"
            >
              <Icon name="mdi:instagram" class="w-5 h-5" />
            </a>
            <a
              v-if="settingsStore.socials.facebook"
              :href="settingsStore.socials.facebook"
              target="_blank"
              class="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-900 hover:border-blue-300 transition-all hover:-translate-y-0.5 shadow-xs"
              title="Facebook"
            >
              <Icon name="mdi:facebook" class="w-5 h-5" />
            </a>
            <a
              v-if="settingsStore.socials.youtube"
              :href="settingsStore.socials.youtube"
              target="_blank"
              class="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-900 hover:border-blue-300 transition-all hover:-translate-y-0.5 shadow-xs"
              title="Youtube"
            >
              <Icon name="mdi:youtube" class="w-5 h-5" />
            </a>
            <a
              v-if="settingsStore.socials.linkedin"
              :href="settingsStore.socials.linkedin"
              target="_blank"
              class="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-900 hover:border-blue-300 transition-all hover:-translate-y-0.5 shadow-xs"
              title="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSettingsStore } from "~/store/settingsStore";
const settingsStore = useSettingsStore();
</script>
