import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { WifiOff, RefreshCw, Clock } from "lucide-react";

export function ROMModal() {
    return (
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md p-0 overflow-hidden bg-gray-50 border-none shadow-2xl rounded-2xl sm:rounded-3xl h-[80vh] sm:h-[600px] flex flex-col">
            {/* Fake Phone Status Bar */}
            <div className="bg-white px-6 py-2 flex justify-between items-center border-b border-gray-100 text-[10px] font-bold text-gray-400">
                <span>9:41</span>
                <div className="flex gap-1.5">
                    <span className="text-yellow-500">E</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Offline Banner */}
            <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center justify-between animate-in slide-in-from-top duration-500">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-100 p-1 rounded-full">
                        <WifiOff className="size-3 text-yellow-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-yellow-800">Slow Connection</span>
                        <span className="text-[10px] text-yellow-700 font-medium">Using cached data</span>
                    </div>
                </div>
                <button className="text-[10px] font-bold bg-white border border-yellow-200 text-yellow-700 px-2 py-1 rounded-md shadow-sm">
                    Lite Mode
                </button>
            </div>

            <DialogHeader className="p-6 pb-2 bg-white">
                <DialogTitle className="text-xl font-bold text-gray-900">Portfolio</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs font-normal text-gray-400 border-gray-200 gap-1 bg-gray-50">
                        <Clock className="size-3" /> Updated 14m ago
                    </Badge>
                </div>
            </DialogHeader>

            <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-gray-50/50">
                {/* Holdings Cards with "Cached" visual cues */}
                {[
                    { symbol: "HDFCBANK", qty: 50, price: 1642.50, pnl: "+4,250.00", pnlColor: "text-gray-400" }, // Grayed out PnL to indicate stale
                    { symbol: "RELIANCE", qty: 25, price: 2980.00, pnl: "-1,200.00", pnlColor: "text-gray-400" },
                    { symbol: "TATASTEEL", qty: 100, price: 145.20, pnl: "+850.50", pnlColor: "text-gray-400" },
                ].map((stock, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm opacity-90 grayscale-[0.3]">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-gray-900">{stock.symbol}</h4>
                                <span className="text-xs text-gray-500">{stock.qty} Qty • Avg. {stock.price}</span>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold text-sm ${stock.pnlColor}`}>{stock.pnl}</div>
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cached P&L</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gray-300 h-full w-2/3"></div>
                        </div>
                    </div>
                ))}

                {/* Offline Action */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                    <h5 className="text-sm font-bold text-blue-900 mb-1">Queue Trades Offline?</h5>
                    <p className="text-xs text-blue-700 mb-3">You can place orders now. We'll execute them automatically when connection restores.</p>
                    <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 bg-white">
                        Queue Order
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
}
