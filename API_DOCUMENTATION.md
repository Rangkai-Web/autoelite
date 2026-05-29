# Dokumentasi API sentraoto (Backend)

Dokumentasi ini dibuat untuk membantu tim frontend mengintegrasikan layanan backend **sentraoto** ke dalam aplikasi frontend (seperti Vue 3, Nuxt 3, React, atau Next.js).

---

## 📌 Informasi Umum

- **Base URL (Lokal):** `http://localhost:8000/api` atau sesuai port port running server Laravel Anda.
- **Headers Default:**
  ```http
  Accept: application/json
  Content-Type: application/json
  ```
- **Penyimpanan Media (Asset):** Semua properti gambar (`image` atau `images`) mengembalikan URL absolut yang sudah menunjuk ke server storage (misalnya: `http://localhost:8000/storage/vehicles/mobil.jpg`). Anda bisa langsung menggunakannya pada tag `<img>`.

---

## 📂 Ringkasan Endpoint

| No  | Method | Endpoint             | Fungsi                                                            |
| :-- | :----- | :------------------- | :---------------------------------------------------------------- |
| 1   | `GET`  | `/api/settings`      | Mengambil konfigurasi showroom dinamis & info sosial media        |
| 2   | `GET`  | `/api/brands`        | Mengambil daftar seluruh merek/brand kendaraan                    |
| 3   | `GET`  | `/api/vehicles`      | Mengambil daftar kendaraan (dengan filter & pagination)           |
| 4   | `GET`  | `/api/vehicles/{id}` | Mengambil detail spesifikasi lengkap satu kendaraan               |
| 5   | `GET`  | `/api/posts`         | Mengambil daftar artikel blog/berita (dengan pagination & search) |
| 6   | `GET`  | `/api/posts/{slug}`  | Mengambil detail artikel berdasarkan slug                         |
| 7   | `GET`  | `/api/faqs`          | Mengambil daftar tanya-jawab (FAQ) aktif                          |
| 8   | `GET`  | `/api/vip-contacts`  | Mengambil daftar kontak VIP showroom                              |
| 9   | `POST` | `/api/orders`        | Mengirim data pemesanan unit kendaraan (order submission)         |

---

## 🛠 Detail Endpoints & Struktur Response

### 1. Settings (Konfigurasi Showroom)

Mengambil detail informasi kontak showroom dinamis serta tautan media sosial untuk ditampilkan di header, footer, atau halaman kontak.

- **Method:** `GET`
- **Path:** `/settings`
- **Response `200 OK`:**

```json
{
  "whatsapp_number": "6281234567890",
  "whatsapp_default_text": "Halo sentraoto, saya tertarik dengan unit kendaraan yang ada di website Anda.",
  "contact_email": "info@sentraoto.com",
  "contact_phone": "+62 21 555 1234",
  "office_address": "Jl. Boulevard Artha Gading No.12, Jakarta Utara, Indonesia",
  "socials": {
    "instagram": "https://instagram.com/sentraoto.id",
    "facebook": "https://facebook.com/sentraoto.id",
    "youtube": "https://youtube.com/c/sentraoto"
  }
}
```

---

### 2. Brands (Merek Kendaraan)

Mengambil seluruh daftar merek kendaraan aktif yang diurutkan secara alfabetis (`A-Z`). Sering digunakan untuk drop-down filter pencarian.

- **Method:** `GET`
- **Path:** `/brands`
- **Response `200 OK`:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "BMW",
      "slug": "bmw"
    },
    {
      "id": 2,
      "name": "Mercedes Benz",
      "slug": "mercedes-benz"
    },
    {
      "id": 3,
      "name": "Toyota",
      "slug": "toyota"
    }
  ]
}
```

---

### 3. Vehicles (Katalog Kendaraan)

Mengambil daftar kendaraan yang dijual dengan fitur paginasi (12 item per halaman) serta filter dinamis.

- **Method:** `GET`
- **Path:** `/vehicles`
- **Query Parameters (Opsional):**
  - `search` (string): Mencari berdasarkan nama kendaraan atau nama merek.
  - `category` (string - slug): Filter berdasarkan kategori slug (misalnya: `suv`, `sedan`, `ev`).
  - `brand` (string - slug/nama): Filter berdasarkan slug atau nama brand (misalnya: `bmw`, `toyota`).
  - `min_price` (numeric): Memfilter harga minimal.
  - `max_price` (numeric): Memfilter harga maksimal.
  - `sort` (string): Urutan data. Pilihan yang tersedia:
    - `price_asc` : Harga terendah ke tertinggi.
    - `price_desc` : Harga tertinggi ke terendah.
    - `newest` : Tahun rilis kendaraan terbaru.
    - _Default (jika kosong)_: Diurutkan berdasarkan waktu input terbaru (`created_at` desc).

- **Response `200 OK`:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "BMW X5 xDrive40i",
      "brand": "BMW",
      "price": 1850000000,
      "year": 2024,
      "transmission": "Automatic",
      "fuel": "Pertamax Turbo",
      "image": "http://localhost:8000/storage/vehicles/bmw-x5.jpg",
      "tags": ["Luxury", "Family SUV", "Hybrid Ready"],
      "category": {
        "id": 1,
        "name": "SUV",
        "slug": "suv"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 12,
    "total": 35
  }
}
```

