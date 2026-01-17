import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, Zap, BarChart2 } from 'lucide-react';

interface TemplateStrategy {
  id: string;
  name: string;
  description: string;
  category: 'MOMENTUM' | 'MEAN_REVERSION' | 'BREAKOUT' | 'TREND_FOLLOWING' | 'VOLATILITY';
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  avgWinRate: number;
  avgReturn: number;
}

interface StrategyTemplatesProps {
  onSelectTemplate?: (templateId: string) => void;
}

const templates: TemplateStrategy[] = [
  {
    id: 'momentum-1',
    name: 'Momentum Surge',
    description: 'Buy when price crosses above 20-day moving average with volume confirmation',
    category: 'MOMENTUM',
    icon: <TrendingUp className="size-6 text-green-600" />,
    difficulty: 'Beginner',
    avgWinRate: 62,
    avgReturn: 7.4
  },
  {
    id: 'mean-reversion-1',
    name: 'Oversold Bounce',
    description: 'Buy when RSI drops below 30, sell when it rises above 70',
    category: 'MEAN_REVERSION',
    icon: <Activity className="size-6 text-blue-600" />,
    difficulty: 'Intermediate',
    avgWinRate: 58,
    avgReturn: 5.2
  },
  {
    id: 'breakout-1',
    name: 'Range Breakout',
    description: 'Enter when price breaks above 52-week high with strong volume',
    category: 'BREAKOUT',
    icon: <Zap className="size-6 text-amber-600" />,
    difficulty: 'Intermediate',
    avgWinRate: 54,
    avgReturn: 12.8
  },
  {
    id: 'trend-1',
    name: 'Trend Rider',
    description: 'Follow strong trends using 50-day and 200-day moving average crossover',
    category: 'TREND_FOLLOWING',
    icon: <TrendingUp className="size-6 text-purple-600" />,
    difficulty: 'Advanced',
    avgWinRate: 48,
    avgReturn: 15.3
  },
  {
    id: 'volatility-1',
    name: 'Volatility Capture',
    description: 'Trade Bollinger Band bounces in high volatility conditions',
    category: 'VOLATILITY',
    icon: <BarChart2 className="size-6 text-red-600" />,
    difficulty: 'Advanced',
    avgWinRate: 51,
    avgReturn: 9.7
  }
];

const difficultyColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-amber-100 text-amber-800',
  'Advanced': 'bg-red-100 text-red-800'
};

export function StrategyTemplates({ onSelectTemplate }: StrategyTemplatesProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Strategy Templates</h2>
        <p className="text-gray-600">Start with proven strategies and customize to your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                {template.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <Badge className={difficultyColors[template.difficulty]} variant="secondary">
                    {template.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs text-gray-500 mb-1">Avg Win Rate</p>
                <p className="text-xl font-bold text-green-600">{template.avgWinRate}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs text-gray-500 mb-1">Avg Return</p>
                <p className="text-xl font-bold text-blue-600">+{template.avgReturn}%</p>
              </div>
            </div>

            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => onSelectTemplate?.(template.id)}
            >
              Use This Template
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-gray-700">
          All templates are based on historical backtests. Always run your own backtest with your chosen 
          instruments and risk parameters before activating any strategy.
        </p>
      </Card>
    </div>
  );
}
