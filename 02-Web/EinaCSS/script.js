// Initialize the topic workspace and its interactive examples.
document.addEventListener('DOMContentLoaded', async () => {
    setupWorkspace();

    // Handle property button clicks
    setupPropertyButtons();
    setupFlexButtons();
    setupBoxEditors();
    setupOverflowButtons();
    setupShadowControls();
    setupBackgroundControls();
    setupOpacityControls();
    setupTransformControls();
    setupTransitionControls();
    setupFilterControls();
    setupCursorControls();
    setupTypographyControls();
    setupParagraphControls();
    setupParagraphColumnsControls();
    setupGridEditor();
    setupPositionEditor();
    setupAnimationEditor();
    setupFlexSpacerExample();
    try {
        await setupExamplesEditor();
    } catch (error) {
        ['examples', 'forms', 'interactivity', 'responsive'].forEach(id => {
            const record = workspaceTopics.get(id);
            record.section.querySelector('.section-content').innerHTML = '<div class="lesson-layout"><div class="preview-pane"><p role="status">No s’han pogut carregar els exemples. Recarrega l’eina per tornar-ho a provar.</p></div><div class="controls-pane"></div></div>';
            const layout = record.section.querySelector('.lesson-layout');
            record.groups = [{ layout, controls: layout.querySelector('.controls-pane'), preview: layout.querySelector('.preview-pane'), pane: layout.querySelector('.preview-pane') }];
            record.groupIndex = 0;
            record.getSource = () => ({ html: '', css: '' }); record.reset = () => {};
        });
        console.error(error);
    }
    finishWorkspace();
});

function createRemoveButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'property-btn remove-button';
    button.title = 'Remove';
    button.innerHTML = '<img src="images/icons/iconDelete.svg" alt="" aria-hidden="true"><span class="button-label">Remove</span>';
    return button;
}

function setupPropertyButtons() {
    const propertyButtons = document.querySelectorAll('.property-btn');

    propertyButtons.forEach(button => {
        // Skip shadow set button - it has its own toggle handler
        if (button.classList.contains('bs-set-btn')) {
            return;
        }

        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent details from toggling

            // Remove 'selected' class from all buttons in the same property row
            const parentRow = button.closest('.property-row');
            if (parentRow) {
                parentRow.querySelectorAll('.property-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
            }

            // Add 'selected' class to clicked button
            button.classList.add('selected');
        });
    });
}

// Flex button handlers
let currentFlexDirection = 'row';
let currentFlexSettings = {
    direction: 'row',
    alignItems: 'initial',
    justifyContent: 'initial',
    flexWrap: 'initial',
    alignContent: 'initial'
};

function setupFlexButtons() {
    // Handle display property buttons
    const displayButtons = document.querySelectorAll('.display-btn');
    displayButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const displayValue = btn.dataset.display;

            // Remove selected from siblings
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('display-value').textContent = displayValue + ';';

            // Show display example
            showDisplayExample(displayValue);
        });
    });

    // Flex direction buttons
    const directionButtons = document.querySelectorAll('.flex-direction-btn');
    directionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const direction = btn.dataset.direction;
            currentFlexDirection = direction === 'initial' ? 'row' : direction;
            currentFlexSettings.direction = direction;

            // Remove selected from siblings
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('flex-direction-value').textContent = direction + ';';

            // Update icons based on direction
            updateFlexIcons(currentFlexDirection);

            // Show example for this property
            showFlexDirectionExample(direction);
            showAlignItemsExample(document.querySelector('.align-items-btn.selected').dataset.align);
            showFlexWrapExample(document.querySelector('.flex-wrap-btn.selected').dataset.wrap);
            showAlignContentExample(document.querySelector('.align-content-btn.selected').dataset.alignContent);
            return false;
        });
    });

    // Align items buttons
    const alignItemsButtons = document.querySelectorAll('.align-items-btn');
    alignItemsButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFlexSettings.alignItems = btn.dataset.align;
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('align-items-value').textContent = btn.dataset.align + ';';

            showAlignItemsExample(btn.dataset.align);
        });
    });

    // Justify content row buttons
    const justifyRowButtons = document.querySelectorAll('.justify-content-row-btn');
    justifyRowButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFlexSettings.justifyContent = btn.dataset.justify;
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('justify-content-row-value').textContent = btn.dataset.justify + ';';

            showJustifyContentRowExample(btn.dataset.justify);
        });
    });

    // Justify content column buttons
    const justifyColumnButtons = document.querySelectorAll('.justify-content-column-btn');
    justifyColumnButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFlexSettings.justifyContent = btn.dataset.justify;
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('justify-content-column-value').textContent = btn.dataset.justify + ';';

            showJustifyContentColumnExample(btn.dataset.justify);
        });
    });

    // Flex wrap buttons
    const wrapButtons = document.querySelectorAll('.flex-wrap-btn');
    wrapButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFlexSettings.flexWrap = btn.dataset.wrap;
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('flex-wrap-value').textContent = btn.dataset.wrap + ';';

            showFlexWrapExample(btn.dataset.wrap);
        });
    });

    // Align content buttons
    const alignContentButtons = document.querySelectorAll('.align-content-btn');
    alignContentButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFlexSettings.alignContent = btn.dataset.alignContent;
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('align-content-value').textContent = btn.dataset.alignContent + ';';

            showAlignContentExample(btn.dataset.alignContent);
        });
    });
}

// Helper function to create mini example boxes
function createMiniExample(description = '') {
    return `
        ${description ? `<div class="mini-description">${description}</div>` : ''}
        <div class="mini-outer">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
        </div>
    `;
}

// Show display example
function showDisplayExample(displayValue) {
    const container = document.getElementById('display-example');

    const descriptions = {
        'initial': 'Valor inicial de CSS: inline',
        'block': 'Cada element ocupa tota l’amplada i comença en una línia nova.',
        'inline': 'Els elements flueixen amb el text; width i height no defineixen la seva mida.',
        'inline-block': 'Els elements flueixen en línia i admeten width i height.',
        'flex': 'El contenidor distribueix els fills amb Flexbox.',
        'contents': 'La caixa del contenidor desapareix i els fills es mantenen.',
        'none': 'Els elements A i C desapareixen i deixen d’ocupar espai.'
    };

    // Special handling for display: none
    if (displayValue === 'none') {
        container.innerHTML = `
            <div class="mini-outer" style="display: flex;">
                <div class="mini-item item-1" style="display: none;">A</div>
                <div class="mini-item item-2" style="display: block;">B</div>
                <div class="mini-item item-3" style="display: none;">C</div>
            </div>
            <div class="mini-description">${descriptions[displayValue]}</div>
        `;
        return;
    }

    // Create the HTML structure
    container.innerHTML = `
        <div class="mini-outer">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
        </div>
        <div class="mini-description">${descriptions[displayValue]}</div>
    `;

    const outer = container.querySelector('.mini-outer');
    const items = container.querySelectorAll('.mini-item');

    // Reset styles first
    outer.style.display = '';
    items.forEach(item => {
        item.style.display = '';
    });

    // Apply specific display styles
    if (displayValue === 'initial') {
        items.forEach(item => { item.style.display = 'initial'; });
    } else if (displayValue === 'block') {
        // For block, set items to display: block
        items.forEach(item => {
            item.style.display = 'block';
        });
    } else if (displayValue === 'inline') {
        // For inline, set items to display: inline
        items.forEach(item => {
            item.style.display = 'inline';
        });
    } else if (displayValue === 'inline-block') {
        // For inline-block, set items to display: inline-block
        items.forEach(item => {
            item.style.display = 'inline-block';
        });
    } else if (displayValue === 'flex') {
        // For flex, set the outer container to display: flex
        outer.style.display = 'flex';
    } else if (displayValue === 'contents') {
        // For contents, set the outer container to display: contents
        outer.style.display = 'contents';
    }
}

// Show flex-direction example
function showFlexDirectionExample(direction) {
    const container = document.getElementById('flex-direction-example');

    const descriptions = {
        'initial': 'Valor inicial: row.',
        'row': 'Els elements es distribueixen d’esquerra a dreta.',
        'column': 'Els elements es distribueixen de dalt a baix.',
        'row-reverse': 'Els elements es distribueixen de dreta a esquerra.',
        'column-reverse': 'Els elements es distribueixen de baix a dalt.'
    };

    const actualDirection = direction === 'initial' ? 'row' : direction;

    // Create a unique example for each direction
    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${actualDirection};">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
        </div>
        <div class="mini-description">${descriptions[direction]}</div>
    `;
}

// Show align-items example
function showAlignItemsExample(align) {
    const container = document.getElementById('align-items-example');

    const descriptions = {
        'initial': 'Valor inicial: normal (estira els elements en Flexbox)',
        'start': 'Els elements s’alineen a l’inici de l’eix transversal.',
        'center': 'Els elements se centren a l’eix transversal.',
        'end': 'Els elements s’alineen al final de l’eix transversal.',
        'stretch': 'Els elements s’estiren per omplir l’eix transversal.',
        'baseline': 'Els elements s’alineen per la línia base del text.'
    };

    const actualAlign = align;

    // Create items with varying heights for better visualization
    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${currentFlexDirection}; align-items: ${actualAlign}; min-height: 80px;">
            <div class="mini-item item-1" style="padding: 4px 8px;">1</div>
            <div class="mini-item item-2" style="padding: 8px;">2</div>
            <div class="mini-item item-3" style="padding: 12px 8px;">3</div>
        </div>
        <div class="mini-description">${descriptions[align]}</div>
    `;
}

// Show justify-content row example
function showJustifyContentRowExample(justify) {
    const containerRow = document.getElementById('justify-content-example-row');

    const descriptions = {
        'initial': 'Valor inicial: normal; en aquest exemple, alineació a l’inici.',
        'start': 'Els elements s’agrupen a l’inici de l’eix principal.',
        'center': 'Els elements se centren a l’eix principal.',
        'end': 'Els elements s’agrupen al final de l’eix principal.',
        'space-between': 'L’espai es reparteix entre elements, sense espai als extrems.',
        'space-around': 'Cada element té el mateix espai al voltant.',
        'space-evenly': 'L’espai entre elements i als extrems és igual.'
    };

    const actualJustify = justify === 'initial' ? 'start' : justify;

    containerRow.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: row; justify-content: ${actualJustify};">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
        </div>
        <div class="mini-description">Horizontal (row): ${descriptions[justify]}</div>
    `;
}

// Show justify-content column example
function showJustifyContentColumnExample(justify) {
    const containerColumn = document.getElementById('justify-content-example-column');

    const descriptions = {
        'initial': 'Valor inicial: normal; en aquest exemple, alineació a l’inici.',
        'start': 'Els elements s’agrupen a l’inici de l’eix principal.',
        'center': 'Els elements se centren a l’eix principal.',
        'end': 'Els elements s’agrupen al final de l’eix principal.',
        'space-between': 'L’espai es reparteix entre elements, sense espai als extrems.',
        'space-around': 'Cada element té el mateix espai al voltant.',
        'space-evenly': 'L’espai entre elements i als extrems és igual.'
    };

    const actualJustify = justify === 'initial' ? 'start' : justify;

    containerColumn.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: column; justify-content: ${actualJustify}; height: 195px;">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
        </div>
        <div class="mini-description">Vertical (column): ${descriptions[justify]}</div>
    `;
}

// Show flex-wrap example
function showFlexWrapExample(wrap) {
    const container = document.getElementById('flex-wrap-example');

    const descriptions = {
        'initial': 'Valor inicial: nowrap.',
        'nowrap': 'Els elements es mantenen en una línia i poden desbordar.',
        'wrap': 'Els elements salten de línia quan falta espai.',
        'wrap-reverse': 'Els elements salten de línia en sentit invers.'
    };

    const actualWrap = wrap === 'initial' ? 'nowrap' : wrap;
    const isColumn = currentFlexDirection.includes('column');
    const sizeStyle = isColumn ? 'height: 100px;' : 'width: 150px;';

    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${currentFlexDirection}; flex-wrap: ${actualWrap}; ${sizeStyle}">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
            <div class="mini-item item-4">D</div>
            <div class="mini-item item-5">E</div>
            <div class="mini-item item-6">F</div>
        </div>
        <div class="mini-description">${descriptions[wrap]}</div>
    `;
}

// Show align-content example
function showAlignContentExample(alignContent) {
    const container = document.getElementById('align-content-example');

    const descriptions = {
        'initial': 'Valor inicial: normal (estira les línies en Flexbox)',
        'start': 'Les línies s’agrupen a l’inici del contenidor.',
        'center': 'Les línies se centren al contenidor.',
        'end': 'Les línies s’agrupen al final del contenidor.',
        'stretch': 'Les línies s’estiren per ocupar el contenidor.',
        'space-between': 'L’espai es reparteix entre línies, sense espai als extrems.',
        'space-around': 'Cada línia té el mateix espai al voltant.'
    };

    const actualAlignContent = alignContent;
    const isColumn = currentFlexDirection.includes('column');
    const sizeStyle = isColumn ? 'height: 100px; width: 100%;' : 'width: 150px; min-height: 100px;';

    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${currentFlexDirection}; flex-wrap: wrap; align-content: ${actualAlignContent}; ${sizeStyle}">
            <div class="mini-item item-1">A</div>
            <div class="mini-item item-2">B</div>
            <div class="mini-item item-3">C</div>
            <div class="mini-item item-4">D</div>
            <div class="mini-item item-5">E</div>
            <div class="mini-item item-6">F</div>
        </div>
        <div class="mini-description">${descriptions[alignContent]}</div>
    `;
}

function updateFlexIcons(direction) {
    const isColumn = direction.includes('column');
    const prefix = isColumn ? 'Column' : 'Row';

    // Update align-items icons
    const alignButtons = document.querySelectorAll('.align-items-btn');
    alignButtons.forEach(btn => {
        const alignType = btn.dataset.align;
        if (alignType !== 'initial') {
            const icon = btn.querySelector('.align-icon');
            const capitalizedType = alignType.charAt(0).toUpperCase() + alignType.slice(1);
            icon.src = `images/icons/align${prefix}${capitalizedType}.svg`;
        }
    });

    // Update justify-content icons
    const justifyButtons = document.querySelectorAll('.justify-content-btn');
    justifyButtons.forEach(btn => {
        const justifyType = btn.dataset.justify;
        if (justifyType !== 'initial') {
            const icon = btn.querySelector('.justify-icon');
            // Handle special naming: space-between -> Between, space-around -> Around
            let iconName;
            if (justifyType === 'space-between') {
                iconName = 'Between';
            } else if (justifyType === 'space-around') {
                iconName = 'Around';
            } else if (justifyType === 'space-evenly') {
                iconName = 'Evenly';
            } else {
                iconName = justifyType.charAt(0).toUpperCase() + justifyType.slice(1);
            }
            icon.src = `images/icons/justify${prefix}${iconName}.svg`;
        }
    });

    // Update flex-wrap icons
    const wrapButtons = document.querySelectorAll('.flex-wrap-btn');
    wrapButtons.forEach(btn => {
        const wrapType = btn.dataset.wrap;
        if (wrapType !== 'initial') {
            const icon = btn.querySelector('.wrap-icon');
            if (icon) {
                // Handle naming: nowrap -> Nowrap, wrap -> Wrap, wrap-reverse -> WrapReverse
                let iconName;
                if (wrapType === 'nowrap') {
                    iconName = 'Nowrap';
                } else if (wrapType === 'wrap') {
                    iconName = 'Wrap';
                } else if (wrapType === 'wrap-reverse') {
                    iconName = 'WrapReverse';
                }
                icon.src = `images/icons/wrap${prefix}${iconName}.svg`;
            }
        }
    });

    // Update align-content icons
    const alignContentButtons = document.querySelectorAll('.align-content-btn');
    alignContentButtons.forEach(btn => {
        const alignContentType = btn.dataset.alignContent;
        if (alignContentType !== 'initial') {
            const icon = btn.querySelector('.align-content-icon');
            // Handle special naming: space-between -> Between, space-around -> Around
            let iconName;
            if (alignContentType === 'space-between') {
                iconName = 'Between';
            } else if (alignContentType === 'space-around') {
                iconName = 'Around';
            } else if (alignContentType === 'stretch') {
                iconName = 'Stretch';
            } else {
                iconName = alignContentType.charAt(0).toUpperCase() + alignContentType.slice(1);
            }
            icon.src = `images/icons/content${prefix}${iconName}.svg`;
        }
    });
}

// Box Model input handlers
function setupBoxModelInputs() {
    // Get all input elements
    const inputs = [
        'margin-input', 'margin-top-input', 'margin-right-input', 'margin-bottom-input', 'margin-left-input',
        'padding-input', 'padding-top-input', 'padding-right-input', 'padding-bottom-input', 'padding-left-input',
        'border-input', 'border-top-input', 'border-right-input', 'border-bottom-input', 'border-left-input',
        'border-radius-input', 'border-top-left-radius-input', 'border-top-right-radius-input',
        'border-bottom-right-radius-input', 'border-bottom-left-radius-input'
    ].map(id => document.getElementById(id));

    const updateBoxModel = () => {
        showBoxModel();
    };

    // Add event listeners to all inputs
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', updateBoxModel);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    updateBoxModel();
                    input.blur();
                }
            });
            input.addEventListener('blur', updateBoxModel);
        }
    });

    // Initialize the visualization on page load
    showBoxModel();
}

