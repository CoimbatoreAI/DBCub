import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Share2, Facebook, Twitter, MessageSquare, ChevronRight, Minus, Plus, Loader2, FileText } from "lucide-react";
import { type Product, API_BASE_URL } from "@/data/products";
import { api } from "@/services/api";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        const fetchProductData = async () => {
            if (!id) return;
            try {
                const allProducts = await api.getProducts();
                const foundProduct = allProducts.find((p: any) => p.id === id || p._id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                    setMainImage(foundProduct.image);
                    setRelatedProducts(allProducts.filter((p: any) => p.category === foundProduct.category && (p.id !== foundProduct.id && p._id !== foundProduct._id)).slice(0, 4));
                    if (foundProduct.sizes?.length > 0) setSelectedSize(foundProduct.sizes[0]);
                    if (foundProduct.colors?.length > 0) {
                        setSelectedColor(typeof foundProduct.colors[0] === 'string' ? foundProduct.colors[0] : foundProduct.colors[0].name);
                    }
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-accent" size={48} />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Fetching high-performance gear...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4 font-heading italic uppercase">Product out of range</h2>
                <Link to="/shop" className="text-accent hover:underline uppercase text-xs font-black tracking-widest">Return to Base</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: mainImage,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
        });
    };

    const imageUrl = product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="bg-secondary/30 border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    <Link to="/" className="hover:text-accent">Home</Link>
                    <ChevronRight size={12} />
                    <Link to="/shop" className="hover:text-accent">Shop</Link>
                    <ChevronRight size={12} />
                    <Link to={`/shop?category=${product.category}`} className="hover:text-accent">{product.category}</Link>
                    <ChevronRight size={12} />
                    <span className="text-foreground truncate">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-[4/5] bg-secondary rounded-[32px] overflow-hidden relative border border-border shadow-2xl">
                            <img
                                src={mainImage.startsWith('http') ? mainImage : `${API_BASE_URL}${mainImage}`}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                            />
                            {discount > 0 && (
                                <span className="absolute top-8 left-8 bg-primary text-primary-foreground text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                    -{discount}% SECURED
                                </span>
                            )}
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar pt-2">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMainImage(img)}
                                        className={cn(
                                            "w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all",
                                            mainImage === img ? "border-accent scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img.startsWith('http') ? img : `${API_BASE_URL}${img}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-accent font-heading font-semibold uppercase tracking-widest text-xs">
                                {product.category} / {product.subcategory}
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-heading font-bold text-foreground">₹{product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through decoration-primary/30">₹{product.originalPrice}</span>
                                )}
                            </div>
                        </div>

                        <div className="bg-secondary/20 p-6 rounded-2xl border border-border">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                                <FileText size={14} className="text-accent" /> Intelligence Report
                            </h4>
                            <p className="text-sm font-medium leading-relaxed opacity-80">
                                {product.description || `Premium quality ${product.subcategory.toLowerCase()} designed for maximum comfort and style. Perfect for both casual and high-performance settings.`}
                            </p>
                        </div>

                        {/* Selection */}
                        <div className="space-y-6 pt-6 border-t border-border">
                            {/* Color Selection */}
                            {product.colors && product.colors.length > 0 && (
                                <div>
                                    <h3 className="font-heading font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-4">Tactical Tones</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {product.colors.map((color: any, i) => {
                                            const name = typeof color === 'string' ? color : color.name;
                                            const code = typeof color === 'string' ? color.toLowerCase() : color.code;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedColor(name)}
                                                    className={cn(
                                                        "group flex flex-col items-center gap-2 transition-all",
                                                        selectedColor === name ? "opacity-100 scale-110" : "opacity-40 hover:opacity-100"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-10 h-10 rounded-full border-2 transition-all shadow-sm",
                                                            selectedColor === name ? "border-accent ring-2 ring-accent/30 ring-offset-2" : "border-border"
                                                        )}
                                                        style={{ backgroundColor: code }}
                                                    />
                                                    <span className="text-[8px] font-black uppercase tracking-tighter">{name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-heading font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Dimensions</h3>
                                    <button className="text-[9px] text-accent hover:underline uppercase tracking-widest font-black italic">Measurement Grid</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "w-12 h-12 flex items-center justify-center border-2 text-[10px] font-black transition-all rounded-xl",
                                                selectedSize === size
                                                    ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-110"
                                                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-bold uppercase tracking-wider text-xs">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-border rounded">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-3 hover:bg-secondary transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-12 text-center font-medium font-body">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-3 hover:bg-secondary transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary text-primary-foreground py-4 px-8 font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-accent transition-all active:scale-[0.98] rounded shadow-xl shadow-primary/10"
                                >
                                    <ShoppingBag size={18} /> Add to Bag
                                </button>
                                <button className="p-4 border border-border hover:bg-secondary transition-colors rounded">
                                    <Heart size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-6 pt-10">
                            <div className="space-y-1">
                                <h4 className="font-heading font-bold text-xs uppercase">Fabric</h4>
                                <p className="text-xs text-muted-foreground">Premium Breathable Material</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-heading font-bold text-xs uppercase">Fit</h4>
                                <p className="text-xs text-muted-foreground">Standard / Athletic Fit</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-heading font-bold text-xs uppercase">Shipping</h4>
                                <p className="text-xs text-muted-foreground">Free on orders above ₹999</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-heading font-bold text-xs uppercase">Returns</h4>
                                <p className="text-xs text-muted-foreground">7 Days Easy Return Policy</p>
                            </div>
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center gap-4 pt-8">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share:</span>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Facebook size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Twitter size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <MessageSquare size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32">
                        <div className="flex items-end justify-between mb-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-heading font-black tracking-tight uppercase">You May Also Like</h2>
                                <div className="h-1 w-20 bg-accent rounded"></div>
                            </div>
                            <Link to="/shop" className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
