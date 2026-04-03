import { useState } from "react";
import { Search, Package, MapPin, Clock, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { cn } from "@/lib/utils";

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setLoading(true);
    setError("");

    try {
      const data = await api.trackOrder(trackingId);
      if (data && data.ShipmentData && data.ShipmentData.length > 0) {
        setTrackingData(data.ShipmentData[0].Shipment);
      } else {
        setError("Unable to locate package. Requesting manual override.");
      }
    } catch (err) {
      setError("Tracking link severed. Database out of sync.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
        <h1 className="font-heading font-black text-5xl sm:text-7xl mb-4 italic uppercase tracking-tighter">Mission: Tracking</h1>
        <p className="opacity-60 text-xs font-black uppercase tracking-[0.3em]">Real-time logistics monitoring</p>
      </div>

      <div className="container mx-auto px-4 -mt-10 mb-20 relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Search Panel */}
          <div className="bg-secondary/40 backdrop-blur-xl border border-border p-8 rounded-[32px] shadow-2xl">
            <form onSubmit={handleTrack} className="relative group">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="ENTER WAYBILL / TRACKING ID"
                className="w-full bg-secondary border-2 border-border/50 pl-16 pr-24 py-6 rounded-2xl focus:ring-4 focus:ring-accent/20 focus:border-accent outline-none transition-all font-black text-sm uppercase tracking-widest placeholder:text-muted-foreground/30"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={24} />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-heading font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "ENGAGE"}
              </button>
            </form>
            {error && <p className="text-destructive text-[10px] font-black uppercase tracking-widest mt-4 text-center">{error}</p>}
          </div>

          {/* Result Panel */}
          {trackingData && (
            <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
              <div className="bg-secondary/40 border border-border p-8 rounded-[32px] grid md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Status</p>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                    <p className="font-heading font-black text-xl uppercase italic">{trackingData.Status.Status}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Last Known Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-accent" />
                    <p className="font-heading font-black text-xl uppercase italic">{trackingData.Status.StatusLocation || "En Route"}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Est. Transmission</p>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-accent" />
                    <p className="font-heading font-black text-xl uppercase italic">{new Date(trackingData.Status.StatusDateTime).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Timeline Scans */}
              <div className="bg-secondary/20 border border-border rounded-[32px] p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Package size={200} />
                </div>
                <h3 className="font-heading font-black text-xl uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                  <CheckCircle2 className="text-accent" /> Logistics Timeline
                </h3>
                <div className="space-y-8 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-1 bg-border/30 rounded-full" />
                  {trackingData.Scans && trackingData.Scans.map((scan: any, i: number) => (
                    <div key={i} className="flex gap-8 group">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all",
                        i === 0 ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" : "bg-secondary text-muted-foreground"
                      )}>
                        <Package size={20} />
                      </div>
                      <div className="space-y-1 pt-1">
                        <p className={cn(
                          "font-heading font-black text-sm uppercase italic tracking-wide",
                          i === 0 ? "text-accent" : "text-foreground"
                        )}>
                          {scan.ScanDetail.Scan}
                        </p>
                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {scan.ScanDetail.Location}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {new Date(scan.ScanDetail.ScanDateTime).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
