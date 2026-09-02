"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  Sparkles, 
  Package, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Truck, 
  Eye, 
  Sliders, 
  KeyRound, 
  LogOut,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { ARTWORKS, Artwork } from "@/data/mock-data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DEFAULT_MASTER_KEY = "artistry2025";
const AUTH_STORAGE_KEY = "artistry_admin_auth_v1";
const PASSKEY_STORAGE_KEY = "artistry_admin_passkey_v1";
const CATALOG_STORAGE_KEY = "artistry_admin_catalog_v1";
const ORDERS_STORAGE_KEY = "artistry_admin_orders_v1";
const COMMISSIONS_STORAGE_KEY = "artistry_admin_commissions_v1";

interface Order {
  id: string;
  collector: string;
  email: string;
  address: string;
  itemTitle: string;
  itemType: "ORIGINAL" | "PRINT";
  total: number;
  date: string;
  status: "Processing" | "Crated & Sealed" | "In Transit (Insured)" | "Delivered";
}

interface CommissionInquiry {
  id: string;
  collector: string;
  email: string;
  type: string;
  scale: string;
  materials: string[];
  budget: string;
  timeline: string;
  notes: string;
  status: "Under Review" | "Quote Sent" | "Deposit Received" | "In Production" | "Completed";
  date: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "AG-928104",
    collector: "Eleanor Vance",
    email: "eleanor@vanceart.com",
    address: "740 Park Ave, New York, NY 10021",
    itemTitle: "Cosmic Weaver (Original)",
    itemType: "ORIGINAL",
    total: 3800,
    date: "2026-08-28",
    status: "In Transit (Insured)",
  },
  {
    id: "AG-841920",
    collector: "David Chen",
    email: "david.c@chenholdings.sg",
    address: "Marina Bay Residences #42-01, Singapore",
    itemTitle: "Cybernetic Bloom (Archival Print)",
    itemType: "PRINT",
    total: 275,
    date: "2026-09-01",
    status: "Processing",
  },
];

