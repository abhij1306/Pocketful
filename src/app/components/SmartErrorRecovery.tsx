import { X, RefreshCw, Database, Wifi, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SmartErrorRecoveryProps {
    errorType: 'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR' | 'RATE_LIMITED';
    instrument?: string;
    onClose: () => void;
    onRecover: () => void;
}

interface ErrorConfig {
    title: string;
    message: string;
    icon: React.ReactNode;
    estimatedTime?: number;
    actions: { label: string; action: string; primary?: boolean }[];
}

export function SmartErrorRecovery({
    errorType,
    instrument = 'IRCTC',
    onClose,
    onRecover
}: SmartErrorRecoveryProps) {
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);

    // Pre-computed error configurations (Simulated Pre-fetching)
    const errorConfigs: Record<string, ErrorConfig> = {
        DATA_UNAVAILABLE: {
            title: 'Data Temporarily Unavailable',
            message: `Technical indicators for ${instrument} are being refreshed.`,
            estimatedTime: 30,
            icon: <Database className="size-8 text-amber-500" />,
            actions: [
                { label: '🔄 Retry (Instant)', action: 'RETRY', primary: true },
                { label: '📊 View Similar: RVNL', action: 'SIMILAR' },
                { label: '📈 Use Cached Data', action: 'CACHED' },
            ]
        },
        NETWORK_TIMEOUT: {
            title: 'Connection Issue',
            message: 'We are having trouble reaching the server. Your portfolio data is safe.',
            icon: <Wifi className="size-8 text-red-500" />,
            actions: [
                { label: '🔄 Retry Connection', action: 'RETRY', primary: true },
                { label: '📉 View Offline Portfolio', action: 'CACHED' },
            ]
        },
        SERVER_ERROR: {
            title: 'System Maintenance',
            message: 'Our systems are experiencing high load. Use the alternative link below.',
            estimatedTime: 60,
            icon: <AlertCircle className="size-8 text-red-500" />,
            actions: [
                { label: '🔄 Retry', action: 'RETRY', primary: true },
                { label: '💬 Contact Support', action: 'SUPPORT' },
            ]
        },
        RATE_LIMITED: {
            title: 'Traffic Optimization',
            message: 'We are optimizing your data feed. Please wait a moment.',
            estimatedTime: 5,
            icon: <RefreshCw className="size-8 text-blue-500" />,
            actions: [
                { label: '⏳ Retry Now', action: 'RETRY', primary: true },
                { label: '📈 View Cached Data', action: 'CACHED' },
            ]
        }
    };

    const config = errorConfigs[errorType];

    useEffect(() => {
        // Immediate render optimization
        if (config?.estimatedTime) {
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
    }, [config?.estimatedTime]);

    const handleAction = (action: string) => {
        if (action === 'RETRY') {
            setIsRetrying(true);
            // LATENCY OPTIMIZATION: Reduced artificial delay from 1500ms to 300ms for "snappy" feel
            setTimeout(() => {
                onRecover();
            }, 300);
        } else {
            onRecover();
        }
    };

    if (!config) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
            {/* Mobile Bottom Sheet / Actionable Toast */}
            <div
                className="bg-white w-full sm:max-w-md rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Compact */}
                <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-50 p-2 rounded-xl">
                            {config.icon}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 leading-tight">
                                {config.title}
                            </h2>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Smart Recovery
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {config.message}
                    </p>

                    {/* Quick Actions - Grid Layout for Speed */}
                    <div className="grid gap-3">
                        {config.actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => handleAction(action.action)}
                                disabled={isRetrying}
                                className={`
                  w-full px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-between transition-all
                  ${action.primary
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-200'
                                        : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 active:scale-[0.98]'
                                    }
                  ${isRetrying ? 'opacity-70 cursor-wait' : ''}
                `}
                            >
                                <div className="flex items-center gap-2">
                                    {isRetrying && action.action === 'RETRY' ? (
                                        <RefreshCw className="size-4 animate-spin" />
                                    ) : null}
                                    {action.label}
                                </div>
                                {action.primary && !isRetrying && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-medium">Fastest</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-medium">System Latency: 42ms</span>
                    <button
                        onClick={onRecover}
                        className="text-xs text-blue-600 hover:text-blue-700 font-bold"
                    >
                        Report Issue
                    </button>
                </div>
            </div>
        </div>
    );
}
