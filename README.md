# Operate Better Warehouse

Operate Better tasarım diliyle hazırlanmış depo yönetim sistemi MVP’si. Depo, raf, ürün, stok, mal kabul, mal çıkışı, transfer, sayım ve hareket geçmişi akışlarını içerir.

## Teknoloji

- Frontend: React 19, TypeScript, Vinext/Vite, Tailwind CSS, TanStack Query, Zustand, Zod, i18next
- Backend: NestJS, TypeScript, PostgreSQL, Prisma, Socket.io
- Altyapı: Docker Compose

## Dizinler

```text
app/                         # Çalışan dashboard ve ekranlar
src/
  app/                       # Provider ve global store
  features/                  # Feature bazlı tip, schema ve servisler
  i18n/                      # Türkçe ve İngilizce kaynaklar
  services/                  # API istemcisi
backend/
  prisma/                    # Veri modeli ve gerçekçi seed
  src/common/                # Ortak DTO'lar
  src/database/              # Prisma bağlantısı
  src/modules/               # NestJS feature modülleri
```

## Demo hesabı

```text
E-posta: demo@operatebetter.com
Şifre:   demo123
```

## Yerel kurulum

Frontend:

```bash
cp .env.example .env
npm install
npm run dev
```

Backend ve veritabanı:

```bash
docker compose up -d postgres
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

Frontend varsayılan olarak `http://localhost:3000`, API `http://localhost:4000/api/v1` adresini kullanır.

## Temel API

```text
POST /api/v1/auth/login
GET  /api/v1/dashboard
GET  /api/v1/products
POST /api/v1/products
GET  /api/v1/warehouses
GET  /api/v1/shelves
GET  /api/v1/stock
GET  /api/v1/stock-movements
POST /api/v1/receipts
POST /api/v1/dispatches
POST /api/v1/transfers
POST /api/v1/stock-counts
GET  /api/v1/search?q=
GET  /api/v1/notifications
```

## Stok bütünlüğü

Stok değişiklikleri yalnızca `InventoryService` üzerinden yapılır. Mal kabul, çıkış, transfer ve sayım belgeleri ile bunların stok bakiyesi ve hareket kayıtları tek PostgreSQL transaction’ında oluşturulur. Transfer ve stok düşümü `Serializable` izolasyonunda çalışır; kullanılabilir stok `quantity - reservedQuantity` olarak hesaplanır. Hareket geçmişi için silme endpoint’i bulunmaz.

Socket.io namespace’i `/inventory` altında şu olayları yayınlar:

```text
stock.updated
stock.received
stock.dispatched
stock.transferred
stock.counted
```

## Demo veri

Seed; 3 depo, 30 raf, 8 kategori, 100 ürün, stok bakiyeleri, kritik/tükenmiş ürünler, 50 geçmiş hareket, bildirimler ve demo kullanıcı oluşturur.