const INITIAL_COMMISSIONS: CommissionInquiry[] = [
  {
    id: "COM-104",
    collector: "Dr. Simone Aris",
    email: "simone@digitalartsfoundation.ch",
    type: "Original Canvas Artwork",
    scale: "Grand Scale (48\" × 60\"+)",
    materials: ["24K Genuine Gold Leaf", "Crushed Brazilian Quartz", "Heavy Impasto Texture"],
    budget: "$6,000 – $12,000",
    timeline: "Standard Studio Schedule (2-3 Months)",
    notes: "Site-specific commission for our private gallery in Zurich. Requires deep emerald tones paired with textured quartz.",
    status: "Deposit Received",
    date: "2026-08-30",
  },
  {
    id: "COM-105",
    collector: "Julian Morales",
    email: "julian@moralesgroup.com",
    type: "Digital Product / WebGL",
    scale: "Custom Scope",
    materials: ["Fiber-Optic Neural Weave", "Cyberpunk UV Luminescence"],
    budget: "$12,000+",
    timeline: "Rush (4-6 Weeks)",
    notes: "Interactive 3D generative WebGL art installation for upcoming pavilion exhibition in Milan.",
    status: "Under Review",
    date: "2026-09-02",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "catalog" | "orders" | "commissions" | "settings">("overview");

  // Manageable State
  const [catalog, setCatalog] = useState<Artwork[]>(ARTWORKS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [commissions, setCommissions] = useState<CommissionInquiry[]>(INITIAL_COMMISSIONS);
  const [masterPasskey, setMasterPasskey] = useState(DEFAULT_MASTER_KEY);
  const [newPasskey, setNewPasskey] = useState("");
  const [passkeySuccess, setPasskeySuccess] = useState(false);

  // New Artwork Form Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newArt, setNewArt] = useState({
    title: "",
    type: "ORIGINAL" as "ORIGINAL" | "PRINT",
    medium: "",
    dimensions: "",
    price: 1200,
    shortDescription: "",
    image: "/images/hero-art.jpg",
    editionInfo: "",
  });

  // Load saved data on mount
  useEffect(() => {
    try {
      const isAuth = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
      if (isAuth) setIsAuthenticated(true);

      const savedPasskey = localStorage.getItem(PASSKEY_STORAGE_KEY);
      if (savedPasskey) setMasterPasskey(savedPasskey);

      const savedCatalog = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (savedCatalog) setCatalog(JSON.parse(savedCatalog));

      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCommissions = localStorage.getItem(COMMISSIONS_STORAGE_KEY);
      if (savedCommissions) setCommissions(JSON.parse(savedCommissions));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === masterPasskey) {
      setIsAuthenticated(true);
      setAuthError(false);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const handleUpdatePasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasskey.trim().length >= 6) {
      setMasterPasskey(newPasskey.trim());
      localStorage.setItem(PASSKEY_STORAGE_KEY, newPasskey.trim());
      setPasskeySuccess(true);
      setNewPasskey("");
      setTimeout(() => setPasskeySuccess(false), 3000);
    }
  };

  // Toggle Artwork Status (Available <-> Sold)
  const toggleArtStatus = (id: string) => {
    const updated = catalog.map((art) => {
      if (art.id === id) {
        const nextStatus = art.status === "available" ? "sold" : "available";
        return { ...art, status: nextStatus as any };
      }
      return art;
    });
    setCatalog(updated);
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updated));
  };

  // Delete Artwork
  const deleteArt = (id: string) => {
    const updated = catalog.filter((art) => art.id !== id);
    setCatalog(updated);
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updated));
  };

  // Add Artwork
  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Artwork = {
      id: `art-${Date.now()}`,
      slug: newArt.title.toLowerCase().replace(/\s+/g, "-"),
      title: newArt.title,
      type: newArt.type,
      medium: newArt.medium,
      dimensions: newArt.dimensions,
      price: Number(newArt.price),
      status: "available",
      year: new Date().getFullYear(),
      image: newArt.image,
      description: newArt.shortDescription,
      shortDescription: newArt.shortDescription,
      galleryImages: [newArt.image],
      editionInfo: newArt.type === "PRINT" ? newArt.editionInfo || "Limited Edition" : undefined,
    };
    const updated = [created, ...catalog];
    setCatalog(updated);
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updated));
    setShowAddModal(false);
    setNewArt({
      title: "",
      type: "ORIGINAL",
      medium: "",
      dimensions: "",
      price: 1200,
      shortDescription: "",
      image: "/images/hero-art.jpg",
      editionInfo: "",
    });
  };

  // Cycle Order Status
  const cycleOrderStatus = (orderId: string) => {
    const statuses: Order["status"][] = [
      "Processing",
      "Crated & Sealed",
      "In Transit (Insured)",
      "Delivered",
    ];
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const currentIndex = statuses.indexOf(o.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...o, status: nextStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Cycle Commission Status
  const cycleCommissionStatus = (comId: string) => {
    const statuses: CommissionInquiry["status"][] = [
      "Under Review",
      "Quote Sent",
      "Deposit Received",
      "In Production",
      "Completed",
    ];
    const updated = commissions.map((c) => {
      if (c.id === comId) {
        const currentIndex = statuses.indexOf(c.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...c, status: nextStatus };
      }
      return c;
    });
    setCommissions(updated);
    localStorage.setItem(COMMISSIONS_STORAGE_KEY, JSON.stringify(updated));
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 12000; // Includes deposit
  const availableOriginals = catalog.filter((a) => a.type === "ORIGINAL" && a.status === "available").length;

  // 1. GATEKEEPER SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md rounded-3xl border border-amber-500/30 bg-[#0d0e12] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Studio Owner Portal
            </h1>
            <p className="text-xs text-neutral-400">
              Restricted area. Please provide your studio master passkey to access inventory, collector orders, and commission pipelines.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1.5">
                Master Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter studio passkey..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 mt-2">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Invalid master passkey. Default is: artistry2025</span>
                </div>
              )}
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full text-xs gap-2">
              <KeyRound className="h-4 w-4" />
              <span>Authenticate & Access Dashboard</span>
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-neutral-500">
              Default Studio Key: <span className="font-mono text-amber-400">artistry2025</span> (Changeable in Settings)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN PANEL
  return (
    <div className="min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Command Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  ARTISTRYGIGS Studio Command
                </h1>
                <Badge variant="gold" className="text-[10px]">
                  Owner Verified
                </Badge>
              </div>
              <p className="text-xs text-neutral-400">
                Direct management of artwork catalog, collector shipments, and commissions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <span>View Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs gap-1.5 text-neutral-400 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Lock Session</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            { id: "overview", label: "Overview & Metrics" },
            { id: "catalog", label: `Artwork Catalog (${catalog.length})` },
            { id: "orders", label: `Collector Orders (${orders.length})` },
            { id: "commissions", label: `Commission Pipeline (${commissions.length})` },
            { id: "settings", label: "Master Security & Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-500 text-neutral-950 font-bold shadow-md"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & METRICS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs uppercase font-semibold">Total Studio Volume</span>
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">{formatPrice(totalRevenue)}</div>
                <p className="text-[11px] text-emerald-400">Includes acquisitions & commission deposits</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs uppercase font-semibold">Available Originals</span>
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">{availableOriginals} Canvases</div>
                <p className="text-[11px] text-neutral-400">Ready for white-glove courier freight</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs uppercase font-semibold">Fulfillment Orders</span>
                  <Truck className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">{orders.length} Active</div>
                <p className="text-[11px] text-cyan-400">1 in transit with international insurance</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111116] p-6 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs uppercase font-semibold">Pending Inquiries</span>
                  <Clock className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">{commissions.length} Requests</div>
                <p className="text-[11px] text-amber-400">1 awaiting formal milestone quote</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-3xl border border-white/10 bg-[#111116] p-8 space-y-6">
              <h2 className="text-lg font-bold text-white">Studio Quick Operations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-left hover:bg-amber-500/15 transition-colors"
                >
                  <Plus className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="text-sm font-bold text-white">Add Artwork to Catalog</div>
                    <div className="text-xs text-neutral-400">Create new original piece or print edition</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition-colors"
                >
                  <Package className="h-6 w-6 text-cyan-400" />
                  <div>
                    <div className="text-sm font-bold text-white">Update Freight Status</div>
                    <div className="text-xs text-neutral-400">Mark orders as crated, shipped, or delivered</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("commissions")}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition-colors"
                >
                  <Clock className="h-6 w-6 text-purple-400" />
                  <div>
                    <div className="text-sm font-bold text-white">Review Inquiries</div>
                    <div className="text-xs text-neutral-400">Review specs and reply to collectors</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTWORK CATALOG MANAGER */}
        {activeTab === "catalog" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Artwork Catalog Management</h2>
                <p className="text-xs text-neutral-400">
                  Toggle availability, change pricing, and add new artworks live.
                </p>
              </div>
              <Button
                variant="gold"
                size="sm"
                onClick={() => setShowAddModal(true)}
                className="gap-2 text-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Add Artwork</span>
              </Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111116] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-neutral-300">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-neutral-400">
                    <tr>
                      <th className="p-4">Piece</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Dimensions</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {catalog.map((art) => {
                      const isSold = art.status === "sold";
                      return (
                        <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                                <Image
                                  src={art.image}
                                  alt={art.title}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div>
                                <div className="font-bold text-white">{art.title}</div>
                                <div className="text-xs text-neutral-400">{art.medium}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={art.type === "ORIGINAL" ? "gold" : "cyan"} className="text-[10px]">
                              {art.type === "ORIGINAL" ? "Original" : "Print"}
                            </Badge>
                          </td>
                          <td className="p-4 text-xs text-neutral-300">{art.dimensions}</td>
                          <td className="p-4 font-mono font-bold text-amber-400">
                            {formatPrice(art.price)}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                isSold
                                  ? "bg-neutral-800 text-neutral-400 border border-neutral-700"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${isSold ? "bg-neutral-500" : "bg-emerald-400"}`} />
                              {isSold ? "Sold Out" : "Available"}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleArtStatus(art.id)}
                              className="text-xs h-8 px-3"
                            >
                              {isSold ? "Mark Available" : "Mark Sold"}
                            </Button>
                            <button
                              onClick={() => deleteArt(art.id)}
                              className="text-neutral-500 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                              aria-label="Delete piece"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COLLECTOR ORDERS MANAGER */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-white">Collector Acquisition Orders</h2>
              <p className="text-xs text-neutral-400">
                Track payments and click status to advance fulfillment milestones.
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-[#111116] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-amber-400">{order.id}</span>
                      <span className="text-xs text-neutral-500">•</span>
                      <span className="text-xs text-neutral-400">{order.date}</span>
                      <Badge variant="subtle" className="text-[10px]">
                        Paid via Stripe
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{order.itemTitle}</h3>
                      <p className="text-xs text-neutral-300">
                        Collector: <span className="font-semibold text-white">{order.collector}</span> ({order.email})
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Ship to: {order.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-3 self-stretch md:self-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                    <div className="text-lg font-extrabold text-amber-400">
                      {formatPrice(order.total)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Fulfillment:</span>
                      <button
                        onClick={() => cycleOrderStatus(order.id)}
                        className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
                      >
                        <Truck className="h-3.5 w-3.5" />
                        <span>{order.status}</span>
                        <ChevronRight className="h-3 w-3 text-cyan-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMMISSION INQUIRIES */}
        {activeTab === "commissions" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-white">Bespoke Commission Requests</h2>
              <p className="text-xs text-neutral-400">
                Client parameters received via the /commission interactive form. Click status badge to advance pipeline.
              </p>
            </div>

            <div className="space-y-4">
              {commissions.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-[#111116] p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-purple-400">{c.id}</span>
                        <h3 className="text-base font-bold text-white">{c.collector}</h3>
                        <span className="text-xs text-neutral-400">({c.email})</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">Submitted on {c.date}</p>
                    </div>

                    <button
                      onClick={() => cycleCommissionStatus(c.id)}
                      className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{c.status}</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block uppercase font-semibold">Type</span>
                      <span className="text-white font-medium">{c.type}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase font-semibold">Scale</span>
                      <span className="text-white font-medium">{c.scale}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase font-semibold">Budget Tier</span>
                      <span className="text-amber-400 font-bold">{c.budget}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase font-semibold">Timeline</span>
                      <span className="text-white font-medium">{c.timeline}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-neutral-500 text-xs uppercase font-semibold">Materials & Accents</span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.materials.map((mat) => (
                        <span key={mat} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-neutral-300">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-neutral-300">
                    <span className="text-neutral-400 block font-semibold mb-1">Collector Notes:</span>
                    {c.notes}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <a href={`mailto:${c.email}?subject=ARTISTRYGIGS Commission Proposal [${c.id}]`}>
                      <Button variant="gold" size="sm" className="text-xs">
                        Email Client Formal Quote
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MASTER SECURITY & SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-white">Studio Master Security</h2>
              <p className="text-xs text-neutral-400">
                Change your admin master passkey to lock this panel exclusively to you.
              </p>
            </div>

            <form onSubmit={handleUpdatePasskey} className="rounded-2xl border border-white/10 bg-[#111116] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Change Master Passkey</h3>
                  <p className="text-xs text-neutral-400">Set a personal secure passcode for future logins.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1.5">
                  New Master Passkey (Min 6 chars)
                </label>
                <input
                  required
                  type="password"
                  value={newPasskey}
                  onChange={(e) => setNewPasskey(e.target.value)}
                  placeholder="Enter new master passkey..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              {passkeySuccess && (
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Master passkey successfully updated!</span>
                </div>
              )}

              <Button type="submit" variant="gold" size="sm" className="text-xs">
                Save New Passkey
              </Button>
            </form>
          </div>
        )}

      </div>

      {/* ADD NEW ARTWORK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-[#0d0e12] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Add New Artwork to Catalog</h2>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-white text-xs uppercase font-semibold">
                Close
              </button>
            </div>

            <form onSubmit={handleAddArtwork} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={newArt.title}
                  onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                  placeholder="e.g. Celestial Symmetry"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1">Category</label>
                  <select
                    value={newArt.type}
                    onChange={(e) => setNewArt({ ...newArt, type: e.target.value as any })}
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="ORIGINAL">Original Painting</option>
                    <option value="PRINT">Limited Archival Print</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1">Price (USD)</label>
                  <input
                    required
                    type="number"
                    value={newArt.price}
                    onChange={(e) => setNewArt({ ...newArt, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-white font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1">Medium / Materials</label>
                <input
                  required
                  type="text"
                  value={newArt.medium}
                  onChange={(e) => setNewArt({ ...newArt, medium: e.target.value })}
                  placeholder="e.g. Oil, 24k Gold Leaf on Linen Canvas"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1">Dimensions</label>
                <input
                  required
                  type="text"
                  value={newArt.dimensions}
                  onChange={(e) => setNewArt({ ...newArt, dimensions: e.target.value })}
                  placeholder="e.g. 36 x 48 inches (91 x 122 cm)"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={newArt.shortDescription}
                  onChange={(e) => setNewArt({ ...newArt, shortDescription: e.target.value })}
                  placeholder="Summary for catalog cards..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Publish to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