function showBoxModel() {
    // Parse pixel values
    function parsePx(value) {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    }

    // Parse 4-value shorthand (like margin, padding, border-width)
    function parseShorthand(all, top, right, bottom, left) {
        let finalTop, finalRight, finalBottom, finalLeft;

        if (all) {
            const parts = all.split(/\s+/);
            if (parts.length === 1) {
                finalTop = finalRight = finalBottom = finalLeft = parts[0];
            } else if (parts.length === 2) {
                finalTop = finalBottom = parts[0];
                finalRight = finalLeft = parts[1];
            } else if (parts.length === 3) {
                finalTop = parts[0];
                finalRight = finalLeft = parts[1];
                finalBottom = parts[2];
            } else {
                finalTop = parts[0];
                finalRight = parts[1];
                finalBottom = parts[2];
                finalLeft = parts[3];
            }
        } else {
            finalTop = finalRight = finalBottom = finalLeft = '0';
        }

        // Override with individual properties
        if (top) finalTop = top;
        if (right) finalRight = right;
        if (bottom) finalBottom = bottom;
        if (left) finalLeft = left;

        return { top: finalTop, right: finalRight, bottom: finalBottom, left: finalLeft };
    }

    // Get margin values
    const marginVals = parseShorthand(
        document.getElementById('margin-input').value.trim(),
        document.getElementById('margin-top-input').value.trim(),
        document.getElementById('margin-right-input').value.trim(),
        document.getElementById('margin-bottom-input').value.trim(),
        document.getElementById('margin-left-input').value.trim()
    );

    // Get padding values
    const paddingVals = parseShorthand(
        document.getElementById('padding-input').value.trim(),
        document.getElementById('padding-top-input').value.trim(),
        document.getElementById('padding-right-input').value.trim(),
        document.getElementById('padding-bottom-input').value.trim(),
        document.getElementById('padding-left-input').value.trim()
    );

    // Function to parse border declaration (e.g., "5px solid black" -> {width: "5px", style: "solid", color: "black"})
    function parseBorder(borderValue) {
        if (!borderValue) return {width: '', style: '', color: ''};

        // Match width (number + unit)
        const widthMatch = borderValue.match(/(\d+(?:\.\d+)?(?:px|em|rem|%)?)/);
        const width = widthMatch ? widthMatch[1] : '';

        // Match style (solid, dashed, dotted, double, etc.)
        const styleMatch = borderValue.match(/\b(solid|dashed|dotted|double|groove|ridge|inset|outset|none|hidden)\b/i);
        const style = styleMatch ? styleMatch[1].toLowerCase() : 'solid';

        // Match color (named colors, hex, rgb, etc.)
        const colorMatch = borderValue.match(/\b(#[0-9a-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|[a-z]+)\s*$/i);
        const color = colorMatch ? colorMatch[1] : '#000000';

        return {width, style, color};
    }

    // Get border values from inputs
    const borderInput = document.getElementById('border-input').value.trim();
    const borderTopInput = document.getElementById('border-top-input').value.trim();
    const borderRightInput = document.getElementById('border-right-input').value.trim();
    const borderBottomInput = document.getElementById('border-bottom-input').value.trim();
    const borderLeftInput = document.getElementById('border-left-input').value.trim();

    // Parse border declarations
    const borderAll = parseBorder(borderInput);
    const borderTop = parseBorder(borderTopInput);
    const borderRight = parseBorder(borderRightInput);
    const borderBottom = parseBorder(borderBottomInput);
    const borderLeft = parseBorder(borderLeftInput);

    // Get border width values for box model calculation
    const borderVals = parseShorthand(
        borderAll.width,
        borderTop.width || borderTopInput,
        borderRight.width || borderRightInput,
        borderBottom.width || borderBottomInput,
        borderLeft.width || borderLeftInput
    );

    // Get border styles and colors
    const borderStyles = {
        top: borderTop.style || borderAll.style || 'solid',
        right: borderRight.style || borderAll.style || 'solid',
        bottom: borderBottom.style || borderAll.style || 'solid',
        left: borderLeft.style || borderAll.style || 'solid'
    };

    const borderColors = {
        top: borderTop.color || borderAll.color || '#000000',
        right: borderRight.color || borderAll.color || '#000000',
        bottom: borderBottom.color || borderAll.color || '#000000',
        left: borderLeft.color || borderAll.color || '#000000'
    };

    // Get border-radius values
    const radiusVals = parseShorthand(
        document.getElementById('border-radius-input').value.trim(),
        document.getElementById('border-top-left-radius-input').value.trim(),
        document.getElementById('border-top-right-radius-input').value.trim(),
        document.getElementById('border-bottom-right-radius-input').value.trim(),
        document.getElementById('border-bottom-left-radius-input').value.trim()
    );

    // Convert to pixels
    const margin = {
        top: parsePx(marginVals.top),
        right: parsePx(marginVals.right),
        bottom: parsePx(marginVals.bottom),
        left: parsePx(marginVals.left)
    };

    const padding = {
        top: parsePx(paddingVals.top),
        right: parsePx(paddingVals.right),
        bottom: parsePx(paddingVals.bottom),
        left: parsePx(paddingVals.left)
    };

    const border = {
        top: parsePx(borderVals.top),
        right: parsePx(borderVals.right),
        bottom: parsePx(borderVals.bottom),
        left: parsePx(borderVals.left)
    };

    const radius = {
        topLeft: parsePx(radiusVals.top),  // top = top-left for radius
        topRight: parsePx(radiusVals.right),  // right = top-right for radius
        bottomRight: parsePx(radiusVals.bottom),  // bottom = bottom-right for radius
        bottomLeft: parsePx(radiusVals.left)  // left = bottom-left for radius
    };

    // Draw visualization
    drawBoxModel(margin, border, padding, radius, borderStyles, borderColors);
}

function drawBoxModel(margin, border, padding, radius, borderStyles, borderColors) {
    const canvas = document.getElementById('boxmodel-canvas');
    const ctx = canvas.getContext('2d');

    // Get DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size accounting for DPI
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context to match DPI
    ctx.scale(dpr, dpr);

    // Use CSS size for calculations
    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chrome DevTools colors
    const COLORS = {
        margin: 'rgba(250, 222, 180, 0.66)',      // Light orange
        border: 'rgba(160, 204, 250, 0.66)',      // Light blue
        padding: 'rgba(200, 224, 165, 0.66)',     // Light green
        content: 'rgba(255, 255, 255, 1)'         // White
    };

    // Calculate dimensions from center (larger for better visibility)
    const contentWidth = 140;
    const contentHeight = 90;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate all layer boundaries
    const content = {
        x: centerX - contentWidth / 2,
        y: centerY - contentHeight / 2,
        width: contentWidth,
        height: contentHeight
    };

    const paddingBox = {
        x: content.x - padding.left,
        y: content.y - padding.top,
        width: contentWidth + padding.left + padding.right,
        height: contentHeight + padding.top + padding.bottom
    };

    const borderBox = {
        x: paddingBox.x - border.left,
        y: paddingBox.y - border.top,
        width: paddingBox.width + border.left + border.right,
        height: paddingBox.height + border.top + border.bottom
    };

    const marginBox = {
        x: borderBox.x - margin.left,
        y: borderBox.y - margin.top,
        width: borderBox.width + margin.left + margin.right,
        height: borderBox.height + margin.top + margin.bottom
    };

    // Helper function to draw rounded rectangle
    function roundRect(ctx, x, y, w, h, r) {
        const {topLeft, topRight, bottomRight, bottomLeft} = typeof r === 'object' ? r : {topLeft: r, topRight: r, bottomRight: r, bottomLeft: r};

        ctx.beginPath();
        ctx.moveTo(x + topLeft, y);
        ctx.lineTo(x + w - topRight, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + topRight);
        ctx.lineTo(x + w, y + h - bottomRight);
        ctx.quadraticCurveTo(x + w, y + h, x + w - bottomRight, y + h);
        ctx.lineTo(x + bottomLeft, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - bottomLeft);
        ctx.lineTo(x, y + topLeft);
        ctx.quadraticCurveTo(x, y, x + topLeft, y);
        ctx.closePath();
    }

    // Draw margin
    ctx.fillStyle = COLORS.margin;
    ctx.fillRect(marginBox.x, marginBox.y, marginBox.width, marginBox.height);

    // Draw border box background (will be covered by padding, but needed for border area)
    ctx.fillStyle = COLORS.border;
    roundRect(ctx, borderBox.x, borderBox.y, borderBox.width, borderBox.height, radius);
    ctx.fill();

    // Draw padding
    ctx.fillStyle = COLORS.padding;
    roundRect(ctx, paddingBox.x, paddingBox.y, paddingBox.width, paddingBox.height, radius);
    ctx.fill();

    // Draw actual border lines with colors and styles
    if (borderStyles && borderColors) {
        // Helper to set line dash for border style
        function setLineStyle(style) {
            switch(style) {
                case 'dashed':
                    return [10, 5];
                case 'dotted':
                    return [2, 3];
                case 'solid':
                default:
                    return [];
            }
        }

        // Helper to draw a border line (single or double)
        function drawBorderLine(side, x1, y1, x2, y2, width, style, color) {
            ctx.strokeStyle = color;
            ctx.setLineDash(setLineStyle(style));

            if (style === 'double' && width >= 3) {
                // Draw double border as two lines with a gap
                const lineWidth = Math.max(1, Math.floor(width / 3));
                const gap = width - (lineWidth * 2);

                ctx.lineWidth = lineWidth;

                // First line (outer)
                ctx.beginPath();
                if (side === 'top') {
                    ctx.moveTo(x1, borderBox.y + lineWidth / 2);
                    ctx.lineTo(x2, borderBox.y + lineWidth / 2);
                } else if (side === 'bottom') {
                    ctx.moveTo(x1, borderBox.y + borderBox.height - lineWidth / 2);
                    ctx.lineTo(x2, borderBox.y + borderBox.height - lineWidth / 2);
                } else if (side === 'left') {
                    ctx.moveTo(borderBox.x + lineWidth / 2, y1);
                    ctx.lineTo(borderBox.x + lineWidth / 2, y2);
                } else if (side === 'right') {
                    ctx.moveTo(borderBox.x + borderBox.width - lineWidth / 2, y1);
                    ctx.lineTo(borderBox.x + borderBox.width - lineWidth / 2, y2);
                }
                ctx.stroke();

                // Second line (inner)
                ctx.beginPath();
                if (side === 'top') {
                    ctx.moveTo(x1, borderBox.y + lineWidth + gap + lineWidth / 2);
                    ctx.lineTo(x2, borderBox.y + lineWidth + gap + lineWidth / 2);
                } else if (side === 'bottom') {
                    ctx.moveTo(x1, borderBox.y + borderBox.height - lineWidth - gap - lineWidth / 2);
                    ctx.lineTo(x2, borderBox.y + borderBox.height - lineWidth - gap - lineWidth / 2);
                } else if (side === 'left') {
                    ctx.moveTo(borderBox.x + lineWidth + gap + lineWidth / 2, y1);
                    ctx.lineTo(borderBox.x + lineWidth + gap + lineWidth / 2, y2);
                } else if (side === 'right') {
                    ctx.moveTo(borderBox.x + borderBox.width - lineWidth - gap - lineWidth / 2, y1);
                    ctx.lineTo(borderBox.x + borderBox.width - lineWidth - gap - lineWidth / 2, y2);
                }
                ctx.stroke();
            } else {
                // Single line for all other styles
                ctx.lineWidth = width;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }

        // Draw top border
        if (border.top > 0) {
            drawBorderLine('top',
                borderBox.x + radius.topLeft,
                borderBox.y + border.top / 2,
                borderBox.x + borderBox.width - radius.topRight,
                borderBox.y + border.top / 2,
                border.top,
                borderStyles.top,
                borderColors.top
            );
        }

        // Draw right border
        if (border.right > 0) {
            drawBorderLine('right',
                borderBox.x + borderBox.width - border.right / 2,
                borderBox.y + radius.topRight,
                borderBox.x + borderBox.width - border.right / 2,
                borderBox.y + borderBox.height - radius.bottomRight,
                border.right,
                borderStyles.right,
                borderColors.right
            );
        }

        // Draw bottom border
        if (border.bottom > 0) {
            drawBorderLine('bottom',
                borderBox.x + radius.bottomLeft,
                borderBox.y + borderBox.height - border.bottom / 2,
                borderBox.x + borderBox.width - radius.bottomRight,
                borderBox.y + borderBox.height - border.bottom / 2,
                border.bottom,
                borderStyles.bottom,
                borderColors.bottom
            );
        }

        // Draw left border
        if (border.left > 0) {
            drawBorderLine('left',
                borderBox.x + border.left / 2,
                borderBox.y + radius.topLeft,
                borderBox.x + border.left / 2,
                borderBox.y + borderBox.height - radius.bottomLeft,
                border.left,
                borderStyles.left,
                borderColors.left
            );
        }

        // Reset line dash
        ctx.setLineDash([]);
    }

    // Draw content
    ctx.fillStyle = COLORS.content;
    roundRect(ctx, content.x, content.y, content.width, content.height, radius);
    ctx.fill();

    // Draw labels
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Margin labels
    if (margin.top > 5) ctx.fillText(`${margin.top}`, centerX, marginBox.y + margin.top / 2);
    if (margin.bottom > 5) ctx.fillText(`${margin.bottom}`, centerX, marginBox.y + marginBox.height - margin.bottom / 2);
    if (margin.left > 5) {
        ctx.save();
        ctx.translate(marginBox.x + margin.left / 2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${margin.left}`, 0, 0);
        ctx.restore();
    }
    if (margin.right > 5) {
        ctx.save();
        ctx.translate(marginBox.x + marginBox.width - margin.right / 2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${margin.right}`, 0, 0);
        ctx.restore();
    }

    // Border labels
    if (border.top > 3) ctx.fillText(`${border.top}`, centerX, borderBox.y + border.top / 2);
    if (border.bottom > 3) ctx.fillText(`${border.bottom}`, centerX, borderBox.y + borderBox.height - border.bottom / 2);
    if (border.left > 3) {
        ctx.save();
        ctx.translate(borderBox.x + border.left / 2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${border.left}`, 0, 0);
        ctx.restore();
    }
    if (border.right > 3) {
        ctx.save();
        ctx.translate(borderBox.x + borderBox.width - border.right / 2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${border.right}`, 0, 0);
        ctx.restore();
    }

    // Padding labels
    if (padding.top > 5) ctx.fillText(`${padding.top}`, centerX, paddingBox.y + padding.top / 2);
    if (padding.bottom > 5) ctx.fillText(`${padding.bottom}`, centerX, paddingBox.y + paddingBox.height - padding.bottom / 2);
    if (padding.left > 5) {
        ctx.save();
        ctx.translate(paddingBox.x + padding.left / 2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${padding.left}`, 0, 0);
        ctx.restore();
    }
    if (padding.right > 5) {
        ctx.save();
        ctx.translate(paddingBox.x + paddingBox.width - padding.right / 2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${padding.right}`, 0, 0);
        ctx.restore();
    }

    // Content label
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`${contentWidth} × ${contentHeight}`, centerX, centerY);

    // Draw border around white content for visibility
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    roundRect(ctx, content.x, content.y, content.width, content.height, radius);
    ctx.stroke();

    // Update description
    const desc = document.getElementById('boxmodel-description');
    desc.innerHTML = `<span style="color: #fadeb4;">■ margin</span> <span style="color: #a0ccfa;">■ border</span> <span style="color: #c8e0a5;">■ padding</span> <span style="color: #fff; text-shadow: 0 0 2px #000;">■ Contingut</span>`;
}

// Size (box-sizing, width, height) input handlers
function setupSizeInputs() {
    // Get all input elements and buttons
    const inputs = [
        'width-input', 'min-width-input', 'max-width-input',
        'height-input', 'min-height-input', 'max-height-input'
    ].map(id => document.getElementById(id));

    const boxSizingButtons = document.querySelectorAll('.box-sizing-btn');

    const updateSize = () => {
        showSizeExample();
    };

    // Add event listeners to all inputs
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', updateSize);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    updateSize();
                    input.blur();
                }
            });
            input.addEventListener('blur', updateSize);
        }
    });

    // Add event listeners to box-sizing buttons
    boxSizingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const boxSizing = button.dataset.boxSizing;

            // Update selected state
            boxSizingButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Update value display
            const valueDisplay = document.getElementById('box-sizing-value');
            if (valueDisplay) {
                valueDisplay.textContent = boxSizing + ';';
            }

            updateSize();
        });
    });

    // Initialize the visualization on page load
    showSizeExample();
}

function showSizeExample() {
    // Get box-sizing value
    const selectedBoxSizing = document.querySelector('.box-sizing-btn.selected');
    const boxSizing = selectedBoxSizing ? selectedBoxSizing.dataset.boxSizing : 'content-box';

    // Get dimension values
    const width = document.getElementById('width-input').value.trim() || '';
    const minWidth = document.getElementById('min-width-input').value.trim() || '';
    const maxWidth = document.getElementById('max-width-input').value.trim() || '';
    const height = document.getElementById('height-input').value.trim() || '';
    const minHeight = document.getElementById('min-height-input').value.trim() || '';
    const maxHeight = document.getElementById('max-height-input').value.trim() || '';

    // Draw visualization
    drawSizeExample(boxSizing, width, minWidth, maxWidth, height, minHeight, maxHeight);
}

