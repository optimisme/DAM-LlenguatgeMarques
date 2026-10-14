/* App integration only. The reusable sections and their interactions are HTML/CSS. */
async function setupExamplesEditor() {
    const response = await fetch('examples/sections.json?v=carousel-first');
    if (!response.ok) throw new Error('No es poden carregar els exemples de CSS aplicat.');
    const assets = await response.json();
    ['examples', 'forms', 'interactivity', 'responsive'].forEach(id => {
        setupExampleCollection(workspaceTopics.get(id), assets.filter(entry => (entry.topic || 'examples') === id));
    });
}

function setupExampleCollection(record, assets) {
    const content = record.section.querySelector('.section-content');
    content.innerHTML = '<div class="examples-gallery" role="group" aria-label="Exemple a explorar"></div>';
    const gallery = content.querySelector('.examples-gallery');
    const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const documentFor = (source, css) => {
        const preview = new DOMParser().parseFromString(source, 'text/html');
        preview.querySelectorAll('img[src]').forEach(image => { image.setAttribute('src', new URL(image.getAttribute('src'), location.href).href); });
        return `<!doctype html><html lang="ca"><head><meta charset="utf-8"><base href="about:srcdoc"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0}body{display:flow-root} ${css}</style></head><body>${preview.body.innerHTML}</body></html>`;
    };
    record.groups = assets.map((entry, index) => {
        const prefix = `${record.topic.id}-${entry.id}`;
        const card = workspaceElement('button', 'examples-card'); card.type = 'button'; card.setAttribute('aria-pressed', String(index === 0));
        card.innerHTML = `<span class="examples-thumb" aria-hidden="true"><iframe title="Miniatura" tabindex="-1" sandbox="" loading="lazy"></iframe></span><span class="examples-card-title">${escape(entry.title)}</span><span class="examples-card-tags">${escape(entry.tags.join(' · '))}</span>`;
        // Thumbnails use the original sources; editing an example does not hide its identity.
        card.querySelector('iframe').srcdoc = documentFor(entry.html, compileExampleCss(entry.css));
        gallery.append(card);
        const layout = workspaceElement('div', 'lesson-layout examples-layout');
        if (record.topic.id === 'responsive') layout.classList.add('responsive-layout');
        layout.hidden = index !== 0;
        layout.innerHTML = `<div class="preview-pane"><div class="preview-heading"><span class="pane-label">Resultat en viu</span><span class="examples-css-badge">HTML + CSS</span></div><h2 class="examples-title">${escape(entry.title)}</h2><p class="examples-description">${escape(entry.description)}</p><div class="live-stage examples-stage"><iframe class="examples-frame" title="${escape(entry.title)} — exemple interactiu" sandbox="allow-same-origin"></iframe></div><div class="preview-size"><label for="${prefix}-width">Amplada <output>100%</output></label><input id="${prefix}-width" aria-label="Amplada de la previsualització" type="range" min="35" max="100" value="100"></div></div><div class="controls-pane"><h2 class="pane-label">Personalitza</h2><div class="examples-fields"></div><details class="examples-content"><summary>Textos, enllaços i imatges</summary><div></div></details><p class="property-explanation examples-help">${escape(entry.instructions)}</p><div class="examples-techniques"><span class="pane-label">Tècniques utilitzades</span></div></div>`;
        const controls = layout.querySelector('.controls-pane');
        if (!entry.content.length) controls.querySelector('.examples-content').hidden = true;
        const frame = layout.querySelector('.examples-frame');
        // Safari also applies the script sandbox to listeners installed by the parent.
        // These are preview helpers; the copied examples contain only HTML and CSS.
        frame.setAttribute('sandbox', record.topic.id === 'forms' ? 'allow-same-origin allow-scripts allow-forms' : 'allow-same-origin allow-scripts');
        let values, texts, inputVisibility, contentObserver, syncing = false, previewPercent = 100;
        const fieldNodes = entry.fields.map(config => {
            const variable = `--ex-${entry.id}-${config.name}`;
            const initial = entry.css.match(new RegExp(variable + ':\\s*([^;]+);'))[1].trim();
            const id = `${prefix}-${config.name}`;
            const field = workspaceElement('div', 'examples-field');
            const label = workspaceElement('label', '', config.label); label.htmlFor = id; field.append(label);
            const input = document.createElement(config.type === 'select' ? 'select' : 'input'); input.id = id;
            input.setAttribute('aria-label', config.label);
            if (config.type === 'select') input.dataset.selectorProperty = config.property;
            if (config.type === 'select') config.options.forEach(value => { const option = new Option(value, value); input.append(option); });
            else { input.type = config.type === 'color' ? 'color' : 'number'; if (input.type === 'number') { input.required = true; input.min = config.min; input.max = config.max; input.step = config.step; } }
            field.append(input);
            if (config.type === 'number') field.append(workspaceElement('span', 'examples-unit', config.unit));
            const validation = workspaceElement('p', 'examples-validation', 'Valor no vàlid. Es manté l’últim valor vàlid.'); validation.hidden = true; validation.setAttribute('role', 'status'); field.append(validation);
            controls.querySelector('.examples-fields').append(field);
            if (config.type === 'color') { input.value = parseCssColor(initial).hex; addColorTransparency(input, config.label); }
            return { ...config, variable, initial, input, validation };
        });
        const textNodes = entry.content.map(config => {
            const id = `${prefix}-content-${config.name}`;
            const label = workspaceElement('label', 'editor-field', config.label); label.htmlFor = id;
            const input = document.createElement(config.type === 'textarea' ? 'textarea' : 'input'); input.id = id;
            if (config.type !== 'textarea') input.type = 'text'; else input.rows = 3;
            input.value = config.value; input.setAttribute('aria-label', config.label);
            if (config.type === 'image') input.placeholder = 'Buit: utilitza la il·lustració inclosa';
            label.append(input);
            const error = workspaceElement('p', 'examples-validation', 'Introdueix una ruta o una URL http(s).'); error.hidden = true; error.setAttribute('role', 'status'); label.append(error);
            controls.querySelector('.examples-content > div').append(label);
            return { ...config, input, error };
        });
        entry.properties.forEach(property => {
            const link = workspaceElement('a', 'property-link', property + ':'); link.href = `https://developer.mozilla.org/en-US/docs/Web/CSS/${encodeURIComponent(property)}`; link.target = '_blank'; link.rel = 'noopener noreferrer'; controls.querySelector('.examples-techniques').append(link);
        });
        const getSource = () => {
            let css = entry.css;
            fieldNodes.forEach(config => { css = css.replace(new RegExp(`(${config.variable}:\\s*)[^;]+;`), (_, before) => `${before}${values[config.name]};`); });
            const parsed = new DOMParser().parseFromString(entry.html, 'text/html');
            textNodes.forEach(config => {
                const target = parsed.querySelector(`[data-ex-bind="${config.name}"]`); if (!target) return;
                const value = texts[config.name];
                if (config.type === 'url') target.setAttribute('href', value);
                else if (config.type === 'image') {
                    if (value) { const image = parsed.createElement('img'); image.src = value; image.alt = 'Imatge del projecte'; target.replaceChildren(image); }
                } else target.textContent = value;
            });
            parsed.querySelectorAll('[data-ex-bind]').forEach(element => element.removeAttribute('data-ex-bind'));
            return { html: parsed.body.innerHTML.trim(), css: compileExampleCss(css) };
        };
        const status = record.topic.id === 'responsive' ? workspaceElement('output', 'responsive-status') : null;
        if (status) layout.querySelector('.preview-pane').append(status);
        const fit = () => {
            const previewDocument = frame.contentDocument;
            if (previewDocument?.body && frame.getClientRects().length) {
                const root = previewDocument.documentElement;
                const styles = frame.contentWindow.getComputedStyle(root);
                const width = parseFloat(styles.width);
                const renderedScale = width ? root.getBoundingClientRect().width / width : 1;
                // WebKit can render embedded documents at a different page-zoom scale.
                // Compensate inside the preview only; standalone example CSS is unaffected.
                if (renderedScale > 0 && Math.abs(renderedScale - 1) > .02) {
                    const zoom = (parseFloat(styles.zoom) || 1) / renderedScale;
                    root.style.zoom = String(zoom);
                    root.dataset.previewZoom = 'true';
                }
                if (root.dataset.previewZoom) root.style.width = `${frame.clientWidth}px`;
            }
            if (status && frame.contentDocument?.body) {
                const width = frame.contentDocument.documentElement.clientWidth;
                const breakpoint = entry.breakpointField ? parseFloat(values[entry.breakpointField]) : null;
                if (breakpoint) status.value = `Amplada: ${width}px · ${frame.contentWindow.matchMedia(`(max-width: ${breakpoint}px)`).matches ? `Regla activa: @media (max-width: ${breakpoint}px)` : `Estil base: amplada superior a ${breakpoint}px`}`;
                else {
                    const title = frame.contentDocument.querySelector('h2');
                    status.value = title ? `Amplada: ${width}px · Mida del títol: ${parseFloat(frame.contentWindow.getComputedStyle(title).fontSize).toFixed(1)}px` : `Amplada: ${width}px`;
                }
            }
            // Safari scales fixed-position iframe viewports differently when the outer page is zoomed.
            // Constrain only the embedded preview; the copied CSS keeps its normal viewport sizing.
            if (entry.id === 'navbar' && frame.contentDocument?.body) {
                let sizing = frame.contentDocument.getElementById('preview-sizing');
                if (!sizing) { sizing = frame.contentDocument.createElement('style'); sizing.id = 'preview-sizing'; frame.contentDocument.head.append(sizing); }
                sizing.textContent = `.ex-navbar__bar { width: ${frame.contentDocument.body.clientWidth}px; right: auto; }`;
            }
            if (entry.previewHeight) { frame.style.height = `${entry.previewHeight}px`; return; }
            if (!frame.contentDocument?.body || !frame.getClientRects().length) return;
            // Measure natural content rather than the viewport-sized document scrollHeight.
            const minimum = record.topic.group === 'CSS aplicat' ? 320 : 160;
            const height = Math.max(minimum, Math.ceil(frame.contentDocument.body.getBoundingClientRect().height) + 4);
            if (Math.abs(frame.clientHeight - height) > 1) frame.style.height = `${height}px`;
        };
        const resizePreview = () => {
            const available = layout.querySelector('.examples-stage').clientWidth;
            if (!available) return;
            // Safari must receive the concrete browsing-context width, not only a CSS percentage.
            const pixels = Math.max(1, Math.floor(available * previewPercent / 100));
            frame.setAttribute('width', String(pixels));
            frame.style.width = `${pixels}px`;
            layout.querySelector('.preview-size output').value = `${previewPercent}% · ${pixels}px`;
            fit();
        };
        frame.addEventListener('load', () => {
            fit();
            contentObserver?.disconnect();
            if (frame.contentDocument?.body) {
                contentObserver = new ResizeObserver(fit); contentObserver.observe(frame.contentDocument.body);
                frame.contentDocument.addEventListener('submit', event => event.preventDefault());
                frame.contentDocument.fonts?.ready.then(fit);
                frame.contentDocument.querySelectorAll('img').forEach(image => image.addEventListener('load', fit));
            }
            frame.contentDocument?.body.addEventListener('toggle', fit, true);
            frame.contentDocument?.body.addEventListener('change', fit, true);
            frame.contentDocument?.body.addEventListener('input', fit, true);
            let documentWidth = frame.contentDocument?.documentElement.clientWidth;
            frame.contentWindow?.addEventListener('resize', () => {
                const width = frame.contentDocument?.documentElement.clientWidth;
                if (width !== documentWidth) { documentWidth = width; fit(); }
            });
        });
        let lastWidth = 0, lastHostWidth = 0;
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const width = entry.contentRect.width;
                if (entry.target === frame && Math.abs(width - lastWidth) > .5) { lastWidth = width; fit(); }
                if (entry.target !== frame && Math.abs(width - lastHostWidth) > .5) { lastHostWidth = width; resizePreview(); }
            });
        }); observer.observe(frame); observer.observe(layout.querySelector('.examples-stage'));
        const render = () => { const source = getSource(); frame.srcdoc = documentFor(source.html, source.css); if (workspaceReady) updateWorkspaceCode(); };
        const sync = () => {
            syncing = true;
            fieldNodes.forEach(config => {
                if (config.type === 'color') { const parsed = parseCssColor(values[config.name]); config.input.value = parsed.hex; config.input.dataset.colorAlpha = parsed.alpha; config.input.dispatchEvent(new Event('input', { bubbles: true })); }
                else config.input.value = config.type === 'number' ? parseFloat(values[config.name]) : values[config.name];
                config.input.setAttribute('aria-invalid', 'false'); config.validation.hidden = true;
            });
            textNodes.forEach(config => { config.input.value = texts[config.name]; config.input.setAttribute('aria-invalid', 'false'); config.error.hidden = true; });
            if (workspaceReady) improveControls(controls);
            syncing = false;
        };
        const reset = () => {
            values = Object.fromEntries(fieldNodes.map(config => [config.name, config.type === 'color' ? formatCssColor(config.initial) : config.initial])); texts = Object.fromEntries(textNodes.map(config => [config.name, config.value]));
            controls.querySelector('.examples-content').open = false;
            if (inputVisibility) inputVisibility.checked = false;
            previewPercent = 100; layout.querySelector('.preview-size input').value = '100'; layout.querySelector('.preview-size output').value = '100%'; frame.style.width = '100%'; resizePreview(); sync(); render();
        };
        fieldNodes.forEach(config => config.input.addEventListener(config.type === 'select' ? 'change' : 'input', () => {
            if (syncing) return;
            const valid = config.type !== 'number' || config.input.value !== '' && config.input.validity.valid;
            config.input.setAttribute('aria-invalid', String(!valid)); config.validation.hidden = valid; if (!valid) return;
            values[config.name] = config.type === 'color' ? colorPickerValue(config.input) : config.input.value + (config.type === 'number' ? config.unit : ''); render();
        }));
        textNodes.forEach(config => config.input.addEventListener('input', () => {
            const value = config.input.value; let valid = true;
            if (['image', 'url'].includes(config.type) && value) { try { valid = (config.type === 'image' ? ['http:', 'https:'] : ['http:', 'https:', 'mailto:', 'tel:']).includes(new URL(value, location.href).protocol); } catch { valid = false; } }
            config.input.setAttribute('aria-invalid', String(!valid)); config.error.hidden = valid; if (!valid) return;
            texts[config.name] = value; render();
        }));
        layout.querySelector('.preview-size input').addEventListener('input', event => { previewPercent = Number(event.target.value); resizePreview(); });
        if (record.topic.id === 'responsive') {
            const presets = workspaceElement('div', 'responsive-width-presets preset-buttons');
            [[35, 'Estreta'], [65, 'Mitjana'], [100, 'Ampla']].forEach(([percent, name]) => {
                const button = workspaceElement('button', '', name); button.type = 'button';
                button.addEventListener('click', () => { previewPercent = percent; layout.querySelector('.preview-size input').value = String(percent); resizePreview(); });
                presets.append(button);
            });
            layout.querySelector('.preview-size').after(presets);
        }
        if (record.topic.id === 'interactivity') {
            const label = workspaceElement('label', 'applied-input-toggle');
            const toggle = document.createElement('input'); toggle.type = 'checkbox'; inputVisibility = toggle;
            label.append(toggle, document.createTextNode('Mostra els checkbox i radio de l’exemple'));
            const showInputs = () => {
                if (!frame.contentDocument?.body) return;
                let style = frame.contentDocument.getElementById('preview-inputs');
                if (!style) { style = frame.contentDocument.createElement('style'); style.id = 'preview-inputs'; frame.contentDocument.head.append(style); }
                style.textContent = toggle.checked ? 'input[type=checkbox],input[type=radio]{display:inline-block!important;position:relative!important;inset:auto!important;width:18px!important;height:18px!important;clip-path:none!important;opacity:1!important;overflow:visible!important;margin:8px!important;}' : '';
                fit();
            };
            toggle.addEventListener('change', showInputs); frame.addEventListener('load', showInputs);
            controls.append(label);
        }
        card.addEventListener('click', () => { selectLessonGroup(record, index); layout.querySelector('.preview-pane').scrollIntoView({ block: 'start', behavior: 'smooth' }); });
        reset();
        content.append(layout);
        return { lesson: entry, layout, controls, preview: layout.querySelector('.examples-stage'), pane: layout.querySelector('.preview-pane'), button: card, getSource, reset, fit, resizePreview };
    });
    record.groupIndex = 0;
    record.getSource = () => record.groups[record.groupIndex].getSource();
    record.reset = () => record.groups[record.groupIndex].reset();
    record.onActivate = () => record.groups[record.groupIndex].resizePreview();
    record.findGroupForQuery = query => {
        const words = normaliseSearch(query).split(/\s+/).filter(word => !['exemples', 'examples', 'seccions', 'per', 'copiar', 'formularis', 'interactivitat', 'interactivity', 'forms', 'responsive', 'css', 'aplicat'].includes(word));
        const index = assets.findIndex(entry => words.every(word => normaliseSearch(`${entry.title} ${entry.tags.join(' ')} ${entry.properties.join(' ')} ${entry.description}`).includes(word)));
        if (index >= 0) { [...gallery.children].forEach(card => { card.hidden = false; }); }
        return index;
    };
    record.topic.keywords += ' ' + assets.map(entry => `${entry.title} ${entry.tags.join(' ')} ${entry.properties.join(' ')}`).join(' ');
}
