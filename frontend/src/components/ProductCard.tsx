import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, API_BASE_URL } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imageUrl = product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product._id || product.id || "",
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: product.sizes[1] || product.sizes[0],
      quantity: 1,
    });
  };

  return (
    <div
      className="group relative hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link to={`/product/${product._id || product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary rounded">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-primary-foreground py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent transition-colors rounded"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="p-2.5 bg-background text-foreground rounded hover:text-accent transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={16} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
        <Link to={`/product/${product._id || product.id}`} className="hover:text-accent transition-colors">
          <h3 className="font-medium text-sm leading-snug line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-sm">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
