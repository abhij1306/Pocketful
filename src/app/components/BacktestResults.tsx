import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, Target, AlertTriangle, Edit, Rocket } from 'lucide-react';

interface BacktestResultsProps {
  strategyName: string;
  results: {
    total_trades: number;
    win_rate: number;
    net_pnl: number;
    max_drawdown: number;
    sharpe_ratio: number;
  };
  onModify?: () => void;
  onActivate?: () => void;
}

export function BacktestResults({ strategyName, results, onModify, onActivate }: BacktestResultsProps) {
  const isProfitable = results.net_pnl > 0;
  const winRateColor = results.win_rate >= 0.6 ? 'text-green-600' : results.win_rate >= 0.4 ? 'text-amber-600' : 'text-red-600';
  
  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">BACKTEST RESULTS</h2>
          <Badge variant={isProfitable ? "default" : "destructive"} className="text-xs">
            {isProfitable ? 'PROFITABLE' : 'LOSS'}
          </Badge>
        </div>
        <p className="text-gray-600">{strategyName} (1 Year)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Activity className="size-4" />
            <span className="text-sm">Total Trades</span>
          </div>
          <p className="text-3xl font-bold">{results.total_trades}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Target className="size-4" />
            <span className="text-sm">Win Rate</span>
          </div>
          <p className={`text-3xl font-bold ${winRateColor}`}>
            {(results.win_rate * 100).toFixed(0)}%
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            {isProfitable ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            <span className="text-sm">Net P&L</span>
          </div>
          <p className={`text-3xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '+' : ''}₹{results.net_pnl.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {isProfitable ? '+' : ''}{((results.net_pnl / 250000) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <AlertTriangle className="size-4" />
            <span className="text-sm">Max Drawdown</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            -₹{Math.abs(results.max_drawdown).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <TrendingUp className="size-4" />
            <span className="text-sm">Sharpe Ratio</span>
          </div>
          <p className="text-2xl font-bold">
            {results.sharpe_ratio.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Activity className="size-4" />
          Performance Summary
        </h3>
        <p className="text-sm text-gray-700">
          Your strategy executed <strong>{results.total_trades} trades</strong> over the past year with a{' '}
          <strong className={winRateColor}>{(results.win_rate * 100).toFixed(0)}% win rate</strong>.
          {isProfitable ? (
            <> It generated a net profit of <strong className="text-green-600">₹{results.net_pnl.toLocaleString('en-IN')}</strong> with a Sharpe ratio of {results.sharpe_ratio.toFixed(2)}, indicating {results.sharpe_ratio > 1.5 ? 'excellent' : 'good'} risk-adjusted returns.</>
          ) : (
            <> It resulted in a net loss of <strong className="text-red-600">₹{Math.abs(results.net_pnl).toLocaleString('en-IN')}</strong>. Consider modifying your strategy parameters.</>
          )}
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onModify} className="flex-1 gap-2">
          <Edit className="size-4" />
          Modify Strategy
        </Button>
        <Button 
          onClick={onActivate} 
          className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
          disabled={!isProfitable}
        >
          <Rocket className="size-4" />
          Activate Live
        </Button>
      </div>

      {!isProfitable && (
        <p className="text-sm text-amber-600 mt-3 text-center">
          ⚠️ This strategy showed a loss in backtesting. We recommend modifying parameters before activation.
        </p>
      )}
    </Card>
  );
}
