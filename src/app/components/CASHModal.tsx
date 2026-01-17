import { DialogContent } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Sun, Radio, Moon, TrendingUp, Zap, BookOpen, ChevronRight, FileText, Globe, Info } from "lucide-react";
import { useState } from "react";

export function CASHModal() {
    const [activeTab, setActiveTab] = useState("live");

    return (
        <DialogContent className="w-[calc(100%-2rem)] md:max-w-7xl p-0 overflow-hidden bg-white border-none shadow-2xl rounded-2xl md:rounded-3xl h-[90vh] flex flex-col">
            {/* Header / Context Switcher */}
            <div className="bg-white border-b border-gray-100 p-4 md:p-6 pb-0 flex-none">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900">Smart Home</h2>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs md:text-sm px-2 md:px-3 py-1">AI Context Active</Badge>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="inline-flex h-auto p-1 md:p-1.5 bg-gray-100/80 rounded-lg md:rounded-xl mb-4 md:mb-6 w-full">
                        <TabsTrigger value="pre" className="flex-1 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-orange-600 font-bold text-xs md:text-sm py-2 md:py-3 transition-all gap-1 md:gap-2">
                            <Sun className="size-3 md:size-4" /> Pre-Market
                        </TabsTrigger>
                        <TabsTrigger value="live" className="flex-1 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600 font-bold text-xs md:text-sm py-2 md:py-3 transition-all gap-1 md:gap-2">
                            <Radio className="size-3 md:size-4" /> Live Market
                        </TabsTrigger>
                        <TabsTrigger value="post" className="flex-1 rounded-md md:rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-bold text-xs md:text-sm py-2 md:py-3 transition-all gap-1 md:gap-2">
                            <Moon className="size-3 md:size-4" /> Post-Market
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-4 md:p-6 pt-2">
                <Tabs value={activeTab} className="w-full h-full">
                    {/* Note: We reuse the Tabs context but don't need TabsList again. 
                         We put TabsContent directly here controlled by the parent Tabs value 
                         is tricky because TabsContext is not shared across siblings easily in Radix without prop drilling 
                         OR we keep the TabsContent inside the main Tabs wrapper.
                         
                         Correction: Radix Tabs works by wrapping everything. 
                         So I need to move the TabsContent INSIDE the main Tabs component above? 
                         OR just render conditional components based on state.
                         
                         Actually, standard Radix Tabs expects Content to be inside Tabs.
                         Let's refactor to keep Tabs wrapping everything content-wise, 
                         or just use conditional rendering which is easier with the state I already have.
                     */}

                    {/* Re-implementing structure to ensure scrolling works properly */}
                    {activeTab === 'pre' && (
                        <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 h-full">
                                <div className="space-y-6 md:space-y-8">
                                    <section>
                                        <h3 className="text-gray-900 font-bold text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-5 flex items-center gap-2">
                                            <Globe className="size-3.5 md:size-4 text-gray-400" /> Global Cues
                                        </h3>
                                        <div className="bg-orange-50/30 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-orange-100/50 hover:border-orange-200 transition-colors shadow-sm">
                                            <div className="flex justify-between items-center mb-3 md:mb-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-lg md:text-2xl text-gray-900">SGX Nifty</span>
                                                    <span className="text-xs md:text-sm text-gray-500 font-medium">Singapore Exchange</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block font-bold text-xl md:text-3xl text-green-600">+124.50</span>
                                                    <span className="block font-bold text-xs md:text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-lg inline-block mt-1">+0.65%</span>
                                                </div>
                                            </div>
                                            <div className="h-2.5 w-full bg-gray-100 rounded-full mt-6 overflow-hidden">
                                                <div className="h-full bg-green-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                                            </div>
                                            <div className="mt-5 flex items-start gap-3 p-3 bg-white rounded-xl border border-orange-100/50">
                                                <TrendingUp className="size-5 text-green-600 mt-0.5 shrink-0" />
                                                <p className="text-sm text-gray-600 font-medium">Market expected to open <span className="text-green-700 font-bold bg-green-50 px-1 rounded">Gap Up</span> based on positive global sentiment.</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                                            <FileText className="size-4 text-gray-400" /> Morning Brief
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { title: "IT Sector Rally", desc: "Expected after dovish US Fed comments overnight.", tag: "Bullish" },
                                                { title: "Tata Motors Q3", desc: "Earnings preview released. Revenue up 12% YoY.", tag: "Neutral" },
                                                { title: "Crude Oil Dips", desc: "Brent crude falls below $75/barrel, positive for OMC.", tag: "Positive" }
                                            ].map((news, i) => (
                                                <div key={i} className="flex gap-4 items-start p-4 bg-white hover:bg-gray-50 rounded-2xl transition-all cursor-pointer border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 group">
                                                    <div className={`size-2.5 rounded-full mt-2 shrink-0 ${i === 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : i === 1 ? 'bg-gray-400' : 'bg-green-500'}`}></div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{news.title}</h4>
                                                            <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-gray-200 text-[10px]">{news.tag}</Badge>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-500 mt-1 leading-relaxed">{news.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden border border-blue-100 h-fit">
                                    <div className="absolute top-0 right-0 p-40 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20"></div>

                                    <div className="relative z-10">
                                        <div className="size-10 md:size-12 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center mb-4 md:mb-6">
                                            <Zap className="size-5 md:size-6 text-blue-600 fill-blue-600" />
                                        </div>
                                        <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Morning Setup</h3>
                                        <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-10 max-w-sm">Your personalized checklist to prepare for the opening bell.</p>

                                        <div className="space-y-4">
                                            <Button className="w-full justify-between bg-white hover:bg-blue-50 text-gray-900 border border-blue-100 h-16 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group px-6">
                                                <span className="font-bold text-base flex items-center gap-3">
                                                    <div className="size-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">1</div>
                                                    Review Watchlist
                                                </span>
                                                <ChevronRight className="size-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                            </Button>
                                            <Button className="w-full justify-between bg-white hover:bg-blue-50 text-gray-900 border border-blue-100 h-16 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group px-6">
                                                <span className="font-bold text-base flex items-center gap-3">
                                                    <div className="size-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">2</div>
                                                    Check GTT Orders
                                                </span>
                                                <ChevronRight className="size-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                            </Button>
                                            <Button className="w-full justify-between bg-white hover:bg-blue-50 text-gray-900 border border-blue-100 h-16 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group px-6">
                                                <span className="font-bold text-base flex items-center gap-3">
                                                    <div className="size-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">3</div>
                                                    Add Funds
                                                </span>
                                                <ChevronRight className="size-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                            </Button>
                                        </div>

                                        <div className="mt-10 p-4 bg-blue-100/50 rounded-xl border border-blue-200 flex gap-3">
                                            <Info className="size-5 text-blue-700 shrink-0" />
                                            <p className="text-sm text-blue-800 font-medium">Tip: Pre-market orders can be placed between 9:00 AM and 9:07 AM.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === 'live' && (
                        <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid lg:grid-cols-4 gap-4 md:gap-8 h-full">
                                <div className="lg:col-span-3 space-y-4 md:space-y-8">
                                    {/* Indices */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-white border border-gray-200 shadow-sm p-4 md:p-6 rounded-2xl md:rounded-3xl hover:border-green-200 transition-all group">
                                            <div className="flex justify-between items-start mb-2 md:mb-4">
                                                <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Nifty 50</span>
                                                <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 text-[10px] md:text-xs">Bullish</Badge>
                                            </div>
                                            <div className="flex items-end gap-2 md:gap-3">
                                                <span className="text-xl md:text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">22,145.00</span>
                                                <span className="text-sm md:text-lg font-bold text-green-600 mb-0.5 md:mb-1.5">+0.45%</span>
                                            </div>
                                        </div>
                                        <div className="bg-white border border-gray-200 shadow-sm p-4 md:p-6 rounded-2xl md:rounded-3xl hover:border-red-200 transition-all group">
                                            <div className="flex justify-between items-start mb-2 md:mb-4">
                                                <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">Bank Nifty</span>
                                                <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200 text-[10px] md:text-xs">Bearish</Badge>
                                            </div>
                                            <div className="flex items-end gap-2 md:gap-3">
                                                <span className="text-xl md:text-3xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">46,800.20</span>
                                                <span className="text-sm md:text-lg font-bold text-red-600 mb-0.5 md:mb-1.5">-0.12%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Positions Widget */}
                                    <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-sm h-full max-h-[400px]">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-gray-900 font-bold text-xl">Active Positions</h3>
                                                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200">2 Open</Badge>
                                            </div>
                                            <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 shadow-sm">+ ₹4,250.00</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-5 bg-white border border-gray-100 rounded-2xl hover:border-green-200 hover:shadow-md transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 font-bold text-xs border border-green-100">CE</div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors">NIFTY 22200 CE</div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wide">Intraday</span>
                                                            <span className="text-xs text-gray-400">25 Qty</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600 text-lg">+ ₹2,400.00</div>
                                                    <span className="text-xs font-medium text-gray-400">LTP: 145.00</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center p-5 bg-white border border-gray-100 rounded-2xl hover:border-green-200 hover:shadow-md transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">EQ</div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">RELIANCE</div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wide">Delivery</span>
                                                            <span className="text-xs text-gray-400">10 Qty</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600 text-lg">+ ₹1,850.00</div>
                                                    <span className="text-xs font-medium text-gray-400">LTP: 2,980.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Live Actions Sidebar */}
                                <div className="lg:col-span-1 bg-gray-50 rounded-3xl p-6 border border-gray-200 h-full flex flex-col min-w-[280px]">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Quick Actions</h3>
                                    <div className="space-y-4 flex-1">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 font-bold h-14 rounded-2xl text-base whitespace-nowrap overflow-hidden text-ellipsis px-4">
                                            <TrendingUp className="size-5 mr-3 shrink-0" /> New Trade
                                        </Button>
                                        <Button variant="outline" className="w-full bg-white font-bold border-gray-200 text-gray-700 h-14 rounded-2xl text-base hover:bg-gray-50 hover:border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis px-4">
                                            <Zap className="size-5 mr-3 shrink-0" /> Option Chain
                                        </Button>

                                        <div className="pt-10 mt-6 border-t border-gray-200">
                                            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <Zap className="size-4 text-orange-500" /> Power Alerts
                                            </h4>
                                            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                                <div className="flex justify-between text-gray-500 mb-2 text-xs font-bold uppercase tracking-wider">
                                                    <span>HDFCBANK</span>
                                                    <span className="text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">&lt; 1600</span>
                                                </div>
                                                <div className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">Price approaching support level.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === 'post' && (
                        <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 h-full items-start">
                                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-200 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-40 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-80 transition-opacity"></div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-500 mb-1 md:mb-2 uppercase tracking-wide">Day's Summary</h3>
                                    <div className="flex items-baseline gap-2 md:gap-4 mb-6 md:mb-8">
                                        <span className="text-3xl md:text-5xl font-bold text-gray-900">+ ₹4,250.00</span>
                                        <span className="text-sm md:text-lg font-bold bg-green-50 text-green-700 px-2 md:px-3 py-0.5 md:py-1 rounded-lg md:rounded-xl">+1.2%</span>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 mb-6 md:mb-8 space-y-3 md:space-y-4">
                                        <div className="flex justify-between text-sm md:text-base">
                                            <span className="text-gray-500 font-medium">Brokerage & Charges</span>
                                            <span className="font-bold text-gray-900">₹124.50</span>
                                        </div>
                                        <div className="h-px bg-gray-200 w-full"></div>
                                        <div className="flex justify-between text-base md:text-lg">
                                            <span className="text-gray-900 font-bold">Net P&L</span>
                                            <span className="font-bold text-green-600">₹4,125.50</span>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold h-12 md:h-14 rounded-xl md:rounded-2xl shadow-lg shadow-blue-100 text-sm md:text-base">
                                        <FileText className="size-4 md:size-5 mr-2 md:mr-3" /> View Contract Note
                                    </Button>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <section>
                                        <div className="flex justify-between items-center mb-4 md:mb-5">
                                            <h3 className="font-bold text-gray-900 text-base md:text-lg">Trade Journal</h3>
                                            <Button variant="ghost" className="text-blue-600 font-bold text-xs md:text-sm hover:bg-blue-50 px-2 md:px-3">View All <ChevronRight className="size-3 md:size-4 ml-1" /></Button>
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
                                            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">You followed your rules in <span className="font-bold text-green-600 bg-green-50 px-1 rounded">2/3 trades</span> today.</p>
                                            <div className="flex gap-2 md:gap-3 flex-wrap">
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">disciplined</Badge>
                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">over-traded</Badge>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="font-bold text-gray-900 text-lg mb-5">Learn for Tomorrow</h3>
                                        <div className="flex gap-5 items-start p-6 bg-white border border-gray-200 rounded-3xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
                                            <div className="bg-indigo-50 p-3 rounded-2xl shadow-sm shrink-0">
                                                <BookOpen className="size-8 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">Analyzing Gap Openings</h4>
                                                <p className="text-sm text-gray-500 leading-relaxed mb-3">Based on today's Gap Up, learn how to trade the first 15 minutes effectively.</p>
                                                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">5 min read</span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
                </Tabs>
            </div>
        </DialogContent>
    );
}
