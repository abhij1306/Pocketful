import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { MobileErrorWizard } from '@/app/components/MobileErrorWizard';
import { MobileTradingView } from '@/app/components/MobileTradingView';
import { DesktopAlgoInterface } from '@/app/components/DesktopAlgoInterface';
import { DesktopStrategyBuilder } from '@/app/components/DesktopStrategyBuilder';
import {
  Smartphone, Monitor, AlertCircle, TrendingUp, Sparkles,
  FileText, CheckCircle, Map, Clock, ShieldAlert,
  BarChart3, UserCheck, Search, ArrowRight, ExternalLink,
  Target, Globe, Zap, Users, Milestone, Wrench, ClipboardCheck, Code2, Check, ArrowDown
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from '@/app/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table';
import { toast, Toaster } from 'sonner';
import { FLAWS, IMPACT_METRICS, PRD_DATA, UAT_SCENARIOS, COMPETITOR_ANALYSIS, RACI_MATRIX, KYC_JOURNEY } from './data';

type DemoMode = 'landing' | 'mobile-error' | 'desktop-algo';

export default function App() {
  const [demoMode, setDemoMode] = useState<DemoMode>('landing');
  const [showErrorWizard, setShowErrorWizard] = useState(false);
  const [errorType, setErrorType] = useState<'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED'>('DATA_UNAVAILABLE');
  const [showStrategyBuilder, setShowStrategyBuilder] = useState(false);

  const handleMobileErrorDemo = () => {
    setDemoMode('mobile-error');
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600 font-bold"
              onClick={() => {
                setDemoMode('landing');
                setShowErrorWizard(false);
              }}
            >
              ← Back to Portfolio
            </Button>
            <div className="flex items-center gap-2">
              <Smartphone className="size-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Mobile Framework</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white">
            <div className="w-full max-w-[320px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[3rem] border-[12px] border-gray-900 overflow-hidden bg-black aspect-[9/19.5]">
              <MobileTradingView onTriggerError={() => triggerError('DATA_UNAVAILABLE')} />
            </div>
          </div>

          <div className="bg-white border-t border-gray-200 px-6 py-6 shadow-2xl">
            <p className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-[0.2em] text-center">Simulate Recovery Scenarios</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {['DATA_UNAVAILABLE', 'NETWORK_TIMEOUT', 'SERVER_ERROR', 'RATE_LIMITED'].map((type) => (
                <Button key={type} variant="outline" size="sm" className="font-bold border-gray-200 hover:border-blue-500 hover:text-blue-600 text-[10px]" onClick={() => triggerError(type as any)}>
                  {type.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {showErrorWizard && (
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
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600 font-bold"
              onClick={() => {
                setDemoMode('landing');
                setShowStrategyBuilder(false);
              }}
            >
              ← Back to Portfolio
            </Button>
            <div className="flex items-center gap-2">
              <Monitor className="size-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Smart Order Assistant</span>
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
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-gray-900 rounded-md flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-gray-900 tracking-tight">Abhineet Jain</span>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Candidate Submission</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
              <a href="#audit" className="hover:text-gray-900 transition-colors">Audit Analysis</a>
              <a href="#competitors" className="hover:text-gray-900 transition-colors">Strategy</a>
              <a href="#features" className="hover:text-gray-900 transition-colors">Innovation</a>
              <a href="#artifacts" className="hover:text-gray-900 transition-colors">Documentation</a>
              <a href="mailto:abhij1306@gmail.com" className="bg-gray-900 hover:bg-black text-white rounded-lg font-bold px-4 py-2 text-xs transition-all">Hire Me</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 font-bold px-3 py-1 text-xs">
                  Technical Product Challenge
                </Badge>
                <div className="h-px w-12 bg-gray-200"></div>
                <span className="text-xs font-bold text-gray-400">Phase 1 Submission</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-[1.1]">
                Strategic Platform Evolution.
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
                A comprehensive audit and product roadmap designed to restore user trust and democratize institutional-grade trading tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl transition-all shadow-sm" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button size="lg" variant="outline" className="border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold px-8 py-6 rounded-xl transition-all" asChild>
                  <a href="#audit">View Audit Findings</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Audit Section */}
        <section id="audit" className="py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 font-bold mb-4 px-3 py-1 text-xs">Critical Analysis</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Flaw Analysis</h2>
                <p className="text-gray-500 text-lg font-medium max-w-2xl">Systematic review of identified usability gaps following firsthand evaluation.</p>
              </div>
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm font-bold text-gray-700">
                <ShieldAlert className="size-6 text-red-500" />
                <span className="text-sm font-bold text-gray-900">High-Severity Gaps Identified</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FLAWS.map((flaw) => (
                <Card key={String(flaw.id)} className="bg-white rounded-2xl border-gray-100 shadow-sm group hover:shadow-md hover:border-blue-200 transition-all duration-300 p-2">
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
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-12 bg-white border-none shadow-2xl">
                        <DialogHeader>
                          <div className="flex items-center gap-3 mb-6">
                            <Badge className="bg-red-50 text-red-600 border-none font-bold uppercase tracking-widest text-[10px] px-4 py-1">{flaw.severity}</Badge>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase tracking-widest text-[10px] px-4 py-1">{flaw.risk}</Badge>
                          </div>
                          <DialogTitle className="text-4xl font-black text-gray-950 tracking-tighter mb-4">{flaw.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-10 mt-8">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Context</h4>
                              <p className="text-gray-600 font-bold leading-relaxed">{flaw.observed}</p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Impact Analysis</h4>
                              <p className="text-gray-600 font-medium leading-relaxed">{flaw.impact}</p>
                            </div>
                          </div>
                          <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-sm">
                            <h4 className="text-[10px] font-bold text-blue-900 mb-4 uppercase tracking-[0.2em]">Resolution Hypothesis (Root Cause)</h4>
                            <p className="text-blue-800 font-bold leading-relaxed">{flaw.rootCause}</p>
                          </div>
                          {flaw.screenshot && (
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Reference Screenshot</h4>
                              <div className="rounded-[2rem] border-8 border-gray-50 shadow-inner overflow-hidden">
                                <img src={flaw.screenshot} alt={flaw.title} className="w-full h-auto grayscale-50 hover:grayscale-0 transition-all duration-700" />
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
        <section id="competitors" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-20">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 font-bold mb-6 px-4 py-1.5 text-xs">Market Intelligence</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Competitor Strategy Hub</h2>
              <p className="text-gray-500 text-lg max-w-3xl leading-relaxed">
                Positioning Pocketful relative to industry incumbents like Zerodha and Groww, identifying blue-ocean opportunities for retail adoption.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-16">
              {COMPETITOR_ANALYSIS.marketPositioning.map((comp) => (
                <div key={comp.name} className="p-8 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col items-start transition-colors">
                  <div className="flex items-center justify-between w-full mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{comp.name}</h3>
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
            <div className="mt-32 space-y-32">

              {/* Comparison Matrix */}
              <div id="comparison-matrix" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Strategic Comparison Matrix</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
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

              {/* Strategic Blueprints */}
              <div id="strategic-blueprints" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Strategic Blueprints</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="grid gap-8">
                  {COMPETITOR_ANALYSIS.strategicOpportunities.map((op) => (
                    <div key={op.title} className="p-10 rounded-[2rem] border border-gray-100 bg-white flex flex-col md:flex-row gap-10 hover:border-blue-100 transition-colors shadow-sm">
                      <div className="size-16 bg-blue-50/50 rounded-2xl flex items-center justify-center shrink-0">
                        <Zap className="size-8 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-6">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{op.title}</h4>
                          <p className="text-gray-600 font-medium leading-relaxed">{op.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {op.proofPoints.map((p) => (
                            <Badge key={p} variant="outline" className="border-gray-200 text-gray-500 font-bold px-4 py-1.5 text-[10px] uppercase tracking-widest bg-gray-50/50">{p}</Badge>
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
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold mb-4 px-3 py-1 text-xs">Product Innovation</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Innovation Suite</h2>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">Institutional-grade mechanics engineered for the next generation of retail traders.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {PRD_DATA.features.map((feature, idx) => (
                <div key={feature.id} className={`group flex flex-col h-full bg-gray-50 rounded-3xl border border-gray-100 p-8 hover:border-blue-100 transition-colors ${idx === PRD_DATA.features.length - 1 ? 'md:col-span-2' : ''}`}>
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
                      <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md" onClick={handleMobileErrorDemo}>
                        Launch Mobile Demo <ArrowRight className="ml-2 size-4" />
                      </Button>
                    ) : feature.id === 'SOA' ? (
                      <Button size="lg" className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md" onClick={handleDesktopAlgoDemo}>
                        Open Order Assistant <Monitor className="ml-2 size-4" />
                      </Button>
                    ) : (
                      <Button size="lg" variant="outline" className="w-full py-6 text-base border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
                        View Specs in PRD <ArrowDown className="ml-2 size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artifact Hub Section - FULL PREMIUM LIGHT */}
        <section id="artifacts" className="py-24 bg-white border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none font-bold mb-4 px-3 py-1 uppercase tracking-widest text-[9px]">Submission Package</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Strategic Documentation Hub</h2>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                Comprehensive repository spanning Product Requirements, UAT protocols, and execution timelines.
              </p>
            </div>

            <div className="mt-24 space-y-32">

              {/* 1. PRD Specs */}
              <div id="specs" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Innovation PRD Repository</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                  <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 mb-12">
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
                        <div className="space-y-12">
                          <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                              <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-50">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Problem Scope</h4>
                                <p className="font-medium text-gray-700 leading-relaxed">{f.problem}</p>
                              </div>
                              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">API Protocol</h4>
                                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 font-mono text-[10px] font-bold">v2.1</Badge>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                  <code className="block font-mono text-xs text-blue-600 font-bold">{f.techSpecs.api}</code>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-8">
                              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-lg bg-white">
                                <Table>
                                  <TableHeader className="bg-gray-50/50">
                                    <TableRow>
                                      <TableHead className="font-bold text-gray-900 text-xs uppercase pl-6 py-4">Metric</TableHead>
                                      <TableHead className="text-right font-bold text-blue-600 text-xs uppercase pr-6 py-4">Target (M6)</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {f.successMetrics.map((m, i) => (
                                      <TableRow key={i} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-gray-700 text-sm pl-6 py-4">{m.metric}</TableCell>
                                        <TableCell className="text-right font-bold text-blue-600 text-sm pr-6 py-4">{m.targetM6}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
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
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
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

              {/* 3. Execution Roadmap */}
              <div id="roadmap" className="scroll-mt-32 mb-20">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-900">Execution Roadmap</h3>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {(['now', 'next', 'later'] as const).map((phase, i) => (
                    <div key={phase} className="space-y-6">
                      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <div className={`size-3 rounded-full ${i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-purple-600' : 'bg-green-600'}`}></div>
                        <h4 className="font-bold text-lg capitalize text-gray-900">{phase}</h4>
                      </div>
                      <div className="space-y-4">
                        {PRD_DATA.roadmap[phase].map((item, j) => (
                          <div key={j} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm font-medium text-gray-700 text-sm">
                            {item.item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Operational Frameworks */}
              <div id="ops" className="grid md:grid-cols-2 gap-8">
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
        <footer className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 font-bold text-sm">A</div>
                  <span className="text-sm font-bold text-gray-900">Abhineet Jain</span>
                </div>
                <p className="text-gray-500 font-medium text-base max-w-sm">
                  Submitted as part of the Phase 1 Technical Product Management evaluation process.
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
              <span>Optimized for High-Fidelity Review</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