function drawSizeExample(boxSizing, width, minWidth, maxWidth, height, minHeight, maxHeight) {
    if (boxSizing === 'initial') boxSizing = 'content-box';
    const canvas = document.getElementById('size-canvas');
    const ctx = canvas.getContext('2d');

    // Get DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size accounting for DPI
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context to match DPI
    ctx.scale(dpr, dpr);

    // Use CSS size for calculations
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Let the browser resolve lengths and calc(); never evaluate input as JavaScript.
    function parseDimension(value, containerSize) {
        if (!value || value === 'auto') return null;
        if (!CSS.supports('width', value)) return null;
        const parent = document.createElement('div');
        parent.style.cssText = `position: absolute; visibility: hidden; pointer-events: none; width: ${Math.max(0, containerSize)}px; height: 0; overflow: hidden;`;
        const probe = document.createElement('div');
        probe.style.width = value;
        parent.append(probe);
        canvas.parentElement.append(parent);
        const pixels = probe.getBoundingClientRect().width;
        parent.remove();
        return pixels;
    }

    // Calculate content dimensions
    const containerWidth = canvasWidth - 100;
    const containerHeight = canvasHeight - 100;

    let boxWidth = parseDimension(width, containerWidth);
    let boxHeight = parseDimension(height, containerHeight);

    // Apply min/max constraints
    const minW = parseDimension(minWidth, containerWidth);
    const maxW = parseDimension(maxWidth, containerWidth);
    const minH = parseDimension(minHeight, containerHeight);
    const maxH = parseDimension(maxHeight, containerHeight);

    // Default dimensions if not specified
    if (boxWidth === null) boxWidth = 150;
    if (boxHeight === null) boxHeight = 100;

    // Store original before constraints
    const originalWidth = boxWidth;
    const originalHeight = boxHeight;

    // Apply constraints
    let constrainedByMinW = false, constrainedByMaxW = false;
    let constrainedByMinH = false, constrainedByMaxH = false;

    if (maxW !== null && boxWidth > maxW) {
        boxWidth = maxW;
        constrainedByMaxW = true;
    }
    if (minW !== null && boxWidth < minW) {
        boxWidth = minW;
        constrainedByMinW = true;
    }
    if (maxH !== null && boxHeight > maxH) {
        boxHeight = maxH;
        constrainedByMaxH = true;
    }
    if (minH !== null && boxHeight < minH) {
        boxHeight = minH;
        constrainedByMinH = true;
    }

    // Center the box
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const boxX = centerX - boxWidth / 2;
    const boxY = centerY - boxHeight / 2;

    // Helper function to draw arrow
    function drawArrow(x1, y1, x2, y2, label, color = '#2c3e50') {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1.5;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw arrowheads
        const headSize = 6;
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Arrow at start
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + headSize * Math.cos(angle + Math.PI * 0.8), y1 + headSize * Math.sin(angle + Math.PI * 0.8));
        ctx.lineTo(x1 + headSize * Math.cos(angle - Math.PI * 0.8), y1 + headSize * Math.sin(angle - Math.PI * 0.8));
        ctx.closePath();
        ctx.fill();

        // Arrow at end
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headSize * Math.cos(angle + Math.PI * 0.8), y2 - headSize * Math.sin(angle + Math.PI * 0.8));
        ctx.lineTo(x2 - headSize * Math.cos(angle - Math.PI * 0.8), y2 - headSize * Math.sin(angle - Math.PI * 0.8));
        ctx.closePath();
        ctx.fill();

        // Draw label
        if (label) {
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            // Background for text
            const metrics = ctx.measureText(label);
            const padding = 3;
            ctx.fillStyle = '#fff';
            ctx.fillRect(midX - metrics.width / 2 - padding, midY - 8, metrics.width + padding * 2, 16);

            ctx.fillStyle = color;
            ctx.fillText(label, midX, midY);
        }
    }

    // Fixed fake padding and border for visualization
    const fakePadding = 12;
    const fakeBorder = 4;

    // Calculate actual content area based on box-sizing
    let contentX, contentY, contentW, contentH;

    if (boxSizing === 'border-box') {
        // border-box: width/height includes border and padding
        // So content is smaller
        contentX = boxX + fakeBorder + fakePadding;
        contentY = boxY + fakeBorder + fakePadding;
        contentW = boxWidth - 2 * (fakeBorder + fakePadding);
        contentH = boxHeight - 2 * (fakeBorder + fakePadding);
    } else {
        // content-box: width/height is just the content
        // Border and padding are added outside
        contentX = boxX + fakeBorder + fakePadding;
        contentY = boxY + fakeBorder + fakePadding;
        contentW = boxWidth;
        contentH = boxHeight;
    }

    // Draw layers for content-box
    if (boxSizing === 'content-box') {
        const totalWidth = boxWidth + 2 * fakePadding + 2 * fakeBorder;
        const totalHeight = boxHeight + 2 * fakePadding + 2 * fakeBorder;
        const totalX = centerX - totalWidth / 2;
        const totalY = centerY - totalHeight / 2;

        // Draw border layer (blue)
        ctx.fillStyle = 'rgba(160, 204, 250, 0.66)';
        ctx.fillRect(totalX, totalY, totalWidth, totalHeight);

        // Draw padding layer (green)
        ctx.fillStyle = 'rgba(200, 224, 165, 0.66)';
        ctx.fillRect(totalX + fakeBorder, totalY + fakeBorder,
            totalWidth - 2 * fakeBorder, totalHeight - 2 * fakeBorder);

        // Draw content (white)
        ctx.fillStyle = '#fff';
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

        // Draw border around content
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    } else {
        // border-box: draw everything within the box dimensions
        // Draw outer box (border layer)
        ctx.fillStyle = 'rgba(160, 204, 250, 0.66)';
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

        // Draw padding layer
        ctx.fillStyle = 'rgba(200, 224, 165, 0.66)';
        ctx.fillRect(boxX + fakeBorder, boxY + fakeBorder,
            boxWidth - 2 * fakeBorder, boxHeight - 2 * fakeBorder);

        // Draw content (white)
        ctx.fillStyle = '#fff';
        ctx.fillRect(contentX, contentY, contentW, contentH);

        // Draw border around outer box
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

        // Draw border around content for clarity
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.strokeRect(contentX, contentY, contentW, contentH);
    }

    // Draw box-sizing label inside content area
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (boxSizing === 'border-box') {
        ctx.fillText('content', contentX + contentW / 2, contentY + contentH / 2);
    } else {
        ctx.fillText('content', boxX + boxWidth / 2, boxY + boxHeight / 2);
    }

    // Draw min/max width constraints as dotted lines
    // For content-box, constraints apply to content (the black-bordered box)
    // For border-box, constraints apply to the total box (including border/padding)
    let constraintTopY, constraintBottomY, constraintLeftX, constraintRightX;

    if (boxSizing === 'content-box') {
        const totalWidth = boxWidth + 2 * fakePadding + 2 * fakeBorder;
        const totalHeight = boxHeight + 2 * fakePadding + 2 * fakeBorder;
        const totalX = centerX - totalWidth / 2;
        const totalY = centerY - totalHeight / 2;

        constraintTopY = totalY - 30;
        constraintBottomY = totalY + totalHeight + 30;
        constraintLeftX = totalX - 30;
        constraintRightX = totalX + totalWidth + 30;
    } else {
        constraintTopY = boxY - 30;
        constraintBottomY = boxY + boxHeight + 30;
        constraintLeftX = boxX - 30;
        constraintRightX = boxX + boxWidth + 30;
    }

    if (minW !== null) {
        const minX = centerX - minW / 2;
        ctx.strokeStyle = constrainedByMinW ? '#e74c3c' : '#95a5a6';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(minX, constraintTopY);
        ctx.lineTo(minX, constraintBottomY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.font = '11px Arial';
        ctx.fillStyle = constrainedByMinW ? '#e74c3c' : '#95a5a6';
        ctx.textAlign = 'center';
        ctx.fillText('min-width', minX, constraintTopY - 8);
    }

    if (maxW !== null) {
        const maxX = centerX + maxW / 2;
        ctx.strokeStyle = constrainedByMaxW ? '#e74c3c' : '#95a5a6';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(maxX, constraintTopY);
        ctx.lineTo(maxX, constraintBottomY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.font = '11px Arial';
        ctx.fillStyle = constrainedByMaxW ? '#e74c3c' : '#95a5a6';
        ctx.textAlign = 'center';
        ctx.fillText('max-width', maxX, constraintTopY - 8);
    }

    // Draw min/max height constraints as dotted lines
    if (minH !== null) {
        const minY = centerY - minH / 2;
        ctx.strokeStyle = constrainedByMinH ? '#e74c3c' : '#95a5a6';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(constraintLeftX, minY);
        ctx.lineTo(constraintRightX, minY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.save();
        ctx.font = '11px Arial';
        ctx.fillStyle = constrainedByMinH ? '#e74c3c' : '#95a5a6';
        ctx.translate(constraintLeftX - 8, minY);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('min-height', 0, 0);
        ctx.restore();
    }

    if (maxH !== null) {
        const maxY = centerY + maxH / 2;
        ctx.strokeStyle = constrainedByMaxH ? '#e74c3c' : '#95a5a6';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(constraintLeftX, maxY);
        ctx.lineTo(constraintRightX, maxY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.save();
        ctx.font = '11px Arial';
        ctx.fillStyle = constrainedByMaxH ? '#e74c3c' : '#95a5a6';
        ctx.translate(constraintLeftX - 8, maxY);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('max-height', 0, 0);
        ctx.restore();
    }

    // Draw dimension arrows
    if (boxSizing === 'content-box') {
        // For content-box, show the total box dimension (content + padding + border)
        const totalWidth = boxWidth + 2 * fakePadding + 2 * fakeBorder;
        const totalHeight = boxHeight + 2 * fakePadding + 2 * fakeBorder;
        const totalX = centerX - totalWidth / 2;
        const totalY = centerY - totalHeight / 2;

        const arrowOffsetY = totalY + totalHeight + 15;
        const arrowOffsetX = totalX + totalWidth + 15;

        // Total dimensions in gray
        drawArrow(totalX, arrowOffsetY, totalX + totalWidth, arrowOffsetY,
            `total: ${Math.round(totalWidth)}px`, '#95a5a6');
        drawArrow(arrowOffsetX, totalY, arrowOffsetX, totalY + totalHeight,
            `total: ${Math.round(totalHeight)}px`, '#95a5a6');

        // Content dimensions (what width/height refers to)
        const contentArrowOffsetY = boxY + boxHeight + 8;
        const contentArrowOffsetX = boxX + boxWidth + 8;
        drawArrow(boxX, contentArrowOffsetY, boxX + boxWidth, contentArrowOffsetY,
            `width: ${Math.round(boxWidth)}px`, '#3498db');
        drawArrow(contentArrowOffsetX, boxY, contentArrowOffsetX, boxY + boxHeight,
            `height: ${Math.round(boxHeight)}px`, '#3498db');
    } else {
        // For border-box, show the box dimension (which includes everything)
        const arrowOffsetY = boxY + boxHeight + 15;
        const arrowOffsetX = boxX + boxWidth + 15;

        drawArrow(boxX, arrowOffsetY, boxX + boxWidth, arrowOffsetY,
            `width: ${Math.round(boxWidth)}px`, '#3498db');
        drawArrow(arrowOffsetX, boxY, arrowOffsetX, boxY + boxHeight,
            `height: ${Math.round(boxHeight)}px`, '#3498db');

        // Show content dimensions in gray
        const contentArrowOffsetY = contentY + contentH + 8;
        const contentArrowOffsetX = contentX + contentW + 8;
        drawArrow(contentX, contentArrowOffsetY, contentX + contentW, contentArrowOffsetY,
            `contingut: ${Math.round(contentW)}px`, '#95a5a6');
        drawArrow(contentArrowOffsetX, contentY, contentArrowOffsetX, contentY + contentH,
            `contingut: ${Math.round(contentH)}px`, '#95a5a6');
    }

    // Update description
    const desc = document.getElementById('size-description');
    let boxSizingText = boxSizing === 'border-box'
        ? 'width i height inclouen el padding i la vora.'
        : boxSizing === 'content-box'
        ? 'width i height mesuren el contingut; el padding i la vora s’hi afegeixen.'
        : 'Valor inicial: content-box.';

    let constraintText = '';
    if (constrainedByMinW || constrainedByMaxW || constrainedByMinH || constrainedByMaxH) {
        constraintText = ' <span style="color: #e74c3c;">(mida limitada per min o max)</span>';
    }

    const colorLegend = '<br><span style="font-size: 0.9em;"><span style="color: #a0ccfa;">■ border</span> <span style="color: #c8e0a5;">■ padding</span> <span style="color: #666;">■ Contingut</span></span>';

    desc.innerHTML = `<strong>box-sizing: ${boxSizing}</strong> - ${boxSizingText}${constraintText}${colorLegend}`;
}

// Overflow button handlers
function setupOverflowButtons() {
    // Setup overflow buttons
    const overflowButtons = document.querySelectorAll('.overflow-btn');
    const overflowValue = document.getElementById('overflow-value');
    const overflowDemoBox = document.getElementById('overflow-demo-box');

    overflowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const overflow = button.dataset.overflow;

            // Update selected state
            overflowButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Update value display
            if (overflowValue) {
                overflowValue.textContent = overflow + ';';
            }

            // Update description
            const overflowDescription = document.getElementById('overflow-description');
            if (overflowDescription) {
                const descriptions = {
                    'initial': 'Comportament inicial: el contingut pot desbordar.',
                    'visible': 'El contingut es mostra encara que surti de la caixa.',
                    'hidden': 'Retalla el contingut que queda fora de la caixa.',
                    'scroll': 'Permet desplaçar el contingut; les barres depenen del sistema.',
                    'auto': 'Permet desplaçar el contingut quan no hi cap.'
                };
                overflowDescription.textContent = descriptions[overflow] || '';
            }

            // Apply overflow style
            if (overflowDemoBox) {
                overflowDemoBox.style.overflow = overflow;
            }
        });
    });

    // Setup overflow-x buttons
    const overflowXButtons = document.querySelectorAll('.overflow-x-btn');
    const overflowXValue = document.getElementById('overflow-x-value');
    const overflowXDemoBox = document.getElementById('overflow-x-demo-box');

    overflowXButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const overflowX = button.dataset.overflowX;

            // Update selected state
            overflowXButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Update value display
            if (overflowXValue) {
                overflowXValue.textContent = overflowX + ';';
            }

            // Update description
            const overflowXDescription = document.getElementById('overflow-x-description');
            if (overflowXDescription) {
                const descriptions = {
                    'initial': 'Comportament inicial: el contingut pot desbordar horitzontalment.',
                    'visible': 'El contingut pot sortir dels límits horitzontals.',
                    'hidden': 'Retalla el contingut que desborda horitzontalment.',
                    'scroll': 'Permet el desplaçament horitzontal; la barra depèn del sistema.',
                    'auto': 'Permet el desplaçament horitzontal quan cal.'
                };
                overflowXDescription.textContent = descriptions[overflowX] || '';
            }

            // Apply overflow-x style
            if (overflowXDemoBox) {
                overflowXDemoBox.style.overflowX = overflowX;
            }
        });
    });

    // Setup overflow-y buttons
    const overflowYButtons = document.querySelectorAll('.overflow-y-btn');
    const overflowYValue = document.getElementById('overflow-y-value');
    const overflowYDemoBox = document.getElementById('overflow-y-demo-box');

    overflowYButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const overflowY = button.dataset.overflowY;

            // Update selected state
            overflowYButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Update value display
            if (overflowYValue) {
                overflowYValue.textContent = overflowY + ';';
            }

            // Update description
            const overflowYDescription = document.getElementById('overflow-y-description');
            if (overflowYDescription) {
                const descriptions = {
                    'initial': 'Comportament inicial: el contingut pot desbordar verticalment.',
                    'visible': 'El contingut pot sortir dels límits verticals.',
                    'hidden': 'Retalla el contingut que desborda verticalment.',
                    'scroll': 'Permet el desplaçament vertical; la barra depèn del sistema.',
                    'auto': 'Permet el desplaçament vertical quan cal.'
                };
                overflowYDescription.textContent = descriptions[overflowY] || '';
            }

            // Apply overflow-y style
            if (overflowYDemoBox) {
                overflowYDemoBox.style.overflowY = overflowY;
            }
        });
    });
}