---

### 4. Vehicle Detail (Spesifikasi Lengkap Kendaraan)

Mengambil informasi lengkap untuk halaman detail mobil, termasuk deskripsi naratif, galeri foto lengkap, serta spesifikasi teknis.

- **Method:** `GET`
- **Path:** `/vehicles/{id}`
- **Response `200 OK`:**

```json
{
  "id": 1,
  "name": "BMW X5 xDrive40i",
  "brand": "BMW",
  "price": 1850000000,
  "year": 2024,
  "transmission": "Automatic",
  "fuel": "Pertamax Turbo",
  "image": "http://localhost:8000/storage/vehicles/bmw-x5.jpg",
  "images": [
    "http://localhost:8000/storage/vehicles/bmw-x5-front.jpg",
    "http://localhost:8000/storage/vehicles/bmw-x5-interior.jpg",
    "http://localhost:8000/storage/vehicles/bmw-x5-rear.jpg"
  ],
  "tags": ["Luxury", "Family SUV", "Hybrid Ready"],
  "description": "BMW X5 xDrive40i M Sport hadir sebagai standar kemewahan baru dengan kabin ekstra nyaman dan akselerasi luar biasa...",
  "category": {
    "id": 1,
    "name": "SUV",
    "slug": "suv"
  },
  "specs": {
    "engine": "3.0L TwinPower Turbo 6-Cylinder",
    "power": "381 HP",
    "torque": "520 Nm",
    "driveSystem": "AWD (xDrive)",
    "transmission": "Automatic",
    "acceleration": "5.4s (0-100 km/h)"
  }
}
```

---

### 5. Posts (Artikel & Berita)

Mengambil daftar artikel blog atau berita otomotif dengan paginasi (9 item per halaman) untuk halaman Berita.

- **Method:** `GET`
- **Path:** `/posts`
- **Query Parameters (Opsional):**
  - `search` (string): Pencarian judul artikel.
  - `category` (string): Filter kategori artikel (misalnya: `Event`, `Promo`, `Tips`).

