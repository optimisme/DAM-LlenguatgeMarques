/* Native CSS animations, focused lessons and editable keyframes with matching source. */
function setupAnimationEditor() {
    const record = workspaceTopics.get('animations');
    const content = record.section.querySelector('.section-content');
    const effects = { aparicio: 'Aparició gradual', lliscament: 'Lliscament', pulsacio: 'Pulsació', rebot: 'Rebot', gir: 'Gir continu', sacsejada: 'Sacsejada' };
    const frame = (at, properties) => ({ at, properties });
    const makeFrames = effect => ({
        aparicio: [frame(0, { opacity: '0', transform: 'translateY(12px)' }), frame(50, { opacity: '0.5', transform: 'translateY(6px)' }), frame(100, { opacity: '1', transform: 'translateY(0)' })],
        lliscament: [frame(0, { transform: 'translateX(-50px)' }), frame(50, { transform: 'translateX(0)' }), frame(100, { transform: 'translateX(50px)' })],
        pulsacio: [frame(0, { transform: 'scale(0.85)' }), frame(50, { transform: 'scale(1.15)' }), frame(100, { transform: 'scale(0.85)' })],
        rebot: [frame(0, { transform: 'translateY(0)' }), frame(50, { transform: 'translateY(-45px)' }), frame(100, { transform: 'translateY(0)' })],
        gir: [frame(0, { transform: 'rotate(0deg)' }), frame(50, { transform: 'rotate(180deg)' }), frame(100, { transform: 'rotate(360deg)' })],
        sacsejada: [frame(0, { transform: 'translateX(0)' }), frame(25, { transform: 'translateX(-20px)' }), frame(50, { transform: 'translateX(20px)' }), frame(75, { transform: 'translateX(-12px)' }), frame(100, { transform: 'translateX(0)' })]
    })[effect];
    const number = (property, min, max, step) => ({ property, min, max, step });
    const select = (property, options) => ({ property, options });
    const preset = (label, properties) => ({ label, properties });
    const lessons = [
        { id: 'timing', title: 'Durada i ritme', keywords: 'animation-duration animation-timing-function velocitat corba ease linear', effect: 'lliscament', fields: [number('animation-duration', 0.1, 8, 0.1), select('animation-timing-function', ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'])], presets: [preset('Suau', {}), preset('Ràpida', { 'animation-duration': '0.6s', 'animation-timing-function': 'linear' }), preset('Lenta', { 'animation-duration': '4s', 'animation-timing-function': 'ease-in-out' })] },
        { id: 'repeat', title: 'Repetició i sentit', keywords: 'animation-iteration-count animation-direction infinite alternate reverse bucle sentit repetició', effect: 'lliscament', base: { 'animation-iteration-count': 'infinite' }, fields: [select('animation-iteration-count', ['1', '2', '3', 'infinite']), select('animation-direction', ['normal', 'reverse', 'alternate', 'alternate-reverse'])], presets: [preset('Bucle', {}), preset('Anada i tornada', { 'animation-direction': 'alternate' }), preset('Tres execucions', { 'animation-iteration-count': '3' })] },
        { id: 'delay', title: 'Retard', keywords: 'animation-delay espera retard negatiu', effect: 'lliscament', base: { 'animation-delay': '1s', 'animation-fill-mode': 'both' }, fields: [number('animation-delay', -3, 5, 0.5)], presets: [preset('Espera 1 s', {}), preset('Sense espera', { 'animation-delay': '0s' }), preset('Espera 2 s', { 'animation-delay': '2s' }), preset('Comença a mig camí', { 'animation-delay': '-1s' })] },
        { id: 'fill', title: 'Estat inicial i final', keywords: 'animation-fill-mode none forwards backwards both abans després estat final', effect: 'lliscament', base: { 'animation-delay': '1s', 'animation-fill-mode': 'none' }, fields: [select('animation-fill-mode', ['none', 'forwards', 'backwards', 'both']), number('animation-delay', -3, 5, 0.5)], presets: [preset('Retorna a l’estat base', {}), preset('Conserva el final', { 'animation-fill-mode': 'forwards' }), preset('Inici i final', { 'animation-fill-mode': 'both' })] },
        { id: 'frames', title: 'Fotogrames', keywords: '@keyframes fotogrames transform opacity background-color color opacitat percentatges', effect: 'pulsacio', editor: true, base: { 'animation-iteration-count': 'infinite', 'animation-fill-mode': 'both' }, fields: [], presets: [] }
    ];
    const tabs = workspaceElement('div', 'lesson-tabs animation-tabs');
    tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', 'Exemple a explorar'); content.replaceChildren(tabs);
    const runtimeStyles = document.createElement('style'); runtimeStyles.id = 'animation-example-keyframes'; document.head.append(runtimeStyles);
    const keyframesCss = (name, frames) => `@keyframes ${name} {\n${frames.map(point => `  ${point.at}% {\n${Object.entries(point.properties).map(([property, value]) => `    ${property}: ${value};`).join('\n')}\n  }`).join('\n')}\n}`;
    const baseStyle = effect => ({ display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-sizing': 'border-box', width: '80px', height: '80px', border: effect === 'gir' ? '4px solid #dce4ee' : '2px solid #216cbb', 'background-color': effect === 'gir' ? 'transparent' : '#348cec', color: effect === 'gir' ? '#17263c' : '#ffffff', 'font-family': 'sans-serif', 'font-size': '16px', 'font-weight': '700', ...(effect === 'gir' ? { 'border-top-color': '#348cec', 'border-radius': '50%' } : {}) });
    const declarations = properties => Object.entries(properties).map(([property, value]) => `  ${property}: ${value};`).join('\n');
    const groups = lessons.map((lesson, index) => {
        const tab = workspaceElement('button', '', lesson.title); tab.type = 'button'; tab.setAttribute('aria-pressed', String(index === 0)); tabs.append(tab);
        const layout = workspaceElement('div', 'lesson-layout'); layout.hidden = index !== 0;
        const row = config => {
            const id = `animation-${lesson.id}-${config.property}`;
            return `<div class="property-row animation-property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${config.property}" target="_blank" rel="noopener noreferrer">${config.property}:</a>${config.options ? `<select id="${id}" aria-label="${config.property}">${config.options.map(value => `<option>${value}</option>`).join('')}</select>` : `<input id="${id}" aria-label="${config.property}" type="number" required min="${config.min}" max="${config.max}" step="${config.step}"><span class="animation-unit">s</span>`}<p class="animation-validation" role="status" hidden>Valor no vàlid. Es manté l’últim valor vàlid.</p></div>`;
        };
        layout.innerHTML = `<div class="preview-pane"><span class="pane-label">Resultat en viu</span><div class="animation-playback" role="group" aria-label="Reproducció de l’animació"><button type="button" class="action-button primary-button" data-animation-action="play"><img src="images/icons/iconPlay.svg" alt="">Play</button><button type="button" class="action-button" data-animation-action="pause"><img src="images/icons/iconPause.svg" alt="">Pause</button><button type="button" class="action-button" data-animation-action="restart"><img src="images/icons/iconRestart.svg" alt="">Reinicia</button></div><div class="live-stage animation-stage"><div id="animation-${lesson.id}-demo" class="animation-demo">CSS</div></div><div class="animation-progress"><progress max="100" value="0" aria-label="Progrés de l’animació"></progress><output class="animation-phase" aria-live="off">Preparada · 0%</output></div></div>
            <div class="controls-pane"><h2 class="pane-label">Propietats</h2><div class="property-row animation-property-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name" target="_blank" rel="noopener noreferrer">animation-name:</a><select class="animation-effect" aria-label="animation-name">${Object.entries(effects).map(([value, text]) => `<option value="${value}">${text}</option>`).join('')}</select></div>
            ${lesson.presets.length ? `<div class="preset-panel animation-presets"><span class="pane-label">Prova un exemple</span><div class="preset-buttons">${lesson.presets.map((p, i) => `<button type="button" data-animation-preset="${i}">${p.label}</button>`).join('')}</div></div>` : ''}
            ${lesson.fields.map(row).join('')}
            ${lesson.id === 'fill' ? '<p class="field-help animation-fill-help">Amb Lliscament: blau = estat base, groc = inici, verd = final. Reinicia per observar el retard i el final.</p>' : ''}
            ${lesson.editor ? `<a class="property-link keyframes-reference" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" target="_blank" rel="noopener noreferrer">@keyframes:</a><div class="animation-frame-points" role="group" aria-label="Fotograma a editar"></div><p class="field-help">Selecciona un fotograma per veure’l en pausa i editar-ne els valors.</p><label class="editor-field">Propietat del fotograma<select class="animation-frame-property" aria-label="Propietat del fotograma"><option value="transform">transform</option><option value="opacity">opacity</option><option value="background-color">background-color</option></select></label><div class="property-row animation-property-row animation-frame-value"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform" target="_blank" rel="noopener noreferrer">transform:</a><input type="text" class="animation-frame-transform" aria-label="Transformació del fotograma" spellcheck="false" placeholder="translateX(20px), rotate(90deg), scale(1.2)…"><input type="number" class="animation-frame-opacity" aria-label="Opacitat del fotograma" required min="0" max="1" step="0.05" hidden><div class="animation-frame-color-host" hidden><input type="color" id="animation-frame-color" value="#348cec"></div><p class="animation-validation" role="status" hidden>Valor CSS no vàlid. Es manté l’últim valor vàlid.</p></div>` : ''}
            <div class="property-row animation-state-row"><a class="property-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state" target="_blank" rel="noopener noreferrer">animation-play-state:</a><span class="property-value animation-play-state">running;</span></div></div>`;
        content.append(layout);
        const controls = layout.querySelector('.controls-pane'), demo = layout.querySelector('.animation-demo'), effectField = layout.querySelector('.animation-effect');
        const fields = lesson.fields.map(config => ({ ...config, element: layout.querySelector(`[aria-label="${config.property}"]`) }));
        const progress = layout.querySelector('progress'), phase = layout.querySelector('.animation-phase');
        const frameProperty = layout.querySelector('.animation-frame-property'), pointButtons = layout.querySelector('.animation-frame-points');
        const transformInput = layout.querySelector('.animation-frame-transform'), opacityInput = layout.querySelector('.animation-frame-opacity'), colorInput = layout.querySelector('input[type="color"]');
        let state, tickId, currentAnimation;
        const runtimeName = `eina-animation-${lesson.id}`;
        const visible = () => !record.section.hidden && !layout.hidden;
        const updateStyles = () => {
            // One independently named rule per lesson avoids collisions between edited examples.
            runtimeStyles.textContent = lessons.map((entry, i) => i === index ? keyframesCss(runtimeName, state.frames) : record.groups?.[i]?.runtimeCss?.() || '').join('\n\n');
        };
        const nativeAnimation = () => {
            const animation = demo.getAnimations().find(animation => animation.animationName === runtimeName);
            if (animation) currentAnimation = animation;
            return currentAnimation;
        };
        const updateProgress = () => {
            const animation = nativeAnimation();
            const time = Number(animation?.currentTime || 0), delay = parseFloat(state.properties['animation-delay']) * 1000;
            state.time = time;
            const timing = animation?.effect.getComputedTiming();
            const iterations = state.properties['animation-iteration-count'];
            const skipped = !animation && iterations !== 'infinite' && delay + parseFloat(state.properties['animation-duration']) * 1000 * Number(iterations) <= 0;
            const ended = animation?.playState === 'finished' || skipped;
            const amount = Math.round(Math.max(0, Math.min(1, ended ? 1 : timing?.progress || 0)) * 100);
            progress.value = amount;
            const label = state.playState === 'paused' ? 'Pausa' : time < delay ? 'Espera' : ended ? 'Finalitzada' : 'En curs';
            phase.value = `${label} · ${amount}%`; phase.dataset.phase = label;
            layout.querySelector('[data-animation-action="pause"]').disabled = state.playState === 'paused' || ended;
            layout.querySelector('[data-animation-action="play"]').disabled = state.playState === 'running' && !ended;
            return ended;
        };
        const stopTicker = () => { cancelAnimationFrame(tickId); tickId = undefined; };
        const startTicker = () => {
            stopTicker();
            if (!visible()) return;
            const tick = () => {
                if (!visible()) { stopTicker(); return; }
                const ended = updateProgress();
                if (!ended && state.playState === 'running') tickId = requestAnimationFrame(tick);
            };
            tick();
        };
        const refreshCode = () => { if (workspaceReady) { improveControls(layout); updateWorkspaceCode(); } };
        const syncFrame = () => {
            if (!lesson.editor) return;
            const selected = state.frames[state.selectedFrame];
            const property = frameProperty.value;
            pointButtons.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === state.selectedFrame)));
            const row = layout.querySelector('.animation-frame-value');
            row.querySelector('.property-link').textContent = property + ':'; row.querySelector('.property-link').href = `https://developer.mozilla.org/en-US/docs/Web/CSS/${property}`;
            transformInput.hidden = property !== 'transform'; opacityInput.hidden = property !== 'opacity'; layout.querySelector('.animation-frame-color-host').hidden = property !== 'background-color';
            transformInput.value = selected.properties.transform || 'none'; opacityInput.value = selected.properties.opacity ?? '1';
            const color = parseCssColor(selected.properties['background-color'] || (state.effect === 'gir' ? 'transparent' : '#348cec'));
            colorInput.value = color.hex; colorInput.dataset.colorAlpha = String(color.alpha); colorInput.dispatchEvent(new Event('input', { bubbles: true }));
            transformInput.setAttribute('aria-invalid', 'false'); opacityInput.setAttribute('aria-invalid', 'false'); row.querySelector('.animation-validation').hidden = true;
        };
        let syncingFrame = false;
        const sync = () => {
            effectField.value = state.effect;
            fields.forEach(config => { config.element.value = config.options ? state.properties[config.property] : parseFloat(state.properties[config.property]); config.element.setAttribute('aria-invalid', 'false'); config.element.closest('.property-row').querySelector('.animation-validation').hidden = true; });
            if (lesson.editor) {
                pointButtons.replaceChildren(...state.frames.map((point, i) => {
                    const button = workspaceElement('button', '', `${point.at}%`); button.type = 'button';
                    button.addEventListener('click', () => { state.selectedFrame = i; syncingFrame = true; syncFrame(); syncingFrame = false; inspectFrame(); refreshCode(); });
                    return button;
                }));
                syncingFrame = true; syncFrame(); syncingFrame = false;
            }
        };
        const setPlayState = value => {
            state.playState = value; demo.style.animationPlayState = value;
            layout.querySelector('.animation-play-state').textContent = value + ';';
            startTicker(); refreshCode();
        };
        const render = () => {
            currentAnimation = undefined;
            state.time = 0;
            updateStyles();
            demo.style.animationName = 'none'; void demo.offsetWidth;
            demo.style.cssText = '';
            Object.entries(baseStyle(state.effect)).forEach(([property, value]) => demo.style.setProperty(property, value));
            Object.entries(state.properties).forEach(([property, value]) => demo.style.setProperty(property, value));
            demo.style.animationName = runtimeName; demo.style.animationPlayState = state.playState;
            layout.querySelector('.animation-play-state').textContent = state.playState + ';';
            const help = layout.querySelector('.animation-fill-help'); if (help) help.hidden = state.effect !== 'lliscament';
            startTicker(); refreshCode();
        };
        const inspectFrame = () => {
            setPlayState('paused');
            const animation = nativeAnimation();
            if (animation) animation.currentTime = parseFloat(state.properties['animation-delay']) * 1000 + parseFloat(state.properties['animation-duration']) * 1000 * Math.min(state.frames[state.selectedFrame].at / 100, 0.999999);
            updateProgress();
        };
        const clearPreset = () => controls.querySelectorAll('[data-animation-preset]').forEach(button => button.setAttribute('aria-pressed', 'false'));
        const reset = (effect = lesson.effect, extra = {}) => {
            state = { effect, frames: makeFrames(effect), selectedFrame: 0, playState: 'running', properties: { 'animation-duration': '2s', 'animation-delay': '0s', 'animation-timing-function': 'ease', 'animation-iteration-count': '1', 'animation-direction': 'normal', 'animation-fill-mode': 'forwards', ...lesson.base, ...extra } };
            if (effect === 'gir' && lesson.id === 'timing') Object.assign(state.properties, { 'animation-iteration-count': 'infinite', 'animation-timing-function': 'linear' });
            if (lesson.id === 'fill' && effect === 'lliscament') { state.frames[0].properties['background-color'] = '#f59e0b'; state.frames[1].properties['background-color'] = '#eab308'; state.frames.at(-1).properties['background-color'] = '#22c55e'; }
            sync(); render();
        };
        effectField.addEventListener('change', () => { clearPreset(); reset(effectField.value); });
        fields.forEach(config => config.element.addEventListener(config.options ? 'change' : 'input', () => {
            const input = config.element, valid = input.value !== '' && (config.options || input.validity.valid);
            input.setAttribute('aria-invalid', String(!valid)); input.closest('.property-row').querySelector('.animation-validation').hidden = valid;
            if (!valid) return;
            state.properties[config.property] = config.options ? input.value : `${input.value}s`; state.playState = 'running'; clearPreset(); render();
        }));
        controls.querySelectorAll('[data-animation-preset]').forEach(button => button.addEventListener('click', () => {
            const p = lesson.presets[Number(button.dataset.animationPreset)]; reset(state.effect, p.properties);
            controls.querySelectorAll('[data-animation-preset]').forEach(entry => entry.setAttribute('aria-pressed', String(entry === button)));
        }));
        layout.querySelector('[data-animation-action="play"]').addEventListener('click', () => { if (nativeAnimation()?.playState === 'finished' || phase.dataset.phase === 'Finalitzada') { state.playState = 'running'; render(); } else setPlayState('running'); });
        layout.querySelector('[data-animation-action="pause"]').addEventListener('click', () => setPlayState('paused'));
        layout.querySelector('[data-animation-action="restart"]').addEventListener('click', () => { state.playState = 'running'; render(); });
        if (lesson.editor) {
            frameProperty.addEventListener('change', () => { syncingFrame = true; syncFrame(); syncingFrame = false; refreshCode(); });
            const publish = (property, value, valid) => {
                const row = layout.querySelector('.animation-frame-value'); row.querySelector('.animation-validation').hidden = valid;
                if (!valid) return;
                state.frames[state.selectedFrame].properties[property] = value; render(); inspectFrame(); refreshCode();
            };
            transformInput.addEventListener('input', () => { const valid = CSS.supports('transform', transformInput.value.trim()); transformInput.setAttribute('aria-invalid', String(!valid)); publish('transform', transformInput.value.trim(), valid); });
            opacityInput.addEventListener('input', () => { const valid = opacityInput.value !== '' && opacityInput.validity.valid; opacityInput.setAttribute('aria-invalid', String(!valid)); publish('opacity', opacityInput.value, valid); });
            addColorTransparency(colorInput, 'Color del fotograma');
            colorInput.addEventListener('input', () => { if (!syncingFrame && state) publish('background-color', colorPickerValue(colorInput), true); });
        }
        tab.addEventListener('click', () => selectLessonGroup(record, index));
        reset();
        return { lesson, button: tab, layout, controls, preview: layout.querySelector('.animation-stage'), pane: layout.querySelector('.preview-pane'), reset: () => { clearPreset(); reset(); }, activate: () => {
            if (state.playState === 'paused') {
                if (lesson.editor) inspectFrame();
                else { const animation = nativeAnimation(); if (animation) animation.currentTime = state.time || 0; updateProgress(); }
            } else startTicker();
        }, stopTicker, getState: () => state, runtimeCss: () => keyframesCss(runtimeName, state.frames) };
    });
    record.groups = groups; record.groupIndex = 0;
    runtimeStyles.textContent = groups.map(group => group.runtimeCss()).join('\n\n');
    record.onDeactivate = () => groups.forEach(group => group.stopTicker());
    record.onActivate = () => { record.onDeactivate(); groups[record.groupIndex].activate(); };
    record.reset = () => groups[record.groupIndex].reset();
    record.topic.keywords += ' ' + lessons.map(lesson => lesson.keywords).join(' ');
    record.findGroupForQuery = query => {
        const words = normaliseSearch(query).split(/\s+/).filter(word => !['animations', 'animacions'].includes(word));
        return lessons.findIndex(lesson => words.every(word => normaliseSearch(`${lesson.title} ${lesson.keywords}`).includes(word)));
    };
    record.getSource = () => {
        const state = groups[record.groupIndex].getState();
        return {
            html: '<div class="escena">\n  <div class="exemple">CSS</div>\n</div>',
            css: `.escena {\n${declarations({ display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-sizing': 'border-box', height: '220px', padding: '14px', overflow: 'hidden', border: '1px solid #bfc6ce', background: '#ffffff' })}\n}\n\n.exemple {\n${declarations({ ...baseStyle(state.effect), 'animation-name': state.effect, ...state.properties, 'animation-play-state': 'running' })}\n}\n\n${keyframesCss(state.effect, state.frames)}`
        };
    };
}
