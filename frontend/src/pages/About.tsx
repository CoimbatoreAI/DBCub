import { Target, Eye, CheckCircle } from "lucide-react";

const About = () => (
  <div className="min-h-screen">
    {/* Header */}
    <div className="bg-primary text-primary-foreground section-padding !py-16 text-center">
      <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Our Story</p>
      <h1 className="font-heading font-black text-4xl sm:text-5xl mb-4">Built for Everyday Aesthetic</h1>
      <p className="opacity-70 text-lg">Since 2024</p>
    </div>

    <div className="container mx-auto px-4 max-w-3xl py-16 space-y-12">
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          BD Cub is a growing sports and lifestyle brand focused on delivering quality sportswear, casual
          clothing, and sports equipment for people who live active, confident lives.
        </p>
        <p>
          We started in 2024 with a simple goal — to make reliable, stylish, and affordable products
          accessible to everyone.
        </p>
        <p>
          From breathable sportswear and durable equipment to modern casual outfits, every product is
          designed to meet real-world needs.
        </p>
      </div>

      {/* What We Offer */}
      <div>
        <h2 className="font-heading font-bold text-2xl mb-6">What We Offer</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Performance-driven sportswear",
            "Stylish casual clothing",
            "Durable sports equipment",
            "Custom jerseys & team kits",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-secondary p-4 rounded">
              <CheckCircle size={18} className="text-accent shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="border border-border p-8 rounded">
          <Target size={28} className="text-accent mb-4" />
          <h3 className="font-heading font-bold text-lg mb-3">Our Mission</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To provide high-quality sports and lifestyle products combining performance, comfort, and value.
          </p>
        </div>
        <div className="border border-border p-8 rounded">
          <Eye size={28} className="text-accent mb-4" />
          <h3 className="font-heading font-bold text-lg mb-3">Our Vision</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To become a trusted brand known for quality and customer satisfaction.
          </p>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-border">
        <p className="font-heading font-bold text-xl">BD Cub — Move Better. Look Better.</p>
      </div>
    </div>
  </div>
);

export default About;
