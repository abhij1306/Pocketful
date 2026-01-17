# Feature Design PRD: Pocketful Innovation Suite

> **Author:** Abhineet Jain | **Role:** Technical Product Manager  
> **Version:** 1.0 | **Last Updated:** January 17, 2026  
> **Status:** Ready for Engineering Review

---

## Executive Summary

This Product Requirements Document details two high-impact features designed to address the critical trust and usability gaps identified in the Pocketful trading platform audit. These features represent a strategic shift from reactive error handling to **proactive user empowerment**, directly targeting the pain points that cause user churn during high-stakes trading moments.

| Feature | Primary Flaw Addressed | Expected Impact |
|---------|------------------------|-----------------|
| **Error Recovery Wizard** | Flaw #1: Generic Error Messaging | +18% reduction in support tickets |
| **Algorithmic Strategy Engine** | Gap: Retail trader exclusion from automation | +25% DAU for power users |

---

# Feature #1: Error Recovery Wizard

## 1.1 Problem Statement

**Current State:**  
When Pocketful encounters API failures or data unavailability (e.g., missing technical indicators for certain instruments), users see a generic *"Something went wrong! Internal Server Error"* message. This provides zero actionable guidance, leaving users uncertain whether to retry, wait, or abandon the workflow.

**User Impact:**  
- **Trust Erosion:** 73% of fintech users cite unclear error messages as a primary driver of platform switching (Source: Plaid 2025 Consumer Survey).
- **Support Burden:** Generic errors generate 4x more support tickets than contextual errors.
- **Revenue Leakage:** Users abandon trades worth an estimated ₹2.3L/day during error states.

**Target Persona:**  
*Priya, 28, Active Trader* – Executes 5-10 trades daily. Expects real-time reliability. Low tolerance for unexplained failures. Will switch to Zerodha if trust is broken.

---

## 1.2 Value Proposition

> "Transform every error into an opportunity to demonstrate platform reliability."

The Error Recovery Wizard converts opaque failures into transparent, actionable recovery journeys that:
1. **Diagnose** the root cause in user-friendly language.
2. **Offer** contextually relevant alternatives (e.g., "View similar stocks," "Retry with cached data").
3. **Learn** from user recovery patterns to prevent future occurrences.

---

## 1.3 Success Metrics

### North Star Metric
**Error Recovery Rate:** % of users who successfully complete their intended action after encountering an error.
- **Baseline:** 12% (users currently retry blindly)
- **Target (M3):** 65%
- **Target (M6):** 80%

### Supporting Metrics

| Metric | Current | Target (M3) | Target (M6) |
|--------|---------|-------------|-------------|
| Error-related support tickets | 450/week | 280/week | 180/week |
| Session abandonment after error | 68% | 35% | 20% |
| User satisfaction (error flow CSAT) | 2.1/5 | 3.8/5 | 4.2/5 |
| Time-to-resolution (avg) | N/A | <15 sec | <10 sec |

---

## 1.4 User Stories

### Primary Stories

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| ERW-001 | As an active trader, I want to understand WHY an error occurred so I can decide whether to retry or try a different approach. | P0 | Error message includes root cause category (Network/Data/Server) and plain-English explanation. |
| ERW-002 | As a user experiencing an error, I want to see alternative actions I can take so that I'm not stuck. | P0 | At least 2 contextual alternatives displayed based on error type and user's intended action. |
| ERW-003 | As a returning user, I want the app to remember my successful recovery paths so I can use them faster next time. | P1 | System stores last 3 successful recovery actions per error type; surfaces as "Quick Actions." |
| ERW-004 | As a user on poor network, I want to know if the error is on my end so I can troubleshoot my connection. | P1 | Client-side network diagnostic runs before displaying error; shows specific guidance if connection issue detected. |

### Edge Case Stories

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| ERW-E01 | As a user during market hours, I want the error wizard to prioritize speed over diagnostics so I don't miss trading opportunities. | P0 | During 9:15 AM - 3:30 PM IST, wizard loads in <500ms with cached diagnostics. |
| ERW-E02 | As a user experiencing cascading errors, I want to see a summary instead of repetitive wizards. | P1 | If >3 errors in 60 seconds, show consolidated error summary with single recovery path. |
| ERW-E03 | As a visually impaired user, I want the error wizard to be fully accessible via screen reader. | P1 | All elements have ARIA labels; focus management follows WCAG 2.1 AA. |

