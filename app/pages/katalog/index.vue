<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Katalog Kendaraan | Sentraoto - Showroom Mobil Premium</Title>
        <Meta
          name="description"
          content="Temukan katalog lengkap mobil di Sentraoto. Saring berdasarkan kategori, merek, dan rentang harga terbaik."
        />
      </Head>
    </Html>

    <!-- Page Title Header -->
    <div class="mb-10">
      <div
        class="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2"
      >
        <NuxtLink to="/" class="hover:text-blue-900 transition-colors"
          >Beranda</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900 font-bold">Katalog</span>
      </div>
      <h1
        class="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase"
      >
        Katalog Kendaraan Kami
      </h1>
      <p class="text-sm text-gray-500 font-medium mt-1">
        Jelajahi koleksi terlengkap kendaraan kami.
      </p>
    </div>

    <!-- Tab Pemilihan Kendaraan -->
    <div
      class="flex justify-center sm:justify-start gap-2 bg-gray-100 p-1 rounded-2xl w-fit mb-10 shadow-inner border border-blue-900"
    >
      <button
        @click="changeVehicleType('mobil')"
        class="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer"
        :class="
          activeVehicleType === 'mobil'
            ? 'bg-blue-900 text-white shadow-md'
            : 'text-gray-500 hover:text-gray-900'
        "
      >
        <Icon name="mdi:car" class="w-5 h-5" />
        Mobil
      </button>
      <button
        @click="changeVehicleType('motor')"
        class="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer"
        :class="
          activeVehicleType === 'motor'
            ? 'bg-blue-900 text-white shadow-md'
            : 'text-gray-500 hover:text-gray-900'
        "
      >
        <Icon name="mdi:motorbike" class="w-5 h-5" />
        Motor
      </button>
    </div>

    <!-- Main Content Area (Layout Grid) -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <!-- Sidebar Filters: Desktop (hidden on lg, visible as sidebar on desktop) -->
      <aside
        class="hidden lg:block lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6"
      >
        <div
          class="flex items-center justify-between border-b border-gray-100 pb-4"
        >
          <span
            class="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2"
          >
            <Icon
              name="heroicons:adjustments-horizontal"
              class="w-5 h-5 text-blue-900"
            />
            Filter
          </span>
          <button
            @click="resetFilters"
            class="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Icon name="heroicons:arrow-path" class="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <!-- Filter Category -->
        <div class="space-y-3">
          <h4
            class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
          >
            Kategori
          </h4>
          <!-- Loading State -->
          <div v-if="categoryStore.loading" class="space-y-2 py-1">
            <div class="h-4 bg-gray-100 rounded-md w-3/4 animate-pulse"></div>
            <div class="h-4 bg-gray-100 rounded-md w-1/2 animate-pulse"></div>
          </div>
          <!-- Empty State -->
          <div
            v-else-if="categories.length === 0"
            class="text-xs text-gray-400 italic py-1"
          >
            Kategori tidak tersedia
          </div>
          <!-- Content List -->
          <div v-else class="space-y-2">
            <label
              v-for="cat in categories"
              :key="cat"
              class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer select-none"
            >
              <div class="relative flex items-center justify-center shrink-0">
                <input
                  v-model="filters.selectedTypes"
                  type="checkbox"
                  :value="cat"
                  class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-900 checked:border-blue-900 focus:ring-1 focus:ring-blue-900 cursor-pointer transition-all"
                />
                <Icon
                  name="heroicons:check-20-solid"
                  class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              {{ cat }}
            </label>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- Filter Brands -->
        <div class="space-y-3">
          <h4
            class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
          >
            Merek
          </h4>
          <!-- Loading State -->
          <div v-if="brandStore.loading" class="space-y-2 py-1">
            <div class="h-4 bg-gray-100 rounded-md w-3/4 animate-pulse"></div>
            <div class="h-4 bg-gray-100 rounded-md w-1/2 animate-pulse"></div>
          </div>
          <!-- Empty State -->
          <div
            v-else-if="brands.length === 0"
            class="text-xs text-gray-400 italic py-1"
          >
            Merek tidak tersedia
          </div>
          <!-- Content List -->
          <div v-else class="space-y-2 max-h-48 overflow-y-auto pr-1">
            <label
              v-for="brand in brands"
              :key="brand"
              class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer select-none"
            >
              <div class="relative flex items-center justify-center shrink-0">
                <input
                  v-model="filters.selectedBrands"
                  type="checkbox"
                  :value="brand"
                  class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-900 checked:border-blue-900 focus:ring-1 focus:ring-blue-900 cursor-pointer transition-all"
                />
                <Icon
                  name="heroicons:check-20-solid"
                  class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              {{ brand }}
            </label>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- Filter Prices -->
        <div class="space-y-3">
          <h4
            class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
          >
            Rentang Harga (Rp)
          </h4>
          <div class="space-y-3">
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                >Min</label
              >
              <input
                v-model.number="filters.minPrice"
                type="number"
                min="0"
                @keypress="preventNegative"
                placeholder="Contoh: 500000000"
                class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900"
              />
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                >Max</label
              >
              <input
                v-model.number="filters.maxPrice"
                type="number"
                min="0"
                @keypress="preventNegative"
                placeholder="Contoh: 4000000000"
                class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900"
              />
            </div>
            <p
              v-if="
                filters.minPrice !== null &&
                filters.maxPrice !== null &&
                filters.minPrice > filters.maxPrice
              "
              class="text-[10px] text-red-500 font-bold leading-normal mt-1 animate-pulse"
            >
              Harga minimum melebihi maksimum.
            </p>
          </div>
        </div>
      </aside>

      <!-- Main Product Grid Section -->
      <section class="lg:col-span-3 space-y-6">
        <!-- Controls Bar -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs"
        >
          <!-- Search input embedded -->
          <div class="relative flex items-center flex-1 max-w-md">
            <span class="absolute left-3.5 text-gray-400">
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4" />
            </span>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Cari katalog..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900 placeholder:text-gray-400 font-semibold"
            />
            <button
              v-if="filters.search"
              @click="filters.search = ''"
              class="absolute right-3.5 text-gray-400 hover:text-gray-600"
            >
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </div>

          <!-- Right Sorting -->
          <div class="flex items-center gap-3 justify-between sm:justify-end">
            <!-- Mobile Toggle Filter button -->
            <button
              @click="isMobileFilterOpen = true"
              class="lg:hidden flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <Icon
                name="heroicons:adjustments-horizontal"
                class="w-4 h-4 text-blue-900"
              />
              Saring
            </button>

            <!-- Sorting selector -->
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline"
                >Urutkan:</span
              >
              <select
                v-model="sortBy"
                class="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none bg-white text-gray-900"
              >
                <option value="terbaru">Terbaru</option>
                <option value="harga-rendah">Harga Terendah</option>
                <option value="harga-tinggi">Harga Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filters Bar -->
        <div
          v-if="hasActiveFilters"
          class="flex flex-wrap gap-2 items-center bg-gray-100/40 border border-gray-200/50 p-3.5 rounded-2xl"
        >
          <span
            class="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mr-1.5"
            >Filter Aktif:</span
          >

          <!-- Search Badge -->
          <span
            v-if="filters.search"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            Cari: "{{ filters.search }}"
            <button
              @click="filters.search = ''"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Type Badges -->
          <span
            v-for="type in filters.selectedTypes"
            :key="type"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            {{ type }}
            <button
              @click="removeTypeFilter(type)"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Brand Badges -->
          <span
            v-for="brand in filters.selectedBrands"
            :key="brand"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            {{ brand }}
            <button
              @click="removeBrandFilter(brand)"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Min Price Badge -->
          <span
            v-if="filters.minPrice"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            Min: Rp {{ formatRupiah(filters.minPrice) }}
            <button
              @click="filters.minPrice = null"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>

          <!-- Max Price Badge -->
          <span
            v-if="filters.maxPrice"
            class="inline-flex items-center gap-1 bg-white border border-gray-100 text-xs font-bold px-3 py-1 rounded-xl text-gray-700 shadow-2xs"
          >
            Max: Rp {{ formatRupiah(filters.maxPrice) }}
            <button
              @click="filters.maxPrice = null"
              class="text-gray-400 hover:text-gray-600 ml-0.5"
            >
              <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
            </button>
          </span>
        </div>

        <!-- Loading State (Pulse Skeleton Loader) -->
        <div
          v-if="vehicleStore.loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="i in 6"
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
          v-else-if="paginatedVehicles.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="vehicle in paginatedVehicles"
            :key="vehicle.id"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <!-- Image Frame -->
            <NuxtLink
              :to="`/katalog/${vehicle.id}`"
              class="relative block overflow-hidden aspect-video bg-gray-100"
            >
              <img
                :src="vehicle.image"
                :alt="vehicle.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <!-- Fuel Type Badge (Only visible on hover, fades in) -->
              <div
                class="absolute top-3 left-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span
                  class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg text-white shadow-sm"
                  :class="getFuelColorClass(vehicle.fuel)"
                >
                  {{ vehicle.fuel }}
                </span>
              </div>
            </NuxtLink>

            <!-- Card Body -->
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
                  <Icon
                    name="heroicons:calendar"
                    class="w-4 h-4 text-gray-400"
                  />
                  <span>Tahun {{ vehicle.year }}</span>
                </div>
              </div>

              <!-- Vehicle Tags -->
              <div
                v-if="vehicle.tags && vehicle.tags.length > 0"
                class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100/50"
              >
                <span
                  v-for="tag in vehicle.tags"
                  :key="tag"
                  class="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-gray-50 text-gray-500 border border-gray-200/50"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
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
            <Icon name="heroicons:information-circle" class="w-9 h-9" />
          </div>
          <div class="max-w-md mx-auto space-y-1">
            <h3 class="text-lg font-extrabold text-gray-900">
              Kendaraan Tidak Ditemukan
            </h3>
            <p class="text-sm text-gray-500 font-medium">
              Tidak ada kendaraan yang cocok dengan filter atau kata kunci Anda
              saat ini. Silakan atur ulang pencarian.
            </p>
          </div>
          <!-- <button
            @click="resetFilters"
            class="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Atur Ulang Semua Filter
          </button> -->
        </div>

        <!-- Pagination (Static representation matching mockups) -->
        <div
          v-if="filteredVehicles.length > 0"
          class="pt-6 flex justify-center items-center gap-1.5"
        >
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="w-10 h-10 border rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
            :class="
              currentPage === page
                ? 'bg-blue-900 border-blue-900 text-white'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            "
          >
            {{ page }}
          </button>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>

    <!-- Mobile Filter Slideover Overlay -->
    <Teleport to="body">
      <div
        v-if="isMobileFilterOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/55 backdrop-blur-xs"
          @click="isMobileFilterOpen = false"
        ></div>
        <div
          class="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300"
        >
          <!-- Drawer Header -->
          <div
            class="px-5 py-4 border-b border-gray-100 flex items-center justify-between"
          >
            <span
              class="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Icon
                name="heroicons:adjustments-horizontal"
                class="w-5 h-5 text-blue-900"
              />
              Saring Kendaraan
            </span>
            <button
              @click="isMobileFilterOpen = false"
              class="text-gray-400 p-1 hover:bg-gray-100 rounded-full"
            >
              <Icon name="heroicons:x-mark" class="w-5.5 h-5.5" />
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-6">
            <!-- Filter Category -->
            <div class="space-y-3">
              <h4
                class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
              >
                Kategori
              </h4>
              <!-- Loading State -->
              <div v-if="categoryStore.loading" class="space-y-2 py-1">
                <div
                  class="h-4 bg-gray-100 rounded-md w-3/4 animate-pulse"
                ></div>
                <div
                  class="h-4 bg-gray-100 rounded-md w-1/2 animate-pulse"
                ></div>
              </div>
              <!-- Empty State -->
              <div
                v-else-if="categories.length === 0"
                class="text-xs text-gray-400 italic py-1"
              >
                Kategori tidak tersedia
              </div>
              <!-- Content List -->
              <div v-else class="space-y-2">
                <label
                  v-for="cat in categories"
                  :key="cat"
                  class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  <div
                    class="relative flex items-center justify-center shrink-0"
                  >
                    <input
                      v-model="filters.selectedTypes"
                      type="checkbox"
                      :value="cat"
                      class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-900 checked:border-blue-900 focus:ring-1 focus:ring-blue-900 cursor-pointer transition-all"
                    />
                    <Icon
                      name="heroicons:check-20-solid"
                      class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    />
                  </div>
                  {{ cat }}
                </label>
              </div>
            </div>

            <hr class="border-gray-100" />

            <!-- Filter Brands -->
            <div class="space-y-3">
              <h4
                class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
              >
                Merek
              </h4>
              <!-- Loading State -->
              <div v-if="brandStore.loading" class="space-y-2 py-1">
                <div
                  class="h-4 bg-gray-100 rounded-md w-3/4 animate-pulse"
                ></div>
                <div
                  class="h-4 bg-gray-100 rounded-md w-1/2 animate-pulse"
                ></div>
              </div>
              <!-- Empty State -->
              <div
                v-else-if="brands.length === 0"
                class="text-xs text-gray-400 italic py-1"
              >
                Merek tidak tersedia
              </div>
              <!-- Content List -->
              <div v-else class="space-y-2">
                <label
                  v-for="brand in brands"
                  :key="brand"
                  class="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  <div
                    class="relative flex items-center justify-center shrink-0"
                  >
                    <input
                      v-model="filters.selectedBrands"
                      type="checkbox"
                      :value="brand"
                      class="peer w-4.5 h-4.5 appearance-none bg-white border border-gray-300 rounded-md checked:bg-blue-900 checked:border-blue-900 focus:ring-1 focus:ring-blue-900 cursor-pointer transition-all"
                    />
                    <Icon
                      name="heroicons:check-20-solid"
                      class="absolute pointer-events-none w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    />
                  </div>
                  {{ brand }}
                </label>
              </div>
            </div>

            <hr class="border-gray-100" />

            <!-- Filter Prices -->
            <div class="space-y-3">
              <h4
                class="text-xs font-extrabold uppercase tracking-wider text-gray-400"
              >
                Rentang Harga (Rp)
              </h4>
              <div class="space-y-3">
                <div>
                  <label
                    class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                    >Min</label
                  >
                  <input
                    v-model.number="filters.minPrice"
                    type="number"
                    min="0"
                    @keypress="preventNegative"
                    placeholder="Contoh: 500000000"
                    class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label
                    class="block text-[10px] font-bold text-gray-500 uppercase mb-1"
                    >Max</label
                  >
                  <input
                    v-model.number="filters.maxPrice"
                    type="number"
                    min="0"
                    @keypress="preventNegative"
                    placeholder="Contoh: 4000000000"
                    class="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900"
                  />
                </div>
                <p
                  v-if="
                    filters.minPrice !== null &&
                    filters.maxPrice !== null &&
                    filters.minPrice > filters.maxPrice
                  "
                  class="text-[10px] text-red-500 font-bold leading-normal mt-1 animate-pulse"
                >
                  Harga minimum melebihi maksimum.
                </p>
              </div>
            </div>
          </div>

          <!-- Drawer Footer Cta -->
          <div class="p-5 border-t border-gray-100 space-y-2">
            <button
              @click="isMobileFilterOpen = false"
              class="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-md text-center cursor-pointer"
            >
              Tampilkan Hasil ({{ filteredVehicles.length }} kendaraan)
            </button>
            <button
              @click="resetFilters"
              class="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold rounded-xl text-xs text-center cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { useVehicleStore } from "~/store/vehicleStore";
