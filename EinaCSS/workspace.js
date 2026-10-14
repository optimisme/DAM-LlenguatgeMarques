/* Navigation and a consistent learning workspace around the existing examples. */
const cssTopics = [
    { id: 'display', title: 'Display', group: 'Distribució', help: 'Canvia com participa un element en la distribució de la pàgina.', keywords: 'block inline inline-block contents none mostrar ocultar' },
    { id: 'flexbox', title: 'Flexbox', group: 'Distribució', help: 'Comença canviant la direcció. Després explora l’alineació i el salt de línia.', keywords: 'centrar alinear flex-direction align-items justify-content flex-wrap align-content' },
    { id: 'grid', title: 'Grid', group: 'Distribució', help: 'Distribueix elements en files i columnes. Defineix les pistes, combina cel·les i prova dissenys adaptables.', keywords: 'graella quadrícula grid fr repeat minmax auto-fit auto-fill àrees responsive adaptable columnes files cel·les centrar alinear' },
    { id: 'position', title: 'Posicionament', group: 'Distribució', help: 'Compara el flux normal, els desplaçaments i les referències de cada tipus de position. Prova també el scroll i la superposició.', keywords: 'position static relative absolute fixed sticky top right bottom left inset z-index posicionament posició fix enganxat superposició capes scroll' },
    { id: 'box-model', title: 'Margin, padding i border', group: 'Caixa', help: 'Explora l’espai exterior, l’espai interior, les vores i les cantonades amb exemples reals.', keywords: 'espai separació margin padding border border-radius' },
    { id: 'size', title: 'Dimensions', group: 'Caixa', help: 'Explora les mides, els límits i les proporcions; compara el contingut amb la mida total de la caixa.', keywords: 'width height min-width max-width min-height max-height box-sizing amplada alçada' },
    { id: 'overflow', title: 'Overflow', group: 'Caixa', help: 'Observa què passa quan el contingut supera la mida disponible.', keywords: 'overflow-x overflow-y scroll retallar desbordament' },
    { id: 'shadows', title: 'Ombres', group: 'Aparença', help: 'Combina ombres i observa el desplaçament, el desenfocament i l’extensió.', keywords: 'box-shadow text-shadow ombra' },
    { id: 'background', title: 'Background', group: 'Aparença', help: 'Construeix un fons amb colors, imatges, gradients o capes i copia’n el CSS.', keywords: 'background-image background-color background-size background-position background-repeat background-clip background-origin background-attachment gradient imatge fons color' },
    { id: 'opacity', title: 'Opacitat i visibilitat', group: 'Aparença', help: 'Compara la transparència de l’element amb la seva visibilitat.', keywords: 'opacity visibility transparent ocultar' },
    { id: 'filters', title: 'Filtres', group: 'Aparença', help: 'Combina filtres sobre una imatge o sobre el fons d’una capa transparent. Prova els exemples i ajusta’n els valors.', keywords: 'filter backdrop-filter blur contrast grayscale brightness saturate sepia invert hue-rotate vidre glaçat glass' },
    { id: 'cursor', title: 'Cursor', group: 'Aparença', help: 'Passa el ratolí per cada àrea per provar-ne el cursor. Fes clic en una àrea per mostrar-ne el CSS al quadre inferior.', keywords: 'cursor pointer grab text ratolí' },
    { id: 'typography', title: 'Tipografia', group: 'Text', help: 'Experimenta amb la font, la mida, el pes i l’alineació del text.', keywords: 'font-family font-weight font-size color text-align font-style text-transform text-decoration' },
    { id: 'paragraph', title: 'Paràgrafs', group: 'Text', help: 'Explora l’espaiat, els salts de línia i l’orientació del text.', keywords: 'letter-spacing word-spacing line-height direction text-indent text-overflow word-break overflow-wrap white-space writing-mode user-select' },
    { id: 'columns', title: 'Columnes de text', group: 'Text', help: 'Distribueix text en columnes i configura’n la separació i les línies.', keywords: 'column-count column-width column-gap column-rule column-span' },
    { id: 'transforms', title: 'Transformacions', group: 'Moviment', help: 'Mou, gira i escala un element. L’ordre de les transformacions afecta el resultat.', keywords: 'transform translate rotate scale skew' },
    { id: 'transitions', title: 'Transicions', group: 'Moviment', help: 'Configura la durada i reprodueix el canvi entre dos estats.', keywords: 'transition duration timing delay animació' },
    { id: 'forms', title: 'Formularis', group: 'CSS aplicat', help: 'Dona estil als camps i prova els estats de focus, validació i selecció.', keywords: 'form formularis input textarea select label focus focus-visible focus-within valid invalid disabled required accent-color checkbox radio' },
    { id: 'interactivity', title: 'Interactivitat', group: 'CSS aplicat', help: 'Explora canvis d’estat amb checkbox, radio i selectors CSS. Els exemples funcionen sense JavaScript.', keywords: 'interactivitat checked has germans toggle interruptor pestanyes carrusel flip targeta animació label input radio checkbox' },
    { id: 'responsive', title: 'Responsive', group: 'CSS aplicat', help: 'Canvia l’amplada de l’exemple per veure com s’adapta el disseny i quines regles CSS s’activen.', keywords: 'responsive mòbil tauleta escriptori adaptar adaptable media breakpoint punt ruptura clamp fluid columnes menú hamburguesa' },
    { id: 'examples', title: 'Exemples', group: 'CSS aplicat', help: 'Tria una secció, adapta-la i copia’n l’HTML i el CSS. Les interaccions dels exemples funcionen sense JavaScript.', keywords: 'exemples seccions copiar enganxar modern portada hero bento galeria tarifes acordió faq vidre frozen glass menú hamburguesa flex 1' },
    { id: 'animations', title: 'Animacions', group: 'Moviment', help: 'Explora animacions amb fotogrames, compara com es reprodueixen i copia’n el CSS complet.', keywords: 'animation animation-name animation-play-state @keyframes fotogrames aparició lliscament pulsació rebot gir sacsejada animació' }
];
let workspaceTopics = new Map();
let activeTopic;
let workspaceReady = false;
let activeCodeLanguage = 'css';

function workspaceElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function setupWorkspace() {
    const main = document.querySelector('.main-controls');
    const sections = [...main.querySelectorAll('details.section')];
    const flexSection = document.createElement('details');
    flexSection.className = 'section';
    flexSection.innerHTML = '<summary><img class="icon" src="images/icons/displayFlex.svg" alt=""><span>Flexbox</span></summary>';
    const flexContent = document.getElementById('flex-options');
    flexContent.className = 'section-content';
    flexSection.append(flexContent);
    sections[0].after(flexSection);
    const originalIds = ['display', 'box-model', 'size', 'overflow', 'shadows', 'background', 'opacity', 'transforms', 'transitions', 'filters', 'cursor', 'typography', 'paragraph', 'columns'];
    sections.forEach((section, index) => workspaceTopics.set(originalIds[index], { section }));
    workspaceTopics.set('flexbox', { section: flexSection });
    const gridSection = document.createElement('details');
    gridSection.className = 'section';
    gridSection.innerHTML = '<summary><img class="icon" src="images/icons/displayGrid.svg" alt=""><span>Grid</span></summary><div class="section-content"></div>';
    flexSection.after(gridSection);
    workspaceTopics.set('grid', { section: gridSection });
    const positionSection = document.createElement('details');
    positionSection.className = 'section';
    positionSection.innerHTML = '<summary><img class="icon" src="images/icons/position.svg" alt=""><span>Posicionament</span></summary><div class="section-content"></div>';
    gridSection.after(positionSection);
    workspaceTopics.set('position', { section: positionSection });
    const animationSection = document.createElement('details');
    animationSection.className = 'section';
    animationSection.innerHTML = '<summary><img class="icon" src="images/icons/animation.svg" alt=""><span>Animacions</span></summary><div class="section-content"></div>';
    workspaceTopics.get('transitions').section.after(animationSection);
    workspaceTopics.set('animations', { section: animationSection });
    const examplesSection = document.createElement('details');
    examplesSection.className = 'section';
    examplesSection.innerHTML = '<summary><img class="icon" src="images/icons/examples.svg" alt=""><span>Exemples</span></summary><div class="section-content"></div>';
    main.append(examplesSection);
    workspaceTopics.set('examples', { section: examplesSection });
    ['forms', 'interactivity', 'responsive'].forEach(id => {
        const section = workspaceElement('details', 'section');
        section.innerHTML = '<summary><span>' + cssTopics.find(topic => topic.id === id).title + '</span></summary><div class="section-content"></div>';
        main.append(section);
        workspaceTopics.set(id, { section });
    });
    main.querySelector('.fallback-title').remove();
    document.body.classList.add('workspace-enabled');
    main.id = 'workspace-main';
    main.tabIndex = -1;
    const sidebar = workspaceElement('aside', 'sidebar');
    sidebar.id = 'topic-menu';
    sidebar.innerHTML = `<a class="brand" href="#flexbox"><span class="brand-mark">{ }</span><span>Eina CSS</span></a>
        <button type="button" class="menu-close action-button" aria-label="Tanca el menú">Tanca ×</button>
        <label class="search-label" for="topic-search">Troba una propietat</label>
        <input id="topic-search" type="search" placeholder="Cerca: centrar, gradient…" autocomplete="off">
        <nav aria-label="Temes de CSS"></nav>
        <p id="search-empty" hidden>Cap resultat. Prova el nom d’una propietat.</p>`;
    const nav = sidebar.querySelector('nav');
    ['Distribució', 'Caixa', 'Aparença', 'Text', 'Moviment', 'CSS aplicat'].forEach(name => {
        const group = workspaceElement('details', 'nav-group');
        group.open = true;
        group.append(workspaceElement('summary', '', name));
        cssTopics.filter(topic => topic.group === name).forEach(topic => {
            const entry = workspaceElement('button', 'topic-link', topic.title);
            entry.type = 'button';
            entry.dataset.topic = topic.id;
            entry.addEventListener('click', () => selectTopic(topic.id, true));
            group.append(entry);
        });
        nav.append(group);
    });
    document.querySelector('.container').prepend(sidebar);
    const backdrop = workspaceElement('button', 'menu-backdrop');
    backdrop.type = 'button';
    backdrop.setAttribute('aria-label', 'Tanca el menú');
    document.body.append(backdrop);
    main.insertAdjacentHTML('afterbegin', `<header class="workspace-header">
        <div class="workspace-topline"><button type="button" id="menu-toggle" class="action-button" aria-expanded="false" aria-controls="topic-menu">☰ Temes</button><span id="topic-category" class="eyebrow"></span></div>
        <h1 id="topic-title"></h1><p id="topic-help"></p>
        <div class="workspace-toolbar"><div class="workspace-actions"><button type="button" id="reset-example" class="action-button">Restableix</button></div></div>
        </header>`);
    const code = workspaceElement('section', 'code-panel');
    code.setAttribute('aria-label', 'Codi d’aquest exemple');
    code.innerHTML = `<div class="code-heading"><div class="code-tabs" role="tablist" aria-label="Llenguatge del codi"><button type="button" id="code-css-tab" role="tab" aria-selected="true" aria-controls="code-css-panel" data-code-language="css">CSS</button><button type="button" id="code-html-tab" role="tab" aria-selected="false" aria-controls="code-html-panel" tabindex="-1" data-code-language="html">HTML</button></div>
        <div class="code-copy-actions"><button type="button" id="copy-css" class="action-button primary-button">Copia el CSS</button><button type="button" id="copy-html" class="action-button primary-button" hidden>Copia l’HTML</button></div></div>
        <div class="code-content"><pre id="code-css-panel" role="tabpanel" aria-labelledby="code-css-tab" tabindex="0"><code id="generated-css"></code></pre>
        <pre id="code-html-panel" class="code-inactive" role="tabpanel" aria-labelledby="code-html-tab" aria-hidden="true" tabindex="-1" inert><code id="generated-html"></code></pre></div>
        <p id="copy-status" class="sr-only" role="status"></p>`;
    main.append(code);
    code.querySelectorAll('[data-code-language]').forEach(tab => {
        tab.addEventListener('click', () => selectCodeLanguage(tab.dataset.codeLanguage));
        tab.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const language = event.key === 'Home' ? 'css' : event.key === 'End' ? 'html' : activeCodeLanguage === 'css' ? 'html' : 'css';
            selectCodeLanguage(language);
            document.getElementById(`code-${language}-tab`).focus();
        });
    });
    cssTopics.forEach(topic => {
        const record = workspaceTopics.get(topic.id);
        record.topic = topic;
        record.section.id = topic.id;
        record.section.hidden = true;
        record.section.open = true;
        record.section.querySelector('summary').setAttribute('aria-hidden', 'true');
        if (!['background', 'grid', 'position', 'animations', 'box-model', 'size', 'examples', 'forms', 'interactivity', 'responsive'].includes(topic.id)) prepareLesson(record);
    });
    const setMenu = open => {
        document.body.classList.toggle('menu-open', open);
        document.getElementById('menu-toggle').setAttribute('aria-expanded', String(open));
        if (open) document.getElementById('topic-search').focus();
        else document.getElementById('menu-toggle').focus();
    };
    document.getElementById('menu-toggle').addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    sidebar.querySelector('.menu-close').addEventListener('click', () => setMenu(false));
    backdrop.addEventListener('click', () => setMenu(false));
    document.addEventListener('keydown', event => {
        if (!document.body.classList.contains('menu-open')) return;
        if (event.key === 'Escape') setMenu(false);
        if (event.key === 'Tab') {
            const fields = [...sidebar.querySelectorAll('a, button, input, summary')].filter(element => element.getClientRects().length && !element.closest('[hidden]') && !element.disabled);
            const first = fields[0], last = fields[fields.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });
    document.getElementById('topic-search').addEventListener('input', event => {
        const query = normaliseSearch(event.target.value);
        let count = 0;
        nav.querySelectorAll('.topic-link').forEach(entry => {
            const record = workspaceTopics.get(entry.dataset.topic);
            const properties = [...record.section.querySelectorAll('.property-link')].map(link => link.textContent).join(' ');
            const haystack = normaliseSearch(`${record.topic.id} ${record.topic.title} ${record.topic.keywords} ${properties}`);
            entry.hidden = !query.split(/\s+/).every(word => haystack.includes(word));
            if (!entry.hidden) count++;
        });
        nav.querySelectorAll('.nav-group').forEach(group => {
            group.hidden = ![...group.querySelectorAll('.topic-link')].some(entry => !entry.hidden);
            if (query) group.open = true;
        });
        document.getElementById('search-empty').hidden = count > 0;
    });
    document.getElementById('topic-search').addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            const match = [...nav.querySelectorAll('.topic-link')].find(entry => !entry.hidden);
            if (match) {
                selectTopic(match.dataset.topic, true);
                highlightProperty(document.getElementById('topic-search').value);
            }
        }
    });
    async function copyCode(button, language) {
        const codeElement = document.getElementById(`generated-${language}`);
        const source = codeElement.textContent;
        const text = source;
        try {
            if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
            else {
                const field = workspaceElement('textarea', 'clipboard-fallback');
                field.value = text;
                document.body.append(field);
                field.select();
                const copied = document.execCommand('copy');
                field.remove();
                if (!copied) throw new Error('Clipboard unavailable');
            }
            button.textContent = `${language.toUpperCase()} copiat ✓`;
            document.getElementById('copy-status').textContent = `${language.toUpperCase()} copiat al porta-retalls.`;
        } catch {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(codeElement);
            selection.removeAllRanges();
            selection.addRange(range);
            button.textContent = 'Prem Ctrl/Cmd + C';
            document.getElementById('copy-status').textContent = 'El codi està seleccionat. Copia’l amb Ctrl o Cmd més C.';
        }
    }
    document.getElementById('copy-css').addEventListener('click', event => copyCode(event.currentTarget, 'css'));
    document.getElementById('copy-html').addEventListener('click', event => copyCode(event.currentTarget, 'html'));
    const viewResult = workspaceElement('button', 'mobile-result action-button', '↑ Veure resultat');
    viewResult.type = 'button';
    viewResult.addEventListener('click', () => workspaceTopics.get(activeTopic).section.querySelector('.lesson-layout:not([hidden]) .preview-pane').scrollIntoView({ block: 'start', behavior: 'smooth' }));
    main.append(viewResult);
    document.getElementById('reset-example').addEventListener('click', resetCurrentLesson);
    ['input', 'change', 'click'].forEach(type => main.addEventListener(type, () => requestAnimationFrame(() => {
        if (workspaceReady) { improveControls(main); updateWorkspaceCode(); }
    }), true));
    window.addEventListener('hashchange', () => selectTopic(location.hash.slice(1)));
    const observer = new ResizeObserver(() => {
        const current = workspaceTopics.get(activeTopic);
        if (current?.section.querySelector('#boxmodel-canvas') && workspaceReady) showBoxModel();
        if (current?.section.querySelector('#size-canvas') && workspaceReady) showSizeExample();
    });
    observer.observe(main);
    selectTopic(workspaceTopics.has(location.hash.slice(1)) ? location.hash.slice(1) : 'flexbox');
}

