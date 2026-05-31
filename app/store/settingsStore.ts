import { defineStore } from "pinia";
import { useApi } from "~/services/api";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    whatsappNumber: "6281234567890",
    whatsappDefaultText:
      "Halo Sentraoto, saya tertarik dengan unit kendaraan yang ada di website Anda.",
    contactEmail: "info@sentraoto.com",
    contactPhone: "+62 812-3456-7890",
    officeAddress:
      "Jl. Jenderal Sudirman Kav. 21, SCBD, Senayan, Jakarta Selatan, 12190, Indonesia",
    socials: {
      instagram: "https://instagram.com/sentraoto.id",
      facebook: "https://facebook.com/sentraoto.id",
      youtube: "https://youtube.com/c/sentraoto",
      linkedin: "#",
    },
    termsConditions: `<p>Selamat datang di <strong>Sentraoto</strong>. Dengan mengakses situs web kami dan melakukan pemesanan kendaraan, Anda dianggap telah menyetujui Syarat dan Ketentuan Layanan ini. Harap baca dokumen ini secara cermat.</p>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">1. Ketentuan Pemesanan Kendaraan</h3>
<ul style="list-style-type:disc; margin-left:1.5rem; margin-top:10px;">
    <li>Setiap data pemesanan yang dikompilasi oleh formulir checkout akan dikirim langsung ke WhatsApp Admin resmi kami untuk divalidasi dan dihitung penawaran resminya.</li>
    <li>Harga yang tercantum di katalog situs web adalah estimasi harga On-The-Road (OTR) untuk wilayah DKI Jakarta dan sekitarnya, serta dapat berubah sewaktu-waktu tanpa pemberitahuan tertulis sebelumnya.</li>
    <li>Pemesanan dianggap sah dan mengikat secara hukum hanya setelah pembeli membayar uang tanda jadi (booking fee) resmi dan menerima Surat Pemesanan Kendaraan (SPK) bertanda tangan basah/digital dari manajemen Sentraoto.</li>
</ul>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">2. Syarat Pembayaran & Pembiayaan</h3>
<p>Kami melayani pembelian secara Tunai (Cash) maupun Kredit (Finance):</p>
<ul style="list-style-type:disc; margin-left:1.5rem; margin-top:10px;">
    <li><strong>Pembayaran dilakukan secara cash atau transfer ke rekening perusahaan (tidak ada pembayaran melalui rekening pribadi).</strong></li>
    <li>Untuk pembelian kredit, kelayakan dan persetujuan aplikasi pembiayaan sepenuhnya merupakan wewenang dari pihak Lembaga Keuangan (Leasing/Bank) rekanan kami.</li>
    <li>Pembeli wajib menyerahkan dokumen persyaratan kredit yang valid, jujur, dan lengkap demi mempercepat proses verifikasi.</li>
</ul>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">3. Pengiriman Kendaraan (Delivery)</h3>
<ul style="list-style-type:disc; margin-left:1.5rem; margin-top:10px;">
    <li><strong>Pengiriman unit akan dilakukan setelah pembayaran dinyatakan lunas.</strong></li>
    <li>Kendaraan Anda akan dikirim menggunakan fasilitas towing tertutup ke alamat yang disepakati setelah seluruh proses administrasi pelunasan (Cash) atau konfirmasi pembiayaan (Kredit) selesai 100%. Sentraoto menjamin keamanan unit selama masa transit hingga tiba di garasi Anda.</li>
</ul>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">4. Perubahan Ketentuan</h3>
<p>Kami berhak mengubah atau mengganti Ketentuan Layanan ini kapan saja atas kebijakan kami sendiri. Silakan periksa halaman ini secara berkala untuk mengetahui pembaruan terbaru.</p>`,
    privacyPolicy: `<p>Di <strong>Sentraoto</strong>, dapat diakses dari situs kami, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh Sentraoto dan bagaimana kami menggunakannya.</p>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">1. Informasi yang Kami Kumpulkan</h3>
<p>Kami mengumpulkan beberapa jenis informasi untuk berbagai keperluan guna menyediakan dan meningkatkan Layanan kami kepada Anda:</p>
<ul style="list-style-type:disc; margin-left:1.5rem; margin-top:10px;">
    <li><strong>Data Pribadi:</strong> Saat melakukan konsultasi atau pemesanan kendaraan, kami meminta Anda memberikan informasi pengenal pribadi tertentu seperti Nama Lengkap, Alamat Email, Nomor Telepon/WhatsApp, dan Alamat Rumah/Kantor.</li>
    <li><strong>Data Log:</strong> Seperti situs web lainnya, kami mencatat informasi standar yang dikirimkan oleh peramban Anda setiap kali mengunjungi situs kami (seperti alamat IP, jenis peramban, dan halaman yang dikunjungi).</li>
</ul>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">2. Penggunaan Informasi Anda</h3>
<p>Sentraoto menggunakan data yang dikumpulkan untuk berbagai tujuan:</p>
<ul style="list-style-type:disc; margin-left:1.5rem; margin-top:10px;">
    <li>Memproses formulir pemesanan kendaraan dan menghubungkan Anda dengan Admin WhatsApp kami.</li>
    <li>Memberikan layanan pelanggan, pemeliharaan, serta menanggapi pertanyaan konsultasi Anda secara VIP.</li>
    <li>Meningkatkan, mempersonalisasi, dan memperluas fungsionalitas situs web kami.</li>
    <li>Mendeteksi, mencegah, dan mengatasi masalah teknis demi kenyamanan kunjungan Anda.</li>
</ul>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">3. Keamanan Data</h3>
<p>Keamanan data Anda sangat penting bagi kami. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi Data Pribadi Anda dari akses tidak sah, pengungkapan, perubahan, atau penghancuran. Namun, harap diingat bahwa tidak ada metode transmisi melalui Internet yang 100% aman.</p>

<h3 style="font-size:1.2rem; font-weight:bold; margin-top:20px; color:#111827;">4. Hubungi Kami</h3>
<p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi tim legalitas kami melalui:</p>
<p>Email: privacy@sentraoto.com<br>WhatsApp Layanan Pelanggan: +62 812-3456-7890</p>`,
    loading: false,
  }),
  actions: {
    async fetchSettings() {
      this.loading = true;
      try {
        const api = useApi();
        const data = await api.getSettings();
        if (data) {
          this.whatsappNumber = data.whatsapp_number || this.whatsappNumber;
          this.whatsappDefaultText =
            data.whatsapp_default_text || this.whatsappDefaultText;
          this.contactEmail = data.contact_email || this.contactEmail;
          this.contactPhone = data.contact_phone || this.contactPhone;
          this.officeAddress = data.office_address || this.officeAddress;
          this.termsConditions = data.terms_conditions || this.termsConditions;
          this.privacyPolicy = data.privacy_policy || this.privacyPolicy;
          if (data.socials) {
            this.socials.instagram =
              data.socials.instagram || this.socials.instagram;
            this.socials.facebook =
              data.socials.facebook || this.socials.facebook;
            this.socials.youtube = data.socials.youtube || this.socials.youtube;
          }
        }
      } catch (error) {
        console.error("Gagal mengambil konfigurasi showroom:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
