// USER PERSONAS - Who we're building for
export const PERSONAS = [
    {
        id: 'priya',
        name: 'Priya Sharma',
        age: 28,
        title: 'Active F&O Trader',
        location: 'Mumbai',
        tradingFrequency: '10+ trades/week',
        portfolioSize: '₹15-25 Lakhs',
        description: 'Tech-savvy professional who trades F&O during market hours. Expects real-time reliability and zero friction during execution.',
        painPoints: [
            'Loses money when app errors delay action (Flaw #1)',
            'Cold start lag causes anxiety at market open (Flaw #3)',
            'Manual order execution while institutions use automation'
        ],
        needs: ['Speed', 'Reliability', 'Real-time data', 'Automation tools'],
        featureMapping: ['Smart Error Recovery', 'Smart Order Assistant'],
        quote: '"Every second of delay during market hours costs me money."',
        icon: '👩‍💼'
    },
    {
        id: 'raj',
        name: 'Raj Patel',
        age: 24,
        title: 'First-Time Investor',
        location: 'Pune',
        tradingFrequency: '2-3 trades/month',
        portfolioSize: '₹50K-2 Lakhs',
        description: 'Software engineer who started with MFs and is exploring stocks. Confused by trading jargon and needs guidance.',
        painPoints: [
            '"Internal Server Error" is scary with no explanation (Flaw #1)',
            'Doesn\'t understand "0.0x Subscribed", "Delta", "AMO"',
            'Overwhelmed by complex trading interfaces'
        ],
        needs: ['Education', 'Simplicity', 'Guidance', 'Confidence building'],
        featureMapping: ['Transparent Status Explainers', 'Context-Aware Smart Home'],
        quote: '"I don\'t know what half these terms mean. Am I doing this right?"',
        icon: '👨‍💻'
    },
    {
        id: 'amit',
        name: 'Amit Verma',
        age: 45,
        title: 'Tier-2 City Moderate Trader',
        location: 'Indore',
        tradingFrequency: '5-10 trades/week',
        portfolioSize: '₹8-15 Lakhs',
        description: 'Business owner who trades between meetings. Faces network issues and values human support when stuck.',
        painPoints: [
            'White screens during network drops (Flaw #3)',
            'Doesn\'t know if issue is his network or app',
            'Wants someone to talk to when confused'
        ],
        needs: ['Offline access', 'RM support', 'Vernacular options', 'Reliability'],
        featureMapping: ['Resilient Offline Mode', 'RM Integration'],
        quote: '"My internet isn\'t always reliable. The app should still work."',
        icon: '👨‍💼'
    }
];

// Why personas matter for Pocketful
export const PERSONA_INSIGHT = {
    headline: "Bridging the Gap Neither Competitor Serves",
    context: "India has 140M demat accounts but only ~30M active traders. Zerodha serves Priya but intimidates Raj. Groww serves Raj but limits Priya. Neither serves Amit well.",
    opportunity: "Pocketful can be the platform that grows WITH users—from Raj's first trade to Priya's algo strategies—while reaching Amit in tier-2 cities."
};

// TARGET BUSINESS METRICS - What we're optimizing for
export const TARGET_BUSINESS_METRICS = [
    {
        id: 'trust',
        name: 'Platform Trust',
        description: 'User confidence in app reliability during critical moments',
        indicator: 'Reduced error-related abandonment, fewer support tickets',
        color: 'blue' // Subtle blue for trust metrics
    },
    {
        id: 'engagement',
        name: 'Daily Engagement',
        description: 'Frequency and depth of user sessions',
        indicator: 'Time-to-action, session duration, return rate',
        color: 'green' // Subtle green for engagement
    },
    {
        id: 'accessibility',
        name: 'Market Accessibility',
        description: 'Reach to underserved segments (tier-2/3, beginners)',
        indicator: 'Offline success rate, jargon comprehension, RM utilization',
        color: 'purple' // Subtle purple for accessibility
    },
    {
        id: 'retention',
        name: 'User Retention',
        description: 'Long-term platform stickiness',
        indicator: 'Churn reduction, feature adoption, upgrade rate',
        color: 'amber' // Subtle amber for retention
    }
];

