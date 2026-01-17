export const FLAWS = [
    {
        id: 1,
        title: "Generic Error Messaging",
        severity: "Medium-High",
        risk: "Trust Erosion",
        observed: "The 'Technicals' tab displays a generic 'Something went wrong! Internal Server Error' message with no recovery guidance.",
        impact: "Breaks trust during high-stakes moments; users don't know whether to retry, wait, or abandon.",
        rootCause: "Backend returns catch-all 500 error; frontend lacks error stratification logic.",
        screenshot: "/Screenshot_1.png"
    },
    {
        id: 2,
        title: "UI Hierarchy Breakdown in Options Trading",
        severity: "High",
        risk: "Cognitive Friction",
        observed: "Global navbar remains visible during options trading, crowding trade-critical controls like expiry filters and Buy/Sell buttons.",
        impact: "Increases cognitive load during high-focus tasks; compares unfavorably to Zerodha's modal approach.",
        rootCause: "No semantic screen zoning for 'execution mode' vs 'browsing mode'.",
        screenshot: "/Screenshot_2.png"
    },
    {
        id: 3,
        title: "Cold Start Lag on High-End Devices",
        severity: "High",
        risk: "Performance Perception",
        observed: "App launch takes noticeably longer than competitors even on Pixel 8 Pro with 100 Mbps Wi-Fi.",
        impact: "Poor first impression; creates anxiety during market open; erodes confidence.",
        rootCause: "Heavy cold-start hydration blocking UI rendering.",
        screenshot: null
    },
    {
        id: 4,
        title: "Margin Field Flicker Without Loading State",
        severity: "Medium-High",
        risk: "Execution Anxiety",
        observed: "When switching between Delivery/Intraday, the 'Margin Required' field briefly shows '--' before populating.",
        impact: "Creates momentary doubt about available funds; may cause trade hesitation.",
        rootCause: "Async margin calculation without optimistic UI placeholder.",
        screenshot: "/Screenshot_3.png"
    },
    {
        id: 5,
        title: "Inconsistent Order Lifecycle & Cancel UX",
        severity: "High",
        risk: "Trade Reliability",
        observed: "Orders placeable with ₹0 balance (rejected later); 'AMO' shown without explanation; cancel button location varies.",
        impact: "False sense of order success; confuses new traders; breaks interaction patterns.",
        rootCause: "Missing pre-submission validation; insufficient progressive disclosure.",
        screenshot: "/Screenshot_4.png"
    },
    {
        id: 6,
        title: "Desktop OAuth Branding Leak",
        severity: "Medium",
        risk: "Brand Dilution",
        observed: "Desktop login screen shows default 'Sign in with Google' Firebase UI without custom branding.",
        impact: "Users question platform legitimacy; looks like a generic student project rather than a financial institution.",
        rootCause: "Default Firebase UI used without white-label customization.",
        screenshot: "/Screenshot_5.png"
    }
];

export const IMPACT_METRICS = [
    { label: "Support Tickets", value: "Reduced", sublabel: "Error-related queries", color: "text-red-600" },
    { label: "Session Continuity", value: "Improved", sublabel: "After error states", color: "text-green-600" },
    { label: "Error Recovery", value: "Significant", sublabel: "Improvement targeted", color: "text-blue-600" },
    { label: "User Trust", value: "Enhanced", sublabel: "Reliability perception", color: "text-purple-600" }
];