import { useBrandStore } from "~/store/brandStore";
import { useCategoryStore } from "~/store/categoryStore";

const route = useRoute();
const router = useRouter();
const vehicleStore = useVehicleStore();
const brandStore = useBrandStore();
const categoryStore = useCategoryStore();

// State for active vehicle type tab (mobil / motor)
const activeVehicleType = ref<"mobil" | "motor">(
  (route.query.vehicle_type as "mobil" | "motor") || "mobil",
);

// Flag to prevent duplicate API requests when resetting or switching tabs
const isResettingFilters = ref(false);

// Lists of filter options dynamically loaded from store
const categories = computed(() => {
  return categoryStore.categories
    .filter((c) => !c.type || c.type === activeVehicleType.value)
    .map((c) => c.name);
});

// Mobile states
const isMobileFilterOpen = ref(false);

// Reactive Filter States pre-initialized from route query to prevent watcher trigger on load
const filters = reactive({
  search: (route.query.search as string) || "",
  selectedTypes: route.query.type
    ? [route.query.type as string]
    : ([] as string[]),
  selectedBrands: [] as string[],
  minPrice: null as number | null,
  maxPrice: null as number | null,
});

const sortBy = ref("terbaru");

// Pagination
const currentPage = ref(1);

const mapCategorySlug = (catName: string) => {
  const match = categoryStore.categories.find(
    (c) => c.name.toLowerCase() === catName.toLowerCase(),
  );
  return match ? match.slug : catName.toLowerCase();
};

