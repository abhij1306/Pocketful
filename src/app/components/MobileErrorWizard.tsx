import { X, RefreshCw, TrendingUp, Database, Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';

interface MobileErrorWizardProps {
  errorType: 'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED';
  instrument?: string;
  onClose: () => void;
  onRecover: () => void;
}

export function MobileErrorWizard({ 
  errorType, 
  instrument = 'IRCTC',
  onClose,
  onRecover 
}: MobileErrorWizardProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const errorConfigs = {
    DATA_UNAVAILABLE: {
      title: 'Data Temporarily Unavailable',
      message: `Technical indicators for ${instrument} are being updated. This usually takes ~30 seconds.`,
      estimatedTime: 30,
      icon: '⚠️',
      actions: [
        { label: '🔄 Retry in 30s', action: 'RETRY', primary: true },
        { label: '📊 View Similar: RVNL', action: 'SIMILAR' },
        { label: '📈 Use Cached Data', action: 'CACHED' },
      ]
    },
    NETWORK_TIMEOUT: {
      title: 'Network Connection Issue',
      message: 'Unable to reach our servers. Please check your internet connection and try again.',
      icon: '🌐',
      actions: [
        { label: '🔄 Retry Now', action: 'RETRY', primary: true },
        { label: '📱 Check Network Settings', action: 'NETWORK' },
      ]
    },
    SERVER_ERROR: {
      title: 'Something went wrong!',
      message: 'We\'re experiencing technical difficulties. Our team has been notified and is working to resolve this.',
      estimatedTime: 60,
      icon: '❌',
      actions: [
        { label: '🔄 Retry', action: 'RETRY', primary: true },
        { label: '💬 Contact Support', action: 'SUPPORT' },
      ]
    },
    RATE_LIMITED: {
      title: 'Too Many Requests',
      message: 'You\'ve made too many requests in a short time. Please wait a moment before trying again.',
      estimatedTime: 10,
      icon: '⏱️',
      actions: [
        { label: '⏳ Wait & Retry', action: 'RETRY', primary: true },
        { label: '📈 View Cached Data', action: 'CACHED' },
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

  const handleAction = (action: string) => {
    if (action === 'RETRY') {
      setIsRetrying(true);
      setTimeout(() => {
        onRecover();
      }, 1500);
    } else {
      onRecover();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
      {/* Mobile Bottom Sheet Style */}
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom duration-300 sm:animate-in sm:fade-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl mb-2">{config.icon}</div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="size-5" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {config.title}
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className="text-gray-600 mb-6 leading-relaxed">
            {config.message}
          </p>

          {/* Countdown Progress */}
          {countdown !== null && countdown > 0 && (
            <div className="mb-6 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Estimated wait time</span>
                <span className="text-sm font-semibold text-gray-900">{countdown}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${config.estimatedTime ? ((config.estimatedTime - countdown) / config.estimatedTime) * 100 : 100}%` 
                  }}
                />
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </p>
            {config.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleAction(action.action)}
                disabled={isRetrying || (action.action === 'RETRY' && countdown !== null && countdown > 0)}
                className={`
                  w-full px-4 py-4 rounded-xl font-medium text-left transition-all
                  ${action.primary 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm' 
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                  }
                  ${(isRetrying || (action.action === 'RETRY' && countdown !== null && countdown > 0)) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isRetrying && action.action === 'RETRY' ? (
                  <span className="flex items-center">
                    <RefreshCw className="size-4 mr-2 animate-spin" />
                    Retrying...
                  </span>
                ) : (
                  action.label
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={onRecover}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            💬 Report this issue
          </button>
        </div>
      </div>
    </div>
  );
}
