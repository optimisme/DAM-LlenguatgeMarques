/* Focused Grid lessons: independent examples, few controls, complete exported source. */
function setupGridEditor() {
    const record = workspaceTopics.get('grid');
    const content = record.section.querySelector('.section-content');
    const align = ['stretch', 'start', 'center', 'end', 'baseline'];
    const selfAlign = ['auto', ...align];
    const distribute = ['start', 'center', 'end', 'stretch', 'space-between', 'space-around', 'space-evenly'];
    const field = (property, options, target = 'container', kind = 'css') => ({ property, options, target, kind });
    const preset = (id, label, container = {}, item = {}, extras = {}) => ({ id, label, container, item, ...extras });
    const lessons = [
        {
            id: 'tracks', title: 'Columnes i files', keywords: 'fr repeat pistes mides proporcions',
            fields: [field('grid-template-columns', ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', '2fr 1fr', '100px 1fr']), field('grid-template-rows', ['repeat(2, 1fr)', 'repeat(3, 1fr)', '60px 1fr', 'repeat(2, 70px)', 'auto'])],
            presets: [preset('two', '2 columnes'), preset('three', '3 columnes', { 'grid-template-columns': 'repeat(3, 1fr)' }), preset('ratio', '2fr + 1fr', { 'grid-template-columns': '2fr 1fr' }), preset('rows', 'Files desiguals', { 'grid-template-rows': '60px 1fr' })]
        },
        {
            id: 'gaps', title: 'Separació', keywords: 'gap row-gap column-gap espai separació',
            fields: [field('row-gap', null, 'container', 'px'), field('column-gap', null, 'container', 'px')],
            base: { gap: null, 'row-gap': '12px', 'column-gap': '12px' },
            presets: [preset('same', 'Igual als dos eixos'), preset('rows', 'Més espai entre files', { 'row-gap': '32px', 'column-gap': '8px' }), preset('columns', 'Més espai entre columnes', { 'row-gap': '8px', 'column-gap': '32px' }), preset('none', 'Sense separació', { 'row-gap': '0px', 'column-gap': '0px' })]
        },
        {
            id: 'items', title: 'Alineació dels elements', keywords: 'justify-items align-items cel·la alinear',
            fields: [field('justify-items', align), field('align-items', align)],
            base: { 'justify-items': 'stretch', 'align-items': 'stretch' },
            presets: [preset('stretch', 'Omple la cel·la'), preset('center', 'Centra dins la cel·la', { 'justify-items': 'center', 'align-items': 'center' }), preset('corner', 'Cantonada inferior', { 'justify-items': 'end', 'align-items': 'end' })]
        },
        {
            id: 'content', title: 'Alineació de la graella', keywords: 'justify-content align-content centrar pistes conjunt espai lliure',
            fields: [field('justify-content', distribute), field('align-content', distribute)],
            base: { 'grid-template-columns': 'repeat(2, 60px)', 'grid-template-rows': 'repeat(2, 60px)', 'justify-content': 'start', 'align-content': 'start' },
            presets: [preset('start', 'A l’inici'), preset('center', 'Al centre', { 'justify-content': 'center', 'align-content': 'center' }), preset('between', 'Espai entre pistes', { 'justify-content': 'space-between', 'align-content': 'space-between' }), preset('auto', 'Pistes auto', { 'grid-template-columns': 'auto auto', 'grid-template-rows': 'auto auto', 'justify-content': 'stretch', 'align-content': 'stretch' })]
        },
        {
            id: 'flow', title: 'Col·locació automàtica', keywords: 'grid-auto-flow grid-auto-rows grid-auto-columns dense implícites buits ordre',
            fields: [field('grid-auto-flow', ['row', 'column', 'row dense', 'column dense'])],
            base: { 'grid-template-rows': 'repeat(2, 70px)', 'grid-auto-flow': 'row' },
            presets: [preset('rows', 'Per files'), preset('columns', 'Per columnes', { 'grid-auto-flow': 'column' }), preset('dense', 'Omple els buits', { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-auto-flow': 'row dense' }, {}, { itemOverrides: { 0: { 'grid-column': 'span 2' }, 1: { 'grid-column': 'span 2' } } })]
        },
        {
            id: 'placement', title: 'Col·locació d’un element', keywords: 'grid-column grid-row span línies ocupar cel·les', itemPicker: true,
            fields: [field('grid-column', ['auto', 'span 2', '1 / -1', '1 / 2', '2 / 3'], 'item'), field('grid-row', ['auto', 'span 2', '1 / 2', '2 / 3'], 'item')],
            base: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': 'repeat(3, 70px)' },
            presets: [preset('column', 'Dues columnes', {}, { 'grid-column': 'span 2' }), preset('row', 'Dues files', {}, { 'grid-row': 'span 2' }), preset('full', 'Tota la fila', {}, { 'grid-column': '1 / -1' })]
        },
        {
            id: 'self', title: 'Alineació d’un element', keywords: 'justify-self align-self individual hereta auto', itemPicker: true,
            fields: [field('justify-self', selfAlign, 'item'), field('align-self', selfAlign, 'item')],
            presets: [preset('center', 'Centra un element', {}, { 'justify-self': 'center', 'align-self': 'center' }), preset('corner', 'Una cantonada', {}, { 'justify-self': 'end', 'align-self': 'start' }), preset('auto', 'Hereta del contenidor')]
        },
        {
            id: 'areas', title: 'Àrees amb nom', keywords: 'grid-template-areas grid-area capçalera menú contingut peu rectangle noms', itemPicker: true,
            fields: [field('grid-template-areas', null, 'container', 'areas'), field('grid-area', ['cap', 'menu', 'contingut', 'peu', 'auto'], 'item')],
            base: { 'grid-template-columns': 'minmax(60px, 1fr) 2fr', 'grid-template-rows': '50px 1fr 50px' },
            presets: [preset('page', 'Pàgina', { 'grid-template-areas': '"cap cap"\n"menu contingut"\n"peu peu"' }), preset('sidebar', 'Menú lateral', { 'grid-template-areas': '"menu cap"\n"menu contingut"\n"menu peu"' }), preset('cards', 'Quatre àrees', { 'grid-template-columns': 'repeat(2, 1fr)', 'grid-template-rows': 'repeat(2, 1fr)', 'grid-template-areas': '"cap menu"\n"contingut peu"' })]
        },
        {
            id: 'responsive', title: 'Grid adaptable', keywords: 'responsive adaptable auto-fit auto-fill minmax amplada mínima targetes', responsive: true,
            fields: [field('grid-template-columns', ['auto-fit', 'auto-fill'], 'container', 'repeat'), field('minmax', null, 'container', 'minimum')],
            base: { 'grid-template-rows': 'none', height: 'auto', 'grid-auto-rows': '64px' },
            presets: [preset('cards', 'Targetes adaptables', {}, {}, { count: 6 }), preset('fit', 'auto-fit · 2 elements', {}, {}, { count: 2, repeat: 'auto-fit' }), preset('fill', 'auto-fill · 2 elements', {}, {}, { count: 2, repeat: 'auto-fill' })]
        }
    ];
    const colors = ['#dbeafe', '#d1fae5', '#fef3c7', '#ede9fe', '#ffe4e6', '#cffafe'];
    const containerDefaults = () => ({ display: 'grid', 'grid-template-columns': 'repeat(2, 1fr)', 'grid-template-rows': 'repeat(2, 1fr)', gap: '12px', height: '260px' });
    const itemDefaults = () => ({ 'grid-column': 'auto', 'grid-row': 'auto', 'grid-area': 'auto', 'justify-self': 'auto', 'align-self': 'auto' });
    const tabs = workspaceElement('div', 'lesson-tabs grid-tabs');
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Exemple a explorar');
    content.replaceChildren(tabs);
    record.groups = lessons.map((lesson, index) => {
        const button = workspaceElement('button', '', lesson.title);
        button.type = 'button'; button.setAttribute('aria-pressed', String(index === 0)); tabs.append(button);
        const layout = workspaceElement('div', 'lesson-layout'); layout.hidden = index !== 0;
        const fieldMarkup = config => {
            const id = `grid-${lesson.id}-${config.property}`;
            const attrs = `id="${id}" data-grid-property="${config.property}" aria-label="${config.property}"`;
            let input;
            if (config.options) input = `<select ${attrs}>${config.options.map(value => `<option value="${value}">${value}</option>`).join('')}</select>`;
            else if (config.kind === 'areas') input = `<textarea ${attrs} rows="3" spellcheck="false"></textarea>`;
            else input = `<input ${attrs} type="number" required min="${config.kind === 'minimum' ? '60' : '0'}" max="${config.kind === 'minimum' ? '240' : '64'}" step="${config.kind === 'minimum' ? '10' : '1'}"><span class="grid-unit">px</span>`;
            const property = config.kind === 'minimum' ? '<label class="grid-minimum-label" for="' + id + '">Amplada mínima de columna</label>' : `<a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${config.property}" target="_blank" rel="noopener noreferrer">${config.property}:</a>`;
            return `<div class="property-row grid-property-row">${property}${input}<p class="grid-validation" role="status" hidden>Valor no vàlid. Es manté l’últim valor vàlid.</p>${config.kind === 'minimum' ? '<p class="property-explanation">minmax() fixa una mida mínima i permet que la columna creixi amb 1fr.</p>' : ''}</div>`;
        };
        layout.innerHTML = `<div class="preview-pane"><span class="pane-label">Resultat en viu</span><div class="live-stage grid-stage"><div class="grid-demo" id="grid-${lesson.id}-demo" aria-label="Exemple de Grid"></div></div>${lesson.responsive ? `<div class="preview-size"><label for="grid-${lesson.id}-width">Amplada <output>100%</output></label><input id="grid-${lesson.id}-width" type="range" min="25" max="100" value="100"></div>` : ''}</div>
            <div class="controls-pane"><h2 class="pane-label">Propietats</h2><div class="preset-panel grid-presets"><span class="pane-label">Prova un exemple</span><div class="preset-buttons">${lesson.presets.map(p => `<button type="button" data-grid-preset="${p.id}">${p.label}</button>`).join('')}</div></div>
            ${lesson.itemPicker ? `<label class="editor-field" for="grid-${lesson.id}-selected">Element<select id="grid-${lesson.id}-selected" aria-label="Element">${[0, 1, 2, 3].map(i => `<option value="${i}">Element ${i + 1}</option>`).join('')}</select></label><p class="grid-selection-help">També pots seleccionar-lo al resultat en viu.</p>` : ''}
            ${lesson.fields.map(fieldMarkup).join('')}</div>`;
        content.append(layout);
        const demo = layout.querySelector('.grid-demo');
        const controls = layout.querySelector('.controls-pane');
        const selectedField = controls.querySelector('[aria-label="Element"]');
        const fields = lesson.fields.map(config => ({ ...config, element: layout.querySelector(`[data-grid-property="${config.property}"]`) }));
        let state;
        const adaptiveColumns = () => `repeat(${state.repeat}, minmax(min(${state.minimum}px, 100%), 1fr))`;
        const render = () => {
            if (lesson.responsive) state.container['grid-template-columns'] = adaptiveColumns();
            demo.style.cssText = '';
            Object.entries(state.container).forEach(([property, value]) => demo.style.setProperty(property, value));
            demo.style.width = `${state.width}%`;
            if (demo.children.length !== state.items.length) {
                demo.replaceChildren(...state.items.map((_, i) => {
                    const item = workspaceElement(lesson.itemPicker ? 'button' : 'div', 'grid-demo-item');
                    item.dataset.gridItem = i;
                    if (lesson.itemPicker) {
                        item.type = 'button'; item.setAttribute('aria-label', `Selecciona l’element ${i + 1}`);
                        item.addEventListener('click', () => { state.selected = i; sync(); render(); });
                    }
                    return item;
                }));
            }
            [...demo.children].forEach((item, i) => {
                item.style.cssText = '';
                Object.entries(state.items[i]).forEach(([property, value]) => { if (value !== 'auto') item.style.setProperty(property, value); });
                item.style.backgroundColor = colors[i % colors.length]; item.textContent = state.labels[i];
                if (lesson.itemPicker) item.setAttribute('aria-pressed', String(i === state.selected));
            });
            const output = layout.querySelector('.preview-size output'); if (output) output.value = `${state.width}%`;
            if (workspaceReady) updateWorkspaceCode();
        };
        const sync = () => {
            fields.forEach(config => {
                const value = config.kind === 'minimum' ? state.minimum : config.kind === 'repeat' ? state.repeat : (config.target === 'item' ? state.items[state.selected] : state.container)[config.property];
                config.element.value = config.kind === 'px' ? parseFloat(value) : value;
                config.element.setAttribute('aria-invalid', 'false'); config.element.closest('.property-row').querySelector('.grid-validation').hidden = true;
            });
            if (selectedField) selectedField.value = state.selected;
            const width = layout.querySelector('.preview-size input'); if (width) width.value = state.width;
            if (workspaceReady) improveControls(layout);
        };
        const applyPreset = p => {
            const count = p.count || 4;
            state = { container: { ...containerDefaults(), ...lesson.base, ...p.container }, items: Array.from({ length: count }, itemDefaults), labels: Array.from({ length: count }, (_, i) => String(i + 1)), selected: 0, width: 100, minimum: 100, repeat: p.repeat || 'auto-fit' };
            Object.keys(state.container).forEach(property => { if (state.container[property] === null) delete state.container[property]; });
            if (lesson.id === 'flow') Object.assign(state.container, { 'grid-auto-columns': '70px', 'grid-auto-rows': '70px' });
            Object.assign(state.items[0], p.item);
            Object.entries(p.itemOverrides || {}).forEach(([i, properties]) => Object.assign(state.items[i], properties));
            if (lesson.id === 'areas') {
                state.labels = ['Capçalera', 'Menú', 'Contingut', 'Peu'];
                ['cap', 'menu', 'contingut', 'peu'].forEach((name, i) => { state.items[i]['grid-area'] = name; });
            }
            controls.querySelectorAll('[data-grid-preset]').forEach(entry => entry.setAttribute('aria-pressed', String(entry.dataset.gridPreset === p.id)));
            sync(); render();
        };
        fields.forEach(config => config.element.addEventListener(config.options ? 'change' : 'input', () => {
            const input = config.element;
            const value = config.kind === 'px' ? `${input.value}px` : input.value.trim();
            const valid = input.value !== '' && (input.type === 'number' ? input.validity.valid : CSS.supports(config.property, value));
            // auto-fit and auto-fill are arguments of repeat(), rather than complete declarations.
            const accepted = config.kind === 'repeat' ? ['auto-fit', 'auto-fill'].includes(value) : valid;
            input.setAttribute('aria-invalid', String(!accepted)); input.closest('.property-row').querySelector('.grid-validation').hidden = accepted;
            if (!accepted) return;
            if (config.kind === 'minimum') state.minimum = Number(input.value);
            else if (config.kind === 'repeat') state.repeat = value;
            else {
                const target = config.target === 'item' ? state.items[state.selected] : state.container;
                if (config.property === 'grid-area') { target['grid-column'] = 'auto'; target['grid-row'] = 'auto'; }
                if (config.property === 'grid-column' || config.property === 'grid-row') target['grid-area'] = 'auto';
                target[config.property] = value;
            }
            controls.querySelectorAll('[data-grid-preset]').forEach(entry => entry.setAttribute('aria-pressed', 'false'));
            render();
        }));
        selectedField?.addEventListener('change', () => { state.selected = Number(selectedField.value); sync(); render(); });
        layout.querySelector('.preview-size input')?.addEventListener('input', event => { state.width = Number(event.target.value); render(); });
        controls.querySelectorAll('[data-grid-preset]').forEach(entry => entry.addEventListener('click', () => applyPreset(lesson.presets.find(p => p.id === entry.dataset.gridPreset))));
        button.addEventListener('click', () => selectLessonGroup(record, index));
        applyPreset(lesson.presets[0]);
        return { lesson, button, layout, controls, preview: layout.querySelector('.grid-stage'), pane: layout.querySelector('.preview-pane'), reset: () => applyPreset(lesson.presets[0]), getState: () => state };
    });
    record.groupIndex = 0;
    record.topic.keywords += ' ' + lessons.map(lesson => lesson.keywords).join(' ');
    record.findGroupForQuery = query => {
        const words = normaliseSearch(query).split(/\s+/).filter(word => word !== 'grid');
        return lessons.findIndex(lesson => words.every(word => normaliseSearch(`${lesson.title} ${lesson.keywords} ${lesson.fields.map(config => config.property).join(' ')}`).includes(word)));
    };
    const rule = (selector, properties) => `${selector} {\n${Object.entries(properties).map(([property, value]) => `  ${property}: ${value.replace(/\n/g, '\n    ')};`).join('\n')}\n}`;
    record.getSource = () => {
        const state = record.groups[record.groupIndex].getState();
        const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const rules = [rule('.exemple', { ...state.container, width: `${state.width}%` }), rule('.exemple > .element', {
            display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-sizing': 'border-box', 'min-width': '0', 'min-height': '48px', padding: '12px', border: '1px solid #b5c3d7', color: '#17263c', 'font-family': 'sans-serif', 'font-size': '14px', 'font-weight': '600'
        })];
        state.items.forEach((item, i) => {
            const properties = Object.fromEntries(Object.entries(item).filter(([, value]) => value !== 'auto'));
            properties['background-color'] = colors[i % colors.length]; rules.push(rule(`.exemple > .element-${i + 1}`, properties));
        });
        return { html: `<div class="exemple">\n${state.labels.map((label, i) => `  <div class="element element-${i + 1}">${escape(label)}</div>`).join('\n')}\n</div>`, css: rules.join('\n\n') };
    };
    record.reset = () => record.groups[record.groupIndex].reset();
}