const fetchVehiclesFromApi = () => {
  const params: any = {
    page: currentPage.value,
    type: activeVehicleType.value,
    search: filters.search || undefined,
    min_price: filters.minPrice || undefined,
    max_price: filters.maxPrice || undefined,
  };

  if (filters.selectedTypes.length > 0) {
    params.category = filters.selectedTypes.map((t) => mapCategorySlug(t)).join(",");
  }

  if (filters.selectedBrands.length > 0) {
    params.brand = filters.selectedBrands.map((b) => b.toLowerCase()).join(",");
  }

  if (sortBy.value === "terbaru") {
    params.sort = "newest";
  } else if (sortBy.value === "harga-rendah") {
    params.sort = "price_asc";
  } else if (sortBy.value === "harga-tinggi") {
    params.sort = "price_desc";
  }

  vehicleStore.fetchVehicles(params);
};

const fetchFiltersForActiveType = async () => {
  await Promise.all([
    brandStore.fetchBrands({ type: activeVehicleType.value }),
    categoryStore.fetchCategories({ type: activeVehicleType.value }),
  ]);
};

const changeVehicleType = async (type: "mobil" | "motor") => {
  isResettingFilters.value = true;
  activeVehicleType.value = type;
  currentPage.value = 1;

  // Reset filters
  filters.search = "";
  filters.selectedTypes = [];
  filters.selectedBrands = [];
  filters.minPrice = null;
  filters.maxPrice = null;
  sortBy.value = "terbaru";

  // Update URL
  router.push({
    path: route.path,
    query: {
      ...route.query,
      vehicle_type: type,
      search: undefined,
      type: undefined,
    },
  });

  await fetchFiltersForActiveType();
  isResettingFilters.value = false;
  fetchVehiclesFromApi();
};

