/* Native positioning examples and a complete, separately copyable HTML/CSS source. */
function setupPositionEditor() {
    const record = workspaceTopics.get('position');
    const content = record.section.querySelector('.section-content');
    const modes = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
    const presets = {
        static: { position: 'static', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto', 'z-index': 'auto' },
        relative: { position: 'relative', top: '20px', right: 'auto', bottom: 'auto', left: '20px', 'z-index': '2' },
        absolute: { position: 'absolute', top: '80px', right: 'auto', bottom: 'auto', left: '30px', 'z-index': '2' },
        fixed: { position: 'fixed', top: 'auto', right: '20px', bottom: '72px', left: 'auto', 'z-index': '2' },
        sticky: { position: 'sticky', top: '12px', right: 'auto', bottom: 'auto', left: 'auto', 'z-index': '2' },
        overlap: { position: 'absolute', top: '80px', right: 'auto', bottom: 'auto', left: '30px', 'z-index': '2' }
    };
    let state = { ...presets.relative };
    let overlap = false;
    const row = property => `<div class="property-row position-property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${property}" target="_blank" rel="noopener noreferrer">${property}:</a><input id="position-${property}" type="text" data-position-property="${property}" aria-label="${property}" spellcheck="false"><p class="position-validation" role="status" hidden>Valor CSS no vàlid. Es manté l’últim valor vàlid.</p></div>`;
    content.innerHTML = `<div class="lesson-layout">
        <div class="preview-pane">
            <div class="preview-heading"><span class="pane-label">Resultat en viu</span><button type="button" id="position-scroll-reset" class="action-button" hidden>Scroll a l’inici</button></div>
            <div class="live-stage position-frame" id="position-frame" role="region" tabindex="0" aria-label="Contenidor de l’exemple de posicionament">
                <div class="position-flow" id="position-flow">
                    <div class="position-block position-before">Abans</div>
                    <div class="position-target" id="position-demo">Element</div>
                    <div class="position-block position-after">Després</div>
                    <div class="position-spacer" hidden>Continua fent scroll</div>
                </div>
                <div class="position-other" hidden>Altra capa<br>z-index: 1</div>
            </div>
        </div>
        <div class="controls-pane"><h2 class="pane-label">Propietats</h2>
            <div class="preset-panel position-presets"><span class="pane-label">Prova un exemple</span><div class="preset-buttons">${modes.map(mode => `<button type="button" data-position-preset="${mode}">${mode}</button>`).join('')}<button type="button" data-position-preset="overlap">Superposició</button></div></div>
            <div class="property-row position-property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/position" target="_blank" rel="noopener noreferrer">position:</a><select id="position-mode" aria-label="position">${modes.map(mode => `<option value="${mode}">${mode}</option>`).join('')}</select></div>
            ${['top', 'right', 'bottom', 'left', 'z-index'].map(row).join('')}
            <p class="field-help position-layer-help" hidden>La capa verda té z-index: 1. Prova 0 i 2 a l’element blau per comparar quin queda al davant. Els dos elements comparteixen el mateix context d’apilament.</p>
        </div></div>`;
    const frame = document.getElementById('position-frame');
    const flow = document.getElementById('position-flow');
    const demo = document.getElementById('position-demo');
    const fields = [...content.querySelectorAll('[data-position-property]')];
    const modeField = document.getElementById('position-mode');
    const scrollReset = document.getElementById('position-scroll-reset');
    record.groups = [{ preview: frame, controls: content.querySelector('.controls-pane'), layout: content.querySelector('.lesson-layout'), pane: content.querySelector('.preview-pane') }];
    record.groupIndex = 0;
    function render() {
        demo.style.cssText = '';
        Object.entries(state).forEach(([property, value]) => demo.style.setProperty(property, value));
        demo.textContent = state.position === 'fixed' ? 'fixed · finestra' : 'Element';
        frame.classList.toggle('position-frame--sticky', state.position === 'sticky');
        flow.querySelector('.position-after').textContent = state.position === 'sticky' ? 'Fes scroll vertical' : 'Després';
        flow.querySelector('.position-spacer').hidden = state.position !== 'sticky';
        scrollReset.hidden = state.position !== 'sticky';
        frame.querySelector('.position-other').hidden = !overlap;
        content.querySelector('.position-layer-help').hidden = !overlap;
        fields.forEach(field => {
            field.disabled = state.position === 'static';
            if (field.disabled) {
                field.setAttribute('aria-invalid', 'false');
                field.closest('.property-row').querySelector('.position-validation').hidden = true;
            }
        });
        if (workspaceReady) {
            improveControls(record.section);
            updateWorkspaceCode();
        }
    }
    function applyPreset(name) {
        state = { ...presets[name] };
        overlap = name === 'overlap';
        fields.forEach(field => {
            field.value = state[field.dataset.positionProperty];
            field.setAttribute('aria-invalid', 'false');
            field.closest('.property-row').querySelector('.position-validation').hidden = true;
        });
        modeField.value = state.position;
        frame.scrollTop = 0;
        frame.scrollLeft = 0;
        content.querySelectorAll('[data-position-preset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.positionPreset === name)));
        render();
    }
    fields.forEach(field => field.addEventListener('input', () => {
        const property = field.dataset.positionProperty;
        const value = field.value.trim();
        const valid = value !== '' && CSS.supports(property, value);
        field.setAttribute('aria-invalid', String(!valid));
        field.closest('.property-row').querySelector('.position-validation').hidden = valid;
        if (!valid) return;
        state[property] = value;
        content.querySelectorAll('[data-position-preset]').forEach(button => button.setAttribute('aria-pressed', 'false'));
        render();
    }));
    modeField.addEventListener('change', () => applyPreset(modeField.value));
    content.querySelectorAll('[data-position-preset]').forEach(button => button.addEventListener('click', () => applyPreset(button.dataset.positionPreset)));
    scrollReset.addEventListener('click', () => frame.scrollTo({ top: 0, left: 0, behavior: 'smooth' }));
    const rule = (selector, properties) => `${selector} {\n${Object.entries(properties).map(([property, value]) => `  ${property}: ${value};`).join('\n')}\n}`;
    record.getSource = () => {
        const sticky = state.position === 'sticky';
        const html = `<div class="contenidor">\n  <div class="flux">\n    <div class="bloc abans">Abans</div>\n    <div class="exemple">${state.position === 'fixed' ? 'fixed · finestra' : 'Element'}</div>\n    <div class="bloc despres">${sticky ? 'Fes scroll vertical' : 'Després'}</div>${sticky ? '\n    <div class="espai-scroll">Continua fent scroll</div>' : ''}\n  </div>${overlap ? '\n  <div class="altra-capa">Altra capa<br>z-index: 1</div>' : ''}\n</div>`;
        const properties = state.position === 'static' ? { position: 'static' } : state;
        const rules = [
            rule('.contenidor', { position: 'relative', isolation: 'isolate', 'box-sizing': 'border-box', height: '300px', overflow: 'auto', padding: '14px', border: '1px solid #bfc6ce', background: '#ffffff' }),
            rule('.flux', { 'min-height': sticky ? '640px' : '0' }),
            rule('.bloc', { display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-sizing': 'border-box', height: '56px', padding: '12px', background: '#edf0f4', color: '#5e6f86', 'font-family': 'sans-serif', 'font-size': '13px' }),
            rule('.exemple', { ...properties, display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-sizing': 'border-box', width: '100px', height: '64px', padding: '8px', background: '#dbeafe', border: '2px solid #348cec', color: '#17263c', 'font-family': 'sans-serif', 'font-size': '13px', 'font-weight': '600', 'text-align': 'center' })
        ];
        if (sticky) {
            rules.push(rule('.abans', { height: '100px' }));
            rules.push(rule('.espai-scroll', { display: 'flex', 'align-items': 'flex-end', 'justify-content': 'center', 'box-sizing': 'border-box', height: '420px', padding: '20px', color: '#5e6f86', background: 'linear-gradient(#fff, #edf0f4)', 'font-family': 'sans-serif', 'font-size': '13px' }));
        }
        if (overlap) rules.push(rule('.altra-capa', { position: 'absolute', top: '110px', left: '65px', 'z-index': '1', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-sizing': 'border-box', width: '110px', height: '76px', padding: '8px', border: '2px solid #3c9f7e', background: '#d1fae5', color: '#17263c', 'text-align': 'center', 'font-family': 'sans-serif', 'font-size': '12px' }));
        return { html, css: rules.join('\n\n') };
    };
    record.reset = () => applyPreset('relative');
    applyPreset('relative');
}