// Shadow controls handlers
function setupShadowControls() {
    const boxShadowDemo = document.getElementById('box-shadow-demo');
    const boxShadowValue = document.getElementById('box-shadow-value');
    const addBoxShadowBtn = document.getElementById('add-box-shadow-btn');
    const boxShadowList = document.getElementById('box-shadow-list');

    const textShadowDemo = document.getElementById('text-shadow-demo');
    const textShadowValue = document.getElementById('text-shadow-value');
    const addTextShadowBtn = document.getElementById('add-text-shadow-btn');
    const textShadowList = document.getElementById('text-shadow-list');

    let boxShadows = [];
    let textShadows = [];
    let boxShadowIdCounter = 0;
    let textShadowIdCounter = 0;

    function updateBoxShadowDisplay() {
        if (boxShadows.length === 0) {
            boxShadowValue.textContent = 'none;';
            if (boxShadowDemo) {
                boxShadowDemo.style.boxShadow = '';
            }
        } else {
            const shadowString = boxShadows.map(s => s.value).join(', ');
            boxShadowValue.textContent = shadowString + ';';
            if (boxShadowDemo) {
                boxShadowDemo.style.boxShadow = shadowString;
            }
        }
    }

    function updateTextShadowDisplay() {
        if (textShadows.length === 0) {
            textShadowValue.textContent = 'none;';
            if (textShadowDemo) {
                textShadowDemo.style.textShadow = '';
            }
        } else {
            const shadowString = textShadows.map(s => s.value).join(', ');
            textShadowValue.textContent = shadowString + ';';
            if (textShadowDemo) {
                textShadowDemo.style.textShadow = shadowString;
            }
        }
    }

    function createBoxShadowItem() {
        const id = boxShadowIdCounter++;
        // The first visible shadow always starts with the original neutral preset.
        const ordinal = boxShadows.length;
        const defaultColor = ['#b4b4b4', '#7df0f0', '#7df07d'][ordinal % 3];
        const defaultHorizontal = [0, 10, -10][ordinal % 3];

        const shadowObj = {
            id: id,
            horizontal: defaultHorizontal,
            vertical: 5,
            blur: 10,
            spread: 0,
            color: defaultColor,
            alpha: 100,
            inset: false,
            value: '',
            element: null
        };

        function generateValue() {
            const insetKeyword = shadowObj.inset ? 'inset ' : '';
            return `${insetKeyword}${shadowObj.horizontal}px ${shadowObj.vertical}px ${shadowObj.blur}px ${shadowObj.spread}px ${formatCssColor(shadowObj.color, shadowObj.alpha)}`;
        }

        shadowObj.value = generateValue();

        const itemDiv = document.createElement('div');
        itemDiv.className = 'box-shadow-item';
        itemDiv.dataset.shadowId = id;
        itemDiv.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 10px;';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'list-item-header';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Shadow';
        titleSpan.style.cssText = 'font-weight: 500; font-size: 0.75em; color: #2c3e50;';
        headerDiv.appendChild(titleSpan);

        const deleteBtn = createRemoveButton();
        deleteBtn.addEventListener('click', () => {
            const index = boxShadows.findIndex(s => s.id === id);
            if (index !== -1) {
                boxShadows[index].element.remove();
                boxShadows.splice(index, 1);
                updateBoxShadowDisplay();
            }
        });
        headerDiv.appendChild(deleteBtn);
        itemDiv.appendChild(headerDiv);

        const paramsDiv = document.createElement('div');
        paramsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';

        // Horizontal
        const hRow = document.createElement('div');
        hRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const hLabel = document.createElement('label');
        hLabel.textContent = 'H:';
        hLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        hRow.appendChild(hLabel);
        const hSlider = document.createElement('input');
        hSlider.type = 'range';
        hSlider.min = '-25';
        hSlider.max = '25';
        hSlider.value = shadowObj.horizontal;
        hSlider.style.cssText = 'flex: 1;';
        const hValue = document.createElement('span');
        hValue.textContent = shadowObj.horizontal + 'px';
        hValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        hSlider.addEventListener('input', (e) => {
            shadowObj.horizontal = parseFloat(e.target.value);
            hValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateBoxShadowDisplay();
        });
        hRow.appendChild(hSlider);
        hRow.appendChild(hValue);
        paramsDiv.appendChild(hRow);

        // Vertical
        const vRow = document.createElement('div');
        vRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const vLabel = document.createElement('label');
        vLabel.textContent = 'V:';
        vLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        vRow.appendChild(vLabel);
        const vSlider = document.createElement('input');
        vSlider.type = 'range';
        vSlider.min = '-25';
        vSlider.max = '25';
        vSlider.value = shadowObj.vertical;
        vSlider.style.cssText = 'flex: 1;';
        const vValue = document.createElement('span');
        vValue.textContent = shadowObj.vertical + 'px';
        vValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        vSlider.addEventListener('input', (e) => {
            shadowObj.vertical = parseFloat(e.target.value);
            vValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateBoxShadowDisplay();
        });
        vRow.appendChild(vSlider);
        vRow.appendChild(vValue);
        paramsDiv.appendChild(vRow);

        // Blur
        const bRow = document.createElement('div');
        bRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const bLabel = document.createElement('label');
        bLabel.textContent = 'B:';
        bLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        bRow.appendChild(bLabel);
        const bSlider = document.createElement('input');
        bSlider.type = 'range';
        bSlider.min = '0';
        bSlider.max = '25';
        bSlider.value = shadowObj.blur;
        bSlider.style.cssText = 'flex: 1;';
        const bValue = document.createElement('span');
        bValue.textContent = shadowObj.blur + 'px';
        bValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        bSlider.addEventListener('input', (e) => {
            shadowObj.blur = parseFloat(e.target.value);
            bValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateBoxShadowDisplay();
        });
        bRow.appendChild(bSlider);
        bRow.appendChild(bValue);
        paramsDiv.appendChild(bRow);

        // Spread
        const sRow = document.createElement('div');
        sRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const sLabel = document.createElement('label');
        sLabel.textContent = 'S:';
        sLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        sRow.appendChild(sLabel);
        const sSlider = document.createElement('input');
        sSlider.type = 'range';
        sSlider.min = '-25';
        sSlider.max = '25';
        sSlider.value = shadowObj.spread;
        sSlider.style.cssText = 'flex: 1;';
        const sValue = document.createElement('span');
        sValue.textContent = shadowObj.spread + 'px';
        sValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        sSlider.addEventListener('input', (e) => {
            shadowObj.spread = parseFloat(e.target.value);
            sValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateBoxShadowDisplay();
        });
        sRow.appendChild(sSlider);
        sRow.appendChild(sValue);
        paramsDiv.appendChild(sRow);

        // Color & Inset
        const cRow = document.createElement('div');
        cRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const cLabel = document.createElement('label');
        cLabel.textContent = 'C:';
        cLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        cRow.appendChild(cLabel);
        const cPicker = document.createElement('input');
        cPicker.type = 'color';
        cPicker.id = `box-shadow-color-${id}`;
        cPicker.value = shadowObj.color;
        cPicker.style.cssText = 'width: 30px; height: 20px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer;';
        cPicker.addEventListener('input', (e) => {
            shadowObj.color = colorPickerHex(cPicker);
            shadowObj.alpha = Number(cPicker.dataset.colorAlpha);
            shadowObj.value = generateValue();
            updateBoxShadowDisplay();
        });
        cRow.appendChild(cPicker);

        const insetLabel = document.createElement('label');
        insetLabel.style.cssText = 'margin-left: auto; display: flex; align-items: center; gap: 6px; font-size: 0.75em; cursor: pointer;';
        const insetCheckbox = document.createElement('input');
        insetCheckbox.type = 'checkbox';
        insetCheckbox.id = `box-shadow-inset-${id}`;
        insetCheckbox.checked = shadowObj.inset;
        insetCheckbox.addEventListener('change', () => {
            shadowObj.inset = insetCheckbox.checked;
            shadowObj.value = generateValue();
            updateBoxShadowDisplay();
        });
        insetLabel.append(insetCheckbox, document.createTextNode('Inset'));
        cRow.appendChild(insetLabel);
        paramsDiv.appendChild(cRow);
        addColorTransparency(cPicker, 'Color de l’ombra de caixa');

        [
            [hRow, hLabel, hSlider, hValue, 'Horizontal', 'horizontal'],
            [vRow, vLabel, vSlider, vValue, 'Vertical', 'vertical'],
            [bRow, bLabel, bSlider, bValue, 'Desenfocament', 'blur'],
            [sRow, sLabel, sSlider, sValue, 'Extensió', 'spread']
        ].forEach(([row, label, slider, value, text, name]) => {
            row.className = 'shadow-parameter-row';
            row.removeAttribute('style');
            label.className = 'shadow-parameter-label';
            label.textContent = text + ':';
            label.removeAttribute('style');
            slider.id = `box-shadow-${name}-${id}`;
            label.htmlFor = slider.id;
            slider.removeAttribute('style');
            value.className = 'shadow-parameter-value';
            value.removeAttribute('style');
        });
        cRow.className = 'shadow-color-row';
        cRow.removeAttribute('style');
        cLabel.textContent = 'Color:';
        cLabel.className = 'shadow-parameter-label';
        cLabel.removeAttribute('style');

        itemDiv.appendChild(paramsDiv);
        shadowObj.element = itemDiv;
        return shadowObj;
    }

    function createTextShadowItem() {
        const id = textShadowIdCounter++;
        // The first visible shadow always starts with the original neutral preset.
        const ordinal = textShadows.length;
        const defaultColor = ['#b4b4b4', '#7df0f0', '#7df07d'][ordinal % 3];
        const defaultHorizontal = [0, 10, -10][ordinal % 3];

        const shadowObj = {
            id: id,
            horizontal: defaultHorizontal,
            vertical: 5,
            blur: 10,
            color: defaultColor,
            alpha: 100,
            value: '',
            element: null
        };

        function generateValue() {
            return `${shadowObj.horizontal}px ${shadowObj.vertical}px ${shadowObj.blur}px ${formatCssColor(shadowObj.color, shadowObj.alpha)}`;
        }

        shadowObj.value = generateValue();

        const itemDiv = document.createElement('div');
        itemDiv.className = 'text-shadow-item';
        itemDiv.dataset.shadowId = id;
        itemDiv.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 10px;';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'list-item-header';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Shadow';
        titleSpan.style.cssText = 'font-weight: 500; font-size: 0.75em; color: #2c3e50;';
        headerDiv.appendChild(titleSpan);

        const deleteBtn = createRemoveButton();
        deleteBtn.addEventListener('click', () => {
            const index = textShadows.findIndex(s => s.id === id);
            if (index !== -1) {
                textShadows[index].element.remove();
                textShadows.splice(index, 1);
                updateTextShadowDisplay();
            }
        });
        headerDiv.appendChild(deleteBtn);
        itemDiv.appendChild(headerDiv);

        const paramsDiv = document.createElement('div');
        paramsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';

        // Horizontal
        const hRow = document.createElement('div');
        hRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const hLabel = document.createElement('label');
        hLabel.textContent = 'H:';
        hLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        hRow.appendChild(hLabel);
        const hSlider = document.createElement('input');
        hSlider.type = 'range';
        hSlider.min = '-25';
        hSlider.max = '25';
        hSlider.value = shadowObj.horizontal;
        hSlider.style.cssText = 'flex: 1;';
        const hValue = document.createElement('span');
        hValue.textContent = shadowObj.horizontal + 'px';
        hValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        hSlider.addEventListener('input', (e) => {
            shadowObj.horizontal = parseFloat(e.target.value);
            hValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateTextShadowDisplay();
        });
        hRow.appendChild(hSlider);
        hRow.appendChild(hValue);
        paramsDiv.appendChild(hRow);

        // Vertical
        const vRow = document.createElement('div');
        vRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const vLabel = document.createElement('label');
        vLabel.textContent = 'V:';
        vLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        vRow.appendChild(vLabel);
        const vSlider = document.createElement('input');
        vSlider.type = 'range';
        vSlider.min = '-25';
        vSlider.max = '25';
        vSlider.value = shadowObj.vertical;
        vSlider.style.cssText = 'flex: 1;';
        const vValue = document.createElement('span');
        vValue.textContent = shadowObj.vertical + 'px';
        vValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        vSlider.addEventListener('input', (e) => {
            shadowObj.vertical = parseFloat(e.target.value);
            vValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateTextShadowDisplay();
        });
        vRow.appendChild(vSlider);
        vRow.appendChild(vValue);
        paramsDiv.appendChild(vRow);

        // Blur
        const bRow = document.createElement('div');
        bRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const bLabel = document.createElement('label');
        bLabel.textContent = 'B:';
        bLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        bRow.appendChild(bLabel);
        const bSlider = document.createElement('input');
        bSlider.type = 'range';
        bSlider.min = '0';
        bSlider.max = '25';
        bSlider.value = shadowObj.blur;
        bSlider.style.cssText = 'flex: 1;';
        const bValue = document.createElement('span');
        bValue.textContent = shadowObj.blur + 'px';
        bValue.style.cssText = 'width: 30px; text-align: right; font-size: 0.65em; font-family: "Courier New", monospace;';
        bSlider.addEventListener('input', (e) => {
            shadowObj.blur = parseFloat(e.target.value);
            bValue.textContent = e.target.value + 'px';
            shadowObj.value = generateValue();
            updateTextShadowDisplay();
        });
        bRow.appendChild(bSlider);
        bRow.appendChild(bValue);
        paramsDiv.appendChild(bRow);

        // Color
        const cRow = document.createElement('div');
        cRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';
        const cLabel = document.createElement('label');
        cLabel.textContent = 'C:';
        cLabel.style.cssText = 'width: 20px; font-size: 0.65em; color: #2c3e50;';
        cRow.appendChild(cLabel);
        const cPicker = document.createElement('input');
        cPicker.type = 'color';
        cPicker.id = `text-shadow-color-${id}`;
        cPicker.value = shadowObj.color;
        cPicker.style.cssText = 'width: 30px; height: 20px; border: 1px solid #ddd; border-radius: 3px; cursor: pointer;';
        cPicker.addEventListener('input', (e) => {
            shadowObj.color = colorPickerHex(cPicker);
            shadowObj.alpha = Number(cPicker.dataset.colorAlpha);
            shadowObj.value = generateValue();
            updateTextShadowDisplay();
        });
        cRow.appendChild(cPicker);
        paramsDiv.appendChild(cRow);
        addColorTransparency(cPicker, 'Color de l’ombra de text');

        itemDiv.appendChild(paramsDiv);
        shadowObj.element = itemDiv;
        return shadowObj;
    }

    // Event listeners
    if (addBoxShadowBtn) {
        addBoxShadowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newShadow = createBoxShadowItem();
            boxShadows.push(newShadow);
            boxShadowList.appendChild(newShadow.element);
            updateBoxShadowDisplay();
        });
    }

    if (addTextShadowBtn) {
        addTextShadowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newShadow = createTextShadowItem();
            textShadows.push(newShadow);
            textShadowList.appendChild(newShadow.element);
            updateTextShadowDisplay();
        });
    }

    // Initialize with one shadow of each type
    const initialBoxShadow = createBoxShadowItem();
    boxShadows.push(initialBoxShadow);
    boxShadowList.appendChild(initialBoxShadow.element);
    updateBoxShadowDisplay();

    const initialTextShadow = createTextShadowItem();
    textShadows.push(initialTextShadow);
    textShadowList.appendChild(initialTextShadow.element);
    updateTextShadowDisplay();
}

// Background controls handlers
function setupBackgroundControls() {
    setupBackgroundEditor();
}

function setupOpacityControls() {
    const opacityDemo = document.getElementById('opacity-demo');
    const visibilityButtons = document.querySelectorAll('.visibility-btn');
    const visibilityValue = document.getElementById('visibility-value');
    const opacitySlider = document.getElementById('opacity-slider');
    const opacitySliderValue = document.getElementById('opacity-slider-value');
    const opacityValue = document.getElementById('opacity-value');
    const opacityResetBtn = document.querySelector('.opacity-reset-btn');

    let isOpacityInitial = false; // Track if opacity is set to initial

    // Visibility buttons
    if (visibilityButtons.length > 0) {
        visibilityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const visibility = button.dataset.visibility;

                // Update selected state
                visibilityButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');

                // Update value display
                if (visibilityValue) {
                    visibilityValue.textContent = visibility + ';';
                }

                // Apply to demo
                if (opacityDemo) {
                    opacityDemo.style.visibility = visibility;
                }
            });
        });
    }

    // Opacity slider
    if (opacitySlider) {
        opacitySlider.addEventListener('input', () => {
            // Only update if not in initial mode
            if (!isOpacityInitial) {
                const value = opacitySlider.value;

                // Update slider value display
                if (opacitySliderValue) {
                    opacitySliderValue.textContent = value + ';';
                }

                // Update opacity value display
                if (opacityValue) {
                    opacityValue.textContent = value + ';';
                }

                // Apply to demo
                if (opacityDemo) {
                    opacityDemo.style.opacity = value;
                }
            }
        });
    }

    // Opacity initial button (toggle)
    if (opacityResetBtn) {
        opacityResetBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (isOpacityInitial) {
                // Currently initial, switch to active slider mode
                opacityResetBtn.classList.remove('selected');
                isOpacityInitial = false;

                // Enable slider
                if (opacitySlider) {
                    opacitySlider.disabled = false;
                    opacitySlider.style.opacity = '1';
                    opacitySlider.style.cursor = 'pointer';
                }

                // Update to slider value
                const value = opacitySlider.value;
                if (opacitySliderValue) {
                    opacitySliderValue.textContent = value + ';';
                }
                if (opacityValue) {
                    opacityValue.textContent = value + ';';
                }
                if (opacityDemo) {
                    opacityDemo.style.opacity = value;
                }
            } else {
                // Currently active slider, switch to initial mode
                opacityResetBtn.classList.add('selected');
                isOpacityInitial = true;

                // Disable slider
                if (opacitySlider) {
                    opacitySlider.disabled = true;
                    opacitySlider.style.opacity = '0.5';
                    opacitySlider.style.cursor = 'not-allowed';
                }

                // Reset to initial
                if (opacityValue) {
                    opacityValue.textContent = 'initial;';
                }
                if (opacityDemo) {
                    opacityDemo.style.opacity = '';
                }
            }
        });
    }
}

