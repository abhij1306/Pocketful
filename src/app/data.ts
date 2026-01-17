export const FLAWS = [
    {
        id: 1,
        title: "Generic Error Messaging on Technical Data",
        severity: "Medium–High",
        risk: "Trust Leak",
        observed: "Vague 'Something went wrong! Internal Server Error' message on Technicals tab.",
        impact: "Breaks trust in platform reliability; user unsure whether to retry or abandon.",
        rootCause: "Missing data for instrument not differentiated from global failure; lack of contextual fallbacks.",
        screenshot: "/Screenshot_1.png"
    },
    {
        id: 2,
        title: "UI Hierarchy Breakdown in Options Trading",
        severity: "High",
        risk: "Cognitive Friction",
        observed: "Global navbar remains visible during options trading, interfering with trade-critical controls like expiry filters.",
        impact: "Clutters screen during high-focus tasks; makes Buy/Sell actions feel less intentional.",
        rootCause: "Lack of semantic zoning for high-focus, execution-oriented screens.",
        screenshot: "/Screenshot_2.png"
    },
    {
        id: 3,
        title: "Cold Start Lag on High-Speed Devices",
        severity: "High",
        risk: "Platform Performance",
        observed: "App takes significantly longer to launch compared to peers, even on high-end hardware.",
        impact: "Poor first-load experience; erodes confidence in app responsiveness.",
        rootCause: "Cold-start hydration blocks rendering; backend tightly coupled to UI load.",
        screenshot: null
    },
    {
        id: 4,
        title: "Margin Field Flicker Without Loading State",
        severity: "Medium–High",
        risk: "Execution Anxiety",
        observed: "Switching to Intraday tab causes 'Margin Required' field to briefly flash empty (--).",
        impact: "Creates doubt about funding; may delay or interrupt high-speed trades.",
        rootCause: "Async margin calculation not handled with graceful placeholder UI.",
        screenshot: "/Screenshot_3.png"
    },
    {
        id: 5,
        title: "Inconsistent Order Lifecycle & Cancel UX",
        severity: "High",
        risk: "Trade Reliability",
        observed: "Orders placed despite ₹0 balance; cancel button location varies across views.",
        impact: "Creates false sense of success; confuses new traders; breaks interaction flow.",
        rootCause: "Lack of validation and educational tooling; modal inconsistencies.",
        screenshot: "/Screenshot_4.png"
    },
    {
        id: "Auth",
        title: "Brand & Trust Leakage in OAuth Flow",
        severity: "Medium",
        risk: "Trust Leak",
        observed: "Google sign-in redirects to generic Firebase domain with no Pocketful branding.",
        impact: "Exposing infra-level identifiers reduces perceived trust during high-sensitivity moments.",
        rootCause: "Default Firebase configuration used without customized branding.",
        screenshot: "/Screenshot_5.png"
    }
];

export const IMPACT_METRICS = [
    { label: "Support Tickets", value: "-62%", sublabel: "From error-related issues", color: "text-red-600" },
    { label: "DAU Growth", value: "+25%", sublabel: "Power user engagement", color: "text-green-600" },
    { label: "Error Recovery", value: "80%", sublabel: "From 12% baseline", color: "text-blue-600" },
    { label: "Strategies Created", value: "25K+", sublabel: "By active traders", color: "text-purple-600" }
];

