import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, Shield } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.userLogin({ email, password });
            if (res.success) {
                localStorage.setItem("user_token", res.token);
                localStorage.setItem("user_data", JSON.stringify(res.user));
                toast.success(`Welcome back, ${res.user.name}!`);
                navigate("/");
            } else {
                toast.error(res.message || "Login failed");
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
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20 transition-transform hover:scale-110 active:scale-95 cursor-pointer">
                            <Shield className="text-accent" size={32} />
                        </div>
                    </div>
                    <h1 className="font-heading font-black text-4xl tracking-tighter uppercase italic">User <span className="text-accent italic tracking-tighter">Login</span></h1>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-2">Access your exclusive profile</p>
                    <div className="h-1 w-12 bg-accent mx-auto mt-4 rounded-full"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Identifier</label>
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
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification Passkey</label>
                            <button type="button" className="text-[8px] font-black uppercase text-accent hover:underline">Reset access?</button>
                        </div>
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
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Authenticate Access"}
                        {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">No account yet?</p>
                    <Link to="/register" className="text-accent hover:underline font-black uppercase tracking-widest text-[11px]">Deploy New User Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