export const PRD_DATA = {
    executionSummary: "This document details five feature enhancements designed to address critical trust and usability gaps identified in the Pocketful trading platform audit. The primary focus is on the Error Recovery Wizard—a high-impact feature that transforms generic error states into intelligent, actionable recovery experiences.",
    features: [
        {
            id: "ERW",
            title: "Error Recovery Wizard",
            priority: "P0",
            flawAddressed: "Flaw #1: Generic Error Messaging",
            problem: "When Pocketful encounters API failures or data unavailability, users see a generic 'Something went wrong! Internal Server Error' message with no recovery guidance.",
            valueProp: "Transform every error into an opportunity to demonstrate platform reliability. Diagnose root causes, explain in plain language, and offer contextual recovery actions.",
            successMetrics: [
                { metric: "Error Recovery Rate", description: "% of users completing intended action after error", targetM6: "Significant improvement" },
                { metric: "Session Continuation", description: "% of sessions continuing after error", targetM6: "Reduced abandonment" },
                { metric: "Support Ticket Volume", description: "Error-related support queries", targetM6: "Meaningful reduction" }
            ],
            userStories: [
                { id: "ERW-001", story: "As a trader, I want to understand WHY an error occurred so I can decide whether to retry.", priority: "P0" },
                { id: "ERW-002", story: "As a user experiencing an error, I want to see alternative actions so I'm not stuck.", priority: "P0" },
                { id: "ERW-003", story: "As a user on poor network, I want to know if the issue is on my end.", priority: "P1" },
                { id: "ERW-004", story: "During market hours, I want the wizard to prioritize speed.", priority: "P1" }
            ],
            techSpecs: {
                api: "GET /api/v2/error-context/{error_id}",
                payloads: [
                    "error_type: 'DATA_UNAVAILABLE' | 'NETWORK_TIMEOUT' | 'SERVER_ERROR'",
                    "user_message: string (plain-English explanation)",
                    "alternatives: [{ action_type, label, deep_link }]",
                    "estimated_resolution_seconds: number | null"
                ]
            }
        },
        {
            id: "SOA",
            title: "Smart Order Assistant",
            priority: "P2",
            flawAddressed: "Gap: Personalization & Intelligence",
            problem: "Retail traders lack automation tools, leading to emotional trading and missed opportunities.",
            valueProp: "Compliant conditional orders: simple IF-THEN rules, bracket orders, and order templates—positioned within SEBI guidelines.",
            successMetrics: [
                { metric: "Conditional Order Usage", description: "Users setting up conditional orders", targetM6: "Adoption" },
                { metric: "Bracket Order Completion", description: "Stop-loss/take-profit attached to orders", targetM6: "Increased" },
                { metric: "Template Reuse", description: "Users reusing saved order templates", targetM6: "Enabled" }
            ],
            userStories: [
                { id: "SOA-001", story: "I want to set 'Buy if price drops 5%' without coding.", priority: "P0" },
                { id: "SOA-002", story: "I want bracket orders with pre-set stop-loss/take-profit.", priority: "P0" },
                { id: "SOA-003", story: "I want to save and reuse my frequent order setups.", priority: "P1" }
            ],
            techSpecs: {
                api: "POST /api/v2/conditional-orders",
                payloads: [
                    "condition: { type: 'PRICE_BELOW' | 'PRICE_ABOVE', threshold: number }",
                    "action: { type: 'BUY' | 'SELL', quantity: number }",
                    "bracket: { stop_loss_pct, take_profit_pct } | null"
                ]
            }
        },
        {
            id: "TSE",
            title: "Transparent Status Explainers",
            priority: "P1",
            flawAddressed: "Flaw #5 (Jargon) & Gap: Cognitive Clarity",
            problem: "Terms like '0.0x Subscribed', 'Delta 0.65', and 'AMO' appear without explanation, causing hesitation.",
            valueProp: "Inline tooltips with plain-English definitions, social proof, and actionable guidance.",
            successMetrics: [
                { metric: "User Confidence", description: "Self-reported confidence in decisions", targetM6: "Improved" },
                { metric: "IPO Application Rate", description: "Users applying after viewing explainer", targetM6: "Increased" },
                { metric: "Glossary Support Queries", description: "Queries asking 'what does X mean'", targetM6: "Reduced" }
            ],
            userStories: [
                { id: "TSE-001", story: "As a beginner, I want to know what '0.0x Subscribed' means for an IPO.", priority: "P0" },
                { id: "TSE-002", story: "As an options trader, I want Delta explained without leaving the order screen.", priority: "P1" }
            ],
            techSpecs: {
                api: "GET /api/v2/content/explainer/{term_id}",
                payloads: [
                    "term: 'IPO_SUBSCRIPTION' | 'DELTA' | 'AMO'",
                    "definition: string",
                    "social_proof: string | null"
                ]
            }
        },
        {
            id: "ROM",
            title: "Resilient Offline Mode",
            priority: "P1",
            flawAddressed: "Flaw #3 & Gap: Trust & Reliability",
            problem: "Users in tier-2/3 cities face white screens during network drops, causing panic and abandonment.",
            valueProp: "Three-tier offline architecture: cached critical data, progressive loading, and 'Lite Mode' for slow connections.",
            successMetrics: [
                { metric: "Low-Bandwidth Bounce Rate", description: "Sessions abandoned on slow networks", targetM6: "Reduced" },
                { metric: "App Load Success (2G)", description: "Successful loads on constrained networks", targetM6: "Improved" },
                { metric: "Offline Portfolio Access", description: "Users accessing cached data during outage", targetM6: "Enabled" }
            ],
            userStories: [
                { id: "ROM-001", story: "As a commuter, I want to view my portfolio even in a tunnel.", priority: "P0" },
                { id: "ROM-002", story: "As a user on 2G, I want 'Lite Mode' that loads text first.", priority: "P1" }
            ],
            techSpecs: {
                api: "SYNC /api/v2/offline-queue",
                payloads: [
                    "cached_portfolio: {...}",
                    "last_sync_timestamp: number",
                    "queued_orders: [...]"
                ]
            }
        },
        {
            id: "CASH",
            title: "Context-Aware Smart Home",
            priority: "P2",
            flawAddressed: "Gap: Personalization",
            problem: "All users see the same static interface regardless of intent, time, or context.",
            valueProp: "Adaptive home screen based on time-of-day (pre-market/live/post-market), user segment, and behavior patterns.",
            successMetrics: [
                { metric: "Time-to-Primary-Action", description: "Time from launch to core action", targetM6: "Reduced" },
                { metric: "Daily Engagement", description: "Active engagement rate", targetM6: "Improved" },
                { metric: "Feature Discovery", description: "Users finding new features", targetM6: "Increased" }
            ],
            userStories: [
                { id: "CASH-001", story: "At 9:15 AM, I want an action-focused layout for quick trades.", priority: "P0" },
                { id: "CASH-002", story: "As an investor, I want portfolio performance first, not charts.", priority: "P1" }
            ],
            techSpecs: {
                api: "GET /api/v2/user-context/layout",
                payloads: [
                    "time_zone: 'IST'",
                    "market_phase: 'PRE' | 'LIVE' | 'POST'",
                    "user_segment: 'TRADER' | 'INVESTOR'"
                ]
            }
        }
    ],
    roadmap: {
        now: [
            { item: "Error Recovery Wizard (MVP)", owner: "Product + Eng" },
            { item: "Error Classification Service", owner: "Backend" },
            { item: "Wizard UI (Mobile)", owner: "Frontend" }
        ],
        next: [
            { item: "Transparent Status Explainers", owner: "Frontend" },
            { item: "Offline Mode (Tier 1)", owner: "Mobile" },
            { item: "Conditional Orders (Basic)", owner: "Backend" }
        ],
        later: [
            { item: "Smart Home Personalization", owner: "Product" },
            { item: "Offline Mode (Full)", owner: "Mobile + Backend" },
            { item: "Vernacular Support", owner: "Growth" }
        ]
    }
};