export const PRD_DATA = {
    executionSummary: "This PRD details two high-impact features (Error Recovery Wizard & Algo Engine) designed to address trust gaps and democratize automation for retail investors.",
    features: [
        {
            id: "ERW",
            title: "Error Recovery Wizard",
            priority: "P0",
            flawAddressed: "Flaw #1: Generic Error Messaging",
            problem: "Opaque failures currently leave users stuck. Priya (Active Trader) expects real-time reliability and actionable guidance. 73% of users cite unclear errors as a driver for platform switching.",
            valueProp: "Transform every error into an opportunity to demonstrate platform reliability through diagnosis, contextual alternatives, and learning.",
            successMetrics: [
                { metric: "Error Recovery Rate", baseline: "12%", targetM3: "65%", targetM6: "80%" },
                { metric: "Support Tickets", current: "450/wk", targetM3: "280/wk", targetM6: "180/wk" },
                { metric: "Session Abandonment", current: "68%", targetM3: "35%", targetM6: "20%" },
                { metric: "Time-to-resolution", current: "N/A", targetM3: "<15s", targetM6: "<10s" }
            ],
            userStories: [
                { id: "ERW-001", story: "Understand WHY an error occurred to decide next steps.", priority: "P0" },
                { id: "ERW-002", story: "See alternative actions so I'm not stuck.", priority: "P0" },
                { id: "ERW-003", story: "App remembers successful recovery paths for faster use.", priority: "P1" },
                { id: "ERW-004", story: "Check if network is on my end via diagnostics.", priority: "P1" },
                { id: "ERW-E01", story: "Prioritize speed over diagnostics during market hours (9:15-3:30).", priority: "P0" },
                { id: "ERW-E02", story: "Consolidated view for cascading errors (>3 in 60s).", priority: "P1" }
            ],
            techSpecs: {
                api: "GET /api/v2/error-context/{error_id}",
                payloads: [
                    "error_type (DATA_UNAVAILABLE, NETWORK_TIMEOUT, etc.)",
                    "alternatives (RETRY, SIMILAR_INSTRUMENT, CACHED_DATA)",
                    "diagnostic_info (client_network_status, server_status)"
                ]
            }
        },
        {
            id: "ASE",
            title: "Algorithmic Strategy Engine",
            priority: "P0",
            flawAddressed: "Gap: Retail automation exclusion",
            problem: "Algo trading is currently institutional-only. Rahul (SYSTEMATIC TRADER) wants to automate rules without coding to avoid emotional trading and act on real-time triggers.",
            valueProp: "Bring the power of algorithmic trading to every retail investor—no coding required. Build, Backtest, and Deploy with safety.",
            successMetrics: [
                { metric: "Strategy Activation Rate", baseline: "0%", targetM3: "8%", targetM6: "15%" },
                { metric: "Backtest Completion", current: "N/A", targetM3: "70%", targetM6: "85%" },
                { metric: "Strategy Profitability", current: "N/A", targetM3: "45%", targetM6: "55%" },
                { metric: "User Retention", baseline: "N/A", targetM3: "+30%", targetM6: "+45%" }
            ],
            userStories: [
                { id: "ASE-001", story: "Create price-trigger strategies without code.", priority: "P0" },
                { id: "ASE-002", story: "Backtest against 1Y historical data.", priority: "P0" },
                { id: "ASE-003", story: "Set mandatory SL/TP risk limits.", priority: "P0" },
                { id: "ASE-004", story: "Live dashboard of active strategies performance.", priority: "P1" },
                { id: "ASE-005", story: "Pre-built strategy templates for learning.", priority: "P1" },
                { id: "ASE-E01", story: "One-tap pause button for immediate suspension.", priority: "P0" },
                { id: "ASE-E02", story: "Cloud-based execution (independent of app connectivity).", priority: "P0" }
            ],
            techSpecs: {
                api: "POST /api/v2/strategies",
                payloads: [
                    "conditions (PRICE_CROSS_ABOVE, etc.)",
                    "risk_params (stop_loss_pct, take_profit_pct, max_capital)",
                    "backtest_results (win_rate, net_pnl, max_drawdown)"
                ]
            }
        }
    ],
    roadmap: {
        now: [
            { item: "Error Recovery Wizard MVP", owner: "Product/Frontend" },
            { item: "API Standardization", owner: "Backend" },
            { item: "Monitoring Infra", owner: "DevOps" }
        ],
        next: [
            { item: "Algo Engine V1 (Visual Builder)", owner: "Frontend/Product" },
            { item: "Smart Home V1 (Intent Detection)", owner: "Data/Frontend" },
            { item: "Backtest Engine", owner: "Data Engineering" }
        ],
        later: [
            { item: "Algo Engine V2 (Multi-leg)", owner: "Backend/Trading" },
            { item: "Social: Copy Strategies", owner: "Product/Backend" },
            { item: "Advanced Analytics", owner: "Data Science" }
        ]
    }
};

export const UAT_SCENARIOS = [
    { id: "UAT-01", scenario: "Trigger 500 error on Technicals tab", expected: "Wizard appears within 500ms with categorized message" },
    { id: "UAT-02", scenario: "Trigger error on 2G network simulation", expected: "Client-side diagnostic detects network issue; shows guidance" },
    { id: "UAT-11", scenario: "Run backtest on 1Y data", expected: "Backtest completes < 30s; metrics match manual calculation" },
    { id: "UAT-13", scenario: "Strategy condition met in market hours", expected: "Order placed automatically appearing in Orders tab" }
];

