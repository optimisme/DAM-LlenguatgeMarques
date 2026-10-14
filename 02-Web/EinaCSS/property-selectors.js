/* Shared icon + text selectors for button groups and native select controls. */
let propertySelectorId = 0;
function setupPropertySelectors(root) {
    root.querySelectorAll('.property-buttons:not(.property-selector-options)').forEach(list => {
        const options = [...list.children];
        if (options.length < 2 || !options.every(option => option.matches('button.property-btn'))) return;
        const property = (list.closest('.property-row') || list.parentElement).querySelector('.property-link')?.textContent.replace(':', '').trim();
        if (property) mountPropertySelector(list, property);
    });
    setupNativePropertySelectors(root);
    updatePropertyExplanations(root);
}
function mountPropertySelector(list, property, adapter = {}) {
    const options = [...list.children];
    const wrapper = document.createElement('div'); wrapper.className = 'property-selector';
    const trigger = document.createElement('button'); trigger.type = 'button';
    trigger.className = 'property-selector-trigger'; trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-label', property); trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const value = document.createElement('span'); value.className = 'property-selector-value';
    trigger.append(value);
    list.before(wrapper); wrapper.append(trigger, list);
    list.removeAttribute('style');
    list.classList.add('property-selector-options'); list.id ||= `property-options-${++propertySelectorId}`;
    list.setAttribute('popover', 'auto'); list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', property);
    trigger.setAttribute('aria-controls', list.id);
    options.forEach((option, index) => {
        option.type = 'button'; option.id ||= `${list.id}-${index}`;
        option.setAttribute('role', 'option'); option.tabIndex = -1;
        option.setAttribute('aria-label', option.querySelector('.button-label')?.textContent || option.title);
        option.querySelector('img')?.setAttribute('aria-hidden', 'true');
    });
    const isOpen = () => list.matches(':popover-open');
    const selected = () => adapter.selected?.() || options.find(option => option.classList.contains('selected')) || options[0];
    function sync() {
        const choice = selected();
        trigger.disabled = Boolean(adapter.disabled?.());
        if (trigger.disabled && isOpen()) list.hidePopover();
        const icon = choice.querySelector('img')?.cloneNode(true);
        const text = document.createElement('span'); text.textContent = choice.querySelector('.button-label')?.textContent || choice.title;
        value.replaceChildren(...(icon ? [icon, text] : [text]));
        trigger.setAttribute('aria-expanded', String(isOpen()));
        options.forEach(option => {
            if (adapter.disabled) option.disabled = trigger.disabled || option.dataset.optionDisabled === 'true';
            if (adapter.selected) option.classList.toggle('selected', option === choice);
            option.removeAttribute('aria-pressed');
            option.setAttribute('aria-selected', String(option === choice));
            const explanation = explainProperty(property, option.dataset.value || option.querySelector('.button-label')?.textContent, list.closest('#grid') ? 'grid' : '');
            if (explanation) option.title = explanation;
        });
        setPropertyExplanation(wrapper, property, choice.dataset.value || choice.querySelector('.button-label')?.textContent);
    }
    const position = anchorPopover(list, trigger, { matchWidth: true, minWidth: 180, maxHeight: 300 });
    function open(option = selected()) {
        if (!isOpen()) list.showPopover();
        position(); sync(); option.focus(); option.scrollIntoView({ block: 'nearest' });
    }
    function close() { if (isOpen()) list.hidePopover(); sync(); }
    trigger.addEventListener('click', event => { event.preventDefault(); if (isOpen()) close(); else open(); });
    trigger.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
            event.preventDefault(); open(event.key === 'Home' ? options[0] : event.key === 'End' ? options.at(-1) : selected());
        }
    });
    list.addEventListener('click', event => {
        if (!event.target.closest('button.property-btn')) return;
        // Original listeners apply the value before we refresh the selector.
        const option = event.target.closest('button.property-btn');
        queueMicrotask(() => {
            adapter.choose?.(option); close();
            if (trigger.isConnected) trigger.focus();
            else adapter.restoreFocus?.();
        });
    }, true);
    list.addEventListener('keydown', event => {
        const index = options.indexOf(document.activeElement);
        let next;
        if (event.key === 'ArrowDown') next = options[(index + 1) % options.length];
        else if (event.key === 'ArrowUp') next = options[(index - 1 + options.length) % options.length];
        else if (event.key === 'Home') next = options[0];
        else if (event.key === 'End') next = options.at(-1);
        else if (event.key === 'Escape') { event.preventDefault(); close(); trigger.focus(); }
        else if (event.key === 'Tab') {
            // Return focus to the combobox before the browser advances to the next control.
            close(); trigger.focus();
        } else if (event.key.length === 1 && /[a-z0-9-]/i.test(event.key)) {
            const ordered = [...options.slice(index + 1), ...options.slice(0, index + 1)];
            next = ordered.find(option => option.querySelector('.button-label')?.textContent.toLowerCase().startsWith(event.key.toLowerCase()));
        }
        if (next && !next.disabled) { event.preventDefault(); next.focus(); next.scrollIntoView({ block: 'nearest' }); }
    });
    list.addEventListener('toggle', sync);
    if (!adapter.selected) {
        const observer = new MutationObserver(sync);
        observer.observe(list, { subtree: true, attributes: true, attributeFilter: ['class', 'src'] });
    }
    sync();
    return { wrapper, trigger, sync };
}

