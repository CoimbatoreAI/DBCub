import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.userRegister({ name, email, password });
            if (res.success) {
                toast.success("Registration successful! Please login.");
                navigate("/login");
            } else {
                toast.error(res.message || "Registration failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-secondary/20">
            <div className="w-full max-w-md bg-background rounded-[40px] border border-border p-10 shadow-2xl shadow-primary/5 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <h1 className="font-heading font-black text-4xl tracking-tighter uppercase italic italic">Join the <span className="text-accent italic">Cub</span></h1>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-2">Elite sportswear access awaits</p>
                    <div className="h-1 w-12 bg-accent mx-auto mt-4 rounded-full"></div>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Identity</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-secondary/50 border border-border pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-accent outline-none font-bold text-sm transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Secure Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-secondary/50 border border-border pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-accent outline-none font-bold text-sm transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Passkey</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-secondary/50 border border-border pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-accent outline-none font-bold text-sm transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-accent transition-all active:scale-[0.98] shadow-xl shadow-primary/10 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Initialize Account"}
                        {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Already registered?</p>
                    <Link to="/login" className="text-accent hover:underline font-black uppercase tracking-widest text-[11px]">Return to Login interface</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
