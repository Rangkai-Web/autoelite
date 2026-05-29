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

    <!-- Accordion Grid -->
    <div class="space-y-4">
      <!-- Q1 -->
      <details
        class="group bg-white border border-gray-100 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-xs hover:shadow-md transition-all"
        open
      >
        <summary
          class="flex items-center justify-between gap-4 font-bold text-gray-900 text-base sm:text-lg"
        >
          <span
            >Bagaimana cara melakukan pemesanan kendaraan di Sentraoto?</span
          >
          <span
            class="shrink-0 transition-transform duration-300 group-open:rotate-180 text-blue-900"
          >
            <Icon name="heroicons:chevron-down" class="w-5 h-5" />
          </span>
        </summary>
        <div
          class="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-4"
        >
          Prosesnya sangat mudah dan VIP. Cukup jelajahi halaman
          <strong>Katalog</strong>, klik kendaraan yang Anda inginkan, lalu klik
          tombol <strong>"Beli Sekarang"</strong>. Isi data pribadi Anda pada
          formulir checkout, lalu kirim. Sistem akan mengompilasi rincian
          pesanan secara instan dan mengarahkan Anda ke WhatsApp Admin VIP kami
          untuk finalisasi berkas dan opsi pembayaran.
        </div>
      </details>

      <!-- Q2 -->
      <details
        class="group bg-white border border-gray-100 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-xs hover:shadow-md transition-all"
      >
        <summary
          class="flex items-center justify-between gap-4 font-bold text-gray-900 text-base sm:text-lg"
        >
          <span>Apakah saya bisa membeli kendaraan secara kredit?</span>
          <span
            class="shrink-0 transition-transform duration-300 group-open:rotate-180 text-blue-900"
          >
            <Icon name="heroicons:chevron-down" class="w-5 h-5" />
          </span>
        </summary>
        <div
          class="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-4"
        >
          Tentu saja bisa. Kami bekerja sama erat dengan berbagai Bank terkemuka
          dan Lembaga Pembiayaan (Leasing) tepercaya kelas dunia untuk
          menawarkan skema kredit syariah atau konvensional dengan bunga yang
          kompetitif dan masa angsuran fleksibel hingga 5 tahun.
        </div>
      </details>

      <!-- Q3 -->
      <details
        class="group bg-white border border-gray-100 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-xs hover:shadow-md transition-all"
      >
        <summary
          class="flex items-center justify-between gap-4 font-bold text-gray-900 text-base sm:text-lg"
        >
          <span>Bagaimana jaminan keamanan selama pengiriman kendaraan?</span>
          <span
            class="shrink-0 transition-transform duration-300 group-open:rotate-180 text-blue-900"
          >
            <Icon name="heroicons:chevron-down" class="w-5 h-5" />
          </span>
        </summary>
        <div
          class="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-4"
        >
          Keamanan unit adalah prioritas mutlak kami. Setiap pengiriman
          kendaraan ke garasi Anda dilakukan menggunakan
          <strong>Premium Single Towing tertutup</strong> (truk gendong khusus
          luxury car) dengan asuransi perjalanan penuh. Unit kami bersihkan,
          proteksi, dan antar langsung oleh supir towing profesional
          bersertifikat.
        </div>
      </details>

      <!-- Q4 -->
      <details
        class="group bg-white border border-gray-100 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-xs hover:shadow-md transition-all"
      >
        <summary
          class="flex items-center justify-between gap-4 font-bold text-gray-900 text-base sm:text-lg"
        >
          <span>Apakah Sentraoto melayani tukar tambah (Trade-In)?</span>
          <span
            class="shrink-0 transition-transform duration-300 group-open:rotate-180 text-blue-900"
          >
            <Icon name="heroicons:chevron-down" class="w-5 h-5" />
          </span>
        </summary>
        <div
          class="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-4"
        >
          Ya, kami memiliki tim penaksir harga ahli yang siap mengunjungi rumah
          atau kantor Anda untuk memeriksa kondisi fisik kendaraan lama Anda
          secara transparan. Nilai taksiran kendaraan lama Anda dapat langsung
          digunakan sebagai potongan uang muka kredit (DP) atau pengurang harga
          tunai kendaraan baru Anda.
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
// Static page setup
</script>
