"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, Bell, Boxes, Building2,
  Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Command,
  LayoutDashboard, Menu, Moon, MoreHorizontal, Package, Plus, Search, Settings,
  Rows3, Sun, Warehouse, X, Zap, ScanLine, CircleAlert,
  TrendingUp, ArrowUpRight, SlidersHorizontal, Languages, LogOut
} from "lucide-react";

type Page = "dashboard" | "products" | "inventory" | "warehouses" | "shelves" |
  "receipts" | "dispatches" | "transfers" | "counts" | "movements" | "settings";
type Product = { id: number; name: string; sku: string; barcode: string; category: string; stock: number; min: number; unit: string; status: "active" | "passive" };
type Movement = { id: number; type: string; product: string; from: string; to: string; qty: number; user: string; time: string };

const tr = {
  nav: { dashboard:"Genel Bakış", products:"Ürünler", inventory:"Stok", warehouses:"Depolar", shelves:"Raflar", receipts:"Girişler", dispatches:"Çıkışlar", transfers:"Transferler", counts:"Sayım", movements:"Hareketler", settings:"Ayarlar" },
  title: { dashboard:"Depo Genel Bakış", products:"Ürünler", inventory:"Stok Durumu", warehouses:"Depolar", shelves:"Raf Yönetimi", receipts:"Mal Kabul", dispatches:"Mal Çıkışı", transfers:"Transferler", counts:"Stok Sayımı", movements:"Stok Hareketleri", settings:"Ayarlar" },
};
const en = {
  nav: { dashboard:"Overview", products:"Products", inventory:"Inventory", warehouses:"Warehouses", shelves:"Shelves", receipts:"Receipts", dispatches:"Dispatches", transfers:"Transfers", counts:"Stock Count", movements:"Movements", settings:"Settings" },
  title: { dashboard:"Warehouse Overview", products:"Products", inventory:"Inventory Status", warehouses:"Warehouses", shelves:"Shelf Management", receipts:"Goods Receipt", dispatches:"Goods Dispatch", transfers:"Transfers", counts:"Stock Count", movements:"Stock Movements", settings:"Settings" },
};

const initialProducts: Product[] = [
  { id:1, name:"Endüstriyel El Terminali X5", sku:"ELT-X5-001", barcode:"8690001000012", category:"Elektronik", stock:124, min:30, unit:"Adet", status:"active" },
  { id:2, name:"Termal Etiket 100×150", sku:"ETK-100-15", barcode:"8690001000029", category:"Sarf Malzeme", stock:18, min:50, unit:"Rulo", status:"active" },
  { id:3, name:"Çelik Raf Bağlantı Seti", sku:"RAF-BAG-24", barcode:"8690001000036", category:"Raf Sistemleri", stock:286, min:80, unit:"Set", status:"active" },
  { id:4, name:"Koruyucu İş Eldiveni", sku:"ISE-MAX-09", barcode:"8690001000043", category:"İş Güvenliği", stock:0, min:100, unit:"Çift", status:"active" },
  { id:5, name:"Palet Streç Film 17 Mic", sku:"STF-17-300", barcode:"8690001000050", category:"Ambalaj", stock:74, min:40, unit:"Rulo", status:"active" },
  { id:6, name:"Lityum Batarya Modülü", sku:"BAT-LI-48V", barcode:"8690001000067", category:"Elektronik", stock:12, min:15, unit:"Adet", status:"active" },
];
const initialMovements: Movement[] = [
  { id:1, type:"IN", product:"Endüstriyel El Terminali X5", from:"—", to:"Ana Depo · A01", qty:24, user:"Mert Yılmaz", time:"10 dk önce" },
  { id:2, type:"TRANSFER", product:"Çelik Raf Bağlantı Seti", from:"Ana Depo · B04", to:"Avrupa Depo · C02", qty:40, user:"Ayşe Kaya", time:"34 dk önce" },
  { id:3, type:"OUT", product:"Palet Streç Film 17 Mic", from:"Ana Depo · A08", to:"—", qty:12, user:"Mert Yılmaz", time:"1 sa önce" },
  { id:4, type:"COUNT_CORRECTION", product:"Termal Etiket 100×150", from:"Anadolu Depo · D03", to:"—", qty:-3, user:"Deniz Öz", time:"2 sa önce" },
  { id:5, type:"IN", product:"Lityum Batarya Modülü", from:"—", to:"Avrupa Depo · C06", qty:8, user:"Ayşe Kaya", time:"3 sa önce" },
];
const warehouses = [
  {name:"Ana Depo", code:"WH-IST-01", location:"İstanbul · Esenyurt", shelves:14, products:68, occupancy:78, color:"#5b5bd6"},
  {name:"Avrupa Depo", code:"WH-IST-02", location:"İstanbul · İkitelli", shelves:9, products:42, occupancy:62, color:"#16a085"},
  {name:"Anadolu Depo", code:"WH-IST-03", location:"İstanbul · Tuzla", shelves:7, products:31, occupancy:44, color:"#e59a32"},
];

