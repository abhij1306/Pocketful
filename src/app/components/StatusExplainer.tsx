import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/app/components/ui/popover';

interface StatusExplainerProps {
    term: string;
    definition: string;
    context?: string;
    actionLabel?: string;
    onAction?: () => void;
}

/**
 * StatusExplainer Component (Phase 2 - "Cognitive Clarity")
 * 
 * Provides inline, plain-English definitions for complex financial terms.
 * Helps transition "Raj" (Beginner Persona) to a confident trader.
 */
export const StatusExplainer: React.FC<StatusExplainerProps> = ({
    term,
    definition,
    context,
    actionLabel,
    onAction
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <span
                    className="inline-flex items-center gap-1 cursor-help border-b border-dotted border-muted-foreground/50 hover:border-primary transition-colors group"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row clicks
                    }}
                >
                    {term}
                    <Info className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 overflow-hidden shadow-lg border-primary/20 bg-white" align="start">
                <div className="bg-primary/5 p-3 border-b border-primary/10 flex justify-between items-start">
                    <div className="font-semibold text-sm flex items-center gap-2 text-primary">
                        <Info className="h-4 w-4" />
                        {term}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mr-1 -mt-1 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                        }}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>

                <div className="p-4 space-y-3">
                    <p className="text-sm text-foreground/90 leading-relaxed">
                        {definition}
                    </p>

                    {context && (
                        <div className="bg-muted p-2.5 rounded-md text-xs text-muted-foreground italic">
                            "💡 {context}"
                        </div>
                    )}

                    {actionLabel && onAction && (
                        <Button
                            size="sm"
                            className="w-full mt-2 text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAction();
                                setOpen(false);
                            }}
                        >
                            {actionLabel}
                        </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};