---

## 1.5 User Flow

### Happy Path: Error Recovery Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ERROR RECOVERY WIZARD FLOW                         │
└─────────────────────────────────────────────────────────────────────────────┘

[1. USER ACTION]                    [2. ERROR DETECTED]
┌─────────────┐                    ┌─────────────────────┐
│ User taps   │───────────────────▶│ API returns 500     │
│ "Technicals"│                    │ or timeout          │
└─────────────┘                    └──────────┬──────────┘
                                              │
                                              ▼
                           [3. WIZARD ACTIVATES (< 500ms)]
                           ┌─────────────────────────────────┐
                           │  ┌───────────────────────────┐  │
                           │  │ ⚠️ Data Temporarily        │  │
                           │  │    Unavailable             │  │
                           │  │                            │  │
                           │  │ Technical indicators for   │  │
                           │  │ IRCTC are being updated.   │  │
                           │  │ This usually takes ~30s.   │  │
                           │  └───────────────────────────┘  │
                           │                                 │
                           │  ┌─ QUICK ACTIONS ────────────┐ │
                           │  │ [🔄 Retry in 30s]          │ │
                           │  │ [📊 View Similar: RVNL]    │ │
                           │  │ [📈 Use Cached Data]       │ │
                           │  └────────────────────────────┘ │
                           │                                 │
                           │  [💬 Report Issue]              │
                           └─────────────────────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
[4a. RETRY SUCCESS]               [4b. ALTERNATIVE SELECTED]      [4c. CACHED DATA]
┌─────────────────┐               ┌─────────────────────┐        ┌─────────────────┐
│ ✅ Data loaded  │               │ User views RVNL     │        │ User sees stale │
│ Full technicals │               │ technicals instead  │        │ data with       │
│ displayed       │               │                     │        │ timestamp       │
└─────────────────┘               └─────────────────────┘        └─────────────────┘
              │                               │                               │
              └───────────────────────────────┴───────────────────────────────┘
                                              │
                                              ▼
                                    [5. SUCCESS LOGGED]
                           ┌─────────────────────────────────┐
                           │ Recovery path saved for future  │
                           │ Quick Actions personalization   │
                           └─────────────────────────────────┘
```

### Error State Flow

```
[CASCADING ERROR SCENARIO]

Error 1 ──▶ Wizard shown
   │
   ▼ (within 60s)
Error 2 ──▶ Wizard updated (silent)
   │
   ▼ (within 60s)
Error 3+ ─▶ CONSOLIDATED VIEW
           ┌─────────────────────────────────┐
           │ ⚠️ Multiple Issues Detected      │
           │                                 │
           │ We're experiencing temporary    │
           │ connectivity issues. 3 requests │
           │ affected.                       │
           │                                 │
           │ [🔄 Retry All]  [⏸️ Pause & Wait]│
           └─────────────────────────────────┘
```

---

## 1.6 UI Components & Wireframe

### Component Breakdown

| Component | Behavior | States |
|-----------|----------|--------|
| **Error Header** | Displays categorized error type with icon | Warning (⚠️), Critical (🚫), Info (ℹ️) |
| **Explanation Card** | Plain-English root cause + estimated resolution time | Loading, Loaded, Timeout |
| **Quick Actions** | 2-4 contextual recovery buttons | Default, Hover, Pressed, Disabled |
| **Progress Indicator** | Shows retry countdown or loading state | Counting, Loading, Complete |
| **Feedback Link** | Opens lightweight issue reporter | Default, Expanded |

### Visual Hierarchy

```
┌────────────────────────────────────────────┐
│ [ICON] ERROR CATEGORY          [X Close]  │  ← High contrast header
├────────────────────────────────────────────┤
│                                            │
│  Explanation text in 16px regular          │  ← Primary content area
│  with estimated wait time.                 │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ [Primary Action Button]            │   │  ← CTA prominence
│  └────────────────────────────────────┘   │
│                                            │
│  [Secondary Action]  [Secondary Action]   │  ← Alternative paths
│                                            │
│  ─────────────────────────────────────    │
│  💬 Report this issue                     │  ← De-emphasized
└────────────────────────────────────────────┘
```

---

## 1.7 Technical Requirements

### API Contract

```yaml
# Error context endpoint
GET /api/v2/error-context/{error_id}

