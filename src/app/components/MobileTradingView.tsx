import { ArrowLeft, Search, Bell, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface MobileTradingViewProps {
  onTriggerError: () => void;
  activeError?: 'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED' | null;
  onRecover?: () => void;
}

export function MobileTradingView({ onTriggerError, activeError, onRecover }: MobileTradingViewProps) {
  const stockData = {
    symbol: 'IRCTC',
    name: 'Indian Railway Catering',
    price: 785.50,
    change: -12.30,
    changePercent: -1.54,
    high: 798.80,
    low: 782.40,
    open: 795.60,
    prevClose: 797.80
  };

  return (
    <div className="bg-white h-full flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button className="p-1">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-base font-semibold text-gray-900">{stockData.symbol}</h1>
          <p className="text-xs text-gray-500">{stockData.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1">
            <Search className="size-5 text-gray-700" />
          </button>
          <button className="p-1">
            <MoreVertical className="size-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-3xl font-bold text-gray-900">₹{stockData.price}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-600 font-medium">
                {stockData.change > 0 ? '+' : ''}{stockData.change}
              </span>
              <span className="text-red-600 font-medium">
                ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent}%)
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-right">
            <p>H: ₹{stockData.high}</p>
            <p>L: ₹{stockData.low}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-gray-500 mb-1">Open</p>
            <p className="font-medium text-gray-900">₹{stockData.open}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Prev Close</p>
            <p className="font-medium text-gray-900">₹{stockData.prevClose}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Volume</p>
            <p className="font-medium text-gray-900">2.4M</p>
          </div>
        </div>
      </div>

      {/* Chart Section with Inline Error Handling */}
      <div className="px-4 py-4 bg-gray-50/50 min-h-[240px] flex flex-col">
        {activeError === 'DATA_UNAVAILABLE' ? (
          <div className="flex-1 bg-white rounded-xl border border-red-100 shadow-sm p-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="size-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <TrendingDown className="size-6 text-red-500" />
            </div>
            <h3 className="text-gray-900 font-bold mb-1">Data Unavailable</h3>
            <p className="text-xs text-gray-500 mb-6 max-w-[200px] leading-relaxed">
              Real-time feed for IRCTC interrupted. Auto-reconnecting...
            </p>

            <div className="w-full max-w-[180px] bg-gray-100 rounded-full h-1.5 overflow-hidden mb-4">
              <div className="bg-blue-500 h-full w-1/3 animate-[shimmer_1.5s_infinite_linear] rounded-full" />
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={onRecover}
              className="h-8 text-xs font-bold border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Use Cached Data
            </Button>
          </div>
        ) : (
          <div className="h-48 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
            <div className="text-center">
              <TrendingUp className="size-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-xs font-medium">Interactive Chart Area</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs defaultValue="technicals" className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start border-b border-gray-200 bg-white rounded-none px-4">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="technicals" className="text-sm">Technicals</TabsTrigger>
            <TabsTrigger value="financials" className="text-sm">Financials</TabsTrigger>
          </TabsList>

          <TabsContent value="technicals" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">RSI (14)</p>
                <p className="text-xl font-semibold">Loading...</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">MACD</p>
                <p className="text-xl font-semibold">Loading...</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-900 font-medium">
                  💡 Use the recovery scenario controls on the right to simulate errors.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
            <p className="text-sm text-gray-500">Company overview content...</p>
          </TabsContent>

          <TabsContent value="financials" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
            <p className="text-sm text-gray-500">Financial data content...</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 px-4 py-3 flex gap-3">
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
          BUY
        </Button>
        <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
          SELL
        </Button>
      </div>
    </div>
  );
}
