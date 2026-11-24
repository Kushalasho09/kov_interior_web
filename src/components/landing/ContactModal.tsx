'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Send, CheckCircle2, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledFeature?: string;
  onLeadSubmitted?: () => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  prefilledFeature,
  onLeadSubmitted,
}: ContactModalProps) {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [studioName, setStudioName] = useState('');
  const [teamSize, setTeamSize] = useState('10-20');
  const [solution, setSolution] = useState(
    prefilledFeature ? `Enterprise: ${prefilledFeature}` : 'Full Turnkey Studio OS'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    try {
      const fullPhone = `${countryCode} ${phone}`;
      const compiledNotes = `Studio: ${studioName || 'Individual'} | Team Size: ${teamSize} | Solution: ${solution}${
        notes ? ` | Notes: ${notes}` : ''
      }`;

      // Insert into Supabase leads table
      const { error } = await supabase.from('leads').insert([
        {
          client_name: fullName,
          phone: fullPhone,
          email: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@example.com`,
          property_type: studioName ? `Studio: ${studioName}` : 'Turnkey Interior',
          location: city || 'Ahmedabad',
          stage: 'new',
          estimated_budget: teamSize === '50+' ? 400000 : teamSize === '20-50' ? 200000 : 60000,
          notes: compiledNotes,
        },
      ]);

      if (error) {
        console.error('Failed to submit demo inquiry:', error);
      }

      setIsSuccess(true);
      if (onLeadSubmitted) {
        onLeadSubmitted();
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#10131A] border border-slate-200 dark:border-[#272E3F] rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-900 dark:text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-[#161A24] hover:bg-slate-200 dark:hover:bg-[#202534] border border-slate-200 dark:border-[#272E3F] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-luxury">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md">
              Thank you, <span className="font-semibold text-slate-900 dark:text-white">{fullName}</span>.
              Our Kov Interiors Enterprise Architecture Specialist will reach out within 2 hours
              on <span className="font-mono text-[#B58E50] dark:text-[#DFCAA5]">{countryCode} {phone}</span>.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#282F40] text-xs text-slate-500 dark:text-slate-400">
              Inquiry synchronized live with our CRM pipeline.
            </div>
            <button
              onClick={resetAndClose}
              className="mt-6 py-2.5 px-6 rounded-xl bg-[#0F172A] dark:bg-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Left Column: Studio Details */}
            <div className="md:col-span-2 p-6 sm:p-7 bg-slate-50 dark:bg-[#141822] border-b md:border-b-0 md:border-r border-slate-200 dark:border-[#222736] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-[#C9A46C]/15 border border-amber-200 dark:border-[#C9A46C]/30 text-slate-800 dark:text-[#DFCAA5] text-[10px] font-bold tracking-wider uppercase mb-3">
                  <Sparkles className="w-3 h-3 text-[#B58E50] dark:text-[#C9A46C]" />
                  <span>Kov Interiors</span>
                </div>
                <h3 className="text-xl font-bold font-luxury text-slate-900 dark:text-white">
                  Talk to Our Studio Experts
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Discover how AI-driven workflows empower design and execution teams to plan, track, and deliver luxury turnkey residences.
                </p>

                <div className="mt-6 space-y-4 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Direct Inquiries</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">+91 98250 89000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Studio Desk</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">contact@kovinterior.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B58E50] dark:text-[#C9A46C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Ahmedabad Studio</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        Prahlad Nagar, Corporate Rd, Ahmedabad 380015
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#242A3A] text-[10px] text-slate-500 dark:text-slate-400">
                Trusted by 5,000+ luxury turnkey projects across India and the Middle East.
              </div>
            </div>

            {/* Right Column: Inquiries Form */}
            <div className="md:col-span-3 p-6 sm:p-7 bg-white dark:bg-[#10131A]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1">
                Book a Live Demo
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Experience full real-time synchronization between the Web OS and Mobile Field App.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ar. Kushal Patel"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Code
                    </label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+65">+65 (SG)</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98250 12345"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ar@studio.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ahmedabad"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Studio / Firm
                    </label>
                    <input
                      type="text"
                      value={studioName}
                      onChange={(e) => setStudioName(e.target.value)}
                      placeholder="Kov Atelier"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Team Size
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                    >
                      <option value="< 10">&lt; 10 Members</option>
                      <option value="10-20">10-20 Members</option>
                      <option value="20-50">20-50 Members</option>
                      <option value="50+">50+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Primary Interest
                  </label>
                  <select
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#171B24] border border-slate-200 dark:border-[#272D3E] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#B58E50] dark:focus:border-[#C9A46C]"
                  >
                    <option value="Full Turnkey Studio OS">Full Turnkey Studio OS (All 10 Modules)</option>
                    <option value="Design & Drawing Pins">Design Management & Drawing Pins</option>
                    <option value="BOQ & Scope Estimator">BOQ & Scope Estimator with Escrow</option>
                    <option value="Site Tracking & Field App">Site Tracking & Field Photo Stream</option>
                    <option value="HRMS & Labor Muster Roll">HRMS, Labor Muster Roll & Payroll</option>
                    <option value="Enterprise White Labelling">Enterprise Custom SOP & White-labelling</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-2.5 px-4 rounded-xl bg-[#0F172A] hover:bg-slate-800 dark:bg-gradient-to-r dark:from-[#C9A46C] dark:to-[#B59058] dark:hover:from-[#D4B27C] dark:hover:to-[#C9A46C] text-white dark:text-[#0D0F13] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Confirm Demo Request'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
