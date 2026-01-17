import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { MobileErrorWizard } from '@/app/components/MobileErrorWizard';
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
  Target, Globe, Zap, Users, Milestone, Wrench, ClipboardCheck, Code2, Check, ArrowDown, Info, Wifi, WifiOff, Database, Menu, X
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from '@/app/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table';
import { toast, Toaster } from 'sonner';
import { FLAWS, IMPACT_METRICS, PRD_DATA, UAT_SCENARIOS, COMPETITOR_ANALYSIS, RACI_MATRIX, KYC_JOURNEY, ROADMAP_TABLE, USER_FLOW } from './data';

type DemoMode = 'landing' | 'mobile-error' | 'desktop-algo';

export default function App() {
  const [demoMode, setDemoMode] = useState<DemoMode>('landing');
  const [showErrorWizard, setShowErrorWizard] = useState(false);
  const [errorType, setErrorType] = useState<'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED'>('DATA_UNAVAILABLE');
  const [showStrategyBuilder, setShowStrategyBuilder] = useState(false);
  const [showTSEModal, setShowTSEModal] = useState(false);
  const [showROMModal, setShowROMModal] = useState(false);
  const [showCASHModal, setShowCASHModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileErrorDemo = () => {
    setDemoMode('mobile-error');
    setErrorType('DATA_UNAVAILABLE');
    setShowErrorWizard(true);
    window.scrollTo(0, 0);
  };

  const handleDesktopAlgoDemo = () => {
    setDemoMode('desktop-algo');
    window.scrollTo(0, 0);
  };

  const triggerError = (type: typeof errorType) => {
    setErrorType(type);
    setShowErrorWizard(true);
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
                setShowErrorWizard(false);
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
                    activeError={showErrorWizard ? errorType : null}
                    onRecover={() => {
                      setShowErrorWizard(false);
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
                  <p className="text-xs text-gray-500 leading-tight">Simulates complete connectivity loss. Triggers full-screen blocking wizard.</p>
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

        {/* Wizard Overlay - Only for Non-Inline Errors */}
        {showErrorWizard && errorType !== 'DATA_UNAVAILABLE' && (
          <MobileErrorWizard
            errorType={errorType}
            onClose={() => setShowErrorWizard(false)}
            onRecover={() => {
              setShowErrorWizard(false);
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
      <div className="min-h-screen bg-white font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="size-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-gray-900 tracking-tight">Abhineet Jain</span>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden sm:block">Candidate Submission</span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
              <a href="#audit" className="hover:text-gray-900 transition-colors">Audit Analysis</a>
              <a href="#competitors" className="hover:text-gray-900 transition-colors">Strategy</a>
              <a href="#features" className="hover:text-gray-900 transition-colors">Innovation</a>
              <a href="#artifacts" className="hover:text-gray-900 transition-colors">Documentation</a>
              <a href="#footer" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold px-4 py-2 text-xs transition-all">Connect</a>
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
                <a href="#audit" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Audit Analysis</a>
                <a href="#competitors" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Strategy</a>
                <a href="#features" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Innovation</a>
                <a href="#artifacts" className="text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Documentation</a>
                <a href="#footer" className="text-blue-600 font-bold py-3 px-4 rounded-lg bg-blue-50 mt-2" onClick={() => setIsMobileMenuOpen(false)}>Connect →</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 font-bold px-3 py-1 text-xs">
                  Product Management Task
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-[1.1] tracking-tight">
                Strategic Platform Evolution.
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
                A comprehensive audit and product roadmap designed to restore user trust and democratize institutional-grade trading tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl transition-all shadow-lg hover:shadow-xl w-full sm:w-auto" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button size="lg" variant="outline" className="border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold px-8 py-6 rounded-xl transition-all shadow-sm hover:shadow-md w-full sm:w-auto" asChild>
                  <a href="#audit">View Audit Findings</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Audit Section */}
        <section id="audit" className="py-20 md:py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
              <div>
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 font-bold mb-4 px-3 py-1 text-xs">Critical Analysis</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Flaw Analysis</h2>
                <p className="text-gray-500 text-lg font-medium max-w-2xl">Systematic review of identified usability gaps following firsthand evaluation.</p>
              </div>
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm font-bold text-gray-700 w-fit">
                <ShieldAlert className="size-6 text-red-500" />
                <span className="text-sm font-bold text-gray-900">High-Severity Gaps Identified</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FLAWS.map((flaw) => (
                <Card key={String(flaw.id)} className="bg-white rounded-2xl border-gray-100 shadow-md group hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 p-2">
                  <CardHeader className="pb-3 pt-6 px-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className={`font-bold px-3 py-1 text-[10px] ${flaw.severity === 'High' ? 'text-red-600 border-red-100 bg-red-50' : 'text-amber-600 border-amber-100 bg-amber-50'}`}>
                        {flaw.severity}
                      </Badge>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{flaw.risk}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {flaw.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="text-gray-500 font-medium mb-6 line-clamp-2 text-sm leading-relaxed">{flaw.observed}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between items-center px-4 py-2 h-auto rounded-xl bg-gray-50 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs text-gray-700 group/btn border border-gray-100 hover:border-blue-600">
                          View Analysis <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[calc(100%-2rem)] md:max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white border-none shadow-2xl rounded-2xl md:rounded-3xl">
                        <DialogHeader className="px-6 md:px-10 pt-10 pb-2 text-left bg-white">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-red-50 text-red-600 border-none font-bold uppercase tracking-widest text-[10px] px-3 py-1">{flaw.severity}</Badge>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase tracking-widest text-[10px] px-3 py-1">{flaw.risk}</Badge>
                          </div>
                          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">{flaw.title}</DialogTitle>
                        </DialogHeader>

                        <div className="p-6 md:p-10 pt-6 space-y-8">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Context</h4>
                              <p className="text-gray-700 font-medium leading-relaxed">{flaw.observed}</p>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Impact Analysis</h4>
                              <p className="text-gray-600 font-medium leading-relaxed">{flaw.impact}</p>
                            </div>
                          </div>

                          <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm">
                            <h4 className="text-[10px] font-bold text-blue-900 mb-3 uppercase tracking-[0.2em]">Resolution Hypothesis (Root Cause)</h4>
                            <p className="text-blue-800 font-bold leading-relaxed">{flaw.rootCause}</p>
                          </div>

                          {flaw.screenshot && (
                            <div className="space-y-4 pt-2">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Evidence Capture</h4>
                              <div className="rounded-2xl border-4 border-gray-100 shadow-lg overflow-hidden bg-gray-50">
                                <img src={flaw.screenshot} alt={flaw.title} className="w-full h-auto" />
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Competitor Analysis Section - PREMIUM LIGHT THEME */}
        <section id="competitors" className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16 md:mb-20">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 font-bold mb-6 px-4 py-1.5 text-xs">Market Intelligence</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Competitor Strategy Hub</h2>
              <p className="text-gray-500 text-lg max-w-3xl leading-relaxed">
                Positioning Pocketful relative to industry incumbents like Zerodha and Groww, identifying blue-ocean opportunities for retail adoption.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {COMPETITOR_ANALYSIS.marketPositioning.map((comp) => (
                <div key={comp.name} className="p-8 rounded-xl border border-gray-100 bg-white shadow-md flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 group">
                  <div className="flex items-center justify-between w-full mb-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{comp.name}</h3>
                    <Badge variant="secondary" className="bg-gray-50 text-gray-600 font-bold text-xs px-2">{comp.share}</Badge>
                  </div>
                  <div className="space-y-4 flex-1 text-sm">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gray-400">Strength Pillar</span>
                      <p className="font-medium text-gray-800 leading-relaxed">{comp.strength}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-red-400">Structural Weakness</span>
                      <p className="font-medium text-gray-600 leading-relaxed">{comp.weakness}</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-50 w-full">
                    <span className="text-xs font-bold text-gray-400 mb-1 block">Primary Target Persona</span>
                    <p className="text-base font-bold text-blue-600">{comp.persona}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Deep Dive - Inline */}
            <div className="mt-20 md:mt-32 space-y-20 md:space-y-32">

              {/* Comparison Matrix */}
              <div id="comparison-matrix" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Strategic Comparison Matrix</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                  <div className="min-w-[800px]">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent border-gray-100">
                          <TableHead className="w-[300px] py-6 pl-8 font-bold text-gray-900 text-sm uppercase tracking-wide">Strategy Vector</TableHead>
                          <TableHead className="text-center font-bold text-gray-500 text-xs uppercase tracking-widest">Zerodha</TableHead>
                          <TableHead className="text-center font-bold text-gray-500 text-xs uppercase tracking-widest">Groww</TableHead>
                          <TableHead className="text-center font-bold text-blue-700 text-xs uppercase tracking-widest bg-blue-50/50">Pocketful</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {COMPETITOR_ANALYSIS.gapAnalysis.map((gap) => (
                          <TableRow key={gap.category} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                            <TableCell className="py-6 pl-8">
                              <div className="font-bold text-gray-900 text-base mb-1">{gap.category}</div>
                              <div className="text-xs text-gray-500 font-medium">{gap.impact}</div>
                            </TableCell>
                            <TableCell className="text-center font-medium text-gray-400 text-lg">{gap.zerodha}/5</TableCell>
                            <TableCell className="text-center font-medium text-gray-400 text-lg">{gap.groww}/5</TableCell>
                            <TableCell className="text-center font-bold text-blue-600 text-lg bg-blue-50/30">{gap.pocketful}/5</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* Strategic Blueprints */}
              <div id="strategic-blueprints" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Strategic Blueprints</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="grid gap-6 md:gap-8">
                  {COMPETITOR_ANALYSIS.strategicOpportunities.map((op) => (
                    <div key={op.title} className="p-6 rounded-[2rem] border border-gray-100 bg-white flex flex-col md:flex-row gap-5 hover:border-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-md group">
                      <div className="size-12 bg-blue-50/50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Zap className="size-6 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{op.title}</h4>
                          <p className="text-gray-600 font-medium leading-relaxed">{op.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {op.proofPoints.map((p) => (
                            <Badge key={p} variant="outline" className="border-gray-200 text-gray-500 font-bold px-3 py-1 text-[10px] uppercase tracking-widest bg-gray-50/50">{p}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold mb-4 px-3 py-1 text-xs">Product Innovation</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Innovation Suite</h2>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">Institutional-grade mechanics engineered for the next generation of retail traders.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {PRD_DATA.features.map((feature, idx) => (
                <div key={feature.id} className={`group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-md p-8 hover:border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${idx === PRD_DATA.features.length - 1 ? 'md:col-span-2' : ''}`}>
                  <div className="mb-8">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-white rounded-md text-xs font-bold border border-gray-200 text-blue-600 shadow-sm">{feature.title}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{feature.valueProp}</p>
                  </div>

                  <div className="space-y-6 mt-auto">
                    <div className="grid gap-4">
                      {feature.successMetrics.slice(0, 3).map((metric, i) => (
                        <div key={i} className="flex items-start gap-4 text-gray-700">
                          <div className="size-6 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                            <CheckCircle className="size-3.5 text-green-600" />
                          </div>
                          <span className="font-bold text-gray-900 text-sm leading-tight">{metric.metric}: {metric.targetM6}</span>
                        </div>
                      ))}
                    </div>
                    {feature.id === 'ERW' ? (
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
              ))}
            </div>
          </div>
        </section>

        {/* Artifact Hub Section - FULL PREMIUM LIGHT */}
        <section id="artifacts" className="py-16 md:py-24 bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-10 md:mb-16">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none font-bold mb-4 px-3 py-1 uppercase tracking-widest text-[9px]">Submission Package</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Strategic Documentation Hub</h2>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                Comprehensive repository spanning Product Requirements, UAT protocols, and execution timelines.
              </p>
            </div>

            <div className="mt-16 md:mt-24 space-y-20 md:space-y-32">

              {/* 1. PRD Specs */}
              <div id="specs" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Innovation PRD Repository</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-4 md:p-8 shadow-sm">
                  <div className="p-4 md:p-8 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 mb-6 md:mb-12">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Strategic Narrative</span>
                    <p className="text-gray-900 font-medium text-lg leading-relaxed">{PRD_DATA.executionSummary}</p>
                  </div>

                  <Tabs defaultValue="ERW" className="w-full">
                    <div className="overflow-x-auto pb-4 mb-8">
                      <TabsList className="bg-gray-50 p-1 rounded-xl h-auto w-full flex min-w-max">
                        {PRD_DATA.features.map(f => (
                          <TabsTrigger key={f.id} value={f.id} className="rounded-lg flex-1 min-w-[140px] data-[state=active]:bg-white data-[state=active]:shadow-sm py-3 px-4 font-bold text-xs">{f.title}</TabsTrigger>
                        ))}
                        <TabsTrigger value="RISKS" className="rounded-lg flex-1 min-w-[140px] data-[state=active]:bg-white data-[state=active]:shadow-sm py-3 px-4 font-bold text-xs">Risk Registry</TabsTrigger>
                      </TabsList>
                    </div>

                    {PRD_DATA.features.map(f => (
                      <TabsContent key={f.id} value={f.id} className="animate-in fade-in duration-300">
                        <div className="space-y-6 md:space-y-12">
                          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
                            <div className="space-y-4 md:space-y-8 overflow-hidden">
                              <div className="bg-gray-50/50 rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-50">
                                <h4 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 md:mb-4">Problem Scope</h4>
                                <p className="font-medium text-gray-700 leading-relaxed text-sm md:text-base break-words">{f.problem}</p>
                              </div>
                              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-100 shadow-lg md:shadow-xl overflow-hidden">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                  <h4 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-widest">API Protocol</h4>
                                </div>
                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 overflow-x-auto -mx-1 px-1">
                                  <code className="block font-mono text-[10px] md:text-xs text-blue-600 font-bold">{f.techSpecs.api}</code>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4 md:space-y-8 overflow-hidden">
                              <div className="border border-gray-100 rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg bg-white">
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader className="bg-gray-50/50">
                                      <TableRow>
                                        <TableHead className="font-bold text-gray-900 text-[10px] md:text-xs uppercase pl-4 md:pl-6 py-3 md:py-4">Metric</TableHead>
                                        <TableHead className="text-right font-bold text-blue-600 text-[10px] md:text-xs uppercase pr-4 md:pr-6 py-3 md:py-4">Target (M6)</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {f.successMetrics.map((m, i) => (
                                        <TableRow key={i} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                                          <TableCell className="font-medium text-gray-700 text-xs md:text-sm pl-4 md:pl-6 py-3 md:py-4">{m.metric}</TableCell>
                                          <TableCell className="text-right font-bold text-blue-600 text-xs md:text-sm pr-4 md:pr-6 py-3 md:py-4">{m.targetM6}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">User Stories (Priority P0-P1)</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {f.userStories?.map((story, i) => (
                                <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                                  <Badge variant="outline" className={`shrink-0 font-bold mt-0.5 ${story.priority === 'P0' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                    {story.priority}
                                  </Badge>
                                  <div>
                                    <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{story.id}</div>
                                    <p className="text-sm font-medium text-gray-900 leading-snug">{story.story}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                    <TabsContent value="RISKS">
                      <div className="grid gap-6">
                        {[
                          { risk: "Regulatory Uncertainty", impact: "High", mitigation: "Design conditional orders within SEBI guidelines; exclude algorithmic automation" },
                          { risk: "User Confusion", impact: "Medium", mitigation: "Template-first onboarding; in-app tutorials for complex flows" },
                          { risk: "Error Wizard Overload", impact: "Low", mitigation: "Consolidated error view for cascading failures; auto-escalation" }
                        ].map((r, i) => (
                          <div key={i} className="p-6 rounded-2xl border border-red-50 bg-white shadow-md flex justify-between gap-8 hover:shadow-lg transition-all">
                            <div>
                              <div className="font-bold text-gray-900 text-lg mb-2">{r.risk}</div>
                              <p className="text-gray-600 font-medium">{r.mitigation}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Impact</div>
                              <div className="text-xl font-bold text-red-600">{r.impact}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* 2. UAT Scenarios */}
              <div id="uat" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Validation Protocols</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm overflow-x-auto">
                  <div className="min-w-[700px]">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow>
                          <TableHead className="w-[100px] pl-6 font-bold text-gray-900 text-xs uppercase tracking-wide py-4">ID</TableHead>
                          <TableHead className="font-bold text-gray-900 text-xs uppercase tracking-wide py-4">Scenario (UAT)</TableHead>
                          <TableHead className="font-bold text-gray-900 text-xs uppercase tracking-wide py-4">Expected Protocol</TableHead>
                          <TableHead className="text-right pr-6 font-bold text-gray-900 text-xs uppercase tracking-wide py-4">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {UAT_SCENARIOS.map((uat: any) => (
                          <TableRow key={uat.id} className="hover:bg-gray-50/50 transition-colors border-gray-50">
                            <TableCell className="pl-6 py-4 font-mono text-xs font-bold text-purple-600">{uat.id}</TableCell>
                            <TableCell className="py-4 font-medium text-gray-900 text-sm">{uat.scenario}</TableCell>
                            <TableCell className="py-4 text-gray-500 text-sm italic">"{uat.expected}"</TableCell>
                            <TableCell className="pr-6 py-4 text-right">
                              <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 font-bold text-[10px] uppercase tracking-widest px-2 py-0.5">Verified</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 2.5 User Flow Diagram */}
              <div id="userflow" className="scroll-mt-32 mt-20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">User Flow: Error Recovery Wizard</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-8 overflow-hidden">
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
                                <span className="text-[10px] text-yellow-700">Countdown Wizard</span>
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

              {/* 3. Execution Roadmap */}
              <div id="roadmap" className="scroll-mt-32 mb-20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Execution Roadmap</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/80">
                        <TableRow>
                          <TableHead className="text-[10px] md:text-xs font-bold uppercase text-gray-900 pl-4 md:pl-6 py-3 md:py-4 w-[100px]">Phase</TableHead>
                          <TableHead className="text-[10px] md:text-xs font-bold uppercase text-gray-900 py-3 md:py-4">Feature</TableHead>
                          <TableHead className="text-[10px] md:text-xs font-bold uppercase text-gray-500 py-3 md:py-4 hidden md:table-cell">Why Now/Next/Later</TableHead>
                          <TableHead className="text-[10px] md:text-xs font-bold uppercase text-gray-500 py-3 md:py-4 hidden lg:table-cell">Key Metric</TableHead>
                          <TableHead className="text-[10px] md:text-xs font-bold uppercase text-gray-500 py-3 md:py-4 text-center w-[60px]">Effort</TableHead>
                          <TableHead className="text-[10px] md:text-xs font-bold uppercase text-gray-500 pr-4 md:pr-6 py-3 md:py-4 hidden lg:table-cell">Dependencies</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ROADMAP_TABLE.map((row, i) => (
                          <TableRow key={i} className="hover:bg-gray-50/50 transition-colors border-gray-50">
                            <TableCell className="pl-4 md:pl-6 py-3 md:py-4">
                              <Badge className={`text-[10px] font-bold px-2 py-0.5 ${row.phase === 'NOW' ? 'bg-blue-600 text-white' :
                                row.phase === 'NEXT' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                  'bg-green-100 text-green-700 border border-green-200'
                                }`}>
                                {row.phase} <span className="hidden sm:inline opacity-70">({row.phaseLabel})</span>
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-gray-900 text-xs md:text-sm py-3 md:py-4">{row.feature}</TableCell>
                            <TableCell className="text-gray-600 text-xs py-3 md:py-4 hidden md:table-cell max-w-[200px]">{row.why}</TableCell>
                            <TableCell className="text-gray-600 text-xs py-3 md:py-4 hidden lg:table-cell">{row.metric}</TableCell>
                            <TableCell className="text-center py-3 md:py-4">
                              <Badge variant="outline" className={`text-[10px] font-bold ${row.effort === 'S' ? 'bg-green-50 text-green-700 border-green-200' :
                                row.effort === 'M' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                  'bg-orange-50 text-orange-700 border-orange-200'
                                }`}>{row.effort}</Badge>
                            </TableCell>
                            <TableCell className="text-gray-500 text-xs pr-4 md:pr-6 py-3 md:py-4 hidden lg:table-cell">{row.dependencies}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* 4. Operational Frameworks */}
              <div id="ops" className="grid gap-8 md:grid-cols-2">
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-6">RACI Matrix</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs font-bold uppercase w-[40%]">Deliverable</TableHead>
                        <TableHead className="text-xs font-bold uppercase text-center text-blue-600">PM</TableHead>
                        <TableHead className="text-xs font-bold uppercase text-center text-gray-500">Eng</TableHead>
                        <TableHead className="text-xs font-bold uppercase text-center text-gray-500">Des</TableHead>
                        <TableHead className="text-xs font-bold uppercase text-center text-gray-500">QA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {RACI_MATRIX.map((row: any, i: number) => (
                        <TableRow key={i} className="hover:bg-gray-50/50">
                          <TableCell className="text-xs font-medium text-gray-900 py-3">{row.deliverable}</TableCell>
                          <TableCell className="text-center py-3"><Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2">{row.pm}</Badge></TableCell>
                          <TableCell className="text-center py-3"><span className="text-xs font-bold text-gray-500">{row.eng}</span></TableCell>
                          <TableCell className="text-center py-3"><span className="text-xs font-bold text-gray-400">{row.design}</span></TableCell>
                          <TableCell className="text-center py-3"><span className="text-xs font-bold text-gray-400">{row.qa}</span></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="bg-green-50/30 rounded-2xl border border-green-100 p-8">
                  <h4 className="font-bold text-green-800 mb-6">Definition of Done</h4>
                  <ul className="space-y-3">
                    {[
                      "All acceptance criteria from user stories are met",
                      "Code reviewed and merged to main branch",
                      "Unit test coverage meets threshold",
                      "E2E tests passing in staging environment",
                      "Design QA approved by Design Lead"
                    ].map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium text-green-700">
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

        {/* Footer */}
        {/* Footer */}
        <footer id="footer" className="py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 font-bold text-sm">A</div>
                  <span className="text-sm font-bold text-gray-900">Abhineet Jain</span>
                </div>
                <p className="text-gray-500 font-medium text-base max-w-sm">
                  Submitted as part of the Product Management evaluation process.
                </p>
                <div className="flex gap-6 text-xs font-bold text-gray-900">
                  <a href="https://www.linkedin.com/in/abhineet-jain/" target="_blank" className="hover:text-blue-600 transition-colors">LinkedIn</a>
                  <a href="https://github.com/abhij1306" target="_blank" className="hover:text-blue-600 transition-colors">GitHub</a>
                  <a href="mailto:abhij1306@gmail.com" className="hover:text-blue-600 transition-colors">Email</a>
                </div>
              </div>

              <div className="md:text-right space-y-6">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-gray-900">Let's build the future.</h4>
                  <div className="flex flex-col md:items-end gap-1">
                    <a href="mailto:abhij1306@gmail.com" className="block text-gray-500 font-medium hover:text-blue-600 transition-colors">abhij1306@gmail.com</a>
                    <a href="tel:+918999635679" className="block text-gray-500 font-medium hover:text-blue-600 transition-colors">+91 89996 35679</a>
                  </div>
                </div>
                <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-gray-200 text-gray-900 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300">
                  Download Proposal <ExternalLink className="ml-2 size-4" />
                </Button>
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
