/* Shared RGB / HEX / alpha picker with the same UI in every browser. */
function parseCssColor(value) {
    const text = String(value).trim();
    const hexMatch = text.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);
    let rgb, alpha = 1;
    if (hexMatch) {
        let hex = hexMatch[1];
        if (hex.length < 5) hex = [...hex].map(character => character + character).join('');
        rgb = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16));
        if (hex.length === 8) alpha = parseInt(hex.slice(6), 16) / 255;
    } else {
        const functional = text.match(/^rgba?\(([^)]+)\)$/i);
        if (functional) {
            const parts = functional[1].trim().split(/\s*[,/]\s*|\s+/);
            rgb = parts.slice(0, 3).map(part => Math.round(parseFloat(part) * (part.endsWith('%') ? 2.55 : 1)));
            if (parts[3] !== undefined) alpha = parseFloat(parts[3]) / (parts[3].endsWith('%') ? 100 : 1);
        } else {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            const context = canvas.getContext('2d');
            context.fillStyle = text;
            context.fillRect(0, 0, 1, 1);
            const pixels = context.getImageData(0, 0, 1, 1).data;
            rgb = [...pixels].slice(0, 3); alpha = pixels[3] / 255;
        }
    }
    rgb = rgb.map(channel => Math.max(0, Math.min(255, channel)));
    return { hex: '#' + rgb.map(channel => channel.toString(16).padStart(2, '0')).join(''), rgb, alpha: Math.max(0, Math.min(100, alpha * 100)) };
}

function formatCssColor(value, opacity) {
    const parsed = parseCssColor(value);
    const alpha = Math.max(0, Math.min(100, Number(opacity ?? parsed.alpha))) / 100;
    return alpha === 1 ? `rgb(${parsed.rgb.join(', ')})` : `rgba(${parsed.rgb.join(', ')}, ${Number(alpha.toFixed(3))})`;
}

function colorPickerValue(picker) {
    return formatCssColor(picker.value, picker.dataset.colorAlpha ?? 100);
}

function colorPickerHex(picker) {
    return parseCssColor(picker.value).hex;
}

