import { AlertCircle, RefreshCw, TrendingUp, Database, MessageCircle, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { useState, useEffect } from 'react';

interface ErrorRecoveryWizardProps {
  errorType: 'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED';
  instrument?: string;
  onClose: () => void;
  onRecover: () => void;
}

interface ErrorConfig {
  icon: React.ReactNode;
  title: string;
  message: string;
  estimatedTime?: number;
  actions: Array<{
    type: 'RETRY' | 'SIMILAR_INSTRUMENT' | 'CACHED_DATA' | 'SUPPORT';
    label: string;
    icon: React.ReactNode;
    primary?: boolean;
  }>;
}

export function ErrorRecoveryWizard({ 
  errorType, 
  instrument = 'IRCTC',
  onClose,
  onRecover 
}: ErrorRecoveryWizardProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const errorConfigs: Record<string, ErrorConfig> = {
    DATA_UNAVAILABLE: {
      icon: <Database className="size-6 text-amber-600" />,
      title: 'Data Temporarily Unavailable',
      message: `Technical indicators for ${instrument} are being updated. This usually takes ~30s.`,
      estimatedTime: 30,
      actions: [
        { type: 'RETRY', label: 'Retry in 30s', icon: <RefreshCw className="size-4" />, primary: true },
        { type: 'SIMILAR_INSTRUMENT', label: 'View Similar: RVNL', icon: <TrendingUp className="size-4" /> },
        { type: 'CACHED_DATA', label: 'Use Cached Data', icon: <Database className="size-4" /> },
      ]
    },
    NETWORK_TIMEOUT: {
      icon: <AlertCircle className="size-6 text-red-600" />,
      title: 'Network Connection Issue',
      message: 'Unable to reach our servers. Please check your internet connection.',
      actions: [
        { type: 'RETRY', label: 'Retry Now', icon: <RefreshCw className="size-4" />, primary: true },
        { type: 'CACHED_DATA', label: 'View Offline Data', icon: <Database className="size-4" /> },
      ]
    },
    SERVER_ERROR: {
      icon: <AlertCircle className="size-6 text-red-600" />,
      title: 'Service Temporarily Unavailable',
      message: 'Our servers are experiencing high load. We\'re working to resolve this.',
      estimatedTime: 60,
      actions: [
        { type: 'RETRY', label: 'Retry in 60s', icon: <RefreshCw className="size-4" />, primary: true },
        { type: 'SUPPORT', label: 'Contact Support', icon: <MessageCircle className="size-4" /> },
      ]
    },
    RATE_LIMITED: {
      icon: <AlertCircle className="size-6 text-amber-600" />,
      title: 'Too Many Requests',
      message: 'You\'ve made too many requests. Please wait a moment before trying again.',
      estimatedTime: 10,
      actions: [
        { type: 'RETRY', label: 'Retry in 10s', icon: <RefreshCw className="size-4" />, primary: true },
        { type: 'CACHED_DATA', label: 'View Cached Data', icon: <Database className="size-4" /> },
      ]
    }
  };

  const config = errorConfigs[errorType];

  useEffect(() => {
    if (config.estimatedTime) {
      setCountdown(config.estimatedTime);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [config.estimatedTime]);

  const handleAction = (actionType: string) => {
    if (actionType === 'RETRY') {
      setIsRetrying(true);
      setTimeout(() => {
        onRecover();
      }, 1500);
    } else {
      onRecover();
    }
  };

  const progressValue = countdown && config.estimatedTime 
    ? ((config.estimatedTime - countdown) / config.estimatedTime) * 100 
    : 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          {config.icon}
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{config.title}</h3>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {config.message}
        </p>

        {countdown !== null && countdown > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Estimated wait time</span>
              <span>{countdown}s remaining</span>
            </div>
            <Progress value={progressValue} className="h-1" />
          </div>
        )}

        <div className="space-y-2 mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quick Actions</p>
          {config.actions.map((action, index) => (
            <Button
              key={index}
              variant={action.primary ? "default" : "outline"}
              className={`w-full justify-start gap-2 ${action.primary ? 'bg-black text-white hover:bg-gray-800' : ''}`}
              onClick={() => handleAction(action.type)}
              disabled={isRetrying || (action.type === 'RETRY' && countdown !== null && countdown > 0)}
            >
              {isRetrying && action.type === 'RETRY' ? (
                <>
                  <RefreshCw className="size-4 animate-spin" />
                  <span>Retrying...</span>
                </>
              ) : (
                <>
                  {action.icon}
                  <span>{action.label}</span>
                </>
              )}
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <MessageCircle className="size-4" />
            <span>Report this issue</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
