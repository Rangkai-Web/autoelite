<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
    <!-- SEO Optimization -->
    <Html lang="id">
      <Head>
        <Title>Ketentuan Layanan | AUTOELITE</Title>
        <Meta
          name="description"
          content="Syarat dan Ketentuan Layanan AUTOELITE. Harap baca dengan seksama sebelum melakukan pemesanan kendaraan premium kami."
        />
      </Head>
    </Html>

    <!-- Header -->
    <div class="border-b border-gray-100 pb-6 space-y-2">
      <h1 class="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight">
        Ketentuan <span class="text-blue-600">Layanan</span>
      </h1>
      <p class="text-sm text-gray-400 font-medium">
        Terakhir diperbarui: 26 Mei 2026
      </p>
    </div>

    <!-- Content -->
    <div class="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6 text-sm sm:text-base">
      <p>
        Selamat datang di <strong>AUTOELITE</strong>. Dengan mengakses situs web kami dan melakukan pemesanan kendaraan, Anda dianggap telah menyetujui Syarat dan Ketentuan Layanan ini. Harap baca dokumen ini secara cermat.
      </p>

      <section class="space-y-3">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide">
          1. Ketentuan Pemesanan Kendaraan
        </h2>
        <ul class="list-disc pl-5 space-y-1.5">
          <li>Setiap data pemesanan yang dikompilasi oleh formulir checkout akan dikirim langsung ke WhatsApp Admin resmi kami untuk divalidasi dan dihitung penawaran resminya.</li>
          <li>Harga yang tercantum di katalog situs web adalah estimasi harga On-The-Road (OTR) untuk wilayah DKI Jakarta dan sekitarnya, serta dapat berubah sewaktu-waktu tanpa pemberitahuan tertulis sebelumnya.</li>
          <li>Pemesanan dianggap sah dan mengikat secara hukum hanya setelah pembeli membayar uang tanda jadi (booking fee) resmi dan menerima Surat Pemesanan Kendaraan (SPK) bertanda tangan basah/digital dari manajemen AUTOELITE.</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide">
          2. Syarat Pembayaran & Pembiayaan
        </h2>
        <p>
          Kami melayani pembelian secara Tunai (Cash) maupun Kredit (Finance):
        </p>
        <ul class="list-disc pl-5 space-y-1.5">
          <li>Untuk pembelian kredit, kelayakan dan persetujuan aplikasi pembiayaan sepenuhnya merupakan wewenang dari pihak Lembaga Keuangan (Leasing/Bank) rekanan kami.</li>
          <li>Pembeli wajib menyerahkan dokumen persyaratan kredit yang valid, jujur, dan lengkap demi mempercepat proses verifikasi.</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide">
          3. Pengiriman Kendaraan (Delivery)
        </h2>
        <p>
          Kendaraan mewah Anda akan dikirim menggunakan fasilitas towing tertutup premium ke alamat yang disepakati setelah seluruh proses administrasi pelunasan (Cash) atau konfirmasi pembiayaan (Kredit) selesai 100%. AUTOELITE menjamin keamanan unit selama masa transit hingga tiba di garasi Anda.
        </p>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide">
          4. Perubahan Ketentuan
        </h2>
        <p>
          Kami berhak mengubah atau mengganti Ketentuan Layanan ini kapan saja atas kebijakan kami sendiri. Silakan periksa halaman ini secara berkala untuk mengetahui pembaruan terbaru.
        </p>
      </section>
    </div>

    <!-- Back button -->
    <div class="pt-6 border-t border-gray-100">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4" />
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Static page using pre-loaded Nuxt components
</script>
