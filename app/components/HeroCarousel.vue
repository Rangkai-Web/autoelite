<template>
  <section
    class="relative h-56 sm:h-[580px] lg:h-[700px] flex items-center justify-center bg-gray-950 select-none"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Background Slides (Crossfade Transition) -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img
          :src="slide.image"
          :alt="slide.line1"
          class="w-full h-56 sm:h-full object-contain sm:object-cover object-center scale-105 transition-transform duration-6000"
          :class="activeIndex === index ? 'scale-100' : 'scale-105'"
        />
        <!-- Dark Overlays -->
        <div
          class="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent"
        ></div>
        <div
          class="absolute inset-0 bg-linear-to-r from-gray-950/80 via-transparent to-gray-950/20"
        ></div>
      </div>
    </div>

    <!-- Active Text Slides Content (Takes dynamic animated class) -->
    <div class="hidden sm:block">
      <div
        class="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left h-full flex items-center pb-20 sm:pb-12"
      >
        <div class="max-w-2xl space-y-5">
          <div
            v-if="currentSlide"
            :key="activeIndex"
            class="space-y-4 animate-fade-slide-up"
          >
            <!-- Category Tag -->
            <p
              class="text-xs lg:text-sm font-black tracking-widest text-orange-400 uppercase"
            >
              {{ currentSlide.tag }}
            </p>

            <!-- Large Heading -->
            <h1
              class="text-2xl sm:text-4xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight"
            >
              {{ currentSlide.line1 }}<br />
              <span class="text-orange-500">{{ currentSlide.line2 }}</span
              ><br />
              <span class="text-white">{{ currentSlide.line3 }}</span>
            </h1>

            <!-- Slogan & Narrative description -->
            <p
              class="text-xs sm:text-sm lg:text-base text-gray-300 font-medium leading-relaxed max-w-lg"
            >
              {{ currentSlide.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carousel Controls: Left / Right Arrows (Hidden on Mobile) -->
    <div
      class="hidden sm:flex absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 justify-between pointer-events-none"
    >
      <button
        @click="prevSlide"
        class="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
        aria-label="Slide Sebelumnya"
      >
        <Icon name="heroicons:chevron-left" class="w-6 h-6" />
      </button>
      <button
        @click="nextSlide"
        class="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
        aria-label="Slide Selanjutnya"
      >
        <Icon name="heroicons:chevron-right" class="w-6 h-6" />
      </button>
    </div>

    <!-- Slide Indicators / Dots (Bottom Center) -->
    <div class="absolute bottom-4 sm:bottom-20 z-30 flex justify-center gap-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="h-2 rounded-full transition-all duration-300 cursor-pointer"
        :class="
          activeIndex === index
            ? 'w-8 bg-orange-500'
            : 'w-2 bg-white/40 hover:bg-white/70'
        "
        :aria-label="`Pergi ke slide ${index + 1}`"
      ></button>
    </div>

    <!-- Floating Search Bar (Centered Overlap at the bottom boundary) -->
    <div
      class="absolute bottom-0 left-0 right-0 top-60 sm:top-auto transform translate-y-1/2 z-30 px-4"
    >
      <div
        class="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl shadow-black/10 border border-white/60 p-4 sm:p-5"
      >
        <form
          @submit.prevent="handleSearch"
          class="flex flex-col sm:flex-row gap-3 items-stretch"
        >
          <!-- Search Text input -->
          <div class="flex-1 relative flex items-center">
            <span class="absolute left-4 text-gray-400">
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mt-1.5" />
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari mobil atau motor..."
              class="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-gray-200/80 rounded-xl sm:rounded-2xl text-sm focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900 placeholder:text-gray-400 font-semibold"
            />
          </div>

          <!-- Type Selector input -->
          <div class="w-full sm:w-72 relative flex items-center">
            <span class="absolute left-4 text-gray-400 pointer-events-none">
              <Icon name="heroicons:tag" class="w-5 h-5 mt-1.5" />
            </span>
            <select
              v-model="selectedType"
              class="w-full pl-11 pr-10 py-3.5 bg-white/50 border border-gray-200/80 rounded-xl sm:rounded-2xl text-sm focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900 font-semibold appearance-none"
            >
              <option value="">Pilihan Kategori Kendaraan</option>
              <option
                v-for="cat in categoryStore.categories"
                :key="cat.id"
                :value="cat.name"
              >
                {{ cat.name }}
              </option>
            </select>
            <span class="absolute right-4 text-gray-400 pointer-events-none">
              <Icon name="heroicons:chevron-down" class="w-4 h-4" />
            </span>
          </div>

          <!-- Submit Action Button -->
          <button
            type="submit"
            class="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-bold rounded-xl sm:rounded-2xl shadow-md shadow-orange-500/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Cari
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "~/store/categoryStore";
import { useVehicleStore } from "~/store/vehicleStore";
import { useApi } from "~/services/api";

const router = useRouter();
const categoryStore = useCategoryStore();
const vehicleStore = useVehicleStore();

const slides = ref<any[]>([]);
const currentSlide = computed(() => slides.value[activeIndex.value] || null);

const searchQuery = ref(vehicleStore.homeSearchQuery);
const selectedType = ref(vehicleStore.homeSelectedCategory);

// Fetch slides from API
const fetchSlides = async () => {
  try {
    const api = useApi();
    const res = await api.getHeroSlides();
    if (res && res.data) {
      slides.value = res.data;
    }
  } catch (error) {
    console.error("Gagal mengambil hero slides:", error);
    // Fallback to static slides in case of network issue
    slides.value = [
      {
        tag: "Exclusive Showroom",
        line1: "Pilihan Menarik.",
        line2: "Performa Maksimal.",
        line3: "Nyaman di Setiap Perjalanan.",
        image:
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200",
        description:
          "Temukan koleksi mobil pilihan dengan kualitas terbaik, desain elegan, dan performa yang siap menemani setiap perjalanan Anda.",
      },
      {
        tag: "Luxury Collection",
        line1: "Desain Elegan.",
        line2: "Kabin Lebih Nyaman.",
        line3: "Pengalaman Berkendara Berkelas.",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200",
        description:
          "Nikmati kenyamanan berkendara dengan interior modern, fitur canggih, dan design terbaik yang membuat setiap perjalanan terasa lebih istimewa.",
      },
      {
        tag: "Future Mobility",
        line1: "Teknologi Modern.",
        line2: "Akselerasi Responsif.",
        line3: "Lebih Efisien untuk Masa Depan.",
        image:
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200",
        description:
          "Hadir dengan teknologi kendaraan listrik yang efisien, nyaman digunakan sehari-hari, dan tetap menghadirkan performa yang menyenangkan.",
      },
    ];
  }
};

watch(
  () => vehicleStore.homeSearchQuery,
  (newVal) => {
    searchQuery.value = newVal;
  },
);
watch(
  () => vehicleStore.homeSelectedCategory,
  (newVal) => {
    selectedType.value = newVal;
  },
);

const activeIndex = ref(0);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  if (slides.value.length === 0) return;
  activeIndex.value = (activeIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
  if (slides.value.length === 0) return;
  activeIndex.value =
    (activeIndex.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index: number) => {
  activeIndex.value = index;
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

onMounted(() => {
  categoryStore.fetchCategories();
  fetchSlides();
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});

const handleSearch = () => {
  vehicleStore.homeSearchQuery = searchQuery.value;
  vehicleStore.homeSelectedCategory = selectedType.value;

  const el = document.getElementById("koleksi-terkini");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
@keyframes fade-slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide-up {
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