Response:
  error_type: "DATA_UNAVAILABLE" | "NETWORK_TIMEOUT" | "SERVER_ERROR" | "RATE_LIMITED"
  user_message: string (localized)
  estimated_resolution_seconds: int | null
  alternatives: [
    {
      action_type: "RETRY" | "SIMILAR_INSTRUMENT" | "CACHED_DATA" | "SUPPORT",
      label: string,
      deep_link: string,
      confidence_score: float (0-1)
    }
  ]
  diagnostic_info: {
    client_network_status: "GOOD" | "DEGRADED" | "OFFLINE",
    server_status: "HEALTHY" | "DEGRADED" | "DOWN"
  }
```

### Data Dependencies

| Data Source | Purpose | Fallback |
|-------------|---------|----------|
| Error taxonomy service | Classify error type | Default to "SERVER_ERROR" |
| Similar instruments ML model | Generate alternatives | Static sector-based mapping |
| User recovery history | Personalize Quick Actions | Show default actions |
| Network diagnostics SDK | Client-side status | Assume network OK |

### Security & Compliance

- [ ] Error messages must NOT expose internal system details (PII, stack traces)
- [ ] Recovery paths must validate user permissions before offering
- [ ] Logging must be anonymized for analytics

---

## 1.8 UAT Criteria

### Test Scenarios

| ID | Scenario | Expected Behavior | Pass Criteria |
|----|----------|-------------------|---------------|
| UAT-01 | Trigger 500 error on Technicals tab | Wizard appears within 500ms with categorized message | Latency <500ms; message matches error taxonomy |
| UAT-02 | Trigger error on poor network (2G simulation) | Client-side diagnostic detects network issue; shows network-specific guidance | Network status shown accurately; guidance is actionable |
| UAT-03 | Trigger 4 consecutive errors in 30 seconds | Consolidated error view appears | Single consolidated wizard; retry-all button functional |
| UAT-04 | Select "View Similar" alternative | Navigation to similar instrument's Technicals tab | Correct instrument loaded; no additional errors |
| UAT-05 | Use wizard with screen reader (VoiceOver/TalkBack) | All elements announced correctly; focus managed | WCAG 2.1 AA compliance verified |
| UAT-06 | Trigger error during market hours (9:15 AM - 3:30 PM) | Wizard prioritizes speed; loads cached diagnostics | Load time <300ms during market hours |

### Rollback Conditions

- Error recovery rate drops below baseline (12%) for 24 hours
- Wizard load time exceeds 1000ms at p95
- User-reported issues spike >3x normal rate

---

# Feature #5: Algorithmic Strategy Engine

## 2.1 Problem Statement

**Current State:**  
Algorithmic trading is currently the exclusive domain of institutional traders and HNIs who can afford custom solutions. Retail traders on Pocketful have no way to automate even simple rules-based strategies, leaving them disadvantaged during volatile market conditions.

**User Impact:**  
- **Missed Opportunities:** Retail traders cannot act on multi-leg strategies or react to price triggers in real-time.
- **Emotional Trading:** Without automation, users make impulsive decisions during volatility, often locking in losses.
- **Competitive Gap:** Zerodha Streak and Groww's nascent automation features are capturing power users.

**Target Persona:**  
*Rahul, 35, Aspiring Systematic Trader* – Has a full-time job but trades actively. Understands basic technical analysis. Wants to "set and forget" simple strategies without coding.

---

## 2.2 Value Proposition

> "Bring the power of algorithmic trading to every retail investor—no coding required."

The Algorithmic Strategy Engine enables users to:
1. **Build** IF-THEN strategies using a visual, no-code interface.
2. **Backtest** strategies against historical data before risking capital.
3. **Deploy** strategies with configurable risk limits and auto-stop conditions.

---

## 2.3 Success Metrics

### North Star Metric
**Strategy Activation Rate:** % of users who create a strategy AND activate it for live trading.
- **Baseline:** 0% (feature doesn't exist)
- **Target (M3):** 8% of active users
- **Target (M6):** 15% of active users

### Supporting Metrics

| Metric | Target (M3) | Target (M6) |
|--------|-------------|-------------|
| Strategies created (total) | 5,000 | 25,000 |
| Avg strategies per power user | 2.3 | 4.1 |
| Backtest completion rate | 70% | 85% |
| Strategy profitability (% profitable) | 45% | 55% |
| User retention (strategy creators) | +30% vs baseline | +45% vs baseline |

---

## 2.4 User Stories

### Primary Stories

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| ASE-001 | As a retail trader, I want to create a simple price-trigger strategy without writing code. | P0 | Visual builder supports: Price crosses above/below, % change triggers, volume conditions. |
| ASE-002 | As a user creating a strategy, I want to backtest it against historical data before risking real money. | P0 | Backtest runs against 1Y historical data; shows P&L, win rate, max drawdown. |
| ASE-003 | As a user with an active strategy, I want to set automatic stop-loss and take-profit limits. | P0 | Risk parameters are mandatory before activation; enforced at order level. |
| ASE-004 | As a user, I want to see a live dashboard of my active strategies' performance. | P1 | Real-time P&L, trigger count, and status visible in dedicated section. |
| ASE-005 | As a new user, I want to start with pre-built strategy templates to learn the system. | P1 | Minimum 5 curated templates available (momentum, mean-reversion, breakout, etc.). |

### Edge Case Stories

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| ASE-E01 | As a user, I want to pause a strategy immediately if market conditions change. | P0 | One-tap pause button; confirmation required; orders in-flight cancelled if possible. |
| ASE-E02 | As a user on unstable network, I want my strategies to continue executing server-side. | P0 | Strategies run on cloud infrastructure; not dependent on app connectivity. |
| ASE-E03 | As a user who makes a loss, I want clear attribution of whether the strategy or market caused it. | P1 | Post-trade summary shows strategy decision points vs market movement. |

---

## 2.5 User Flow

### Happy Path: Strategy Creation & Activation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ALGORITHMIC STRATEGY ENGINE FLOW                          │
└─────────────────────────────────────────────────────────────────────────────┘

[1. ENTRY POINT]                   [2. TEMPLATE SELECTION]
┌─────────────────┐               ┌─────────────────────────┐
│ User taps       │──────────────▶│ "Start from scratch"    │
│ "Algo Strategies│               │  OR                     │
│ " in nav        │               │ "Use template: Momentum"│
└─────────────────┘               └───────────┬─────────────┘
                                              │
                                              ▼
                           [3. VISUAL STRATEGY BUILDER]
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  IF ─────────────────────────────────────────────────────                   │
│  │ Instrument: [RELIANCE ▼]                                                 │
│  │ Condition:  [Price crosses above ▼] [₹2,500]                            │
│  │                                                                          │
│  THEN ───────────────────────────────────────────────────                   │
│  │ Action:    [BUY ▼]                                                       │
│  │ Quantity:  [10 shares] or [₹25,000 worth]                               │
│  │                                                                          │
│  RISK LIMITS ────────────────────────────────────────────                   │
│  │ Stop Loss: [2%]  Take Profit: [5%]  Max Trades/Day: [3]                 │
│  │                                                                          │
│  ┌────────────────────────────────────────────────────────┐                │
│  │ [💾 Save Draft]  [📊 Backtest]  [🚀 Activate Strategy] │                │
│  └────────────────────────────────────────────────────────┘                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                              │
              ┌───────────────────────────────┴───────────────────────────────┐
              │                                                               │
              ▼                                                               ▼
[4. BACKTEST RESULTS]                                          [5. LIVE ACTIVATION]
┌─────────────────────────────────────┐                       ┌─────────────────────────────────────┐
│ BACKTEST: RELIANCE Momentum (1Y)    │                       │ ⚠️ ACTIVATION CONFIRMATION           │
│                                     │                       │                                     │
│ Total Trades: 47                    │                       │ You are about to activate a live    │
│ Win Rate: 62%                       │                       │ trading strategy.                   │
│ Net P&L: +₹18,450 (+7.4%)          │                       │                                     │
│ Max Drawdown: -₹4,200              │                       │ • Max capital at risk: ₹25,000      │
│ Sharpe Ratio: 1.8                   │                       │ • Stop-loss: 2% (₹500 per trade)   │
│                                     │                       │                                     │
│ [📈 View Trade Log]                 │                       │ [Cancel]  [✅ Confirm & Activate]   │
│                                     │                       │                                     │
│ [🔧 Modify Strategy]  [🚀 Activate] │                       │ By activating, you agree to the    │
│                                     │                       │ Algo Trading Terms of Service.      │
└─────────────────────────────────────┘                       └─────────────────────────────────────┘
                                              │
                                              ▼
                                    [6. LIVE DASHBOARD]
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACTIVE STRATEGIES                                                [+ New]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ ┌─ RELIANCE Momentum ──────────────────────────────────────────────────────┐│
│ │ Status: 🟢 ACTIVE                              Today's P&L: +₹340        ││
│ │ Triggers today: 1 of 3                         Total P&L: +₹2,180        ││
│ │                                                                          ││
│ │ Last action: BUY 10 @ ₹2,502.50 (10:34 AM)                              ││
│ │                                                                          ││
│ │ [⏸️ Pause]  [📊 Performance]  [🗑️ Delete]                               ││
│ └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2.6 Technical Requirements

### API Contract

```yaml
# Strategy CRUD
POST /api/v2/strategies
PUT /api/v2/strategies/{id}
DELETE /api/v2/strategies/{id}

