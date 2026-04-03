import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await api.login({ email, password });
            if (data.success) {
                localStorage.setItem("admin_token", data.token);
                toast.success("Welcome, Admin");
                navigate("/admin/dashboard");
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("Connection failed. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-64 -mb-64"></div>

            <div className="max-w-md w-full bg-background border border-border rounded-3xl shadow-2xl p-10 relative z-10">
                <div className="text-center space-y-4 mb-10">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20 scale-110">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-heading font-black tracking-tighter uppercase italic">Control Panel</h1>
                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest px-2">Authorized Access Only</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Admin Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-secondary/50 border border-border pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-bold text-sm"
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-secondary/50 border border-border pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-bold text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-accent transition-all active:scale-[0.98] shadow-xl shadow-primary/20 mt-10 disabled:opacity-50"
                    >
                        {loading ? "Authenticating..." : "Login Securely"} <ArrowRight size={18} />
                    </button>
                </form>

                <p className="text-center mt-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-relaxed px-4">
                    By logging in, you agree to comply with our security protocols and administrative standards.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
