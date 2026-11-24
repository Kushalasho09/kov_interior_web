'use client';

import React, { useState } from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import WhoWeServeSection from './WhoWeServeSection';
import FeaturesGridSection from './FeaturesGridSection';
import SuccessStoriesSection from './SuccessStoriesSection';
import PricingSection from './PricingSection';
import LandingFooter from './LandingFooter';
import ContactModal from './ContactModal';
import LockedFeatureModal, { LockedFeatureInfo } from './LockedFeatureModal';
import WebLoginModal, { UserRole } from '../auth/WebLoginModal';
import { ActiveTab } from '../Sidebar';

interface LandingPageProps {
  onEnterWorkspace: (role: UserRole, targetTab?: ActiveTab) => void;
  onRefreshData?: () => void;
}

export default function LandingPage({
  onEnterWorkspace,
  onRefreshData,
}: LandingPageProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledFeature, setPrefilledFeature] = useState<string | undefined>(undefined);
  const [lockedFeature, setLockedFeature] = useState<LockedFeatureInfo | null>(null);

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectActiveFeature = (tabId: ActiveTab) => {
    onEnterWorkspace('studio_lead', tabId);
  };

  const handleSelectLockedFeature = (feature: LockedFeatureInfo) => {
    setLockedFeature(feature);
  };

  const handleRequestUpgrade = (featureName: string) => {
    setLockedFeature(null);
    setPrefilledFeature(featureName);
    setIsContactOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    setPrefilledFeature(`Subscription: ${planName}`);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0F13] text-slate-900 dark:text-[#F3F4F6] selection:bg-[#C9A46C] selection:text-black transition-colors">
      {/* Top Sticky Navbar with Theme Switcher & Backdrop-shielded Mega Menu */}
      <LandingNavbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenContact={() => {
          setPrefilledFeature(undefined);
          setIsContactOpen(true);
        }}
        onSelectActiveFeature={handleSelectActiveFeature}
        onSelectLockedFeature={handleSelectLockedFeature}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Landing Sections */}
      <main>
        {/* Unslopped Hero Section with Real Architectural Perspective */}
        <HeroSection
          onOpenContact={() => {
            setPrefilledFeature(undefined);
            setIsContactOpen(true);
          }}
          onExploreOs={() => onEnterWorkspace('studio_lead', 'overview')}
          onOpenLogin={() => setIsLoginOpen(true)}
        />

        {/* Who We Serve */}
        <WhoWeServeSection
          onOpenContact={() => {
            setPrefilledFeature('Who We Serve Consultation');
            setIsContactOpen(true);
          }}
        />

        {/* Core Features Grid */}
        <FeaturesGridSection
          onSelectActiveFeature={handleSelectActiveFeature}
          onSelectLockedFeature={handleSelectLockedFeature}
        />

        {/* Success Stories */}
        <SuccessStoriesSection
          onOpenContact={() => {
            setPrefilledFeature('Case Studies Consultation');
            setIsContactOpen(true);
          }}
        />

        {/* Pricing Tiers */}
        <PricingSection onSelectPlan={handleSelectPlan} />
      </main>

      {/* Footer */}
      <LandingFooter
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenContact={() => {
          setPrefilledFeature(undefined);
          setIsContactOpen(true);
        }}
      />

      {/* Contact & Demo Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledFeature={prefilledFeature}
        onLeadSubmitted={onRefreshData}
      />

      {/* Locked Enterprise Feature Modal */}
      <LockedFeatureModal
        feature={lockedFeature}
        onClose={() => setLockedFeature(null)}
        onRequestUpgrade={handleRequestUpgrade}
      />

      {/* Web Login Modal with 3 Equal Spaced Tabs */}
      <WebLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(role) => {
          setIsLoginOpen(false);
          onEnterWorkspace(role);
        }}
      />
    </div>
  );
}