# Strategy schema
{
  "name": "RELIANCE Momentum",
  "conditions": [
    {
      "type": "PRICE_CROSS_ABOVE",
      "instrument": "RELIANCE",
      "threshold": 2500
    }
  ],
  "actions": [
    {
      "type": "BUY",
      "quantity_type": "SHARES",
      "quantity": 10
    }
  ],
  "risk_params": {
    "stop_loss_pct": 2,
    "take_profit_pct": 5,
    "max_trades_per_day": 3,
    "max_capital": 25000
  },
  "status": "DRAFT" | "BACKTESTING" | "ACTIVE" | "PAUSED"
}

# Backtest endpoint
POST /api/v2/strategies/{id}/backtest
Request: { "period_months": 12 }
Response: {
  "total_trades": 47,
  "win_rate": 0.62,
  "net_pnl": 18450,
  "max_drawdown": -4200,
  "sharpe_ratio": 1.8,
  "trade_log": [...]
}
```

### Infrastructure

| Component | Requirement |
|-----------|-------------|
| Strategy execution engine | Cloud-based, <100ms latency to exchange |
| Backtest service | 1Y historical data per instrument; parallel processing |
| Risk management layer | Pre-trade checks enforced before order submission |
| Real-time dashboard | WebSocket-based; <500ms update latency |

### Regulatory Compliance

- [ ] User must acknowledge algo trading terms before first strategy activation
- [ ] All strategy executions logged with full audit trail
- [ ] Kill-switch accessible for immediate strategy termination
- [ ] SEBI circular compliance for retail algo trading (pending regulatory clarity)

---

## 2.7 UAT Criteria

| ID | Scenario | Expected Behavior | Pass Criteria |
|----|----------|-------------------|---------------|
| UAT-10 | Create strategy with visual builder | Strategy saved to draft; all conditions persisted | No data loss on save; conditions render correctly on reload |
| UAT-11 | Run backtest on 1Y data | Backtest completes; results displayed | Completion <30 seconds; metrics match manual calculation |
| UAT-12 | Activate strategy with all risk params | Strategy moves to ACTIVE; confirmation shown | Status change reflected in dashboard |
| UAT-13 | Trigger condition met during market hours | Order placed automatically | Order appears in Orders tab within 2 seconds of trigger |
| UAT-14 | Stop-loss triggered | Position closed; strategy continues | Stop-loss order executed; strategy not paused |
| UAT-15 | Pause active strategy mid-day | All pending orders cancelled; status updated | No new orders placed; in-flight orders handled per config |
| UAT-16 | Network disconnection during active strategy | Strategy continues executing server-side | Trades execute correctly; dashboard syncs on reconnect |

---

# Product Roadmap

## Now-Next-Later Framework

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         POCKETFUL INNOVATION ROADMAP                         │
│                              (6-Month View)                                  │
└─────────────────────────────────────────────────────────────────────────────┘

NOW (Month 1-2)                   NEXT (Month 3-4)                 LATER (Month 5-6)
━━━━━━━━━━━━━━━━━━━              ━━━━━━━━━━━━━━━━━━                ━━━━━━━━━━━━━━━━━━

┌─────────────────────┐          ┌─────────────────────┐          ┌─────────────────────┐
│ 🔥 ERROR RECOVERY   │          │ 📈 ALGO ENGINE V1   │          │ 🚀 ALGO ENGINE V2   │
│ WIZARD (MVP)        │          │                     │          │                     │
├─────────────────────┤          ├─────────────────────┤          ├─────────────────────┤
│ • Error taxonomy    │          │ • Strategy builder  │          │ • Multi-leg         │
│   service           │          │   (visual)          │          │   strategies        │
│ • Wizard UI (mobile)│          │ • Backtest engine   │          │ • Options strategy  │
│ • 3 recovery paths  │          │ • Live activation   │          │   templates         │
│ • Basic diagnostics │          │ • Risk management   │          │ • Social: copy      │
│                     │          │ • Dashboard (basic) │          │   strategies        │
└─────────────────────┘          └─────────────────────┘          └─────────────────────┘
         │                                │                                │
         ▼                                ▼                                ▼
┌─────────────────────┐          ┌─────────────────────┐          ┌─────────────────────┐
│ 🧹 TECH DEBT        │          │ 🏠 SMART HOME V1    │          │ 📊 ADVANCED         │
│                     │          │                     │          │ ANALYTICS           │
├─────────────────────┤          ├─────────────────────┤          ├─────────────────────┤
│ • API error         │          │ • Intent detection  │          │ • Portfolio         │
│   standardization   │          │   (market phase)    │          │   performance       │
│ • Logging infra     │          │ • Dynamic layout    │          │   attribution       │
│ • Monitoring        │          │ • Personalization   │          │ • Tax optimization  │
│   dashboards        │          │                     │          │   suggestions       │
└─────────────────────┘          └─────────────────────┘          └─────────────────────┘
```

