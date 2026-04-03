import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-50" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-bold text-lg">Your Cart ({totalItems})</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:text-accent transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground mb-4" />
              <p className="font-heading font-semibold mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id + item.size} className="flex gap-4 border-b border-border pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" loading="lazy" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-heading font-bold text-sm">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border border-border rounded hover:bg-secondary">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border border-border rounded hover:bg-secondary">
                        <Plus size={14} />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-xs text-accent hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex justify-between font-heading font-bold mb-2">
              <span className="uppercase tracking-widest text-xs opacity-60">Subtotal</span>
              <span className="text-lg">₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="bg-secondary text-secondary-foreground text-center py-4 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-muted transition-colors rounded border border-border"
              >
                View Full Bag
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-primary-foreground text-center py-4 font-heading font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-colors rounded shadow-lg shadow-primary/10"
              >
                Checkout
              </Link>
            </div>
            <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest font-bold">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
