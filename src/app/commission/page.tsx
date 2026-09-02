"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Palette, 
  Code2, 
  ShieldCheck, 
  UploadCloud, 
  DollarSign,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommissionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "canvas",
    dimensions: "medium",
    materials: ["gold-leaf"],
    budget: "3k-6k",
    timeline: "2-3months",
    description: "",
    referenceUrl: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMaterial = (material: string) => {
    setFormData((prev) => {
      const exists = prev.materials.includes(material);
      return {
        ...prev,
        materials: exists
          ? prev.materials.filter((m) => m !== material)
          : [...prev.materials, material],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Private Art & Tech Commissions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Commission a Bespoke Creation
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Collaborate directly with the studio on an original physical canvas or a custom digital platform. Fill out the project parameters below to receive a formal proposal.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-amber-500/30 bg-[#111116] p-10 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Inquiry Received by the Studio
              </h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-semibold">{formData.name}</span>. We will review your vision and reply with a tailored quote within 24 to 48 hours to <span className="text-white underline">{formData.email}</span>.
              </p>
            </div>
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="text-xs"
              >
                Submit Another Inquiry
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-[#111116] p-8 sm:p-12 shadow-2xl space-y-10"
          >
            {/* Step 1: Discipline / Type */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                1. Select Commission Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: "canvas" })}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    formData.projectType === "canvas"
                      ? "border-amber-500 bg-amber-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20"
                  }`}
                >
                  <Palette className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Original Canvas Artwork</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Oil glaze, 24k gold leaf, impasto, or embedded mineral crystals.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: "digital" })}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    formData.projectType === "digital"
                      ? "border-cyan-500 bg-cyan-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20"
                  }`}
                >
                  <Code2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Digital Product / WebGL</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Next.js web application, 3D WebGL engine, or bespoke brand system.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Dimensions / Scale */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                2. Canvas Dimensions or Project Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "medium", label: "Medium Statement", detail: "36\" × 48\" (91 × 122 cm)" },
                  { id: "large", label: "Large Grand Scale", detail: "48\" × 60\"+ (122 × 152 cm+)" },
                  { id: "custom", label: "Custom Architectural", detail: "Site-specific sizing" },
                ].map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, dimensions: size.id })}
                    className={`rounded-xl border p-3.5 text-center transition-all ${
                      formData.dimensions === size.id
                        ? "border-amber-500 bg-amber-500/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{size.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{size.detail}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Material Accents */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                3. Material & Technique Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "gold-leaf", label: "24K Genuine Gold Leaf" },
                  { id: "quartz", label: "Crushed Brazilian Quartz" },
                  { id: "impasto", label: "Heavy Impasto Texture" },
                  { id: "fiber-optics", label: "Fiber-Optic Neural Weave" },
                  { id: "cyber-neon", label: "Cyberpunk UV Luminescence" },
                ].map((mat) => {
                  const isChecked = formData.materials.includes(mat.id);
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => toggleMaterial(mat.id)}
                      className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                        isChecked
                          ? "border-amber-500 bg-amber-500/20 text-amber-300 font-semibold"
                          : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}
                      {mat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Target Budget Allocation (USD)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="1.5k-3k">$1,500 – $3,000 (Small Canvas or Prints Series)</option>
                  <option value="3k-6k">$3,000 – $6,000 (Signature Medium Canvas / Custom Feature)</option>
                  <option value="6k-12k">$6,000 – $12,000 (Grand Scale Estate Canvas / Full Web App)</option>
                  <option value="12k+">$12,000+ (Multi-Piece Installation / Enterprise Suite)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Desired Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="1month">Rush (4-6 Weeks, Priority)</option>
                  <option value="2-3months">Standard Studio Schedule (2-3 Months)</option>
                  <option value="flexible">Flexible / Collector Preservation</option>
                </select>
              </div>
            </div>

            {/* Step 5: Description & Concept */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                Project Vision & Space Details
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your desired palette, interior room context, lighting conditions, or software product requirements..."
                className="w-full rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Step 6: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cynthia Sterling"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="cynthia@domain.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Confidential consultation • No commitment required</span>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={loading}
                className="w-full sm:w-auto gap-2"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? "Transmitting..." : "Submit Commission Request"}</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