function setupTransformControls() {
    const transformDemo = document.getElementById('transform-demo');
    const transformValue = document.getElementById('transform-value');
    const addTransformBtn = document.getElementById('add-transform-btn');
    const transformList = document.getElementById('transform-list');

    let transforms = []; // Array to store transform objects
    let transformIdCounter = 0;

    // Transform type configurations
    const transformConfigs = {
        'translate3d': {
            icon: 'transformTranslate.svg',
            params: [
                { name: 'translateX', label: 'X', unit: 'px', min: -200, max: 200, default: 0 },
                { name: 'translateY', label: 'Y', unit: 'px', min: -200, max: 200, default: 0 },
                { name: 'translateZ', label: 'Z', unit: 'px', min: -200, max: 200, default: 0 }
            ],
            generate: (params) => `translate3d(${params.translateX}px, ${params.translateY}px, ${params.translateZ}px)`
        },
        'scale3d': {
            icon: 'transformScale.svg',
            params: [
                { name: 'scaleX', label: 'X', unit: '', min: 0, max: 3, step: 0.1, default: 1 },
                { name: 'scaleY', label: 'Y', unit: '', min: 0, max: 3, step: 0.1, default: 1 },
                { name: 'scaleZ', label: 'Z', unit: '', min: 0, max: 3, step: 0.1, default: 1 }
            ],
            generate: (params) => `scale3d(${params.scaleX}, ${params.scaleY}, ${params.scaleZ})`
        },
        'rotate3d': {
            icon: 'transformRotate.svg',
            params: [
                { name: 'rotateX', label: 'X', unit: '', min: 0, max: 1, step: 0.1, default: 0 },
                { name: 'rotateY', label: 'Y', unit: '', min: 0, max: 1, step: 0.1, default: 0 },
                { name: 'rotateZ', label: 'Z', unit: '', min: 0, max: 1, step: 0.1, default: 0 },
                { name: 'angle', label: 'Angle', unit: 'deg', min: 0, max: 360, default: 0 }
            ],
            generate: (params) => `rotate3d(${params.rotateX}, ${params.rotateY}, ${params.rotateZ}, ${params.angle}deg)`
        },
        'skew': {
            icon: 'transformSkew.svg',
            params: [
                { name: 'skewX', label: 'X', unit: 'deg', min: -45, max: 45, default: 0 },
                { name: 'skewY', label: 'Y', unit: 'deg', min: -45, max: 45, default: 0 }
            ],
            generate: (params) => `skew(${params.skewX}deg, ${params.skewY}deg)`
        }
    };

    function updateTransformDisplay() {
        if (transforms.length === 0) {
            transformValue.textContent = 'none;';
            if (transformDemo) {
                transformDemo.style.transform = '';
            }
        } else {
            const transformString = transforms.map(t => t.value).join(' ');
            transformValue.textContent = transformString + ';';
            if (transformDemo) {
                transformDemo.style.transform = transformString;
            }
        }
    }

    function createTransformItem(type = 'translate3d') {
        const id = transformIdCounter++;
        const config = transformConfigs[type];

        const transformObj = {
            id: id,
            type: type,
            params: {},
            value: '',
            element: null
        };

        // Initialize params with defaults
        config.params.forEach(param => {
            transformObj.params[param.name] = param.default;
        });

        // Generate initial value
        transformObj.value = config.generate(transformObj.params);

        // Create the DOM element
        const itemDiv = document.createElement('div');
        itemDiv.className = 'transform-item';
        itemDiv.dataset.transformId = id;
        itemDiv.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 12px;';

        // Header with type selector and delete button
        const headerDiv = document.createElement('div');
        headerDiv.className = 'list-item-header';

        const selectContainer = document.createElement('div');
        selectContainer.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const typeSelect = document.createElement('select');
        typeSelect.className = 'transform-type-select';
        typeSelect.style.cssText = 'padding: 4px 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 0.75em; cursor: pointer;';

        ['translate3d', 'scale3d', 'rotate3d', 'skew'].forEach(t => {
            const option = document.createElement('option');
            option.value = t;
            option.textContent = t;
            if (t === type) option.selected = true;
            typeSelect.appendChild(option);
        });

        typeSelect.addEventListener('change', (e) => {
            const newType = e.target.value;
            if (newType === 'initial') {
                // Remove this transform
                removeTransform(id);
            } else {
                // Recreate with new type
                const index = transforms.findIndex(t => t.id === id);
                if (index !== -1) {
                    const newTransform = createTransformItem(newType);
                    transforms[index] = newTransform;
                    itemDiv.replaceWith(newTransform.element);
                    updateTransformDisplay();
                }
            }
        });

        selectContainer.appendChild(typeSelect);
        headerDiv.appendChild(selectContainer);

        const deleteBtn = createRemoveButton();
        deleteBtn.addEventListener('click', () => removeTransform(id));
        headerDiv.appendChild(deleteBtn);

        itemDiv.appendChild(headerDiv);

        // Parameters
        const paramsDiv = document.createElement('div');
        paramsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

        if (type === 'rotate3d') {
            // For rotate3d, show x,y,z checkboxes in one row, then angle slider below
            const xyzRow = document.createElement('div');
            xyzRow.style.cssText = 'display: flex; align-items: center; gap: 12px;';

            // Filter only x,y,z params (not angle)
            const xyzParams = config.params.filter(p => p.name !== 'angle');
            xyzParams.forEach(param => {
                const checkboxContainer = document.createElement('label');
                checkboxContainer.style.cssText = 'display: flex; align-items: center; gap: 4px; font-size: 0.75em; color: #2c3e50; cursor: pointer;';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = param.default === 1;
                checkbox.style.cssText = 'cursor: pointer;';
                checkbox.addEventListener('change', (e) => {
                    transformObj.params[param.name] = e.target.checked ? 1 : 0;
                    transformObj.value = config.generate(transformObj.params);
                    updateTransformDisplay();
                });
                checkboxContainer.appendChild(checkbox);

                const labelText = document.createElement('span');
                labelText.textContent = param.label;
                checkboxContainer.appendChild(labelText);

                xyzRow.appendChild(checkboxContainer);
            });

            paramsDiv.appendChild(xyzRow);

            // Add angle slider below
            const angleParam = config.params.find(p => p.name === 'angle');
            if (angleParam) {
                const paramRow = document.createElement('div');
                paramRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

                const label = document.createElement('label');
                label.textContent = angleParam.label + ':';
                label.style.cssText = 'width: 60px; font-size: 0.75em; color: #2c3e50;';
                paramRow.appendChild(label);

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.min = angleParam.min;
                slider.max = angleParam.max;
                slider.step = angleParam.step || 1;
                slider.value = angleParam.default;
                slider.style.cssText = 'flex: 1;';
                slider.addEventListener('input', (e) => {
                    transformObj.params[angleParam.name] = parseFloat(e.target.value);
                    valueSpan.textContent = e.target.value + (angleParam.unit || '');
                    transformObj.value = config.generate(transformObj.params);
                    updateTransformDisplay();
                });
                paramRow.appendChild(slider);

                const valueSpan = document.createElement('span');
                valueSpan.textContent = angleParam.default + (angleParam.unit || '');
                valueSpan.style.cssText = 'width: 50px; text-align: right; font-size: 0.75em; font-family: "Courier New", monospace;';
                paramRow.appendChild(valueSpan);

                paramsDiv.appendChild(paramRow);
            }
        } else {
            // For other transforms, use sliders as before
            config.params.forEach(param => {
                const paramRow = document.createElement('div');
                paramRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

                const label = document.createElement('label');
                label.textContent = param.label + ':';
                label.style.cssText = 'width: 60px; font-size: 0.75em; color: #2c3e50;';
                paramRow.appendChild(label);

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.min = param.min;
                slider.max = param.max;
                slider.step = param.step || 1;
                slider.value = param.default;
                slider.style.cssText = 'flex: 1;';
                slider.addEventListener('input', (e) => {
                    transformObj.params[param.name] = parseFloat(e.target.value);
                    valueSpan.textContent = e.target.value + (param.unit || '');
                    transformObj.value = config.generate(transformObj.params);
                    updateTransformDisplay();
                });
                paramRow.appendChild(slider);

                const valueSpan = document.createElement('span');
                valueSpan.textContent = param.default + (param.unit || '');
                valueSpan.style.cssText = 'width: 50px; text-align: right; font-size: 0.75em; font-family: "Courier New", monospace;';
                paramRow.appendChild(valueSpan);

                paramsDiv.appendChild(paramRow);
            });
        }

        itemDiv.appendChild(paramsDiv);
        transformObj.element = itemDiv;

        return transformObj;
    }

    function addTransform() {
        const newTransform = createTransformItem();
        transforms.push(newTransform);
        transformList.appendChild(newTransform.element);
        updateTransformDisplay();
    }

    function removeTransform(id) {
        const index = transforms.findIndex(t => t.id === id);
        if (index !== -1) {
            transforms[index].element.remove();
            transforms.splice(index, 1);
            updateTransformDisplay();
        }
    }

    // Event listeners
    if (addTransformBtn) {
        addTransformBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addTransform();
        });
    }

    // Initialize with one transform
    addTransform();
}

function setupTransitionControls() {
    const transitionDemo = document.getElementById('transition-demo');
    const transitionValue = document.getElementById('transition-value');
    const addTransitionBtn = document.getElementById('add-transition-btn');
    const transitionList = document.getElementById('transition-list');

    let transitions = []; // Array to store transition objects
    let transitionIdCounter = 0;

    // Common CSS properties that can be transitioned
    const transitionProperties = [
        'all',
        'transform',
        'opacity',
        'background-color',
        'color',
        'width',
        'height',
        'border-radius',
        'margin',
        'padding',
        'box-shadow',
        'filter'
    ];

    // Timing functions
    const timingFunctions = [
        'linear',
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out'
    ];

    function updateTransitionDisplay() {
        if (transitions.length === 0) {
            transitionValue.textContent = 'none;';
            if (transitionDemo) {
                transitionDemo.style.transition = '';
            }
        } else {
            const transitionString = transitions.map(t => t.value).join(', ');
            transitionValue.textContent = transitionString + ';';
            if (transitionDemo) {
                transitionDemo.style.transition = transitionString;
            }
        }
    }

    function createTransitionItem() {
        const id = transitionIdCounter++;

        const transitionObj = {
            id: id,
            property: 'all',
            duration: 0.3,
            delay: 0,
            timing: 'ease',
            value: '',
            element: null
        };

        // Generate initial value
        function generateValue() {
            return `${transitionObj.property} ${transitionObj.duration}s ${transitionObj.timing} ${transitionObj.delay}s`;
        }

        transitionObj.value = generateValue();

        // Create the DOM element
        const itemDiv = document.createElement('div');
        itemDiv.className = 'transition-item';
        itemDiv.dataset.transitionId = id;
        itemDiv.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 12px;';

        // Header with delete button
        const headerDiv = document.createElement('div');
        headerDiv.className = 'list-item-header';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Transition';
        titleSpan.style.cssText = 'font-weight: 500; font-size: 0.85em; color: #2c3e50;';
        headerDiv.appendChild(titleSpan);

        const deleteBtn = createRemoveButton();
        deleteBtn.addEventListener('click', () => removeTransition(id));
        headerDiv.appendChild(deleteBtn);

        itemDiv.appendChild(headerDiv);

        // Parameters
        const paramsDiv = document.createElement('div');
        paramsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

        // Property selector
        const propertyRow = document.createElement('div');
        propertyRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const propertyLabel = document.createElement('label');
        propertyLabel.textContent = 'Property:';
        propertyLabel.style.cssText = 'width: 80px; font-size: 0.75em; color: #2c3e50;';
        propertyRow.appendChild(propertyLabel);

        const propertySelect = document.createElement('select');
        propertySelect.style.cssText = 'flex: 1; padding: 4px 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 0.75em; cursor: pointer;';
        transitionProperties.forEach(prop => {
            const option = document.createElement('option');
            option.value = prop;
            option.textContent = prop;
            if (prop === transitionObj.property) option.selected = true;
            propertySelect.appendChild(option);
        });
        propertySelect.addEventListener('change', (e) => {
            transitionObj.property = e.target.value;
            transitionObj.value = generateValue();
            updateTransitionDisplay();
        });
        propertyRow.appendChild(propertySelect);
        paramsDiv.appendChild(propertyRow);

        // Duration slider
        const durationRow = document.createElement('div');
        durationRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const durationLabel = document.createElement('label');
        durationLabel.textContent = 'Duration:';
        durationLabel.style.cssText = 'width: 80px; font-size: 0.75em; color: #2c3e50;';
        durationRow.appendChild(durationLabel);

        const durationSlider = document.createElement('input');
        durationSlider.type = 'range';
        durationSlider.min = '0';
        durationSlider.max = '5';
        durationSlider.step = '0.1';
        durationSlider.value = transitionObj.duration;
        durationSlider.style.cssText = 'flex: 1;';
        durationSlider.addEventListener('input', (e) => {
            transitionObj.duration = parseFloat(e.target.value);
            durationValueSpan.textContent = e.target.value + 's';
            transitionObj.value = generateValue();
            updateTransitionDisplay();
        });
        durationRow.appendChild(durationSlider);

        const durationValueSpan = document.createElement('span');
        durationValueSpan.textContent = transitionObj.duration + 's';
        durationValueSpan.style.cssText = 'width: 50px; text-align: right; font-size: 0.75em; font-family: "Courier New", monospace;';
        durationRow.appendChild(durationValueSpan);
        paramsDiv.appendChild(durationRow);

        // Delay slider
        const delayRow = document.createElement('div');
        delayRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const delayLabel = document.createElement('label');
        delayLabel.textContent = 'Delay:';
        delayLabel.style.cssText = 'width: 80px; font-size: 0.75em; color: #2c3e50;';
        delayRow.appendChild(delayLabel);

        const delaySlider = document.createElement('input');
        delaySlider.type = 'range';
        delaySlider.min = '0';
        delaySlider.max = '3';
        delaySlider.step = '0.1';
        delaySlider.value = transitionObj.delay;
        delaySlider.style.cssText = 'flex: 1;';
        delaySlider.addEventListener('input', (e) => {
            transitionObj.delay = parseFloat(e.target.value);
            delayValueSpan.textContent = e.target.value + 's';
            transitionObj.value = generateValue();
            updateTransitionDisplay();
        });
        delayRow.appendChild(delaySlider);

        const delayValueSpan = document.createElement('span');
        delayValueSpan.textContent = transitionObj.delay + 's';
        delayValueSpan.style.cssText = 'width: 50px; text-align: right; font-size: 0.75em; font-family: "Courier New", monospace;';
        delayRow.appendChild(delayValueSpan);
        paramsDiv.appendChild(delayRow);

        // Timing function selector
        const timingRow = document.createElement('div');
        timingRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const timingLabel = document.createElement('label');
        timingLabel.textContent = 'Timing:';
        timingLabel.style.cssText = 'width: 80px; font-size: 0.75em; color: #2c3e50;';
        timingRow.appendChild(timingLabel);

        const timingSelect = document.createElement('select');
        timingSelect.style.cssText = 'flex: 1; padding: 4px 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 0.75em; cursor: pointer;';
        timingFunctions.forEach(timing => {
            const option = document.createElement('option');
            option.value = timing;
            option.textContent = timing;
            if (timing === transitionObj.timing) option.selected = true;
            timingSelect.appendChild(option);
        });
        timingSelect.addEventListener('change', (e) => {
            transitionObj.timing = e.target.value;
            transitionObj.value = generateValue();
            updateTransitionDisplay();
        });
        timingRow.appendChild(timingSelect);
        paramsDiv.appendChild(timingRow);

        itemDiv.appendChild(paramsDiv);
        transitionObj.element = itemDiv;

        return transitionObj;
    }

    function addTransition() {
        const newTransition = createTransitionItem();
        transitions.push(newTransition);
        transitionList.appendChild(newTransition.element);
        updateTransitionDisplay();
    }

    function removeTransition(id) {
        const index = transitions.findIndex(t => t.id === id);
        if (index !== -1) {
            transitions[index].element.remove();
            transitions.splice(index, 1);
            updateTransitionDisplay();
        }
    }

    // Event listeners
    if (addTransitionBtn) {
        addTransitionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addTransition();
        });
    }

    // Add hover effect to demo box
    if (transitionDemo) {
        transitionDemo.style.background = '#2563eb';
        const finalStyles = { transform: 'scale(1.2) rotate(10deg)', borderRadius: '50%', backgroundColor: '#f39c12',
            width: '120px', height: '120px', opacity: '0.6', color: '#17263c', margin: '10px', padding: '12px',
            boxShadow: '0 8px 20px #17263c55', filter: 'grayscale(1)' };
        const initialStyles = Object.fromEntries(Object.keys(finalStyles).map(property => [property, transitionDemo.style[property]]));
        transitionDemo.addEventListener('mouseenter', () => {
            Object.assign(transitionDemo.style, finalStyles);
        });

        transitionDemo.addEventListener('mouseleave', () => {
            Object.assign(transitionDemo.style, initialStyles);
        });
    }

    // Initialize with one transition
    addTransition();
}