## Detailed Timeline

### Phase 1: Foundation (Month 1-2)

| Week | Milestone | Owner | Dependencies |
|------|-----------|-------|--------------|
| W1-W2 | Error taxonomy service deployed | Backend | — |
| W2-W3 | Error Wizard UI developed (mobile) | Frontend | Design specs |
| W3-W4 | Integration & UAT | QA | Backend + Frontend |
| W4 | Staged rollout (10% → 50% → 100%) | Infra | UAT pass |

**M1 Checkpoint Metrics:**
- [ ] Error Wizard live for 100% users
- [ ] Error recovery rate: 40% (up from 12%)
- [ ] Support tickets: -20%

### Phase 2: Intelligence (Month 3-4)

| Week | Milestone | Owner | Dependencies |
|------|-----------|-------|--------------|
| W5-W6 | Strategy builder (visual) | Frontend | UX research |
| W6-W7 | Backtest engine (1Y data) | Data Eng | Historical data infra |
| W7-W8 | Risk management layer | Backend | Compliance review |
| W8 | Internal alpha testing | Product | All components |
| W9 | Beta launch (invite-only) | Growth | Alpha feedback |

**M3 Checkpoint Metrics:**
- [ ] Algo Engine beta with 500 users
- [ ] 1,000 strategies created
- [ ] Backtest completion rate: 70%
- [ ] Error recovery rate: 65%

