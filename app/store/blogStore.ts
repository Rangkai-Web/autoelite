import { defineStore } from "pinia";
import { useApi } from "~/services/api";
import type { BlogPost } from "~/types";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "May 29, 2026";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const normalizeBlog = (item: any): BlogPost => {
  let paragraphs = [] as string[];
  if (typeof item.content === "string") {
    if (item.content.includes("<p>") || item.content.includes("<ol>") || item.content.includes("<ul>")) {
      // Jika konten mengandung tag HTML kaya (seperti hasil WYSIWYG),
      // masukkan sebagai satu elemen HTML utuh dalam array agar v-html di frontend
      // merendernya secara utuh beserta format list, bold, dll.
      paragraphs = [item.content];
    } else {
      paragraphs = item.content.split("\n\n").filter(Boolean);
    }
  } else if (Array.isArray(item.content)) {
    paragraphs = item.content;
  }

  return {
    id: item.slug || String(item.id),
    title: item.title || "",
    excerpt: item.excerpt || "",
    content: paragraphs,
    category: item.category || "Tips & Trik",
    date: formatDate(item.published_at),
    author: item.author || "Admin Sentraoto",
    image: item.image || "",
    readTime: item.read_time || "5 Menit Baca",
  };
};

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [] as BlogPost[],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 9,
      total: 0,
    },
    blogDetail: null as BlogPost | null,
    loading: false,
    detailLoading: false,
  }),
  actions: {
    async fetchBlogs(params: any = {}, append = false) {
      this.loading = true;
      try {
        const api = useApi();
        const res = await api.getPosts(params);
        if (res && res.data) {
          const normalized = res.data.map(normalizeBlog);
          if (append) {
            this.blogs = [...this.blogs, ...normalized];
          } else {
            this.blogs = normalized;
          }
          this.meta = res.meta || {
            current_page: 1,
            last_page: 1,
            per_page: 9,
            total: this.blogs.length,
          };
        }
      } catch (error) {
        console.error("Gagal mengambil daftar berita:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchBlogDetail(slug: string) {
      this.detailLoading = true;
      this.blogDetail = null;
      try {
        const api = useApi();
        const data = await api.getPostDetail(slug);
        if (data) {
          this.blogDetail = normalizeBlog(data);
        }
      } catch (error) {
        console.error(`Gagal mengambil detail artikel ${slug}:`, error);
      } finally {
        this.detailLoading = false;
      }
    },
  },
});
