import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Info, Users, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from "./ui/utils";

export function TSEModal() {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <DialogContent className="max-w-md w-full p-0 overflow-hidden bg-white border-none shadow-2xl rounded-3xl block">
            <DialogHeader className="p-6 pb-2 border-b border-gray-100">
                <DialogTitle className="text-xl font-bold text-gray-900">Transparent Status Explainers</DialogTitle>
                <p className="text-sm text-gray-500">Interactive Concept Demo</p>
            </DialogHeader>

            <div className="p-8 bg-gray-50/50">
                {/* IPO Card Mockup */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-sm mx-auto relative">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">IREDA IPO</h3>
                            <p className="text-xs text-gray-500 font-medium">Energy & Power</p>
                        </div>
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Open</Badge>
                    </div>

                    <div className="mb-6 relative">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-600">Subscription Status</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">0.0x Subscribed</span>
                            <button
                                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full transition-colors relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                onClick={() => setShowTooltip(!showTooltip)}
                            >
                                <Info className="size-5" />
                                {/* Ping animation to draw attention */}
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                            </button>
                        </div>

                        {/* The Explainer Overlay */}
                        <div
                            className={cn(
                                "absolute left-0 top-full mt-2 w-72 bg-white text-gray-900 p-4 rounded-xl shadow-xl z-20 transition-all duration-200 origin-top-left border border-gray-200",
                                showTooltip
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}
                        >
                            <h4 className="font-bold text-gray-900 mb-2 text-sm border-b border-gray-100 pb-2">What does 0.0x mean?</h4>
                            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                Subscription rate shows demand vs available shares.
                            </p>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-xs text-blue-700">
                                    <Users className="size-3.5" />
                                    <span><span className="font-bold text-gray-900">2,847 users</span> applied</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-orange-700">
                                    <Clock className="size-3.5" />
                                    <span><span className="font-bold text-gray-900">3 days left</span> to apply</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-2 flex items-start gap-2 border border-gray-100">
                                <TrendingUp className="size-3.5 text-green-600 mt-0.5" />
                                <p className="text-[10px] text-gray-600 leading-tight">
                                    <span className="text-green-600 font-bold">Pro Tip:</span> Apply before rush hours (2-4 PM) for smoother processing.
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-6 flex items-center justify-between text-xs">
                        <span className="text-gray-500">Min Investment</span>
                        <span className="font-bold text-gray-900">₹14,850</span>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">Apply Now</Button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6 max-w-xs mx-auto">
                    Hover or click the info icon to see the "Plain English" explainer in action.
                </p>
            </div>
        </DialogContent>
    );
}
