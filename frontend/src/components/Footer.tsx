import { Link } from "react-router-dom";
import { Youtube, Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="DB CUB Logo" className="h-8 w-auto brightness-0 invert" />
              <h3 className="font-heading font-extrabold text-xl">
                DB CUB <span className="text-accent">SPORT'S</span>
              </h3>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-6">
              Premium sportswear & lifestyle fashion. Move Better. Look Better.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/9487006033" target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 rounded hover:bg-[#25D366] hover:border-[#25D366] group transition-colors" aria-label="WhatsApp">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:text-white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="https://youtube.com/@db_cub_sports_and_fashion?si=34OGKTbjwtqAjT7z" target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 rounded hover:bg-accent hover:border-accent transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://www.instagram.com/db_cub?igsh=MTByaTRpMW44ZjgxMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 rounded hover:bg-accent hover:border-accent transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/1BHNPWDqFQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 rounded hover:bg-accent hover:border-accent transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Shop All", path: "/shop" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Track Order", path: "/track-order" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2">
              {["T-Shirts", "Sportswear", "Cricket", "Custom Jerseys", "Combo Offers"].map((cat) => (
                <li key={cat}>
                  <Link to="/shop" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-70">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>25, Thadagam Road, TVS Nagar, Opp. Siruvani Hotel, Coimbatore – 641025</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Phone size={16} className="shrink-0" />
                <span>9487006033 / 8428006133</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Mail size={16} className="shrink-0" />
                <span>dbcub7@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs opacity-50">
          © {new Date().getFullYear()} DB CUB SPORT'S & FASHION. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
