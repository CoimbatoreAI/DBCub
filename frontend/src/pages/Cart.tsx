import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
    const { items, updateQuantity, removeItem, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-muted-foreground animate-scale-in">
                        <ShoppingBag size={40} />
                    </div>
                    <h2 className="text-3xl font-heading font-black tracking-tight uppercase">Your Bag is Empty</h2>
                    <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/shop"
                        className="inline-block bg-primary text-primary-foreground py-4 px-10 font-heading font-black uppercase tracking-widest text-sm hover:bg-accent transition-all rounded shadow-xl shadow-primary/10"
                    >
                        Go to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const shipping = totalPrice > 999 ? 0 : 99;

    return (
        <div className="min-h-screen pb-20">
            <div className="bg-primary text-primary-foreground section-padding !py-12 text-center">
                <h1 className="font-heading font-black text-4xl sm:text-5xl mb-2 uppercase tracking-tight">Shopping Bag</h1>
                <p className="opacity-70 text-sm">{items.length} items currently in bag</p>
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="hidden border-b border-border pb-4 uppercase tracking-widest text-[10px] font-black text-muted-foreground">
                            <div className="grid grid-cols-6 items-center">
                                <div className="col-span-3">Product Info</div>
                                <div className="col-span-1 text-center">Quantity</div>
                                <div className="col-span-1 text-right">Total</div>
                            </div>
                        </div>

                        <div className="divide-y divide-border">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="py-8 first:pt-0">
                                    <div className="flex gap-4 sm:gap-8">
                                        <div className="w-24 sm:w-32 aspect-[3/4] bg-secondary rounded overflow-hidden flex-shrink-0 group">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h3 className="font-heading font-black text-lg sm:text-xl tracking-tight leading-tight hover:text-accent transition-colors">
                                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 rounded"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                    <span className="flex items-center gap-1.5"><span className="text-[10px] opacity-50">Size:</span> {item.size}</span>
                                                    <span className="flex items-center gap-1.5"><span className="text-[10px] opacity-50">Price:</span> ₹{item.price}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4">
                                                <div className="flex items-center border border-border rounded overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-secondary transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-10 text-center text-sm font-bold font-body">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:bg-secondary transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-heading font-bold text-lg">₹{item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary/30 border border-border rounded-lg p-8 space-y-8 sticky top-24 shadow-sm">
                            <h2 className="text-2xl font-heading font-black tracking-tight uppercase border-b border-border pb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Subtotal</span>
                                    <span className="font-bold">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Shipping Fee</span>
                                    <span className={shipping === 0 ? "text-green-600 font-bold uppercase tracking-widest text-[10px]" : "font-bold"}>
                                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] text-accent font-bold uppercase tracking-wider">
                                        Add ₹{1000 - totalPrice} more for FREE shipping
                                    </p>
                                )}
                                <div className="pt-6 border-t border-border flex justify-between items-center">
                                    <span className="text-lg font-heading font-black tracking-widest uppercase">Total</span>
                                    <span className="text-2xl font-heading font-black text-primary">₹{totalPrice + shipping}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    to="/checkout"
                                    className="w-full bg-primary text-primary-foreground py-5 px-8 font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-accent transition-all active:scale-[0.98] rounded shadow-xl shadow-primary/10"
                                >
                                    Checkout <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/shop"
                                    className="w-full border border-border bg-background py-5 px-8 font-heading font-black uppercase tracking-widest text-sm text-center flex items-center justify-center gap-2 hover:bg-secondary transition-colors rounded"
                                >
                                    Continue Shopping
                                </Link>
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <p className="text-[10px] text-muted-foreground uppercase font-black text-center tracking-widest">Secure Payments</p>
                                <div className="flex justify-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 w-auto" alt="Paypal" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-4 w-auto" alt="Visa" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 w-auto" alt="Mastercard" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