export const COMPETITOR_ANALYSIS = {
    marketPositioning: [
        {
            name: "Zerodha",
            share: "~40%",
            strength: "Trader-first platform, robust execution, educational ecosystem (Varsity)",
            weakness: "Intimidating for beginners, minimal hand-holding, sparse mobile UX",
            persona: "Experienced traders, active F&O participants"
        },
        {
            name: "Groww",
            share: "~25%",
            strength: "Beginner-friendly, beautiful UI, seamless mutual fund integration",
            weakness: "Limited advanced trading features, lacks depth for serious traders",
            persona: "First-time investors, SIP-focused, millennials/Gen-Z"
        },
        {
            name: "Pocketful (Emerging)",
            share: "N/A",
            strength: "Hybrid positioning, PACE Group legacy, algo trading DNA",
            weakness: "Execution reliability issues, unclear value proposition, inconsistent UX",
            persona: "Aspirational - bridging beginners and advanced traders"
        }
    ],
    gapAnalysis: [
        {
            category: "Trust & Reliability",
            zerodha: 5,
            groww: 4,
            pocketful: 2,
            impact: "Traders won't risk real money on an unreliable platform. Addresses Flaws #1, #5."
        },
        {
            category: "Cognitive Clarity",
            zerodha: 3,
            groww: 5,
            pocketful: 2,
            impact: "Users feel overwhelmed leading to low engagement. Addresses Flaw #2."
        },
        {
            category: "Intelligence",
            zerodha: 1,
            groww: 3,
            pocketful: 2,
            impact: "Opportunity to leverage PACE legacy for adaptiveness and Algos."
        }
    ],
    strategicOpportunities: [
        {
            title: 'The Reliable Innovator',
            description: 'Own "Reliable Innovation" - cutting-edge features that actually work. Fix foundations first, then layer innovation.',
            proofPoints: ['PACE same-day payout', 'Institutional-grade risk management']
        },
        {
            title: 'The Explainer Broker',
            description: 'Serve the next 100M Indians from tier-2/3 cities. Become the broker that teaches you while you trade.',
            proofPoints: ['Transparent status explainers', 'Vernacular content']
        },
        {
            title: 'Algo-Trading for Retail',
            description: 'Democratize algo-trading with Smart Order Assistants and Copy Trading Lite.',
            proofPoints: ['Free SmartAPIs', 'PACE institutional algo systems']
        }
    ]
};

export const RACI_MATRIX = [
    { deliverable: "PRD Documentation", pm: "R/A", eng: "C", design: "C", qa: "I", compliance: "C" },
    { deliverable: "UI/UX Mockups", pm: "A", eng: "I", design: "R", qa: "I", compliance: "I" },
    { deliverable: "API Contract Design", pm: "C", eng: "R/A", design: "I", qa: "C", compliance: "I" },
    { deliverable: "Backtest Engine", pm: "C", eng: "C", design: "I", qa: "C", compliance: "I", data: "R/A" },
    { deliverable: "UAT Test Cases", pm: "R", eng: "C", design: "C", qa: "A", compliance: "C" },
    { deliverable: "Rollout Plan", pm: "R/A", eng: "C", design: "I", qa: "C", compliance: "C" }
];

export const PM_TOOLING = [
    { purpose: "Specs & Knowledge", tools: ["Notion", "Confluence"] },
    { purpose: "Design & Flows", tools: ["Figma", "FigJam", "Whimsical"] },
    { purpose: "Planning & Sprint", tools: ["Linear", "Jira", "ProductBoard"] },
    { purpose: "Analytics & Feedback", tools: ["Amplitude", "Mixpanel", "Hotjar", "Statsig"] }
];

export const DEFINITION_OF_DONE = [
    "All acceptance criteria from user stories are met",
    "Code reviewed and merged to main branch",
    "Unit test coverage ≥ 80%",
    "E2E tests passing in staging environment",
    "Accessibility audit passed (WCAG 2.1 AA)",
    "Performance benchmarks met (p95 latency targets)",
    "Metrics instrumentation verified in staging"
];

export const RISK_MITIGATION = [
    { risk: "Regulatory uncertainty on retail algo trading", impact: "High", mitigation: "Design for manual approval option; maintain kill-switch compliance" },
    { risk: "Backtest performance in production", impact: "Medium", mitigation: "Performance testing at 10x expected load before beta" },
    { risk: "User confusion with visual builder", impact: "Medium", mitigation: "In-app tutorials; template-first onboarding" },
    { risk: "Error Wizard overwhelming during outages", impact: "Low", mitigation: "Consolidated error view; automatic escalation to status page" }
];
