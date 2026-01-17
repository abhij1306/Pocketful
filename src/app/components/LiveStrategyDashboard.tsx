import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Pause, Play, Trash2, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import type { Strategy } from './StrategyBuilder';

interface LiveStrategy extends Strategy {
  today_pnl: number;
  total_pnl: number;
  triggers_today: number;
  last_action?: {
    type: string;
    quantity: number;
    price: number;
    time: string;
  };
}

interface LiveStrategyDashboardProps {
  strategies: LiveStrategy[];
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewPerformance?: (id: string) => void;
}

export function LiveStrategyDashboard({ 
  strategies,
  onPause,
  onResume,
  onDelete,
  onViewPerformance 
}: LiveStrategyDashboardProps) {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {strategies.map((strategy) => {
        const isActive = strategy.status === 'ACTIVE';
        const isProfitable = strategy.total_pnl > 0;
        const todayProfitable = strategy.today_pnl > 0;

        return (
          <Card key={strategy.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{strategy.name}</h3>
                  <Badge 
                    variant={isActive ? "default" : "secondary"}
                    className={isActive ? "bg-green-600" : ""}
                  >
                    {isActive ? '🟢 ACTIVE' : '⏸️ PAUSED'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Triggers today: {strategy.triggers_today} of {strategy.risk_params.max_trades_per_day}
                </p>
              </div>

              <div className="text-right">
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Today's P&L</p>
                  <p className={`text-xl font-bold ${todayProfitable ? 'text-green-600' : 'text-red-600'}`}>
                    {todayProfitable ? '+' : ''}₹{strategy.today_pnl.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total P&L</p>
                  <p className={`text-lg font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                    {isProfitable ? '+' : ''}₹{strategy.total_pnl.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {strategy.last_action && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Last action:</strong> {strategy.last_action.type} {strategy.last_action.quantity} @ ₹
                  {strategy.last_action.price.toFixed(2)} ({strategy.last_action.time})
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">RISK PARAMETERS</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Stop Loss:</span>
                  <span className="font-semibold ml-1">{strategy.risk_params.stop_loss_pct}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Take Profit:</span>
                  <span className="font-semibold ml-1">{strategy.risk_params.take_profit_pct}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Max Trades:</span>
                  <span className="font-semibold ml-1">{strategy.risk_params.max_trades_per_day}/day</span>
                </div>
                <div>
                  <span className="text-gray-500">Max Capital:</span>
                  <span className="font-semibold ml-1">₹{strategy.risk_params.max_capital.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {isActive ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onPause?.(strategy.id)}
                  className="gap-2"
                >
                  <Pause className="size-4" />
                  Pause
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onResume?.(strategy.id)}
                  className="gap-2"
                >
                  <Play className="size-4" />
                  Resume
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewPerformance?.(strategy.id)}
                className="gap-2"
              >
                <BarChart3 className="size-4" />
                Performance
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onDelete?.(strategy.id)}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
