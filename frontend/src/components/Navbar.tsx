import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/products";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  return (
    <>
      <div className="bg-primary text-primary-foreground text-xs py-2 text-center font-body tracking-wider">
        FREE SHIPPING ON ORDERS ABOVE ₹999 | USE CODE: <span className="text-accent font-semibold">DBCUB10</span>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="DB CUB Logo" className="h-10 w-auto" />
            <span className="hidden sm:inline font-heading font-extrabold text-lg sm:text-xl tracking-tight">
              DB CUB <span className="text-accent">SPORT'S</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "bg-transparent uppercase tracking-wide", location.pathname === "/" && "text-accent")}>
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn("bg-transparent uppercase tracking-wide px-4", location.pathname === "/shop" && "text-accent")}>
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 w-[800px] p-6 gap-8 bg-background border border-border shadow-xl rounded-lg">
                      {categories.map((category) => (
                        <div key={category.name} className="space-y-3">
                          <Link
                            to={`/shop?category=${category.name}`}
                            className="font-heading font-bold text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                          >
                            {category.name}
                          </Link>
                          <ul className="space-y-2">
                            {category.subcategories.map((sub: any) => (
                              <li key={sub.name || sub}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={`/shop?category=${category.name}&subcategory=${sub.name || sub}`}
                                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                                  >
                                    {sub.name || sub}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about" className={cn(navigationMenuTriggerStyle(), "bg-transparent uppercase tracking-wide", location.pathname === "/about" && "text-accent")}>
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact" className={cn(navigationMenuTriggerStyle(), "bg-transparent uppercase tracking-wide", location.pathname === "/contact" && "text-accent")}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:block p-2 hover:text-accent transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="p-2 hover:text-accent transition-colors" aria-label="Wishlist">
              <Heart size={20} />
            </button>
            <Link
              to={localStorage.getItem("user_token") ? "/account" : "/login"}
              className="p-2 hover:text-accent transition-colors flex items-center gap-2 group"
              aria-label="Account"
            >
              <User size={20} />
              {localStorage.getItem("user_data") && (
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest max-w-[80px] truncate">
                  {JSON.parse(localStorage.getItem("user_data")!).name.split(' ')[0]}
                </span>
              )}
            </Link>
            <button
              className="p-2 hover:text-accent transition-colors relative"
              onClick={() => setIsOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col py-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={cn("px-6 py-3 text-sm font-medium uppercase tracking-wide", location.pathname === "/" ? "text-accent" : "text-foreground")}
              >
                Home
              </Link>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="shop" className="border-none">
                  <AccordionTrigger className="px-6 py-3 text-sm font-medium uppercase tracking-wide hover:no-underline flex justify-between">
                    Shop
                  </AccordionTrigger>
                  <AccordionContent className="bg-secondary/20">
                    <div className="px-6 py-2 flex flex-col gap-4">
                      {categories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <Link
                            to={`/shop?category=${category.name}`}
                            onClick={() => setMobileOpen(false)}
                            className="font-bold text-sm text-foreground block"
                          >
                            {category.name}
                          </Link>
                          <div className="pl-4 flex flex-col gap-2">
                            {category.subcategories.map((sub: any) => (
                              <Link
                                key={sub.name || sub}
                                to={`/shop?category=${category.name}&subcategory=${sub.name || sub}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-muted-foreground hover:text-accent"
                              >
                                {sub.name || sub}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={cn("px-6 py-3 text-sm font-medium uppercase tracking-wide", location.pathname === "/about" ? "text-accent" : "text-foreground")}
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={cn("px-6 py-3 text-sm font-medium uppercase tracking-wide", location.pathname === "/contact" ? "text-accent" : "text-foreground")}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
