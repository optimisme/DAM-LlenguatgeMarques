/* Keep open popovers attached to their control as the page scrolls or resizes. */
function anchorPopover(popup, anchor, options = {}) {
    const gap = options.gap ?? 6;
    let placement;
    function position(resetPlacement = false) {
        if (!popup.matches(':popover-open')) return;
        const rect = anchor.getBoundingClientRect();
        if (!anchor.isConnected || !anchor.getClientRects().length || rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) {
            popup.hidePopover(); return;
        }
        if (options.matchWidth) popup.style.width = `${Math.min(Math.max(rect.width, options.minWidth ?? 180), window.innerWidth - 16)}px`;
        const limit = Math.min(options.maxHeight ?? Infinity, window.innerHeight - 16);
        if (!placement || resetPlacement) {
            popup.style.maxHeight = `${limit}px`;
            const height = popup.offsetHeight;
            const below = window.innerHeight - rect.bottom - gap - 8;
            const above = rect.top - gap - 8;
            placement = height <= below ? 'below' : height <= above ? 'above' : below >= above ? 'below' : 'above';
        }
        const available = {
            below: window.innerHeight - rect.bottom - gap - 8,
            above: rect.top - gap - 8
        };
        const other = placement === 'below' ? 'above' : 'below';
        if (available[placement] < 80 && available[other] > available[placement]) placement = other;
        popup.style.maxHeight = `${Math.max(32, Math.min(limit, available[placement]))}px`;
        const width = popup.offsetWidth, height = popup.offsetHeight;
        popup.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))}px`;
        const top = placement === 'below' ? rect.bottom + gap : rect.top - height - gap;
        popup.style.top = `${top}px`;
    }
    function onScroll(event) {
        if (!popup.contains(event.target)) position();
    }
    function onResize() { position(true); }
    popup.addEventListener('toggle', event => {
        if (event.newState === 'open') {
            position();
            window.addEventListener('scroll', onScroll, true);
            window.addEventListener('resize', onResize);
        } else {
            placement = undefined;
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onResize);
        }
    });
    return position;
}
