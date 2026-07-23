/* ── State ─────────────────────────────────── */
let props = []; // [{key, value}]

/* ── Parse compact string ───────────────────── */
function parseCompact() {
    const raw = document.getElementById('importInput').value.trim();
    if (!raw) return;

    const parsed = raw.split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .map(entry => {
            const eq = entry.indexOf('=');
            return eq === -1
                ? { key: entry, value: '' }
                : { key: entry.slice(0, eq).trim(), value: entry.slice(eq + 1) };
        });

    props = parsed;
    document.getElementById('importInput').value = '';
    render();
    syncOutput();
}

/* ── Mutations ──────────────────────────────── */
function addProperty(key = '', value = '') {
    props.push({ key, value });
    render();
    syncOutput();
    requestAnimationFrame(() => {
        const keys = document.querySelectorAll('.prop-key-inp');
        if (keys.length) keys[keys.length - 1].focus();
    });
}

function updateField(i, field, v) {
    props[i][field] = v;
    syncOutput();
}

function deleteRow(i) {
    props.splice(i, 1);
    render();
    syncOutput();
}

function clearAll() {
    if (!props.length) return;
    props = [];
    render();
    syncOutput();
}

/* ── Render left panel ──────────────────────── */
function render() {
    const list = document.getElementById('propsList');

    if (!props.length) {
        list.innerHTML = `
            <div class="empty-hint">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="8" y1="8"  x2="16" y2="8"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                    <line x1="8" y1="16" x2="12" y2="16"/>
                </svg>
                <p>Paste a compact string above and click <strong>Parse</strong>,<br>or add properties manually with the button below.</p>
            </div>`;
        document.getElementById('countBadge').textContent = '0 properties';
        return;
    }

    list.innerHTML = props.map((p, i) => `
        <div class="prop-row">
            <input class="prop-key-inp" type="text"
                value="${esc(p.key)}" placeholder="key"
                oninput="updateField(${i},'key',this.value)"
                onkeydown="rowKey(event,${i},0)">
            <span class="prop-eq">=</span>
            <input class="prop-val-inp" type="text"
                value="${esc(p.value)}" placeholder="value"
                oninput="updateField(${i},'value',this.value)"
                onkeydown="rowKey(event,${i},1)">
            <button class="prop-del" onclick="deleteRow(${i})" title="Delete row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6"  x2="6"  y2="18"/>
                    <line x1="6"  y1="6"  x2="18" y2="18"/>
                </svg>
            </button>
        </div>`).join('');

    const n = props.length;
    document.getElementById('countBadge').textContent = `${n} propert${n === 1 ? 'y' : 'ies'}`;
}

/* Enter key behaviour inside rows */
function rowKey(e, i, col) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (col === 0) {
            // key → move to value
            document.querySelectorAll('.prop-row')[i]?.querySelector('.prop-val-inp')?.focus();
        } else {
            // value → add new row below
            addProperty();
        }
    } else if (e.key === 'Delete' && e.ctrlKey) {
        e.preventDefault();
        deleteRow(i);
    }
}

/* ── Sync compact output ────────────────────── */
function syncOutput() {
    const valid = props.filter(p => p.key.trim());
    const compact = valid.map(p => `${p.key}=${p.value}`).join(';') + (valid.length ? ';' : '');

    document.getElementById('compactOutput').value = compact;
    document.getElementById('charInfo').textContent =
        `${compact.length} characters · ${valid.length} propert${valid.length === 1 ? 'y' : 'ies'}`;
}

/* ── Copy ───────────────────────────────────── */
function copyOutput() {
    const text = document.getElementById('compactOutput').value;
    if (!text) return;

    const done = () => {
        showToast();
        const btn = document.getElementById('copyBtn');
        btn.classList.add('copied');
        btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
            </svg>Copied!`;
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>Copy`;
        }, 2200);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done);
    } else {
        document.getElementById('compactOutput').select();
        document.execCommand('copy');
        done();
    }
}

function showToast() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

/* ── HTML escape for attribute values ─────── */
function esc(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/* ── Wire import bar ────────────────────────── */
const inp = document.getElementById('importInput');
inp.addEventListener('paste', () => setTimeout(parseCompact, 30));
inp.addEventListener('keydown', e => { if (e.key === 'Enter') parseCompact(); });
