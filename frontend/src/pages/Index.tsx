import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, Truck, Palette, Package } from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import comboBanner from "@/assets/combo-banner.jpg";
import customJersey from "@/assets/custom-jersey.jpg";
import categoryMen from "@/assets/category-men.jpg";
import categorySports from "@/assets/category-sports.jpg";
import ProductCard from "@/components/ProductCard";
import { api } from "@/services/api";


const HeroSection = () => (
  <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
    <img
      src={heroImage}
      alt="Premium sportswear model"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div className="max-w-xl text-primary-foreground">
        <p className="text-sm uppercase tracking-[0.3em] mb-4 opacity-80 font-body animate-fade-in">Premium Collection 2024</p>
        <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Move Better.<br />Look Better.
        </h1>
        <p className="text-lg opacity-80 mb-8 font-body animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Premium sportswear & lifestyle fashion designed for the bold.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 font-heading font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity rounded animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Shop Now <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

const CategoriesSection = () => {
  const cats = [
    { name: "Men", image: categoryMen },
    { name: "Sports", image: categorySports },
    { name: "Combo Offers", image: comboBanner },
    { name: "Custom Printing", image: customJersey },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cats.map((cat) => (
            <Link
              key={cat.name}
              to="/shop"
              className="group relative aspect-square overflow-hidden rounded hover-lift"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="font-heading font-bold text-primary-foreground text-lg sm:text-xl">{cat.name}</h3>
                <span className="text-primary-foreground/70 text-xs uppercase tracking-wider flex items-center gap-1 mt-1 group-hover:text-accent transition-colors">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrendingSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Trending Now</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl">Best Sellers</h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product, idx) => (
            <ProductCard key={product.id || product._id || idx} product={product} />
          ))}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="aspect-[3/4] bg-muted animate-pulse rounded-2xl"></div>
          ))}
        </div>
        <Link
          to="/shop"
          className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm font-medium uppercase tracking-wider hover:text-accent transition-colors"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

const ComboBanner = () => (
  <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
    <img src={comboBanner} alt="Combo offers" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-primary/70" />
    <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
      <div className="text-primary-foreground max-w-xl">
        <span className="inline-block bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-6">
          Save up to 50%
        </span>
        <h2 className="font-heading font-black text-4xl sm:text-5xl mb-4">Combo Offers</h2>
        <p className="opacity-80 mb-8">T-shirt combos, sportswear combos, and more. Unbeatable value.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 font-heading font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity rounded"
        >
          Shop Combos <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

const CustomPrintingSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Customization</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6">Design Your Own Jerseys</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Create custom jerseys, team kits, and personalized t-shirts. Perfect for teams,
            events, and personal branding. Premium quality printing on high-performance fabrics.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-heading font-semibold uppercase tracking-wider text-sm hover:bg-accent transition-colors rounded"
          >
            Customize Now <Palette size={18} />
          </Link>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src={customJersey}
            alt="Custom jersey"
            className="w-full rounded-lg shadow-lg"
            loading="lazy"
            width={1280}
            height={720}
          />
        </div>
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => {
  const points = [
    { icon: Shield, title: "Quality You Can Feel", desc: "Premium fabrics built to last" },
    { icon: Star, title: "Designed for Daily Use", desc: "Comfort meets style everyday" },
    { icon: Package, title: "Affordable Pricing", desc: "Quality doesn't have to be expensive" },
    { icon: Truck, title: "Fast Delivery", desc: "Quick shipping across India" },
    { icon: Palette, title: "Custom Printing", desc: "Personalized jerseys & tees" },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {points.map((point) => (
            <div key={point.title} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                <point.icon size={24} />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-1">{point.title}</h3>
              <p className="text-xs text-muted-foreground">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => (
  <>
    <HeroSection />
    <CategoriesSection />
    <TrendingSection />
    <ComboBanner />
    <CustomPrintingSection />
    <WhyChooseUs />
  </>
);

export default Index;