- **Response `200 OK`:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Tips Merawat Cat Mobil Mewah Agar Tetap Mengkilap",
      "slug": "tips-merawat-cat-mobil-mewah-agar-tetap-mengkilap",
      "excerpt": "Menjaga warna cat mobil tetap prima membutuhkan teknik pencucian dan perlindungan khusus. Simak tips selengkapnya di sini.",
      "image": "http://localhost:8000/storage/posts/tips-cat-mobil.jpg",
      "category": "Tips",
      "read_time": "5 Min Read",
      "published_at": "2026-05-28"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 2,
    "per_page": 9,
    "total": 12
  }
}
```

---

### 6. Post Detail

Mengambil isi konten lengkap artikel berdasarkan parameter slug.

- **Method:** `GET`
- **Path:** `/posts/{slug}`
- **Response `200 OK`:**

```json
{
  "id": 1,
  "title": "Tips Merawat Cat Mobil Mewah Agar Tetap Mengkilap",
  "slug": "tips-merawat-cat-mobil-mewah-agar-tetap-mengkilap",
  "excerpt": "Menjaga warna cat mobil tetap prima membutuhkan teknik pencucian dan perlindungan khusus. Simak tips selengkapnya di sini.",
  "content": "<p>Merawat mobil mewah tentu memerlukan ketelitian tinggi... [Isi Konten HTML/Text Artikel Lengkap] ...</p>",
  "image": "http://localhost:8000/storage/posts/tips-cat-mobil.jpg",
  "category": "Tips",
  "read_time": "5 Min Read",
  "published_at": "2026-05-28"
}
```

---

### 7. FAQs (Tanya Jawab Dinamis)

Mengambil daftar tanya jawab aktif yang diurutkan berdasarkan `sort_order` untuk halaman bantuan / FAQ.

- **Method:** `GET`
- **Path:** `/faqs`
- **Response `200 OK`:**

```json
{
  "data": [
    {
      "id": 1,
      "question": "Apakah unit kendaraan di sentraoto memiliki garansi resmi?",
      "answer": "Ya, semua unit kendaraan baru memiliki garansi resmi pabrikan. Untuk unit bekas bergaransi, kami menyediakan proteksi hingga 1 tahun.",
      "sort_order": 1
    },
    {
      "id": 2,
      "question": "Bagaimana proses pengajuan test drive?",
      "answer": "Anda dapat memesan sesi test drive langsung melalui kontak VIP Marketing kami atau mengisi form pemesanan dengan menandai opsi test drive.",
      "sort_order": 2
    }
  ]
}
```

---

### 8. VIP Contacts (Kontak Pimpinan Showroom / Marketing Executive)

Mengambil daftar kontak VIP Sales/Marketing yang bisa langsung dihubungi oleh pengunjung via WhatsApp.

- **Method:** `GET`
- **Path:** `/vip-contacts`
- **Response `200 OK`:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Budi Santoso",
      "role": "General Manager Sales",
      "initials": "BS",
      "whatsapp_number": "628551234567",
      "custom_text": "Halo Pak Budi, saya ingin bertanya tentang promo unit premium."
    },
    {
      "id": 2,
      "name": "Siti Rahma",
      "role": "Senior Sales Executive",
      "initials": "SR",
      "whatsapp_number": "628119876543",
      "custom_text": "Halo Ibu Siti, saya tertarik untuk simulasi kredit mobil Mercedes."
    }
  ]
}
```

---

### 9. Order Submission (Pemesanan Kendaraan)

Menyimpan data pengajuan pemesanan atau minat pembelian dari konsumen ke database untuk kebutuhan audit, logging, atau follow up internal.

- **Method:** `POST`
- **Path:** `/orders`
- **Request Body (JSON):**

```json
{
  "name": "Rian Adi",
  "phone": "6281234567890",
  "email": "rian.adi@gmail.com",
  "address": "Jl. Mawar No. 45, Jakarta Selatan",
  "company_name": "PT Rangkai Solusi Digital",
  "company_address": "Kuningan, Jakarta",
  "items": [
    {
      "vehicle_id": 1,
      "qty": 1
    }
  ]
}
```

#### Aturan Validasi Request:

- `name` (Wajib, String, Maksimal 255 karakter)
- `phone` (Wajib, String, Maksimal 50 karakter)
- `email` (Opsional, Format Email Valid, Maksimal 100 karakter)
- `address` (Opsional, String/Text)
- `company_name` (Opsional, String, Maksimal 255 karakter)
- `company_address` (Opsional, String/Text)
- `items` (Wajib, Array, minimal 1 item)
- `items.*.vehicle_id` (Wajib, Integer, Harus terdaftar di tabel `vehicles`)
- `items.*.qty` (Wajib, Integer, Minimal 1)

#### Response `201 Created` (Sukses):

```json
{
  "status": "success",
  "message": "Order submission logged successfully.",
  "order_id": 14
}
```

#### Response `422 Unprocessable Entity` (Gagal Validasi):

```json
{
  "status": "error",
  "message": "Validasi gagal.",
  "errors": {
    "phone": ["The phone field is required."],
    "items": ["The items field is required."]
  }
}
```

---

## 💻 Contoh Implementasi di Frontend (Vue 3 / Nuxt 3)

Berikut adalah contoh fungsi composable atau service untuk mengonsumsi API di atas menggunakan **Axios** atau **Fetch API**.

### 1. API Service ( menggunakan Axios )

Buat sebuah file `services/api.js`:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Sesuaikan URL backend Anda
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const VehicleService = {
  // Ambil data katalog dengan parameter filter
  async getAll(params = {}) {
    const response = await api.get("/vehicles", { params });
    return response.data;
  },

  // Ambil detail satu kendaraan
  async getDetail(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },
};