function normaliseSearch(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function prepareLesson(record) {
    const content = record.section.querySelector('.section-content');
    let sources = [content];
    if (record.topic.id === 'shadows') sources = [...content.querySelectorAll('.shadow-column')];
    if (record.topic.id === 'cursor') {
        const grid = content.querySelector('#cursor-grid');
        grid.removeAttribute('style');
        grid.setAttribute('role', 'group');
        grid.setAttribute('aria-label', 'Àrees per provar cada cursor');
        const controls = workspaceElement('div', 'controls-pane');
        controls.classList.add('cursor-summary');
        const demo = workspaceElement('div', 'cursor-test-area');
        demo.id = 'cursor-demo-box';
        demo.innerHTML = '<span>Prova el cursor</span><strong>pointer</strong><span>Passa-hi el ratolí</span>';
        const selected = workspaceElement('div', 'cursor-selection');
        selected.append(content.querySelector('.property-row'));
        selected.append(workspaceElement('p', 'property-explanation', 'El cursor seleccionat es mostra al codi inferior. Cada àrea conserva el seu propi cursor.'));
        controls.append(demo, selected);
        const preview = grid;
        const pane = workspaceElement('div', 'preview-pane');
        pane.append(grid);
        const layout = workspaceElement('div', 'lesson-layout cursor-layout');
        layout.append(controls, pane);
        content.replaceChildren(layout);
        record.groups = [{ layout, controls, preview, pane }];
        record.groupIndex = 0;
        return;
    }
    const groups = [];
    sources.forEach(source => {
        let group;
        [...source.children].forEach(child => {
            if (child.matches('h4')) return;
            if (child.classList.contains('example-container')) {
                group = { preview: child, controls: workspaceElement('div', 'controls-pane') };
                groups.push(group);
            } else {
                if (!group) { group = { controls: workspaceElement('div', 'controls-pane') }; groups.push(group); }
                group.controls.append(child);
            }
        });
    });
    if (!groups[0]?.preview && groups.length > 1) {
        const orphan = groups.shift();
        groups[0].controls.prepend(...orphan.controls.children);
    }
    content.replaceChildren();
    record.groups = groups;
    if (groups.length > 1) {
        const tabs = workspaceElement('div', 'lesson-tabs');
        tabs.setAttribute('role', 'group');
        tabs.setAttribute('aria-label', 'Exemple a explorar');
        groups.forEach((group, index) => {
            let title = group.controls.querySelector('.property-link')?.textContent.replace(':', '') || `Exemple ${index + 1}`;
            if (group.preview?.id === 'justify-content-example-row') title += ' · row';
            if (group.preview?.id === 'justify-content-example-column') title += ' · column';
            const button = workspaceElement('button', '', title);
            button.type = 'button';
            button.setAttribute('aria-pressed', String(index === 0));
            button.addEventListener('click', () => selectLessonGroup(record, index));
            tabs.append(button);
            group.button = button;
        });
        content.append(tabs);
    }
    groups.forEach((group, index) => {
        const layout = workspaceElement('div', 'lesson-layout');
        const pane = workspaceElement('div', 'preview-pane');
        pane.append(workspaceElement('span', 'pane-label', 'Resultat en viu'));
        if (group.preview) {
            group.preview.classList.add('live-stage');
            if (record.topic.id === 'opacity') group.preview.classList.add('live-stage--transparency');
            pane.append(group.preview);
        }
        const controlsTitle = workspaceElement('h2', 'pane-label', 'Propietats');
        group.controls.prepend(controlsTitle);
        layout.append(pane, group.controls);
        layout.hidden = index > 0;
        group.layout = layout;
        group.pane = pane;
        content.append(layout);
    });
    record.groupIndex = 0;
}

function selectLessonGroup(record, index) {
    if (record.groupIndex !== index) selectCodeLanguage('css');
    record.groupIndex = index;
    record.groups.forEach((group, i) => {
        group.layout.hidden = i !== index;
        group.button?.setAttribute('aria-pressed', String(i === index));
    });
    if (workspaceReady) {
        if (record.topic.id === 'box-model' && !record.getSource) showBoxModel();
        if (record.topic.id === 'size' && !record.getSource) showSizeExample();
        record.onActivate?.();
        updateWorkspaceCode();
    }
}

function selectTopic(id, updateHash = false) {
    if (!workspaceTopics.has(id)) return;
    if (activeTopic !== id) workspaceTopics.get(activeTopic)?.onDeactivate?.();
    if (activeTopic !== id) selectCodeLanguage('css');
    activeTopic = id;
    const record = workspaceTopics.get(id);
    workspaceTopics.forEach(item => { item.section.hidden = item !== record; });
    document.querySelectorAll('.topic-link').forEach(button => {
        if (button.dataset.topic === id) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
    });
    document.getElementById('topic-title').textContent = record.topic.title;
    document.getElementById('topic-help').textContent = record.topic.help;
    document.getElementById('topic-category').textContent = record.topic.group;
    document.body.classList.remove('menu-open');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
    if (updateHash) {
        history.pushState(null, '', `#${id}`);
        document.getElementById('topic-title').tabIndex = -1;
        document.getElementById('topic-title').focus({ preventScroll: true });
        document.querySelector('.workspace-header').scrollIntoView({ block: 'start' });
        highlightProperty(document.getElementById('topic-search').value);
    }
    if (workspaceReady) {
        if (id === 'box-model' && !record.getSource) showBoxModel();
        if (id === 'size' && !record.getSource) showSizeExample();
        record.onActivate?.();
        updateWorkspaceCode();
    }
}

function highlightProperty(query) {
    if (!query.trim()) return;
    const record = workspaceTopics.get(activeTopic);
    const topicName = normaliseSearch(record.topic.title);
    const words = normaliseSearch(query).split(/\s+/).filter(word => word !== topicName && word !== record.topic.id);
    const link = [...record.section.querySelectorAll('.property-link')].find(element => words.length && words.every(word => normaliseSearch(element.textContent).includes(word)));
    if (!link) {
        const index = record.findGroupForQuery?.(query);
        if (index >= 0) selectLessonGroup(record, index);
        return;
    }
    const index = record.groups?.findIndex(group => group.controls.contains(link));
    if (index >= 0) selectLessonGroup(record, index);
    const row = link.closest('.property-row') || link;
    for (let ancestor = row.parentElement; ancestor && ancestor !== record.section; ancestor = ancestor.parentElement) {
        if (ancestor.matches('details')) ancestor.open = true;
    }
    row.classList.add('search-highlight');
    row.scrollIntoView({ block: 'nearest' });
    setTimeout(() => row.classList.remove('search-highlight'), 2500);
}

function improveControls(root) {
    root.querySelectorAll('.property-btn').forEach(button => {
        if (button.querySelector('.button-label') || button.children.length !== 1 || !button.querySelector('img')) return;
        const label = button.dataset.display || button.dataset.direction || button.dataset.align || button.dataset.justify || button.dataset.wrap || button.dataset.alignContent || button.dataset.boxSizing || button.dataset.overflow || button.dataset.overflowX || button.dataset.overflowY || button.dataset.visibility || button.dataset.style || button.dataset.transform || button.dataset.decoration || button.dataset.ruleStyle || button.title || button.querySelector('img').alt;
        button.append(workspaceElement('span', 'button-label', label === 'initial' ? 'initial' : label));
        button.setAttribute('aria-label', label);
    });
    root.querySelectorAll('.property-buttons:not(.property-selector-options) .property-btn').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('selected'))));
    root.querySelectorAll('input, select, textarea').forEach(field => {
        if (field.matches('input[type="number"]') && !field.disabled) field.setAttribute('aria-invalid', String(!field.validity.valid));
        if (field.labels?.length || field.hasAttribute('aria-label')) return;
        const property = field.closest('.property-row')?.querySelector('.property-link')?.textContent.replace(':', '');
        field.setAttribute('aria-label', property || field.id || field.type);
    });
    setupNativePropertySelectors(root);
    updatePropertyExplanations(root);
}

