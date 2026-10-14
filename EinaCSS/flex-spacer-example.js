/* A focused Flexbox lesson illustrating the flexible spacer used by navigation bars. */
function setupFlexSpacerExample() {
    const record = workspaceTopics.get('flexbox');
    const index = record.groups.length;
    const content = record.section.querySelector('.section-content');
    const tabs = content.querySelector('.lesson-tabs');
    const button = workspaceElement('button', '', 'flex: 1'); button.type = 'button'; button.setAttribute('aria-pressed', 'false'); tabs.append(button);
    const layout = workspaceElement('div', 'lesson-layout'); layout.hidden = true;
    layout.innerHTML = `<div class="preview-pane"><span class="pane-label">Resultat en viu</span><div class="live-stage flex-spacer-stage"><div class="flex-spacer-demo"><div class="flex-spacer-item">Logo</div><div class="flex-spacer-space" aria-hidden="true"></div><div class="flex-spacer-links"><div class="flex-spacer-item">Projectes</div><div class="flex-spacer-item">Contacte</div></div></div></div><p class="property-explanation">La franja verda és l’element .espai: ocupa l’espai lliure i separa el logotip dels enllaços.</p></div><div class="controls-pane"><h2 class="pane-label">Propietats</h2><div class="preset-panel flex-spacer-presets"><span class="pane-label">Prova un exemple</span><div class="preset-buttons"><button type="button" data-spacer="1">Barra horitzontal</button><button type="button" data-spacer="0">Sense espai flexible</button></div></div><div class="property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex" target="_blank" rel="noopener noreferrer">flex:</a><input id="flex-spacer-value" type="number" min="0" max="3" step="1" value="1" required aria-label="flex de l’espai"><p class="property-explanation">S’aplica a .espai. Amb 1 ocupa l’espai lliure; amb 0 deixa els elements agrupats.</p></div><div class="property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items" target="_blank" rel="noopener noreferrer">align-items:</a><select id="flex-spacer-align" aria-label="align-items"><option>center</option><option>start</option><option>end</option><option>stretch</option></select></div><div class="property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/gap" target="_blank" rel="noopener noreferrer">gap:</a><input id="flex-spacer-gap" type="number" min="0" max="32" value="12" required aria-label="gap de la barra"><span class="examples-unit">px</span></div></div>`;
    content.append(layout);
    const controls = layout.querySelector('.controls-pane'), demo = layout.querySelector('.flex-spacer-demo');
    const spacer = layout.querySelector('.flex-spacer-space');
    const flex = controls.querySelector('#flex-spacer-value'), align = controls.querySelector('#flex-spacer-align'), gap = controls.querySelector('#flex-spacer-gap');
    let state;
    const render = () => {
        spacer.style.flex = String(state.flex); demo.style.alignItems = state.align; demo.style.gap = `${state.gap}px`;
        controls.querySelectorAll('[data-spacer]').forEach(entry => entry.setAttribute('aria-pressed', String(Number(entry.dataset.spacer) === state.flex && state.align === 'center' && state.gap === 12)));
        if (workspaceReady) updateWorkspaceCode();
    };
    const reset = (value = 1) => { state = { flex: value, align: 'center', gap: 12 }; flex.value = value; align.value = 'center'; gap.value = 12; if (workspaceReady) improveControls(controls); render(); };
    [[flex, 'flex'], [gap, 'gap']].forEach(([input, name]) => input.addEventListener('input', () => {
        const valid = input.value !== '' && input.validity.valid; input.setAttribute('aria-invalid', String(!valid)); if (!valid) return; state[name] = Number(input.value); render();
    }));
    align.addEventListener('change', () => { state.align = align.value; render(); });
    controls.querySelectorAll('[data-spacer]').forEach(entry => entry.addEventListener('click', () => reset(Number(entry.dataset.spacer))));
    button.addEventListener('click', () => selectLessonGroup(record, index));
    const getSource = () => ({
        html: '<div class="exemple">\n  <div class="element">Logo</div>\n  <div class="espai" aria-hidden="true"></div>\n  <div class="enllacos">\n    <div class="element">Projectes</div>\n    <div class="element">Contacte</div>\n  </div>\n</div>',
        css: `.exemple {\n  display: flex;\n  align-items: ${state.align};\n  gap: ${state.gap}px;\n  min-height: 80px;\n  font-family: sans-serif;\n}\n\n.espai {\n  flex: ${state.flex};\n  min-width: 0;\n}\n\n.enllacos {\n  display: flex;\n  gap: 6px;\n}\n\n.element {\n  box-sizing: border-box;\n  padding: 8px 6px;\n  background-color: #dbeafe;\n  color: #17263c;\n  font-size: 12px;\n  line-height: 1.5;\n}`
    });
    record.groups.push({ button, layout, controls, preview: layout.querySelector('.flex-spacer-stage'), pane: layout.querySelector('.preview-pane'), reset: () => reset(), getSource });
    record.topic.keywords += ' flex flex-grow espai flexible barra menú navbar';
    reset();
}