function setupFilterControls() {
    const filterDemo = document.getElementById('filter-demo');
    const filterValue = document.getElementById('filter-value');
    const addFilterBtn = document.getElementById('add-filter-btn');
    const filterList = document.getElementById('filter-list');
    const scene = document.getElementById('filter-scene');
    const glass = document.getElementById('filter-glass');
    const glassControls = document.getElementById('filter-glass-controls');
    const glassColor = document.getElementById('filter-glass-color');
    const propertyLink = document.getElementById('filter-property-link');
    const section = workspaceTopics.get('filters').section;
    let mode = 'image';
    const presets = {
        original: { mode: 'image', filters: [] },
        grayscale: { mode: 'image', filters: [['grayscale', 100]] },
        vintage: { mode: 'image', filters: [['sepia', 70], ['contrast', 90], ['brightness', 110]] },
        vivid: { mode: 'image', filters: [['saturate', 180], ['contrast', 115]] },
        fade: { mode: 'image', filters: [['opacity', 50]] },
        frosted: { mode: 'backdrop', filters: [['blur', 12], ['saturate', 150]], color: '#ffffff', alpha: 28 },
        'dark-glass': { mode: 'backdrop', filters: [['blur', 12], ['brightness', 80]], color: '#17263c', alpha: 55 }
    };
    const clearPreset = () => section.querySelectorAll('[data-filter-preset]').forEach(button => button.setAttribute('aria-pressed', 'false'));

    let filters = []; // Array to store filter objects
    let filterIdCounter = 0;

    // Filter configurations with specific ranges
    const filterConfigs = {
        'blur': {
            min: 0,
            max: 30,
            step: 0.5,
            default: 0,
            unit: 'px',
            generate: (value) => `blur(${value}px)`
        },
        'brightness': {
            min: 0,
            max: 500,
            step: 10,
            default: 100,
            unit: '%',
            generate: (value) => `brightness(${value}%)`
        },
        'contrast': {
            min: 0,
            max: 200,
            step: 5,
            default: 100,
            unit: '%',
            generate: (value) => `contrast(${value}%)`
        },
        'grayscale': {
            min: 0,
            max: 100,
            step: 5,
            default: 0,
            unit: '%',
            generate: (value) => `grayscale(${value}%)`
        },
        'hue-rotate': {
            min: 0,
            max: 360,
            step: 5,
            default: 0,
            unit: 'deg',
            generate: (value) => `hue-rotate(${value}deg)`
        },
        'invert': {
            min: 0,
            max: 100,
            step: 5,
            default: 0,
            unit: '%',
            generate: (value) => `invert(${value}%)`
        },
        'opacity': {
            min: 0,
            max: 100,
            step: 5,
            default: 100,
            unit: '%',
            generate: (value) => `opacity(${value}%)`
        },
        'saturate': {
            min: 0,
            max: 500,
            step: 10,
            default: 100,
            unit: '%',
            generate: (value) => `saturate(${value}%)`
        },
        'sepia': {
            min: 0,
            max: 100,
            step: 5,
            default: 0,
            unit: '%',
            generate: (value) => `sepia(${value}%)`
        }
    };

    function updateFilterDisplay() {
        const filterString = filters.map(f => f.filterValue).join(' ') || 'none';
        const backdrop = mode === 'backdrop';
        filterValue.textContent = filterString + ';';
        propertyLink.textContent = backdrop ? 'backdrop-filter:' : 'filter:';
        propertyLink.href = `https://developer.mozilla.org/en-US/docs/Web/CSS/${backdrop ? 'backdrop-filter' : 'filter'}`;
        scene.classList.toggle('filter-scene--backdrop', backdrop);
        glass.hidden = glassControls.hidden = !backdrop;
        filterDemo.style.filter = backdrop ? 'none' : filterString;
        glass.style.backdropFilter = backdrop ? filterString : 'none';
        glass.style.backgroundColor = colorPickerValue(glassColor);
        const rgb = parseCssColor(glassColor.value).rgb;
        glass.style.color = (rgb[0] * .299 + rgb[1] * .587 + rgb[2] * .114) < 128 ? '#ffffff' : '#17263c';
        section.querySelectorAll('[data-filter-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filterMode === mode)));
        if (workspaceReady) {
            improveControls(section);
            updateWorkspaceCode();
        }
    }

    function createFilterItem(type = 'blur', value = filterConfigs[type].default) {
        const id = filterIdCounter++;
        const config = filterConfigs[type];

        const filterObj = {
            id: id,
            type: type,
            value,
            filterValue: '',
            element: null
        };

        // Generate initial value
        function generateValue() {
            return config.generate(filterObj.value);
        }

        filterObj.filterValue = generateValue();

        // Create the DOM element
        const itemDiv = document.createElement('div');
        itemDiv.className = 'filter-item';
        itemDiv.dataset.filterId = id;
        itemDiv.style.cssText = 'background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 12px;';

        // Header with type selector and delete button
        const headerDiv = document.createElement('div');
        headerDiv.className = 'list-item-header';

        const selectContainer = document.createElement('div');
        selectContainer.style.cssText = 'display: flex; align-items: center; gap: 8px; flex: 1;';

        const typeLabel = document.createElement('span');
        typeLabel.textContent = 'Filtre:';
        typeLabel.style.cssText = 'font-size: 0.75em; color: #2c3e50; width: 50px;';
        selectContainer.appendChild(typeLabel);

        const typeSelect = document.createElement('select');
        typeSelect.className = 'filter-type-select';
        typeSelect.style.cssText = 'flex: 1; padding: 4px 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 0.75em; cursor: pointer;';

        Object.keys(filterConfigs).forEach(filterType => {
            const option = document.createElement('option');
            option.value = filterType;
            option.textContent = filterType;
            if (filterType === type) option.selected = true;
            typeSelect.appendChild(option);
        });

        typeSelect.addEventListener('change', (e) => {
            const newType = e.target.value;
            // Recreate with new type
            const index = filters.findIndex(f => f.id === id);
            if (index !== -1) {
                const newFilter = createFilterItem(newType);
                filters[index] = newFilter;
                itemDiv.replaceWith(newFilter.element);
                clearPreset();
                updateFilterDisplay();
            }
        });

        selectContainer.appendChild(typeSelect);
        headerDiv.appendChild(selectContainer);

        const deleteBtn = createRemoveButton();
        deleteBtn.addEventListener('click', () => removeFilter(id));
        headerDiv.appendChild(deleteBtn);

        itemDiv.appendChild(headerDiv);

        // Value slider
        const sliderContainer = document.createElement('div');
        sliderContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';

        const sliderRow = document.createElement('div');
        sliderRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const sliderLabel = document.createElement('label');
        sliderLabel.textContent = 'Valor:';
        sliderLabel.htmlFor = `filter-slider-${id}`;
        sliderLabel.style.cssText = 'width: 50px; font-size: 0.75em; color: #2c3e50;';
        sliderRow.appendChild(sliderLabel);

        const sliderWrapper = document.createElement('div');
        sliderWrapper.style.cssText = 'flex: 1; display: flex; flex-direction: column; gap: 2px;';

        const slider = document.createElement('input');
        slider.id = `filter-slider-${id}`;
        slider.type = 'range';
        slider.min = config.min;
        slider.max = config.max;
        slider.step = config.step;
        slider.value = value;
        slider.style.cssText = 'width: 100%;';
        slider.addEventListener('input', (e) => {
            filterObj.value = parseFloat(e.target.value);
            valueSpan.textContent = e.target.value + config.unit;
            filterObj.filterValue = generateValue();
            clearPreset();
            updateFilterDisplay();
        });
        sliderWrapper.appendChild(slider);

        // Add hue-rotate color bar
        if (type === 'hue-rotate') {
            const colorBar = document.createElement('div');
            // Create gradient reversed to match hue-rotate behavior
            // hue-rotate rotates counter-clockwise on the color wheel
            colorBar.style.cssText = 'height: 8px; border-radius: 4px; background: linear-gradient(to right, ' +
                'hsl(0, 100%, 50%) 0%, ' +      // Red at 0° (no rotation)
                'hsl(330, 100%, 50%) 8.33%, ' + // Magenta-Red at 30°
                'hsl(300, 100%, 50%) 16.67%, ' +// Magenta at 60°
                'hsl(270, 100%, 50%) 25%, ' +   // Blue-Magenta at 90°
                'hsl(240, 100%, 50%) 33.33%, ' +// Blue at 120°
                'hsl(210, 100%, 50%) 41.67%, ' +// Cyan-Blue at 150°
                'hsl(180, 100%, 50%) 50%, ' +   // Cyan at 180°
                'hsl(150, 100%, 50%) 58.33%, ' +// Green-Cyan at 210°
                'hsl(120, 100%, 50%) 66.67%, ' +// Green at 240°
                'hsl(90, 100%, 50%) 75%, ' +    // Yellow-Green at 270°
                'hsl(60, 100%, 50%) 83.33%, ' + // Yellow at 300°
                'hsl(30, 100%, 50%) 91.67%, ' + // Orange at 330°
                'hsl(0, 100%, 50%) 100%' +      // Red at 360° (full rotation)
            '); border: 1px solid #dee2e6;';
            sliderWrapper.appendChild(colorBar);
        }

        sliderRow.appendChild(sliderWrapper);

        const valueSpan = document.createElement('span');
        valueSpan.textContent = value + config.unit;
        valueSpan.style.cssText = 'width: 60px; text-align: right; font-size: 0.75em; font-family: "Courier New", monospace;';
        sliderRow.appendChild(valueSpan);

        sliderContainer.appendChild(sliderRow);
        itemDiv.appendChild(sliderContainer);
        filterObj.element = itemDiv;

        return filterObj;
    }

    function addFilter() {
        const newFilter = createFilterItem();
        filters.push(newFilter);
        filterList.appendChild(newFilter.element);
        clearPreset();
        updateFilterDisplay();
    }

    function removeFilter(id) {
        const index = filters.findIndex(f => f.id === id);
        if (index !== -1) {
            filters[index].element.remove();
            filters.splice(index, 1);
            clearPreset();
            updateFilterDisplay();
        }
    }

    // Event listeners
    if (addFilterBtn) {
        addFilterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addFilter();
        });
    }

    function applyPreset(name) {
        const preset = presets[name];
        mode = preset.mode;
        filterList.replaceChildren();
        filters = preset.filters.map(([type, value]) => createFilterItem(type, value));
        filters.forEach(filter => filterList.append(filter.element));
        if (preset.color) {
            glassColor.value = preset.color;
            glassColor.dataset.colorAlpha = String(preset.alpha);
            glassColor.dispatchEvent(new Event('input', { bubbles: true }));
        }
        section.querySelectorAll('[data-filter-preset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filterPreset === name)));
        updateFilterDisplay();
    }
    section.querySelectorAll('[data-filter-preset]').forEach(button => button.addEventListener('click', () => applyPreset(button.dataset.filterPreset)));
    section.querySelectorAll('[data-filter-mode]').forEach(button => button.addEventListener('click', () => {
        mode = button.dataset.filterMode;
        clearPreset();
        updateFilterDisplay();
    }));
    addColorTransparency(glassColor, 'Color del vidre', { opacity: 28 });
    glassColor.addEventListener('input', () => { clearPreset(); updateFilterDisplay(); });
    const record = workspaceTopics.get('filters');
    record.reset = () => {
        glassColor.value = '#ffffff';
        glassColor.dataset.colorAlpha = '28';
        glassColor.dispatchEvent(new Event('input', { bubbles: true }));
        applyPreset('original');
    };
    record.getSource = () => {
        const filter = filters.map(item => item.filterValue).join(' ') || 'none';
        const sceneCss = `.escena {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 270px;\n  overflow: hidden;\n  background: repeating-conic-gradient(#e7ebf1 0% 25%, #fff 0% 50%) 50% / 20px 20px;\n}`;
        if (mode === 'image') return {
            html: '<div class="escena">\n  <img class="exemple" src="images/image0.jpg" alt="Paisatge">\n</div>',
            css: `${sceneCss}\n\n.exemple {\n  display: block;\n  width: 260px;\n  max-width: 100%;\n  height: 180px;\n  object-fit: cover;\n  filter: ${filter};\n}`
        };
        return {
            html: '<div class="escena">\n  <img class="foto" src="images/image0.jpg" alt="Paisatge">\n  <div class="exemple">\n    <strong>Vidre glaçat</strong>\n    <span>El fons es transforma; el text es manté nítid.</span>\n  </div>\n</div>',
            css: `${sceneCss}\n\n.foto {\n  position: absolute;\n  right: 16px;\n  top: 16px;\n  width: 65%;\n  height: calc(100% - 32px);\n  object-fit: cover;\n}\n\n.exemple {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 12px;\n  box-sizing: border-box;\n  width: 82%;\n  min-height: 180px;\n  padding: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.55);\n  border-radius: 16px;\n  background-color: ${colorPickerValue(glassColor)};\n  color: ${glass.style.color};\n  box-shadow: 0 8px 24px rgba(23, 38, 60, 0.12);\n  backdrop-filter: ${filter};\n}\n\n.exemple strong {\n  font-size: 22px;\n}\n\n.exemple span {\n  font-size: 14px;\n  line-height: 1.5;\n}`
        };
    };
    applyPreset('original');
}

// Cursor controls handlers
function setupCursorControls() {
    const cursorGrid = document.getElementById('cursor-grid');
    const cursorValue = document.getElementById('cursor-value');
    const record = workspaceTopics.get('cursor');
    const demo = document.getElementById('cursor-demo-box');
    const cursorTypes = [
        'auto', 'default', 'none', 'pointer', 'context-menu', 'help',
        'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text',
        'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing',
        'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize',
        's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize',
        'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize',
        'zoom-in', 'zoom-out'
    ];
    let selectedCursor = 'pointer';
    const select = cursor => {
        selectedCursor = cursor;
        cursorValue.textContent = cursor + ';';
        demo.style.cursor = cursor;
        demo.querySelector('strong').textContent = cursor;
        cursorGrid.querySelectorAll('button').forEach(box => {
            const selected = box.dataset.cursor === cursor;
            box.classList.toggle('selected', selected);
            box.setAttribute('aria-pressed', String(selected));
        });
        if (workspaceReady) updateWorkspaceCode();
    };
    cursorTypes.forEach(cursor => {
        const box = document.createElement('button');
        box.type = 'button';
        box.className = 'cursor-tile';
        box.dataset.cursor = cursor;
        box.style.cursor = cursor;
        box.innerHTML = `<img class="cursor-type-icon" src="images/icons/cursor-${cursor}.svg" alt="" aria-hidden="true"><span>${cursor}</span>`;
        box.querySelector('img').draggable = false;
        box.addEventListener('click', () => select(cursor));
        cursorGrid.append(box);
    });
    record.getSource = () => ({
        html: '<div class="exemple">Passa el ratolí per aquesta àrea.</div>',
        css: `.exemple {\n  cursor: ${selectedCursor};\n  padding: 24px;\n  border: 1px solid #bfc6ce;\n  background-color: white;\n  color: #17263c;\n}`
    });
    record.reset = () => select('pointer');
    select('pointer');
}