// FEATURE-PERSONA-METRIC MAPPING
export const FEATURE_MAPPING = {
    SER: {
        personas: ['priya', 'raj', 'amit'],
        metrics: ['trust', 'retention'],
        primaryPersona: 'priya'
    },
    SOA: {
        personas: ['priya'],
        metrics: ['engagement', 'retention'],
        primaryPersona: 'priya'
    },
    TSE: {
        personas: ['raj'],
        metrics: ['accessibility', 'engagement'],
        primaryPersona: 'raj'
    },
    ROM: {
        personas: ['amit'],
        metrics: ['accessibility', 'trust'],
        primaryPersona: 'amit'
    },
    CASH: {
        personas: ['priya', 'raj'],
        metrics: ['engagement', 'retention'],
        primaryPersona: 'priya'
    }
};

// Persona colors (subtle, muted tones)
export const PERSONA_COLORS = {
    priya: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    raj: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    amit: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' }
};

// Metric colors (subtle tones)
export const METRIC_COLORS = {
    trust: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400' },
    engagement: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-400' },
    accessibility: { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-400' },
    retention: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400' }
};

// RISK ASSESSMENT
export const RISK_ASSESSMENT = [
    {
        feature: 'Smart Error Recovery',
        featureId: 'SER',
        risks: [
            { type: 'Technical', description: 'Over-classifying errors could mislead users', mitigation: 'Conservative classification: Default to "Connection Issue" (System Blame) if ambiguous.' },
            { type: 'UX', description: 'Too many alternatives overwhelm users', mitigation: 'Limit to 2-3 options; A/B test for optimal count' }
        ]
    },
    {
        feature: 'Transparent Status Explainers',
        featureId: 'TSE',
        risks: [
            { type: 'Content', description: 'Outdated explanations erode trust', mitigation: 'Content review process; user feedback loop' }
        ]
    },
    {
        feature: 'Resilient Offline Mode',
        featureId: 'ROM',
        risks: [
            { type: 'Data Integrity', description: 'Stale data leads to poor decisions', mitigation: 'Clear timestamps; disable trading on old data' }
        ]
    },
    {
        feature: 'Smart Order Assistant',
        featureId: 'SOA',
        risks: [
            { type: 'Regulatory', description: 'SEBI may view as algo trading', mitigation: 'Legal review; frame as conditional orders' },
            { type: 'User Loss', description: 'Automation amplifies losses in volatility', mitigation: 'Mandatory stop-loss; position limits' }
        ]
    },
    {
        feature: 'Context-Aware Smart Home',
        featureId: 'CASH',
        risks: [
            { type: 'Privacy', description: 'Behavioral tracking raises concerns', mitigation: 'Transparent policy; opt-out; on-device processing' }
        ]
    }
];

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
    executionSummary: "This document details five feature enhancements designed to address critical trust and usability gaps identified in the Pocketful trading platform audit. The primary focus is on Smart Error Recovery—a high-impact feature that transforms generic error states into intelligent, actionable recovery experiences.",
    features: [
        {
            id: "SER",
            title: "Smart Error Recovery",
            priority: "P0",
            flawAddressed: "Flaw #1: Generic Error Messaging",
            problem: "When Pocketful encounters API failures, users see 'Something went wrong! Internal Server Error.' Priya (active trader) loses critical seconds; Raj (beginner) panics with no guidance.",
            valueProp: "Transform errors into opportunities: classify issues, explain in plain language, offer contextual recovery. Priya stays trading, Raj feels supported.",
            successMetrics: [
                { metric: "Error Recovery Rate", description: "% of users completing intended action after error", targetM6: "Significant improvement" },
                { metric: "Session Continuation", description: "% of sessions continuing after error", targetM6: "Reduced abandonment" },
                { metric: "Support Ticket Volume", description: "Error-related support queries", targetM6: "Meaningful reduction" }
            ],
            userStories: [
                { id: "SER-001", story: "As a trader, I want to understand WHY an error occurred so I can decide whether to retry.", priority: "P0" },
                { id: "SER-002", story: "As a user experiencing an error, I want to see alternative actions so I'm not stuck.", priority: "P0" },
                { id: "SER-003", story: "As a user on poor network, I want to know if the issue is on my end.", priority: "P1" },
                { id: "SER-004", story: "During market hours, I want the system to prioritize speed.", priority: "P1" }
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
            problem: "Priya (active trader) executes orders manually while institutions use automation. This leads to emotional trading and missed opportunities at critical price points.",
            valueProp: "Democratize smart trading: IF-THEN rules, bracket orders, and templates let Priya trade like an institution—fully SEBI compliant.",
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
            problem: "Raj (beginner) sees '0.0x Subscribed', 'Delta 0.65', and 'AMO' without understanding. Jargon causes hesitation and missed opportunities.",
            valueProp: "Make complexity accessible: inline tooltips with plain-English definitions and social proof help Raj make confident decisions.",
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
            problem: "Amit (tier-2 user) faces white screens during network drops while trading. The app becomes unusable just when he needs it most.",
            valueProp: "Expand to 100M underserved users: cached data, progressive loading, and 'Lite Mode' ensure Amit can always access his portfolio.",
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
            problem: "Priya needs quick-trade access at 9:15 AM, but sees the same layout as Raj who wants to check his MF SIPs at night.",
            valueProp: "Personalization that understands intent: Priya gets action-focused trading at market open; Raj sees portfolio analysis in the evening.",
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
            { item: "Smart Error Recovery (MVP)", owner: "Product + Eng" },
            { item: "Error Classification Service", owner: "Backend" },
            { item: "Recovery UI (Mobile)", owner: "Frontend" }
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
    { id: 'ER-001', userState: 'Active Trader', timeWindow: 'Market Hours', device: 'iOS', behavior: 'Simulate 500 Error -> Verify "System Maintenance" Bottom Sheet appears <100ms', priority: 'P0', status: 'Not Started' },
    { id: 'ER-002', userState: 'Commuter', timeWindow: 'Market Hours', device: 'Android', behavior: 'Simulate Network Timeout -> Verify "Connection Issue" message (System Blame)', priority: 'P0', status: 'Not Started' },
    { id: 'ER-003', userState: 'Active Trader', timeWindow: 'Pre-market', device: 'Web', behavior: 'Simulate Data Delay -> Verify "Instant Retry" option works', priority: 'P1', status: 'Not Started' },
    { id: 'ER-004', userState: 'New User', timeWindow: 'Any', device: 'Any', behavior: 'Simulate Rate Limit -> Verify "Traffic Optimization" friendly message', priority: 'P1', status: 'Not Started' },
    { id: 'ER-005', userState: 'Any', timeWindow: 'Any', device: 'Any', behavior: 'Ambiguous Error -> Verify default to "Connection Issue" (No User Blame)', priority: 'P0', status: 'Not Started' }
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

// DEEP COMPETITIVE ANALYSIS - Specific differentiators and exploitable advantages
export const DEEP_COMPETITIVE_ANALYSIS = {
    marketContext: {
        totalDematAccounts: '140M',
        activeTraders: '~30M',
        untappedMarket: '110M accounts not actively trading',
        nextWaveSource: 'Tier-2/3 cities with limited financial literacy'
    },
    appStoreRatings: {
        zerodha: { rating: 4.4, platform: 'Play Store', reviews: '1.2M+' },
        groww: { rating: 4.5, platform: 'Play Store', reviews: '2.1M+' },
        pocketful: { rating: 3.8, platform: 'Play Store', reviews: 'Growing' }
    },
    specificDifferentiators: [
        {
            id: 'rm-access',
            title: 'Dedicated Relationship Manager',
            status: 'Underutilized',
            pocketfulHas: true,
            zerodhaHas: false,
            growwHas: false,
            details: 'FREE dedicated RM for all customers - buried in marketing, not surfaced in app',
            opportunity: 'Integrate RM chat into error states and complex workflows. "Having trouble? Chat with your RM (Avg response: 2 mins)"',
            whyCompetitorsCant: 'Zerodha deliberately avoids RMs (cost structure). Groww offers call support but not dedicated RMs.',
            personaImpact: 'Amit (Tier-2 user) values human support when confused'
        },
        {
            id: 'pace-legacy',
            title: 'PACE Group Infrastructure',
            status: 'Underutilized',
            pocketfulHas: true,
            zerodhaHas: false,
            growwHas: false,
            details: '25+ years institutional trading experience, 300+ physical locations, same-day payout capability',
            opportunity: 'Surface "Powered by PACE" at high-trust moments. Show execution stats. During errors: "Your funds protected by PACE\'s 25-year track record"',
            whyCompetitorsCant: 'Groww and Zerodha are pure-play digital startups without institutional heritage.',
            personaImpact: 'All personas benefit from institutional credibility and trust signals'
        },
        {
            id: 'algo-dna',
            title: 'Algorithmic Trading Heritage',
            status: 'Underutilized',
            pocketfulHas: true,
            zerodhaHas: false,
            growwHas: false,
            details: 'Built with algo-trading DNA from PACE institutional systems. Free SmartAPIs available.',
            opportunity: 'Democratize for retail: Simple IF-THEN rules, bracket orders, templates. "Trade like an institution without coding."',
            whyCompetitorsCant: 'Zerodha has Streak but separate/paid. Groww lacks algo infrastructure entirely.',
            personaImpact: 'Priya (Active Trader) can automate strategies'
        }
    ],
    featureByFeatureComparison: [
        { feature: 'Error Handling', zerodha: 'Minimal, functional', groww: 'Friendly but generic', pocketful: 'Generic (can be best with SER)', winner: 'Pocketful (with SER)' },
        { feature: 'Cold Start Time', zerodha: '~2-3 seconds', groww: '~4 seconds', pocketful: '>10 seconds', winner: 'Zerodha' },
        { feature: 'Offline Mode', zerodha: 'Limited', groww: 'None', pocketful: 'None (ROM can differentiate)', winner: 'Pocketful (with ROM)' },
        { feature: 'Jargon Explanation', zerodha: 'Varsity (separate)', groww: 'Inline basics', pocketful: 'None (TSE can win)', winner: 'Pocketful (with TSE)' },
        { feature: 'Order Automation', zerodha: 'Streak (paid/separate)', groww: 'None', pocketful: 'SmartAPI (developer-only)', winner: 'Pocketful (with SOA)' },
        { feature: 'Human Support', zerodha: 'No RMs', groww: 'Call only', pocketful: 'Dedicated RM (hidden)', winner: 'Pocketful (if surfaced)' }
    ],
    wireframeMockups: {
        smartRecoveryBefore: '/wireframe_before.png',
        smartRecoveryAfter: '/wireframe_after.png'
    }
};

export const RACI_MATRIX = [
    { deliverable: "PRD & Requirements", pm: "R/A", eng: "C", design: "C", qa: "I" },
    { deliverable: "Error Taxonomy Design", pm: "C", eng: "R/A", design: "I", qa: "C" },
    { deliverable: "Recovery System UI Design", pm: "A", eng: "I", design: "R", qa: "I" },
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
        { step: 1, action: "App Download & Install", time: "~1 min", experience: "Seamless experience" },
        { step: 2, action: "Authentication", time: "~2 min", experience: "Lag on Gmail; Direct email smooth" },
        { step: 3, action: "PAN & Aadhaar Entry", time: "~2 min", experience: "Auto-fetch worked well" },
        { step: 4, action: "e-Sign (DigiLocker)", time: "~3 min", experience: "Smooth redirect flow" },
        { step: 5, action: "Bank Account Linking", time: "~2 min", experience: "UPI autopay straightforward" },
        { step: 6, action: "Selfie Capture", time: "~1 min", experience: "Specs reflection caused retry" }
    ],
    highlights: [
        "Total time ~12 mins (faster than expected)",
        "Auto-fetch from PAN/Aadhaar reduced manual entry",
        "DigiLocker integration was seamless",
        "Clear status indicators in the app for account status"
    ],
    painPoints: [
        { issue: "Cold Start Lag (>10s)", suggestion: "Implement progressive hydration" },
        { issue: "Gmail Registration Lag", suggestion: "Optimize OAuth callback performance" },
        { issue: "Selfie: Specs Reflection", suggestion: "Add 'Remove Spectacles' prompt" },
        { issue: "No Progress/Time Estimate", suggestion: "Add 'Estimated Time: 12 mins' header" }
    ]
};

// Focused roadmap table - key features only
export const ROADMAP_TABLE = [
    { phase: 'NOW', phaseLabel: '0-3 months', feature: 'Smart Error Recovery', why: 'Immediate trust repair for critical failures', metric: 'Error recovery rate', effort: 'M', dependencies: 'None' },
    { phase: 'NOW', phaseLabel: '0-3 months', feature: 'Transparent Status Explainers', why: 'Reduce cognitive load on order states', metric: 'Support ticket volume', effort: 'S', dependencies: 'None' },
    { phase: 'NOW', phaseLabel: '0-3 months', feature: 'Resilient Offline Mode', why: 'Critical for tier-2/3 users on patchy networks', metric: 'Session continuity rate', effort: 'M', dependencies: 'Smart Recovery' },
    { phase: 'NEXT', phaseLabel: '3-6 months', feature: 'Context-Aware Smart Home', why: 'Leverage collected analytics for personalization', metric: 'Screen engagement time', effort: 'L', dependencies: 'User state detection' },
    { phase: 'NEXT', phaseLabel: '3-6 months', feature: 'Smart Order Assistant', why: 'Extend value for active traders', metric: 'Conditional order usage', effort: 'L', dependencies: 'Smart Home' },
    { phase: 'LATER', phaseLabel: '6-12 months', feature: 'Advanced Algo Features', why: 'Complex feature requiring stable base', metric: 'Template usage rate', effort: 'L', dependencies: 'Smart Order Assistant' },
];

// User flow for Smart Error Recovery
export const USER_FLOW = {
    title: 'Smart Error Recovery - User Flow',
    steps: [
        { id: 1, type: 'start', label: 'User Action', description: 'User taps Technicals tab' },
        { id: 2, type: 'process', label: 'API Call', description: 'GET /technicals' },
        { id: 3, type: 'decision', label: 'Response?', description: 'Check API response' },
        { id: 4, type: 'process', label: 'Success', description: 'Display data' },
        { id: 5, type: 'error', label: 'Error', description: 'API returns error' },
        { id: 6, type: 'process', label: 'Classify Error', description: 'Determine error type' },
        { id: 7, type: 'decision', label: 'Error Type?', description: 'Categorize error' },
        { id: 8, type: 'process', label: 'Data Unavailable', description: 'Show smart recovery options' },
        { id: 9, type: 'process', label: 'Network Issue', description: 'Show network guidance' },
        { id: 10, type: 'process', label: 'Server Error', description: 'Show support options' },
        { id: 11, type: 'decision', label: 'User Choice', description: 'Recovery action' },
        { id: 12, type: 'process', label: 'Retry', description: 'Re-attempt request' },
        { id: 13, type: 'process', label: 'Alternative', description: 'Navigate to similar' },
        { id: 14, type: 'process', label: 'Report', description: 'Log issue' },
        { id: 15, type: 'end', label: 'Resolved', description: 'Session continues' },
    ]
};