// Load options on mount
onMounted(async () => {
  if (!route.query.vehicle_type) {
    router.replace({
      path: route.path,
      query: { ...route.query, vehicle_type: "mobil" },
    });
  }
  await fetchFiltersForActiveType();
  fetchVehiclesFromApi();
});

// Dynamic brands list from store
const brands = computed(() => {
  return brandStore.brands.map((b) => b.name);
});

// Sync activeVehicleType with route query parameters for back/forward navigation
watch(
  () => route.query.vehicle_type,
  async (newVal) => {
    const targetType = (newVal as "mobil" | "motor") || "mobil";
    if (targetType !== activeVehicleType.value) {
      isResettingFilters.value = true;
      activeVehicleType.value = targetType;
      currentPage.value = 1;

      filters.search = "";
      filters.selectedTypes = [];
      filters.selectedBrands = [];
      filters.minPrice = null;
      filters.maxPrice = null;
      sortBy.value = "terbaru";

      await fetchFiltersForActiveType();
      isResettingFilters.value = false;
      fetchVehiclesFromApi();
    }
  },
);

// Check if any filter is currently applied
const hasActiveFilters = computed(() => {
  return (
    filters.search !== "" ||
    filters.selectedTypes.length > 0 ||
    filters.selectedBrands.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null
  );
});