// Typography controls handlers
function setupTypographyControls() {
    const typographyDemo = document.getElementById('typography-demo');
    const fontFamilySelect = document.getElementById('font-family-select');
    const fontFamilyValue = document.getElementById('font-family-value');
    const fontWeightSelect = document.getElementById('font-weight-select');
    const fontWeightValue = document.getElementById('font-weight-value');
    const fontSizeInput = document.getElementById('font-size-input');
    const fontSizeValue = document.getElementById('font-size-value');
    const fontSizeInitialBtn = document.getElementById('font-size-initial-btn');
    const textColorPicker = document.getElementById('text-color-picker');
    const textColorValue = document.getElementById('text-color-value');
    const textColorInitialBtn = document.getElementById('text-color-initial-btn');

    let isFontSizeInitial = true;
    let isTextColorInitial = false;
    addColorTransparency(textColorPicker, 'Color del text');
    textColorValue.textContent = colorPickerValue(textColorPicker) + ';';

    // Font Family
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', () => {
            const value = fontFamilySelect.value;
            if (typographyDemo) {
                if (value === 'initial') {
                    typographyDemo.style.fontFamily = '';
                } else {
                    typographyDemo.style.fontFamily = value;
                }
            }
            if (fontFamilyValue) {
                // Add quotes if font family has spaces (two or more words)
                const displayValue = value.includes(' ') && value !== 'initial' ? `"${value}"` : value;
                fontFamilyValue.textContent = displayValue + ';';
            }
        });
    }

    // Font Weight
    if (fontWeightSelect) {
        fontWeightSelect.addEventListener('change', () => {
            const value = fontWeightSelect.value;
            if (typographyDemo) {
                if (value === 'initial') {
                    typographyDemo.style.fontWeight = '';
                } else {
                    typographyDemo.style.fontWeight = value;
                }
            }
            if (fontWeightValue) {
                fontWeightValue.textContent = value + ';';
            }
        });
    }

    // Font Size
    if (fontSizeInput) {
        fontSizeInput.addEventListener('input', () => {
            if (!isFontSizeInitial && typographyDemo) {
                const value = fontSizeInput.value.trim();
                typographyDemo.style.fontSize = value || '16px';
                if (fontSizeValue) {
                    fontSizeValue.textContent = (value || '16px') + ';';
                }
            }
        });
    }

    if (fontSizeInitialBtn) {
        fontSizeInitialBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isFontSizeInitial = !isFontSizeInitial;

            if (isFontSizeInitial) {
                fontSizeInitialBtn.classList.add('selected');
                fontSizeInput.disabled = true;
                fontSizeInput.value = 'initial';
                if (typographyDemo) {
                    typographyDemo.style.fontSize = '';
                }
                if (fontSizeValue) {
                    fontSizeValue.textContent = 'initial;';
                }
            } else {
                fontSizeInitialBtn.classList.remove('selected');
                fontSizeInput.disabled = false;
                fontSizeInput.value = '16px';
                const value = '16px';
                if (typographyDemo) {
                    typographyDemo.style.fontSize = value;
                }
                if (fontSizeValue) {
                    fontSizeValue.textContent = value + ';';
                }
            }
        });
    }

    // Text Color
    if (textColorPicker) {
        textColorPicker.addEventListener('input', () => {
            isTextColorInitial = false;
            textColorInitialBtn.classList.remove('selected');
            if (typographyDemo) {
                const value = colorPickerValue(textColorPicker);
                typographyDemo.style.color = value;
                if (textColorValue) {
                    textColorValue.textContent = value + ';';
                }
            }
        });
    }

    if (textColorInitialBtn) {
        textColorInitialBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isTextColorInitial = !isTextColorInitial;

            if (isTextColorInitial) {
                textColorInitialBtn.classList.add('selected');
                textColorPicker.disabled = false;
                if (typographyDemo) {
                    typographyDemo.style.color = '';
                }
                if (textColorValue) {
                    textColorValue.textContent = 'initial;';
                }
            } else {
                textColorInitialBtn.classList.remove('selected');
                textColorPicker.disabled = false;
                const value = colorPickerValue(textColorPicker);
                if (typographyDemo) {
                    typographyDemo.style.color = value;
                }
                if (textColorValue) {
                    textColorValue.textContent = value + ';';
                }
            }
        });
    }

    // Text Align
    const textAlignButtons = document.querySelectorAll('.text-align-btn');
    const textAlignValue = document.getElementById('text-align-value');
    textAlignButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const align = btn.dataset.align;

            textAlignButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            if (typographyDemo) {
                if (align === 'initial') {
                    typographyDemo.style.textAlign = '';
                } else {
                    typographyDemo.style.textAlign = align;
                }
            }
            if (textAlignValue) {
                textAlignValue.textContent = align + ';';
            }
        });
    });

    // Font Style
    const fontStyleButtons = document.querySelectorAll('.font-style-btn');
    const fontStyleValue = document.getElementById('font-style-value');
    fontStyleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const style = btn.dataset.style;

            fontStyleButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            if (typographyDemo) {
                if (style === 'initial') {
                    typographyDemo.style.fontStyle = '';
                } else {
                    typographyDemo.style.fontStyle = style;
                }
            }
            if (fontStyleValue) {
                fontStyleValue.textContent = style + ';';
            }
        });
    });

    // Text Transform
    const textTransformButtons = document.querySelectorAll('.text-transform-btn');
    const textTransformValue = document.getElementById('text-transform-value');
    textTransformButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const transform = btn.dataset.transform;

            textTransformButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            if (typographyDemo) {
                if (transform === 'initial') {
                    typographyDemo.style.textTransform = '';
                } else {
                    typographyDemo.style.textTransform = transform;
                }
            }
            if (textTransformValue) {
                textTransformValue.textContent = transform + ';';
            }
        });
    });

    // Text Decoration
    const textDecorationButtons = document.querySelectorAll('.text-decoration-btn');
    const textDecorationValue = document.getElementById('text-decoration-value');
    textDecorationButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const decoration = btn.dataset.decoration;

            textDecorationButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            if (typographyDemo) {
                if (decoration === 'initial') {
                    typographyDemo.style.textDecoration = '';
                } else {
                    typographyDemo.style.textDecoration = decoration;
                }
            }
            if (textDecorationValue) {
                textDecorationValue.textContent = decoration + ';';
            }
        });
    });
}

function oldShowMarginExample() {
    const container = document.getElementById('margin-example');
    const marginInput = document.getElementById('margin-input');
    const marginTopInput = document.getElementById('margin-top-input');
    const marginRightInput = document.getElementById('margin-right-input');
    const marginBottomInput = document.getElementById('margin-bottom-input');
    const marginLeftInput = document.getElementById('margin-left-input');

    // Get values
    const marginAll = marginInput.value.trim();
    const marginTop = marginTopInput.value.trim();
    const marginRight = marginRightInput.value.trim();
    const marginBottom = marginBottomInput.value.trim();
    const marginLeft = marginLeftInput.value.trim();

    // Parse pixel values for visualization
    function parsePx(value) {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    }

    // CSS cascade: individual properties override shorthand
    // Start with margin shorthand, then override with individual values
    let finalTop, finalRight, finalBottom, finalLeft;

    if (marginAll) {
        // Parse margin shorthand (can be 1-4 values)
        const parts = marginAll.split(/\s+/);
        if (parts.length === 1) {
            finalTop = finalRight = finalBottom = finalLeft = parts[0];
        } else if (parts.length === 2) {
            finalTop = finalBottom = parts[0];
            finalRight = finalLeft = parts[1];
        } else if (parts.length === 3) {
            finalTop = parts[0];
            finalRight = finalLeft = parts[1];
            finalBottom = parts[2];
        } else {
            finalTop = parts[0];
            finalRight = parts[1];
            finalBottom = parts[2];
            finalLeft = parts[3];
        }
    } else {
        finalTop = finalRight = finalBottom = finalLeft = '0';
    }

    // Override with individual properties (CSS cascade rule)
    if (marginTop) finalTop = marginTop;
    if (marginRight) finalRight = marginRight;
    if (marginBottom) finalBottom = marginBottom;
    if (marginLeft) finalLeft = marginLeft;

    // Convert to pixels for drawing
    let mTop = parsePx(finalTop);
    let mRight = parsePx(finalRight);
    let mBottom = parsePx(finalBottom);
    let mLeft = parsePx(finalLeft);

    // Track which margins are "auto" for special rendering
    const isAutoTop = finalTop.toLowerCase() === 'auto';
    const isAutoRight = finalRight.toLowerCase() === 'auto';
    const isAutoBottom = finalBottom.toLowerCase() === 'auto';
    const isAutoLeft = finalLeft.toLowerCase() === 'auto';

    // Build description
    let description;
    if (marginAll && !marginTop && !marginRight && !marginBottom && !marginLeft) {
        description = `margin: ${marginAll}`;
    } else if (!marginAll && (marginTop || marginRight || marginBottom || marginLeft)) {
        description = `margin: ${finalTop} ${finalRight} ${finalBottom} ${finalLeft}`;
    } else {
        // Both margin and individual properties
        let parts = [`margin: ${marginAll}`];
        if (marginTop) parts.push(`margin-top: ${marginTop}`);
        if (marginRight) parts.push(`margin-right: ${marginRight}`);
        if (marginBottom) parts.push(`margin-bottom: ${marginBottom}`);
        if (marginLeft) parts.push(`margin-left: ${marginLeft}`);
        description = parts.join('; ');
    }

    // Create shorthand hint
    let shorthandHint = '';
    if (!marginAll && (marginTop || marginRight || marginBottom || marginLeft)) {
        const values = [finalTop, finalRight, finalBottom, finalLeft];
        const uniqueValues = [...new Set(values)];

        if (uniqueValues.length === 1 && uniqueValues[0] !== '0') {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Forma abreujada: margin: ${uniqueValues[0]}</div>`;
        } else if (finalTop === finalBottom && finalRight === finalLeft && finalTop !== '0') {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Forma abreujada: margin: ${finalTop} ${finalRight}</div>`;
        } else if (finalRight === finalLeft && (finalTop !== '0' || finalRight !== '0' || finalBottom !== '0')) {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Forma abreujada: margin: ${finalTop} ${finalRight} ${finalBottom}</div>`;
        } else if (finalTop !== '0' || finalRight !== '0' || finalBottom !== '0' || finalLeft !== '0') {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Forma abreujada: margin: ${finalTop} ${finalRight} ${finalBottom} ${finalLeft} (superior, dret, inferior, esquerre)</div>`;
        }
    }

    // Check if any auto margins are used
    const hasAutoLeftRight = isAutoLeft || isAutoRight;
    const hasAutoTopBottom = isAutoTop || isAutoBottom;

    let marginLegend = '';
    if (hasAutoLeftRight && hasAutoTopBottom) {
        marginLegend = '(taronja: marge fix; verd: auto horitzontal; lila: auto vertical → 0)';
    } else if (hasAutoLeftRight) {
        marginLegend = '(taronja: marge fix; verd: marge auto)';
    } else if (hasAutoTopBottom) {
        marginLegend = '(taronja: marge fix; lila: auto es calcula com a 0)';
    } else {
        marginLegend = '(la zona taronja representa el marge)';
    }

    container.innerHTML = `
        <canvas id="margin-canvas" width="300" height="125" style="width: 100%; height: 125px; border: 1px solid #2c3e50; border-radius: 4px; background: #fff;"></canvas>
        <div class="mini-description">${description} ${marginLegend}${shorthandHint}</div>
    `;

    // Draw on canvas with DPI awareness
    const canvas = document.getElementById('margin-canvas');
    const ctx = canvas.getContext('2d');

    // Get DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size accounting for DPI
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context to match DPI
    ctx.scale(dpr, dpr);

    // Use CSS size for calculations
    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate box dimensions
    const boxWidth = 80;
    const boxHeight = 60;
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw margin areas (orange for normal, green for auto)

    // Top margin
    if (isAutoTop) {
        // Draw a small indicator showing auto computed to 0
        ctx.fillStyle = 'rgba(156, 39, 176, 0.2)'; // Purple tint for auto=0
        ctx.strokeStyle = '#9c27b0';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        // Draw a thin line at the top of the box
        ctx.beginPath();
        ctx.moveTo(centerX - boxWidth/2, centerY - boxHeight/2);
        ctx.lineTo(centerX + boxWidth/2, centerY - boxHeight/2);
        ctx.stroke();
        ctx.setLineDash([]);
    } else if (mTop > 0) {
        ctx.fillStyle = 'rgba(255, 193, 7, 0.4)';
        ctx.fillRect(centerX - boxWidth/2 - mLeft, centerY - boxHeight/2 - mTop, boxWidth + mLeft + mRight, mTop);
    }

    // Bottom margin
    if (isAutoBottom) {
        // Draw a small indicator showing auto computed to 0
        ctx.fillStyle = 'rgba(156, 39, 176, 0.2)'; // Purple tint for auto=0
        ctx.strokeStyle = '#9c27b0';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        // Draw a thin line at the bottom of the box
        ctx.beginPath();
        ctx.moveTo(centerX - boxWidth/2, centerY + boxHeight/2);
        ctx.lineTo(centerX + boxWidth/2, centerY + boxHeight/2);
        ctx.stroke();
        ctx.setLineDash([]);
    } else if (mBottom > 0) {
        ctx.fillStyle = 'rgba(255, 193, 7, 0.4)';
        ctx.fillRect(centerX - boxWidth/2 - mLeft, centerY + boxHeight/2, boxWidth + mLeft + mRight, mBottom);
    }
    // Left margin (normal or auto)
    if (isAutoLeft) {
        // Draw auto margin from left edge of canvas to left edge of box
        const autoLeftDistance = centerX - boxWidth/2;
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'; // Green for auto
        ctx.fillRect(0, centerY - boxHeight/2, autoLeftDistance, boxHeight);

        // Draw dashed line to indicate auto
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(0, centerY - boxHeight/2, autoLeftDistance, boxHeight);
        ctx.setLineDash([]); // Reset dash
    } else if (mLeft > 0) {
        ctx.fillStyle = 'rgba(255, 193, 7, 0.4)';
        ctx.fillRect(centerX - boxWidth/2 - mLeft, centerY - boxHeight/2, mLeft, boxHeight);
    }

    // Right margin (normal or auto)
    if (isAutoRight) {
        // Draw auto margin from right edge of box to right edge of canvas
        const autoRightDistance = width - (centerX + boxWidth/2);
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'; // Green for auto
        ctx.fillRect(centerX + boxWidth/2, centerY - boxHeight/2, autoRightDistance, boxHeight);

        // Draw dashed line to indicate auto
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(centerX + boxWidth/2, centerY - boxHeight/2, autoRightDistance, boxHeight);
        ctx.setLineDash([]); // Reset dash
    } else if (mRight > 0) {
        ctx.fillStyle = 'rgba(255, 193, 7, 0.4)';
        ctx.fillRect(centerX + boxWidth/2, centerY - boxHeight/2, mRight, boxHeight);
    }

    // Draw the box (blue gradient)
    const gradient = ctx.createLinearGradient(centerX - boxWidth/2, centerY - boxHeight/2, centerX + boxWidth/2, centerY + boxHeight/2);
    gradient.addColorStop(0, '#2196f3');
    gradient.addColorStop(1, '#4fc3f7');
    ctx.fillStyle = gradient;
    ctx.fillRect(centerX - boxWidth/2, centerY - boxHeight/2, boxWidth, boxHeight);

    // Draw box border
    ctx.strokeStyle = '#1976d2';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - boxWidth/2, centerY - boxHeight/2, boxWidth, boxHeight);

    // Draw text on box
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Box', centerX, centerY);

    // Draw margin labels
    ctx.font = '10px Arial';

    // Top margin label
    if (isAutoTop) {
        ctx.fillStyle = '#9c27b0'; // Purple for auto=0
        ctx.fillText('auto (0px)', centerX, centerY - boxHeight/2 - 10);
    } else if (mTop > 5) {
        ctx.fillStyle = '#666';
        ctx.fillText(finalTop, centerX, centerY - boxHeight/2 - mTop/2);
    }

    // Bottom margin label
    if (isAutoBottom) {
        ctx.fillStyle = '#9c27b0'; // Purple for auto=0
        ctx.fillText('auto (0px)', centerX, centerY + boxHeight/2 + 10);
    } else if (mBottom > 5) {
        ctx.fillStyle = '#666';
        ctx.fillText(finalBottom, centerX, centerY + boxHeight/2 + mBottom/2);
    }

    // Left margin label (show auto or value)
    if (isAutoLeft) {
        const autoLeftDistance = centerX - boxWidth/2;
        ctx.fillStyle = '#4caf50'; // Green for auto
        ctx.save();
        ctx.translate(autoLeftDistance/2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`auto (${Math.round(autoLeftDistance)}px)`, 0, 0);
        ctx.restore();
    } else if (mLeft > 5) {
        ctx.fillStyle = '#666';
        ctx.save();
        ctx.translate(centerX - boxWidth/2 - mLeft/2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(finalLeft, 0, 0);
        ctx.restore();
    }

    // Right margin label (show auto or value)
    if (isAutoRight) {
        const autoRightDistance = width - (centerX + boxWidth/2);
        ctx.fillStyle = '#4caf50'; // Green for auto
        ctx.save();
        ctx.translate(centerX + boxWidth/2 + autoRightDistance/2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`auto (${Math.round(autoRightDistance)}px)`, 0, 0);
        ctx.restore();
    } else if (mRight > 5) {
        ctx.fillStyle = '#666';
        ctx.save();
        ctx.translate(centerX + boxWidth/2 + mRight/2, centerY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(finalRight, 0, 0);
        ctx.restore();
    }
}

function setupParagraphControls() {
    const paragraphDemo = document.getElementById('paragraph-demo');

    // User Select
    const userSelectSelect = document.getElementById('user-select-select');
    const userSelectValue = document.getElementById('user-select-value');

    if (userSelectSelect) {
        userSelectSelect.addEventListener('change', () => {
            const value = userSelectSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.userSelect = '';
                } else {
                    paragraphDemo.style.userSelect = value;
                }
            }
            if (userSelectValue) {
                userSelectValue.textContent = value + ';';
            }
        });
    }

    // Letter Spacing
    const letterSpacingInput = document.getElementById('letter-spacing-input');
    const letterSpacingValue = document.getElementById('letter-spacing-value');
    const letterSpacingInitialBtn = document.getElementById('letter-spacing-initial-btn');
    let isLetterSpacingInitial = true;

    if (letterSpacingInput) {
        letterSpacingInput.addEventListener('input', () => {
            const value = letterSpacingInput.value.trim();
            if (paragraphDemo && !isLetterSpacingInitial) {
                paragraphDemo.style.letterSpacing = value;
            }
            if (letterSpacingValue) {
                letterSpacingValue.textContent = value + ';';
            }
        });
    }

    if (letterSpacingInitialBtn) {
        letterSpacingInitialBtn.addEventListener('click', () => {
            isLetterSpacingInitial = !isLetterSpacingInitial;

            if (isLetterSpacingInitial) {
                letterSpacingInitialBtn.classList.add('selected');
                if (letterSpacingInput) {
                    letterSpacingInput.disabled = true;
                    letterSpacingInput.value = 'initial';
                }
                if (paragraphDemo) paragraphDemo.style.letterSpacing = '';
                if (letterSpacingValue) letterSpacingValue.textContent = 'initial;';
            } else {
                letterSpacingInitialBtn.classList.remove('selected');
                if (letterSpacingInput) {
                    letterSpacingInput.disabled = false;
                    letterSpacingInput.value = '2px';
                    const value = '2px';
                    if (paragraphDemo) paragraphDemo.style.letterSpacing = value;
                    if (letterSpacingValue) letterSpacingValue.textContent = value + ';';
                }
            }
        });
    }

    // Word Spacing
    const wordSpacingInput = document.getElementById('word-spacing-input');
    const wordSpacingValue = document.getElementById('word-spacing-value');
    const wordSpacingInitialBtn = document.getElementById('word-spacing-initial-btn');
    let isWordSpacingInitial = true;

    if (wordSpacingInput) {
        wordSpacingInput.addEventListener('input', () => {
            const value = wordSpacingInput.value.trim();
            if (paragraphDemo && !isWordSpacingInitial) {
                paragraphDemo.style.wordSpacing = value;
            }
            if (wordSpacingValue) {
                wordSpacingValue.textContent = value + ';';
            }
        });
    }

    if (wordSpacingInitialBtn) {
        wordSpacingInitialBtn.addEventListener('click', () => {
            isWordSpacingInitial = !isWordSpacingInitial;

            if (isWordSpacingInitial) {
                wordSpacingInitialBtn.classList.add('selected');
                if (wordSpacingInput) {
                    wordSpacingInput.disabled = true;
                    wordSpacingInput.value = 'initial';
                }
                if (paragraphDemo) paragraphDemo.style.wordSpacing = '';
                if (wordSpacingValue) wordSpacingValue.textContent = 'initial;';
            } else {
                wordSpacingInitialBtn.classList.remove('selected');
                if (wordSpacingInput) {
                    wordSpacingInput.disabled = false;
                    wordSpacingInput.value = '5px';
                    const value = '5px';
                    if (paragraphDemo) paragraphDemo.style.wordSpacing = value;
                    if (wordSpacingValue) wordSpacingValue.textContent = value + ';';
                }
            }
        });
    }

    // Line Height
    const lineHeightInput = document.getElementById('line-height-input');
    const lineHeightValue = document.getElementById('line-height-value');
    const lineHeightInitialBtn = document.getElementById('line-height-initial-btn');
    let isLineHeightInitial = true;

    if (lineHeightInput) {
        lineHeightInput.addEventListener('input', () => {
            const value = lineHeightInput.value.trim();
            if (paragraphDemo && !isLineHeightInitial) {
                paragraphDemo.style.lineHeight = value;
            }
            if (lineHeightValue) {
                lineHeightValue.textContent = value + ';';
            }
        });
    }

    if (lineHeightInitialBtn) {
        lineHeightInitialBtn.addEventListener('click', () => {
            isLineHeightInitial = !isLineHeightInitial;

            if (isLineHeightInitial) {
                lineHeightInitialBtn.classList.add('selected');
                if (lineHeightInput) {
                    lineHeightInput.disabled = true;
                    lineHeightInput.value = 'initial';
                }
                if (paragraphDemo) paragraphDemo.style.lineHeight = '';
                if (lineHeightValue) lineHeightValue.textContent = 'initial;';
            } else {
                lineHeightInitialBtn.classList.remove('selected');
                if (lineHeightInput) {
                    lineHeightInput.disabled = false;
                    lineHeightInput.value = '1.5';
                    const value = '1.5';
                    if (paragraphDemo) paragraphDemo.style.lineHeight = value;
                    if (lineHeightValue) lineHeightValue.textContent = value + ';';
                }
            }
        });
    }

    // Direction
    const directionSelect = document.getElementById('direction-select');
    const directionValue = document.getElementById('direction-value');

    if (directionSelect) {
        directionSelect.addEventListener('change', () => {
            const value = directionSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.direction = '';
                } else {
                    paragraphDemo.style.direction = value;
                }
            }
            if (directionValue) {
                directionValue.textContent = value + ';';
            }
        });
    }

    // Text Indent
    const textIndentInput = document.getElementById('text-indent-input');
    const textIndentValue = document.getElementById('text-indent-value');
    const textIndentInitialBtn = document.getElementById('text-indent-initial-btn');
    let isTextIndentInitial = true;

    if (textIndentInput) {
        textIndentInput.addEventListener('input', () => {
            const value = textIndentInput.value.trim();
            if (paragraphDemo && !isTextIndentInitial) {
                paragraphDemo.style.textIndent = value;
            }
            if (textIndentValue) {
                textIndentValue.textContent = value + ';';
            }
        });
    }

    if (textIndentInitialBtn) {
        textIndentInitialBtn.addEventListener('click', () => {
            isTextIndentInitial = !isTextIndentInitial;

            if (isTextIndentInitial) {
                textIndentInitialBtn.classList.add('selected');
                if (textIndentInput) {
                    textIndentInput.disabled = true;
                    textIndentInput.value = 'initial';
                }
                if (paragraphDemo) paragraphDemo.style.textIndent = '';
                if (textIndentValue) textIndentValue.textContent = 'initial;';
            } else {
                textIndentInitialBtn.classList.remove('selected');
                if (textIndentInput) {
                    textIndentInput.disabled = false;
                    textIndentInput.value = '20px';
                    const value = '20px';
                    if (paragraphDemo) paragraphDemo.style.textIndent = value;
                    if (textIndentValue) textIndentValue.textContent = value + ';';
                }
            }
        });
    }

    // Text Overflow
    const textOverflowSelect = document.getElementById('text-overflow-select');
    const textOverflowValue = document.getElementById('text-overflow-value');

    if (textOverflowSelect) {
        textOverflowSelect.addEventListener('change', () => {
            const value = textOverflowSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.textOverflow = '';
                } else {
                    paragraphDemo.style.textOverflow = value;
                }
            }
            if (textOverflowValue) {
                textOverflowValue.textContent = value + ';';
            }
        });
    }

    // Word Break
    const wordBreakSelect = document.getElementById('word-break-select');
    const wordBreakValue = document.getElementById('word-break-value');

    if (wordBreakSelect) {
        wordBreakSelect.addEventListener('change', () => {
            const value = wordBreakSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.wordBreak = '';
                } else {
                    paragraphDemo.style.wordBreak = value;
                }
            }
            if (wordBreakValue) {
                wordBreakValue.textContent = value + ';';
            }
        });
    }

    // Overflow Wrap
    const overflowWrapSelect = document.getElementById('overflow-wrap-select');
    const overflowWrapValue = document.getElementById('overflow-wrap-value');

    if (overflowWrapSelect) {
        overflowWrapSelect.addEventListener('change', () => {
            const value = overflowWrapSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.overflowWrap = '';
                } else {
                    paragraphDemo.style.overflowWrap = value;
                }
            }
            if (overflowWrapValue) {
                overflowWrapValue.textContent = value + ';';
            }
        });
    }

    // White Space
    const whiteSpaceSelect = document.getElementById('white-space-select');
    const whiteSpaceValue = document.getElementById('white-space-value');

    if (whiteSpaceSelect) {
        whiteSpaceSelect.addEventListener('change', () => {
            const value = whiteSpaceSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.whiteSpace = '';
                } else {
                    paragraphDemo.style.whiteSpace = value;
                }
            }
            if (whiteSpaceValue) {
                whiteSpaceValue.textContent = value + ';';
            }
        });
    }

    // Writing Mode
    const writingModeSelect = document.getElementById('writing-mode-select');
    const writingModeValue = document.getElementById('writing-mode-value');

    if (writingModeSelect) {
        writingModeSelect.addEventListener('change', () => {
            const value = writingModeSelect.value;
            if (paragraphDemo) {
                if (value === 'initial') {
                    paragraphDemo.style.writingMode = '';
                } else {
                    paragraphDemo.style.writingMode = value;
                }
            }
            if (writingModeValue) {
                writingModeValue.textContent = value + ';';
            }
        });
    }
}

