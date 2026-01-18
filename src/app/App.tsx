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
  Target, Globe, Zap, Users, Milestone, Wrench, ClipboardCheck, Code2, Check, ArrowDown, Info, Wifi, WifiOff, Database, Menu, X, Activity, Star
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

        {/* Hero Section */}
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 font-bold px-3 py-1 text-[11px]">
                  Product Management Task
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-[1.1] tracking-tight">
                Strategic Platform Evolution.
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                A comprehensive audit and product roadmap designed to restore user trust and democratize institutional-grade trading tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-5 rounded-xl transition-all shadow-lg hover:shadow-xl w-full sm:w-auto" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button size="lg" variant="outline" className="border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold px-8 py-5 rounded-xl transition-all shadow-sm hover:shadow-md w-full sm:w-auto" asChild>
                  <a href="#audit">View Audit Findings</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* User Personas Section */}
        <section id="personas" className="py-10 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-12">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 font-bold mb-3 px-3 py-1 text-[11px]">User Research</Badge>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Who We're Building For</h2>
              <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">{PERSONA_INSIGHT.context}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {PERSONAS.map((persona) => (
                <div key={persona.id} className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{persona.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{persona.name}, {persona.age}</h3>
                      <p className="text-xs text-gray-500">{persona.title} • {persona.location}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 italic border-l-2 border-purple-200 pl-3 leading-relaxed">{persona.quote}</p>

                  <p className="text-gray-700 text-[13px] mb-4 flex-1">{persona.description}</p>

                  <div className="mb-3">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Pain Points</span>
                    <ul className="mt-1 space-y-1">
                      {persona.painPoints.slice(0, 2).map((point, i) => (
                        <li key={i} className="text-[11px] text-gray-600 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Needs</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {persona.needs.map((need) => (
                        <Badge key={need} variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 px-2 py-0">{need}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Feature Mapping</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {persona.featureMapping.map((feature) => (
                        <Badge key={feature} className="text-[9px] bg-blue-600 text-white px-2 py-0">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 md:p-8 text-center">
              <h3 className="font-bold text-purple-900 text-lg mb-2">{PERSONA_INSIGHT.headline}</h3>
              <p className="text-purple-700 max-w-3xl mx-auto">{PERSONA_INSIGHT.opportunity}</p>
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

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 h-fit">
                <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <Clock className="size-4 text-teal-600" />
                  Execution Summary
                </h3>
                <div className="space-y-5">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">~12 min</div>
                    <div className="text-xs font-medium text-gray-500">Total Time to Trade-Ready</div>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-teal-500 h-full w-[70%]" title="Pocketful (12m)"></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-wide">
                      <span>Pocketful (12m)</span>
                      <span>Avg (15m)</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Platform</span>
                      <span className="font-bold text-gray-900">{KYC_JOURNEY.summary.platform}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Network</span>
                      <span className="font-bold text-gray-900">{KYC_JOURNEY.summary.network}</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100">
                    <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-2.5">Highlights</h4>
                    <ul className="flex overflow-x-auto snap-x py-2 gap-3 -mx-4 px-4 scroll-pl-4 md:block md:space-y-1.5 md:mx-0 md:px-0 scroll-smooth">
                      {KYC_JOURNEY.highlights.map((highlight, i) => (
                        <li key={i} className="min-w-[60vw] snap-center shrink-0 md:min-w-0 md:shrink text-xs text-gray-600 flex items-start gap-2 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none">
                          <CheckCircle className="size-3.5 text-green-500 shrink-0 mt-0.5" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-7">
                  <h3 className="text-base font-bold text-gray-900 mb-5">Journey Timeline</h3>
                  <div className="flex overflow-x-auto snap-x py-2 gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scroll-smooth">
                    {KYC_JOURNEY.steps.map((step, i) => (
                      <div key={i} className="min-w-[75vw] sm:min-w-[280px] snap-center shrink-0 md:min-w-0 md:shrink group relative p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-teal-200 transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px] border border-teal-100">
                            {step.step}
                          </div>
                          <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{step.time}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-[12px] mb-1">{step.action}</h4>
                        <p className="text-[11px] text-gray-500 leading-tight">{step.experience}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pain Points */}
                <div className="bg-red-50/50 rounded-2xl border border-red-100 p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-1.5 bg-red-100 rounded-lg text-red-600">
                      <ShieldAlert className="size-4" />
                    </div>
                    <h3 className="text-base font-bold text-red-900">Friction Points Identified</h3>
                  </div>
                  <div className="flex overflow-x-auto snap-x py-2 gap-3 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 scroll-smooth">
                    {KYC_JOURNEY.painPoints.map((point, i) => (
                      <div key={i} className="min-w-[70vw] sm:min-w-[240px] snap-center shrink-0 sm:min-w-0 sm:shrink bg-white p-3.5 rounded-xl border border-red-100 shadow-sm">
                        <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-0.5">{point.issue}</div>
                        <div className="text-xs font-medium text-gray-900 leading-tight">{point.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-10 md:py-20 bg-gray-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Product Innovation</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The Innovation Suite</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Institutional-grade mechanics engineered for the next generation of retail traders.</p>
            </div>

            {/* Target Users & Business Metrics Legend */}
            <div className="mb-10 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Target User Groups */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-900 mb-3 uppercase tracking-wide">Target User Groups</h4>
                  <div className="flex flex-wrap gap-2">
                    {PERSONAS.map((p) => (
                      <div key={p.id} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${PERSONA_COLORS[p.id as keyof typeof PERSONA_COLORS].bg} ${PERSONA_COLORS[p.id as keyof typeof PERSONA_COLORS].border} border`}>
                        <span className="text-xs">{p.icon}</span>
                        <span className={`text-[10px] font-medium ${PERSONA_COLORS[p.id as keyof typeof PERSONA_COLORS].text}`}>{p.name.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Business Metrics */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-900 mb-3 uppercase tracking-wide">Target Business Metrics</h4>
                  <div className="flex flex-wrap gap-2">
                    {TARGET_BUSINESS_METRICS.map((m) => (
                      <div key={m.id} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${METRIC_COLORS[m.id as keyof typeof METRIC_COLORS].bg} border border-transparent`}>
                        <div className={`size-1.5 rounded-full ${METRIC_COLORS[m.id as keyof typeof METRIC_COLORS].dot}`}></div>
                        <span className={`text-[10px] font-medium ${METRIC_COLORS[m.id as keyof typeof METRIC_COLORS].text}`}>{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View: Stacked Cards (Optimized Scroll) */}
            <div className="flex overflow-x-auto snap-x py-6 gap-5 lg:hidden -mx-6 px-6 scroll-pl-6 scroll-smooth">
              {PRD_DATA.features.map((feature, idx) => {
                const mapping = FEATURE_MAPPING[feature.id as keyof typeof FEATURE_MAPPING];
                return (
                  <div key={feature.id} className="min-w-[85vw] sm:min-w-[320px] max-w-[85vw] sm:max-w-[320px] snap-center shrink-0 group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-md p-6 md:p-7 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-block px-2.5 py-0.5 bg-white rounded text-[10px] font-bold border border-gray-200 text-blue-600 shadow-sm">{feature.title}</span>

                        {/* Persona indicators */}
                        {mapping?.personas.map((pId) => {
                          const persona = PERSONAS.find(p => p.id === pId);
                          const colors = PERSONA_COLORS[pId as keyof typeof PERSONA_COLORS];
                          return persona && (
                            <span key={pId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
                              {persona.icon} {persona.name.split(' ')[0]}
                            </span>
                          );
                        })}
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.valueProp}</p>

                      {/* Metric indicators */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {mapping?.metrics.map((mId) => {
                          const metric = TARGET_BUSINESS_METRICS.find(m => m.id === mId);
                          const colors = METRIC_COLORS[mId as keyof typeof METRIC_COLORS];
                          return metric && (
                            <span key={mId} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-medium ${colors.bg} ${colors.text}`}>
                              <span className={`size-1 rounded-full ${colors.dot}`}></span>
                              {metric.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4 mt-auto">
                      <div className="grid gap-2.5">
                        {feature.successMetrics.slice(0, 3).map((metric, i) => (
                          <div key={i} className="flex items-start gap-3 text-gray-700">
                            <div className="size-5 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                              <CheckCircle className="size-3 text-green-600" />
                            </div>
                            <span className="font-bold text-gray-900 text-xs leading-tight">{metric.metric}: {metric.targetM6}</span>
                          </div>
                        ))}
                      </div>

                      {/* Embedded Risk Assessment */}
                      {(() => {
                        const riskItem = RISK_ASSESSMENT.find(r => r.featureId === feature.id);
                        if (!riskItem) return null;
                        return (
                          <div className="mt-4 p-3 md:p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                            <h4 className="flex items-center gap-1.5 text-[9px] font-bold text-orange-800 uppercase tracking-widest mb-2.5">
                              <AlertCircle className="size-3" /> Risk Profile
                            </h4>
                            <div className="space-y-2.5">
                              {riskItem.risks.map((risk, idx) => (
                                <div key={idx} className="text-[11px]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="bg-white text-orange-700 border-orange-200 text-[8px] px-1 py-0 h-4">
                                      {risk.type}
                                    </Badge>
                                    <span className="font-medium text-gray-700">{risk.description}</span>
                                  </div>
                                  <div className="pl-1.5 border-l-2 border-orange-200 ml-1">
                                    <p className="text-[10px] text-gray-500 pl-1.5 leading-snug"><span className="font-bold text-orange-600">Mitigation:</span> {risk.mitigation}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Mobile Details Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="w-full justify-between items-center px-3 py-2 h-auto rounded-xl bg-gray-50 font-bold text-[11px] text-gray-700 border border-gray-100 mt-2">
                            View PRD Details <ArrowRight className="size-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-0 bg-white border-none shadow-2xl rounded-2xl text-left">
                          <div className="p-6 space-y-6">
                            <div className="text-left">
                              <DialogTitle className="text-lg font-bold text-gray-900 mb-1">{feature.title}</DialogTitle>
                              <div className="flex gap-2 justify-start">
                                <Badge className="bg-blue-50 text-blue-600 border-none font-bold uppercase text-[9px] px-2 py-0.5">{feature.priority}</Badge>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase text-[9px] px-2 py-0.5">{feature.id}</Badge>
                              </div>
                            </div>
                            <div className="space-y-6 text-xs text-left">
                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Value Proposition</h4>
                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                  <DialogDescription className="text-blue-900 font-medium italic leading-relaxed">"{feature.valueProp}"</DialogDescription>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Key Features</h4>
                                <div className="space-y-2">
                                  {feature.userStories.slice(0, 2).map((story) => (
                                    <div key={story.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                      <div className="font-bold text-gray-700 text-[10px] mb-1">{story.id}</div>
                                      <p className="text-gray-600 leading-snug">{story.story}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Problem Statement</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.problem}</p>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">User Stories</h4>
                                <div className="space-y-3">
                                  {feature.userStories.map((story) => (
                                    <div key={story.id}>
                                      <div className="font-bold text-blue-600 text-[10px] mb-0.5">{story.id}</div>
                                      <p className="text-gray-600 leading-snug">{story.story}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {feature.id === 'SER' ? (
                        <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl" onClick={handleMobileErrorDemo}>
                          Launch Mobile Demo <ArrowRight className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'SOA' ? (
                        <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl" onClick={handleDesktopAlgoDemo}>
                          Open Order Assistant <Monitor className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'TSE' ? (
                        <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl" onClick={() => setShowTSEModal(true)}>
                          View Explainer Demo <Info className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'ROM' ? (
                        <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl" onClick={() => setShowROMModal(true)}>
                          View Offline Mode <Users className="ml-2 size-4" />
                        </Button>
                      ) : feature.id === 'CASH' ? (
                        <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl" onClick={() => setShowCASHModal(true)}>
                          View Smart Home <Zap className="ml-2 size-4" />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Master-Detail */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Master List */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Core Features</h3>
                <div className="space-y-3">
                  {PRD_DATA.features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedFeatureId(feature.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${selectedFeatureId === feature.id
                        ? 'bg-white border-blue-600 shadow-lg ring-1 ring-blue-600/10 scale-[1.02]'
                        : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                        }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className={`font-bold px-2 py-0 text-[10px] uppercase tracking-wider ${selectedFeatureId === feature.id ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                          {feature.id}
                        </Badge>
                      </div>
                      <h4 className={`text-sm font-bold leading-tight ${selectedFeatureId === feature.id ? 'text-gray-900' : 'text-gray-600'}`}>{feature.title}</h4>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail View */}
              <div className="lg:col-span-8 sticky top-24">
                {(() => {
                  const feature = PRD_DATA.features.find(f => f.id === selectedFeatureId) || PRD_DATA.features[0];
                  const mapping = FEATURE_MAPPING[feature.id as keyof typeof FEATURE_MAPPING];

                  return (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 animate-in fade-in duration-300">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <Badge className="bg-blue-600 text-white font-bold border-none text-[11px] px-3 py-1 shadow-sm shadow-blue-200">{feature.title}</Badge>

                            {/* Persona indicators */}
                            {mapping?.personas.map((pId) => {
                              const persona = PERSONAS.find(p => p.id === pId);
                              const colors = PERSONA_COLORS[pId as keyof typeof PERSONA_COLORS];
                              return persona && (
                                <span key={pId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
                                  {persona.icon} {persona.name.split(' ')[0]}
                                </span>
                              );
                            })}
                          </div>

                          <h3 className="text-3xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">{feature.valueProp}</p>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {mapping?.metrics.map((mId) => {
                              const metric = TARGET_BUSINESS_METRICS.find(m => m.id === mId);
                              const colors = METRIC_COLORS[mId as keyof typeof METRIC_COLORS];
                              return metric && (
                                <span key={mId} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${colors.bg} ${colors.text}`}>
                                  <span className={`size-1.5 rounded-full ${colors.dot}`}></span>
                                  {metric.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="shrink-0">
                          {feature.id === 'SER' ? (
                            <Button size="lg" className="w-full md:w-auto py-4 px-6 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" onClick={handleMobileErrorDemo}>
                              Launch Mobile Demo <ArrowRight className="ml-2 size-4" />
                            </Button>
                          ) : feature.id === 'SOA' ? (
                            <Button size="lg" className="w-full md:w-auto py-4 px-6 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" onClick={handleDesktopAlgoDemo}>
                              Open Order Assistant <Monitor className="ml-2 size-4" />
                            </Button>
                          ) : feature.id === 'TSE' ? (
                            <Button size="lg" className="w-full md:w-auto py-4 px-6 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" onClick={() => setShowTSEModal(true)}>
                              View Explainer Demo <Info className="ml-2 size-4" />
                            </Button>
                          ) : feature.id === 'ROM' ? (
                            <Button size="lg" className="w-full md:w-auto py-4 px-6 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" onClick={() => setShowROMModal(true)}>
                              View Offline Mode <Users className="ml-2 size-4" />
                            </Button>
                          ) : feature.id === 'CASH' ? (
                            <Button size="lg" className="w-full md:w-auto py-4 px-6 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" onClick={() => setShowCASHModal(true)}>
                              View Smart Home <Zap className="ml-2 size-4" />
                            </Button>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Success Metrics */}
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Success Metrics</h4>
                          <div className="grid gap-3">
                            {feature.successMetrics.slice(0, 3).map((metric, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                                <div className="size-5 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100 mt-0.5">
                                  <CheckCircle className="size-3 text-green-600" />
                                </div>
                                <span className="font-bold text-gray-900 text-xs leading-tight">{metric.metric}: <span className="text-blue-600">{metric.targetM6}</span></span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Risk Assessment */}
                        <div>
                          {(() => {
                            const riskItem = RISK_ASSESSMENT.find(r => r.featureId === feature.id);
                            if (!riskItem) return null;
                            return (
                              <div className="h-full">
                                <h4 className="flex items-center gap-1.5 text-[11px] font-bold text-orange-800 uppercase tracking-widest mb-4">
                                  <AlertCircle className="size-3" /> Risk Profile
                                </h4>
                                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-3">
                                  {riskItem.risks.slice(0, 2).map((risk, idx) => (
                                    <div key={idx} className="text-[11px]">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="bg-white text-orange-700 border-orange-200 text-[9px] px-1.5 py-0 h-4 font-bold">
                                          {risk.type}
                                        </Badge>
                                      </div>
                                      <span className="font-medium text-gray-800 leading-snug block mb-1">{risk.description}</span>
                                      <div className="text-[10px] text-gray-500 leading-snug"><span className="font-bold text-orange-600">Mitigation:</span> {risk.mitigation}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>


                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Design (Wireframes) Section */}
        <section id="wireframes" className="py-10 md:py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Feature Design</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Visual Interface Design</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">High-fidelity schematic representation of the proposed Smart Error Recovery system.</p>
            </div>

            <div className="flex overflow-x-auto snap-x py-6 gap-6 md:grid md:grid-cols-2 md:overflow-visible md:p-0 -mx-6 px-6 md:mx-0 scroll-pl-6 scroll-smooth">
              <div className="min-w-[85vw] sm:min-w-[300px] snap-center shrink-0 md:min-w-0 md:shrink bg-white rounded-2xl border border-red-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-red-100 text-red-700 text-[10px] px-2 py-0">Before</Badge>
                  <span className="text-xs font-medium text-gray-500">Current Error State</span>
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
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-gray-200"></div>
                <h3 className="text-lg font-bold text-gray-900">User Flow: Smart Error Recovery</h3>
                <div className="h-px flex-1 bg-gray-100"></div>
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
          </div>
        </section>

        {/* Performance Analysis (Formerly Audit) Section */}
        <section id="audit" className="py-12 md:py-20 bg-gray-50/50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">System Audit</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Performance Analysis</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Systematic review of identified usability gaps following firsthand evaluation.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Master List */}
              <div className="lg:col-span-4 space-y-3">
                <div className="hidden lg:block mb-4 text-left">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Identified Gaps</h3>
                  <div className="space-y-2">
                    {FLAWS.map((flaw) => (
                      <button
                        key={String(flaw.id)}
                        onClick={() => setSelectedFlawId(flaw.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 group ${selectedFlawId === flaw.id
                          ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-100'
                          : 'bg-transparent border-transparent hover:bg-gray-100/50 grayscale opacity-70 hover:opacity-100 hover:grayscale-0'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <Badge variant="outline" className={`font-bold px-1.5 py-0 text-[8px] uppercase tracking-wider ${flaw.severity === 'High' ? 'text-red-600 border-red-100 bg-red-50' : 'text-amber-600 border-amber-100 bg-amber-50'}`}>
                            {flaw.severity}
                          </Badge>
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{flaw.risk}</span>
                        </div>
                        <h4 className={`text-[13px] font-bold leading-tight ${selectedFlawId === flaw.id ? 'text-blue-600' : 'text-gray-700'}`}>
                          {flaw.title}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile View: Cards */}
                <div className="lg:hidden grid gap-4">
                  {FLAWS.map((flaw) => (
                    <Card key={String(flaw.id)} className="bg-white rounded-2xl border-gray-100 shadow-md p-1">
                      <CardHeader className="pb-2 pt-4 px-4 text-left">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className={`font-bold px-2 py-0.5 text-[9px] uppercase tracking-wider ${flaw.severity === 'High' ? 'text-red-600 border-red-100 bg-red-50' : 'text-amber-600 border-amber-100 bg-amber-50'}`}>
                            {flaw.severity}
                          </Badge>
                        </div>
                        <CardTitle className="text-base font-bold text-gray-900 leading-tight">{flaw.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 text-left">
                        <p className="text-gray-500 font-medium mb-4 text-xs leading-relaxed text-left">{flaw.observed}</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between items-center px-3 py-2 h-auto rounded-xl bg-gray-50 font-bold text-[11px] text-gray-700 border border-gray-100">
                              View Analysis <ArrowRight className="size-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-0 bg-white border-none shadow-2xl rounded-2xl text-left">
                            <div className="p-6 space-y-6">
                              <div className="text-left">
                                <DialogTitle className="text-lg font-bold text-gray-900 mb-1">{flaw.title}</DialogTitle>
                                <div className="flex gap-2 justify-start">
                                  <Badge className="bg-red-50 text-red-600 border-none font-bold uppercase text-[9px] px-2 py-0.5">{flaw.severity}</Badge>
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase text-[9px] px-2 py-0.5">{flaw.risk}</Badge>
                                </div>
                              </div>
                              <div className="space-y-4 text-xs text-left">
                                <div>
                                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Context</h4>
                                  <DialogDescription className="text-gray-700 font-medium leading-relaxed">{flaw.observed}</DialogDescription>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                  <h4 className="font-bold text-blue-900 mb-1 uppercase tracking-widest text-[8px]">Resolution</h4>
                                  <p className="text-blue-800 font-bold italic">"{flaw.rootCause}"</p>
                                </div>

                                {flaw.screenshot && (
                                  <div className="mt-4">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Visual Evidence</h4>
                                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                      <img
                                        src={flaw.screenshot}
                                        alt={`Screenshot of ${flaw.title}`}
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Detail Panel */}
              <div className="hidden lg:block lg:col-span-8 sticky top-24">
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                  <div className="p-8 border-b border-gray-50 bg-white text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-red-50 text-red-600 border-none font-bold uppercase tracking-widest text-[10px] px-3 py-1">{selectedFlaw.severity}</Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase tracking-widest text-[10px] px-3 py-1">{selectedFlaw.risk}</Badge>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-8 leading-tight text-left">{selectedFlaw.title}</h3>

                    <div className="grid grid-cols-2 gap-8 mb-8 text-left">
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-50">Context & Observation</h4>
                        <p className="text-[14px] text-gray-700 font-medium leading-relaxed">{selectedFlaw.observed}</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-50">Strategic Impact</h4>
                        <p className="text-[14px] text-gray-600 font-medium leading-relaxed">{selectedFlaw.impact}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-left">
                      <h4 className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Resolution Hypothesis</h4>
                      <p className="text-gray-900 font-medium leading-relaxed text-sm">"{selectedFlaw.rootCause}"</p>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 bg-gray-50/10">
                    <div className="p-8 text-left">
                      {selectedFlaw.screenshot ? (
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Technical Evidence</h4>
                          <div className="rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white max-w-2xl mx-auto">
                            <img src={selectedFlaw.screenshot} alt={selectedFlaw.title} className="w-full h-auto object-contain max-h-[500px]" />
                          </div>
                        </div>
                      ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-300 space-y-3 border-2 border-dashed border-gray-100 rounded-[2rem]">
                          <Info className="size-8 opacity-20" />
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Direct Observation Validated</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Artifact Hub Section - FULL PREMIUM LIGHT */}

        <section id="competitors" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Market Context</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Competitive Analysis</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">Evaluating the landscape to identify strategic gaps and differentiation opportunities.</p>
            </div>

            {/* 1. Market Context & App Store Ratings - COMPACT REDESIGN */}
            <div className="grid lg:grid-cols-12 gap-6 mb-12">
              {/* Market Context Stats */}
              <div className="lg:col-span-8 flex flex-col">
                <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">Market Scope & Growth Potential</h3>
                <div className="flex overflow-x-auto snap-x py-2 gap-3 pb-4 md:grid md:grid-cols-2 md:pb-0 scroll-smooth">
                  <div className="min-w-[40vw] sm:min-w-[160px] snap-center shrink-0 md:min-w-0 md:shrink p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors">
                    <div>
                      <div className="text-xl font-bold text-gray-900">{DEEP_COMPETITIVE_ANALYSIS.marketContext.totalDematAccounts}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total Demat</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                      <Users className="size-5 text-indigo-600" />
                    </div>
                  </div>
                  <div className="min-w-[40vw] sm:min-w-[160px] snap-center shrink-0 md:min-w-0 md:shrink p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-colors">
                    <div>
                      <div className="text-xl font-bold text-gray-900">{DEEP_COMPETITIVE_ANALYSIS.marketContext.activeTraders}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Active Traders</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                      <Activity className="size-5 text-indigo-600" />
                    </div>
                  </div>
                  <div className="min-w-[40vw] sm:min-w-[160px] snap-center shrink-0 md:min-w-0 md:shrink p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-indigo-700">{DEEP_COMPETITIVE_ANALYSIS.marketContext.untappedMarket}</div>
                      <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Untapped</div>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <Zap className="size-5 text-indigo-600" />
                    </div>
                  </div>
                  <div className="min-w-[40vw] sm:min-w-[160px] snap-center shrink-0 md:min-w-0 md:shrink p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-900 leading-tight">Tier-2/3 Retail</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Next Wave</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Target className="size-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* App Store Ratings */}
              <div className="lg:col-span-4 flex flex-col">
                <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">App Store Sentiment</h3>
                <div className="flex overflow-x-auto snap-x py-2 gap-3 pb-2 -mx-6 px-6 scroll-pl-6 scroll-smooth lg:grid lg:grid-rows-3 lg:gap-3 lg:flex-none lg:mx-0 lg:px-0 lg:pb-0">
                  <div className="min-w-[75vw] sm:min-w-[280px] snap-center shrink-0 flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-gray-900 text-sm">Zerodha</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.zerodha.reviews}</span>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 font-bold border-green-100 text-[10px]">{DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.zerodha.rating} ★</Badge>
                    </div>
                  </div>
                  <div className="min-w-[75vw] sm:min-w-[280px] snap-center shrink-0 flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-gray-900 text-sm">Groww</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.groww.reviews}</span>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 font-bold border-green-100 text-[10px]">{DEEP_COMPETITIVE_ANALYSIS.appStoreRatings.groww.rating} ★</Badge>
                    </div>
                  </div>
                  <div className="min-w-[75vw] sm:min-w-[280px] snap-center shrink-0 flex items-center justify-between px-4 py-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                    <span className="font-bold text-white text-sm">Pocketful</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Target</span>
                      <Badge className="bg-white text-indigo-600 font-bold border-none text-[10px]">4.8 ★</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Market Positioning (Existing) */}
            <div className="mb-16">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-6 md:px-0">Market Positioning</h3>
              <div className="flex overflow-x-auto snap-x py-6 gap-6 -mx-6 px-6 scroll-pl-6 scroll-smooth md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 md:py-0">
                {COMPETITOR_ANALYSIS.marketPositioning.map((comp) => (
                  <div key={comp.name} className="min-w-[85vw] sm:min-w-[300px] snap-center shrink-0 md:min-w-0 md:shrink p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-gray-900">{comp.name}</h4>
                      <Badge variant="secondary" className="bg-gray-50 text-gray-500 font-bold text-[9px] px-2 py-0">{comp.share}</Badge>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Strength</span>
                        <p className="text-xs text-gray-700 font-medium leading-relaxed">{comp.strength}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Weakness</span>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{comp.weakness}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Primary Persona</span>
                      <p className="text-xs font-bold text-indigo-600">{comp.persona}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Deep Differentiators (New) */}
            <div className="mb-16">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-6 md:px-0">Deep Differentiators & Assets</h3>
              <div className="flex overflow-x-auto snap-x py-6 gap-6 -mx-6 px-6 scroll-pl-6 scroll-smooth md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 md:py-0">
                {DEEP_COMPETITIVE_ANALYSIS.specificDifferentiators.map((diff) => (
                  <div key={diff.id} className="min-w-[85vw] sm:min-w-[300px] snap-center shrink-0 md:min-w-0 md:shrink p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:scale-[1.02] transition-transform">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Zap className="size-5 text-indigo-600" />
                      </div>
                      <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-amber-200 bg-amber-50 text-amber-700">{diff.status}</Badge>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{diff.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{diff.details}</p>
                    <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Strategic Opportunity</span>
                      <p className="text-xs font-bold text-gray-700 leading-tight">{diff.opportunity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Gap Analysis (Existing) */}
            <div className="space-y-8 mb-16">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Gap Analysis & Strategic Advantage</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="border-gray-100">
                      <TableHead className="w-[300px] py-4 pl-6 font-bold text-gray-900 text-[10px] uppercase tracking-widest">Strategy Vector</TableHead>
                      <TableHead className="text-center font-bold text-gray-400 text-[9px] uppercase tracking-widest">Zerodha</TableHead>
                      <TableHead className="text-center font-bold text-gray-400 text-[9px] uppercase tracking-widest">Groww</TableHead>
                      <TableHead className="text-center font-bold text-indigo-700 text-[9px] uppercase tracking-widest bg-indigo-50/50">Pocketful</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMPETITOR_ANALYSIS.gapAnalysis.map((gap) => (
                      <TableRow key={gap.category} className="border-gray-50 hover:bg-gray-50/30 transition-colors">
                        <TableCell className="py-4 pl-6">
                          <div className="font-bold text-gray-900 text-[13px]">{gap.category}</div>
                          <div className="text-[10px] text-gray-500 font-medium">{gap.impact}</div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-gray-500">{gap.zerodha}/5</TableCell>
                        <TableCell className="text-center font-bold text-gray-500">{gap.groww}/5</TableCell>
                        <TableCell className="text-center font-bold text-indigo-600 bg-indigo-50/10">{gap.pocketful}/5</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* 5. Strategic Opportunities (Existing) */}
            <div className="mb-16">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Strategic Opportunities</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {COMPETITOR_ANALYSIS.strategicOpportunities.map((opp) => (
                  <div key={opp.title} className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                    <h4 className="text-base font-bold text-indigo-900 mb-2">{opp.title}</h4>
                    <p className="text-xs text-indigo-800/80 font-medium leading-relaxed mb-4">{opp.description}</p>
                    <div className="space-y-2">
                      {opp.proofPoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="size-3 text-indigo-600" />
                          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Deep Feature Comparison (Existing) */}
            <div className="space-y-8">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Feature-by-Feature Deep Dive</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow className="border-gray-100">
                      <TableHead className="w-[200px] py-4 pl-6 font-bold text-gray-900 text-[10px] uppercase tracking-widest">Feature Vector</TableHead>
                      <TableHead className="text-center font-bold text-gray-400 text-[9px] uppercase tracking-widest">Zerodha</TableHead>
                      <TableHead className="text-center font-bold text-gray-400 text-[9px] uppercase tracking-widest">Groww</TableHead>
                      <TableHead className="text-center font-bold text-indigo-700 text-[9px] uppercase tracking-widest bg-indigo-50/50">Pocketful</TableHead>
                      <TableHead className="text-right pr-6 font-bold text-gray-900 text-[10px] uppercase tracking-widest">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DEEP_COMPETITIVE_ANALYSIS.featureByFeatureComparison.map((feat) => (
                      <TableRow key={feat.feature} className="border-gray-50 hover:bg-gray-50/30 transition-colors">
                        <TableCell className="py-4 pl-6 text-[11px] font-bold text-gray-700">{feat.feature}</TableCell>
                        <TableCell className="text-center text-[11px] font-medium text-gray-500">{feat.zerodha}</TableCell>
                        <TableCell className="text-center text-[11px] font-medium text-gray-500">{feat.groww}</TableCell>
                        <TableCell className="text-center text-[11px] font-bold text-indigo-700 bg-indigo-50/10">{feat.pocketful}</TableCell>
                        <TableCell className="text-right pr-6 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{feat.winner}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>


        <section id="artifacts" className="py-12 md:py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-10 md:mb-16">
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none font-bold mb-4 px-3 py-1 text-[11px] mx-auto uppercase tracking-widest">Technical Documentation</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Strategic Documentation Hub</h2>
              <p className="text-gray-500 text-base font-medium max-w-2xl leading-relaxed mx-auto">
                Deep technical specifications, comprehensive quality protocols, and the high-fidelity execution roadmap for the next growth cycle.
              </p>
            </div>

            {/* 1. PRD Specs (Master List) - REVERTED TO PREMIUM */}
            <div id="specs" className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-3">
                <div className="hidden lg:block">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Core Specifications</h3>
                  <div className="space-y-2">
                    {PRD_DATA.features.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedPrdId(f.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${selectedPrdId === f.id
                          ? 'bg-white border-blue-600 shadow-lg ring-1 ring-blue-600/10'
                          : 'bg-white border-gray-100 hover:border-gray-200 grayscale opacity-60 hover:opacity-100 hover:grayscale-0'
                          }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className={`font-bold px-2 py-0 text-[9px] uppercase tracking-wider ${f.priority === 'P0' ? 'text-red-600 border-red-100 bg-red-50' : 'text-blue-600 border-blue-100 bg-blue-50'}`}>
                            {f.priority}
                          </Badge>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{f.id}</span>
                        </div>
                        <h4 className={`text-sm font-bold leading-tight ${selectedPrdId === f.id ? 'text-blue-600' : 'text-gray-900'}`}>{f.title}</h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile View: Cards (Simplified Audit Style) */}
                <div className="lg:hidden grid gap-4">
                  {PRD_DATA.features.map((f) => (
                    <Card key={f.id} className="bg-white rounded-2xl border-gray-100 shadow-md p-1">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className={`font-bold px-2 py-0.5 text-[9px] uppercase tracking-wider ${f.priority === 'P0' ? 'text-red-600 border-red-100 bg-red-50' : 'text-blue-600 border-blue-100 bg-blue-50'}`}>
                            {f.priority}
                          </Badge>
                        </div>
                        <CardTitle className="text-base font-bold text-gray-900 leading-tight">{f.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-4">
                        <p className="text-gray-500 font-medium mb-4 text-xs leading-relaxed">{f.flawAddressed}</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between items-center px-3 py-2 h-auto rounded-xl bg-gray-50 font-bold text-[11px] text-gray-700 border border-gray-100">
                              View Technical PRD <ArrowRight className="size-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-0 bg-white border-none shadow-2xl rounded-2xl text-left">
                            <div className="p-6 space-y-6">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                                <div className="flex gap-2">
                                  <Badge className="bg-blue-50 text-blue-600 border-none font-bold uppercase text-[9px] px-2 py-0.5">{f.priority}</Badge>
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase text-[9px] px-2 py-0.5">{f.id}</Badge>
                                </div>
                              </div>
                              <div className="space-y-4 text-xs">
                                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                  <h4 className="font-bold text-indigo-900 mb-1 uppercase tracking-widest text-[8px]">Value Proposition</h4>
                                  <p className="text-indigo-800 font-bold italic">"{f.valueProp}"</p>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-bold text-gray-400 uppercase tracking-widest mb-1">Key Features</h4>
                                  {f.userStories.slice(0, 2).map(story => (
                                    <div key={story.id} className="p-2 border border-gray-50 rounded-lg bg-gray-50/50">
                                      <span className="text-[9px] font-bold text-indigo-600">{story.id}</span>
                                      <p className="text-[11px] font-medium leading-tight">{story.story}</p>
                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-400 uppercase tracking-widest mb-1">Problem Statement</h4>
                                  <p className="text-gray-700 leading-relaxed font-medium">{f.problem}</p>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-bold text-gray-400 uppercase tracking-widest mb-1">User Stories</h4>
                                  {f.userStories.map(story => (
                                    <div key={story.id} className="p-2 border border-gray-50 rounded-lg bg-gray-50/50">
                                      <span className="text-[9px] font-bold text-indigo-600">{story.id}</span>
                                      <p className="text-[11px] font-medium leading-tight">{story.story}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-8 sticky top-24">
                {(() => {
                  const f = PRD_DATA.features.find(feat => feat.id === selectedPrdId)!;
                  return (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col group h-[580px]">
                      <div className="px-8 pt-8 pb-3 border-b border-gray-50 bg-white text-left">
                        <div className="flex items-center gap-3 mb-6">
                          <Badge className="bg-blue-50 text-blue-600 border-none font-bold uppercase tracking-widest text-[10px] px-3 py-1">Full Technical PRD</Badge>
                          <Badge variant="outline" className="bg-gray-50 border-none text-gray-400 font-bold uppercase tracking-widest text-[10px] px-3 py-1">{f.id} • PRIORITY {f.priority}</Badge>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">{f.title}</h3>
                      </div>

                      <ScrollArea className="flex-1">
                        <div className="px-8 pt-4 pb-4 space-y-6 text-left">
                          {/* Top Row: Problem & Value (Side-by-Side) */}
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Problem Statement */}
                            <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 h-full">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Target className="size-4 text-gray-400" /> Problem Statement
                              </h4>
                              <p className="text-[12px] text-gray-700 font-medium leading-relaxed">{f.problem}</p>
                            </div>

                            {/* Value Proposition */}
                            <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col justify-center h-full">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Zap className="size-4 text-gray-400" /> Value Proposition
                              </h4>
                              <p className="text-[12px] text-gray-700 font-medium leading-relaxed">{f.valueProp}</p>
                            </div>
                          </div>

                          {/* User Stories (Full Width - Boxed like above) */}
                          <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 text-left">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                              <Target className="size-4 text-gray-400" /> User Stories & Acceptance Criteria
                            </h4>
                            <div className="space-y-4">
                              {f.userStories.map((story) => (
                                <div key={story.id} className="flex gap-3 items-start group/story">
                                  <Badge variant="secondary" className="h-5 bg-white text-gray-500 font-mono text-[9px] px-1.5 border border-gray-200">{story.id}</Badge>
                                  <div className="space-y-1 w-full pt-0.5">
                                    <div className="flex items-start justify-between gap-4">
                                      <p className="text-[12px] font-medium text-gray-700 leading-relaxed">{story.story}</p>
                                      <Badge variant="outline" className={`ml-2 text-[9px] font-bold uppercase tracking-wider h-4 px-1 ${story.priority === 'P0' ? 'text-red-600 border-red-100 bg-red-50' : 'text-amber-600 border-amber-100 bg-amber-50'}`}>
                                        {story.priority}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  );
                })()}

              </div>
            </div>




            {/* 2. UAT Scenarios */}
            <div id="uat" className="scroll-mt-24 mt-24 mb-20 md:mb-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gray-200"></div>
                <h3 className="text-xl font-bold text-gray-900">UAT: Quality Assurance Matrix</h3>
                <div className="h-px flex-1 bg-gray-100"></div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm overflow-x-auto">
                <div className="min-w-[900px]">
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
              </div>
            </div>



            {/* 3. Execution Roadmap */}
            <div id="roadmap" className="scroll-mt-24 mb-20 md:mb-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gray-200"></div>
                <h3 className="text-xl font-bold text-gray-900">Lifecycle: Strategic Execution Roadmap</h3>
                <div className="h-px flex-1 bg-gray-100"></div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
            </div>

            {/* 4. Operational Frameworks */}
            <div id="ops" className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 text-sm">RACI Matrix</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px] font-bold uppercase w-[40%] text-gray-500">Deliverable</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-center text-blue-600">PM</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-center text-gray-500">Eng</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-center text-gray-500">Des</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-center text-gray-500">QA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RACI_MATRIX.map((row: any, i: number) => (
                      <TableRow key={i} className="hover:bg-gray-50/50">
                        <TableCell className="text-[11px] font-medium text-gray-900 py-2">{row.deliverable}</TableCell>
                        <TableCell className="text-center py-2"><Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[9px] font-bold px-1.5 py-0">{row.pm}</Badge></TableCell>
                        <TableCell className="text-center py-2"><span className="text-[11px] font-bold text-gray-500">{row.eng}</span></TableCell>
                        <TableCell className="text-center py-2"><span className="text-[11px] font-bold text-gray-400">{row.design}</span></TableCell>
                        <TableCell className="text-center py-2"><span className="text-[11px] font-bold text-gray-400">{row.qa}</span></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                  <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-gray-200 text-gray-900 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 w-full md:w-auto">
                    Download Proposal PDF <ExternalLink className="ml-2 size-4" />
                  </Button>
                  <p className="text-[10px] text-gray-400 font-medium">Includes full PRD, wireframes, and strategic roadmap.</p>
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