export const UAT_SCENARIOS = [
    { id: "UAT-01", scenario: "Trigger 500 error on Technicals tab", expected: "Wizard appears within 500ms with categorized message" },
    { id: "UAT-02", scenario: "Trigger error on poor network (2G)", expected: "Network issue detected; appropriate guidance shown" },
    { id: "UAT-03", scenario: "Trigger >3 errors in 30 seconds", expected: "Consolidated error view appears" },
    { id: "UAT-04", scenario: "Select 'View Similar' alternative", expected: "Navigates to similar instrument successfully" },
    { id: "UAT-05", scenario: "Use wizard with screen reader", expected: "All elements announced correctly (WCAG 2.1 AA)" },
    { id: "UAT-06", scenario: "Error during market hours (9:15-3:30)", expected: "Wizard prioritizes speed, loads quickly" }
];

export const COMPETITOR_ANALYSIS = {
    marketPositioning: [
        {
            name: "Zerodha",
            share: "~40%",
            strength: "Execution reliability, Varsity education, trader-first platform",
            weakness: "Intimidating for beginners, minimal hand-holding",
            persona: "Experienced traders, active F&O participants"
        },
        {
            name: "Groww",
            share: "~25%",
            strength: "Beautiful UI, beginner-friendly, seamless MF integration",
            weakness: "Limited advanced features, lacks depth for serious traders",
            persona: "First-time investors, SIP-focused, millennials"
        },
        {
            name: "Pocketful",
            share: "Emerging",
            strength: "Hybrid positioning, PACE Group infrastructure, algo DNA",
            weakness: "Execution reliability gaps, unclear differentiation",
            persona: "Bridging beginners and advanced traders"
        }
    ],
    gapAnalysis: [
        {
            category: "Trust & Reliability",
            zerodha: 5,
            groww: 4,
            pocketful: 2,
            impact: "Critical foundation—traders won't risk money on unreliable platforms."
        },
        {
            category: "Cognitive Clarity",
            zerodha: 3,
            groww: 5,
            pocketful: 2,
            impact: "Users feel overwhelmed, leading to low engagement and abandonment."
        },
        {
            category: "Personalization",
            zerodha: 1,
            groww: 3,
            pocketful: 2,
            impact: "Opportunity to differentiate with adaptive, intelligent experiences."
        }
    ],
    strategicOpportunities: [
        {
            title: "The Reliable Innovator",
            description: "Own 'Reliable Innovation'—cutting-edge features that actually work. Fix foundations first, then layer differentiation.",
            proofPoints: ["PACE institutional infrastructure", "Same-day payout capability"]
        },
        {
            title: "The Teaching Broker",
            description: "Serve the next 100M Indians from tier-2/3 cities. Become the broker that explains while you trade.",
            proofPoints: ["Transparent Status Explainers", "Educational workshops integration"]
        },
        {
            title: "Leverage Underutilized Assets",
            description: "Surface PACE brand at high-trust moments; integrate dedicated RM access during errors.",
            proofPoints: ["RM access (Zerodha doesn't offer)", "300+ PACE locations"]
        }
    ]
};

