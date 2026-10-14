/* A visual background editor; exported longhands match the applied styles. */
function setupBackgroundEditor() {
    const record = workspaceTopics.get('background');
    const content = record.section.querySelector('.section-content');
    const defaultGradient = () => ({ type: 'linear', angle: 135, x: 50, y: 50, shape: 'ellipse', stops: [
        { color: '#2563eb', alpha: 100, position: 0 }, { color: '#7c3aed', alpha: 100, position: 100 }
    ] });
    const defaultImage = () => ({ url: 'images/image0.jpg', source: 'images/image0.jpg', size: 'cover', x: 50, y: 50, repeat: 'no-repeat' });
    const defaults = () => ({ mode: 'color', color: '#2563eb', alpha: 100, gradient: defaultGradient(), image: defaultImage(), clip: 'border-box', origin: 'padding-box', attachment: 'scroll', width: 100, height: 280,
        layers: [{ kind: 'gradient', visible: true, gradient: { ...defaultGradient(), stops: [{ color: '#111827', alpha: 75, position: 0 }, { color: '#111827', alpha: 5, position: 100 }] } }, { kind: 'image', visible: true, image: defaultImage() }] });
    let state = defaults();
    let customCss = null;
    const objectUrls = new Set();
    content.innerHTML = `<div class="lesson-tabs bg-tabs" role="group" aria-label="Tipus de fons">
        <button type="button" data-bg-mode="color" aria-pressed="true">Color</button><button type="button" data-bg-mode="image" aria-pressed="false">Imatge</button><button type="button" data-bg-mode="gradient" aria-pressed="false">Gradient</button><button type="button" data-bg-mode="layers" aria-pressed="false">Capes</button></div>
        <div class="lesson-layout"><div class="preview-pane bg-preview-pane"><span class="pane-label">Resultat en viu</span>
        <div class="bg-stage live-stage live-stage--transparency"><div id="background-demo-box" class="bg-demo"><span class="demo-kicker">EL TEU FONS</span><strong>Hola, CSS!</strong><span>Una caixa. Moltes possibilitats.</span></div></div>
        <div class="preview-size"><label for="bg-preview-width">Amplada <output id="bg-width-output">100%</output></label><input id="bg-preview-width" type="range" min="40" max="100" value="100">
        <label for="bg-preview-height">Alçada <output id="bg-height-output">280px</output></label><input id="bg-preview-height" type="range" min="180" max="420" value="280" step="10"></div>
        <p class="preview-note" id="bg-hint"></p><p class="bg-feedback" id="bg-feedback" role="status"></p></div>
        <div class="controls-pane"><h2 class="pane-label">Construeix el fons</h2><div id="bg-mode-controls"></div>
        <details class="advanced-controls"><summary>Àrea del fons i desplaçament</summary><div class="field-grid">
        <label>background-clip<select id="bg-clip"><option>border-box</option><option>padding-box</option><option>content-box</option><option>text</option></select></label>
        <label>background-origin<select id="bg-origin"><option>padding-box</option><option>border-box</option><option>content-box</option></select></label>
        <label>background-attachment<select id="bg-attachment"><option>scroll</option><option>local</option><option>fixed</option></select></label>
        </div><p class="field-help">Origin defineix des d’on es posiciona el fons; clip, fins on es pinta. Prova text per omplir les lletres.</p></details>
        <details class="advanced-controls"><summary>Edita el CSS del fons</summary><label for="bg-css-input">Propietats de background (sense selector)</label><textarea id="bg-css-input" rows="7" spellcheck="false"></textarea><button type="button" id="bg-apply-css" class="action-button">Aplica el CSS</button><button type="button" id="bg-visual-css" class="action-button">Torna als controls visuals</button><p class="field-help">Pots enganxar background o les seves propietats individuals. Els controls visuals recuperen la seva configuració en tornar-hi.</p></details>
        <div class="preset-panel"><span class="pane-label">Prova un exemple</span><div class="preset-buttons">
        <button type="button" data-bg-preset="photo">Foto amb cover</button><button type="button" data-bg-preset="contain">Imatge amb contain</button><button type="button" data-bg-preset="pattern">Patró repetit</button><button type="button" data-bg-preset="diagonal">Gradient diagonal</button><button type="button" data-bg-preset="three">Tres colors</button><button type="button" data-bg-preset="radial">Gradient radial</button><button type="button" data-bg-preset="conic">Roda de colors</button><button type="button" data-bg-preset="overlay">Gradient sobre foto</button><button type="button" data-bg-preset="text">Text amb gradient</button></div></div>
        <a class="property-link docs-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/background" target="_blank" rel="noopener noreferrer">background: documentació ↗</a></div></div>`;
    content.querySelector('.bg-tabs').after(document.getElementById('bg-hint'));
    const demo = document.getElementById('background-demo-box');
    const panel = document.getElementById('bg-mode-controls');
    const feedback = document.getElementById('bg-feedback');
    const quoteUrl = url => `url("${url.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\n\r]/g, '')}")`;
    const gradientCss = gradient => {
        const stops = gradient.stops.map(stop => `${formatCssColor(stop.color, stop.alpha)} ${stop.position}%`).join(', ');
        if (gradient.type === 'radial') return `radial-gradient(${gradient.shape} at ${gradient.x}% ${gradient.y}%, ${stops})`;
        if (gradient.type === 'conic') return `conic-gradient(from ${gradient.angle}deg at ${gradient.x}% ${gradient.y}%, ${stops})`;
        return `linear-gradient(${gradient.angle}deg, ${stops})`;
    };
    function visualProperties(forExport = false) {
        let layers = [];
        if (state.mode === 'image') layers = [{ kind: 'image', image: state.image }];
        if (state.mode === 'gradient') layers = [{ kind: 'gradient', gradient: state.gradient }];
        if (state.mode === 'layers') layers = state.layers.filter(layer => layer.visible);
        const images = layers.map(layer => layer.kind === 'image' ? quoteUrl(forExport ? layer.image.source : layer.image.url) : gradientCss(layer.gradient));
        const properties = {
            'background-color': formatCssColor(state.color, state.alpha),
            'background-image': images.join(',\n    ') || 'none'
        };
        if (layers.length) {
            properties['background-position'] = layers.map(layer => layer.kind === 'image' ? `${layer.image.x}% ${layer.image.y}%` : 'center').join(', ');
            properties['background-size'] = layers.map(layer => layer.kind === 'image' ? layer.image.size : 'auto').join(', ');
            properties['background-repeat'] = layers.map(layer => layer.kind === 'image' ? layer.image.repeat : 'no-repeat').join(', ');
        }
        properties['background-origin'] = state.origin;
        properties['background-clip'] = state.clip;
        properties['background-attachment'] = state.attachment;
        if (state.clip === 'text') properties.color = 'transparent';
        return properties;
    }
    function declarations(properties) {
        return Object.entries(properties).map(([property, value]) => `  ${property}: ${value};`).join('\n');
    }
    function renderPreview() {
        demo.style.cssText = '';
        const properties = customCss || visualProperties();
        Object.entries(properties).forEach(([property, value]) => demo.style.setProperty(property, value));
        demo.style.width = `${state.width}%`;
        demo.style.height = `${state.height}px`;
        document.getElementById('bg-width-output').value = `${state.width}%`;
        document.getElementById('bg-height-output').value = `${state.height}px`;
        if (!customCss) document.getElementById('bg-css-input').value = declarations(visualProperties(true)).trim();
        const hints = {
            color: 'La transparència deixa veure la quadrícula del darrere. El text conserva la seva opacitat.',
            image: 'Canvia la proporció de la caixa per comparar cover i contain. Ajusta la posició per triar quina part de la foto es veu.',
            gradient: 'Els gradients són imatges generades per CSS. Mou les parades per canviar on es distribueixen els colors.',
            layers: 'La primera capa de la llista es pinta al davant. Utilitza colors transparents per deixar veure la imatge de sota.'
        };
        document.getElementById('bg-hint').textContent = customCss ? 'S’està aplicant el CSS manual. Torna als controls visuals per recuperar-ne els ajustos.' : hints[state.mode];
        panel.querySelectorAll('input, select, button').forEach(field => { field.disabled = Boolean(customCss) || field.dataset.boundaryDisabled === 'true'; });
        ['bg-clip', 'bg-origin', 'bg-attachment'].forEach(id => { document.getElementById(id).disabled = Boolean(customCss); });
        if (workspaceReady) updateWorkspaceCode();
    }
    function field(parent, labelText, type, value, onChange, options = {}) {
        const label = workspaceElement(type === 'color' ? 'div' : 'label', 'editor-field', labelText);
        const input = document.createElement(type === 'select' ? 'select' : 'input');
        if (type === 'select') (options.values || []).forEach(option => {
            const entry = document.createElement('option');
            entry.value = typeof option === 'string' ? option : option[0];
            entry.textContent = typeof option === 'string' ? option : option[1];
            input.append(entry);
        });
        else input.type = type;
        ['min', 'max', 'step', 'placeholder'].forEach(key => { if (options[key] !== undefined) input[key] = options[key]; });
        input.value = value;
        label.append(input);
        parent.append(label);
        if (type === 'color') {
            addColorTransparency(input, labelText, { opacity: options.opacity ?? 100, onChange: (hex, alpha) => {
                onChange(hex, alpha);
                renderPreview();
            } });
            setPropertyExplanation(label, labelText === 'Color de fons' ? 'background-color' : 'color-stop', '');
        } else input.addEventListener(type === 'select' ? 'change' : 'input', () => {
            if (type === 'number' && !input.validity.valid) return;
            onChange(type === 'number' || type === 'range' ? Number(input.value) : input.value);
            renderPreview();
        });
        return input;
    }
    function numeric(parent, title, value, min, max, change, suffix = '%') {
        const wrapper = workspaceElement('div', 'numeric-field');
        const label = workspaceElement('label', '', title);
        const range = document.createElement('input');
        range.type = 'range'; range.min = min; range.max = max; range.value = value;
        const number = document.createElement('input');
        number.type = 'number'; number.min = min; number.max = max; number.value = value;
        number.setAttribute('aria-label', `${title} — valor numèric`);
        label.append(range);
        const row = workspaceElement('div', 'numeric-row');
        row.append(label, number, workspaceElement('span', '', suffix));
        wrapper.append(row); parent.append(wrapper);
        const update = input => {
            if (!input.validity.valid || input.value === '') return;
            range.value = input.value; number.value = input.value;
            change(Number(input.value)); renderPreview();
        };
        range.addEventListener('input', () => update(range));
        number.addEventListener('input', () => update(number));
    }
    function colorControls(parent) {
        field(parent, 'Color de fons', 'color', state.color, (value, alpha) => {
            state.color = value;
            state.alpha = alpha;
        }, { opacity: state.alpha });
    }
    function imageControls(parent, image) {
        const gallery = workspaceElement('div', 'image-gallery');
        ['images/image0.jpg', 'images/image1.jpg', 'images/image2.jpg'].forEach((url, index) => {
            const button = workspaceElement('button', 'image-choice');
            button.type = 'button'; button.setAttribute('aria-label', `Tria la imatge ${index + 1}`);
            button.setAttribute('aria-pressed', String(image.url === url));
            const img = document.createElement('img'); img.src = url; img.alt = `Imatge d’exemple ${index + 1}`;
            button.append(img);
            button.addEventListener('click', () => {
                image.url = url; image.source = url; renderControls(); renderPreview();
            });
            gallery.append(button);
        });
        parent.append(gallery);
        const urlInput = field(parent, 'URL o ruta de la imatge', 'text', image.source, value => {
            let valid = false;
            try { valid = ['http:', 'https:'].includes(new URL(value, location.href).protocol) && value.trim().length > 0; } catch { /* Invalid URL */ }
            if (valid) {
                image.url = value; image.source = value; urlInput.removeAttribute('aria-invalid'); feedback.textContent = '';
            } else { urlInput.setAttribute('aria-invalid', 'true'); feedback.textContent = 'Introdueix una ruta relativa o una URL HTTP/HTTPS vàlida.'; }
        });
        const upload = workspaceElement('label', 'upload-label', 'Prova una imatge del teu ordinador');
        const file = document.createElement('input'); file.type = 'file'; file.accept = 'image/*';
        file.addEventListener('change', () => {
            const selected = file.files[0];
            if (!selected) return;
            if (!selected.type.startsWith('image/')) { feedback.textContent = 'Selecciona un fitxer d’imatge.'; return; }
            const url = URL.createObjectURL(selected); objectUrls.add(url);
            image.url = url; image.source = `images/${selected.name}`;
            feedback.textContent = `Imatge local: ${selected.name}. Per reutilitzar el CSS, desa-la a ${image.source}.`;
            renderControls(); renderPreview();
        });
        upload.append(file); parent.append(upload);
        const grid = workspaceElement('div', 'field-grid');
        field(grid, 'background-size', 'select', ['cover', 'contain', 'auto'].includes(image.size) ? image.size : 'custom', value => {
            image.size = value === 'custom' ? '80px 80px' : value;
            renderControls();
        }, { values: [['cover', 'cover — omple i retalla'], ['contain', 'contain — mostra tota la imatge'], ['auto', 'auto — mida original'], ['custom', 'Mida manual']] });
        field(grid, 'background-repeat', 'select', image.repeat, value => image.repeat = value, { values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'space', 'round'] });
        parent.append(grid);
        if (!['cover', 'contain', 'auto'].includes(image.size)) {
            const size = field(parent, 'Mida manual', 'text', image.size, value => {
                if (CSS.supports('background-size', value)) { image.size = value; size.removeAttribute('aria-invalid'); feedback.textContent = ''; }
                else { size.setAttribute('aria-invalid', 'true'); feedback.textContent = 'Mida no vàlida. Exemple: 80px 80px o 50% auto.'; }
            });
        }
        const positions = workspaceElement('div', 'position-grid');
        positions.setAttribute('role', 'group'); positions.setAttribute('aria-label', 'Posició de la imatge');
        const names = ['Superior esquerra', 'Superior centre', 'Superior dreta', 'Centre esquerra', 'Centre', 'Centre dreta', 'Inferior esquerra', 'Inferior centre', 'Inferior dreta'];
        [0, 50, 100].forEach((y, row) => [0, 50, 100].forEach((x, col) => {
            const button = workspaceElement('button', '', ['↖', '↑', '↗', '←', '●', '→', '↙', '↓', '↘'][row * 3 + col]);
            button.type = 'button'; button.setAttribute('aria-label', names[row * 3 + col]);
            button.setAttribute('aria-pressed', String(image.x === x && image.y === y));
            button.addEventListener('click', () => { image.x = x; image.y = y; renderControls(); renderPreview(); });
            positions.append(button);
        }));
        parent.append(workspaceElement('span', 'field-label', 'background-position'), positions);
        numeric(parent, 'Posició X', image.x, 0, 100, value => image.x = value);
        numeric(parent, 'Posició Y', image.y, 0, 100, value => image.y = value);
    }
    function gradientControls(parent, gradient) {
        field(parent, 'Tipus de gradient', 'select', gradient.type, value => { gradient.type = value; renderControls(); }, { values: [['linear', 'Lineal'], ['radial', 'Radial'], ['conic', 'Cònic']] });
        if (gradient.type !== 'radial') numeric(parent, 'Angle', gradient.angle, 0, 360, value => gradient.angle = value, '°');
        if (gradient.type !== 'linear') {
            numeric(parent, 'Centre X', gradient.x, 0, 100, value => gradient.x = value);
            numeric(parent, 'Centre Y', gradient.y, 0, 100, value => gradient.y = value);
        }
        if (gradient.type === 'radial') field(parent, 'Forma', 'select', gradient.shape, value => gradient.shape = value, { values: ['ellipse', 'circle'] });
        parent.append(workspaceElement('span', 'field-label', 'Parades de color'));
        const bar = workspaceElement('div', 'gradient-bar');
        bar.style.backgroundImage = `linear-gradient(90deg, ${gradient.stops.map(stop => `${formatCssColor(stop.color, stop.alpha)} ${stop.position}%`).join(', ')})`;
        parent.append(bar);
        gradient.stops.forEach((stop, index) => {
            const card = workspaceElement('div', 'stop-card');
            const header = workspaceElement('div', 'stop-header');
            header.append(workspaceElement('strong', '', `Color ${index + 1}`));
            if (gradient.stops.length > 2) {
                const remove = workspaceElement('button', 'text-button', 'Elimina'); remove.type = 'button';
                remove.setAttribute('aria-label', `Elimina el color ${index + 1}`);
                remove.addEventListener('click', () => { gradient.stops.splice(index, 1); renderControls(); renderPreview(); });
                header.append(remove);
            }
            card.append(header);
            field(card, `Color ${index + 1}`, 'color', stop.color, (value, alpha) => { stop.color = value; stop.alpha = alpha; updateGradientBar(); }, { opacity: stop.alpha });
            numeric(card, `Posició del color ${index + 1}`, stop.position, 0, 100, value => { stop.position = value; updateGradientBar(); });
            parent.append(card);
        });
        function updateGradientBar() { bar.style.backgroundImage = `linear-gradient(90deg, ${gradient.stops.map(stop => `${formatCssColor(stop.color, stop.alpha)} ${stop.position}%`).join(', ')})`; }
        const add = workspaceElement('button', 'action-button', '+ Afegeix un color'); add.type = 'button';
        add.addEventListener('click', () => {
            gradient.stops.splice(gradient.stops.length - 1, 0, { color: '#f59e0b', alpha: 100, position: 50 });
            renderControls(); renderPreview();
        });
        parent.append(add);
    }
    function renderControls() {
        panel.replaceChildren();
        content.querySelectorAll('[data-bg-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.bgMode === state.mode)));
        colorControls(panel);
        if (state.mode === 'image') imageControls(panel, state.image);
        if (state.mode === 'gradient') gradientControls(panel, state.gradient);
        if (state.mode === 'layers') {
            panel.append(workspaceElement('p', 'field-help', 'De davant cap al darrere. Obre una capa per editar-la.'));
            state.layers.forEach((layer, index) => {
                const card = workspaceElement('details', 'layer-card');
                card.open = index === 0;
                card.append(workspaceElement('summary', '', `${index + 1}. ${layer.kind === 'image' ? 'Imatge' : 'Gradient'}${layer.visible ? '' : ' (oculta)'}`));
                const actions = workspaceElement('div', 'layer-actions');
                const visible = workspaceElement('label', '', 'Visible');
                const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = layer.visible;
                checkbox.addEventListener('change', () => { layer.visible = checkbox.checked; renderPreview(); });
                visible.prepend(checkbox); actions.append(visible);
                [['↑', -1], ['↓', 1]].forEach(([label, offset]) => {
                    const move = workspaceElement('button', 'action-button', label); move.type = 'button';
                    move.setAttribute('aria-label', `${offset < 0 ? 'Puja' : 'Baixa'} la capa ${index + 1}`);
                    move.disabled = index + offset < 0 || index + offset >= state.layers.length;
                    move.dataset.boundaryDisabled = String(move.disabled);
                    move.addEventListener('click', () => { const [moved] = state.layers.splice(index, 1); state.layers.splice(index + offset, 0, moved); renderControls(); renderPreview(); });
                    actions.append(move);
                });
                const remove = workspaceElement('button', 'text-button', 'Elimina'); remove.type = 'button';
                remove.setAttribute('aria-label', `Elimina la capa ${index + 1}`);
                remove.addEventListener('click', () => { state.layers.splice(index, 1); renderControls(); renderPreview(); });
                actions.append(remove); card.append(actions);
                if (layer.kind === 'image') imageControls(card, layer.image);
                else gradientControls(card, layer.gradient);
                panel.append(card);
            });
            const actions = workspaceElement('div', 'layer-actions');
            ['image', 'gradient'].forEach(kind => {
                const add = workspaceElement('button', 'action-button', `+ ${kind === 'image' ? 'Imatge' : 'Gradient'}`); add.type = 'button';
                add.addEventListener('click', () => { state.layers.unshift({ kind, visible: true, [kind]: kind === 'image' ? defaultImage() : defaultGradient() }); renderControls(); renderPreview(); });
                actions.append(add);
            });
            panel.append(actions);
        }
        setupNativePropertySelectors(panel);
    }
    function sync() {
        document.getElementById('bg-clip').value = state.clip;
        document.getElementById('bg-origin').value = state.origin;
        document.getElementById('bg-attachment').value = state.attachment;
        document.getElementById('bg-preview-width').value = state.width;
        document.getElementById('bg-preview-height').value = state.height;
        renderControls(); renderPreview();
    }
    content.querySelectorAll('[data-bg-mode]').forEach(button => button.addEventListener('click', () => {
        state.mode = button.dataset.bgMode; customCss = null; feedback.textContent = ''; sync();
    }));
    [['bg-clip', 'clip'], ['bg-origin', 'origin'], ['bg-attachment', 'attachment'], ['bg-preview-width', 'width'], ['bg-preview-height', 'height']].forEach(([id, key]) => {
        const field = document.getElementById(id);
        field.addEventListener(field.type === 'range' ? 'input' : 'change', () => {
            state[key] = field.type === 'range' ? Number(field.value) : field.value; renderPreview();
        });
    });
    content.querySelectorAll('[data-bg-preset]').forEach(button => button.addEventListener('click', () => {
        state = defaults(); customCss = null; feedback.textContent = '';
        switch (button.dataset.bgPreset) {
            case 'photo': state.mode = 'image'; break;
            case 'contain': state.mode = 'image'; state.image.size = 'contain'; state.color = '#e2e8f0'; break;
            case 'pattern': state.mode = 'image'; state.image.size = '80px 80px'; state.image.repeat = 'repeat'; break;
            case 'diagonal': state.mode = 'gradient'; break;
            case 'three': state.mode = 'gradient'; state.gradient.stops.splice(1, 0, { color: '#f59e0b', alpha: 100, position: 50 }); break;
            case 'radial': state.mode = 'gradient'; state.gradient.type = 'radial'; break;
            case 'conic': state.mode = 'gradient'; state.gradient.type = 'conic'; state.gradient.stops.splice(1, 0, { color: '#f59e0b', alpha: 100, position: 50 }); break;
            case 'overlay': state.mode = 'layers'; break;
            case 'text': state.mode = 'gradient'; state.clip = 'text'; break;
        }
        sync();
    }));
    document.getElementById('bg-apply-css').addEventListener('click', () => {
        const text = document.getElementById('bg-css-input').value;
        const candidate = document.createElement('div');
        const declarations = text.split(/;(?![^()]*\))/).map(part => part.trim()).filter(Boolean);
        const allowed = new Set(['background', 'background-color', 'background-image', 'background-position', 'background-size', 'background-repeat', 'background-origin', 'background-clip', 'background-attachment', 'background-blend-mode']);
        for (const declaration of declarations) {
            const separator = declaration.indexOf(':');
            const property = declaration.slice(0, separator).trim();
            const value = declaration.slice(separator + 1).trim();
            if (separator < 1 || !allowed.has(property) || !CSS.supports(property, value)) {
                feedback.textContent = `Declaració no vàlida: ${declaration}`;
                document.getElementById('bg-css-input').setAttribute('aria-invalid', 'true');
                return;
            }
            candidate.style.setProperty(property, value);
        }
        if (!declarations.length) { feedback.textContent = 'Escriu almenys una propietat de background.'; return; }
        customCss = {};
        Array.from(candidate.style).forEach(property => { customCss[property] = candidate.style.getPropertyValue(property); });
        if (candidate.style.backgroundClip === 'text') customCss.color = 'transparent';
        document.getElementById('bg-css-input').removeAttribute('aria-invalid');
        feedback.textContent = 'CSS aplicat. El bloc copiable mostra les declaracions que s’estan utilitzant.';
        renderPreview();
    });
    document.getElementById('bg-visual-css').addEventListener('click', () => { customCss = null; feedback.textContent = ''; sync(); });
    record.getCss = () => `.exemple {\n${declarations(customCss || visualProperties(true))}\n}`;
    record.reset = () => { state = defaults(); customCss = null; feedback.textContent = ''; document.getElementById('bg-css-input').removeAttribute('aria-invalid'); sync(); };
    window.addEventListener('pagehide', () => objectUrls.forEach(url => URL.revokeObjectURL(url)));
    sync();
}
