import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { StatusExplainer } from "./StatusExplainer";

export function TSEModal() {

    return (
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md p-0 bg-white border-none shadow-2xl rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="p-6 pb-2 border-b border-gray-100">
                <DialogTitle className="text-xl font-bold text-gray-900">Transparent Status Explainers</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">Interactive Concept Demo</DialogDescription>
            </DialogHeader>

            <div className="p-8 bg-gray-50/50">
                {/* IPO Card Mockup */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-sm mx-auto relative">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">IREDA IPO</h3>
                            <p className="text-xs text-gray-500 font-medium">Energy & Power</p>
                        </div>
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">Open</Badge>
                    </div>

                    <div className="mb-6 relative">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-600">Subscription Status</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <h4 className="text-2xl font-bold text-gray-900 leading-none">0.0x Subscribed</h4>
                            <StatusExplainer
                                term=""
                                definition="Subscription rate shows demand vs available shares. A value < 1.0x means shares are still available."
                                context="2,847 users have applied • 3 days left"
                                actionLabel="View Details"
                                onAction={() => console.log('View details clicked')}
                            />
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-6 flex items-center justify-between text-xs">
                            <span className="text-gray-500">Min Investment</span>
                            <span className="font-bold text-gray-900">₹14,850</span>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">Apply Now</Button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6 max-w-xs mx-auto">
                        Hover or click the info icon to see the "Plain English" explainer in action.
                    </p>
                </div>
            </div>
        </DialogContent>
    );
}
