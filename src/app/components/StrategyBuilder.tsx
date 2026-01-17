import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Save, BarChart3, Rocket, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

export interface Strategy {
  id: string;
  name: string;
  conditions: Array<{
    type: string;
    instrument: string;
    threshold: number;
  }>;
  actions: Array<{
    type: string;
    quantity_type: string;
    quantity: number;
  }>;
  risk_params: {
    stop_loss_pct: number;
    take_profit_pct: number;
    max_trades_per_day: number;
    max_capital: number;
  };
  status: 'DRAFT' | 'BACKTESTING' | 'ACTIVE' | 'PAUSED';
}

interface StrategyBuilderProps {
  onSave?: (strategy: Strategy) => void;
  onBacktest?: (strategy: Strategy) => void;
  onActivate?: (strategy: Strategy) => void;
  initialStrategy?: Strategy;
}

export function StrategyBuilder({ onSave, onBacktest, onActivate, initialStrategy }: StrategyBuilderProps) {
  const [instrument, setInstrument] = useState(initialStrategy?.conditions[0]?.instrument || 'RELIANCE');
  const [conditionType, setConditionType] = useState(initialStrategy?.conditions[0]?.type || 'PRICE_CROSS_ABOVE');
  const [threshold, setThreshold] = useState(initialStrategy?.conditions[0]?.threshold || 2500);
  const [actionType, setActionType] = useState(initialStrategy?.actions[0]?.type || 'BUY');
  const [quantityType, setQuantityType] = useState(initialStrategy?.actions[0]?.quantity_type || 'SHARES');
  const [quantity, setQuantity] = useState(initialStrategy?.actions[0]?.quantity || 10);
  const [stopLoss, setStopLoss] = useState(initialStrategy?.risk_params?.stop_loss_pct || 2);
  const [takeProfit, setTakeProfit] = useState(initialStrategy?.risk_params?.take_profit_pct || 5);
  const [maxTrades, setMaxTrades] = useState(initialStrategy?.risk_params?.max_trades_per_day || 3);
  const [maxCapital, setMaxCapital] = useState(initialStrategy?.risk_params?.max_capital || 25000);

  const instruments = ['RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICI', 'IRCTC', 'RVNL', 'TATAMOTORS'];
  
  const conditionTypes = [
    { value: 'PRICE_CROSS_ABOVE', label: 'Price crosses above' },
    { value: 'PRICE_CROSS_BELOW', label: 'Price crosses below' },
    { value: 'PERCENT_CHANGE_UP', label: '% change above' },
    { value: 'PERCENT_CHANGE_DOWN', label: '% change below' },
    { value: 'VOLUME_SPIKE', label: 'Volume spike above' },
  ];

  const buildStrategy = (): Strategy => ({
    id: initialStrategy?.id || `strategy-${Date.now()}`,
    name: `${instrument} ${conditionType.split('_').join(' ')}`,
    conditions: [{
      type: conditionType,
      instrument,
      threshold
    }],
    actions: [{
      type: actionType,
      quantity_type: quantityType,
      quantity
    }],
    risk_params: {
      stop_loss_pct: stopLoss,
      take_profit_pct: takeProfit,
      max_trades_per_day: maxTrades,
      max_capital: maxCapital
    },
    status: 'DRAFT'
  });

  const handleSave = () => {
    const strategy = buildStrategy();
    onSave?.(strategy);
  };

  const handleBacktest = () => {
    const strategy = buildStrategy();
    onBacktest?.(strategy);
  };

  const handleActivate = () => {
    const strategy = buildStrategy();
    onActivate?.(strategy);
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* IF Section */}
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-lg">IF</h3>
            <Badge variant="outline">Trigger Condition</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Instrument</Label>
                <Select value={instrument} onValueChange={setInstrument}>
                  <SelectTrigger>
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
                <Label>Condition</Label>
                <Select value={conditionType} onValueChange={setConditionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionTypes.map(ct => (
                      <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Threshold Value</Label>
              <Input 
                type="number" 
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                placeholder="₹2,500"
              />
            </div>
          </div>
        </div>

        {/* THEN Section */}
        <div className="border-l-4 border-green-500 pl-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-lg">THEN</h3>
            <Badge variant="outline">Action</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Action</Label>
                <Select value={actionType} onValueChange={setActionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">BUY</SelectItem>
                    <SelectItem value="SELL">SELL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Quantity Type</Label>
                <Select value={quantityType} onValueChange={setQuantityType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SHARES">Shares</SelectItem>
                    <SelectItem value="CAPITAL">Capital (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Quantity</Label>
              <Input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder={quantityType === 'SHARES' ? '10 shares' : '₹25,000'}
              />
            </div>
          </div>
        </div>

        {/* Risk Limits Section */}
        <div className="border-l-4 border-red-500 pl-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-lg">RISK LIMITS</h3>
            <Badge variant="outline">Required</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Stop Loss (%)</Label>
              <Input 
                type="number" 
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                placeholder="2"
                step="0.1"
              />
            </div>

            <div>
              <Label>Take Profit (%)</Label>
              <Input 
                type="number" 
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                placeholder="5"
                step="0.1"
              />
            </div>

            <div>
              <Label>Max Trades/Day</Label>
              <Input 
                type="number" 
                value={maxTrades}
                onChange={(e) => setMaxTrades(Number(e.target.value))}
                placeholder="3"
              />
            </div>

            <div>
              <Label>Max Capital at Risk (₹)</Label>
              <Input 
                type="number" 
                value={maxCapital}
                onChange={(e) => setMaxCapital(Number(e.target.value))}
                placeholder="25,000"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleSave} className="gap-2">
            <Save className="size-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={handleBacktest} className="gap-2">
            <BarChart3 className="size-4" />
            Backtest
          </Button>
          <Button onClick={handleActivate} className="gap-2 bg-green-600 hover:bg-green-700">
            <Rocket className="size-4" />
            Activate Strategy
          </Button>
        </div>
      </div>
    </Card>
  );
}
