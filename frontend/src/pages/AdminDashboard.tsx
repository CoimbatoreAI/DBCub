import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Truck,
    BarChart3,
    Plus,
    X,
    Upload,
    Maximize2,
    Trash2,
    Edit2,
    CheckCircle2,
    Package,
    PlusCircle,
    Layers,
    FileText,
    LogOut
} from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [categoryForm, setCategoryForm] = useState({ name: "", subcategories: [] as any[] });
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const [categoryImagePreview, setCategoryImagePreview] = useState<string | null>(null);
    const [showFewStocksOnly, setShowFewStocksOnly] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const [tempSize, setTempSize] = useState("");
    const [tempColor, setTempColor] = useState({ name: "", code: "#000000" });

    const [productForm, setProductForm] = useState<any>({
        name: "",
        price: "",
        originalPrice: "",
        category: "",
        subcategory: "",
        subSubcategory: "",
        sizes: [],
        colors: [],
        fabric: "Cotton",
        fit: "Regular",
        sleeveType: "Half Sleeve",
        stock: 10,
        tag: "",
        description: ""
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) navigate("/admin/login");
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsData, productsData, ordersData, catsData, usersData] = await Promise.all([
                api.getStats(),
                api.getProducts(),
                api.getOrders(),
                api.getCategories(),
                api.getUsers()
            ]);
            setStats(statsData);
            setProducts(productsData);
            setOrders(ordersData);
            setCategories(catsData);
            setCustomers(usersData);

            if (catsData.length > 0 && !productForm.category) {
                const initialCategory = catsData[0];
                const initialSub = initialCategory.subcategories?.[0];
                setProductForm((prev: any) => ({
                    ...prev,
                    category: initialCategory.name,
                    subcategory: initialSub?.name || initialSub || "",
                    subSubcategory: (initialSub?.subcategories && initialSub.subcategories[0]) || ""
                }));
            }
        } catch (error) {
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArr = Array.from(e.target.files);
            setUploadedImages(prev => [...prev, ...filesArr]);
            const newPreviews = filesArr.map(file => URL.createObjectURL(file));
            setImagePreview(prev => [...prev, ...newPreviews]);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product', JSON.stringify(productForm));
        uploadedImages.forEach(img => formData.append('images', img));

        try {
            if (editingProduct) await api.updateProduct(editingProduct._id || editingProduct.id, formData);
            else await api.addProduct(formData);
            toast.success(editingProduct ? "Product updated" : "Product added");
            setShowAddProduct(false);
            setEditingProduct(null);
            setUploadedImages([]);
            setImagePreview([]);
            fetchData();
        } catch (err) {
            toast.error("Process failed");
        }
    };

    const SidebarItem = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={cn(
                "w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative text-left",
                activeTab === id ? "bg-primary text-primary-foreground font-black translate-x-2 rounded-l-2xl shadow-xl shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
        >
            <Icon size={20} className={activeTab === id ? "text-accent" : "group-hover:scale-110 transition-transform"} />
            <span className="text-xs uppercase tracking-widest font-black leading-none">{label}</span>
        </button>
    );

    if (loading) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">INITIALIZING SYSTEM ARCHITECTURE...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-secondary/20 flex flex-col lg:flex-row h-screen overflow-hidden">
            <aside className="w-72 bg-background border-r border-border shrink-0 flex flex-col h-screen overflow-y-auto">
                <div className="p-8">
                    <h1 className="font-heading font-black text-xl tracking-tighter uppercase italic text-primary">DB CUB <span className="text-accent">Console</span></h1>
                </div>
                <nav className="flex-1 space-y-1 px-4">
                    <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarItem id="products" icon={ShoppingBag} label="Product Management" />
                    <SidebarItem id="categories" icon={Layers} label="Category Tree" />
                    <SidebarItem id="orders" icon={Truck} label="Order Management" />
                    <SidebarItem id="customers" icon={Users} label="Customer List" />
                </nav>
                <div className="p-6 mt-auto border-t border-border">
                    <button onClick={() => { localStorage.removeItem("admin_token"); navigate("/admin/login"); }} className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 transition-all font-black uppercase tracking-widest text-[10px] rounded-2xl">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                <header className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-heading font-black uppercase italic tracking-tighter">{activeTab} Control</h2>
                </header>

                {activeTab === "dashboard" && stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-background p-8 rounded-[32px] border border-border shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Orders</p>
                            <p className="text-4xl font-heading font-black italic">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-background p-8 rounded-[32px] border border-border shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Revenue</p>
                            <p className="text-4xl font-heading font-black italic">₹{stats.revenue?.toLocaleString()}</p>
                        </div>
                        <div className="bg-background p-8 rounded-[32px] border border-border shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Assets</p>
                            <p className="text-4xl font-heading font-black italic">{stats.totalProducts}</p>
                        </div>
                        <div className="bg-background p-8 rounded-[32px] border border-border shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Low Stock</p>
                            <p className="text-4xl font-heading font-black italic text-red-500">{stats.lowStockCount}</p>
                        </div>
                    </div>
                )}

                {activeTab === "products" && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="font-heading font-black uppercase text-xl">Asset Inventory</h3>
                            <button onClick={() => { setEditingProduct(null); setProductForm({ name: "", price: "", originalPrice: "", category: categories[0]?.name, subcategory: categories[0]?.subcategories?.[0]?.name || categories[0]?.subcategories?.[0], description: "", sizes: [], colors: [], fabric: "Cotton", fit: "Regular", sleeveType: "Half Sleeve", stock: 10 }); setImagePreview([]); setUploadedImages([]); setShowAddProduct(true); }} className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all">+ Add Asset</button>
                        </div>
                        <div className="bg-background rounded-[32px] border border-border shadow-sm overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-secondary/30 border-b border-border">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Product</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Category</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Price</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Stock</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id || p.id} className="border-b border-border hover:bg-secondary/10">
                                            <td className="px-8 py-6 flex items-center gap-4">
                                                <img src={p.image?.startsWith('/') ? `http://localhost:5000${p.image}` : p.image} className="w-12 h-14 object-cover rounded-xl border border-border" />
                                                <p className="font-black text-xs uppercase italic">{p.name}</p>
                                            </td>
                                            <td className="px-8 py-6 text-xs uppercase font-black opacity-60">{p.category}</td>
                                            <td className="px-8 py-6 font-black text-xs">₹{p.price}</td>
                                            <td className="px-8 py-6 text-xs font-black">{p.stock} Units</td>
                                            <td className="px-8 py-6 flex gap-2">
                                                <button onClick={() => { setEditingProduct(p); setProductForm(p); setImagePreview(Array.isArray(p.images) ? p.images.map((img: string) => img.startsWith('/') ? `http://localhost:5000${img}` : img) : []); setShowAddProduct(true); }} className="p-3 bg-secondary rounded-xl hover:text-accent"><Edit2 size={16} /></button>
                                                <button onClick={async () => { if (confirm("Delete product?")) { await api.deleteProduct(p._id || p.id); fetchData(); } }} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "categories" && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="font-heading font-black uppercase text-xl italic">Category Structure</h3>
                            <button onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", subcategories: [] }); setCategoryImage(null); setCategoryImagePreview(null); setShowAddCategory(true); }} className="bg-primary text-primary-foreground px-6 py-3 rounded-[18px] font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all">+ New Node</button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {categories.map(cat => (
                                <div key={cat._id || cat.id} className="bg-background rounded-[32px] border border-border p-8 shadow-sm flex flex-col gap-6">
                                    <div className="flex justify-between items-center border-b border-border pb-4">
                                        <h4 className="font-heading font-black text-2xl uppercase italic">{cat.name}</h4>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingCategory(cat); setCategoryForm(cat); setCategoryImagePreview(cat.image ? (cat.image.startsWith('/') ? `http://localhost:5000${cat.image}` : cat.image) : null); setShowAddCategory(true); }} className="p-2 bg-secondary rounded-lg hover:text-accent"><Edit2 size={16} /></button>
                                            <button onClick={async () => { if (confirm("Delete category?")) { await api.deleteCategory(cat._id || cat.id); fetchData(); } }} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    {cat.image && (
                                        <div className="w-full h-32 rounded-2xl overflow-hidden border border-border">
                                            <img src={cat.image.startsWith('/') ? `http://localhost:5000${cat.image}` : cat.image} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="grid gap-4">
                                        {cat.subcategories?.map((sub: any, idx: number) => (
                                            <div key={idx} className="bg-secondary/30 p-4 rounded-2xl border border-border">
                                                <p className="font-black text-[10px] uppercase text-primary mb-2">{sub.name || sub}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(sub.subcategories || []).map((ss: string, ssi: number) => (
                                                        <span key={ssi} className="px-2 py-1 bg-background rounded-full text-[8px] font-black uppercase border border-border">{ss}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "orders" && (
                    <div className="bg-background rounded-[32px] border border-border shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-border bg-secondary/30">
                            <h3 className="font-heading font-black uppercase text-xl italic">Operations Log</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-secondary/10">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Reference</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Entity</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Status</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase">Commercials</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o._id || o.id} className="border-b border-border hover:bg-secondary/5">
                                            <td className="px-8 py-6 font-black text-xs uppercase">#{o._id?.slice(-6) || o.id}</td>
                                            <td className="px-8 py-6 text-[10px] font-black uppercase">{o.customer?.name || "Anonymous"}</td>
                                            <td className="px-8 py-6">
                                                <select value={o.status} onChange={async (e) => { await api.updateOrderStatus(o._id || o.id, e.target.value); fetchData(); }} className="text-[10px] font-black uppercase bg-secondary px-3 py-1.5 rounded-lg border border-border">
                                                    <option>Processing</option>
                                                    <option>Shipped</option>
                                                    <option>Delivered</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-6 font-black text-xs">₹{o.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "customers" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {customers.map(c => (
                            <div key={c._id || c.id} className="bg-background rounded-[32px] border border-border p-8 shadow-sm flex items-center gap-6">
                                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center font-black text-xl text-primary capitalize">
                                    {(c.name || "U")[0]}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-black uppercase text-xs truncate italic">{c.name || "User"}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground truncate">{c.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {showAddProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-md p-4">
                    <div className="bg-background w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] p-8 lg:p-12 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-heading font-black italic uppercase">{editingProduct ? "Revise Asset" : "Register Unit"}</h2>
                            <button onClick={() => setShowAddProduct(false)} className="p-3 hover:bg-red-50 rounded-full transition-all">✕</button>
                        </div>
                        <form onSubmit={handleAddProduct} className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Model Name</label>
                                    <input required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="w-full bg-secondary/50 border border-border px-6 py-4 rounded-2xl font-bold outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price (₹)</label>
                                        <input required type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="w-full bg-secondary/50 border border-border px-6 py-4 rounded-2xl font-bold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inventory Count</label>
                                        <input required type="number" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: parseInt(e.target.value) })} className="w-full bg-secondary/50 border border-border px-6 py-4 rounded-2xl font-bold outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Intelligence Feed (Description)</label>
                                    <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="w-full bg-secondary/50 border border-border px-6 py-4 rounded-2xl font-bold outline-none min-h-[120px]" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sizes (Add one by one)</label>
                                    <div className="flex gap-2">
                                        <input value={tempSize} onChange={e => setTempSize(e.target.value.toUpperCase())} className="flex-1 bg-secondary border border-border px-4 py-3 rounded-xl font-bold" placeholder="e.g. XL" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (tempSize) { setProductForm({ ...productForm, sizes: [...productForm.sizes, tempSize] }); setTempSize(""); } } }} />
                                        <button type="button" onClick={() => { if (tempSize) { setProductForm({ ...productForm, sizes: [...productForm.sizes, tempSize] }); setTempSize(""); } }} className="bg-primary text-primary-foreground px-4 rounded-xl font-black">+</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {productForm.sizes.map((s: string, i: number) => <span key={i} className="bg-secondary px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2">{s} <button type="button" onClick={() => setProductForm({ ...productForm, sizes: productForm.sizes.filter((_: any, idx: number) => idx !== i) })}>✕</button></span>)}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Visual Asset Transmission</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {imagePreview.map((src, i) => (
                                            <div key={i} className="aspect-[3/4] bg-secondary rounded-2xl relative group overflow-hidden border border-border">
                                                <img src={src} className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => { setImagePreview(prev => prev.filter((_, idx) => idx !== i)); setUploadedImages(prev => prev.filter((_, idx) => idx !== i)); }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">✕</button>
                                            </div>
                                        ))}
                                        {imagePreview.length < 6 && (
                                            <label className="aspect-[3/4] border-2 border-dashed border-border flex flex-col items-center justify-center rounded-2xl cursor-pointer hover:bg-secondary/50">
                                                <Upload size={24} className="text-muted-foreground mb-2" />
                                                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Inject Visual</span>
                                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-primary text-primary-foreground py-6 rounded-[24px] font-heading font-black uppercase text-sm mt-12 hover:bg-accent transition-all shadow-xl shadow-primary/20">{editingProduct ? "Update Infrastructure" : "Initialize Deployment"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-md p-4">
                    <div className="bg-background w-full max-w-2xl rounded-[32px] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black uppercase italic">{editingCategory ? "Revise Category" : "Initialize Category"}</h2>
                            <button onClick={() => setShowAddCategory(false)} className="p-2">✕</button>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Name</label>
                                <input value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} className="w-full bg-secondary border border-border px-6 py-4 rounded-2xl font-bold outline-none" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Visual (Image)</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-secondary rounded-2xl border border-border overflow-hidden">
                                        {categoryImagePreview ? <img src={categoryImagePreview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Upload size={20} /></div>}
                                    </div>
                                    <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { setCategoryImage(e.target.files[0]); setCategoryImagePreview(URL.createObjectURL(e.target.files[0])); } }} className="text-[10px] font-black uppercase text-muted-foreground" />
                                </div>
                            </div>
                            <button onClick={async () => {
                                const formData = new FormData();
                                formData.append('name', categoryForm.name);
                                formData.append('subcategories', JSON.stringify(categoryForm.subcategories));
                                if (categoryImage) formData.append('image', categoryImage);
                                try {
                                    if (editingCategory) await api.updateCategory(editingCategory._id || editingCategory.id, formData);
                                    else await api.addCategory(formData);
                                    setShowAddCategory(false);
                                    fetchData();
                                    toast.success("Category deployed");
                                } catch (err) { toast.error("Deployment failed"); }
                            }} className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black uppercase text-sm hover:bg-accent transition-all shadow-xl shadow-primary/20 mt-8">{editingCategory ? "Commit Configuration" : "Deploy Logic"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
