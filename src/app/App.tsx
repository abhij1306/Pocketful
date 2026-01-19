import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { SmartErrorRecovery } from '@/app/components/SmartErrorRecovery';
import { MobileTradingView } from '@/app/components/MobileTradingView';
import { DesktopAlgoInterface } from '@/app/components/DesktopAlgoInterface';
import { DesktopStrategyBuilder } from '@/app/components/DesktopStrategyBuilder';
import { TSEModal } from "@/app/components/TSEModal";
import { ROMModal } from "@/app/components/ROMModal";
import { CASHModal } from "@/app/components/CASHModal";
import {
  Smartphone, Monitor, AlertCircle, TrendingUp, Sparkles,
  FileText, CheckCircle, Map, Clock, ShieldAlert,
  BarChart3, UserCheck, Search, ArrowRight, ExternalLink,
  Target, Globe, Zap, Users, Milestone, Wrench, ClipboardCheck, Code2, Check, ArrowDown, Info, Wifi, WifiOff, Database, Menu, X, Activity, Star, Quote, ChevronRight
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from '@/app/components/ui/dialog';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table';
import { toast, Toaster } from 'sonner';
import { FLAWS, IMPACT_METRICS, PRD_DATA, UAT_SCENARIOS, COMPETITOR_ANALYSIS, RACI_MATRIX, KYC_JOURNEY, ROADMAP_TABLE, USER_FLOW, PERSONAS, PERSONA_INSIGHT, DEEP_COMPETITIVE_ANALYSIS, TARGET_BUSINESS_METRICS, FEATURE_MAPPING, PERSONA_COLORS, METRIC_COLORS, RISK_ASSESSMENT } from './data';

type DemoMode = 'landing' | 'mobile-error' | 'desktop-algo';

export default function App() {
  const [demoMode, setDemoMode] = useState<DemoMode>('landing');
  const [showSmartRecovery, setShowSmartRecovery] = useState(false);
  const [errorType, setErrorType] = useState<'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED'>('DATA_UNAVAILABLE');
  const [showStrategyBuilder, setShowStrategyBuilder] = useState(false);
  const [showTSEModal, setShowTSEModal] = useState(false);
  const [showROMModal, setShowROMModal] = useState(false);
  const [showCASHModal, setShowCASHModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFlawId, setSelectedFlawId] = useState(FLAWS[0].id);
  const [selectedPrdId, setSelectedPrdId] = useState(PRD_DATA.features[0].id);
  const [selectedFeatureId, setSelectedFeatureId] = useState(PRD_DATA.features[0].id);

  const selectedFlaw = FLAWS.find(f => f.id === selectedFlawId) || FLAWS[0];

  const handleMobileErrorDemo = () => {
    setDemoMode('mobile-error');
    setErrorType('DATA_UNAVAILABLE');
    setShowSmartRecovery(true);
    window.scrollTo(0, 0);
  };

  const handleDesktopAlgoDemo = () => {
    setDemoMode('desktop-algo');
    window.scrollTo(0, 0);
  };

  const triggerError = (type: typeof errorType) => {
    setErrorType(type);
    setShowSmartRecovery(true);
  };

  const handleSaveStrategy = () => {
    toast.success('Strategy activated successfully! 🚀');
  };

  if (demoMode === 'mobile-error') {
    return (
      <>
        <Toaster position="top-center" />
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600 font-bold -ml-2 text-xs md:text-sm"
              onClick={() => {
                setDemoMode('landing');
                setShowSmartRecovery(false);
                setTimeout(() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'instant' });
                }, 0);
              }}
            >
              ← <span className="hidden sm:inline">Back to Innovation Suite</span><span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-blue-50 p-1.5 md:p-2 rounded-lg">
                <Smartphone className="size-4 md:size-5 text-blue-600" />
              </div>
              <div>
                <span className="block text-xs md:text-sm font-bold text-gray-900 leading-none">Resilient Mobile</span>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:block">Interactive Demo</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 md:p-8 gap-6 lg:gap-12 items-center lg:items-start justify-center">

            {/* Phone Container - Centered */}
            <div className="flex-1 flex justify-center items-start pt-4 md:pt-8 w-full max-w-[400px] lg:max-w-none">
              <div className="relative w-full max-w-[320px] md:max-w-[360px] aspect-[9/19.5] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-gray-200 overflow-hidden ring-1 ring-gray-900/5">
                {/* Status Bar Mockup */}
                <div className="absolute top-0 w-full h-10 md:h-12 bg-white z-20 flex items-center justify-between px-4 md:px-6 pt-1 md:pt-2">
                  <span className="text-[10px] md:text-xs font-bold text-gray-900">9:41</span>
                  <div className="flex gap-1.5">
                    <Wifi className={`size-3 md:size-4 ${errorType === 'NETWORK_TIMEOUT' ? 'text-red-500' : 'text-gray-900'}`} />
                    <div className="size-3 md:size-4 bg-gray-900 rounded-sm opacity-20"></div>
                  </div>
                </div>

                {/* Dynamic Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-black rounded-b-xl md:rounded-b-2xl z-30"></div>

                <div className="pt-10 md:pt-12 h-full bg-white overflow-y-auto">
                  <MobileTradingView
                    onTriggerError={() => triggerError('DATA_UNAVAILABLE')}
                    activeError={showSmartRecovery ? errorType : null}
                    onRecover={() => {
                      setShowSmartRecovery(false);
                      toast.success('System Repaired & Data Re-Hydrated! ✓');
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Controls - Right - Hidden on mobile */}
            <div className="hidden lg:block w-80 shrink-0 sticky top-32 space-y-8 animate-in slide-in-from-right-4 duration-500 delay-100">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">Recovery Console</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Simulate critical failure states to observe the application's verification protocols and self-healing UI.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-3 transition-all hover:border-blue-300 hover:shadow-md group cursor-pointer" onClick={() => triggerError('DATA_UNAVAILABLE')}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="size-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <Database className="size-4" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm">Data Interruption</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">Simulates a WebSocket disconnect or missing feed. Triggers inline contextual recovery.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-3 transition-all hover:border-orange-300 hover:shadow-md group cursor-pointer" onClick={() => triggerError('NETWORK_TIMEOUT')}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="size-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                      <WifiOff className="size-4" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm">Network Timeout</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">Simulates complete connectivity loss. Triggers full-screen blocking smart recovery.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-3 transition-all hover:border-purple-300 hover:shadow-md group cursor-pointer" onClick={() => triggerError('SERVER_ERROR')}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="size-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                      <AlertCircle className="size-4" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm">Server Outage</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">Simulates 500 API errors. Triggers escalation protocols.</p>
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-2 items-start">
                  <Info className="size-4 text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-800 font-medium">
                    Note: "Data Interruption" demonstrates the new non-blocking, inline recovery UI requested in the latest design review.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recovery Overlay - Only for Non-Inline Errors */}
        {showSmartRecovery && errorType !== 'DATA_UNAVAILABLE' && (
          <SmartErrorRecovery
            errorType={errorType}
            onClose={() => setShowSmartRecovery(false)}
            onRecover={() => {
              setShowSmartRecovery(false);
              toast.success('System Repaired & Data Re-Hydrated! ✓');
            }}
          />
        )}
      </>
    );
  }

  if (demoMode === 'desktop-algo') {
    return (
      <>
        <Toaster position="top-center" />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-2 md:py-3 flex items-center justify-between shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600 font-bold text-xs md:text-sm"
              onClick={() => {
                setDemoMode('landing');
                setShowStrategyBuilder(false);
                setTimeout(() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'instant' });
                }, 0);
              }}
            >
              ← <span className="hidden sm:inline">Back to Innovation Suite</span><span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <Monitor className="size-3 md:size-4 text-blue-600" />
              <span className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest">Smart Order</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <DesktopAlgoInterface
              onNewStrategy={() => setShowStrategyBuilder(true)}
              onEdit={(id) => {
                setShowStrategyBuilder(true);
                toast.info(`Editing Order #${id}`);
              }}
            />
          </div>
        </div>

        {showStrategyBuilder && (
          <DesktopStrategyBuilder
            onClose={() => setShowStrategyBuilder(false)}
            onSave={handleSaveStrategy}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-white font-sans overflow-x-hidden lg:overflow-x-visible">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="size-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[13px] font-bold text-gray-900 tracking-tight">Abhineet Jain</span>
                <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wider hidden sm:block">Candidate Submission</span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-500">
              <a href="#journey" className="hover:text-gray-900 transition-colors">KYC Analysis</a>
              <a href="#features" className="hover:text-gray-900 transition-colors">Innovation</a>
              <a href="#wireframes" className="hover:text-gray-900 transition-colors">Feature Design</a>
              <a href="#audit" className="hover:text-gray-900 transition-colors">Performance Analysis</a>
              <a href="#competitors" className="hover:text-gray-900 transition-colors">Competition Analysis</a>
              <a href="#footer" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold px-4 py-2 text-[11px] transition-all">Connect</a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col p-4 gap-1">
                <a href="#journey" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>KYC Analysis</a>
                <a href="#features" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Innovation</a>
                <a href="#wireframes" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Feature Design</a>
                <a href="#audit" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Performance Analysis</a>
                <a href="#competitors" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Competition Analysis</a>
                <a href="#footer" className="text-blue-600 font-bold py-3 px-4 rounded-lg bg-blue-50 mt-2" onClick={() => setIsMobileMenuOpen(false)}>Connect →</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero / Strategic Briefing Section */}
        <section id="hero" className="pt-24 pb-12 md:pt-32 md:pb-20 bg-white border-b border-gray-100 flex flex-col items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* 1. Market Context Bar (High Density ERP Style) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-12 bg-gray-50/30 flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-gray-200 shadow-sm">
              {[
                { label: "Total Demat Access", value: DEEP_COMPETITIVE_ANALYSIS.marketContext.totalDematAccounts, sub: "Market Foundation", icon: Globe },
                { label: "Active Trading Pool", value: DEEP_COMPETITIVE_ANALYSIS.marketContext.activeTraders, sub: "Primary Target", icon: Target },
                { label: "Tier 2/3 Engagement", value: "75%+", sub: "Growth Vector", icon: Smartphone },
                { label: "Untapped Retail", value: "~82%", sub: "Strategic Moat", icon: Zap },
              ].map((stat, i) => (
                <a
                  key={i}
                  href={DEEP_COMPETITIVE_ANALYSIS.marketContext.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-4 flex items-center gap-3 hover:bg-white transition-colors cursor-pointer group"
                  title="View Source Data (Bain & Co Analysis 2026)"
                >
                  <div className="size-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-colors">
                    <stat.icon className="size-4 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                    <div className="text-base font-semibold text-gray-900 leading-none mb-0.5 group-hover:text-indigo-700">{stat.value}</div>
                    <span className="text-[9px] text-gray-400 font-medium leading-none">{stat.sub}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-[1px] w-8 bg-indigo-600" />
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-[0.2em]">Strategic Platform Evolution</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6 leading-[1.05] tracking-tight">
                  Democratizing <br />
                  <span className="text-indigo-600">Institutional Execution.</span>
                </h1>

                <p className="text-base md:text-lg text-gray-500 mb-10 leading-relaxed max-w-xl font-medium">
                  A high-fidelity audit and technical roadmap designed to restore platform trust through radical transparency and edge-case resilience.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-6 rounded-lg transition-all shadow-md active:scale-[0.98]" asChild>
                    <a href="#journey">Execution Trace</a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold px-8 py-6 rounded-lg transition-all" asChild>
                    <a href="#audit">System Audit</a>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="absolute -inset-4 bg-indigo-50/50 rounded-[2rem] blur-2xl" />
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 overflow-hidden aspect-video group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex gap-1.5">
                      <div className="size-2 rounded-full bg-red-400" />
                      <div className="size-2 rounded-full bg-amber-400" />
                      <div className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter">POCKETFUL_CORE_V2.0</span>
                  </div>
                  <div className="p-6 flex flex-col gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network_Latency</span>
                        <span className="text-[10px] font-bold text-emerald-500 font-mono">12ms (OPTIMAL)</span>
                      </div>
                      <div className="h-6 w-full bg-gray-50 rounded border border-gray-100 flex items-center px-2">
                        <div className="h-1.5 w-[85%] bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-100 p-4 flex flex-col justify-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-indigo-600 animate-pulse" />
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Active_Uptime_Index</span>
                      </div>
                      <div className="text-3xl font-semibold text-gray-900 leading-none tabular-nums tracking-tighter">99.982%</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                          <div key={i} className="h-4 w-1 bg-indigo-200 rounded-full" />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[{ l: 'TRD_V', v: '8.4M' }, { l: 'API_Q', v: '142k/s' }, { l: 'SYNC', v: '0.2s' }].map((item, i) => (
                        <div key={i} className="p-2.5 bg-white rounded border border-gray-100 flex flex-col shadow-sm">
                          <span className="text-[7px] font-bold text-gray-400 uppercase leading-none mb-1">{item.l}</span>
                          <span className="text-xs font-semibold text-gray-900 leading-none">{item.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Personas / Strategic Dossiers Section */}
        <section id="personas" className="py-12 md:py-24 bg-gray-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 font-semibold mb-4 px-3 py-1 text-[10px] mx-auto uppercase tracking-widest leading-none">Market Intelligence</Badge>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Who We're Building For</h2>
              <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">{PERSONA_INSIGHT.context}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-100 flex flex-col md:flex-row">
              {PERSONAS.map((persona, idx) => (
                <div key={persona.id} className="flex-1 flex flex-col group hover:bg-gray-50/50 transition-colors">
                  {/* Dossier Header */}
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50 min-h-[95px]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-gray-300 font-mono">DOSSIER_0{idx + 1}</span>
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">{persona.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2">{persona.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-gray-400">{persona.title}</span>
                      <span className="size-1 rounded-full bg-gray-200" />
                      <span className="text-[10px] font-medium text-gray-400">{persona.age}y/o</span>
                    </div>
                  </div>

                  {/* Dossier Body */}
                  <div className="p-5 flex-1 space-y-4">
                    {/* Behavioral Quote */}
                    <div className="relative min-h-[40px]">
                      <Quote className="absolute -left-1 -top-1 size-3 text-indigo-200" />
                      <p className="pl-4 text-[12px] text-gray-600 italic font-medium leading-relaxed">
                        {persona.quote}
                      </p>
                    </div>

                    {/* Needs Vector */}
                    <div className="space-y-1.5 min-h-[60px]">
                      <span className="text-[9px] font-semibold text-indigo-600 uppercase tracking-widest">Demand Vector</span>
                      <div className="flex flex-wrap gap-1.5">
                        {persona.needs.map((need) => (
                          <Badge key={need} variant="outline" className="text-[9px] bg-indigo-50/50 text-indigo-700 border-indigo-100/50 px-2 py-0 font-medium">{need}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Gap Analysis (Pain Points) */}
                    <div className="space-y-1.5 min-h-[90px]">
                      <span className="text-[9px] font-semibold text-red-500 uppercase tracking-widest">Systemic Gaps Found</span>
                      <div className="space-y-1.5">
                        {persona.painPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="size-1.5 rounded-full bg-red-400 mt-1 shadow-sm" />
                            <span className="text-[11px] text-gray-600 leading-snug font-medium">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dossier Footer (Feature Mapping) */}
                  <div className="p-5 bg-gray-50/30 border-t border-gray-100">
                    <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-widest block mb-2">Prescribed Solutions</span>
                    <div className="flex flex-wrap gap-1.5">
                      {persona.featureMapping.map((feature) => (
                        <div key={feature} className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100/50">
                          <CheckCircle className="size-2.5" />
                          <span className="text-[10px] font-semibold">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Persona Insight Bar (Strategic Narrative) */}
            <div className="mt-8 bg-indigo-900 rounded-xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="bg-indigo-700/50 text-indigo-100 border-indigo-600/50 text-[10px] uppercase tracking-widest">Market Reality</Badge>
                  <span className="text-xs font-medium text-indigo-300">{PERSONA_INSIGHT.context}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">"{PERSONA_INSIGHT.insight}"</h3>
                <p className="text-indigo-200 text-sm font-medium border-l-2 border-indigo-500 pl-3 italic">Strategy: {PERSONA_INSIGHT.implication}</p>
              </div>

              <div className="relative z-10 shrink-0">
                <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold border-none shadow-lg group">
                  View Strategic Roadmap <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* User Journey Audit Section */}
        <section id="journey" className="py-10 md:py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-100 font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest flex items-center gap-2">
                <FileText className="size-3" /> Live User Audit
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">KYC Analysis</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">
                Real-world verification of the account opening process on {KYC_JOURNEY.summary.platform}.
              </p>
            </div>

            {/* 1. Audit Metadata Bar - ERP STYLE */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-8 bg-white shadow-sm flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {[
                { label: "Platform Stack", value: KYC_JOURNEY.summary.platform, sub: "Verified Environment", icon: Smartphone },
                { label: "Network Vector", value: KYC_JOURNEY.summary.network, sub: "Latency Baseline", icon: Globe },
                { label: "Execution Time", value: "~12 min", sub: "Trade-Ready Alpha", icon: Clock },
                { label: "Market Benchmark", value: "15 min", sub: "Avg. Industry Lead", icon: Target },
              ].map((stat, i) => (
                <div key={i} className="flex-1 p-5 flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <stat.icon className="size-5 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                    <div className="text-lg font-bold text-gray-900 leading-none mb-1">{stat.value}</div>
                    <span className="text-[10px] text-gray-400 font-medium leading-none">{stat.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* 2. Execution Trace Ledger & Efficiency Pass (Left 8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4 border-l-4 border-indigo-600 pl-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Serialized Execution Trace</h3>
                    <span className="text-[10px] font-semibold text-gray-400">Log Type: USER_JOURNEY_AUDIT</span>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto no-scrollbar">
                      <Table>
                        <TableHeader className="bg-gray-50/80 border-b border-gray-200">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[80px] py-3 pl-6 font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Step ID</TableHead>
                            <TableHead className="w-[120px] py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Time Offset</TableHead>
                            <TableHead className="py-3 font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Execution Vector</TableHead>
                            <TableHead className="py-3 pr-6 font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Terminal Log (Experience)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {KYC_JOURNEY.steps.map((step, i) => (
                            <TableRow key={i} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors group">
                              <TableCell className="py-3 pl-6 text-[11px] font-bold text-gray-400 font-mono">STEP_0{step.step}</TableCell>
                              <TableCell className="py-3 text-[11px] font-semibold text-indigo-600 whitespace-nowrap">{step.time}</TableCell>
                              <TableCell className="py-3">
                                <div className="text-[12px] font-semibold text-gray-900">{step.action}</div>
                              </TableCell>
                              <TableCell className="py-3 pr-6">
                                <p className="text-[11px] text-gray-600 leading-tight font-medium max-w-[300px]">{step.experience}</p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                {/* System Efficiency Successes (Moved here to fill space) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Efficiency Pass</h3>
                    <Badge className="bg-emerald-50 text-emerald-700 border-none text-[8px] font-bold">STABLE</Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {KYC_JOURNEY.highlights.map((highlight, i) => (
                      <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg flex gap-3 shadow-sm items-start">
                        <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12px] font-semibold text-gray-700 leading-tight">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Audit Findings Scorecard (Right 4 Cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* System Friction Gaps */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-l-4 border-red-500 pl-4">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">System Gap Analysis</h3>
                    <Badge className="bg-red-50 text-red-700 border-none text-[8px] font-bold">HIGH FRICTION</Badge>
                  </div>
                  <div className="space-y-3">
                    {KYC_JOURNEY.painPoints.map((point, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="size-1.5 rounded-full bg-red-500" />
                          <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">GAP_ID_0{i + 1}</span>
                        </div>
                        <h4 className="text-[13px] font-semibold text-gray-900 leading-tight mb-2">{point.issue}</h4>
                        <div className="p-3 bg-gray-50/80 rounded border border-gray-100">
                          <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest mb-1 leading-none">Mitigation Logic</div>
                          <p className="text-[11px] font-medium text-gray-700 leading-tight">{point.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Product Innovation Suite (Formerly Features) */}
        <section id="features" className="py-10 md:py-20 bg-gray-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-none font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Innovation Ledger</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">The Innovation Suite</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Institutional-grade mechanics engineered for the next generation of retail traders.</p>
            </div>

            {/* Mobile View: Stacked Cards (Optimized Scroll) */}
            <div className="flex overflow-x-auto snap-x py-6 gap-5 lg:hidden -mx-6 px-6 scroll-pl-6 scroll-smooth">
              {PRD_DATA.features.map((feature, idx) => {
                const mapping = FEATURE_MAPPING[feature.id as keyof typeof FEATURE_MAPPING];
                return (
                  <div key={feature.id} className="min-w-[85vw] sm:min-w-[320px] max-w-[85vw] sm:max-w-[320px] snap-center shrink-0 group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-indigo-300 transition-all duration-300">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-gray-300 font-mono tracking-tighter">FEAT_0{idx + 1}</span>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[9px] font-bold px-2 py-0">PRD_V2.0</Badge>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="text-gray-500 text-[13px] font-medium leading-relaxed mb-4">{feature.valueProp}</p>

                      <div className="flex flex-wrap gap-1.5 ">
                        {mapping?.personas.map((pId) => {
                          const persona = PERSONAS.find(p => p.id === pId);
                          const colors = PERSONA_COLORS[pId as keyof typeof PERSONA_COLORS];
                          return persona && (
                            <span key={pId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold ${colors.bg} ${colors.text} uppercase tracking-tighter`}>
                              {persona.icon} {persona.name.split(' ')[0]}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4 mt-auto">
                      <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-100 space-y-3">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none block mb-2">Primary KPI Impact</span>
                        <div className="grid gap-2.5">
                          {feature.successMetrics.slice(0, 2).map((metric, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-gray-700">
                              <CheckCircle className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="font-semibold text-gray-900 text-[11px] leading-tight">{metric.metric}: {metric.targetM6}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Details Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="w-full justify-between items-center px-4 py-2.5 h-auto rounded-lg bg-gray-900 hover:bg-gray-800 font-bold text-[11px] text-white transition-colors">
                            Technical Specification <ArrowRight className="size-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-0 bg-white border-none shadow-2xl rounded-xl text-left">
                          <div className="p-6 space-y-6">
                            <div className="text-left border-b border-gray-100 pb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-mono text-gray-400">FEAT_0{idx + 1}</span>
                                <Badge className="bg-indigo-50 text-indigo-700 border-none font-bold uppercase text-[9px] px-2 py-0.5">{feature.priority}</Badge>
                              </div>
                              <DialogTitle className="text-xl font-semibold text-gray-900 mb-1 tracking-tight">{feature.title}</DialogTitle>
                            </div>
                            <div className="space-y-6 text-left">
                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Value Proposition Dossier</h4>
                                <div className="p-4 bg-indigo-50/30 rounded-lg border border-indigo-100/50">
                                  <DialogDescription className="text-indigo-900 font-semibold italic text-[13px] leading-relaxed">"{feature.valueProp}"</DialogDescription>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">System Gaps Addressed</h4>
                                <p className="text-gray-700 text-[13px] font-medium leading-relaxed mb-4">{feature.problem}</p>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Implementation Logic</h4>
                                <div className="space-y-3">
                                  {feature.userStories.map((story) => (
                                    <div key={story.id} className="p-3 bg-gray-50/80 rounded-lg border border-gray-100">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <div className="font-bold text-indigo-600 text-[10px] tracking-widest font-mono">{story.id}</div>
                                        <Badge variant="outline" className={`text-[9px] font-bold uppercase tracking-wider h-4 px-1 ${story.priority === 'P0' ? 'text-red-500 border-red-100 bg-red-50' : 'text-amber-500 border-amber-100 bg-amber-50'}`}>
                                          {story.priority}
                                        </Badge>
                                      </div>
                                      <p className="text-gray-600 text-[12px] font-semibold leading-normal">{story.story}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {feature.id === 'SER' ? (
                        <Button size="lg" className="w-full py-5 text-[13px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md" onClick={handleMobileErrorDemo}>
                          Launch Tech Demo <ArrowRight className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'SOA' ? (
                        <Button size="lg" className="w-full py-5 text-[13px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md" onClick={handleDesktopAlgoDemo}>
                          Open Order Assistant <Monitor className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'TSE' ? (
                        <Button size="lg" className="w-full py-5 text-[13px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md" onClick={() => setShowTSEModal(true)}>
                          View Explainer <Info className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'ROM' ? (
                        <Button size="lg" className="w-full py-5 text-[13px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md" onClick={() => setShowROMModal(true)}>
                          View Offline State <Users className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'CASH' ? (
                        <Button size="lg" className="w-full py-5 text-[13px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md" onClick={() => setShowCASHModal(true)}>
                          View Unified View <Zap className="ml-2 size-4" />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Master-Detail */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Master List - TECHNICAL LEDGER */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between mb-2 border-l-4 border-indigo-600 pl-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Technical Feature Ledger</h3>
                  <span className="text-[10px] font-semibold text-gray-400">Total Features: {PRD_DATA.features.length}</span>
                </div>

                <div className="space-y-2">
                  {PRD_DATA.features.map((feature, idx) => (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedFeatureId(feature.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-4 group ${selectedFeatureId === feature.id
                        ? 'bg-indigo-50/50 border-indigo-600 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-indigo-300'
                        }`}
                    >
                      <div className={`text-[10px] font-bold font-mono px-2 py-1 rounded ${selectedFeatureId === feature.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-200'}`}>
                        FEAT_0{idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-[13px] font-semibold tracking-tight transition-colors ${selectedFeatureId === feature.id ? 'text-indigo-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{feature.title}</h4>
                      </div>
                      <ChevronRight className={`size-4 transition-all ${selectedFeatureId === feature.id ? 'text-indigo-600 translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail View - TECHNICAL SPECIFICATION DOSSIER */}
              <div className="lg:col-span-8 sticky top-24">
                {(() => {
                  const feature = PRD_DATA.features.find(f => f.id === selectedFeatureId) || PRD_DATA.features[0];
                  const mapping = FEATURE_MAPPING[feature.id as keyof typeof FEATURE_MAPPING];

                  return (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-2 duration-300">
                      {/* Dossier Header */}
                      <div className="p-8 border-b border-gray-100 bg-gray-50/30">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-bold font-mono text-indigo-400 uppercase tracking-tighter">SPECIFICATION_DOSSIER_V2.0</span>
                            <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold uppercase text-[9px] px-2 py-0.5">{feature.priority}</Badge>
                          </div>
                          <div className="flex gap-2">
                            {mapping?.personas.map((pId) => {
                              const persona = PERSONAS.find(p => p.id === pId);
                              const colors = PERSONA_COLORS[pId as keyof typeof PERSONA_COLORS];
                              return persona && (
                                <span key={pId} title={persona.name} className={`size-7 rounded-full flex items-center justify-center text-sm border ${colors.bg} ${colors.border} shadow-sm group relative cursor-help`}>
                                  {persona.icon}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                          <div className="flex-1">
                            <h3 className="text-3xl font-semibold mb-3 text-gray-900 tracking-tight">{feature.title}</h3>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl mb-6">{feature.valueProp}</p>
                            <div className="flex flex-wrap gap-2">
                              {mapping?.metrics.map((mId) => {
                                const metric = TARGET_BUSINESS_METRICS.find(m => m.id === mId);
                                const colors = METRIC_COLORS[mId as keyof typeof METRIC_COLORS];
                                return metric && (
                                  <span key={mId} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border ${colors.bg} border-transparent text-[10px] font-bold uppercase tracking-wide ${colors.text}`}>
                                    <span className={`size-1.5 rounded-full ${colors.dot}`}></span>
                                    {metric.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {feature.id === 'SER' ? (
                              <Button size="lg" className="py-4 px-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:-translate-y-0.5" onClick={handleMobileErrorDemo}>
                                Launch Tech Demo <ArrowRight className="ml-2 size-4" />
                              </Button>
                            ) : feature.id === 'SOA' ? (
                              <Button size="lg" className="py-4 px-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:-translate-y-0.5" onClick={handleDesktopAlgoDemo}>
                                Open Order Assistant <Monitor className="ml-2 size-4" />
                              </Button>
                            ) : feature.id === 'TSE' ? (
                              <Button size="lg" className="py-4 px-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:-translate-y-0.5" onClick={() => setShowTSEModal(true)}>
                                View Explainer <Info className="ml-2 size-4" />
                              </Button>
                            ) : feature.id === 'ROM' ? (
                              <Button size="lg" className="py-4 px-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:-translate-y-0.5" onClick={() => setShowROMModal(true)}>
                                View Offline State <Users className="ml-2 size-4" />
                              </Button>
                            ) : feature.id === 'CASH' ? (
                              <Button size="lg" className="py-4 px-6 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:-translate-y-0.5" onClick={() => setShowCASHModal(true)}>
                                View Unified View <Zap className="ml-2 size-4" />
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {/* Dossier Body */}
                      <div className="p-8 flex flex-col gap-6">
                        {/* Top Row: Context Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Problem Statement</h4>
                            <p className="text-[12px] font-semibold text-gray-700 leading-relaxed">{feature.problem}</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Value Proposition</h4>
                            <p className="text-[12px] font-semibold text-gray-700 leading-relaxed">{feature.valueProp}</p>
                          </div>
                        </div>

                        <div className="w-full h-px bg-gray-100/80"></div>

                        {/* Bottom Row: Stories & Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                          {/* User Stories */}
                          <div className="md:col-span-7">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">User Stories</h4>
                            <div className="space-y-3">
                              {feature.userStories.map((story) => (
                                <div key={story.id} className="flex items-start gap-2.5">
                                  <div className="size-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                                  <div className="text-[11px] leading-relaxed text-gray-700">
                                    <span className="font-bold text-indigo-600 font-mono text-[10px] mr-2">{story.id}</span>
                                    <Badge variant="outline" className={`text-[8px] font-bold uppercase tracking-wider h-3.5 px-1 inline-flex items-center mr-2 border-gray-200 ${story.priority === 'P0' ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'} border-none`}>
                                      {story.priority}
                                    </Badge>
                                    <span className="font-medium text-gray-600">{story.story}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Key Features & Metrics */}
                          <div className="md:col-span-5">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Key Features & Metrics</h4>
                            <div className="space-y-3">
                              {feature.successMetrics.slice(0, 3).map((metric, i) => (
                                <div key={i} className="grid grid-cols-[120px_1fr] gap-4 items-baseline">
                                  <div className="flex items-center gap-2">
                                    <span className="text-emerald-500 text-[8px]">●</span>
                                    <span className="text-[11px] font-medium text-gray-500">{metric.metric}</span>
                                  </div>
                                  <span className="text-[11px] font-bold text-gray-900">{metric.targetM6}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Design Section */}
        <section id="wireframes" className="py-10 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Visual Architecture</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">High-Impact Feature Design</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Visualizing the transition from existing friction points to institutional-grade trading experiences.</p>
            </div>

            <div className="flex items-center justify-between mb-8 border-l-4 border-indigo-600 pl-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Wireframe Design</h3>
              <span className="text-[10px] font-semibold text-gray-400">Before vs After</span>
            </div>

            <div className="flex overflow-x-auto snap-x py-10 gap-8 -mx-6 px-6 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:mx-0 md:px-0">
              <div className="min-w-[85vw] sm:min-w-[300px] snap-center shrink-0 md:min-w-0 md:shrink bg-white rounded-2xl border border-red-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-red-50 text-red-600 text-[10px] px-2 py-0">Before</Badge>
                  <span className="text-xs font-medium text-gray-500">Traditional Error States</span>
                </div>
                <div className="rounded-xl overflow-hidden border-2 border-gray-100 shadow-md">
                  <img src={DEEP_COMPETITIVE_ANALYSIS.wireframeMockups.smartRecoveryBefore} alt="Before: Generic error message" className="w-full h-auto" />
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="text-[13px] text-red-600 flex items-start gap-2 font-medium"><span>✗</span> No explanation of what went wrong</li>
                  <li className="text-[13px] text-red-600 flex items-start gap-2 font-medium"><span>✗</span> No alternative actions offered</li>
                  <li className="text-[13px] text-red-600 flex items-start gap-2 font-medium"><span>✗</span> User left stranded</li>
                </ul>
              </div>

              <div className="min-w-[85vw] sm:min-w-[300px] snap-center shrink-0 md:min-w-0 md:shrink bg-white rounded-2xl border border-green-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-green-100 text-green-700 text-[10px] px-2 py-0">After</Badge>
                  <span className="text-xs font-medium text-gray-500">Smart Error Recovery</span>
                </div>
                <div className="rounded-xl overflow-hidden border-2 border-gray-100 shadow-md">
                  <img src={DEEP_COMPETITIVE_ANALYSIS.wireframeMockups.smartRecoveryAfter} alt="After: Smart Error Recovery" className="w-full h-auto" />
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="text-[13px] text-green-600 flex items-start gap-2 font-medium"><span>✓</span> Clear explanation of issue</li>
                  <li className="text-[13px] text-green-600 flex items-start gap-2 font-medium"><span>✓</span> Multiple recovery options</li>
                  <li className="text-[13px] text-green-600 flex items-start gap-2 font-medium"><span>✓</span> User stays in control</li>
                </ul>
              </div>
            </div>

            {/* User Flow Diagram */}
            <div className="mt-10 md:mt-16">
              <div className="flex items-center justify-between mb-6 border-l-4 border-indigo-600 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">User Flow Journey</h3>
                <span className="text-[10px] font-semibold text-gray-400">Smart Error Recovery</span>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 overflow-hidden">
                <div className="overflow-x-auto pb-4">
                  <div className="flex items-center gap-2 md:gap-3 min-w-[900px]">
                    {/* Start */}
                    <div className="flex flex-col items-center">
                      <div className="size-10 rounded-full bg-green-500 flex items-center justify-center">
                        <div className="size-4 rounded-full bg-white"></div>
                      </div>
                      <span className="text-[10px] font-medium text-gray-500 mt-1">Start</span>
                    </div>
                    <ArrowRight className="size-4 text-gray-300 shrink-0" />

                    {/* User Action */}
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 text-center min-w-[100px]">
                      <span className="text-xs font-medium text-yellow-800">Tap Technicals</span>
                    </div>
                    <ArrowRight className="size-4 text-gray-300 shrink-0" />

                    {/* API Call */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-center min-w-[90px]">
                      <span className="text-xs font-medium text-blue-700">API Call</span>
                    </div>
                    <ArrowRight className="size-4 text-gray-300 shrink-0" />

                    {/* Decision */}
                    <div className="relative flex items-center justify-center">
                      <div className="size-16 bg-blue-100 border border-blue-300 rotate-45"></div>
                      <span className="absolute text-[10px] font-bold text-blue-700">Response?</span>
                    </div>

                    {/* Branches */}
                    <div className="flex flex-col gap-4 ml-4">
                      {/* Success Path */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">200</span>
                        <ArrowRight className="size-3 text-green-400 shrink-0" />
                        <div className="bg-green-100 border border-green-300 rounded-lg px-3 py-1.5 text-center">
                          <span className="text-xs font-medium text-green-700">Display Data</span>
                        </div>
                      </div>

                      {/* Error Path */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Error</span>
                        <ArrowRight className="size-3 text-red-400 shrink-0" />
                        <div className="bg-red-100 border border-red-300 rounded-lg px-3 py-1.5 text-center">
                          <span className="text-xs font-medium text-red-700">Classify Error</span>
                        </div>
                        <ArrowRight className="size-3 text-gray-300 shrink-0" />

                        {/* Error Type Decision */}
                        <div className="relative flex items-center justify-center">
                          <div className="size-12 bg-orange-100 border border-orange-300 rotate-45"></div>
                          <span className="absolute text-[8px] font-bold text-orange-700">Type?</span>
                        </div>

                        <div className="flex flex-col gap-1 ml-2">
                          <div className="flex items-center gap-1">
                            <div className="bg-yellow-50 border border-yellow-200 rounded px-2 py-0.5">
                              <span className="text-[10px] text-yellow-700">Smart Recovery</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="bg-purple-50 border border-purple-200 rounded px-2 py-0.5">
                              <span className="text-[10px] text-purple-700">Network Guide</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
                              <span className="text-[10px] text-gray-700">Support Options</span>
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="size-3 text-gray-300 shrink-0 ml-2" />

                        {/* Recovery Actions */}
                        <div className="flex flex-col gap-1">
                          <div className="bg-blue-50 border border-blue-200 rounded px-2 py-0.5 text-center">
                            <span className="text-[10px] text-blue-700">Retry</span>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded px-2 py-0.5 text-center">
                            <span className="text-[10px] text-blue-700">Alternative</span>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded px-2 py-0.5 text-center">
                            <span className="text-[10px] text-blue-700">Report</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="size-4 text-gray-300 shrink-0 ml-4" />

                    {/* End */}
                    <div className="flex flex-col items-center">
                      <div className="size-10 rounded-full bg-green-500 flex items-center justify-center">
                        <div className="size-6 rounded-full bg-green-600 flex items-center justify-center">
                          <div className="size-3 rounded-full bg-white"></div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-gray-500 mt-1">Session Continues</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-500">Start/End</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span className="text-gray-500">User Action</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 bg-blue-50 border border-blue-200 rounded"></div>
                    <span className="text-gray-500">Process</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 bg-blue-100 border border-blue-300 rotate-45"></div>
                    <span className="text-gray-500">Decision</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 bg-red-100 border border-red-300 rounded"></div>
                    <span className="text-gray-500">Error State</span>
                  </div>
                </div>
              </div>
            </div>



            {/* --- INTEGRATED INNOVATION SUB-MODULES --- */}

            {/* Sub-Part: Execution Roadmap */}
            <div id="roadmap" className="mt-20 md:mt-24">
              <div className="flex items-center justify-between mb-6 border-l-4 border-blue-600 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Strategic Execution Roadmap</h3>
                <span className="text-[10px] font-semibold text-gray-400">Phases: {ROADMAP_TABLE.length}</span>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50/80">
                      <TableRow>
                        <TableHead className="text-[10px] font-bold uppercase text-gray-900 pl-4 py-2.5 w-[100px]">Phase</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-gray-900 py-2.5">Feature</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-2.5 hidden md:table-cell">Why Now/Next/Later</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-2.5 hidden lg:table-cell">Key Metric</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-2.5 text-center w-[60px]">Effort</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-gray-500 pr-4 py-2.5 hidden lg:table-cell">Dependencies</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ROADMAP_TABLE.map((row, i) => (
                        <TableRow key={i} className="hover:bg-gray-50/50 transition-colors border-gray-50">
                          <TableCell className="pl-4 py-2">
                            <Badge className={`text-[9px] font-bold px-1.5 py-0 ${row.phase === 'NOW' ? 'bg-blue-600 text-white' :
                              row.phase === 'NEXT' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                'bg-green-100 text-green-700 border border-green-200'
                              }`}>
                              {row.phase} <span className="hidden sm:inline opacity-70">({row.phaseLabel})</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900 text-[11px] md:text-xs py-2">{row.feature}</TableCell>
                          <TableCell className="text-gray-600 text-[11px] py-2 hidden md:table-cell max-w-[200px] leading-tight">{row.why}</TableCell>
                          <TableCell className="text-gray-600 text-[11px] py-2 hidden lg:table-cell">{row.metric}</TableCell>
                          <TableCell className="text-center py-2">
                            <Badge variant="outline" className={`text-[9px] font-bold px-1.5 py-0 ${row.effort === 'S' ? 'bg-green-50 text-green-700 border-green-200' :
                              row.effort === 'M' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                'bg-orange-50 text-orange-700 border-orange-200'
                              }`}>{row.effort}</Badge>
                          </TableCell>
                          <TableCell className="text-gray-500 text-[11px] pr-4 py-2 hidden lg:table-cell">{row.dependencies}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex overflow-x-auto snap-x py-6 gap-6 -mx-6 px-6 scroll-pl-6 scroll-smooth no-scrollbar">
                {ROADMAP_TABLE.map((row, i) => (
                  <div key={i} className="min-w-[85vw] snap-center shrink-0 p-5 bg-white rounded-2xl border border-gray-100 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <Badge className={`text-[9px] font-bold px-2 py-0.5 ${row.phase === 'NOW' ? 'bg-blue-600 text-white' :
                        row.phase === 'NEXT' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                          'bg-green-50 text-green-700 border-green-100'
                        } border`}>
                        {row.phase}
                      </Badge>
                      <Badge variant="outline" className={`text-[9px] font-bold px-1.5 py-0 ${row.effort === 'S' ? 'bg-green-50 text-green-700 border-green-100' :
                        row.effort === 'M' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                          'bg-orange-50 text-orange-700 border-orange-100'
                        } border-none`}>Effort: {row.effort}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{row.feature}</h4>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{row.why}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Key Metric</span>
                          <span className="text-[10px] font-bold text-gray-700 leading-tight block">{row.metric}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Dependencies</span>
                          <span className="text-[10px] font-bold text-gray-700 leading-tight block truncate">{row.dependencies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Part: UAT Matrix */}
            <div id="uat" className="mt-12 md:mt-16">
              <div className="flex items-center justify-between mb-6 border-l-4 border-amber-500 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Quality Assurance Matrix</h3>
                <span className="text-[10px] font-semibold text-gray-400">Total Scenarios: {UAT_SCENARIOS.length}</span>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="w-[80px] pl-4 font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">ID</TableHead>
                      <TableHead className="font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">User State</TableHead>
                      <TableHead className="font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">Time Window</TableHead>
                      <TableHead className="font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">Device</TableHead>
                      <TableHead className="font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">Expected Behavior</TableHead>
                      <TableHead className="text-center font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">Priority</TableHead>
                      <TableHead className="text-right pr-4 font-bold text-gray-900 text-[10px] uppercase tracking-wide py-2.5">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {UAT_SCENARIOS.map((uat: any) => (
                      <TableRow key={uat.id} className="hover:bg-gray-50/50 transition-colors border-gray-50">
                        <TableCell className="pl-4 py-2.5 font-mono text-[11px] font-bold text-gray-600">{uat.id}</TableCell>
                        <TableCell className="py-2.5">
                          <Badge className={`text-[9px] font-medium px-1.5 py-0 ${uat.userState === 'New User' ? 'bg-green-100 text-green-700' :
                            uat.userState === 'KYC Pending' ? 'bg-yellow-100 text-yellow-700' :
                              uat.userState === 'Active Trader' ? 'bg-blue-100 text-blue-700' :
                                'bg-purple-100 text-purple-700'
                            }`}>{uat.userState}</Badge>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${uat.timeWindow === 'Market Hours' ? 'border-green-200 text-green-700' :
                            uat.timeWindow === 'Pre-market' ? 'border-blue-200 text-blue-700' :
                              uat.timeWindow === 'Post-market' ? 'border-orange-200 text-orange-700' :
                                'border-gray-200 text-gray-600'
                            }`}>{uat.timeWindow}</Badge>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge className={`text-[9px] px-1.5 py-0 ${uat.device === 'iOS' ? 'bg-gray-800 text-white' :
                            uat.device === 'Android' ? 'bg-green-600 text-white' :
                              'bg-blue-500 text-white'
                            }`}>{uat.device}</Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-gray-600 text-[11px] max-w-[250px] leading-tight">{uat.behavior}</TableCell>
                        <TableCell className="py-2.5 text-center">
                          <Badge className={`text-[9px] px-1.5 py-0 ${uat.priority === 'P0' ? 'bg-red-100 text-red-700' :
                            uat.priority === 'P1' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>{uat.priority}</Badge>
                        </TableCell>
                        <TableCell className="pr-4 py-2.5 text-right">
                          <Badge variant="outline" className="border-gray-200 text-gray-500 text-[9px] px-1.5 py-0">{uat.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex overflow-x-auto snap-x py-6 gap-6 -mx-6 px-6 scroll-pl-6 scroll-smooth no-scrollbar">
                {UAT_SCENARIOS.map((uat: any) => (
                  <div key={uat.id} className="min-w-[85vw] snap-center shrink-0 p-5 bg-white rounded-2xl border border-gray-100 shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-[10px] font-mono font-bold text-gray-400 tracking-wider py-1">{uat.id}</div>
                      <Badge className={`text-[9px] font-bold px-1.5 py-0.5 ${uat.priority === 'P0' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'} border`}>
                        {uat.priority}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-900 leading-relaxed mb-4">{uat.behavior}</h4>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">User State</span>
                          <Badge className={`text-[9px] font-medium px-1.5 py-0 block w-fit ${uat.userState === 'New User' ? 'bg-green-100 text-green-700' :
                            uat.userState === 'KYC Pending' ? 'bg-yellow-100 text-yellow-700' :
                              uat.userState === 'Active Trader' ? 'bg-blue-100 text-blue-700' :
                                'bg-purple-100 text-purple-700'
                            }`}>{uat.userState}</Badge>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Device</span>
                          <Badge className={`text-[9px] px-1.5 py-0 block w-fit ${uat.device === 'iOS' ? 'bg-gray-800 text-white' :
                            uat.device === 'Android' ? 'bg-green-600 text-white' :
                              'bg-blue-500 text-white'
                            }`}>{uat.device}</Badge>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                          <Clock className="size-3" /> {uat.timeWindow}
                        </div>
                        <Badge variant="outline" className="border-gray-200 text-gray-500 text-[9px] px-1.5 py-0 font-bold">{uat.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Part: Operational Frameworks */}
            <div id="ops" className="mt-12 md:mt-16">
              <div className="flex items-center justify-between mb-6 border-l-4 border-emerald-500 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Operational Protocols</h3>
                <span className="text-[10px] font-semibold text-gray-400">Standard Operating Procedures</span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="size-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold leading-none">R</div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest">RACI Matrix</h4>
                  </div>

                  {/* Desktop view */}
                  <div className="hidden sm:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-50">
                          <TableHead className="text-[10px] font-bold uppercase w-[40%] text-gray-400">Deliverable</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase text-center text-blue-600">PM</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase text-center text-gray-400">Eng</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase text-center text-gray-400">Des</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase text-center text-gray-400">QA</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {RACI_MATRIX.map((row: any, i: number) => (
                          <TableRow key={i} className="hover:bg-gray-50/30 border-gray-50 transition-colors">
                            <TableCell className="text-[11px] font-bold text-gray-700 py-3">{row.deliverable}</TableCell>
                            <TableCell className="text-center py-3"><Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[9px] font-bold px-1.5 py-0 border-none">{row.pm}</Badge></TableCell>
                            <TableCell className="text-center py-3"><span className="text-[10px] font-bold text-gray-500">{row.eng}</span></TableCell>
                            <TableCell className="text-center py-3"><span className="text-[10px] font-bold text-gray-500">{row.design}</span></TableCell>
                            <TableCell className="text-center py-3"><span className="text-[10px] font-bold text-gray-400">{row.qa}</span></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile view */}
                  <div className="sm:hidden space-y-4">
                    {RACI_MATRIX.map((row: any, i: number) => (
                      <div key={i} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col gap-3">
                        <div className="text-[11px] font-bold text-gray-900">{row.deliverable}</div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">PM</span>
                            <Badge variant="secondary" className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0 min-w-[24px] justify-center">{row.pm}</Badge>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Eng</span>
                            <span className="text-[10px] font-bold text-gray-700">{row.eng}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Des</span>
                            <span className="text-[10px] font-bold text-gray-600">{row.design}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">QA</span>
                            <span className="text-[10px] font-bold text-gray-500">{row.qa}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50/30 rounded-2xl border border-green-100 p-6">
                  <h4 className="font-bold text-green-800 mb-4 text-sm">Definition of Done</h4>
                  <ul className="space-y-2.5">
                    {[
                      "All acceptance criteria from user stories are met",
                      "Code reviewed and merged to main branch",
                      "Unit test coverage meets threshold",
                      "E2E tests passing in staging environment",
                      "Design QA approved by Design Lead"
                    ].map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-medium text-green-700">
                        <div className="size-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Analysis (Formerly Audit) Section */}
        <section id="audit" className="py-12 md:py-20 bg-gray-50/50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">System Audit</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Performance Analysis</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Systematic review of identified usability gaps following firsthand evaluation.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Master List: SYSTEM COMPONENT AUDIT LEDGER */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between mb-2 border-l-4 border-red-600 pl-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">System Component Audit</h3>
                  <span className="text-[10px] font-semibold text-gray-400">Gaps Detected: {FLAWS.length}</span>
                </div>

                <div className="space-y-2">
                  {FLAWS.map((flaw, idx) => (
                    <button
                      key={flaw.id}
                      onClick={() => setSelectedFlawId(flaw.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-4 group ${selectedFlawId === flaw.id
                        ? 'bg-red-50/50 border-red-600 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-red-300'
                        }`}
                    >
                      <div className={`text-[10px] font-bold font-mono px-2 py-1 rounded ${selectedFlawId === flaw.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-200'}`}>
                        GAP_0{idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-[13px] font-semibold tracking-tight transition-colors ${selectedFlawId === flaw.id ? 'text-red-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{flaw.title}</h4>
                      </div>
                      <ChevronRight className={`size-4 transition-all ${selectedFlawId === flaw.id ? 'text-red-600 translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail View: TECHNICAL AUDIT DOSSIER */}
              <div className="lg:col-span-8 flex flex-col h-[650px] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Dossier Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 uppercase tracking-tighter">AUDIT_REPORT_V1.1</div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{selectedFlaw.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-red-50 text-red-600 border-red-100 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">{selectedFlaw.severity}</Badge>
                    <Badge className="bg-orange-50 text-orange-600 border-orange-100 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">{selectedFlaw.risk}</Badge>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50/10 custom-scrollbar">
                  <div className="p-8 text-left space-y-10">
                    {/* Key Audit Findings */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Friction Hypothesis</h4>
                        <p className="text-[13px] font-semibold text-gray-700 leading-relaxed border-l-2 border-red-200 pl-4 bg-red-50/30 py-2 rounded-r">
                          {selectedFlaw.observed}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Technical Impact Analysis</h4>
                        <p className="text-[12px] font-medium text-gray-600 leading-relaxed italic">
                          "{selectedFlaw.impact}"
                        </p>
                      </div>
                    </div>

                    {/* Audit Evidence */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Audit Evidence (Screengrab)</h4>
                        <div className="h-px flex-1 bg-gray-100"></div>
                      </div>

                      {selectedFlaw.screenshot ? (
                        <div className="rounded-xl border-4 border-white shadow-xl overflow-hidden bg-white max-w-2xl mx-auto group">
                          <img
                            src={selectedFlaw.screenshot}
                            alt={selectedFlaw.title}
                            className="w-full h-auto object-contain max-h-[400px] grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-48 flex flex-col items-center justify-center text-gray-300 space-y-3 border-2 border-dashed border-gray-100 rounded-xl bg-white/50">
                          <Info className="size-8 opacity-20" />
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">No Visual Evidence Required - Logic Bound</p>
                        </div>
                      )}
                    </div>


                  </div>
                </div>

                {/* Resolution Hypothesis Footer */}
                <div className="p-6 bg-white border-t border-gray-100 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Resolution Logic</span>
                  </div>
                  <p className="text-gray-900 font-bold leading-relaxed text-xs">
                    HYPOTHESIS: {selectedFlaw.rootCause}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Artifact Hub Section - FULL PREMIUM LIGHT */}

        <section id="competitors" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Strategic Narrative</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Competitor Analysis</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Establishing the market reality, identifying critical service gaps, and defining the path to Pocketful's dominance.</p>
            </div>

            {/* 1. Market Context & App Store Ratings - INSTITUTIONAL ERP REDESIGN */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-12 bg-white shadow-sm">
              <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                {/* Market Intelligence Block - Redesigned as Market Context */}
                <div className="lg:col-span-8 p-6 flex flex-col justify-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <div className="flex gap-3 items-start">
                      <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                        <Globe className="size-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Demat Access</div>
                        <div className="text-xl font-bold text-gray-900 leading-none mb-1">212M+</div>
                        <div className="text-[10px] font-medium text-gray-500">Market Foundation</div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                        <Target className="size-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Active Trading Pool</div>
                        <div className="text-xl font-bold text-gray-900 leading-none mb-1">50M</div>
                        <div className="text-[10px] font-medium text-gray-500">Primary Target</div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                        <Smartphone className="size-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Tier 2/3 Engagement</div>
                        <div className="text-xl font-bold text-gray-900 leading-none mb-1">75%+</div>
                        <div className="text-[10px] font-medium text-gray-500">Growth Vector</div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                        <Zap className="size-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Untapped Retail</div>
                        <div className="text-xl font-bold text-gray-900 leading-none mb-1">~82%</div>
                        <div className="text-[10px] font-medium text-gray-500">Strategic Moat</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benchmarking Index Block */}
                <div className="lg:col-span-4 p-0">
                  <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-3">
                    <h3 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">Sentiment Index</h3>
                    {/* Sentiment Index - Clickable App Store Links */}
                    <div className="grid grid-cols-3 gap-0.5 bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                      {[
                        { name: "Zerodha", ...DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.zerodha, highlight: false },
                        { name: "Groww", ...DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.groww, highlight: false },
                        { name: "Pocketful", ...DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.pocketful, highlight: true }
                      ].map((item, idx) => (
                        <a
                          key={idx}
                          href={item.link}
                          target={item.link !== '#' ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`
                            relative p-2 py-2 flex flex-col items-center justify-center gap-0.5 min-h-[70px] transition-all cursor-pointer group hover:z-10
                            ${item.highlight ? 'bg-indigo-50/80 hover:bg-indigo-100' : 'bg-white hover:bg-gray-50'}
                          `}
                          title={`View ${item.name} on Play Store`}
                        >
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${item.highlight ? 'text-indigo-600' : 'text-gray-400'}`}>{item.name}</span>
                          <div className="flex items-center gap-1">
                            <div className={`text-sm font-bold ${item.highlight ? 'text-indigo-700' : 'text-gray-900'}`}>{item.rating}</div>
                            <Star className={`size-3 ${item.highlight ? 'fill-indigo-500 text-indigo-500' : 'fill-yellow-400 text-yellow-400'}`} />
                          </div>
                          <span className="text-[9px] text-gray-400 font-medium">{item.reviews}</span>

                          {/* Hover External Link Icon */}
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="size-2 text-gray-400" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Market Positioning - ERP STRATEGY LEDGER */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4 border-l-4 border-indigo-600 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Incumbent Competitive Audit</h3>
                <span className="text-[10px] font-semibold text-gray-400">Total Entities: {COMPETITOR_ANALYSIS.marketPositioning.length}</span>
              </div>

              <div className="flex overflow-x-auto snap-x py-2 gap-4 -mx-6 px-6 scroll-pl-6 scroll-smooth no-scrollbar md:grid md:grid-cols-3 md:gap-4 md:mx-0 md:px-0">
                {COMPETITOR_ANALYSIS.marketPositioning.map((comp) => (
                  <div key={comp.name} className="min-w-[85vw] md:min-w-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-gray-900">{comp.name}</span>
                      <Badge className="bg-white text-gray-500 border-gray-200 text-[9px] font-semibold px-1.5 py-0">{comp.share}</Badge>
                    </div>

                    <div className="p-4 flex-1 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Core Strength</span>
                          </div>
                          <p className="text-[12px] font-semibold text-gray-700 leading-tight pl-3 border-l border-gray-100">{comp.strength}</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <div className="size-1.5 rounded-full bg-red-400" />
                            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Strategic Gap</span>
                          </div>
                          <p className="text-[12px] font-medium text-gray-600 leading-tight pl-3 border-l border-gray-100">{comp.weakness}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50/30 px-4 py-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[9px] font-semibold text-indigo-400 uppercase tracking-widest">Primary Persona</span>
                      <span className="text-[10px] font-semibold text-indigo-700">{comp.persona}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Gap Analysis - ERP AUDIT MATRIX */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4 border-l-4 border-amber-500 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Cross-Platform Gap Audit</h3>
                <span className="text-[10px] font-semibold text-gray-400">Basis: Service Heritage & Tech Stack</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm no-scrollbar">
                <div className="min-w-[600px] md:min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80 border-b border-gray-200 hover:bg-gray-50/80">
                        <TableHead className="w-[180px] py-3 pl-6 font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Strategy Vector</TableHead>
                        <TableHead className="text-center font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Zerodha</TableHead>
                        <TableHead className="text-center font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Groww</TableHead>
                        <TableHead className="text-center font-semibold text-indigo-600 text-[10px] uppercase tracking-wider bg-indigo-50/30">Pocketful</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {COMPETITOR_ANALYSIS.gapAnalysis.map((gap) => (
                        <TableRow key={gap.category} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors group">
                          <TableCell className="py-3 pl-6">
                            <div className="text-[12px] font-semibold text-gray-900">{gap.category}</div>
                            <div className="text-[9px] text-gray-400 font-medium">{gap.impact}</div>
                          </TableCell>
                          <TableCell className="text-center py-3">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[11px] font-semibold text-gray-700">{gap.zerodha}/5</span>
                              <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400" style={{ width: `${(gap.zerodha / 5) * 100}%` }} />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-3">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[11px] font-semibold text-gray-700">{gap.groww}/5</span>
                              <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400" style={{ width: `${(gap.groww / 5) * 100}%` }} />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-3 bg-indigo-50/10 group-hover:bg-indigo-50/20 transition-colors">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[11px] font-semibold text-indigo-700">{gap.pocketful}/5</span>
                              <div className="h-1 w-12 bg-indigo-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600" style={{ width: `${(gap.pocketful / 5) * 100}%` }} />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* 4. Deep Differentiators - ERP ASSET CATALOG */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4 border-l-4 border-indigo-600 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Institutional Asset Catalog</h3>
                <span className="text-[10px] font-semibold text-gray-400">Section: Strategic Moats</span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {DEEP_COMPETITIVE_ANALYSIS.specificDifferentiators.map((diff) => (
                  <div key={diff.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:border-indigo-300 transition-colors flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gray-50 p-2 rounded-md border border-gray-100">
                        <Zap className="size-4 text-indigo-600" />
                      </div>
                      <Badge className="bg-amber-50 text-amber-700 border-amber-100 text-[8px] font-semibold uppercase tracking-widest px-1.5 py-0">{diff.status}</Badge>
                    </div>

                    <h4 className="text-[14px] font-semibold text-gray-900 mb-1.5 leading-tight">{diff.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-normal mb-4 flex-1">{diff.details}</p>

                    <div className="p-3 bg-gray-50/80 rounded-md border border-gray-100">
                      <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Advantage Logic</div>
                      <p className="text-[11px] font-semibold text-gray-800 leading-tight">{diff.opportunity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Feature Deep Dive - ADVANTAGE MATRIX ERP */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4 border-l-4 border-emerald-500 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Tactical Advantage Matrix</h3>
                <span className="text-[10px] font-semibold text-gray-400">Comparison Basis: Feature Parity vs Innovation</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm no-scrollbar">
                <div className="min-w-[800px] md:min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80 border-b border-gray-200 hover:bg-gray-50/80">
                        <TableHead className="w-[200px] py-3 pl-6 font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Feature Vector</TableHead>
                        <TableHead className="text-center font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Zerodha</TableHead>
                        <TableHead className="text-center font-semibold text-gray-500 text-[10px] uppercase tracking-wider">Groww</TableHead>
                        <TableHead className="text-center font-semibold text-indigo-600 text-[10px] uppercase tracking-wider bg-indigo-50/30">Pocketful</TableHead>
                        <TableHead className="text-right pr-6 font-semibold text-gray-900 text-[10px] uppercase tracking-wider">Market Verdict</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {DEEP_COMPETITIVE_ANALYSIS.featureByFeatureComparison.map((feat) => (
                        <TableRow key={feat.feature} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors group">
                          <TableCell className="py-3 pl-6">
                            <div className="text-[12px] font-semibold text-gray-900">{feat.feature}</div>
                          </TableCell>
                          <TableCell className="text-center text-[11px] font-semibold text-gray-500">{feat.zerodha}</TableCell>
                          <TableCell className="text-center text-[11px] font-semibold text-gray-500">{feat.groww}</TableCell>
                          <TableCell className="text-center text-[11px] font-semibold text-indigo-700 bg-indigo-50/10 border-x border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">{feat.pocketful}</TableCell>
                          <TableCell className="text-right pr-6">
                            <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none text-[8px] font-semibold uppercase tracking-widest px-2 py-0.5">{feat.winner}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* 6. Strategic Opportunities - ERP EXECUTION ROADMAP */}
            <div className="mb-0">
              <div className="flex items-center justify-between mb-4 border-l-4 border-indigo-600 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Strategic Capture Roadmap</h3>
                <span className="text-[10px] font-semibold text-gray-400">Total Phases: {COMPETITOR_ANALYSIS.strategicOpportunities.length}</span>
              </div>

              <div className="grid md:grid-cols-3 gap-0 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm divide-x divide-gray-200">
                {COMPETITOR_ANALYSIS.strategicOpportunities.map((opp, idx) => (
                  <div key={opp.title} className="p-5 hover:bg-gray-50 group transition-colors flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="size-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-semibold leading-none">0{idx + 1}</div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Phase {idx + 1}</span>
                    </div>

                    <h4 className="text-[14px] font-semibold text-gray-900 mb-2 leading-tight">{opp.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-normal mb-6 flex-1">{opp.description}</p>

                    <div className="space-y-2.5 pt-4 border-t border-gray-100">
                      {opp.proofPoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="size-1 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest leading-none">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>




        {/* Footer */}
        <footer id="footer" className="py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-9 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xs">A</div>
                  <span className="text-xs font-bold text-gray-900">Abhineet Jain</span>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Submission Deliverables</h5>
                  <ul className="space-y-1.5">
                    {[
                      { label: "User Journey Report (KYC)", status: "Completed", link: "#journey" },
                      { label: "Top 5 Feature Enhancements", status: "Completed", link: "#features" },
                      { label: "High-Impact Feature Design", status: "Completed", link: "#wireframes" },
                      { label: "Usability Flaws Audit", status: "Completed", link: "#audit" },
                      { label: "Competitive Analysis", status: "Completed", link: "#competitors" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-medium text-gray-600">
                        <CheckCircle className="size-3.5 text-green-500 shrink-0" />
                        <a href={item.link} className="hover:text-blue-600 hover:underline decoration-blue-200 underline-offset-4 transition-all">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-5 text-[11px] font-bold text-gray-900 pt-2">
                  <a href="https://www.linkedin.com/in/abhineet-jain/" target="_blank" className="hover:text-blue-600 transition-colors">LinkedIn</a>
                  <a href="https://github.com/abhij1306" target="_blank" className="hover:text-blue-600 transition-colors">GitHub</a>
                  <a href="mailto:abhij1306@gmail.com" className="hover:text-blue-600 transition-colors">Email</a>
                </div>
              </div>

              <div className="md:text-right space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900">Let's build the future.</h4>
                  <div className="flex flex-col md:items-end gap-0.5">
                    <a href="mailto:abhij1306@gmail.com" className="block text-gray-500 font-medium hover:text-blue-600 transition-colors">abhij1306@gmail.com</a>
                    <a href="tel:+918999635679" className="block text-gray-500 font-medium hover:text-blue-600 transition-colors">+91 89996 35679</a>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="/Pocketful_submission.pdf" download="Pocketful_Proposal_Audit.pdf" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="h-12 px-6 rounded-xl font-bold border-gray-200 text-gray-900 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 w-full md:w-auto transition-all">
                        Download Audit Proposal <ExternalLink className="ml-2 size-4" />
                      </Button>
                    </a>
                    <a href="/Feature_Design_PRD.pdf" download="Pocketful_Feature_PRD.pdf" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="h-12 px-6 rounded-xl font-bold border-gray-200 text-gray-900 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 w-full md:w-auto transition-all">
                        Download Feature PRD <ExternalLink className="ml-2 size-4" />
                      </Button>
                    </a>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">Strategic roadmap (Left) and Deep-dive specifications (Right).</p>
                </div>
              </div>
            </div>
            <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between text-xs font-medium text-gray-400 gap-4">
              <span>© 2026 Abhineet Jain | TPM Feature Design Portfolio</span>
            </div>
          </div>
        </footer>

        <Dialog open={showTSEModal} onOpenChange={setShowTSEModal}>
          <TSEModal />
        </Dialog>
        <Dialog open={showROMModal} onOpenChange={setShowROMModal}>
          <ROMModal />
        </Dialog>
        <Dialog open={showCASHModal} onOpenChange={setShowCASHModal}>
          <CASHModal />
        </Dialog>
      </div>
    </>
  );
}
