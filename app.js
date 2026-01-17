document.addEventListener('DOMContentLoaded', () => {
    // Helper: Get element by ID
    function id(name) {
        return document.getElementById(name);
    }

    // --- Feature 2: Smart Home Adaptive Preview ---
    const homePreviews = {
        'pre': `
            <div class="preview-layout animate-fade">
                <div class="preview-widget">☀️ Market Outlook: Bullish</div>
                <div class="preview-widget">🗞️ Top News: RBI Policy Today</div>
                <div class="preview-widget">📅 IPO Alert: 3 days left</div>
            </div>
        `,
        'live': `
            <div class="preview-layout animate-fade">
                <div class="preview-widget active">⚡ NIFTY 50: 22,145 (+0.4%)</div>
                <div class="preview-widget">📈 Positions: ₹4,250 Unrealized</div>
                <div class="preview-widget">🔔 Alert: Reliance hit target</div>
            </div>
        `,
        'post': `
            <div class="preview-layout animate-fade">
                <div class="preview-widget">📊 Today's P&L: +₹1,240</div>
                <div class="preview-widget highlight">🎓 Video: How to handle slippage</div>
                <div class="preview-widget">📝 P&L Journal Entry Required</div>
            </div>
        `
    };

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const homePreviewContainer = id('home-preview');

    function updateHomePreview(time) {
        homePreviewContainer.innerHTML = homePreviews[time];
        toggleBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.time === time);
        });
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => updateHomePreview(btn.dataset.time));
    });

    // Initial state
    updateHomePreview('pre');

    // --- Feature 3: Status Explainers / Jargon Buster ---
    const infoTrigger = document.querySelector('.info-trigger');
    const jargonTip = id('jargon-tip');

    if (infoTrigger && jargonTip) {
        infoTrigger.addEventListener('mouseenter', () => {
            jargonTip.innerHTML = `<strong>Context Tooltip:</strong> ${infoTrigger.dataset.tip}<br><br><span style="color: var(--primary);">📊 2,847 users applied today.</span>`;
            jargonTip.style.background = 'rgba(99, 57, 249, 0.2)';
        });

        infoTrigger.addEventListener('mouseleave', () => {
            jargonTip.innerHTML = 'Hover over ⓘ to decode.';
            jargonTip.style.background = 'rgba(99, 57, 249, 0.1)';
        });
    }

    // --- Feature 4: Resilient Offline Mode Simulator ---
    const simOfflineBtn = id('sim-offline');
    const offlineBar = id('offline-bar');
    let isOffline = false;

    if (simOfflineBtn) {
        simOfflineBtn.addEventListener('click', () => {
            isOffline = !isOffline;
            if (isOffline) {
                simOfflineBtn.innerText = 'Go Online';
                simOfflineBtn.style.background = 'var(--accent-green)';
                offlineBar.innerHTML = '🟡 Slow Connection (2G Mode Active)';
                offlineBar.style.color = 'var(--secondary)';
                offlineBar.style.border = '1px solid var(--secondary)';
                document.body.classList.add('low-bandwidth');
                // Simulate skeleton effect
                document.querySelectorAll('.preview-widget').forEach(w => w.classList.add('skeleton'));
            } else {
                simOfflineBtn.innerText = 'Simulate 2G/Offline';
                simOfflineBtn.style.background = 'var(--glass)';
                offlineBar.innerHTML = '🟢 Stable Connection';
                offlineBar.style.color = 'var(--accent-green)';
                offlineBar.style.border = 'none';
                document.body.classList.remove('low-bandwidth');
                document.querySelectorAll('.preview-widget').forEach(w => w.classList.remove('skeleton'));
            }
        });
    }

    // --- Feature 5: Error Recovery Wizard ---
    // (Visual simulation already present in HTML, but we can add a 'Notify' alert)
    const errorBtn = document.querySelector('#f5 button');
    if (errorBtn) {
        errorBtn.addEventListener('click', () => {
            errorBtn.innerText = 'Notification Set! ✓';
            errorBtn.style.background = 'var(--accent-green)';
        });
    }
});
