import { useState } from 'react';
import { Plus, Zap, TrendingUp, TrendingDown, Play, Pause, Trash2, Edit, Clock, Target, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

interface ConditionalOrder {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'TRIGGERED';
  instrument: string;
  condition: string;
  conditionType: 'PRICE_ABOVE' | 'PRICE_BELOW' | 'RSI' | 'BRACKET';
  action: 'BUY' | 'SELL';
  quantity: number;
  triggerPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  todayPnL: number;
  totalPnL: number;
  triggersToday: number;
  maxTriggers: number;
  lastAction?: string;
  createdAt: string;
}

interface DesktopAlgoInterfaceProps {
  onNewStrategy: () => void;
  onEdit: (id: string) => void;
}

export function DesktopAlgoInterface({ onNewStrategy, onEdit }: DesktopAlgoInterfaceProps) {
  const [orders, setOrders] = useState<ConditionalOrder[]>([
    {
      id: '1',
      name: 'RELIANCE Breakout',
      status: 'ACTIVE',
      instrument: 'RELIANCE',
      condition: 'Price crosses above ₹2,500',
      conditionType: 'PRICE_ABOVE',
      action: 'BUY',
      quantity: 10,
      triggerPrice: 2500,
      stopLoss: 2450,
      takeProfit: 2600,
      todayPnL: 340,
      totalPnL: 2180,
      triggersToday: 1,
      maxTriggers: 3,
      lastAction: 'BUY 10 @ ₹2,502.50 (10:34 AM)',
      createdAt: 'Jan 15, 2026'
    },
    {
      id: '2',
      name: 'TCS Dip Buy',
      status: 'ACTIVE',
      instrument: 'TCS',
      condition: 'RSI below 30',
      conditionType: 'RSI',
      action: 'BUY',
      quantity: 5,
      stopLoss: 3400,
      takeProfit: 3550,
      todayPnL: -125,
      totalPnL: 890,
      triggersToday: 2,
      maxTriggers: 5,
      lastAction: 'BUY 5 @ ₹3,442.00 (2:15 PM)',
      createdAt: 'Jan 12, 2026'
    },
    {
      id: '3',
      name: 'INFY Bracket Order',
      status: 'TRIGGERED',
      instrument: 'INFY',
      condition: 'Entry: ₹1,450 | SL: ₹1,420 | TP: ₹1,500',
      conditionType: 'BRACKET',
      action: 'BUY',
      quantity: 20,
      triggerPrice: 1450,
      stopLoss: 1420,
      takeProfit: 1500,
      todayPnL: 0,
      totalPnL: 600,
      triggersToday: 1,
      maxTriggers: 1,
      lastAction: 'Waiting for target (₹1,500)',
      createdAt: 'Jan 16, 2026'
    }
  ]);

  const toggleStatus = (id: string) => {
    setOrders(orders.map(o =>
      o.id === id
        ? { ...o, status: o.status === 'ACTIVE' ? 'PAUSED' as const : 'ACTIVE' as const }
        : o
    ));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  const totalPnL = orders.reduce((acc, o) => acc + o.totalPnL, 0);
  const todayPnL = orders.reduce((acc, o) => acc + o.todayPnL, 0);
  const activeCount = orders.filter(o => o.status === 'ACTIVE').length;

  const getConditionIcon = (type: string) => {
    switch (type) {
      case 'PRICE_ABOVE': return <TrendingUp className="size-4 text-green-600" />;
      case 'PRICE_BELOW': return <TrendingDown className="size-4 text-red-600" />;
      case 'RSI': return <Target className="size-4 text-purple-600" />;
      case 'BRACKET': return <ShieldCheck className="size-4 text-blue-600" />;
      default: return <Zap className="size-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-50 text-green-700 border-green-200 font-semibold px-3 py-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Active
        </Badge>;
      case 'PAUSED':
        return <Badge className="bg-gray-100 text-gray-600 border-gray-200 font-semibold px-3 py-1">
          <Pause className="size-3 mr-1.5" />
          Paused
        </Badge>;
      case 'TRIGGERED':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1">
          <CheckCircle2 className="size-3 mr-1.5" />
          Triggered
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="size-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Order Assistant</h1>
                <p className="text-sm text-gray-500">Conditional orders & bracket setups</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onNewStrategy}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30"
          >
            <Plus className="size-4 mr-2" />
            New Conditional Order
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="size-4 text-white" />
              </div>
              <p className="text-sm font-medium text-blue-700">Active Orders</p>
            </div>
            <p className="text-3xl font-bold text-blue-900">{activeCount}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-5 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 bg-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-4 text-white" />
              </div>
              <p className="text-sm font-medium text-green-700">Today's P&L</p>
            </div>
            <p className={`text-3xl font-bold ${todayPnL >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {todayPnL >= 0 ? '+' : ''}₹{todayPnL.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-5 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Target className="size-4 text-white" />
              </div>
              <p className="text-sm font-medium text-purple-700">Total P&L</p>
            </div>
            <p className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-5 border border-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="size-4 text-white" />
              </div>
              <p className="text-sm font-medium text-orange-700">Triggers Today</p>
            </div>
            <p className="text-3xl font-bold text-orange-700">
              {orders.reduce((acc, o) => acc + o.triggersToday, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-8">
        {orders.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="size-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No conditional orders yet</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Create your first conditional order to automate your trading strategy
              </p>
              <Button
                onClick={onNewStrategy}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
              >
                <Plus className="size-4 mr-2" />
                Create Your First Order
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                        {getConditionIcon(order.conditionType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{order.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="font-semibold text-gray-700">{order.instrument}</span>
                          <span>•</span>
                          <span>{order.action} {order.quantity} units</span>
                          <span>•</span>
                          <span className="text-gray-400">Created {order.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      {getStatusBadge(order.status)}
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm">
                        <AlertCircle className="size-3.5 text-gray-400" />
                        <span className="text-gray-600">{order.condition}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right pl-6 border-l border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Today's P&L</p>
                    <p className={`text-2xl font-bold ${order.todayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {order.todayPnL >= 0 ? '+' : ''}₹{order.todayPnL.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Total: <span className={`font-semibold ${order.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {order.totalPnL >= 0 ? '+' : ''}₹{order.totalPnL.toLocaleString('en-IN')}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Bracket Order Details */}
                {order.conditionType === 'BRACKET' && order.stopLoss && order.takeProfit && (
                  <div className="flex gap-4 mb-5 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-blue-100/50">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="size-4 text-red-500" />
                      <span className="text-sm text-gray-600">Stop Loss:</span>
                      <span className="font-semibold text-red-600">₹{order.stopLoss.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-green-500" />
                      <span className="text-sm text-gray-600">Take Profit:</span>
                      <span className="font-semibold text-green-600">₹{order.takeProfit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                {/* Triggers Progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-600">Daily Trigger Limit</span>
                    <span className="font-bold text-gray-900">{order.triggersToday} / {order.maxTriggers}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(order.triggersToday / order.maxTriggers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Last Action */}
                {order.lastAction && (
                  <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                      <p className="text-sm font-medium text-gray-700">{order.lastAction}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <button
                    onClick={() => toggleStatus(order.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${order.status === 'ACTIVE'
                      ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100'
                      : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-100'
                      }`}
                  >
                    {order.status === 'ACTIVE' ? (
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
                  <button
                    onClick={() => onEdit(order.id)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
                  >
                    <Edit className="size-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100 ml-auto"
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

      {/* Footer Note */}
      <div className="bg-blue-50/50 border-t border-blue-100 px-8 py-4">
        <div className="flex items-center gap-3 text-sm text-blue-700">
          <ShieldCheck className="size-5 text-blue-600" />
          <span>
            <strong>SEBI Compliant:</strong> All conditional orders are executed within regulatory guidelines. Orders are placed on your behalf when conditions are met.
          </span>
        </div>
      </div>
    </div>
  );
}