function selectorProperty(source) {
    if (source.dataset.selectorProperty) return source.dataset.selectorProperty;
    const row = source.closest('.property-row');
    if (row?.querySelector('.property-link')) return row.querySelector('.property-link').textContent.replace(':', '').trim();
    if (source.matches('.filter-type-select')) return 'filter';
    if (source.matches('.transform-type-select')) return 'transform';
    if (source.closest('.transition-item')) return source.parentElement.querySelector('label')?.textContent.startsWith('Timing') ? 'transition-timing-function' : 'transition-property';
    if (source.id?.startsWith('bg-')) return { 'bg-clip': 'background-clip', 'bg-origin': 'background-origin', 'bg-attachment': 'background-attachment' }[source.id] || source.id;
    const label = source.closest('label');
    if (label) return [...label.childNodes].filter(node => node.nodeType === 3).map(node => node.textContent).join('').trim();
    return source.getAttribute('aria-label') || source.id || 'Valor';
}
function propertyOptionIcon(property, value) {
    if (property === 'text-align') return { left: 'textLeft', center: 'textCenter', right: 'textRight', justify: 'textJustify' }[value];
    if (property.startsWith('Costats de ')) {
        const prefix = property.endsWith('padding') ? 'padding' : property.endsWith('border') ? 'border' : 'margin';
        const suffix = { all: 'All', top: 'Top', right: 'Right', bottom: 'Bottom', left: 'Left', vertical: 'Vertical', horizontal: 'Horizontal' }[value];
        return `${prefix}${suffix}`;
    }
    if (property === 'Cantonada') return value === 'all' ? 'borderRadiusAll' : `borderRadius${value.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('')}`;
    if (property === 'border-style') return value === 'none' ? 'initial' : `borderStyle${value[0].toUpperCase()}${value.slice(1)}`;
    if (property === 'box-sizing') return value === 'border-box' ? 'sizingBorder' : 'sizingContent';
    if (property === 'aspect-ratio') return { '1 / 1': 'ratioSquare', '16 / 9': 'ratioLandscape', '3 / 4': 'ratioPortrait' }[value];
    if (property === 'animation-timing-function') return propertyOptionIcon('transition-timing-function', value);
    if (property === 'Propietat del fotograma') return { transform: 'transform', opacity: 'opacity', 'background-color': 'transitionBackgroundColor' }[value];
    if (property === 'animation-iteration-count') return value === 'infinite' ? 'animationInfinite' : `animationRepeat${value}`;
    if (value === 'initial') return 'initial';
    if (property === 'display' && ['grid', 'inline-grid'].includes(value)) return value === 'grid' ? 'displayGrid' : 'displayInlineGrid';
    if (property === 'grid-auto-flow') return { row: 'gridFlowRow', column: 'gridFlowColumn', 'row dense': 'gridFlowRowDense', 'column dense': 'gridFlowColumnDense' }[value];
    if (property === 'Element') return `gridItem${Number(value) + 1}`;
    if (['justify-items', 'justify-self', 'align-self'].includes(property)) {
        if (value === 'auto') return 'initial';
        const axis = property.startsWith('justify') ? 'Column' : 'Row';
        return `align${axis}${value[0].toUpperCase()}${value.slice(1)}`;
    }
    if (['justify-content', 'align-content'].includes(property)) {
        const axis = property === 'justify-content' ? 'Row' : 'Column';
        const variant = { start: 'Start', center: 'Center', end: 'End', 'space-between': 'Between', 'space-around': 'Around', 'space-evenly': 'Evenly' }[value];
        return value === 'stretch' ? (axis === 'Row' ? 'alignColumnStretch' : 'alignRowStretch') : variant ? `justify${axis}${variant}` : 'initial';
    }
    const specificIcons = {
        'animation-name': { aparicio: 'animationFade', lliscament: 'transformTranslate', pulsacio: 'animationPulse', rebot: 'animationBounce', gir: 'transformRotate', sacsejada: 'animationShake' },
        'animation-direction': { normal: 'animationNormal', reverse: 'animationReverse', alternate: 'animationAlternate', 'alternate-reverse': 'animationAlternateReverse' },
        'animation-fill-mode': { none: 'animationFillNone', forwards: 'animationFillForwards', backwards: 'animationFillBackwards', both: 'animationFillBoth' },
        'grid-template-columns': { '1fr': 'gridColumns1', 'repeat(2, 1fr)': 'gridColumns2', 'repeat(3, 1fr)': 'gridColumns3', '2fr 1fr': 'gridColumnsUnequal', '100px 1fr': 'gridColumnsFixed', 'auto-fit': 'gridAutoFit', 'auto-fill': 'gridAutoFill' },
        'grid-template-rows': { 'repeat(2, 1fr)': 'gridRows2', 'repeat(3, 1fr)': 'gridRows3', '60px 1fr': 'gridRowsUnequal', 'repeat(2, 70px)': 'gridRowsFixed', auto: 'gridRowsAuto' },
        'grid-column': { auto: 'initial', 'span 2': 'gridSpanColumns', '1 / -1': 'gridSpanAllColumns', '1 / 2': 'gridColumnFirst', '2 / 3': 'gridColumnSecond' },
        'grid-row': { auto: 'initial', 'span 2': 'gridSpanRows', '1 / 2': 'gridRowFirst', '2 / 3': 'gridRowSecond' },
        'grid-area': { cap: 'gridItem1', menu: 'gridItem2', contingut: 'gridItem3', peu: 'gridItem4', auto: 'initial' },
        position: { static: 'positionStatic', relative: 'positionRelative', absolute: 'positionAbsolute', fixed: 'positionFixed', sticky: 'positionSticky' },
        filter: {
            blur: 'filterBlur', brightness: 'filterBrightness', contrast: 'filterContrast',
            grayscale: 'filterGrayscale', 'hue-rotate': 'filterHueRotate', invert: 'filterInvert',
            opacity: 'filterOpacity', saturate: 'filterSaturate', sepia: 'filterSepia'
        },
        'transition-timing-function': {
            linear: 'timingLinear', ease: 'timingEase', 'ease-in': 'timingEaseIn',
            'ease-out': 'timingEaseOut', 'ease-in-out': 'timingEaseInOut'
        },
        'transition-property': {
            all: 'transitionAll', transform: 'transform', opacity: 'opacity',
            'background-color': 'transitionBackgroundColor', color: 'transitionTextColor',
            width: 'sizingWidth', height: 'sizingHeight', 'border-radius': 'borderRadiusAll',
            margin: 'marginAll', padding: 'paddingAll', 'box-shadow': 'shadows', filter: 'filter'
        },
        'column-span': { none: 'columnSpanNone', all: 'columnSpanAll' },
        'text-overflow': { clip: 'textOverflowClip', ellipsis: 'textOverflowEllipsis' },
        'word-break': { normal: 'wordBreakNormal', 'break-all': 'wordBreakAll', 'keep-all': 'wordBreakKeepAll' },
        'overflow-wrap': { normal: 'overflowWrapNormal', 'break-word': 'overflowWrapBreakWord' },
        'white-space': { normal: 'whiteSpaceNormal', nowrap: 'whiteSpaceNowrap', pre: 'whiteSpacePre', 'pre-wrap': 'whiteSpacePreWrap', 'pre-line': 'whiteSpacePreLine' },
        'writing-mode': { 'horizontal-tb': 'writingModeHorizontalTb', 'vertical-rl': 'writingModeVerticalRl', 'vertical-lr': 'writingModeVerticalLr' }
    };
    if (specificIcons[property]?.[value]) return specificIcons[property][value];
    if (property === 'transform') return ({ translate3d: 'transformTranslate', scale3d: 'transformScale', rotate3d: 'transformRotate', skew: 'transformSkew' })[value] || 'transform';
    if (property === 'direction') return value === 'rtl' ? 'directionRowReverse' : 'directionRow';
    if (property === 'writing-mode') return value === 'horizontal-tb' ? 'directionRow' : 'directionColumn';
    if (property === 'background-size') return value === 'cover' ? 'fitCover' : value === 'contain' ? 'fitContain' : 'fit';
    if (property.startsWith('background') || property.includes('gradient') || property === 'Forma') return 'backgrounds';
    if (property.startsWith('transition')) return 'transition';
    if (property.startsWith('column')) return 'paragraphColumns';
    if (property.startsWith('font')) return 'typography';
    return 'paragraph';
}
function setupNativePropertySelectors(root) {
    root.querySelectorAll('select').forEach(source => {
        if (source.propertySelectorControl) { source.propertySelectorControl.sync(); return; }
        if (source.multiple || source.size > 1) return;
        const property = selectorProperty(source);
        const list = document.createElement('div');
        [...source.options].forEach(option => {
            const button = document.createElement('button'); button.className = 'property-btn';
            button.dataset.value = option.value; button.dataset.optionDisabled = String(option.disabled);
            const icon = document.createElement('img'); icon.src = `images/icons/${propertyOptionIcon(property, option.value)}.svg`; icon.alt = '';
            if (property === 'transition-timing-function' || property === 'animation-timing-function') icon.className = 'timing-curve-icon';
            if (property === 'filter') icon.className = 'filter-function-icon';
            const label = document.createElement('span'); label.className = 'button-label'; label.textContent = option.textContent;
            button.append(icon, label); list.append(button);
        });
        const options = [...list.children];
        source.before(list);
        let replacementIndex;
        const adapter = mountPropertySelector(list, property, {
            selected: () => options[source.selectedIndex], disabled: () => source.disabled,
            choose: option => {
                replacementIndex = [...document.querySelectorAll('.main-controls select')].indexOf(source);
                source.value = option.dataset.value;
                source.dispatchEvent(new Event('change', { bubbles: true }));
                setupNativePropertySelectors(document.querySelector('.main-controls'));
            },
            restoreFocus: () => document.querySelectorAll('.main-controls select')[replacementIndex]?.propertySelectorControl?.trigger.focus()
        });
        source.hidden = true; adapter.wrapper.append(source); source.propertySelectorControl = adapter;
        source.addEventListener('change', () => queueMicrotask(adapter.sync));
        const observer = new MutationObserver(adapter.sync);
        observer.observe(source, { attributes: true, attributeFilter: ['disabled'] });
        adapter.sync();
    });
}