const icons: Record<Page, typeof Package> = {
  dashboard:LayoutDashboard, products:Package, inventory:Boxes, warehouses:Warehouse,
  shelves:Rows3, receipts:ArrowDownToLine, dispatches:ArrowUpFromLine, transfers:ArrowLeftRight,
  counts:ClipboardCheck, movements:TrendingUp, settings:Settings
};
const navGroups: Page[][] = [["dashboard"],["products","inventory"],["warehouses","shelves"],["receipts","dispatches","transfers","counts"],["movements"],["settings"]];

export function WarehouseApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"tr"|"en">("tr");
  const [products, setProducts] = useState(initialProducts);
  const [movements, setMovements] = useState(initialMovements);
  const [modal, setModal] = useState<null | "product" | "receipt" | "dispatch" | "transfer" | "count" | "scan">(null);
  const [search, setSearch] = useState("");
  const t = lang === "tr" ? tr : en;
  const critical = products.filter(p => p.stock <= p.min);
  const totalStock = products.reduce((a,p)=>a+p.stock,0);
  useEffect(() => {
    const requestedPage = new URLSearchParams(window.location.search).get("page") as Page | null;
    if (requestedPage && requestedPage in icons) setPage(requestedPage);
    const savedTheme = localStorage.getItem("warehouse-theme");
    setDark(savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    setLang(localStorage.getItem("warehouse-language") === "en" ? "en" : "tr");
  }, []);
  useEffect(() => localStorage.setItem("warehouse-theme", dark ? "dark" : "light"), [dark]);
  useEffect(() => localStorage.setItem("warehouse-language", lang), [lang]);

  const navigate = (next: Page) => {
    setPage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("page", next);
    window.history.replaceState({}, "", url);
  };

  const act = (kind: string, productId: number, qty: number) => {
    const p = products.find(item => item.id === productId)!;
    let delta = qty;
    if (kind === "OUT") delta = -qty;
    if (kind === "TRANSFER") delta = 0;
    if (kind === "COUNT_CORRECTION") delta = qty - p.stock;
    setProducts(list => list.map(item => item.id === productId ? {...item, stock: Math.max(0,item.stock+delta)} : item));
    setMovements(list => [{id:Date.now(),type:kind,product:p.name,from:kind==="IN"?"—":"Ana Depo · A01",to:kind==="OUT"||kind==="COUNT_CORRECTION"?"—":"Avrupa Depo · C02",qty:kind==="COUNT_CORRECTION"?delta:qty,user:"Demo Kullanıcı",time:"Şimdi"},...list]);
    setModal(null);
  };

  if (!authenticated) {
    return <AuthScreen dark={dark} onTheme={()=>setDark(v=>!v)} onLogin={()=>setAuthenticated(true)}/>;
  }

  return <div className={dark ? "app dark" : "app"}>
    <aside className={`sidebar ${collapsed?"collapsed":""} ${mobileOpen?"mobile-open":""}`}>
      <div className="brand">
        <div className="brand-mark"><Command size={20}/></div>
        {!collapsed && <div><strong>operate better</strong><span>WAREHOUSE</span></div>}
        <button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={18}/></button>
      </div>
      <nav>
        {navGroups.map((group,gi)=><div className="nav-group" key={gi}>
          {group.map(item=>{ const Icon=icons[item]; return <button key={item} className={page===item?"active":""} onClick={()=>{navigate(item);setMobileOpen(false)}}>
            <Icon size={18}/>{!collapsed&&<span>{t.nav[item]}</span>}
            {item==="products"&&!collapsed&&<em>{products.length}</em>}
          </button>})}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        {!collapsed && <div className="capacity-card"><div><span>Depo kapasitesi</span><b>68%</b></div><div className="bar"><i style={{width:"68%"}}/></div><small>12.840 / 18.900 birim</small></div>}
        <button className="collapse" onClick={()=>setCollapsed(v=>!v)}><ChevronLeft size={17}/>{!collapsed&&<span>Menüyü daralt</span>}</button>
      </div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button>
        <div className="search-wrap"><Search size={18}/><input aria-label="Global search" placeholder="Ürün, SKU, depo veya raf ara..." value={search} onChange={e=>setSearch(e.target.value)}/><kbd>⌘ K</kbd></div>
        <div className="top-actions">
          <button onClick={()=>setLang(v=>v==="tr"?"en":"tr")} title="Dil"><Languages size={19}/><span className="lang">{lang.toUpperCase()}</span></button>
          <button onClick={()=>setDark(v=>!v)} title="Tema">{dark?<Sun size={19}/>:<Moon size={19}/>}</button>
          <button className="notify"><Bell size={19}/><i/></button>
          <div className="avatar">MY</div><div className="user"><b>Mert Yılmaz</b><span>Depo Yöneticisi</span></div><ChevronDown size={16}/>
        </div>
      </header>
      <div className="content">
        <div className="page-head">
          <div><div className="eyebrow">OPERATE BETTER / {t.nav[page].toUpperCase()}</div><h1>{t.title[page]}</h1><p>{page==="dashboard"?"Tüm depo operasyonlarınızı tek ekrandan takip edin.":`${t.title[page]} kayıtlarını görüntüleyin ve yönetin.`}</p></div>
          <PageActions page={page} open={setModal}/>
        </div>
        {page==="dashboard" && <Dashboard products={products} movements={movements} total={totalStock} open={setModal} go={navigate}/>}
        {page==="products" && <ProductsPage products={products} query={search} open={setModal}/>}
        {page==="warehouses" && <WarehousesPage/>}
        {page==="inventory" && <InventoryPage products={products}/>}
        {page==="shelves" && <ShelvesPage products={products} movements={movements} open={setModal}/>}
        {["receipts","dispatches","transfers","counts"].includes(page) && <OperationsPage page={page} movements={movements} open={setModal}/>}
        {page==="movements" && <MovementTable data={movements} full/>}
        {page==="settings" && <SettingsPage dark={dark} setDark={setDark} lang={lang} setLang={setLang} logout={()=>setAuthenticated(false)}/>}
      </div>
    </main>
    {modal && <Modal kind={modal} products={products} close={()=>setModal(null)} act={act} addProduct={(p)=>{setProducts(v=>[...v,{...p,id:Date.now(),stock:0,status:"active"}]);setModal(null)}}/>}
  </div>;
}

function PageActions({page,open}:{page:Page;open:(x:any)=>void}) {
  const map:any={products:["product","Yeni ürün"],receipts:["receipt","Mal kabul oluştur"],dispatches:["dispatch","Çıkış oluştur"],transfers:["transfer","Transfer oluştur"],counts:["count","Sayım başlat"]};
  return <div className="head-actions"><button className="scan-btn" onClick={()=>open("scan")}><ScanLine size={17}/> Barkod tara</button>{map[page]&&<button className="primary" onClick={()=>open(map[page][0])}><Plus size={17}/>{map[page][1]}</button>}</div>
}

function Dashboard({products,movements,total,open,go}:{products:Product[];movements:Movement[];total:number;open:(x:any)=>void;go:(x:Page)=>void}) {
  const cards=[
    {label:"Toplam Ürün",value:products.length.toString(),sub:"+8 bu ay",icon:Package,tone:"indigo"},
    {label:"Toplam Stok",value:total.toLocaleString("tr-TR"),sub:"3 depoda",icon:Boxes,tone:"teal"},
    {label:"Kritik Stok",value:products.filter(p=>p.stock<=p.min).length.toString(),sub:"İlgilenilmesi gerekiyor",icon:CircleAlert,tone:"orange"},
    {label:"Bugünkü Giriş",value:"1.284",sub:"+12,4% düne göre",icon:ArrowDownToLine,tone:"blue"},
    {label:"Bugünkü Çıkış",value:"946",sub:"+8,2% düne göre",icon:ArrowUpFromLine,tone:"purple"},
    {label:"Bekleyen İşlem",value:"7",sub:"3 transfer · 4 sayım",icon:ClipboardCheck,tone:"slate"},
  ];
  return <>
    <section className="metric-grid">{cards.map(({label,value,sub,icon:Icon,tone})=><article className="metric" key={label}><div className={`metric-icon ${tone}`}><Icon size={20}/></div><span>{label}</span><strong>{value}</strong><small>{sub}</small></article>)}</section>
    <section className="dashboard-grid">
      <div className="panel movements-panel"><PanelHead title="Son stok hareketleri" subtitle="Tüm depolardaki güncel işlemler" action="Tümünü gör" onClick={()=>go("movements")}/><MovementTable data={movements.slice(0,5)}/></div>
      <div className="panel critical-panel"><PanelHead title="Kritik stok" subtitle="Minimum seviyenin altındaki ürünler" action="Tümünü gör" onClick={()=>go("products")}/><div className="critical-list">{products.filter(p=>p.stock<=p.min).map(p=><div className="critical-row" key={p.id}><div className="product-cube">{p.name.slice(0,2).toUpperCase()}</div><div><b>{p.name}</b><span>{p.sku}</span></div><div className={p.stock===0?"stock zero":"stock"}><b>{p.stock}</b><span>/ min. {p.min}</span></div></div>)}</div></div>
      <div className="panel occupancy"><PanelHead title="Depo doluluk özeti" subtitle="Kullanılabilir kapasite görünümü"/><div className="warehouse-bars">{warehouses.map(w=><div key={w.code}><div className="wh-line"><span><i style={{background:w.color}}/>{w.name}</span><b>{w.occupancy}%</b></div><div className="bar large"><i style={{width:`${w.occupancy}%`,background:w.color}}/></div><small>{Math.round(w.occupancy*63)} / 6.300 birim</small></div>)}</div></div>
      <div className="panel quick"><PanelHead title="Hızlı işlemler" subtitle="Sık kullanılan depo operasyonları"/><div className="quick-grid"><button onClick={()=>open("receipt")}><span className="q green"><ArrowDownToLine/></span><b>Mal kabul</b><small>Stoğa ürün ekle</small><ArrowUpRight className="arrow"/></button><button onClick={()=>open("dispatch")}><span className="q orange"><ArrowUpFromLine/></span><b>Mal çıkışı</b><small>Stoktan ürün düş</small><ArrowUpRight className="arrow"/></button><button onClick={()=>open("transfer")}><span className="q purple"><ArrowLeftRight/></span><b>Transfer</b><small>Depolar arası taşı</small><ArrowUpRight className="arrow"/></button><button onClick={()=>open("count")}><span className="q blue"><ClipboardCheck/></span><b>Stok sayımı</b><small>Miktarları doğrula</small><ArrowUpRight className="arrow"/></button></div></div>
    </section>
  </>
}

function PanelHead({title,subtitle,action,onClick}:{title:string;subtitle:string;action?:string;onClick?:()=>void}){return <div className="panel-head"><div><h2>{title}</h2><p>{subtitle}</p></div>{action&&<button onClick={onClick}>{action}<ChevronRight size={15}/></button>}</div>}

function MovementTable({data,full=false}:{data:Movement[];full?:boolean}) {
  const style:any={IN:["in","Giriş",ArrowDownToLine],OUT:["out","Çıkış",ArrowUpFromLine],TRANSFER:["transfer","Transfer",ArrowLeftRight],COUNT_CORRECTION:["count","Sayım farkı",ClipboardCheck]};
  return <div className="table-wrap"><table><thead><tr><th>İŞLEM</th><th>ÜRÜN</th><th>KONUM</th><th>MİKTAR</th>{full&&<th>KULLANICI</th>}<th>ZAMAN</th><th/></tr></thead><tbody>{data.map(m=>{let [cls,label,Icon]=style[m.type]||style.IN;return <tr key={m.id}><td><span className={`type ${cls}`}><Icon size={14}/>{label}</span></td><td><b>{m.product}</b><span className="cell-sub">#{String(m.id).slice(-5)}</span></td><td><span className="route">{m.from}<ArrowLeftRight size={12}/>{m.to}</span></td><td><b className={m.qty<0?"negative":""}>{m.qty>0?"+":""}{m.qty}</b></td>{full&&<td>{m.user}</td>}<td><span className="muted">{m.time}</span></td><td><MoreHorizontal size={17}/></td></tr>})}</tbody></table></div>
}

function ProductsPage({products,query,open}:{products:Product[];query:string;open:(x:any)=>void}) {
  const filtered=products.filter(p=>(p.name+p.sku+p.barcode).toLowerCase().includes(query.toLowerCase()));
  return <div className="panel list-panel"><div className="list-tools"><div className="inline-search"><Search size={17}/><input placeholder="Ürünlerde ara..."/></div><button><SlidersHorizontal size={16}/> Kategori: Tümü <ChevronDown size={14}/></button><button>Stok: Tümü <ChevronDown size={14}/></button><span className="spacer"/><small>{filtered.length} ürün</small></div><div className="table-wrap"><table><thead><tr><th>ÜRÜN</th><th>SKU / BARKOD</th><th>KATEGORİ</th><th>TOPLAM STOK</th><th>MİN. STOK</th><th>DURUM</th><th/></tr></thead><tbody>{filtered.map(p=><tr key={p.id}><td><div className="product-cell"><div className="product-cube">{p.name.slice(0,2).toUpperCase()}</div><b>{p.name}</b></div></td><td><b>{p.sku}</b><span className="cell-sub">{p.barcode}</span></td><td><span className="category">{p.category}</span></td><td><b className={p.stock<=p.min?"negative":""}>{p.stock} {p.unit}</b></td><td>{p.min} {p.unit}</td><td><span className={`status ${p.stock===0?"danger":p.stock<=p.min?"warning":"success"}`}><i/>{p.stock===0?"Tükendi":p.stock<=p.min?"Kritik":"Stokta"}</span></td><td><button className="icon-btn"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div><Pagination count={filtered.length}/></div>
}

function WarehousesPage(){return <div className="warehouse-grid">{warehouses.map((w,i)=><article className="warehouse-card" key={w.code}><div className="wh-card-top"><div className="warehouse-icon"><Building2/></div><button><MoreHorizontal/></button></div><h3>{w.name}</h3><span>{w.code}</span><p>{w.location}</p><div className="wh-stats"><div><span>Toplam raf</span><b>{w.shelves}</b></div><div><span>Ürün çeşidi</span><b>{w.products}</b></div></div><div className="wh-line"><span>Doluluk oranı</span><b>{w.occupancy}%</b></div><div className="bar large"><i style={{width:`${w.occupancy}%`,background:w.color}}/></div><button className="detail">Depo detayını görüntüle <ChevronRight size={16}/></button></article>)}</div>}

function InventoryPage({products}:{products:Product[]}){return <div className="panel list-panel"><div className="list-tools"><button><Building2 size={16}/> Tüm depolar <ChevronDown size={14}/></button><button><Rows3 size={16}/> Tüm raflar <ChevronDown size={14}/></button><span className="spacer"/><span className="live"><i/> Canlı</span></div><div className="table-wrap"><table><thead><tr><th>ÜRÜN</th><th>DEPO</th><th>RAF</th><th>MİKTAR</th><th>REZERVE</th><th>KULLANILABİLİR</th><th/></tr></thead><tbody>{products.map((p,i)=><tr key={p.id}><td><b>{p.name}</b><span className="cell-sub">{p.sku}</span></td><td>{warehouses[i%3].name}</td><td><span className="shelf-code">{["A01","A08","B04","D03","C02","C06"][i]}</span></td><td><b>{p.stock}</b></td><td>{Math.min(8,Math.floor(p.stock/10))}</td><td><b>{Math.max(0,p.stock-Math.min(8,Math.floor(p.stock/10)))}</b></td><td><MoreHorizontal size={17}/></td></tr>)}</tbody></table></div></div>}

interface ShelfDef {
  code: string;
  zone: string;
  type: string;
  capacity: number;
}

const warehouseShelvesMap: Record<string, ShelfDef[]> = {
  "WH-IST-01": [
    { code: "A01", zone: "A", type: "Standart palet rafı", capacity: 2500 },
    { code: "A02", zone: "A", type: "Standart palet rafı", capacity: 2500 },
    { code: "A03", zone: "A", type: "Ağır yük palet rafı", capacity: 3000 },
    { code: "A04", zone: "A", type: "Hızlı erişim rafı", capacity: 2000 },
    { code: "B01", zone: "B", type: "Küçük parça rafı", capacity: 1800 },
    { code: "B02", zone: "B", type: "Küçük parça rafı", capacity: 1800 },
    { code: "B03", zone: "B", type: "Kutu ve sarf rafı", capacity: 2200 },
    { code: "B04", zone: "B", type: "Ağır yük rafı", capacity: 2800 },
    { code: "C01", zone: "C", type: "Konsol raf sistemi", capacity: 1500 },
    { code: "C02", zone: "C", type: "Standart palet rafı", capacity: 2500 },
    { code: "C03", zone: "C", type: "Standart palet rafı", capacity: 2500 },
    { code: "C04", zone: "C", type: "Ambalaj sarf rafı", capacity: 2000 },
    { code: "D01", zone: "D", type: "Mezanin kat rafı", capacity: 3200 },
    { code: "D02", zone: "D", type: "Mezanin kat rafı", capacity: 3200 },
  ],
  "WH-IST-02": [
    { code: "A01", zone: "A", type: "Standart palet rafı", capacity: 2000 },
    { code: "A02", zone: "A", type: "Standart palet rafı", capacity: 2000 },
    { code: "A03", zone: "A", type: "Hızlı çıkış rafı", capacity: 1800 },
    { code: "B01", zone: "B", type: "Küçük parça rafı", capacity: 1500 },
    { code: "B02", zone: "B", type: "Küçük parça rafı", capacity: 1500 },
    { code: "B03", zone: "B", type: "Ağır yük rafı", capacity: 2400 },
    { code: "C01", zone: "C", type: "Standart palet rafı", capacity: 2500 },
    { code: "C02", zone: "C", type: "Standart palet rafı", capacity: 2500 },
    { code: "C03", zone: "C", type: "Konsol raf sistemi", capacity: 1600 },
  ],
  "WH-IST-03": [
    { code: "A01", zone: "A", type: "Standart palet rafı", capacity: 1800 },
    { code: "A02", zone: "A", type: "Standart palet rafı", capacity: 1800 },
    { code: "B01", zone: "B", type: "Küçük parça rafı", capacity: 1400 },
    { code: "B02", zone: "B", type: "Küçük parça rafı", capacity: 1400 },
    { code: "B03", zone: "B", type: "Ağır yük rafı", capacity: 2200 },
    { code: "C01", zone: "C", type: "Standart palet rafı", capacity: 2000 },
    { code: "C02", zone: "C", type: "Ambalaj sarf rafı", capacity: 1600 },
  ],
};

function getShelfItems(shelfCode: string, whCode: string, products: Product[]) {
  if (!products.length) return [];
  const seed = shelfCode.charCodeAt(0) * 19 + parseInt(shelfCode.slice(1) || "1", 10) * 29 + whCode.charCodeAt(whCode.length - 1) * 11;
  const count = (seed % 3) + 2;
  const items: { product: Product; qty: number }[] = [];
  
  for (let i = 0; i < count; i++) {
    const pIdx = (seed + i * 5) % products.length;
    const p = products[pIdx];
    if (p && !items.some(it => it.product.id === p.id)) {
      const baseQty = Math.max(12, ((seed * (i + 3)) % 420) + 25);
      const qty = p.stock === 0 ? 0 : Math.min(p.stock, baseQty);
      items.push({ product: p, qty });
    }
  }
  return items;
}

function ShelvesPage({ products, movements = [], open }: { products: Product[]; movements?: Movement[]; open?: (x: any) => void }) {
  const [whCode, setWhCode] = useState("WH-IST-01");
  const [selectedCode, setSelectedCode] = useState("A01");
  const [search, setSearch] = useState("");
  const [collapsedZones, setCollapsedZones] = useState<Record<string, boolean>>({});

  const currentWh = warehouses.find(w => w.code === whCode) || warehouses[0];
  const list = warehouseShelvesMap[whCode] || warehouseShelvesMap["WH-IST-01"];
  const zones = Array.from(new Set(list.map(s => s.zone))).sort();

  const filtered = list.filter(s =>
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.zone.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );

  const selectedShelf = list.find(s => s.code === selectedCode) || list[0];
  const shelfItems = getShelfItems(selectedShelf.code, whCode, products);
  const totalQty = shelfItems.reduce((acc, it) => acc + it.qty, 0);
  const occupancy = Math.min(100, Math.round((totalQty / selectedShelf.capacity) * 100));
  const filledBlocks = Math.max(occupancy > 0 ? 1 : 0, Math.min(8, Math.round((occupancy / 100) * 8)));

  const toggleZone = (z: string) => setCollapsedZones(prev => ({ ...prev, [z]: !prev[z] }));

  const relatedMovements = movements.filter(m =>
    m.from.includes(selectedShelf.code) || m.to.includes(selectedShelf.code) ||
    m.to.includes(currentWh.name)
  ).slice(0, 3);

  return (
    <div className="shelves-layout">
      <div className="panel zone-tree">
        <PanelHead title="Raf yapısı" subtitle={`${currentWh.name} (${list.length} raf)`} />
        
        <div className="wh-selector">
          {warehouses.map(w => (
            <button
              key={w.code}
              className={whCode === w.code ? "active" : ""}
              onClick={() => {
                setWhCode(w.code);
                const first = (warehouseShelvesMap[w.code] || [])[0];
                if (first) setSelectedCode(first.code);
              }}
            >
              {w.name}
            </button>
          ))}
        </div>

        <div className="zone-search">
          <input
            placeholder="Raf veya bölge ara (örn: A01, B)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {zones.map((z) => {
          const zoneShelves = filtered.filter(x => x.zone === z);
          if (zoneShelves.length === 0 && search) return null;
          const isCollapsed = !!collapsedZones[z];
          const allInZone = list.filter(x => x.zone === z);
          
          return (
            <div className="zone" key={z}>
              <div onClick={() => toggleZone(z)} title="Bölgeyi daralt/genişlet">
                <ChevronDown
                  size={15}
                  style={{
                    transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                    transition: "transform .2s"
                  }}
                />
                <b>Bölge {z}</b>
                <span>{allInZone.length} raf</span>
              </div>
              
              {!isCollapsed && zoneShelves.map(s => {
                const sItems = getShelfItems(s.code, whCode, products);
                const sTotal = sItems.reduce((acc, it) => acc + it.qty, 0);
                const sOcc = Math.min(100, Math.round((sTotal / s.capacity) * 100));
                const isSelected = selectedShelf.code === s.code;

                return (
                  <button
                    key={s.code}
                    className={isSelected ? "active" : ""}
                    onClick={() => setSelectedCode(s.code)}
                  >
                    <Rows3 size={15} />
                    <b>{s.code}</b>
                    <span>{sOcc}%</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="panel shelf-detail">
        <div className="shelf-hero">
          <div className="warehouse-icon"><Rows3 /></div>
          <div>
            <span>{currentWh.name.toUpperCase()} · BÖLGE {selectedShelf.zone}</span>
            <h2>Raf {selectedShelf.code}</h2>
            <p>{selectedShelf.type} · {selectedShelf.capacity.toLocaleString("tr-TR")} birim kapasite</p>
          </div>
          <div className="shelf-actions">
            {open && (
              <>
                <button onClick={() => open("receipt")} title="Bu rafa mal kabul yap">
                  <ArrowDownToLine size={14} /> Giriş
                </button>
                <button onClick={() => open("transfer")} title="Bu raftan transfer yap">
                  <ArrowLeftRight size={14} /> Transfer
                </button>
                <button onClick={() => open("count")} title="Bu rafta sayım yap">
                  <ClipboardCheck size={14} /> Sayım
                </button>
              </>
            )}
            <span className={`status ${occupancy >= 90 ? "warning" : occupancy === 0 ? "" : "success"}`}>
              <i />
              {occupancy >= 90 ? "Dolu" : occupancy === 0 ? "Boş" : "Aktif"}
            </span>
          </div>
        </div>

        <div className="shelf-metrics">
          <div>
            <span>Doluluk</span>
            <b style={{ color: occupancy >= 90 ? "var(--orange)" : "inherit" }}>{occupancy}%</b>
          </div>
          <div>
            <span>Ürün çeşidi</span>
            <b>{shelfItems.length}</b>
          </div>
          <div>
            <span>Toplam miktar</span>
            <b>{totalQty.toLocaleString("tr-TR")}</b>
          </div>
        </div>

        <div className="shelf-visual">
          <span>DOLULUK GÖRÜNÜMÜ ({occupancy}%)</span>
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(x => (
              <i key={x} className={x <= filledBlocks ? "filled" : ""} />
            ))}
          </div>
          <small>
            {totalQty.toLocaleString("tr-TR")} / {selectedShelf.capacity.toLocaleString("tr-TR")} birim kullanılıyor
            {selectedShelf.capacity - totalQty > 0 && ` (${(selectedShelf.capacity - totalQty).toLocaleString("tr-TR")} birim boş alan)`}
          </small>
        </div>

        <PanelHead
          title={`Raftaki ürünler (${shelfItems.length})`}
          subtitle={`Raf ${selectedShelf.code} üzerindeki güncel envanter`}
        />

        {shelfItems.length === 0 ? (
          <div className="empty-shelf">Bu rafta henüz kayıtlı ürün bulunmuyor.</div>
        ) : (
          <div className="mini-products">
            {shelfItems.map(({ product: p, qty }) => (
              <div key={p.id}>
                <div className="product-cube">{p.name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <b>{p.name}</b>
                  <span>{p.sku} · {p.category}</span>
                </div>
                <div style={{ textAlign: "right", marginRight: "10px" }}>
                  <span className={`status ${p.stock === 0 ? "danger" : p.stock <= p.min ? "warning" : "success"}`}>
                    <i />{p.stock === 0 ? "Tükendi" : p.stock <= p.min ? "Kritik" : "Stokta"}
                  </span>
                </div>
                <strong>
                  {qty} <small>{p.unit}</small>
                </strong>
              </div>
            ))}
          </div>
        )}

        {relatedMovements.length > 0 && (
          <>
            <div style={{ marginTop: "15px" }}>
              <PanelHead
                title="İlgili Son Hareketler"
                subtitle="Bu raf ve depo ile ilişkili hareketler"
              />
            </div>
            <div style={{ padding: "0 15px" }}>
              <MovementTable data={relatedMovements} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OperationsPage({page,movements,open}:{page:string;movements:Movement[];open:(x:any)=>void}){const type=page==="receipts"?"IN":page==="dispatches"?"OUT":page==="transfers"?"TRANSFER":"COUNT_CORRECTION";return <div className="panel list-panel"><div className="operation-banner"><div className="warehouse-icon">{page==="receipts"?<ArrowDownToLine/>:page==="dispatches"?<ArrowUpFromLine/>:page==="transfers"?<ArrowLeftRight/>:<ClipboardCheck/>}</div><div><b>{page==="receipts"?"Mal kabul işlemleri":page==="dispatches"?"Mal çıkış işlemleri":page==="transfers"?"Depolar arası transferler":"Stok sayımları"}</b><span>Tüm işlemler kayıt altına alınır ve stok anında güncellenir.</span></div><button className="primary" onClick={()=>open(page==="receipts"?"receipt":page==="dispatches"?"dispatch":page==="transfers"?"transfer":"count")}><Plus size={16}/>Yeni işlem</button></div><MovementTable data={movements.filter(m=>m.type===type)} full/></div>}

function SettingsPage({dark,setDark,lang,setLang,logout}:any){return <div className="settings-grid"><div className="panel settings-card"><h2>Görünüm</h2><p>Uygulama temasını ve görünüm tercihlerini yönetin.</p><label><span><Sun size={18}/><b>Arayüz teması</b></span><select value={dark?"dark":"light"} onChange={e=>setDark(e.target.value==="dark")}><option value="light">Açık tema</option><option value="dark">Koyu tema</option></select></label><label><span><Languages size={18}/><b>Arayüz dili</b></span><select value={lang} onChange={e=>setLang(e.target.value)}><option value="tr">Türkçe</option><option value="en">English</option></select></label></div><div className="panel settings-card"><h2>Hesap</h2><p>Demo kullanıcı bilgileri.</p><div className="account-row"><div className="avatar large">MY</div><div><b>Mert Yılmaz</b><span>mert@operatebetter.com</span></div></div><button className="danger-button" onClick={logout}><LogOut size={17}/>Oturumu kapat</button></div></div>}

function AuthScreen({dark,onTheme,onLogin}:{dark:boolean;onTheme:()=>void;onLogin:()=>void}) {
  const [forgot,setForgot]=useState(false);
  return <div className={dark?"auth-page dark":"auth-page"}>
    <div className="auth-aside">
      <div className="auth-brand"><div className="brand-mark"><Command size={21}/></div><div><strong>operate better</strong><span>WAREHOUSE</span></div></div>
      <div className="auth-copy"><span>AKILLI DEPO OPERASYONLARI</span><h1>Stoklarınız her zaman doğru yerde.</h1><p>Depo, raf ve stok hareketlerinizi tek merkezden yönetin. Gerçek zamanlı görünürlükle daha hızlı karar alın.</p><div className="auth-points"><div><Check/>Anlık stok takibi</div><div><Check/>Hatasız transfer ve sayım</div><div><Check/>Uçtan uca hareket geçmişi</div></div></div>
      <small>© 2026 Operate Better. Tüm hakları saklıdır.</small>
    </div>
    <div className="auth-main">
      <button className="auth-theme" onClick={onTheme}>{dark?<Sun/>:<Moon/>}</button>
      <div className="auth-card">
        <div className="mobile-auth-brand"><div className="brand-mark"><Command size={20}/></div><strong>operate better</strong></div>
        <span className="eyebrow">{forgot?"HESAP KURTARMA":"TEKRAR HOŞ GELDİNİZ"}</span>
        <h2>{forgot?"Şifrenizi yenileyin":"Hesabınıza giriş yapın"}</h2>
        <p>{forgot?"E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.":"Depo operasyonlarınıza kaldığınız yerden devam edin."}</p>
        <form onSubmit={event=>{event.preventDefault();forgot?setForgot(false):onLogin()}}>
          <div className="field"><label>E-posta adresi</label><input type="email" defaultValue="demo@operatebetter.com" required/></div>
          {!forgot&&<div className="field"><div className="label-row"><label>Şifre</label><button type="button" onClick={()=>setForgot(true)}>Şifremi unuttum</button></div><input type="password" defaultValue="demo123" required/></div>}
          <button className="primary auth-submit" type="submit">{forgot?"Sıfırlama bağlantısı gönder":"Giriş yap"}<ArrowUpRight size={17}/></button>
          {forgot&&<button className="back-login" type="button" onClick={()=>setForgot(false)}>Giriş ekranına dön</button>}
        </form>
        {!forgot&&<div className="demo-credentials"><Zap size={16}/><div><b>Demo hesabı</b><span>demo@operatebetter.com · demo123</span></div></div>}
      </div>
    </div>
  </div>
}

function Pagination({count}:{count:number}){return <div className="pagination"><span>Toplam {count} kayıttan 1–{count} arası</span><div><button disabled><ChevronLeft size={15}/></button><button className="current">1</button><button><ChevronRight size={15}/></button></div></div>}

function Modal({kind,products,close,act,addProduct}:{kind:string;products:Product[];close:()=>void;act:(k:string,p:number,q:number)=>void;addProduct:(p:any)=>void}) {
  const [pid,setPid]=useState(products[0]?.id||1); const [qty,setQty]=useState(10); const [name,setName]=useState(""); const [sku,setSku]=useState(""); const [barcode,setBarcode]=useState("");
  const titles:any={product:"Yeni ürün oluştur",receipt:"Mal kabul oluştur",dispatch:"Mal çıkışı oluştur",transfer:"Stok transferi",count:"Stok sayımı",scan:"Barkod tara"};
  if(kind==="scan") return <div className="modal-backdrop"><div className="modal scan-modal"><button className="modal-x" onClick={close}><X/></button><div className="scan-icon"><ScanLine/></div><h2>Barkod tara</h2><p>Okuyucu ile barkodu tarayın veya demo barkodu seçin.</p><div className="field"><label>Barkod</label><div className="barcode-input"><ScanLine size={18}/><input autoFocus placeholder="Barkod bekleniyor..." /></div></div><div className="demo-scan"><span>DEMO SİMÜLATÖRÜ</span>{products.slice(0,3).map(p=><button key={p.id} onClick={()=>{setPid(p.id)}}><div><b>{p.name}</b><small>{p.barcode}</small></div><Zap size={16}/></button>)}</div><button className="primary full" onClick={close}><ScanLine size={17}/>Seçili barkodu tara</button></div></div>;
  const isProduct=kind==="product"; const selected=products.find(p=>p.id===pid);
  const submit=()=>{if(isProduct)addProduct({name:name||"Yeni Demo Ürün",sku:sku||`NEW-${Date.now().toString().slice(-4)}`,barcode:barcode||"8690001999999",category:"Genel",min:10,unit:"Adet"});else act(kind==="receipt"?"IN":kind==="dispatch"?"OUT":kind==="transfer"?"TRANSFER":"COUNT_CORRECTION",pid,qty)};
  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow">YENİ İŞLEM</span><h2>{titles[kind]}</h2></div><button onClick={close}><X size={19}/></button></div><div className="modal-body">{isProduct?<><div className="field"><label>Ürün adı</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Örn. Endüstriyel el terminali"/></div><div className="form-row"><div className="field"><label>SKU</label><input value={sku} onChange={e=>setSku(e.target.value)} placeholder="SKU-001"/></div><div className="field"><label>Barkod</label><input value={barcode} onChange={e=>setBarcode(e.target.value)} placeholder="869..."/></div></div><div className="form-row"><div className="field"><label>Kategori</label><select><option>Genel</option><option>Elektronik</option><option>Ambalaj</option></select></div><div className="field"><label>Birim</label><select><option>Adet</option><option>Rulo</option><option>Set</option></select></div></div><div className="field"><label>Minimum stok</label><input type="number" defaultValue={10}/></div></>:<><div className="field"><label>Ürün</label><select value={pid} onChange={e=>setPid(Number(e.target.value))}>{products.map(p=><option value={p.id} key={p.id}>{p.name} · {p.stock} {p.unit}</option>)}</select></div>{kind==="transfer"&&<div className="form-row"><div className="field"><label>Kaynak depo / raf</label><select><option>Ana Depo · A01</option></select></div><div className="field"><label>Hedef depo / raf</label><select><option>Avrupa Depo · C02</option></select></div></div>}{kind!=="transfer"&&<div className="form-row"><div className="field"><label>Depo</label><select><option>Ana Depo</option><option>Avrupa Depo</option></select></div><div className="field"><label>Raf</label><select><option>A01</option><option>A02</option><option>B04</option></select></div></div>}<div className="field"><label>{kind==="count"?"Sayılan miktar":"Miktar"}</label><input type="number" min={0} value={qty} onChange={e=>setQty(Number(e.target.value))}/>{kind==="count"&&<small>Sistem miktarı: {selected?.stock} · Fark: {qty-(selected?.stock||0)}</small>}{kind==="dispatch"&&<small>Kullanılabilir stok: {selected?.stock} {selected?.unit}</small>}</div></>}</div><div className="modal-foot"><button onClick={close}>Vazgeç</button><button className="primary" onClick={submit} disabled={kind==="dispatch"&&qty>(selected?.stock||0)}><Check size={16}/>İşlemi onayla</button></div></div></div>;
}