// Watch text search filter (debounced at 400ms to avoid API spam on typing)
watchDebounced(
  () => filters.search,
  () => {
    if (isResettingFilters.value) return;
    currentPage.value = 1;
    fetchVehiclesFromApi();
  },
  { debounce: 500 },
);

// Watch deep/immediate filter inputs (checkboxes, sorting) for instant feedback
watch(
  [() => filters.selectedTypes, () => filters.selectedBrands, sortBy],
  () => {
    if (isResettingFilters.value) return;
    currentPage.value = 1;
    fetchVehiclesFromApi();
  },
  { deep: true },
);

// Watch price range inputs (debounced at 500ms to avoid API spam on keyboard typing)
watchDebounced(
  [() => filters.minPrice, () => filters.maxPrice],
  () => {
    if (isResettingFilters.value) return;

    // 1. Sanitize negative values
    if (filters.minPrice !== null && filters.minPrice < 0) {
      filters.minPrice = 0;
    }
    if (filters.maxPrice !== null && filters.maxPrice < 0) {
      filters.maxPrice = 0;
    }

    // 2. Prevent API calls if the range is logically invalid (min exceeds max)
    if (
      filters.minPrice !== null &&
      filters.maxPrice !== null &&
      filters.minPrice > filters.maxPrice
    ) {
      return;
    }

    currentPage.value = 1;
    fetchVehiclesFromApi();
  },
  { debounce: 500, deep: true },
);

