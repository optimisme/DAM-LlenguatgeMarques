/* Native box-model and dimensions lessons share the source used by the live example. */
function setupBoxEditors() {
    const sides = ['top', 'right', 'bottom', 'left'];
    const sideNames = ['Superior', 'Dret', 'Inferior', 'Esquerre'];
    const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
    const cornerNames = ['Superior esquerra', 'Superior dreta', 'Inferior dreta', 'Inferior esquerra'];
    const scopes = [['all', 'Tots els costats'], ['vertical', 'Superior i inferior'], ['horizontal', 'Esquerre i dret'], ...sides.map((side, i) => [side, sideNames[i]])];
    const f = (property, type = 'css', options = null) => ({ property, type, options });
    const p = (id, label, props = {}, extras = {}) => ({ id, label, props, ...extras });
    const spacingPresets = property => property === 'margin' ? [
        p('model', 'Les quatre zones', { margin: '16px', padding: '20px', border: '4px solid rgb(52, 140, 236)' }),
        p('separate', 'Separar targetes', { margin: '20px 0' }, { scope: 'vertical' }),
        p('all', 'Igual a tots els costats', { margin: '20px' }),
        p('side', 'Només a l’esquerra', { margin: '0 0 0 32px' }, { scope: 'left', value: '32px' }),
        p('center', 'Centrar amb auto', { margin: '16px auto' }, { scope: 'horizontal', value: 'auto' }),
        p('negative', 'Marge negatiu', { margin: '-12px 0 16px' }, { scope: 'top', value: '-12px' })
    ] : [
        p('card', 'Targeta espaiosa', { padding: '24px' }),
        p('button', 'Botó · 8px 16px', { padding: '8px 16px' }, { shape: 'button' }),
        p('compact', 'Contingut compacte', { padding: '8px' }),
        p('side', 'Només a l’esquerra', { padding: '0 0 0 32px' }, { scope: 'left', value: '32px' })
    ];
    const boxLessons = [
        ...['margin', 'padding'].map(property => ({ id: property, title: property === 'margin' ? 'Margin' : 'Padding', spacing: property,
            keywords: `${property} espai costats abreujada ${property === 'margin' ? 'marge exterior auto centrar negatiu' : 'interior botó targeta'}`,
            fields: [], presets: spacingPresets(property) })),
        { id: 'border', title: 'Border', keywords: 'border-width border-style border-color vora gruix color opacitat',
            fields: [f('border-width'), f('border-style', 'select', ['none', 'solid', 'dashed', 'dotted', 'double']), f('border-color', 'color')],
            presets: [p('solid', 'Línia fina', { 'border-width': '2px', 'border-style': 'solid' }), p('dashed', 'Discontínua', { 'border-width': '3px', 'border-style': 'dashed' }), p('dotted', 'Puntejada', { 'border-width': '4px', 'border-style': 'dotted' }), p('double', 'Doble', { 'border-width': '6px', 'border-style': 'double' }), p('bottom', 'Només inferior', { 'border-width': '4px', 'border-style': 'solid' }, { scope: 'bottom' }), p('none', 'Sense vora', { 'border-style': 'none' })] },
        { id: 'radius', title: 'Border-radius', keywords: 'border-radius cantonada cantó arrodonir cercle càpsula percentatge',
            fields: [f('border-radius')],
            presets: [p('soft', 'Cantonades suaus', { 'border-radius': '12px' }), p('square', 'Sense arrodoniment', { 'border-radius': '0' }), p('pill', 'Càpsula', { 'border-radius': '999px' }, { shape: 'pill' }), p('circle', 'Cercle', { 'border-radius': '50%' }, { shape: 'circle' }), p('corner', 'Una cantonada', { 'border-radius': '32px' }, { scope: 'top-left' })] }
    ];
    const sizeLessons = [
        { id: 'basic', title: 'Amplada i alçada', keywords: 'width height auto px rem percentatge mida dimensions', responsive: true,
            fields: [f('width'), f('height')],
            presets: [p('fixed', 'Mida fixa', { width: '180px', height: '100px' }), p('full', 'Amplada del 100%', { width: '100%', height: 'auto' }), p('auto', 'Alçada segons el text', { width: '220px', height: 'auto' }, { paragraphs: 3 }), p('relative', 'Unitats relatives', { width: '12rem', height: '6rem' }), p('percent', '50% del contenidor', { width: '50%', height: '50%' }, { parentHeight: '240px' })] },
        { id: 'width-limits', title: 'Límits d’amplada', keywords: 'width min-width max-width mínima màxima adaptable responsive clamp calc', responsive: true,
            fields: [f('width'), f('min-width'), f('max-width')],
            presets: [p('card', 'Targeta adaptable', { width: '100%', 'min-width': '140px', 'max-width': '320px' }), p('reading', 'Amplada de lectura', { width: '100%', 'min-width': '0', 'max-width': '60ch' }), p('minimum', 'Amplada mínima', { width: '50%', 'min-width': '200px', 'max-width': 'none' }), p('clamp', 'Mida amb clamp()', { width: 'clamp(140px, 70%, 320px)', 'min-width': '0', 'max-width': 'none' })] },
        { id: 'height-limits', title: 'Límits d’alçada', keywords: 'height min-height max-height mínima màxima contingut text desbordament', contentControl: true,
            fields: [f('height'), f('min-height'), f('max-height')],
            presets: [p('grow', 'Creix amb el text', { width: '100%', height: 'auto', 'min-height': '0', 'max-height': 'none' }), p('minimum', 'Alçada mínima', { width: '100%', height: 'auto', 'min-height': '160px', 'max-height': 'none' }), p('overflow', 'Contingut que desborda', { width: '100%', height: 'auto', 'min-height': '0', 'max-height': '90px' }, { paragraphs: 5 })] },
        { id: 'sizing', title: 'Box-sizing', keywords: 'box-sizing content-box border-box contingut total padding border model caixa', compare: true,
            fields: [f('box-sizing', 'select', ['content-box', 'border-box']), f('width'), f('padding')],
            presets: [p('content', 'content-box', { 'box-sizing': 'content-box', width: '180px', padding: '12px' }), p('border', 'border-box', { 'box-sizing': 'border-box', width: '180px', padding: '12px' }), p('space', 'Més padding', { 'box-sizing': 'border-box', width: '180px', padding: '24px' })] },
        { id: 'ratio', title: 'Proporcions', keywords: 'aspect-ratio proporció quadrat vídeo rectangle 16/9 1/1 3/4', responsive: true,
            fields: [f('aspect-ratio', 'select', ['1 / 1', '16 / 9', '3 / 4']), f('width')],
            presets: [p('square', 'Quadrat · 1:1', { 'aspect-ratio': '1 / 1', width: '180px', height: 'auto' }), p('video', 'Vídeo · 16:9', { 'aspect-ratio': '16 / 9', width: '100%', height: 'auto' }), p('portrait', 'Vertical · 3:4', { 'aspect-ratio': '3 / 4', width: '180px', height: 'auto' })] }
    ];
    const escape = text => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const rule = (selector, props) => `${selector} {\n${Object.entries(props).map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`;
    const link = property => `<a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${property}" target="_blank" rel="noopener noreferrer">${property}:</a>`;
    const options = values => values.map(value => { const [id, label] = Array.isArray(value) ? value : [value, value]; return `<option value="${escape(id)}">${escape(label)}</option>`; }).join('');
    const row = (id, property, input) => `<div class="property-row box-property-row">${link(property)}${input}<p class="box-validation" role="status" hidden>Valor no vàlid. Es manté l’últim valor vàlid.</p></div>`;
    const baseProps = { 'box-sizing': 'content-box', width: '160px', 'min-height': '40px', padding: '12px', border: '2px solid rgb(52, 140, 236)', 'background-color': 'rgb(219, 234, 254)', color: '#17263c', 'font-family': 'sans-serif', 'font-size': '14px', 'line-height': '1.5', 'overflow-wrap': 'anywhere' };
    const text = 'Una caixa amb contingut. Canvia les propietats per veure com es distribueix l’espai.';
    [['box-model', boxLessons], ['size', sizeLessons]].forEach(([topicId, lessons]) => {
        const record = workspaceTopics.get(topicId);
        const content = record.section.querySelector('.section-content');
        const tabs = workspaceElement('div', 'lesson-tabs box-tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Exemple a explorar');
        content.replaceChildren(tabs);
        record.groups = lessons.map((lesson, index) => {
            const prefix = `${topicId}-${lesson.id}`;
            const button = workspaceElement('button', '', lesson.title); button.type = 'button'; button.setAttribute('aria-pressed', String(index === 0)); tabs.append(button);
            const layout = workspaceElement('div', 'lesson-layout'); layout.hidden = index !== 0;
            const fields = lesson.fields.map(config => {
                const id = `${prefix}-${config.property}`;
                const placeholders = { width: '180px, 50%, auto, calc(100% - 24px)', height: '100px, auto, 6rem', 'min-width': '0, 140px, 12rem', 'max-width': 'none, 320px, 60ch', 'min-height': '0, 160px', 'max-height': 'none, 90px', 'border-width': '2px', 'border-radius': '12px, 50%, 999px', padding: '12px, 8px 16px' };
                const attrs = `id="${id}" data-box-property="${config.property}" aria-label="${config.property}"`;
                const input = config.type === 'select' ? `<select ${attrs}>${options(config.options)}</select>` : `<input ${attrs} type="${config.type === 'color' ? 'color' : 'text'}" ${config.type === 'color' ? 'value="#348cec"' : `spellcheck="false" placeholder="${escape(placeholders[config.property] || '')}"`}>`;
                return row(id, config.property, input);
            }).join('');
            const scopeValues = lesson.id === 'radius' ? [['all', 'Totes les cantonades'], ...corners.map((name, i) => [name, cornerNames[i]])] : lesson.id === 'border' ? scopes.filter(([scope]) => !['vertical', 'horizontal'].includes(scope)) : scopes;
            const scope = `<label class="editor-field" for="${prefix}-scope">${lesson.id === 'radius' ? 'Cantonada' : 'Costats'}<select id="${prefix}-scope" data-selector-property="${lesson.id === 'radius' ? 'Cantonada' : 'Costats de ' + (lesson.spacing || 'border')}" aria-label="${lesson.id === 'radius' ? 'Cantonada' : 'Costats de ' + (lesson.spacing || 'border')}">${options(scopeValues)}</select></label>`;
            const spacing = lesson.spacing ? `${scope}${row(`${prefix}-value`, lesson.spacing, `<input id="${prefix}-value" aria-label="Valor de ${lesson.spacing}" type="text" spellcheck="false" placeholder="20px, 1rem${lesson.spacing === 'margin' ? ', auto' : ''}">`)}<details class="box-advanced"><summary>Personalitza els costats</summary>${sides.map((side, i) => row(`${prefix}-${side}`, `${lesson.spacing}-${side}`, `<input id="${prefix}-${side}" data-box-side="${side}" aria-label="${lesson.spacing}-${side}" placeholder="Hereta el valor general" spellcheck="false">`)).join('')}</details><details class="box-advanced"><summary>Escriure el valor CSS</summary>${row(`${prefix}-manual`, lesson.spacing, `<input id="${prefix}-manual" aria-label="${lesson.spacing} abreujat" spellcheck="false">`)}<div class="box-shorthand" aria-label="Valors de cada costat"></div><p class="property-explanation">1 valor: tots. 2: vertical i horitzontal. 3: superior, horitzontal i inferior. 4: superior, dret, inferior i esquerre.</p></details>` : '';
            layout.innerHTML = `<div class="preview-pane"><span class="pane-label">Resultat en viu</span>${lesson.compare ? '<span class="box-sizing-label"></span>' : ''}<div class="live-stage box-stage"><div class="box-scene"><div class="box-neighbour">Una altra targeta</div><div class="box-target"><div class="box-content"></div></div><div class="box-neighbour">La targeta següent</div></div><div class="box-zone-layer" hidden aria-hidden="true"></div></div>${lesson.spacing || lesson.id === 'border' ? `<label class="box-zones-toggle"><input type="checkbox" id="${prefix}-zones">Mostra les zones</label><div class="box-zone-legend" hidden><span data-zone-label="margin">Margin</span><span data-zone-label="border">Border</span><span data-zone-label="padding">Padding</span><span data-zone-label="content">Contingut</span></div><p class="box-zone-note box-context-note" hidden></p>` : ''}<div class="box-measures" aria-live="polite"></div>${lesson.responsive ? `<div class="preview-size"><label for="${prefix}-container-width">Amplada del contenidor <output>100%</output></label><input id="${prefix}-container-width" aria-label="Amplada del contenidor" type="range" min="25" max="100" value="100"></div>` : ''}${lesson.contentControl ? `<div class="preview-size"><label for="${prefix}-paragraphs">Paràgrafs <output>1</output></label><input id="${prefix}-paragraphs" aria-label="Paràgrafs" type="range" min="1" max="6" value="1"></div>` : ''}${lesson.compare ? '<p class="box-context-note">El padding es mostra en verd i la vora blava és de 4px. La caixa de referència utilitza l’altre box-sizing amb els mateixos valors.</p><div class="box-comparison"><span></span><div class="box-reference-diagram"><div class="box-reference"></div></div><output></output></div>' : ''}${lesson.id === 'basic' ? '<p class="box-context-note" data-parent-note hidden>El contenidor té una alçada definida de 240px: height: 50% pot prendre-la com a referència.</p>' : ''}${lesson.id === 'height-limits' ? '<p class="box-context-note">max-height limita la caixa; el contingut que no hi cap continua visible amb overflow: visible.</p>' : ''}</div>
                <div class="controls-pane"><h2 class="pane-label">Propietats</h2><div class="preset-panel box-presets"><span class="pane-label">Prova un exemple</span><div class="preset-buttons">${lesson.presets.map(entry => `<button type="button" data-box-preset="${entry.id}">${entry.label}</button>`).join('')}</div></div>${spacing || fields}${['border', 'radius'].includes(lesson.id) ? `<details class="box-advanced"><summary>${lesson.id === 'radius' ? 'Personalitza una cantonada' : 'Personalitza un costat'}</summary>${scope}</details>` : ''}</div>`;
            content.append(layout);
            const controls = layout.querySelector('.controls-pane');
            const stage = layout.querySelector('.box-stage');
            const scene = layout.querySelector('.box-scene');
            const target = layout.querySelector('.box-target');
            const inner = layout.querySelector('.box-content');
            const scopeInput = controls.querySelector(`#${prefix}-scope`);
            if (lesson.compare) stage.classList.add('box-sizing-diagram');
            let state, syncing = false;
            const expanded = () => {
                const probe = document.createElement('div').style;
                probe.setProperty(lesson.spacing, state.props[lesson.spacing]);
                return sides.map(side => state.props[`${lesson.spacing}-${side}`] || probe.getPropertyValue(`${lesson.spacing}-${side}`));
            };
            const properties = () => {
                const props = { ...baseProps, ...(topicId === 'box-model' ? { margin: '16px', padding: '16px' } : {}), ...state.props };
                if (topicId === 'size') { props['box-sizing'] = state.props['box-sizing'] || 'border-box'; props.width = state.props.width || '100%'; }
                if (lesson.id === 'border' && state.scope !== 'all') {
                    const borderValue = `${props['border-width']} ${props['border-style']} ${props['border-color']}`;
                    ['border-width', 'border-style', 'border-color'].forEach(name => delete props[name]);
                    props.border = 'none'; props[`border-${state.scope}`] = borderValue;
                }
                if (lesson.id === 'radius' && state.scope !== 'all') { props['border-radius'] = '0'; props[`border-${state.scope}-radius`] = state.props['border-radius']; }
                if (lesson.id === 'radius') {
                    props.width = state.shape === 'pill' ? '180px' : '140px'; props.height = state.shape === 'circle' ? '140px' : '70px'; props['min-height'] = '0'; props.padding = '0'; props.display = 'grid'; props['place-items'] = 'center';
                }
                if (lesson.spacing === 'padding' && state.shape === 'button') { props.width = 'auto'; props['min-height'] = '0'; props.display = 'inline-block'; }
                if (lesson.compare) props.border = '4px solid rgb(52, 140, 236)';
                if (lesson.id === 'ratio') { props.padding = '0'; props['min-height'] = '0'; props.display = 'grid'; props['place-items'] = 'center'; }
                return props;
            };
            const drawSizingRulers = (box, host) => {
                const css = getComputedStyle(box), rect = box.getBoundingClientRect(), origin = host.getBoundingClientRect();
                const number = name => parseFloat(css.getPropertyValue(name)) || 0;
                const x = rect.left - origin.left + host.scrollLeft - host.clientLeft;
                const y = rect.top - origin.top + host.scrollTop - host.clientTop;
                const insetLeft = number('border-left-width') + number('padding-left');
                const insetTop = number('border-top-width') + number('padding-top');
                const contentWidth = Math.max(0, rect.width - insetLeft - number('padding-right') - number('border-right-width'));
                const contentHeight = Math.max(0, rect.height - insetTop - number('padding-bottom') - number('border-bottom-width'));
                const rounded = value => Math.round(value * 10) / 10;
                let svg = host.querySelector('.box-sizing-rulers');
                if (!svg) { svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.classList.add('box-sizing-rulers'); host.append(svg); }
                const width = Math.max(host.clientWidth, Math.ceil(x + rect.width + 46));
                const height = Math.max(host.clientHeight, Math.ceil(y + rect.height + 14));
                svg.setAttribute('width', width); svg.setAttribute('height', height);
                svg.setAttribute('role', 'img');
                svg.setAttribute('aria-label', `${css.boxSizing}: contingut ${rounded(contentWidth)} per ${rounded(contentHeight)} píxels; mida total ${rounded(rect.width)} per ${rounded(rect.height)} píxels. El padding es mostra en verd. La fletxa destacada correspon a width i height.`);
                svg.replaceChildren();
                const node = (tag, attributes, parent, text) => {
                    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
                    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
                    if (text) element.textContent = text; parent.append(element); return element;
                };
                // Colour only the padding ring, using the same measured bounds as the rulers.
                const borderLeft = number('border-left-width'), borderTop = number('border-top-width');
                const insideBorderWidth = Math.max(0, rect.width - borderLeft - number('border-right-width'));
                const insideBorderHeight = Math.max(0, rect.height - borderTop - number('border-bottom-width'));
                const paddingArea = `M${x + borderLeft},${y + borderTop}h${insideBorderWidth}v${insideBorderHeight}h${-insideBorderWidth}Z`;
                const contentArea = `M${x + insetLeft},${y + insetTop}h${contentWidth}v${contentHeight}h${-contentWidth}Z`;
                node('path', { d: paddingArea + contentArea, 'fill-rule': 'evenodd', class: 'sizing-padding-zone' }, svg);
                const arrow = (x1, y1, x2, y2, label, kind, vertical = false) => {
                    const declared = css.boxSizing === (kind === 'content' ? 'content-box' : 'border-box');
                    const group = node('g', { class: `sizing-ruler sizing-ruler-${kind}${declared ? ' sizing-ruler-declared' : ''}` }, svg);
                    node('line', { x1, y1, x2, y2 }, group);
                    const head = vertical ? `M${x1 - 3},${y1 + 5}L${x1},${y1}l3,5M${x2 - 3},${y2 - 5}L${x2},${y2}l3,-5` : `M${x1 + 5},${y1 - 3}L${x1},${y1}l5,3M${x2 - 5},${y2 - 3}L${x2},${y2}l-5,3`;
                    node('path', { d: head }, group);
                    const labelGroup = node('g', { transform: `translate(${(x1 + x2) / 2},${(y1 + y2) / 2})${vertical ? ' rotate(-90)' : ''}` }, group);
                    const labelWidth = label.length * 5.6 + 8;
                    node('rect', { x: -labelWidth / 2, y: -7, width: labelWidth, height: 14, class: 'sizing-ruler-label-bg' }, labelGroup);
                    node('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central' }, labelGroup, label);
                    return group;
                };
                const total = arrow(x, y - 44, x + rect.width, y - 44, `Total: ${rounded(rect.width)}px`, 'total');
                const content = arrow(x + insetLeft, y - 20, x + insetLeft + contentWidth, y - 20, `Contingut: ${rounded(contentWidth)}px`, 'content');
                [x, x + rect.width].forEach(edge => node('line', { x1: edge, y1: y - 50, x2: edge, y2: y + rect.height, class: 'sizing-ruler-guide' }, total));
                [x + insetLeft, x + insetLeft + contentWidth].forEach(edge => node('line', { x1: edge, y1: y - 26, x2: edge, y2: y + insetTop + contentHeight, class: 'sizing-ruler-guide' }, content));
                const contentVertical = arrow(x + rect.width + 12, y + insetTop, x + rect.width + 12, y + insetTop + contentHeight, `${rounded(contentHeight)}px`, 'content', true);
                const totalVertical = arrow(x + rect.width + 34, y, x + rect.width + 34, y + rect.height, `${rounded(rect.height)}px`, 'total', true);
                [y, y + rect.height].forEach(edge => node('line', { x1: x + rect.width, y1: edge, x2: x + rect.width + 40, y2: edge, class: 'sizing-ruler-guide' }, totalVertical));
                [y + insetTop, y + insetTop + contentHeight].forEach(edge => node('line', { x1: x + insetLeft + contentWidth, y1: edge, x2: x + rect.width + 18, y2: edge, class: 'sizing-ruler-guide' }, contentVertical));
            };
            const measure = () => {
                if (!target.getClientRects().length) return;
                const css = getComputedStyle(target), rect = target.getBoundingClientRect();
                const number = name => parseFloat(css.getPropertyValue(name)) || 0;
                const contentWidth = rect.width - number('padding-left') - number('padding-right') - number('border-left-width') - number('border-right-width');
                const contentHeight = rect.height - number('padding-top') - number('padding-bottom') - number('border-top-width') - number('border-bottom-width');
                const rounded = value => Math.round(value * 10) / 10;
                const declaredProps = properties();
                const declared = `${declaredProps.width} × ${declaredProps.height || 'auto'}`;
                layout.querySelector('.box-measures').textContent = `Declarada: ${declared} · Contingut: ${rounded(contentWidth)} × ${rounded(contentHeight)}px · Total: ${rounded(rect.width)} × ${rounded(rect.height)}px`;
                const zoneLayer = layout.querySelector('.box-zone-layer');
                if (!zoneLayer.hidden) {
                    const parent = stage.getBoundingClientRect(), x = rect.left - parent.left + stage.scrollLeft - stage.clientLeft, y = rect.top - parent.top + stage.scrollTop - stage.clientTop;
                    const mt = number('margin-top'), mr = number('margin-right'), mb = number('margin-bottom'), ml = number('margin-left');
                    const bl = number('border-left-width'), bt = number('border-top-width'), br = number('border-right-width'), bb = number('border-bottom-width');
                    const rectangles = [
                        [x - Math.max(0, ml), y - Math.max(0, mt), rect.width + Math.max(0, ml) + Math.max(0, mr), rect.height + Math.max(0, mt) + Math.max(0, mb)],
                        [x, y, rect.width, rect.height],
                        [x + bl, y + bt, rect.width - bl - br, rect.height - bt - bb],
                        [x + bl + number('padding-left'), y + bt + number('padding-top'), contentWidth, contentHeight]
                    ];
                    const rectanglePath = ([left, top, width, height]) => `M${left},${top}h${width}v${height}h${-width}Z`;
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('width', Math.max(stage.clientWidth, stage.scrollWidth));
                    svg.setAttribute('height', Math.max(stage.clientHeight, stage.scrollHeight));
                    ['margin', 'border', 'padding', 'content'].forEach((name, i) => {
                        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        path.setAttribute('class', `box-zone box-zone-${name}`);
                        path.setAttribute('fill-rule', 'evenodd');
                        path.setAttribute('d', rectanglePath(rectangles[i]) + (rectangles[i + 1] ? rectanglePath(rectangles[i + 1]) : ''));
                        svg.append(path);
                    });
                    zoneLayer.replaceChildren(svg);
                    const values = prefix => sides.map(side => css.getPropertyValue(`${prefix}-${side}`));
                    const shorthand = list => list.every(value => value === list[0]) ? list[0] : list.join(' ');
                    layout.querySelector('[data-zone-label="margin"]').textContent = `Margin: ${shorthand(values('margin'))}`;
                    layout.querySelector('[data-zone-label="border"]').textContent = `Border: ${shorthand(sides.map(side => css.getPropertyValue(`border-${side}-width`)))}`;
                    layout.querySelector('[data-zone-label="padding"]').textContent = `Padding: ${shorthand(values('padding'))}`;
                    layout.querySelector('[data-zone-label="content"]').textContent = `Contingut: ${rounded(contentWidth)} × ${rounded(contentHeight)}px`;
                    const absent = [
                        ['margin', 'marge', values('margin')],
                        ['padding', 'padding', values('padding')],
                        ['border', 'vora', sides.map(side => css.getPropertyValue(`border-${side}-width`))]
                    ].flatMap(([, label, list]) => {
                        const empty = list.map((value, i) => parseFloat(value) === 0 ? sideNames[i].toLowerCase() : null).filter(Boolean);
                        return empty.length ? [`${label}: 0 als costats ${empty.join(', ')}`] : [];
                    });
                    const negative = values('margin').some(value => parseFloat(value) < 0);
                    const note = layout.querySelector('.box-zone-note');
                    note.textContent = negative ? 'El marge negatiu apropa o superposa les caixes; no crea una franja exterior positiva. ' + absent.join(' · ') : absent.length ? 'Les zones amb valor zero no ocupen espai: ' + absent.join(' · ') + '.' : '';
                    note.hidden = !note.textContent;

                }
                if (lesson.compare) {
                    const reference = layout.querySelector('.box-reference');
                    drawSizingRulers(target, stage);
                    drawSizingRulers(reference, layout.querySelector('.box-reference-diagram'));
                    layout.querySelector('.box-comparison output').value = `Total: ${rounded(reference.getBoundingClientRect().width)}px`;
                }
            };
            const clearPresets = () => controls.querySelectorAll('[data-box-preset]').forEach(entry => entry.setAttribute('aria-pressed', 'false'));
            const render = () => {
                target.style.cssText = ''; Object.entries(properties()).forEach(([name, value]) => target.style.setProperty(name, value));
                scene.style.width = `${state.containerWidth}%`; scene.style.height = state.parentHeight || '';
                inner.textContent = lesson.id === 'radius' || lesson.id === 'ratio' ? (lesson.id === 'ratio' ? state.props['aspect-ratio'] : 'Una caixa') : state.shape === 'button' ? 'Un botó' : Array.from({ length: state.paragraphs }, () => topicId === 'size' && !lesson.contentControl && state.paragraphs === 1 ? 'Una caixa amb contingut.' : text).join('\n\n');
                inner.style.whiteSpace = 'pre-line';
                layout.querySelectorAll('.box-neighbour').forEach(node => { node.hidden = lesson.spacing !== 'margin'; });
                const widthOutput = layout.querySelector('.preview-size output');
                if (widthOutput) widthOutput.value = lesson.responsive ? `${state.containerWidth}%` : String(state.paragraphs);
                const note = layout.querySelector('[data-parent-note]'); if (note) note.hidden = !state.parentHeight;
                if (lesson.compare) {
                    layout.querySelector('.box-sizing-label').textContent = target.style.boxSizing;
                    const reference = layout.querySelector('.box-reference'); reference.style.cssText = target.style.cssText;
                    reference.style.boxSizing = state.props['box-sizing'] === 'content-box' ? 'border-box' : 'content-box'; reference.textContent = 'Mateixa amplada declarada';
                    layout.querySelector('.box-comparison > span').textContent = reference.style.boxSizing;
                }
                if (workspaceReady) updateWorkspaceCode();
                measure();
            };
            const sync = () => {
                syncing = true;
                if (scopeInput) scopeInput.value = state.scope;
                lesson.fields.forEach(config => {
                    const input = controls.querySelector(`[data-box-property="${config.property}"]`);
                    if (config.type === 'color') {
                        const parsed = parseCssColor(state.props[config.property]); input.value = parsed.hex; input.dataset.colorAlpha = String(parsed.alpha); input.dispatchEvent(new Event('input', { bubbles: true }));
                    } else input.value = state.props[config.property];
                });
                if (lesson.spacing) {
                    const values = expanded();
                    controls.querySelector(`#${prefix}-value`).value = state.value || (state.scope === 'all' ? state.props[lesson.spacing] : values[state.scope === 'horizontal' ? 1 : sides.indexOf(state.scope)]) || values[0];
                    controls.querySelector(`#${prefix}-manual`).value = state.props[lesson.spacing];
                    sides.forEach(side => { controls.querySelector(`[data-box-side="${side}"]`).value = state.props[`${lesson.spacing}-${side}`] || ''; });
                    controls.querySelector('.box-shorthand').replaceChildren(...values.map((value, i) => workspaceElement('span', '', `${sideNames[i]}: ${value}`)));
                }
                controls.querySelectorAll('[aria-invalid]').forEach(input => input.setAttribute('aria-invalid', 'false'));
                controls.querySelectorAll('.box-validation').forEach(note => { note.hidden = true; });
                layout.querySelector('.preview-size input')?.setAttribute('value', lesson.responsive ? state.containerWidth : state.paragraphs);
                const slider = layout.querySelector('.preview-size input'); if (slider) slider.value = lesson.responsive ? state.containerWidth : state.paragraphs;
                if (workspaceReady) improveControls(layout);
                syncing = false;
            };
            const applyPreset = entry => {
                const zones = state?.zones ?? true;
                state = { props: { ...(lesson.id === 'border' ? { 'border-width': '2px', 'border-style': 'solid', 'border-color': 'rgb(52, 140, 236)' } : {}), ...entry.props }, scope: entry.scope || 'all', value: entry.value, shape: entry.shape || '', containerWidth: 100, paragraphs: entry.paragraphs || 1, parentHeight: entry.parentHeight || '', zones };
                if (lesson.id === 'sizing') state.props.height = '100px';
                controls.querySelectorAll('details.box-advanced').forEach(details => { details.open = false; });
                const checkbox = layout.querySelector('.box-zones-toggle input');
                const visibleZones = checkbox ? state.zones : false;
                if (checkbox) checkbox.checked = visibleZones;
                layout.querySelector('.box-zone-layer').hidden = !visibleZones; const legend = layout.querySelector('.box-zone-legend'); if (legend) legend.hidden = !visibleZones;
                const zoneNote = layout.querySelector('.box-zone-note'); if (zoneNote) zoneNote.hidden = true;
                controls.querySelectorAll('[data-box-preset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.boxPreset === entry.id)));
                sync(); render();
            };
            const accept = (input, property, value, optional = false) => {
                const valid = optional && value === '' || value !== '' && CSS.supports(property, value);
                input.setAttribute('aria-invalid', String(!valid)); const note = input.closest('.property-row')?.querySelector('.box-validation'); if (note) note.hidden = valid;
                return valid;
            };
            lesson.fields.forEach(config => {
                const input = controls.querySelector(`[data-box-property="${config.property}"]`);
                if (config.type === 'color') addColorTransparency(input, config.property);
                input.addEventListener(config.type === 'select' ? 'change' : 'input', () => {
                    if (syncing) return;
                    const value = config.type === 'color' ? colorPickerValue(input) : input.value.trim();
                    const validationProperty = config.property === 'border-width' ? 'border-top-width' : config.property === 'border-radius' && state.scope !== 'all' ? `border-${state.scope}-radius` : config.property;
                    if (!accept(input, validationProperty, value)) return;
                    state.props[config.property] = value; clearPresets(); render();
                });
            });
            if (lesson.spacing) {
                const valueInput = controls.querySelector(`#${prefix}-value`);
                valueInput.addEventListener('input', () => {
                    const value = valueInput.value.trim();
                    if (!accept(valueInput, state.scope === 'all' ? lesson.spacing : `${lesson.spacing}-top`, value)) return;
                    state.value = value;
                    const selectedSides = state.scope === 'all' ? sides : state.scope === 'vertical' ? ['top', 'bottom'] : state.scope === 'horizontal' ? ['left', 'right'] : [state.scope];
                    if (state.scope === 'all') { state.props[lesson.spacing] = value; sides.forEach(side => delete state.props[`${lesson.spacing}-${side}`]); }
                    else selectedSides.forEach(side => { state.props[`${lesson.spacing}-${side}`] = value; });
                    clearPresets(); sync(); render();
                });
                controls.querySelector(`#${prefix}-manual`).addEventListener('input', event => {
                    const value = event.target.value.trim(); if (!accept(event.target, lesson.spacing, value)) return;
                    state.props[lesson.spacing] = value; sides.forEach(side => delete state.props[`${lesson.spacing}-${side}`]); state.value = null; state.scope = 'all';
                    clearPresets(); sync(); render();
                });
                controls.querySelectorAll('[data-box-side]').forEach(input => input.addEventListener('input', () => {
                    const property = `${lesson.spacing}-${input.dataset.boxSide}`, value = input.value.trim();
                    if (!accept(input, property, value, true)) return;
                    if (value) state.props[property] = value; else delete state.props[property]; state.value = null;
                    clearPresets(); sync(); render();
                }));
            }
            scopeInput?.addEventListener('change', () => {
                state.scope = scopeInput.value; state.value = null;
                if (lesson.id === 'radius' && state.scope !== 'all' && !CSS.supports(`border-${state.scope}-radius`, state.props['border-radius'])) {
                    const probe = document.createElement('div').style; probe.borderRadius = state.props['border-radius']; state.props['border-radius'] = probe.getPropertyValue(`border-${state.scope}-radius`);
                }
                clearPresets(); sync(); render();
            });
            layout.querySelector('.box-zones-toggle input')?.addEventListener('change', event => {
                state.zones = event.target.checked;
                const note = layout.querySelector('.box-zone-note'); if (note) note.hidden = !state.zones;
                layout.querySelector('.box-zone-layer').hidden = !event.target.checked; layout.querySelector('.box-zone-legend').hidden = !event.target.checked; measure();
            });
            layout.querySelector('.preview-size input')?.addEventListener('input', event => {
                if (lesson.responsive) state.containerWidth = Number(event.target.value); else state.paragraphs = Number(event.target.value);
                render();
            });
            controls.querySelectorAll('[data-box-preset]').forEach(button => button.addEventListener('click', () => applyPreset(lesson.presets.find(entry => entry.id === button.dataset.boxPreset))));
            button.addEventListener('click', () => selectLessonGroup(record, index));
            stage.addEventListener('scroll', measure);
            layout.querySelector('.box-reference-diagram')?.addEventListener('scroll', measure);
            const observer = new ResizeObserver(measure); observer.observe(target); observer.observe(scene);
            if (lesson.compare) observer.observe(layout.querySelector('.box-reference'));
            applyPreset(lesson.presets[0]);
            const getSource = () => {
                const paragraphs = escape(inner.textContent);
                const contextProps = { display: 'flow-root', 'font-family': 'sans-serif' };
                if (state.parentHeight) contextProps.height = state.parentHeight;
                const rules = [rule('.contenidor', contextProps), rule('.exemple', properties()), rule('.contingut', { 'white-space': 'pre-line' })];
                const neighbours = lesson.spacing === 'margin';
                if (neighbours) rules.push(rule('.altra-targeta', { padding: '8px', 'background-color': '#edf0f4', color: '#5e6f86', 'font-size': '13px' }));
                return { html: `<div class="contenidor">\n${neighbours ? '  <div class="altra-targeta">Una altra targeta</div>\n' : ''}  <div class="exemple">\n    <div class="contingut">${paragraphs}</div>\n  </div>\n${neighbours ? '  <div class="altra-targeta">La targeta següent</div>\n' : ''}</div>`, css: rules.join('\n\n') };
            };
            return { lesson, button, layout, controls, preview: stage, pane: layout.querySelector('.preview-pane'), reset: () => applyPreset(lesson.presets[0]), measure, getSource };
        });
        record.groupIndex = 0;
        record.getSource = () => record.groups[record.groupIndex].getSource();
        record.reset = () => record.groups[record.groupIndex].reset();
        record.onActivate = () => record.groups[record.groupIndex].measure();
        record.topic.keywords += ' ' + lessons.map(lesson => lesson.keywords).join(' ');
        record.findGroupForQuery = query => {
            const words = normaliseSearch(query).split(/\s+/).filter(word => word !== topicId && !(topicId === 'size' && word === 'dimensions'));
            return lessons.findIndex(lesson => words.every(word => normaliseSearch(`${lesson.title} ${lesson.keywords}`).includes(word)));
        };
    });
}