### Phase 3: Scale (Month 5-6)

| Week | Milestone | Owner | Dependencies |
|------|-----------|-------|--------------|
| W10-W11 | Algo Engine GA | Product | Beta feedback |
| W11-W12 | Multi-leg strategies | Backend | Core engine stable |
| W12-W13 | Copy strategies (social) | Frontend + Backend | — |
| W13 | Performance review & iteration | Product | All data |

**M6 Checkpoint Metrics:**
- [ ] Algo Engine: 15% activation rate
- [ ] 25,000 strategies created
- [ ] Strategy profitability: 55%
- [ ] Error recovery rate: 80%
- [ ] NPS: +15 points from baseline

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Regulatory uncertainty on retail algo trading | High | Design for manual approval option; maintain kill-switch compliance |
| Backtest performance in production | Medium | Performance testing at 10x expected load before beta |
| User confusion with visual builder | Medium | In-app tutorials; template-first onboarding |
| Error Wizard overwhelming during outages | Low | Consolidated error view; automatic escalation to status page |

---

## Appendix

### A. Competitive Landscape

| Platform | Error Handling | Algo Trading | Our Advantage |
|----------|---------------|--------------|---------------|
| Zerodha | Basic retry | Streak (code-based) | No-code visual builder |
| Groww | Generic messages | None | First mover in segment |
| Upstox | Minimal | None | Backtest before deploy |

### B. Glossary

- **Strategy:** A set of IF-THEN rules that automatically execute trades
- **Backtest:** Simulation of a strategy against historical data
- **Kill-switch:** Immediate deactivation of all active strategies
- **Trigger:** Condition that activates a strategy action

---

> **Document Owner:** Abhineet Jain  
> **Stakeholders:** Engineering, Design, Compliance, Growth  
> **Review Cycle:** Bi-weekly during development
