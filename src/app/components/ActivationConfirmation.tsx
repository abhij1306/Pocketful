import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useState } from 'react';
import type { Strategy } from './StrategyBuilder';

interface ActivationConfirmationProps {
  strategy: Strategy;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActivationConfirmation({ strategy, onConfirm, onCancel }: ActivationConfirmationProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const maxLossPerTrade = (strategy.risk_params.max_capital * strategy.risk_params.stop_loss_pct) / 100;
  const maxDailyLoss = maxLossPerTrade * strategy.risk_params.max_trades_per_day;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white p-6 relative">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <AlertTriangle className="size-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold">Activation Confirmation</h2>
          </div>
          <p className="text-gray-600">
            You are about to activate a live trading strategy. Please review the details carefully.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Strategy Name:</span>
            <span className="font-semibold">{strategy.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Instrument:</span>
            <span className="font-semibold">{strategy.conditions[0]?.instrument}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Max Capital at Risk:</span>
            <span className="font-semibold">₹{strategy.risk_params.max_capital.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Stop-Loss per Trade:</span>
            <span className="font-semibold text-red-600">
              {strategy.risk_params.stop_loss_pct}% (₹{maxLossPerTrade.toLocaleString('en-IN')})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Max Trades per Day:</span>
            <span className="font-semibold">{strategy.risk_params.max_trades_per_day}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-600">Max Daily Loss:</span>
            <span className="font-semibold text-red-600">
              ₹{maxDailyLoss.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <CheckCircle2 className="size-4 text-blue-600" />
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Your strategy will execute automatically when conditions are met</li>
            <li>• Risk limits will be enforced on every trade</li>
            <li>• You can pause or delete the strategy at any time</li>
            <li>• Strategies run server-side and don't require the app to be open</li>
          </ul>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <Checkbox 
            id="terms" 
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
            I understand the risks involved and agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Algorithmic Trading Terms of Service
            </a>
          </label>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={!agreedToTerms}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            ✅ Confirm & Activate
          </Button>
        </div>
      </Card>
    </div>
  );
}
