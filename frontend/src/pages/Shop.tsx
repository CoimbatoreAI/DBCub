import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, type Product } from "@/data/products";
import { api } from "@/services/api";
import { cn } from "@/lib/utils";

const sizes = ["S", "M", "L", "XL", "XXL"];
const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "Over ₹2000", min: 2000, max: 10000 },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");
  const selectedSubSubcategory = searchParams.get("subSubcategory");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ label: string; min: number; max: number } | null>(null);
  const [selectedSleeveType, setSelectedSleeveType] = useState<string | null>(null);
  const [selectedSportType, setSelectedSportType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract unique values from products for filters
  const colors = useMemo(() => Array.from(new Set(products.flatMap(p => p.colors || []))), [products]);
  const fabrics = useMemo(() => Array.from(new Set(products.map(p => p.fabric).filter(Boolean))), [products]);
  const sleeveTypes = useMemo(() => Array.from(new Set(products.map(p => p.sleeveType).filter(Boolean))), [products]);
  const sportTypes = useMemo(() => Array.from(new Set(products.map(p => p.sportType).filter(Boolean))), [products]);

  const filtered = products.filter((p) => {
    if (selectedCategory && p.category.toLowerCase() !== (selectedCategory?.toLowerCase() || "")) return false;
    if (selectedSubcategory && (p.subcategory || "").toLowerCase() !== (selectedSubcategory?.toLowerCase() || "")) return false;
    if (selectedSubSubcategory && (p.subSubcategory || "").toLowerCase() !== (selectedSubSubcategory?.toLowerCase() || "")) return false;
    if (selectedSize && !p.sizes.includes(selectedSize)) return false;
    if (selectedColor && !p.colors?.some(c => (typeof c === 'string' ? c : c.name) === selectedColor)) return false;
    if (selectedFabric && p.fabric !== selectedFabric) return false;
    if (selectedPriceRange && (p.price < selectedPriceRange.min || p.price > selectedPriceRange.max)) return false;
    if (selectedSleeveType && p.sleeveType !== selectedSleeveType) return false;
    if (selectedSportType && p.sportType !== selectedSportType) return false;
    return true;
  });

  const clearFilters = () => {
    setSearchParams({});
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedFabric(null);
    setSelectedPriceRange(null);
    setSelectedSleeveType(null);
    setSelectedSportType(null);
  };

  const setCategory = (cat: string | null) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const setSubcategory = (cat: string, sub: string) => {
    setSearchParams({ category: cat, subcategory: sub });
  };

  const setSubSubcategory = (cat: string, sub: string, subsub: string) => {
    setSearchParams({ category: cat, subcategory: sub, subSubcategory: subsub });
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-border pb-6 pt-2">
      <h3 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 sm:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070')] bg-cover bg-center opacity-10 grayscale"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-heading font-black text-5xl sm:text-7xl mb-4 uppercase tracking-tighter italic">The collection</h1>
          <p className="opacity-60 text-sm sm:text-base font-medium max-w-xl mx-auto tracking-wide uppercase">
            Elevate your game with our high-performance gear
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mobile filter button */}
        <div className="lg:hidden flex items-center justify-between mb-8 sticky top-20 z-30 bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border shadow-sm">
          <button
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground px-6 py-3 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} /> {showFilters ? "Close Filters" : "Filters"}
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {filtered.length} Results
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          {/* Sidebar */}
          <aside className={cn(
            "lg:block w-full lg:w-72 shrink-0 space-y-6 transition-all",
            showFilters ? "block" : "hidden"
          )}>
            <div className="sticky top-24 space-y-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading font-black text-xl uppercase tracking-tighter">Filters</h2>
                {(selectedCategory || selectedSize || selectedColor || selectedFabric || selectedPriceRange || selectedSleeveType || selectedSportType) && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline decoration-2 underline-offset-4"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Categories */}
              <FilterSection title="Categories">
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => setCategory(null)}
                      className={cn(
                        "text-xs font-bold uppercase tracking-widest transition-all",
                        !selectedCategory ? "text-primary translate-x-2" : "text-muted-foreground hover:text-primary hover:translate-x-1"
                      )}
                    >
                      {!selectedCategory && <span className="inline-block w-4 h-[2px] bg-accent mr-2 align-middle"></span>}
                      All Products
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.name} className="space-y-3">
                      <button
                        onClick={() => setCategory(cat.name)}
                        className={cn(
                          "text-xs font-bold uppercase tracking-widest transition-all text-left w-full",
                          selectedCategory?.toLowerCase() === cat.name.toLowerCase() ? "text-primary translate-x-2" : "text-muted-foreground hover:text-primary hover:translate-x-1"
                        )}
                      >
                        {selectedCategory?.toLowerCase() === cat.name.toLowerCase() && <span className="inline-block w-4 h-[2px] bg-accent mr-2 align-middle"></span>}
                        {cat.name}
                      </button>
                      {selectedCategory?.toLowerCase() === cat.name.toLowerCase() && (
                        <ul className="ml-6 space-y-4 border-l border-border pl-4 mt-2">
                          {cat.subcategories.map((sub: any) => (
                            <li key={sub.name || sub} className="space-y-2">
                              <button
                                onClick={() => setSubcategory(cat.name, sub.name || sub)}
                                className={cn(
                                  "text-[10px] uppercase tracking-[0.1em] transition-all block text-left w-full",
                                  selectedSubcategory?.toLowerCase() === (sub.name || sub).toLowerCase() ? "text-accent font-black" : "text-muted-foreground hover:text-primary"
                                )}
                              >
                                {sub.name || sub}
                              </button>
                              {selectedSubcategory?.toLowerCase() === (sub.name || sub).toLowerCase() && sub.subcategories && sub.subcategories.length > 0 && (
                                <ul className="ml-3 space-y-1.5 border-l border-border/50 pl-2">
                                  {sub.subcategories.map((ss: string) => (
                                    <li key={ss}>
                                      <button
                                        onClick={() => setSubSubcategory(cat.name, sub.name || sub, ss)}
                                        className={cn(
                                          "text-[9px] uppercase tracking-wider transition-all block text-left w-full",
                                          selectedSubSubcategory?.toLowerCase() === ss.toLowerCase() ? "text-primary font-black" : "text-muted-foreground/60 hover:text-primary"
                                        )}
                                      >
                                        {ss}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </FilterSection>

              {/* Size */}
              <FilterSection title="Size">
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={cn(
                        "w-10 h-10 text-[10px] font-black border transition-all rounded flex items-center justify-center",
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-110"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Colors */}
              {colors.length > 0 && (
                <FilterSection title="Color">
                  <div className="flex flex-wrap gap-3">
                    {colors.map((colorObj: any) => {
                      const colorName = typeof colorObj === 'string' ? colorObj : colorObj.name;
                      const colorCode = typeof colorObj === 'string' ? colorObj.toLowerCase() : colorObj.code;
                      return (
                        <button
                          key={colorName}
                          onClick={() => setSelectedColor(selectedColor === colorName ? null : colorName)}
                          className={cn(
                            "group relative flex flex-col items-center gap-1.5",
                            selectedColor === colorName ? "opacity-100" : "opacity-60 hover:opacity-100"
                          )}
                        >
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full border border-border shadow-sm transition-transform",
                              selectedColor === colorName && "ring-2 ring-accent ring-offset-2 scale-110"
                            )}
                            style={{ backgroundColor: colorCode }}
                          />
                          <span className="text-[8px] font-black uppercase tracking-widest">{colorName}</span>
                        </button>
                      );
                    })}
                  </div>
                </FilterSection>
              )}

              {/* Fabric */}
              {fabrics.length > 0 && (
                <FilterSection title="Fabric">
                  <div className="space-y-2">
                    {fabrics.map((fabric) => (
                      <button
                        key={fabric}
                        onClick={() => setSelectedFabric(selectedFabric === fabric ? null : fabric)}
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest block text-left w-full transition-all",
                          selectedFabric === fabric ? "text-accent translate-x-2" : "text-muted-foreground hover:text-primary hover:translate-x-1"
                        )}
                      >
                        {selectedFabric === fabric && "→ "} {fabric}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              )}

              {/* Price */}
              <FilterSection title="Price">
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(selectedPriceRange?.label === range.label ? null : range)}
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest block text-left w-full transition-all",
                        selectedPriceRange?.label === range.label ? "text-accent translate-x-2" : "text-muted-foreground hover:text-primary hover:translate-x-1"
                      )}
                    >
                      {selectedPriceRange?.label === range.label && "→ "} {range.label}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Sleeve Type */}
              {sleeveTypes.length > 0 && (
                <FilterSection title="Sleeve Type">
                  <div className="space-y-2">
                    {sleeveTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSleeveType(selectedSleeveType === type ? null : type)}
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest block text-left w-full transition-all",
                          selectedSleeveType === type ? "text-accent translate-x-2" : "text-muted-foreground hover:text-primary hover:translate-x-1"
                        )}
                      >
                        {selectedSleeveType === type && "→ "} {type}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              )}

              {/* Sport Type */}
              {sportTypes.length > 0 && (
                <FilterSection title="Sport Type">
                  <div className="space-y-2">
                    {sportTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSportType(selectedSportType === type ? null : type)}
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest block text-left w-full transition-all",
                          selectedSportType === type ? "text-accent translate-x-2" : "text-muted-foreground hover:text-primary hover:translate-x-1"
                        )}
                      >
                        {selectedSportType === type && "→ "} {type}
                      </button>
                    ))}
                  </div>
                </FilterSection>
              )}
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-border">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Displaying {filtered.length} products
              </p>
              <select className="bg-transparent text-[10px] font-black uppercase tracking-widest border-none focus:ring-0 cursor-pointer">
                <option>Sort By: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Selling</option>
              </select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-10 sm:gap-y-16">
              {filtered.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-32 border-2 border-dashed border-border rounded-3xl">
                <X size={48} className="mx-auto text-muted-foreground/30 mb-6" />
                <h3 className="font-heading font-black text-2xl uppercase tracking-tighter mb-2">No matching gear found</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-8">Try adjusting your filters to find what you're looking for</p>
                <button
                  onClick={clearFilters}
                  className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-heading font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl shadow-primary/10"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
