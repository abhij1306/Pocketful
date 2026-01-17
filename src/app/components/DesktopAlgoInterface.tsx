import { useState } from 'react';
import { Plus, Settings, TrendingUp, TrendingDown, Play, Pause, Trash2, Edit } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

interface AlgoStrategy {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'DRAFT';
  instrument: string;
  condition: string;
  todayPnL: number;
  totalPnL: number;
  triggersToday: number;
  maxTriggers: number;
  lastAction?: string;
}

interface DesktopAlgoInterfaceProps {
  onNewStrategy: () => void;
}

export function DesktopAlgoInterface({ onNewStrategy }: DesktopAlgoInterfaceProps) {
  const [strategies, setStrategies] = useState<AlgoStrategy[]>([
    {
      id: '1',
      name: 'RELIANCE Momentum',
      status: 'ACTIVE',
      instrument: 'RELIANCE',
      condition: 'Price crosses above ₹2,500',
      todayPnL: 340,
      totalPnL: 2180,
      triggersToday: 1,
      maxTriggers: 3,
      lastAction: 'BUY 10 @ ₹2,502.50 (10:34 AM)'
    },
    {
      id: '2',
      name: 'TCS Mean Reversion',
      status: 'ACTIVE',
      instrument: 'TCS',
      condition: 'RSI below 30',
      todayPnL: -125,
      totalPnL: 890,
      triggersToday: 2,
      maxTriggers: 5,
      lastAction: 'BUY 5 @ ₹3,442.00 (2:15 PM)'
    }
  ]);

  const toggleStatus = (id: string) => {
    setStrategies(strategies.map(s => 
      s.id === id 
        ? { ...s, status: s.status === 'ACTIVE' ? 'PAUSED' as const : 'ACTIVE' as const }
        : s
    ));
  };

  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter(s => s.id !== id));
  };

  const totalPnL = strategies.reduce((acc, s) => acc + s.totalPnL, 0);
  const todayPnL = strategies.reduce((acc, s) => acc + s.todayPnL, 0);

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Algo Strategies</h1>
            <p className="text-sm text-gray-500">Automated trading strategies</p>
          </div>
          <Button 
            onClick={onNewStrategy}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="size-4 mr-2" />
            New Strategy
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Active Strategies</p>
            <p className="text-2xl font-semibold">
              {strategies.filter(s => s.status === 'ACTIVE').length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Today's P&L</p>
            <p className={`text-2xl font-semibold ${todayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {todayPnL >= 0 ? '+' : ''}₹{todayPnL.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Total P&L</p>
            <p className={`text-2xl font-semibold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Strategies List */}
      <div className="flex-1 overflow-y-auto p-6">
        {strategies.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="size-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No strategies yet</h3>
              <p className="text-sm text-gray-500 mb-4">Create your first algorithmic trading strategy</p>
              <Button onClick={onNewStrategy}>
                <Plus className="size-4 mr-2" />
                Create Strategy
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div 
                key={strategy.id}
                className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {strategy.name}
                      </h3>
                      <Badge 
                        className={
                          strategy.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }
                      >
                        {strategy.status === 'ACTIVE' ? '● ACTIVE' : '⏸ PAUSED'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{strategy.instrument}</span>
                      <span>•</span>
                      <span>{strategy.condition}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Today's P&L</p>
                    <p className={`text-xl font-semibold ${strategy.todayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {strategy.todayPnL >= 0 ? '+' : ''}₹{strategy.todayPnL}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Total: <span className={strategy.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {strategy.totalPnL >= 0 ? '+' : ''}₹{strategy.totalPnL}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Triggers Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Triggers Today</span>
                    <span>{strategy.triggersToday} / {strategy.maxTriggers}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${(strategy.triggersToday / strategy.maxTriggers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Last Action */}
                {strategy.lastAction && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4">
                    <p className="text-xs text-gray-500">Last action:</p>
                    <p className="text-sm text-gray-900">{strategy.lastAction}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleStatus(strategy.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {strategy.status === 'ACTIVE' ? (
                      <>
                        <Pause className="size-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-4" />
                        Resume
                      </>
                    )}
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit className="size-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteStrategy(strategy.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