function finishWorkspace() {
    showFlexDirectionExample('row');
    showAlignItemsExample('initial');
    showAlignContentExample('initial');
    document.getElementById('align-items-value').textContent = 'initial;';
    document.getElementById('align-content-value').textContent = 'initial;';
    document.querySelector('.flex-direction-btn.selected').classList.remove('selected');
    document.querySelector('.flex-direction-btn[data-direction="row"]').classList.add('selected');
    document.querySelector('.display-btn.selected').classList.remove('selected');
    document.querySelector('.display-btn[data-display="block"]').classList.add('selected');
    const paragraph = document.getElementById('paragraph-demo');
    const typography = document.getElementById('typography-demo');
    [paragraph, typography].forEach(element => {
        element.contentEditable = 'true';
        element.setAttribute('role', 'textbox');
        element.setAttribute('aria-label', 'Text de prova editable');
        element.setAttribute('aria-multiline', 'true');
        element.textContent = 'Explora CSS amb aquest text. Pots editar-lo, afegir una URL llarga o escriure diverses línies per observar com canvia el resultat.';
    });
    document.getElementById('text-overflow-select').addEventListener('change', event => {
        paragraph.style.overflow = event.target.value === 'ellipsis' ? 'hidden' : '';
        if (event.target.value === 'ellipsis') {
            document.getElementById('white-space-select').value = 'nowrap';
            document.getElementById('white-space-select').dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    const columns = document.getElementById('columns-demo');
    const title = workspaceElement('h3', '', 'Un títol entre columnes');
    columns.prepend(title);
    document.getElementById('column-span-select').addEventListener('change', event => {
        columns.style.columnSpan = '';
        title.style.columnSpan = event.target.value;
    });
    document.getElementById('column-count-input').min = '1';
    const transitionRecord = workspaceTopics.get('transitions');
    const play = workspaceElement('button', 'action-button primary-button transition-play');
    play.type = 'button';
    play.id = 'play-transition';
    play.innerHTML = '<img src="images/icons/iconPlay.svg" alt="" aria-hidden="true"><span>Play</span>';
    play.addEventListener('click', () => {
        const demo = document.getElementById('transition-demo');
        const transition = demo.style.transition;
        demo.style.transition = 'none';
        demo.dispatchEvent(new Event('mouseleave'));
        // Start each playback at the original appearance, without animating the reset.
        void demo.offsetWidth;
        demo.style.transition = transition;
        demo.dispatchEvent(new Event('mouseenter'));
    });
    const preview = transitionRecord.groups[0].pane;
    const previewHeading = workspaceElement('div', 'preview-heading');
    previewHeading.append(preview.querySelector('.pane-label'), play);
    preview.prepend(previewHeading);
    workspaceTopics.forEach(record => {
        record.groups?.forEach(group => {
            group.defaults = [...group.controls.querySelectorAll('input, select')].map(field => ({ id: field.id, value: field.value, checked: field.checked, disabled: field.disabled }));
            group.selected = [...group.controls.querySelectorAll('.property-btn.selected')];
            group.toggleStates = [...group.controls.querySelectorAll('button[id$="-initial-btn"], .opacity-reset-btn')].map(button => ({ button, selected: button.classList.contains('selected') }));
            group.original = group.preview?.cloneNode(true);
            group.original?.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
            group.original?.removeAttribute('id');
            group.listDefaults = [...group.controls.querySelectorAll('[id$="-list"]')].map(list => ({ list, count: list.children.length, add: group.controls.querySelector(`#add-${list.id.replace('-list', '')}-btn`) }));
        });
    });
    improveControls(document.querySelector('.main-controls'));
    setupPropertySelectors(document.querySelector('.main-controls'));
    workspaceReady = true;
    document.body.classList.remove('workspace-loading');
    document.querySelector('.workspace-loading-status')?.remove();
    workspaceTopics.get(activeTopic)?.onActivate?.();
    updateWorkspaceCode();
}

function generateLessonCss(record, group) {
    const declarations = new Map();
    const demo = group.preview?.querySelector('[id$="-demo"], [id$="-demo-box"]');
    const outer = group.preview?.querySelector('.mini-outer');
    const blocks = [];
    if (record.topic.id === 'flexbox') {
        declarations.set('display', 'flex');
        declarations.set('flex-direction', outer?.style.flexDirection || 'row');
        if (outer?.style.flexWrap) declarations.set('flex-wrap', outer.style.flexWrap);
        declarations.set('height', outer?.style.height || '125px');
        if (outer?.style.width) declarations.set('width', outer.style.width);
        if (outer?.style.height) declarations.set('height', outer.style.height);
    }
    if (record.topic.id === 'size') {
        declarations.set('padding', '12px');
        declarations.set('border', '4px solid #2563eb');
    }
    group.controls.querySelectorAll('.property-row').forEach(row => {
        const property = row.querySelector('.property-link')?.textContent.replace(':', '').trim();
        if (!property) return;
        const field = row.querySelector('input:not([type="range"]), select');
        const value = row.querySelector('.property-value')?.textContent.replace(/;$/, '').trim() || field?.value.trim();
        if (!value) return;
        const target = record.topic.id === 'flexbox' ? outer : demo;
        const actual = target?.style.getPropertyValue(property);
        if (property === 'column-span') return;
        declarations.set(property, actual || value);
    });
    if (record.topic.id === 'overflow') {
        ['width', 'height'].forEach(property => declarations.set(property, demo.style.getPropertyValue(property)));
        blocks.push('/* El contingut ha de superar aquestes dimensions per veure el desbordament. */');
    }
    if (record.topic.id === 'paragraph' && declarations.get('text-overflow') === 'ellipsis') {
        declarations.set('overflow', 'hidden');
        declarations.set('white-space', 'nowrap');
        declarations.set('max-width', '30rem');
    }
    if (record.topic.id === 'display' && ['flex', 'contents'].includes(declarations.get('display'))) {
        blocks.push('/* Aplica aquest selector al contenidor dels elements. */');
    } else if (record.topic.id === 'display') blocks.push('/* Aplica aquest selector als elements que vols modificar. */');
    blocks.push(`.exemple {\n${[...declarations].map(([property, value]) => `  ${property}: ${value};`).join('\n')}\n}`);
    if (record.topic.id === 'columns') {
        blocks.push(`.exemple > h3 {\n  column-span: ${document.getElementById('column-span-select').value};\n}`);
    }
    if (record.topic.id === 'transitions') {
        declarations.set('width', '100px');
        declarations.set('height', '100px');
        declarations.set('background-color', '#2563eb');
        declarations.set('border-radius', '8px');
        declarations.set('color', 'white');
        // Rebuild the first rule after adding the context needed to reproduce the state change.
        blocks[blocks.length - 1] = `.exemple {\n${[...declarations].map(([property, value]) => `  ${property}: ${value};`).join('\n')}\n}`;
        blocks.push('.exemple:hover,\n.exemple:focus-visible {\n  transform: scale(1.2) rotate(10deg);\n  border-radius: 50%;\n  background-color: #f39c12;\n  width: 120px;\n  height: 120px;\n  opacity: 0.6;\n  color: #17263c;\n  margin: 10px;\n  padding: 12px;\n  box-shadow: 0 8px 20px #17263c55;\n  filter: grayscale(1);\n}');
    }
    return blocks.join('\n\n');
}

function generateExampleSource(record, group) {
    if (group?.getSource) return group.getSource();
    if (record.getSource) return record.getSource();
    let css = record.topic.id === 'background' ? record.getCss() : generateLessonCss(record, group);
    const preview = record.topic.id === 'background' ? record.section : group.preview;
    const root = preview.querySelector('[id$="-demo"], [id$="-demo-box"]') || preview.querySelector('.mini-outer');
    const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const rule = (selector, properties) => `${selector} {\n${Object.entries(properties).map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`;
    // Context is exported alongside the explored properties so HTML and CSS work together.
    const withContext = properties => {
        const body = css.match(/\.exemple \{\n([\s\S]*?)\n\}/)?.[1] || '';
        const names = new Set([...body.matchAll(/^\s*([a-z-]+):/gm)].map(match => match[1]));
        const context = Object.entries(properties).filter(([name]) => !names.has(name));
        if (context.length) css = css.replace(/(\.exemple \{\n[\s\S]*?)(\n\})/, `$1\n${context.map(([name, value]) => `  ${name}: ${value};`).join('\n')}$2`);
    };
    if (!root) {
        withContext({ 'box-sizing': record.topic.id === 'box-model' ? 'content-box' : 'border-box', width: '140px', height: '90px', 'background-color': '#ffffff', color: '#17263c' });
        return { html: '<div class="exemple">Contingut</div>', css };
    }
    const isItemDisplay = record.topic.id === 'display' && !['flex', 'contents'].includes(document.querySelector('.display-btn.selected').dataset.display);
    const hiddenDisplay = isItemDisplay && document.querySelector('.display-btn.selected').dataset.display === 'none';
    const childStyles = [];
    let elementCounter = 0;
    const contextualStyle = (element, isRoot = false) => {
        const computed = getComputedStyle(element);
        const properties = {};
        const names = ['box-sizing', 'padding', 'margin', 'border', 'border-radius', 'background', 'color', 'font-size', 'font-weight', 'line-height', 'text-align'];
        names.forEach(name => {
            const value = computed.getPropertyValue(name);
            if (['padding', 'margin', 'border-radius'].includes(name) && /^0px(?: 0px)*$/.test(value)) return;
            if (name === 'border' && computed.borderTopWidth === '0px' && computed.borderRightWidth === '0px' && computed.borderBottomWidth === '0px' && computed.borderLeftWidth === '0px') return;
            if (name === 'background' && computed.backgroundImage === 'none' && computed.backgroundColor === 'rgba(0, 0, 0, 0)') return;
            if ((name === 'font-weight' && value === '400') || (name === 'text-align' && value === 'start')) return;
            if (value) properties[name] = value;
        });
        ['width', 'height', 'min-width', 'min-height', 'display', 'flex-direction', 'align-items', 'justify-content', 'overflow', 'text-shadow', 'object-fit'].forEach(name => {
            const specified = element.style.getPropertyValue(name);
            if (specified) properties[name] = specified;
            else if (isRoot && name === 'display') properties[name] = computed.display;
            else if (isRoot && ['flex-direction', 'align-items', 'justify-content'].includes(name) && computed.display.includes('flex')) properties[name] = computed.getPropertyValue(name);
            else if (isRoot && name === 'text-shadow' && computed.textShadow !== 'none') properties[name] = computed.textShadow;
            else if (isRoot && name === 'object-fit' && element.tagName === 'IMG') properties[name] = computed.objectFit;
        });
        if (element.classList.contains('mini-item')) properties['min-width'] = computed.minWidth;
        if (isRoot && element.classList.contains('mini-outer')) {
            properties.width = element.style.width || '100%';
            properties.height = element.style.height || '125px';
            properties.overflow = computed.overflow;
        }
        // Background longhands already describe the selected fons. Avoid a later shorthand reset.
        if (isRoot && record.topic.id === 'background') delete properties.background;
        return properties;
    };
    function serialize(element, depth = 0, isRoot = false) {
        const allowedTags = new Set(['div', 'span', 'strong', 'p', 'h3', 'br', 'img', 'button', 'em', 'b', 'i']);
        let tag = element.tagName.toLowerCase();
        if (!allowedTags.has(tag)) return '';
        if (isRoot && record.topic.id === 'transitions') tag = 'button';
        const indent = '  '.repeat(depth);
        let className;
        if (isRoot) className = isItemDisplay ? 'contenidor' : 'exemple';
        else {
            className = `element element-${++elementCounter}`;
            if (isItemDisplay && element.parentElement === root && (!hiddenDisplay || element.style.display === 'none')) className = `exemple ${className}`;
            const properties = contextualStyle(element);
            if (isItemDisplay && element.parentElement === root && className.startsWith('exemple')) delete properties.display;
            childStyles.push({ selector: `${isItemDisplay ? '.contenidor' : '.exemple'} .${className.split(' ').at(-1)}`, properties });
        }
        let attributes = ` class="${className}"`;
        if (tag === 'button') attributes += ' type="button"';
        if (tag === 'img') attributes += ` src="${escape(element.getAttribute('src') || '')}" alt="${escape(element.getAttribute('alt') || '')}"`;
        if (tag === 'img' || tag === 'br') return `${indent}<${tag}${attributes}>`;
        const children = [...element.childNodes].filter(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
        if (children.every(node => node.nodeType === Node.TEXT_NODE)) return `${indent}<${tag}${attributes}>${escape(element.textContent.trim())}</${tag}>`;
        const inner = children.map(node => node.nodeType === Node.ELEMENT_NODE ? serialize(node, depth + 1) : `${'  '.repeat(depth + 1)}${escape(node.textContent.trim())}`).filter(Boolean).join('\n');
        return `${indent}<${tag}${attributes}>\n${inner}\n${indent}</${tag}>`;
    }
    const html = serialize(root, 0, true);
    if (isItemDisplay) {
        const firstItem = root.querySelector('.mini-item');
        if (firstItem) {
            const properties = contextualStyle(firstItem);
            delete properties.display;
            // Colours remain per element rather than being shared with every .exemple item.
            delete properties.background;
            withContext(properties);
        }
        css += `\n\n${rule('.contenidor', contextualStyle(root, true))}`;
    } else withContext(contextualStyle(root, true));
    if (root.children.length && [...root.children].every(element => element.classList.contains('mini-item'))) {
        const common = Object.fromEntries(Object.entries(childStyles[0].properties).filter(([name, value]) => childStyles.every(item => item.properties[name] === value)));
        childStyles.forEach(item => Object.keys(common).forEach(name => delete item.properties[name]));
        childStyles.unshift({ selector: `${isItemDisplay ? '.contenidor' : '.exemple'} > .element`, properties: common });
    }
    const childRules = childStyles.filter(item => Object.keys(item.properties).length).map(item => rule(item.selector, item.properties));
    if (childRules.length) css += `\n\n${childRules.join('\n\n')}`;
    return { html, css };
}

function selectCodeLanguage(language) {
    activeCodeLanguage = language;
    document.querySelectorAll('[data-code-language]').forEach(tab => {
        const selected = tab.dataset.codeLanguage === language;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
    });
    ['css', 'html'].forEach(panelLanguage => {
        const panel = document.getElementById(`code-${panelLanguage}-panel`);
        const inactive = panelLanguage !== language;
        panel.classList.toggle('code-inactive', inactive);
        panel.setAttribute('aria-hidden', String(inactive));
        panel.inert = inactive;
        panel.tabIndex = inactive ? -1 : 0;
    });
    document.getElementById('copy-css').hidden = language !== 'css';
    document.getElementById('copy-html').hidden = language !== 'html';
}

function exampleProperties(record, css) {
    const controls = ['grid', 'animations', 'box-model', 'size', 'examples', 'forms', 'interactivity', 'responsive'].includes(record.topic.id) ? record.groups[record.groupIndex].controls : record.section;
    const properties = new Set([...controls.querySelectorAll('.property-link')].map(link => link.textContent.split(':')[0].trim()));
    if (record.topic.id === 'box-model' && record.groups[record.groupIndex].lesson.id === 'border') properties.add('border');
    if (record.topic.id === 'box-model' && record.groups[record.groupIndex].lesson.id === 'radius') ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'].forEach(name => properties.add(name));
    if (record.topic.group === 'CSS aplicat') {
        const lesson = record.groups[record.groupIndex].lesson;
        (lesson?.properties || []).forEach(name => properties.add(name));
    }
    if (record.topic.id === 'flexbox') properties.add('display');
    if (record.topic.id === 'animations' && record.groups[record.groupIndex].lesson.editor) ['transform', 'opacity', 'background-color'].forEach(property => properties.add(property));
    if (record.topic.id === 'background') {
        properties.add('background');
        if (/background-clip:\s*text\s*;/.test(css)) properties.add('color');
    }
    if (record.topic.id === 'paragraph' && /text-overflow:\s*ellipsis\s*;/.test(css)) properties.add('overflow');
    return properties;
}

function renderHighlightedCss(element, source, properties) {
    const signature = [...properties].sort().join('|');
    if (element.textContent === source && element.dataset.highlightProperties === signature) return;
    const fragment = document.createDocumentFragment();
    let continuedDeclaration = false;
    let related = false;
    (source.match(/[^\n]*\n|[^\n]+$/g) || []).forEach(line => {
        const declaration = line.match(/^(\s+)([a-z-]+)(\s*:)/);
        if (declaration) {
            const property = declaration[2];
            related = [...properties].some(name => property === name || property.startsWith(`${name}-`));
            continuedDeclaration = true;
            const span = workspaceElement('span', `code-declaration ${related ? 'code-related' : 'code-contextual'}`);
            span.append(document.createTextNode(declaration[1]));
            span.append(workspaceElement('span', 'code-property', property));
            span.append(document.createTextNode(line.slice(declaration[1].length + property.length)));
            fragment.append(span);
        } else if (continuedDeclaration) {
            fragment.append(workspaceElement('span', `code-declaration ${related ? 'code-related' : 'code-contextual'}`, line));
        } else fragment.append(document.createTextNode(line));
        if (/;\s*$/.test(line) || /^\s*\}/.test(line)) continuedDeclaration = false;
    });
    // Inline spans contain only the original characters: selection and copy retain exact text.
    element.replaceChildren(fragment);
    element.dataset.highlightProperties = signature;
}

function updateWorkspaceCode() {
    if (!workspaceReady) return;
    const record = workspaceTopics.get(activeTopic);
    const group = record.groups?.[record.groupIndex || 0];
    const source = generateExampleSource(record, group);
    ['css', 'html'].forEach(language => {
        const element = document.getElementById(`generated-${language}`);
        if (element.textContent !== source[language]) {
            if (language === 'html') element.textContent = source[language];
            document.getElementById(`copy-${language}`).textContent = language === 'css' ? 'Copia el CSS' : 'Copia l’HTML';
            document.getElementById('copy-status').textContent = '';
        }
        if (language === 'css') renderHighlightedCss(element, source.css, exampleProperties(record, source.css));
    });
}

function resetCurrentLesson() {
    const record = workspaceTopics.get(activeTopic);
    if (record.groups[record.groupIndex]?.reset) { record.groups[record.groupIndex].reset(); updateWorkspaceCode(); return; }
    if (record.reset) { record.reset(); updateWorkspaceCode(); return; }
    const group = record.groups[record.groupIndex];
    group.listDefaults.forEach(({ list, count, add }) => {
        while (list.children.length > count) {
            const remove = list.lastElementChild.querySelector('button[title^="Remove"]');
            if (!remove) break;
            remove.click();
        }
        while (list.children.length < count && add) add.click();
    });
    group.toggleStates.forEach(({ button, selected }) => {
        if (button.classList.contains('selected') !== selected) button.click();
    });
    group.selected.forEach(button => { if (button.isConnected && !button.classList.contains('selected')) button.click(); });
    group.defaults.forEach((state, index) => {
        const fields = [...group.controls.querySelectorAll('input, select')];
        const field = fields.find(element => state.id && element.id === state.id) || fields[index];
        if (!field) return;
        const changed = field.value !== state.value || field.checked !== state.checked;
        field.disabled = state.disabled;
        field.value = state.value;
        field.checked = state.checked;
        if (changed) field.dispatchEvent(new Event(field.matches('select, [type="checkbox"]') ? 'change' : 'input', { bubbles: true }));
    });
    // Editing a colour exits Initial; restore that mode after restoring its fields.
    group.toggleStates.filter(({ button }) => ['text-color-initial-btn', 'column-rule-color-initial-btn'].includes(button.id)).forEach(({ button, selected }) => {
        if (button.classList.contains('selected') !== selected) button.click();
    });
    const editable = group.preview?.querySelector('[contenteditable="true"]');
    if (editable) editable.textContent = group.original.querySelector('[contenteditable="true"]').textContent;
    improveControls(record.section);
    updateWorkspaceCode();
}