export const RACI_MATRIX = [
    { deliverable: "PRD & Requirements", pm: "R/A", eng: "C", design: "C", qa: "I" },
    { deliverable: "Error Taxonomy Design", pm: "C", eng: "R/A", design: "I", qa: "C" },
    { deliverable: "Wizard UI Design", pm: "A", eng: "I", design: "R", qa: "I" },
    { deliverable: "Implementation", pm: "C", eng: "R/A", design: "I", qa: "C" },
    { deliverable: "Test Cases", pm: "R", eng: "C", design: "I", qa: "A" },
    { deliverable: "Rollout Decision", pm: "R/A", eng: "C", design: "I", qa: "C" }
];

export const KYC_JOURNEY = {
    summary: {
        totalTime: "~17 minutes",
        platform: "Android (Pixel 8 Pro)",
        network: "100 Mbps Wi-Fi / 5G"
    },
    steps: [
        { step: 1, action: "App Download & Install", time: "~2 min", experience: "Standard Play Store flow" },
        { step: 2, action: "Mobile Number Verification", time: "~1 min", experience: "OTP received promptly" },
        { step: 3, action: "PAN & Aadhaar Entry", time: "~3 min", experience: "Auto-fetch worked well" },
        { step: 4, action: "e-Sign (DigiLocker)", time: "~5 min", experience: "Smooth redirect flow" },
        { step: 5, action: "Bank Account Linking", time: "~4 min", experience: "UPI autopay straightforward" },
        { step: 6, action: "Video KYC / Selfie", time: "~2 min", experience: "Quick capture, no retries" }
    ],
    highlights: [
        "Auto-fetch from PAN/Aadhaar reduced manual entry",
        "Clear progress indicator throughout",
        "DigiLocker integration was seamless",
        "Same-day activation"
    ],
    painPoints: [
        { issue: "No estimated time shown at start", suggestion: "Display 'Estimated time: 15-20 minutes'" },
        { issue: "Video KYC instructions were text-heavy", suggestion: "Add short video demo or animated guide" },
        { issue: "Bank linking showed 'processing' for ~30s", suggestion: "Add progress animation" },
        { issue: "No option to save and resume later", suggestion: "Enable draft state persistence" }
    ]
};
