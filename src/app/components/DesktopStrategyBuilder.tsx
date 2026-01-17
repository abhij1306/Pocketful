import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';

interface DesktopStrategyBuilderProps {
  onClose: () => void;
  onSave: (strategy: any) => void;
}

export function DesktopStrategyBuilder({ onClose, onSave }: DesktopStrategyBuilderProps) {
  const [step, setStep] = useState<'builder' | 'backtest' | 'confirm'>('builder');
  const [instrument, setInstrument] = useState('RELIANCE');
  const [conditionType, setConditionType] = useState('PRICE_CROSS_ABOVE');
  const [threshold, setThreshold] = useState('2500');
  const [actionType, setActionType] = useState('BUY');
  const [quantity, setQuantity] = useState('10');
  const [stopLoss, setStopLoss] = useState('2');
  const [takeProfit, setTakeProfit] = useState('5');
  const [maxTrades, setMaxTrades] = useState('3');

  const instruments = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICI', 'IRCTC', 'RVNL', 'TATAMOTORS'];
  const conditions = [
    { value: 'PRICE_CROSS_ABOVE', label: 'Price crosses above' },
    { value: 'PRICE_CROSS_BELOW', label: 'Price crosses below' },
    { value: 'RSI_BELOW', label: 'RSI below' },
    { value: 'RSI_ABOVE', label: 'RSI above' },
  ];

  const handleBacktest = () => {
    setStep('backtest');
  };

  const handleActivate = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    onSave({
      name: `${instrument} ${conditionType.split('_').join(' ')}`,
      instrument,
      condition: `${conditionType} ${threshold}`,
      status: 'ACTIVE'
    });
    onClose();
  };

  if (step === 'backtest') {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 md:p-4" onClick={onClose}>
        <div className="bg-white rounded-xl md:rounded-2xl w-[calc(100%-1rem)] md:w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold">Backtest Results</h2>
            <button onClick={() => setStep('builder')} className="text-gray-400 hover:text-gray-600">
              <X className="size-5" />
            </button>
          </div>

          <div className="p-4 md:p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-900 font-medium">
                {instrument} Momentum Strategy (1 Year Backtest)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">Total Trades</p>
                <p className="text-xl md:text-3xl font-semibold">47</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">Win Rate</p>
                <p className="text-xl md:text-3xl font-semibold text-green-600">62%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 md:p-4 col-span-2 md:col-span-1">
                <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">Net P&L</p>
                <p className="text-xl md:text-3xl font-semibold text-green-600">+₹18,450</p>
                <p className="text-[10px] md:text-xs text-gray-500">+7.4% return</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">Max Drawdown</p>
                <p className="text-lg md:text-xl font-semibold text-red-600">-₹4,200</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <p className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">Sharpe Ratio</p>
                <p className="text-lg md:text-xl font-semibold">1.8</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-900">
                ✓ Your strategy showed profitable results in backtesting with a 62% win rate and
                positive risk-adjusted returns (Sharpe ratio: 1.8).
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('builder')}
                className="flex-1"
              >
                Modify Strategy
              </Button>
              <Button
                onClick={handleActivate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Activate Live Trading
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 md:p-4" onClick={onClose}>
        <div className="bg-white rounded-xl md:rounded-2xl w-[calc(100%-1rem)] md:w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
          <div className="border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold">Confirm Activation</h2>
            <button onClick={() => setStep('backtest')} className="text-gray-400 hover:text-gray-600">
              <X className="size-5" />
            </button>
          </div>

          <div className="p-4 md:p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-amber-900 mb-2">⚠️ Important</p>
              <p className="text-sm text-amber-800">
                You are about to activate a live trading strategy. Please review the details carefully.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Strategy</span>
                <span className="font-medium">{instrument} Momentum</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Instrument</span>
                <span className="font-medium">{instrument}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stop Loss</span>
                <span className="font-medium text-red-600">{stopLoss}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Take Profit</span>
                <span className="font-medium text-green-600">{takeProfit}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Max Trades/Day</span>
                <span className="font-medium">{maxTrades}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('backtest')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                ✓ Confirm & Activate
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 md:p-4" onClick={onClose}>
      <div className="bg-white rounded-xl md:rounded-2xl w-[calc(100%-1rem)] md:w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold">Create Strategy</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* IF Section */}
          <div className="border-l-4 border-blue-500 pl-6 py-2">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">IF</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Trigger Condition</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instrument</label>
                <Select value={instrument} onValueChange={setInstrument}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {instruments.map(inst => (
                      <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <Select value={conditionType} onValueChange={setConditionType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(cond => (
                      <SelectItem key={cond.value} value={cond.value}>{cond.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Threshold Value</label>
                <Input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder="2500"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* THEN Section */}
          <div className="border-l-4 border-green-500 pl-6 py-2">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">THEN</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Action</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <Select value={actionType} onValueChange={setActionType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">BUY</SelectItem>
                    <SelectItem value="SELL">SELL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Shares)</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="10"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Risk Limits */}
          <div className="border-l-4 border-red-500 pl-6 py-2">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">RISK LIMITS</h3>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stop Loss (%)</label>
                <Input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="2"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Take Profit (%)</label>
                <Input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="5"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Trades/Day</label>
                <Input
                  type="number"
                  value={maxTrades}
                  onChange={(e) => setMaxTrades(e.target.value)}
                  placeholder="3"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="flex-1"
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleBacktest}
              variant="outline"
              className="flex-1"
            >
              Run Backtest
            </Button>
            <Button
              onClick={handleActivate}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Activate Strategy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