// Paragraph Columns controls handlers
function setupParagraphColumnsControls() {
    const columnsDemo = document.getElementById('columns-demo');

    // Column Count
    const columnCountInput = document.getElementById('column-count-input');
    const columnCountValue = document.getElementById('column-count-value');
    const columnCountInitialBtn = document.getElementById('column-count-initial-btn');
    let isColumnCountInitial = true;

    if (columnCountInput) {
        columnCountInput.addEventListener('input', () => {
            if (!isColumnCountInitial) {
                const value = columnCountInput.value;
                if (columnsDemo) {
                    columnsDemo.style.columnCount = value;
                }
                if (columnCountValue) {
                    columnCountValue.textContent = value + ';';
                }
            }
        });
    }

    if (columnCountInitialBtn) {
        columnCountInitialBtn.addEventListener('click', () => {
            isColumnCountInitial = !isColumnCountInitial;

            if (isColumnCountInitial) {
                columnCountInitialBtn.classList.add('selected');
                if (columnCountInput) {
                    columnCountInput.disabled = true;
                    columnCountInput.value = '0';
                }
                if (columnsDemo) columnsDemo.style.columnCount = '';
                if (columnCountValue) columnCountValue.textContent = 'initial;';
            } else {
                columnCountInitialBtn.classList.remove('selected');
                if (columnCountInput) {
                    columnCountInput.disabled = false;
                    columnCountInput.value = '2';
                    const value = '2';
                    if (columnsDemo) columnsDemo.style.columnCount = value;
                    if (columnCountValue) columnCountValue.textContent = value + ';';
                }
            }
        });
    }

    // Column Width
    const columnWidthInput = document.getElementById('column-width-input');
    const columnWidthValue = document.getElementById('column-width-value');
    const columnWidthInitialBtn = document.getElementById('column-width-initial-btn');
    let isColumnWidthInitial = true;

    if (columnWidthInput) {
        columnWidthInput.addEventListener('input', () => {
            if (!isColumnWidthInitial) {
                const value = columnWidthInput.value.trim();
                if (columnsDemo) {
                    columnsDemo.style.columnWidth = value;
                }
                if (columnWidthValue) {
                    columnWidthValue.textContent = value + ';';
                }
            }
        });
    }

    if (columnWidthInitialBtn) {
        columnWidthInitialBtn.addEventListener('click', () => {
            isColumnWidthInitial = !isColumnWidthInitial;

            if (isColumnWidthInitial) {
                columnWidthInitialBtn.classList.add('selected');
                if (columnWidthInput) {
                    columnWidthInput.disabled = true;
                    columnWidthInput.value = 'initial';
                }
                if (columnsDemo) columnsDemo.style.columnWidth = '';
                if (columnWidthValue) columnWidthValue.textContent = 'initial;';
            } else {
                columnWidthInitialBtn.classList.remove('selected');
                if (columnWidthInput) {
                    columnWidthInput.disabled = false;
                    columnWidthInput.value = '150px';
                    const value = '150px';
                    if (columnsDemo) columnsDemo.style.columnWidth = value;
                    if (columnWidthValue) columnWidthValue.textContent = value + ';';
                }
            }
        });
    }

    // Column Gap
    const columnGapInput = document.getElementById('column-gap-input');
    const columnGapValue = document.getElementById('column-gap-value');
    const columnGapInitialBtn = document.getElementById('column-gap-initial-btn');
    let isColumnGapInitial = true;

    if (columnGapInput) {
        columnGapInput.addEventListener('input', () => {
            if (!isColumnGapInitial) {
                const value = columnGapInput.value.trim();
                if (columnsDemo) {
                    columnsDemo.style.columnGap = value;
                }
                if (columnGapValue) {
                    columnGapValue.textContent = value + ';';
                }
            }
        });
    }

    if (columnGapInitialBtn) {
        columnGapInitialBtn.addEventListener('click', () => {
            isColumnGapInitial = !isColumnGapInitial;

            if (isColumnGapInitial) {
                columnGapInitialBtn.classList.add('selected');
                if (columnGapInput) {
                    columnGapInput.disabled = true;
                    columnGapInput.value = 'initial';
                }
                if (columnsDemo) columnsDemo.style.columnGap = '';
                if (columnGapValue) columnGapValue.textContent = 'initial;';
            } else {
                columnGapInitialBtn.classList.remove('selected');
                if (columnGapInput) {
                    columnGapInput.disabled = false;
                    columnGapInput.value = '50px';
                    const value = '50px';
                    if (columnsDemo) columnsDemo.style.columnGap = value;
                    if (columnGapValue) columnGapValue.textContent = value + ';';
                }
            }
        });
    }

    // Column Rule Style
    const columnRuleStyleButtons = document.querySelectorAll('.column-rule-style-btn');
    const columnRuleStyleValue = document.getElementById('column-rule-style-value');

    columnRuleStyleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const ruleStyle = button.dataset.ruleStyle;

            // Update selected state
            columnRuleStyleButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Update value display
            if (columnRuleStyleValue) {
                columnRuleStyleValue.textContent = ruleStyle + ';';
            }

            // Apply style
            if (columnsDemo) {
                if (ruleStyle === 'initial') {
                    columnsDemo.style.columnRuleStyle = '';
                } else {
                    columnsDemo.style.columnRuleStyle = ruleStyle;
                }
            }
        });
    });

    // Column Rule Width
    const columnRuleWidthInput = document.getElementById('column-rule-width-input');
    const columnRuleWidthValue = document.getElementById('column-rule-width-value');
    const columnRuleWidthInitialBtn = document.getElementById('column-rule-width-initial-btn');
    let isColumnRuleWidthInitial = true;

    if (columnRuleWidthInput) {
        columnRuleWidthInput.addEventListener('input', () => {
            if (!isColumnRuleWidthInitial) {
                const value = columnRuleWidthInput.value.trim();
                if (columnsDemo) {
                    columnsDemo.style.columnRuleWidth = value;
                }
                if (columnRuleWidthValue) {
                    columnRuleWidthValue.textContent = value + ';';
                }
            }
        });
    }

    if (columnRuleWidthInitialBtn) {
        columnRuleWidthInitialBtn.addEventListener('click', () => {
            isColumnRuleWidthInitial = !isColumnRuleWidthInitial;

            if (isColumnRuleWidthInitial) {
                columnRuleWidthInitialBtn.classList.add('selected');
                if (columnRuleWidthInput) {
                    columnRuleWidthInput.disabled = true;
                    columnRuleWidthInput.value = 'initial';
                }
                if (columnsDemo) columnsDemo.style.columnRuleWidth = '';
                if (columnRuleWidthValue) columnRuleWidthValue.textContent = 'initial;';
            } else {
                columnRuleWidthInitialBtn.classList.remove('selected');
                if (columnRuleWidthInput) {
                    columnRuleWidthInput.disabled = false;
                    columnRuleWidthInput.value = '5px';
                    const value = '5px';
                    if (columnsDemo) columnsDemo.style.columnRuleWidth = value;
                    if (columnRuleWidthValue) columnRuleWidthValue.textContent = value + ';';
                }
            }
        });
    }

    // Column Rule Color
    const columnRuleColorPicker = document.getElementById('column-rule-color-picker');
    const columnRuleColorValue = document.getElementById('column-rule-color-value');
    const columnRuleColorInitialBtn = document.getElementById('column-rule-color-initial-btn');
    let isColumnRuleColorInitial = true;
    columnRuleColorPicker.disabled = false;
    addColorTransparency(columnRuleColorPicker, 'Color de la línia entre columnes');

    if (columnRuleColorPicker) {
        columnRuleColorPicker.addEventListener('input', () => {
            isColumnRuleColorInitial = false;
            columnRuleColorInitialBtn.classList.remove('selected');
            const value = colorPickerValue(columnRuleColorPicker);
            if (columnsDemo) {
                columnsDemo.style.columnRuleColor = value;
            }
            if (columnRuleColorValue) {
                columnRuleColorValue.textContent = value + ';';
            }
        });
    }

    if (columnRuleColorInitialBtn) {
        columnRuleColorInitialBtn.addEventListener('click', () => {
            isColumnRuleColorInitial = !isColumnRuleColorInitial;

            if (isColumnRuleColorInitial) {
                columnRuleColorInitialBtn.classList.add('selected');
                if (columnRuleColorPicker) {
                    columnRuleColorPicker.disabled = false;
                }
                if (columnsDemo) columnsDemo.style.columnRuleColor = '';
                if (columnRuleColorValue) columnRuleColorValue.textContent = 'initial;';
            } else {
                columnRuleColorInitialBtn.classList.remove('selected');
                if (columnRuleColorPicker) {
                    columnRuleColorPicker.disabled = false;
                    const value = colorPickerValue(columnRuleColorPicker);
                    if (columnsDemo) columnsDemo.style.columnRuleColor = value;
                    if (columnRuleColorValue) columnRuleColorValue.textContent = value + ';';
                }
            }
        });
    }

    // Column Span
    const columnSpanSelect = document.getElementById('column-span-select');
    const columnSpanValue = document.getElementById('column-span-value');

    if (columnSpanSelect) {
        columnSpanSelect.addEventListener('change', () => {
            const value = columnSpanSelect.value;
            if (columnsDemo) {
                if (value === 'initial') {
                    columnsDemo.style.columnSpan = '';
                } else {
                    columnsDemo.style.columnSpan = value;
                }
            }
            if (columnSpanValue) {
                columnSpanValue.textContent = value + ';';
            }
        });
    }
}