// Format Rupiah helper
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

// Prevent negative sign keypress helper
const preventNegative = (event: KeyboardEvent) => {
  if (event.key === "-") {
    event.preventDefault();
  }
};

// Return tag backgrounds
const getTagColorClass = (tag: string) => {
  const norm = tag.toLowerCase();
  if (norm === "baru") return "bg-blue-900";
  if (norm === "elektrik") return "bg-emerald-600";
  if (norm === "promo") return "bg-amber-500";
  return "bg-gray-600";
};

// Return fuel badge colors deterministically based on string hash to ensure consistency and support dynamic admin entries
const getFuelColorClass = (fuel: string) => {
  if (!fuel) return "bg-gray-600";
  const colors = [
    "bg-blue-900",
    "bg-emerald-600",
    "bg-teal-600",
    "bg-amber-600",
    "bg-indigo-600",
    "bg-rose-600",
    "bg-violet-600",
    "bg-sky-600",
  ];
  let hash = 0;
  const cleanFuel = fuel.trim().toLowerCase();
  for (let i = 0; i < cleanFuel.length; i++) {
    hash = cleanFuel.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Filter Dismiss actions
const removeTypeFilter = (type: string) => {
  filters.selectedTypes = filters.selectedTypes.filter((t) => t !== type);
};

const removeBrandFilter = (brand: string) => {
  filters.selectedBrands = filters.selectedBrands.filter((b) => b !== brand);
};

const resetFilters = () => {
  isResettingFilters.value = true;
  filters.search = "";
  filters.selectedTypes = [];
  filters.selectedBrands = [];
  filters.minPrice = null;
  filters.maxPrice = null;
  sortBy.value = "terbaru";
  currentPage.value = 1;
  isResettingFilters.value = false;
  fetchVehiclesFromApi();
};

// Computed maps bound directly to store state with client-side fallback filtering
const filteredVehicles = computed(() => {
  return vehicleStore.vehicles.filter(
    (v) => v.vehicle_type === activeVehicleType.value,
  );
});
const paginatedVehicles = computed(() => {
  return vehicleStore.vehicles.filter(
    (v) => v.vehicle_type === activeVehicleType.value,
  );
});
const totalPages = computed(() => {
  // If backend returns unfiltered, compute totalPages on filtered list
  if (filteredVehicles.value.length < vehicleStore.vehicles.length) {
    return (
      Math.ceil(
        filteredVehicles.value.length / (vehicleStore.meta.per_page || 12),
      ) || 1
    );
  }
  return vehicleStore.meta.last_page || 1;
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchVehiclesFromApi();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>
