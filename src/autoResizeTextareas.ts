function initAutoResizeTextareas(): void {
    if (typeof document === 'undefined') return;

    const resize = (el: HTMLTextAreaElement) => {
        // use auto so scrollHeight is measured correctly, then apply measured height
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    const ensureStableResize = (t: HTMLTextAreaElement): void => {
        let last = -1;
        let attempts = 0;
        const maxAttempts = 12; // ~12 frames (~200ms) should cover most framework updates

        const step = () => {
            resize(t);
            const h = t.scrollHeight;
            attempts++;
            if (h !== last && attempts < maxAttempts) {
                last = h;
                requestAnimationFrame(step);
            }
        };

        step();
        // extra fallback for slower updates
        setTimeout(() => resize(t), 250);
    };

    const setup = (t: HTMLTextAreaElement | null): void => {
        if (!t) return;
        t.style.overflow = 'hidden';
        ensureStableResize(t);
        t.addEventListener('input', () => resize(t), { passive: true });
    };

    document.querySelectorAll<HTMLTextAreaElement>('textarea').forEach(setup);

    const mo = new MutationObserver((mutations: MutationRecord[]) => {
        for (const m of mutations) {
            for (const n of Array.from(m.addedNodes)) {
                if (n.nodeType !== Node.ELEMENT_NODE) continue;
                const el = n as Element;
                if (el.matches && el.matches('textarea')) setup(el as HTMLTextAreaElement);
                el.querySelectorAll?.('textarea').forEach(setup);
            }
        }
    });

    mo.observe(document.body, { childList: true, subtree: true });
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoResizeTextareas);
    } else {
        initAutoResizeTextareas();
    }
}