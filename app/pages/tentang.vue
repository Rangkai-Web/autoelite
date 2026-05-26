<template>
  <div class="space-y-16 pb-20">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Tentang Kami | AUTOELITE - Showroom Mewah Terpercaya</Title>
        <Meta
          name="description"
          content="Ketahui profil perusahaan, showroom terdekat, alamat lengkap, peta interaktif, dan hubungi langsung pemilik/VIP manager AUTOELITE."
        />
      </Head>
    </Html>

    <!-- Page Title Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <!-- <div
        class="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2"
      >
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
          >Beranda</NuxtLink
        >
        <Icon name="heroicons:chevron-right" class="w-3 h-3" />
        <span class="text-gray-900 font-bold">Tentang Kami</span>
      </div> -->
      <h1
        class="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight uppercase"
      >
        Tentang Autoelite
      </h1>
      <p class="text-sm text-gray-500 font-medium mt-1">
        Dedikasi tanpa henti untuk menghadirkan pengalaman otomotif termewah dan
        terpercaya di Indonesia.
      </p>
    </div>

    <!-- Section 1: Profil Perusahaan -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Visual Banner Image -->
        <div
          class="relative bg-gray-100 rounded-3xl overflow-hidden shadow-md aspect-4/3 border border-gray-100"
        >
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800"
            alt="AUTOELITE Luxury Showroom"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
          ></div>
          <div class="absolute bottom-6 left-6 text-white space-y-1">
            <span
              class="text-[10px] font-black uppercase tracking-widest text-blue-400"
              >Main Flagship Showroom</span
            >
            <h3 class="text-lg font-bold">Showroom AUTOELITE Sudirman</h3>
          </div>
        </div>

        <!-- Narrative and Statistics -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h2
              class="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight"
            >
              Mendefinisikan Ulang Standar Layanan Otomotif Premium
            </h2>
            <div
              class="text-sm sm:text-base text-gray-600 leading-relaxed font-medium space-y-4"
            >
              <p>
                Didirikan sejak tahun 2012, AUTOELITE lahir dari kecintaan
                mendalam terhadap mahakarya otomotif performa tinggi dan
                eksklusivitas. Kami bukan sekadar menjual kendaraan roda empat
                dan roda dua; kami berkomitmen menghantarkan gaya hidup
                prestisius yang sempurna.
              </p>
              <p>
                Setiap unit yang berada di dalam inventaris kami melewati 150
                titik inspeksi ketat oleh teknisi bersertifikat internasional
                untuk menjamin kondisi mekanis dan estetika yang tiada cela.
                Kami memfasilitasi seluruh proses legalitas, bea masuk,
                pembiayaan, hingga asuransi secara transparan untuk ketenangan
                pikiran Anda yang berharga.
              </p>
            </div>
          </div>

          <!-- Statistics Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div
              class="p-4 bg-white border border-gray-100 rounded-2xl shadow-3xs hover:border-blue-100 transition-colors"
            >
              <span class="block text-2xl sm:text-3xl font-black text-blue-600"
                >12+</span
              >
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1"
                >Tahun Pengalaman</span
              >
            </div>
            <div
              class="p-4 bg-white border border-gray-100 rounded-2xl shadow-3xs hover:border-blue-100 transition-colors"
            >
              <span class="block text-2xl sm:text-3xl font-black text-blue-600"
                >3,000+</span
              >
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1"
                >Pelanggan VIP</span
              >
            </div>
            <div
              class="p-4 bg-white border border-gray-100 rounded-2xl shadow-3xs hover:border-blue-100 transition-colors"
            >
              <span class="block text-2xl sm:text-3xl font-black text-blue-600"
                >4</span
              >
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1"
                >Showroom Utama</span
              >
            </div>
            <div
              class="p-4 bg-white border border-gray-100 rounded-2xl shadow-3xs hover:border-blue-100 transition-colors"
            >
              <span class="block text-2xl sm:text-3xl font-black text-blue-600"
                >99.8%</span
              >
              <span
                class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1"
                >Indeks Kepuasan</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Showroom Location, Maps, Address, No HP -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="border-t border-gray-100 pt-12">
        <h2
          class="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight mb-2"
        >
          Lokasi & Kontak Showroom Pusat
        </h2>
        <p class="text-sm text-gray-500 font-medium">
          Kunjungi showroom utama kami di pusat distrik bisnis Jakarta.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <!-- Contact Information Card -->
        <div
          class="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6"
        >
          <div class="space-y-5">
            <span
              class="inline-block px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-lg bg-blue-50 text-blue-600"
            >
              Kantor Pusat & Showroom Utama
            </span>

            <div class="space-y-4">
              <!-- Address -->
              <div class="flex items-start gap-3">
                <span
                  class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5"
                >
                  <Icon name="heroicons:map-pin" class="w-4.5 h-4.5" />
                </span>
                <div>
                  <h4
                    class="text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    Alamat
                  </h4>
                  <p
                    class="text-sm font-bold text-gray-800 leading-relaxed mt-0.5"
                  >
                    Jl. Jenderal Sudirman Kav. 21, SCBD, Senayan, Jakarta
                    Selatan, 12190, Indonesia
                  </p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start gap-3">
                <span
                  class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5"
                >
                  <Icon name="heroicons:phone" class="w-4.5 h-4.5" />
                </span>
                <div>
                  <h4
                    class="text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    No. Telepon
                  </h4>
                  <a
                    href="tel:+6281234567890"
                    class="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors block mt-0.5"
                  >
                    +62 812-3456-7890 (Showroom)
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-3">
                <span
                  class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5"
                >
                  <Icon name="heroicons:envelope" class="w-4.5 h-4.5" />
                </span>
                <div>
                  <h4
                    class="text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    Alamat Email
                  </h4>
                  <a
                    href="mailto:info@autoelite.com"
                    class="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors block mt-0.5"
                  >
                    info@autoelite.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Medias -->
          <div class="pt-4 border-t border-gray-100">
            <h4
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3"
            >
              Sosial Media
            </h4>
            <div class="flex items-center gap-3">
              <a
                href="#"
                class="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-3xs"
                title="Instagram"
              >
                <Icon name="mdi:instagram" class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-3xs"
                title="Facebook"
              >
                <Icon name="mdi:facebook" class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-3xs"
                title="YouTube"
              >
                <Icon name="mdi:youtube" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Google Maps Embed (Takes 2 cols) -->
        <div
          class="lg:col-span-2 relative bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-xs h-80 sm:h-auto min-h-[350px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2974868205494!2d106.80424567586822!3d-6.224443993763784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14f1778c66f%3A0xcbfd952684ab30bd!2sSenayan%20City!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            class="w-full h-full border-0 absolute inset-0"
            allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Section 3: Hubungi Kami - Pemilik (Ir. Budi Wijaya) -->
    <section id="vip" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="bg-linear-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden"
      >
        <!-- Abstract light graphic backgrounds -->
        <div class="absolute inset-0 z-0 opacity-10">
          <svg
            class="w-full h-full"
            fill="none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 L100 100 M100 0 L0 100"
              stroke="currentColor"
              stroke-width="0.5"
            />
          </svg>
        </div>

        <div
          class="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
        >
          <!-- Executive introduction (3 cols) -->
          <div class="lg:col-span-3 space-y-4">
            <span
              class="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/20"
            >
              VIP Personal Consultations
            </span>
            <h2
              class="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight"
            >
              Konsultasi Langsung dengan Management & Pemilik
            </h2>
            <p class="text-sm text-blue-100 leading-relaxed font-medium">
              Apakah Anda membutuhkan pemesanan unit kendaraan khusus, negosiasi
              armada perusahaan skala besar (fleet sales), atau pembiayaan
              eksklusif dengan penanganan langsung? Silakan hubungi jajaran
              pimpinan kami secara langsung demi kepuasan mutlak.
            </p>
          </div>

          <!-- Contacts Cards (2 cols) -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Owner Contact -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0"
                >
                  BW
                </span>
                <div>
                  <h4 class="text-sm font-black">Ir. Budi Wijaya</h4>
                  <span
                    class="text-[10px] font-bold text-blue-300 uppercase tracking-wider block"
                    >CEO & Founder, AUTOELITE</span
                  >
                </div>
              </div>
              <button
                @click="contactVIP('Ir. Budi Wijaya', 'CEO')"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Icon name="mdi:whatsapp" class="w-4 h-4" />
                Chat VIP
              </button>
            </div>

            <!-- VIP Director Contact -->
            <div
              class="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0"
                >
                  RP
                </span>
                <div>
                  <h4 class="text-sm font-black">Rian Pratama</h4>
                  <span
                    class="text-[10px] font-bold text-blue-300 uppercase tracking-wider block"
                    >VIP Customer Account Director</span
                  >
                </div>
              </div>
              <button
                @click="contactVIP('Rian Pratama', 'VIP Customer Director')"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Icon name="mdi:whatsapp" class="w-4 h-4" />
                Chat VIP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// WhatsApp Integration engine for VIP Direct Contact
const contactVIP = (recipient: string, role: string) => {
  const textMessage = `Halo ${recipient} (${role} AUTOELITE),

Saya adalah konsumen VIP AUTOELITE yang berkeinginan untuk berkonsultasi mengenai pemesanan kendaraan khusus, unit langka, atau konsultasi pembiayaan khusus. Mohon arahannya lebih lanjut. Terima kasih!`;

  const encodedText = encodeURIComponent(textMessage);

  // Custom direct target or owner's placeholder
  const adminPhoneNumber = "6281234567890";
  const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedText}`;

  window.open(whatsappUrl, "_blank");
};
</script>
