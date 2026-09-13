import { MovementType, NotificationType, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const categoryNames = [
  "Elektronik", "Sarf Malzeme", "Raf Sistemleri", "İş Güvenliği",
  "Ambalaj", "Yedek Parça", "Ofis", "Temizlik",
];
const productPrefixes = [
  "Endüstriyel El Terminali", "Termal Etiket", "Çelik Raf Seti", "Koruyucu Eldiven",
  "Palet Streç Film", "Lityum Batarya", "Koli Bandı", "Transpalet Tekeri",
  "Barkod Okuyucu", "Plastik Saklama Kasası",
];
const units = ["Adet", "Rulo", "Set", "Çift", "Kutu"];

async function main() {
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.stockCountItem.deleteMany(),
    prisma.stockCount.deleteMany(),
    prisma.stockTransferItem.deleteMany(),
    prisma.stockTransfer.deleteMany(),
    prisma.goodsDispatchItem.deleteMany(),
    prisma.goodsDispatch.deleteMany(),
    prisma.goodsReceiptItem.deleteMany(),
    prisma.goodsReceipt.deleteMany(),
    prisma.stockMovement.deleteMany(),
    prisma.stockBalance.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.shelf.deleteMany(),
    prisma.warehouse.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const user = await prisma.user.create({
    data: {
      email: "demo@operatebetter.com",
      passwordHash: await hash("demo123", 12),
      firstName: "Mert",
      lastName: "Yılmaz",
    },
  });

  const categories = await Promise.all(categoryNames.map((name, index) =>
    prisma.category.create({
      data: { name, slug: `kategori-${index + 1}` },
    }),
  ));

  const warehouseData = [
    { name: "Ana Depo", code: "WH-IST-01", location: "İstanbul · Esenyurt", capacity: 18_900 },
    { name: "Avrupa Depo", code: "WH-IST-02", location: "İstanbul · İkitelli", capacity: 12_600 },
    { name: "Anadolu Depo", code: "WH-IST-03", location: "İstanbul · Tuzla", capacity: 9_450 },
  ];
  const warehouses = await Promise.all(warehouseData.map(data => prisma.warehouse.create({ data })));

  const shelves = [];
  for (const [warehouseIndex, warehouse] of warehouses.entries()) {
    for (let index = 0; index < 10; index += 1) {
      const zone = String.fromCharCode(65 + Math.floor(index / 3));
      shelves.push(await prisma.shelf.create({
        data: {
          warehouseId: warehouse.id,
          zone,
          code: `${zone}${String(index + 1).padStart(2, "0")}`,
          capacity: 900 + ((warehouseIndex + index) % 4) * 250,
        },
      }));
    }
  }

  const products = [];
  for (let index = 0; index < 100; index += 1) {
    const prefix = productPrefixes[index % productPrefixes.length];
    products.push(await prisma.product.create({
      data: {
        name: `${prefix} ${String.fromCharCode(65 + (index % 6))}${Math.floor(index / 6) + 1}`,
        sku: `OB-${String(index + 1).padStart(5, "0")}`,
        barcode: `869${String(1000000000 + index).padStart(10, "0")}`,
        categoryId: categories[index % categories.length].id,
        unit: units[index % units.length],
        minimumStock: 20 + (index % 4) * 10,
        description: "Operate Better Warehouse demo ürünü.",
      },
    }));
  }

  const balances = [];
  for (const [index, product] of products.entries()) {
    const warehouse = warehouses[index % warehouses.length];
    const warehouseShelves = shelves.filter(shelf => shelf.warehouseId === warehouse.id);
    const shelf = warehouseShelves[index % warehouseShelves.length];
    const minimum = 20 + (index % 4) * 10;
    const quantity = index % 9 === 0 ? index % 3 === 0 ? 0 : Math.max(1, minimum - 7) : 45 + ((index * 37) % 220);
    balances.push(await prisma.stockBalance.create({
      data: {
        productId: product.id,
        warehouseId: warehouse.id,
        shelfId: shelf.id,
        quantity,
        reservedQuantity: quantity > 20 ? index % 8 : 0,
      },
    }));
  }

  const movementTypes: MovementType[] = ["IN", "OUT", "TRANSFER", "ADJUSTMENT", "COUNT_CORRECTION"];
  for (let index = 0; index < 50; index += 1) {
    const product = products[(index * 7) % products.length];
    const sourceWarehouse = warehouses[index % warehouses.length];
    const targetWarehouse = warehouses[(index + 1) % warehouses.length];
    const sourceShelf = shelves.find(shelf => shelf.warehouseId === sourceWarehouse.id)!;
    const targetShelf = shelves.find(shelf => shelf.warehouseId === targetWarehouse.id)!;
    const type = movementTypes[index % movementTypes.length];
    await prisma.stockMovement.create({
      data: {
        type,
        productId: product.id,
        sourceWarehouseId: type === "IN" ? null : sourceWarehouse.id,
        sourceShelfId: type === "IN" ? null : sourceShelf.id,
        targetWarehouseId: type === "OUT" || type === "COUNT_CORRECTION" ? null : targetWarehouse.id,
        targetShelfId: type === "OUT" || type === "COUNT_CORRECTION" ? null : targetShelf.id,
        quantity: type === "COUNT_CORRECTION" ? -3 : 5 + (index % 25),
        userId: user.id,
        description: "Demo stok hareketi",
        createdAt: new Date(Date.now() - index * 42 * 60 * 1000),
      },
    });
  }

  const notifications: Array<{ type: NotificationType; title: string; message: string }> = [
    { type: "CRITICAL_STOCK", title: "Kritik stok", message: "9 ürün minimum stok seviyesinin altında." },
    { type: "OUT_OF_STOCK", title: "Stok tükendi", message: "3 ürünün kullanılabilir stoğu kalmadı." },
    { type: "RECEIPT_COMPLETED", title: "Mal kabul tamamlandı", message: "GR-20260727-001 başarıyla tamamlandı." },
    { type: "TRANSFER_COMPLETED", title: "Transfer tamamlandı", message: "Ana Depo → Avrupa Depo transferi tamamlandı." },
    { type: "COUNT_DIFFERENCE", title: "Sayım farkı", message: "A01 rafında -3 birim fark oluştu." },
  ];
  await prisma.notification.createMany({
    data: notifications.map(item => ({ ...item, userId: user.id })),
  });

  console.log({
    demoUser: "demo@operatebetter.com / demo123",
    warehouses: warehouses.length,
    shelves: shelves.length,
    categories: categories.length,
    products: products.length,
    balances: balances.length,
    movements: 50,
  });
}

main()
  .catch(error => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
