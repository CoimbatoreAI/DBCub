import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronLeft, ArrowRight, CreditCard, Ship, CheckCircle2, Ticket } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Checkout = () => {
    const { items, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user_data");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setFormData(prev => ({
                    ...prev,
                    email: user.email || "",
                    firstName: user.name ? user.name.split(" ")[0] : "",
                    lastName: user.name && user.name.split(" ").length > 1 ? user.name.split(" ").slice(1).join(" ") : "",
                }));
            } catch (err) {
                // Ignore parse errors
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate order processing
        setTimeout(() => {
            setLoading(false);
            toast.success("Order placed successfully!");
            clearCart();
            setStep(3); // Success step
        }, 2000);
    };

    if (items.length === 0 && step !== 3) {
        return (
            <div className="container mx-auto px-4 py-20 text-center space-y-6">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Your Bag is Empty</h2>
                <Link to="/shop" className="inline-block bg-primary text-primary-foreground py-3 px-8 font-heading font-black uppercase tracking-widest text-sm hover:bg-accent transition-all rounded shadow-xl shadow-primary/10">Return to Shop</Link>
            </div>
        );
    }

    const shipping = totalPrice > 999 ? 0 : 99;
    const tax = Math.round(totalPrice * 0.12); // 12% GST
    const grandTotal = totalPrice + shipping + tax;

    return (
        <div className="min-h-screen pb-20">
            <div className="bg-primary text-primary-foreground section-padding !py-8 text-center sm:text-left">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tighter">Checkout</h1>
                    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all shrink-0",
                                    step >= i ? "bg-accent text-accent-foreground border-accent" : "bg-primary-foreground/10 text-primary-foreground/40 border-primary-foreground/10"
                                )}>
                                    {step > i ? <CheckCircle2 size={12} strokeWidth={3} /> : i}
                                </div>
                                {i < 3 && <div className={cn("w-8 h-[1px] shrink-0", step > i ? "bg-accent" : "bg-primary-foreground/10")}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16">
                {step === 3 ? (
                    <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in py-10 lg:py-20">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto scale-110 shadow-lg shadow-green-100/50">
                            <CheckCircle2 size={48} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-heading font-black tracking-tight uppercase">Thank You!</h2>
                            <p className="text-xl text-muted-foreground font-medium">Your order has been placed successfully.</p>
                            <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg border border-border inline-block px-10 font-bold uppercase tracking-widest">Order ID: #DB-{Math.floor(Math.random() * 100000)}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-10 justify-center">
                            <Link
                                to="/track-order"
                                className="bg-primary text-primary-foreground py-4 px-10 font-heading font-black uppercase tracking-widest text-xs hover:bg-accent transition-all rounded shadow-xl shadow-primary/10"
                            >
                                Track Your Order
                            </Link>
                            <Link
                                to="/shop"
                                className="bg-secondary text-secondary-foreground py-4 px-10 font-heading font-black uppercase tracking-widest text-xs hover:bg-muted transition-all rounded border border-border"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
                        <div className="lg:col-span-7 space-y-12">
                            {/* Shipping Form */}
                            <form onSubmit={handlePlaceOrder} className="space-y-10">
                                <section className="space-y-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center font-black">
                                            <Ship size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-black tracking-tight uppercase">Shipping Details</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Where should we deliver?</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">First Name</label>
                                            <input
                                                required
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Last Name</label>
                                            <input
                                                required
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="Doe"
                                            />
                                        </div>
                                        <div className="sm:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Address</label>
                                            <input
                                                required
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="House No, Street, Landmark"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">City</label>
                                            <input
                                                required
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="Coimbatore"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">ZIP Code</label>
                                            <input
                                                required
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="641001"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Phone Number</label>
                                            <input
                                                required
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-secondary/20 border border-border px-4 py-4 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-sm"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-8 pt-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center font-black">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-black tracking-tight uppercase">Payment Method</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none">Secure and safe transactions</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="border-2 border-accent bg-accent/5 p-6 rounded-xl flex items-center justify-between shadow-lg shadow-accent/5 transition-all">
                                            <div className="flex items-center gap-4 text-accent">
                                                <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center font-black">₹</div>
                                                <span className="font-heading font-black uppercase tracking-widest text-xs">Cash on Delivery</span>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-4 border-accent flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-accent"></div>
                                            </div>
                                        </div>
                                        <div className="border-2 border-border p-6 rounded-xl flex items-center justify-between opacity-50 grayscale cursor-not-allowed hover:border-border/50">
                                            <div className="flex items-center gap-4">
                                                <CreditCard size={24} />
                                                <span className="font-heading font-black uppercase tracking-widest text-xs">Online Payment <span className="block text-[8px] opacity-60">Coming Soon</span></span>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-2 border-border"></div>
                                        </div>
                                    </div>
                                </section>

                                <div className="pt-10 flex items-center justify-between border-t border-border mt-10">
                                    <Link to="/cart" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group">
                                        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Bag
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary text-primary-foreground py-6 px-12 font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-accent transition-all active:scale-[0.98] rounded-xl shadow-2xl shadow-primary/20 disabled:opacity-50 disabled:grayscale"
                                    >
                                        {loading ? "Processing..." : "Place Order"} <ArrowRight size={20} className={loading ? "hidden" : "block"} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="lg:col-span-5">
                            <aside className="bg-secondary/30 border border-border rounded-2xl p-8 sticky top-24 shadow-sm space-y-10">
                                <div>
                                    <h3 className="text-xl font-heading font-black tracking-tight uppercase mb-6 flex items-center gap-2">
                                        <ShoppingBag size={20} className="text-accent" /> Order Summary
                                    </h3>
                                    <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin divide-y divide-border">
                                        {items.map((item) => (
                                            <div key={`${item.id}-${item.size}`} className="py-6 flex gap-5 first:pt-0">
                                                <div className="w-20 h-24 bg-secondary rounded overflow-hidden flex-shrink-0 group">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center space-y-1">
                                                    <h4 className="font-heading font-black text-sm uppercase tracking-tight line-clamp-1 truncate">{item.name}</h4>
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Size: {item.size} / Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold font-heading text-accent">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 relative">
                                            <Ticket size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                type="text"
                                                placeholder="PROMO CODE"
                                                className="w-full bg-secondary/50 border border-border pl-10 pr-4 py-3 rounded-lg text-xs font-black uppercase tracking-widest outline-none focus:border-accent"
                                            />
                                        </div>
                                        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors">Apply</button>
                                    </div>
                                </div>

                                <div className="space-y-5 pt-8 border-t border-border border-dashed">
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                        <span className="text-muted-foreground">Bag Subtotal</span>
                                        <span className="font-bold">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                        <span className="text-muted-foreground">Delivery</span>
                                        <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                        <span className="text-muted-foreground">GST (12%)</span>
                                        <span>₹{tax}</span>
                                    </div>
                                    <div className="pt-6 border-t border-border flex justify-between items-center pb-2">
                                        <span className="text-lg font-heading font-black tracking-tight uppercase">Order Total</span>
                                        <span className="text-3xl font-heading font-black text-primary">₹{grandTotal}</span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
