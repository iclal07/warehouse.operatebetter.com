export const resources = {
  tr: {
    translation: {
      nav: {
        dashboard: "Genel Bakış", products: "Ürünler", inventory: "Stok",
        warehouses: "Depolar", shelves: "Raflar", receipts: "Girişler",
        dispatches: "Çıkışlar", transfers: "Transferler", counts: "Sayım",
        movements: "Hareketler", settings: "Ayarlar",
      },
      common: {
        search: "Ara", filter: "Filtrele", save: "Kaydet", cancel: "Vazgeç",
        active: "Aktif", passive: "Pasif", all: "Tümü", loading: "Yükleniyor",
      },
      auth: {
        login: "Giriş yap", logout: "Oturumu kapat", forgotPassword: "Şifremi unuttum",
        email: "E-posta adresi", password: "Şifre",
      },
    },
  },
  en: {
    translation: {
      nav: {
        dashboard: "Overview", products: "Products", inventory: "Inventory",
        warehouses: "Warehouses", shelves: "Shelves", receipts: "Receipts",
        dispatches: "Dispatches", transfers: "Transfers", counts: "Stock Count",
        movements: "Movements", settings: "Settings",
      },
      common: {
        search: "Search", filter: "Filter", save: "Save", cancel: "Cancel",
        active: "Active", passive: "Passive", all: "All", loading: "Loading",
      },
      auth: {
        login: "Sign in", logout: "Sign out", forgotPassword: "Forgot password",
        email: "Email address", password: "Password",
      },
    },
  },
} as const;