export const SettingService = {
  async getSettings() {
    const response = await api.get("/settings");
    return response.data;
  },
};

export const OrderService = {
  async submitOrder(payload) {
    const response = await api.post("/orders", payload);
    return response.data;
  },
};

export default api;
```

### 2. Penggunaan di Component Vue (Contoh Halaman Catalog)

Di dalam component Vue (misal `CatalogPage.vue`):

```vue
<script setup>
import { ref, onMounted, watch } from "vue";
import { VehicleService } from "@/services/api";

const vehicles = ref([]);
const meta = ref({ current_page: 1, last_page: 1 });
const search = ref("");
const category = ref("");
const sortBy = ref("");
const loading = ref(false);

const fetchVehicles = async (page = 1) => {
  loading.value = true;
  try {
    const res = await VehicleService.getAll({
      page,
      search: search.value,
      category: category.value,
      sort: sortBy.value,
    });
    vehicles.value = res.data;
    meta.value = res.meta;
  } catch (error) {
    console.error("Gagal memuat katalog:", error);
  } finally {
    loading.value = false;
  }
};

// Panggil pertama kali saat component dimount
onMounted(() => {
  fetchVehicles();
});

// Watch perubahan filter untuk fetch ulang otomatis
watch([search, category, sortBy], () => {
  fetchVehicles(1); // kembali ke halaman 1
});
</script>

<template>
  <div class="catalog-container">
    <!-- Filter Bar -->
    <div class="filters">
      <input v-model="search" placeholder="Cari mobil..." />
      <select v-model="category">
        <option value="">Semua Kategori</option>
        <option value="suv">SUV</option>
        <option value="sedan">Sedan</option>
      </select>
      <select v-model="sortBy">
        <option value="">Terbaru</option>
        <option value="price_asc">Harga Terendah</option>
        <option value="price_desc">Harga Tertinggi</option>
      </select>
    </div>

    <!-- Grid Katalog -->
    <div v-if="loading">Loading...</div>
    <div v-else class="grid">
      <div v-for="car in vehicles" :key="car.id" class="card">
        <img :src="car.image" :alt="car.name" />
        <h3>{{ car.name }}</h3>
        <p>{{ car.brand }} - {{ car.year }}</p>
        <span>Rp {{ car.price.toLocaleString("id-ID") }}</span>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
        :disabled="meta.current_page === 1"
        @click="fetchVehicles(meta.current_page - 1)"
      >
        Prev
      </button>
      <span>Halaman {{ meta.current_page }} dari {{ meta.last_page }}</span>
      <button
        :disabled="meta.current_page === meta.last_page"
        @click="fetchVehicles(meta.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
```

### 3. Pengiriman Order Form (Contoh Checkout / Booking)

Di dalam component pemesanan (misal `OrderForm.vue`):

```vue
<script setup>
import { ref } from "vue";
import { OrderService } from "@/services/api";

const form = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
  company_name: "",
  company_address: "",
});
const vehicleId = ref(1); // Contoh ID kendaraan yang dipilih
const qty = ref(1);

const errors = ref({});
const successMessage = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  errors.value = {};
  successMessage.value = "";

  const payload = {
    name: form.value.name,
    phone: form.value.phone,
    email: form.value.email || null,
    address: form.value.address || null,
    company_name: form.value.company_name || null,
    company_address: form.value.company_address || null,
    items: [
      {
        vehicle_id: vehicleId.value,
        qty: qty.value,
      },
    ],
  };

  try {
    const res = await OrderService.submitOrder(payload);
    successMessage.value =
      "Pesanan Anda berhasil dikirim! ID Pesanan: " + res.order_id;
    // Reset form
    form.value = {
      name: "",
      phone: "",
      email: "",
      address: "",
      company_name: "",
      company_address: "",
    };
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
    } else {
      console.error("Terjadi kesalahan:", err);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="input-group">
      <label>Nama Lengkap</label>
      <input v-model="form.name" type="text" />
      <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
    </div>

    <div class="input-group">
      <label>No. WhatsApp</label>
      <input
        v-model="form.phone"
        type="text"
        placeholder="Contoh: 628123456789"
      />
      <span v-if="errors.phone" class="error">{{ errors.phone[0] }}</span>
    </div>

    <div class="input-group">
      <label>Email</label>
      <input v-model="form.email" type="email" />
      <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? "Mengirim..." : "Kirim Pemesanan" }}
    </button>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </form>
</template>
```
