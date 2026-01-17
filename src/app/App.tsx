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
  Target, Globe, Zap, Users, Milestone, Wrench, ClipboardCheck, Code2
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from '@/app/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/app/components/ui/table';
import { toast, Toaster } from 'sonner';
import { FLAWS, IMPACT_METRICS, PRD_DATA, UAT_SCENARIOS, COMPETITOR_ANALYSIS, RACI_MATRIX, PM_TOOLING, DEFINITION_OF_DONE, RISK_MITIGATION } from './data';

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
              <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Algorithm Interface</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <DesktopAlgoInterface onNewStrategy={() => setShowStrategyBuilder(true)} />
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
              <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black tracking-tight">
                P
              </div>
              <span className="text-lg font-black text-gray-950 tracking-tighter uppercase italic">Pocketful</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              <a href="#audit" className="hover:text-blue-600 transition-colors">Audit</a>
              <a href="#competitors" className="hover:text-blue-600 transition-colors">Competitor Analysis</a>
              <a href="#features" className="hover:text-blue-600 transition-colors">Innovation</a>
              <a href="#artifacts" className="hover:text-blue-600 transition-colors">Artifacts</a>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold px-6 text-[10px] tracking-widest uppercase">Contact</Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-20 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 w-full h-[800px] bg-gradient-to-br from-blue-50/40 via-white to-white"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 font-bold px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase">
                  TPM Portfolio Proposal
                </Badge>
                <div className="h-px w-12 bg-gray-200"></div>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Abhineet Jain</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-950 tracking-tight mb-8 leading-[1.1]">
                High-Impact Trading <br />
                <span className="text-blue-600">Infrastructure.</span>
              </h1>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl font-medium">
                An institutional-grade evolution focusing on trust-engineering and democratizing Algorithmic Trading for retail investors.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-8 text-lg rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-100 hover:bg-gray-50 text-gray-900 font-bold px-10 py-8 text-lg rounded-2xl transition-all" asChild>
                  <a href="#audit">View Audit Findings</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-4">
              {IMPACT_METRICS.map((metric, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-blue-100 transition-colors">
                  <div className={`text-4xl font-bold mb-3 tracking-tight ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="font-bold text-gray-950 uppercase tracking-widest text-[10px] mb-2">{metric.label}</div>
                  <div className="text-sm font-medium text-gray-400">{metric.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Audit Section */}
        <section id="audit" className="py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <Badge className="bg-red-50 text-red-600 border-none font-bold mb-4 px-4 py-1 uppercase tracking-widest text-[10px]">Critical Analysis</Badge>
                <h2 className="text-3xl font-bold text-gray-950 tracking-tight mb-4">Technical Flaw Analysis</h2>
                <p className="text-gray-500 text-lg font-medium max-w-2xl">Systematic review of identified usability gaps following firsthand evaluation.</p>
              </div>
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm font-bold text-gray-700">
                <ShieldAlert className="size-6 text-red-500" />
                <span className="text-sm tracking-tight font-black uppercase text-gray-900">High-Severity Gaps Identified</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FLAWS.map((flaw) => (
                <Card key={String(flaw.id)} className="bg-white rounded-[2.5rem] border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] group hover:shadow-2xl hover:border-blue-200 transition-all duration-500 cursor-default p-4">
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className="flex justify-between items-start mb-6">
                      <Badge variant="outline" className={`font-bold uppercase tracking-widest text-[9px] px-3 py-1 ${flaw.severity === 'High' ? 'text-red-600 border-red-100' : 'text-amber-600 border-amber-100'}`}>
                        {flaw.severity}
                      </Badge>
                      <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{flaw.risk}</span>
                    </div>
                    <CardTitle className="text-2xl font-black text-gray-950 leading-tight group-hover:text-blue-600 transition-colors">
                      {flaw.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="text-gray-500 font-medium mb-8 line-clamp-2 text-sm leading-relaxed">{flaw.observed}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between items-center px-6 py-7 rounded-2xl bg-gray-50 hover:bg-blue-600 hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest group/btn border border-gray-100 hover:border-blue-600">
                          Deep Dive Report <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
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
              <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold mb-6 px-4 py-1.5 uppercase tracking-widest text-[10px]">Market Intelligence</Badge>
              <h2 className="text-4xl font-bold text-gray-950 tracking-tight mb-6">Competitor Strategy Hub</h2>
              <p className="text-gray-500 text-lg font-medium max-w-3xl leading-relaxed">
                Positioning Pocketful relative to industry incumbents like Zerodha and Groww, identifying blue-ocean opportunities for retail adoption.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {COMPETITOR_ANALYSIS.marketPositioning.map((comp) => (
                <div key={comp.name} className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col items-start hover:border-blue-100 transition-all group hover:-translate-y-1">
                  <div className="flex items-center justify-between w-full mb-8">
                    <h3 className="text-2xl font-bold text-gray-950 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{comp.name}</h3>
                    <Badge className="bg-gray-100 text-gray-500 font-bold text-[9px] px-2">{comp.share}</Badge>
                  </div>
                  <div className="space-y-6 flex-1 text-sm">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Strength Pillar</span>
                      <p className="font-medium text-gray-900 leading-relaxed">{comp.strength}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-red-500/70 uppercase tracking-widest">Structural Weakness</span>
                      <p className="font-medium text-gray-500 leading-relaxed">{comp.weakness}</p>
                    </div>
                  </div>
                  <div className="mt-12 pt-8 border-t border-gray-50 w-full">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Primary Target Persona</span>
                    <p className="text-base font-black text-blue-600 tracking-tight">{comp.persona}</p>
                  </div>
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-blue-600 p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between cursor-pointer hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 group">
                  <div className="space-y-4 mb-10 md:mb-0 text-white">
                    <Badge className="bg-white/20 text-white border-none font-bold">Deep Strategy</Badge>
                    <h4 className="text-5xl font-black tracking-tighter leading-none">Full Strategic Gap Analysis</h4>
                    <p className="text-blue-100 font-medium text-xl max-w-md tracking-tight">How Pocketful wins through 'Reliable Innovation' and institutional credibility.</p>
                  </div>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-black px-12 py-10 rounded-[2.5rem] text-xl transition-transform group-hover:scale-110">
                    Explore Roadmap <Target className="ml-3 size-7" />
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 bg-white border-none shadow-2xl font-sans">
                <DialogHeader className="mb-16">
                  <DialogTitle className="text-6xl font-black tracking-tighter text-gray-950">The Strategic Opportunity</DialogTitle>
                </DialogHeader>

                <div className="space-y-24">
                  {/* Gap Chart */}
                  <div className="space-y-12">
                    <div className="flex items-center gap-4 mb-12">
                      <div className="h-px flex-1 bg-gray-100"></div>
                      <h4 className="flex-none text-[11px] font-bold text-gray-400 uppercase tracking-widest">Comparison Matrix</h4>
                      <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                      {COMPETITOR_ANALYSIS.gapAnalysis.map((gap) => (
                        <div key={gap.category} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-lg transition-all">
                          <h5 className="font-bold text-lg mb-6 tracking-tight text-gray-950">{gap.category}</h5>
                          <div className="space-y-10 mb-12">
                            <div className="space-y-3">
                              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-1">
                                <span>Zerodha</span>
                                <span className="text-blue-600">{gap.zerodha}/5</span>
                              </div>
                              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(gap.zerodha / 5) * 100}%` }}></div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-1">
                                <span>Groww</span>
                                <span className="text-green-600">{gap.groww}/5</span>
                              </div>
                              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-600 rounded-full" style={{ width: `${(gap.groww / 5) * 100}%` }}></div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                                <span>Pocketful</span>
                                <span className="text-red-500">{gap.pocketful}/5</span>
                              </div>
                              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: `${(gap.pocketful / 5) * 100}%` }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <p className="text-xs font-bold text-gray-500 leading-relaxed italic">{gap.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Ops */}
                  <div className="space-y-12">
                    <div className="flex items-center gap-4">
                      <div className="h-0.5 flex-1 bg-gray-100"></div>
                      <h4 className="flex-none text-[12px] font-bold text-gray-400 uppercase tracking-[0.4em]">Strategic Blueprints</h4>
                      <div className="h-0.5 flex-1 bg-gray-100"></div>
                    </div>
                    <div className="grid gap-8">
                      {COMPETITOR_ANALYSIS.strategicOpportunities.map((op) => (
                        <Card key={op.title} className="p-10 rounded-[3rem] border-2 border-indigo-50 bg-white hover:border-indigo-200 transition-all group overflow-hidden relative shadow-sm">
                          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-150 transition-transform">
                            <Sparkles className="size-32 text-indigo-600" />
                          </div>
                          <div className="flex flex-col lg:flex-row lg:items-center gap-10 relative z-10">
                            <div className="bg-indigo-600 size-20 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/30">
                              <Zap className="size-10 text-white fill-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-3xl font-black tracking-tighter mb-4 text-gray-950">{op.title}</h5>
                              <p className="text-gray-500 font-bold text-lg mb-8 leading-relaxed max-w-2xl">{op.description}</p>
                              <div className="flex flex-wrap gap-4">
                                {op.proofPoints.map((p) => (
                                  <Badge key={p} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none font-black uppercase tracking-widest text-[10px] px-5 py-2 rounded-full">{p}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <Badge className="bg-green-50 text-green-700 border-none font-bold mb-6 px-4 py-1.5 uppercase tracking-widest text-[10px]">Product Innovation</Badge>
              <h2 className="text-4xl font-bold text-gray-950 tracking-tight mb-6 leading-none">The Innovation Suite</h2>
              <p className="text-gray-500 text-lg font-medium max-w-3xl mx-auto tracking-tight leading-relaxed">Institutional-grade mechanics engineered for the next generation of retail traders.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-20">
              {/* ERW Feature */}
              <div className="group space-y-12">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-950 shadow-xl transition-all duration-700 group-hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-90"></div>
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors"></div>
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[9px] font-bold uppercase tracking-widest mb-6 border border-white/20">Client Resilience Engine</span>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight leading-none">Error Recovery Wizard</h3>
                    <p className="text-white/70 text-base font-medium leading-relaxed">Converting opaque system failures into high-confidence, action-oriented loops.</p>
                  </div>
                </div>
                <div className="space-y-10 px-6">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-red-600 font-bold px-5 py-1.5 uppercase tracking-widest text-[10px] border-none">Priority 0</Badge>
                    <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Addresses Trust Reservoir Breakdown</span>
                  </div>
                  <div className="grid gap-6">
                    {[
                      "Intelligent failure-state nomenclature translation",
                      "Intent-aware alternative execution pathways",
                      "Client-side diagnostic health telemetry"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-5 text-gray-700">
                        <div className="size-8 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle className="size-5 text-green-600" />
                        </div>
                        <span className="font-bold text-gray-950 text-lg leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="w-full py-10 text-xl bg-gray-950 hover:bg-blue-600 text-white font-black rounded-[2.5rem] transition-all group/btn shadow-2xl shadow-gray-400/20" onClick={handleMobileErrorDemo}>
                    Launch Mobile Demo <ArrowRight className="ml-4 size-6 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* ASE Feature */}
              <div className="group space-y-12">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-gray-100 shadow-xl transition-all duration-700 group-hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 via-white to-white opacity-40"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <div className="bg-indigo-600 size-20 rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-105 transition-transform">
                      <Zap className="size-10 text-white fill-white" />
                    </div>
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold uppercase tracking-widest mb-6 border border-indigo-100">Alpha Prototype</span>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight leading-none text-gray-950">Algo Strategy Engine</h3>
                    <p className="text-gray-500 text-base font-medium leading-relaxed">The visual strategy builder for the non-coding systematic trader.</p>
                  </div>
                </div>
                <div className="space-y-10 px-6">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-indigo-600 font-bold px-5 py-1.5 uppercase tracking-widest text-[10px] border-none">Priority 0</Badge>
                    <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Revenue Moat & High-Value Stickiness</span>
                  </div>
                  <div className="grid gap-6">
                    {[
                      "Zero-code visual IF-THEN schema builder",
                      "1-Year high-fidelity historical backtesting infra",
                      "Mandatory Risk Guardian automated stop-guards"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-5 text-gray-700">
                        <div className="size-8 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                          <Target className="size-5 text-indigo-600" />
                        </div>
                        <span className="font-bold text-gray-950 text-lg leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="w-full py-10 text-xl bg-indigo-600 hover:bg-gray-950 text-white font-black rounded-[2.5rem] transition-all group/btn shadow-2xl shadow-indigo-400/20" onClick={handleDesktopAlgoDemo}>
                    Open Strategy Lab <Monitor className="ml-4 size-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artifact Hub Section - FULL PREMIUM LIGHT */}
        <section id="artifacts" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
              <div>
                <Badge className="bg-purple-50 text-purple-700 border-none font-bold mb-6 px-4 py-1.5 uppercase tracking-widest text-[10px]">Institutional Documentation</Badge>
                <h2 className="text-6xl font-black text-gray-950 tracking-tighter mb-6 leading-none">The Repository Hub</h2>
                <p className="text-gray-500 text-xl font-medium max-w-3xl tracking-tight leading-relaxed">
                  Deep documentation spanning Product Requirements, UAT Logic, and Execution Timelines.
                </p>
              </div>
              <div className="flex items-center gap-4 text-gray-400 font-black uppercase text-[11px] tracking-[0.3em] bg-gray-50 px-8 py-5 rounded-[2.5rem] border border-gray-100 shadow-sm shrink-0">
                <Globe className="size-6 text-blue-500" />
                <span>Single Source of Truth v1.2</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Product Specs */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="p-12 rounded-[4rem] border border-gray-100 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer group flex flex-col items-center text-center">
                    <div className="size-24 rounded-[2rem] bg-blue-50 flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-blue-500/5">
                      <FileText className="size-10 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter mb-4 text-gray-950 group-hover:text-blue-600 transition-colors">Product Specifications</h3>
                    <p className="text-gray-400 font-bold mb-10 leading-relaxed text-sm">Comprehensive PRDs, user stories, and feature success metrics for the entire innovation suite.</p>
                    <Button variant="outline" className="w-full py-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] border-2 border-gray-100 group-hover:border-blue-600 group-hover:text-blue-600 transition-all">Review Registry</Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 bg-white shadow-2xl font-sans">
                  <DialogHeader className="mb-12">
                    <Badge className="w-fit bg-blue-50 text-blue-600 font-bold mb-6 px-4 py-1 uppercase tracking-widest text-[10px]">Internal Ref #4412</Badge>
                    <DialogTitle className="text-3xl font-bold tracking-tight text-gray-950 mb-4 font-sans">Innovation PRD Repository</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-12">
                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Strategic Narrative</span>
                      <p className="text-gray-900 font-medium text-lg leading-relaxed">{PRD_DATA.executionSummary}</p>
                    </div>
                    <Tabs defaultValue="ERW" className="w-full">
                      <TabsList className="flex gap-4 bg-transparent mb-12 border-none">
                        <TabsTrigger value="ERW" className="w-full py-4 rounded-xl bg-gray-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-xs transition-all">Error Recovery</TabsTrigger>
                        <TabsTrigger value="ASE" className="w-full py-4 rounded-xl bg-gray-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-xs transition-all">Algo Strategy</TabsTrigger>
                        <TabsTrigger value="RISKS" className="w-full py-4 rounded-xl bg-gray-50 data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold text-xs transition-all">Risk Registry</TabsTrigger>
                      </TabsList>
                      {PRD_DATA.features.map(f => (
                        <TabsContent key={f.id} value={f.id} className="animate-in fade-in zoom-in-95 duration-500">
                          <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                              <div className="space-y-3 px-8 py-6 bg-blue-50/50 rounded-3xl border border-blue-50 shadow-sm">
                                <h5 className="font-bold text-xl tracking-tight flex items-center gap-3"><Map className="size-5 text-blue-600" /> The Problem</h5>
                                <p className="text-gray-600 font-medium leading-relaxed text-sm">{f.problem}</p>
                              </div>
                              <div className="space-y-3 px-8 py-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 shadow-sm">
                                <h5 className="font-bold text-xl tracking-tight flex items-center gap-3"><Zap className="size-5 text-indigo-600" /> Value Proposition</h5>
                                <p className="text-gray-600 font-medium leading-relaxed italic text-base">"{f.valueProp}"</p>
                              </div>
                              <div className="p-8 bg-gray-950 rounded-[3rem] text-white shadow-xl shadow-gray-950/20">
                                <div className="flex items-center justify-between mb-6">
                                  <h5 className="font-black text-xl tracking-tighter flex items-center gap-3 text-blue-400"><Code2 className="size-6" /> API Protocol</h5>
                                  <Badge className="bg-gray-800 text-gray-400 border-none font-black text-[9px] uppercase tracking-widest">v2.0-Alpha</Badge>
                                </div>
                                <div className="space-y-4">
                                  <code className="text-xs bg-gray-900 px-4 py-3 rounded-2xl block font-mono text-blue-300 border border-gray-800">{f.techSpecs.api}</code>
                                  <div className="flex flex-wrap gap-2">
                                    {f.techSpecs.payloads.map((p, i) => (
                                      <Badge key={i} className="bg-gray-900 text-gray-500 border border-gray-800 font-mono text-[9px] py-1 px-3 rounded-lg">{p.split(' ')[0]}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-6">
                              <h5 className="font-black text-2xl tracking-tighter flex items-center gap-3"><TrendingUp className="size-6 text-blue-600" /> Performance Targets</h5>
                              <div className="p-8 rounded-[3rem] border border-gray-100 shadow-sm bg-white">
                                <Table>
                                  <TableBody>
                                    {f.successMetrics.map((m, i) => (
                                      <TableRow key={i} className="hover:bg-slate-50/50 border-b border-gray-50 last:border-none transition-colors">
                                        <TableCell className="py-4 pr-4">
                                          <div className="font-bold text-gray-950 text-sm tracking-tight leading-none">{m.metric}</div>
                                          <div className="text-[9px] text-gray-400 font-medium uppercase mt-1">Status: {m.baseline || m.current}</div>
                                        </TableCell>
                                        <TableCell className="py-4 text-right">
                                          <div className="font-bold text-blue-600 text-xl tracking-tight leading-none">{m.targetM6}</div>
                                          <div className="text-[9px] text-blue-400 font-medium uppercase mt-1">Target M6</div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              <div className="flex gap-4">
                                <Badge className="bg-gray-950 text-white font-black px-4 py-2 rounded-2xl text-[10px] uppercase tracking-widest">Priority: {f.priority}</Badge>
                                <Badge variant="outline" className="border-gray-200 text-gray-400 font-black px-4 py-2 rounded-2xl text-[10px] uppercase tracking-widest leading-none flex items-center">{f.flawAddressed}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="mt-16 pt-12 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-10 text-center md:text-left">
                              <h5 className="font-black text-4xl tracking-tighter flex items-center gap-4"><UserCheck className="size-10 text-blue-600" /> Strategic Scenarios</h5>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              {f.userStories.map(s => (
                                <div key={s.id} className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-200 transition-all flex items-start gap-6 shadow-sm group">
                                  <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all text-xs">
                                    {s.id.split('-').length > 1 ? s.id.split('-')[1] : s.id}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{s.id}</p>
                                      {s.priority === 'P0' && <div className="size-1.5 rounded-full bg-red-500 animate-pulse" />}
                                    </div>
                                    <p className="text-gray-950 font-bold text-base tracking-tight leading-snug">{s.story}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                      <TabsContent value="RISKS" className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="grid gap-6">
                          {RISK_MITIGATION.map((r: any, i: number) => (
                            <div key={i} className="p-10 rounded-[3rem] border border-red-50 bg-white hover:border-red-200 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                              <div className="space-y-3 max-w-xl">
                                <div className="flex items-center gap-3">
                                  <ShieldAlert className="size-6 text-red-500" />
                                  <h5 className="font-black text-2xl tracking-tighter text-gray-950">{r.risk}</h5>
                                </div>
                                <p className="text-gray-500 font-bold leading-relaxed">{r.mitigation}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2 px-8 py-5 bg-red-50 rounded-3xl shrink-0 group-hover:bg-red-100 transition-colors">
                                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">Risk Severity</span>
                                <span className="text-2xl font-black text-red-600 tracking-tighter leading-none">{r.impact}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </DialogContent>
              </Dialog>

              {/* UAT Registry */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                    <div className="size-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all">
                      <CheckCircle className="size-8 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-2 text-gray-950">Logic Verification</h3>
                    <p className="text-gray-500 font-medium mb-6 leading-relaxed text-sm">Validation scenarios ensuring feature performance meets institutional standards.</p>
                    <Button variant="outline" className="w-full py-6 text-xs font-bold rounded-xl">View UAT Scenarios</Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[4rem] p-16 bg-white shadow-2xl font-sans">
                  <DialogHeader className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                      <Badge className="bg-purple-50 text-purple-600 font-black px-4 py-1 uppercase tracking-widest text-[10px]">Quality Assurance Registry</Badge>
                      <Badge className="bg-green-50 text-green-600 font-black px-4 py-1 uppercase tracking-widest text-[10px]">v1.0.4 PASS</Badge>
                    </div>
                    <DialogTitle className="text-6xl font-black tracking-tighter text-gray-950">Validation Protocols</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6">
                    {UAT_SCENARIOS.map((uat: any) => (
                      <div key={uat.id} className="p-10 rounded-[3rem] border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-purple-100 hover:shadow-xl transition-all group">
                        <div className="flex flex-col md:flex-row justify-between gap-10">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-purple-600 text-white border-none font-black px-3 py-1 text-[10px] tracking-widest rounded-lg">{uat.id}</Badge>
                              <h5 className="text-2xl font-black tracking-tighter text-gray-950">{uat.scenario}</h5>
                            </div>
                            <div className="p-6 bg-white rounded-2xl border border-gray-50 italic">
                              <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 font-sans">Behavioral Expectation</span>
                              <p className="text-gray-600 font-bold text-lg leading-relaxed">"{uat.expected}"</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                            <div className="mb-4 text-right">
                              <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Status</span>
                              <Badge className="bg-green-50 text-green-600 font-black border-none uppercase tracking-tighter text-xs flex items-center gap-2">
                                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" /> Verified Ready
                              </Badge>
                            </div>
                            <div className="text-right">
                              <span className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Impact Area</span>
                              <span className="text-gray-950 font-black tracking-tighter italic">Technical Core</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Roadmap */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center">
                    <div className="size-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all">
                      <Clock className="size-8 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-2 text-gray-950">Strategic Roadmap</h3>
                    <p className="text-gray-500 font-medium mb-6 leading-relaxed text-sm">Phased rollout strategy prioritizing trust architecture followed by advanced strategy lab.</p>
                    <Button variant="outline" className="w-full py-6 text-xs font-bold rounded-xl">View Timeline</Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl rounded-3xl p-12 bg-white shadow-2xl border-none">
                  <DialogHeader className="mb-16">
                    <DialogTitle className="text-4xl font-bold tracking-tight text-gray-950">Execution Roadmap</DialogTitle>
                    <DialogDescription className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Pocketful Propel Framework 2026</DialogDescription>
                  </DialogHeader>
                  <div className="grid md:grid-cols-3 gap-10">
                    {(['now', 'next', 'later'] as const).map((phase, i) => (
                      <div key={phase} className="space-y-8 group">
                        <div className="flex items-center gap-4">
                          <div className={`size-4 rounded-full ${i === 0 ? 'bg-blue-600 animate-pulse' : i === 1 ? 'bg-purple-600' : 'bg-green-600'}`}></div>
                          <h4 className="font-bold text-xl capitalize text-gray-950">{phase}</h4>
                        </div>
                        <div className="space-y-4">
                          {PRD_DATA.roadmap[phase].map((item, j) => (
                            <div key={j} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm font-bold text-gray-900 tracking-tight leading-snug text-sm hover:border-blue-200 transition-all cursor-default">
                              <div>{item.item}</div>
                              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-2 font-medium">Lead: {item.owner}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operational Frameworks */}
                  <div className="mt-20 grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                      <h5 className="font-bold text-xl tracking-tight mb-6 flex items-center gap-3"><Users className="size-5 text-purple-600" /> RACI Matrix</h5>
                      <div className="overflow-hidden rounded-xl border border-gray-50">
                        <table className="w-full text-left text-sm font-medium">
                          <thead className="bg-gray-50 text-gray-400 uppercase text-[9px] tracking-widest">
                            <tr>
                              <th className="px-5 py-3">Deliverable</th>
                              <th className="px-5 py-3">PM</th>
                              <th className="px-5 py-3">Eng</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {RACI_MATRIX.slice(0, 5).map((row: any, i: number) => (
                              <tr key={i} className="hover:bg-gray-50 transition-colors text-xs">
                                <td className="px-5 py-3 text-gray-950">{row.deliverable}</td>
                                <td className="px-5 py-3"><Badge className="bg-blue-50 text-blue-600 text-[9px] font-bold">{row.pm}</Badge></td>
                                <td className="px-5 py-3"><Badge className="bg-gray-100 text-gray-500 text-[9px] font-bold">{row.eng}</Badge></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <h5 className="font-bold text-xl tracking-tight mb-6 flex items-center gap-3"><Wrench className="size-5 text-blue-600" /> PM Tooling</h5>
                        <div className="grid grid-cols-2 gap-4">
                          {PM_TOOLING.map((s: any, i: number) => (
                            <div key={i} className="space-y-1">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{s.purpose}</p>
                              <p className="text-xs font-semibold text-gray-950">{s.tools.join(", ")}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 bg-green-50/50 rounded-3xl border border-green-100 shadow-sm">
                        <h5 className="font-bold text-lg tracking-tight mb-4 text-green-700">Definition of Done</h5>
                        <ul className="space-y-2">
                          {DEFINITION_OF_DONE.slice(0, 3).map((d: string, i: number) => (
                            <li key={i} className="text-xs font-medium text-green-600 flex items-start gap-2">
                              <div className="size-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-32 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-gray-950 rounded-2xl flex items-center justify-center text-white font-black text-sm italic">P</div>
                <span className="text-sm font-black tracking-[0.4em] uppercase text-gray-950 italic">Pocketful Institutional</span>
              </div>
              <p className="text-gray-400 font-bold text-2xl leading-[1.6] max-w-sm tracking-tight">
                Propelling the next wave of algorithmic trading for India's retail investors.
              </p>
              <div className="flex gap-10 text-[11px] font-black text-gray-950 uppercase tracking-[0.4em]">
                <a href="https://linkedin.com/in/abhij" target="_blank" className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 pb-2">LinkedIn</a>
                <a href="#" className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 pb-2">Portfolio</a>
                <a href="#" className="hover:text-blue-600 transition-all border-b-2 border-transparent hover:border-blue-600 pb-2">Resume</a>
              </div>
            </div>
            <div className="p-16 bg-gray-950 rounded-[5rem] text-white flex flex-col gap-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-transform">
              <div className="space-y-4">
                <Badge className="bg-blue-600 text-white font-bold border-none uppercase tracking-widest text-[10px]">Direct Engagement</Badge>
                <h4 className="text-5xl font-black tracking-tighter leading-none italic">Let's build the future.</h4>
                <p className="text-gray-400 font-bold text-2xl tracking-tighter">abhineet.jain06@gmail.com</p>
              </div>
              <Button className="bg-white text-gray-950 hover:bg-blue-600 hover:text-white font-black px-12 py-12 rounded-[3rem] text-2xl transition-all shadow-xl shadow-white/5 w-fit h-auto group-hover:px-16">
                Download Proposal <ExternalLink className="ml-4 size-8" />
              </Button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between text-[10px] font-bold text-gray-300 uppercase tracking-widest gap-4">
            <span>© 2026 Abhineet Jain | TPM Feature Design Portfolio</span>
            <span>Optimized for Single-Link Deployment & High-Fidelity Review</span>
          </div>
        </footer>
      </div>
    </>
  );
}