let colorControlId = 0;
function colorToHsv(value) {
    const [r, g, b] = parseCssColor(value).rgb.map(channel => channel / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), difference = max - min;
    let hue = 0;
    if (difference) {
        if (max === r) hue = ((g - b) / difference) % 6;
        else if (max === g) hue = (b - r) / difference + 2;
        else hue = (r - g) / difference + 4;
    }
    return { h: (hue * 60 + 360) % 360, s: max ? difference / max * 100 : 0, v: max * 100 };
}
function hsvToHex({ h, s, v }) {
    const saturation = s / 100, brightness = v / 100;
    const channel = offset => {
        const k = (offset + h / 60) % 6;
        return Math.round(255 * brightness * (1 - saturation * Math.max(0, Math.min(k, 4 - k, 1))));
    };
    return '#' + [channel(5), channel(3), channel(1)].map(value => value.toString(16).padStart(2, '0')).join('');
}
function addColorTransparency(picker, description, options = {}) {
    const initialHex = colorPickerHex(picker);
    if (!picker.id) picker.id = `css-color-${++colorControlId}`;
    picker.dataset.colorAlpha = String(options.opacity ?? 100);
    picker.hidden = true;
    picker.setAttribute('aria-label', description);
    picker.value = initialHex;
    const element = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    };
    const control = element('div', 'color-control');
    const header = element('div', 'color-control-header');
    const sample = element('span', 'color-sample');
    const paint = element('span', 'color-paint');
    paint.setAttribute('aria-hidden', 'true');
    const output = element('output', 'color-value'); output.htmlFor = picker.id;
    const trigger = element('button', 'color-trigger'); trigger.type = 'button';
    trigger.setAttribute('aria-label', `Tria el color i l’opacitat — ${description}`);
    trigger.setAttribute('aria-haspopup', 'dialog'); trigger.setAttribute('aria-expanded', 'false');
    picker.before(control); sample.append(paint, picker, trigger); header.append(sample, output); control.append(header);

    const popup = element('div', 'color-popup'); popup.id = `${picker.id}-popup`;
    popup.setAttribute('popover', 'auto'); popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', `Color i opacitat — ${description}`);
    trigger.setAttribute('aria-controls', popup.id);
    const close = element('button', 'color-popup-close', '×'); close.type = 'button';
    close.setAttribute('aria-label', 'Tanca el selector de color');
    const top = element('div', 'color-popup-header'); top.append(element('strong', '', description), close);
    const spectrum = element('div', 'color-spectrum'); spectrum.tabIndex = 0;
    spectrum.setAttribute('role', 'group');
    spectrum.setAttribute('aria-label', 'Saturació i lluminositat. Utilitza les fletxes per ajustar el color.');
    const marker = element('span', 'color-marker'); spectrum.append(marker);
    function slider(suffix, name, max, step, className) {
        const input = element('input', className); input.type = 'range';
        input.min = 0; input.max = max; input.step = step; input.id = `${picker.id}-${suffix}`;
        input.setAttribute('aria-label', `${name} — ${description}`);
        return input;
    }
    const hue = slider('hue', 'To', 360, 1, 'color-hue');
    const range = slider('opacity', 'Opacitat', 100, 0.1, 'color-alpha');
    const hueLabel = element('label', 'sr-only', 'To'); hueLabel.htmlFor = hue.id;
    const alphaLabel = element('label', 'sr-only', 'Opacitat'); alphaLabel.htmlFor = range.id;
    const fields = element('div', 'color-fields');
    function numericField(suffix, name, max, step, letter) {
        const label = element('label', 'color-component');
        const input = element('input'); input.type = 'number'; input.min = 0; input.max = max; input.step = step;
        input.id = `${picker.id}-${suffix}`; input.setAttribute('aria-label', `${name} — ${description}`);
        label.append(input, element('span', '', letter)); fields.append(label);
        return input;
    }
    const channels = ['R', 'G', 'B'].map(letter => numericField(letter.toLowerCase(), letter, 255, 1, letter));
    const alpha = numericField('opacity-number', 'Opacitat (A, de 0 a 1)', 1, 0.001, 'A');
    const hexLabel = element('label', 'color-hex');
    const hex = element('input'); hex.type = 'text'; hex.id = `${picker.id}-hex`; hex.spellcheck = false;
    hex.maxLength = 9; hex.setAttribute('aria-label', `HEX — ${description}`); hex.setAttribute('placeholder', '#0080FF');
    hexLabel.append(element('span', 'sr-only', 'HEX'), hex); fields.append(hexLabel);
    const preview = element('span', 'color-preview');
    const previewPaint = element('span', 'color-paint'); preview.append(previewPaint); preview.setAttribute('aria-hidden', 'true'); fields.append(preview);
    popup.append(top, spectrum, hueLabel, hue, alphaLabel, range, fields); control.append(popup);

    let hsv = colorToHsv(initialHex), updatingColor = false;
    const positionPopup = anchorPopover(popup, sample, { gap: 8 });
    trigger.addEventListener('click', event => {
        event.preventDefault(); popup.togglePopover();
        if (popup.matches(':popover-open')) { positionPopup(); spectrum.focus(); }
    });
    close.addEventListener('click', event => { event.preventDefault(); popup.hidePopover(); trigger.focus(); });
    popup.addEventListener('toggle', () => trigger.setAttribute('aria-expanded', String(popup.matches(':popover-open'))));
    function publish() { picker.dispatchEvent(new Event('input', { bubbles: true })); }
    function changeColor() {
        picker.value = hsvToHex(hsv); updatingColor = true; publish(); updatingColor = false;
    }
    function pickPoint(event) {
        const rect = spectrum.getBoundingClientRect();
        hsv.s = Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100));
        hsv.v = Math.max(0, Math.min(100, 100 - (event.clientY - rect.top) / rect.height * 100));
        changeColor();
    }
    spectrum.addEventListener('pointerdown', event => {
        event.preventDefault(); spectrum.focus(); spectrum.setPointerCapture(event.pointerId); pickPoint(event);
    });
    spectrum.addEventListener('pointermove', event => { if (spectrum.hasPointerCapture(event.pointerId)) pickPoint(event); });
    spectrum.addEventListener('pointerup', event => { if (spectrum.hasPointerCapture(event.pointerId)) spectrum.releasePointerCapture(event.pointerId); });
    spectrum.addEventListener('keydown', event => {
        const step = event.shiftKey ? 10 : 1;
        if (event.key === 'ArrowRight') hsv.s = Math.min(100, hsv.s + step);
        else if (event.key === 'ArrowLeft') hsv.s = Math.max(0, hsv.s - step);
        else if (event.key === 'ArrowUp') hsv.v = Math.min(100, hsv.v + step);
        else if (event.key === 'ArrowDown') hsv.v = Math.max(0, hsv.v - step);
        else return;
        event.preventDefault(); changeColor();
    });
    hue.addEventListener('input', () => { hsv.h = Number(hue.value); changeColor(); });
    range.addEventListener('input', () => { picker.dataset.colorAlpha = range.value; publish(); });
    alpha.addEventListener('input', () => {
        if (alpha.value === '' || !alpha.validity.valid) return;
        picker.dataset.colorAlpha = String(Number(alpha.value) * 100); publish();
    });
    channels.forEach((input, index) => input.addEventListener('input', () => {
        if (input.value === '' || !input.validity.valid) return;
        const rgb = parseCssColor(picker.value).rgb; rgb[index] = Number(input.value);
        picker.value = '#' + rgb.map(channel => channel.toString(16).padStart(2, '0')).join(''); publish();
    }));
    function validHex() { return /^#?([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(hex.value.trim()); }
    hex.addEventListener('input', () => {
        hex.removeAttribute('aria-invalid');
        if (!validHex()) return;
        const value = '#' + hex.value.trim().replace(/^#/, '');
        const parsed = parseCssColor(value); picker.value = parsed.hex;
        if (value.length === 5 || value.length === 9) picker.dataset.colorAlpha = String(Number(parsed.alpha.toFixed(1)));
        publish();
    });
    hex.addEventListener('change', () => { if (!validHex()) hex.setAttribute('aria-invalid', 'true'); });
    [hex, alpha, ...channels].forEach(input => input.addEventListener('blur', () => {
        input.removeAttribute('aria-invalid'); sync();
    }));
    function sync() {
        const value = colorPickerValue(picker), parsed = parseCssColor(picker.value);
        range.value = picker.dataset.colorAlpha;
        if (document.activeElement !== alpha) alpha.value = Number((Number(picker.dataset.colorAlpha) / 100).toFixed(3));
        channels.forEach((input, index) => { if (document.activeElement !== input) input.value = parsed.rgb[index]; });
        if (document.activeElement !== hex) hex.value = parsed.hex.toUpperCase();
        [range, hue, alpha, hex, ...channels, trigger].forEach(input => { input.disabled = picker.disabled; });
        output.value = value; paint.style.backgroundColor = previewPaint.style.backgroundColor = value;
        control.classList.toggle('color-disabled', picker.disabled); sample.title = 'Tria el color i l’opacitat';
        if (picker.disabled && popup.matches(':popover-open')) popup.hidePopover();
        if (!updatingColor) {
            const parsedHsv = colorToHsv(picker.value);
            if (parsedHsv.s > 0 && parsedHsv.v > 0) hsv.h = parsedHsv.h;
            hsv.s = parsedHsv.s; hsv.v = parsedHsv.v;
        }
        hue.value = hsv.h; spectrum.style.backgroundColor = hsvToHex({ h: hsv.h, s: 100, v: 100 });
        marker.style.left = `${hsv.s}%`; marker.style.top = `${100 - hsv.v}%`;
        range.style.backgroundImage = `linear-gradient(to right, transparent, ${formatCssColor(picker.value, 100)}), repeating-conic-gradient(#d6dce5 0% 25%, #fff 0% 50%)`;
    }
    picker.addEventListener('input', () => {
        sync(); options.onChange?.(colorPickerHex(picker), Number(picker.dataset.colorAlpha));
    }, true);
    const observer = new MutationObserver(sync);
    observer.observe(picker, { attributes: true, attributeFilter: ['disabled'] });
    sync();
}
