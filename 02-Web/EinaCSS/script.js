// Smooth animation for details/summary elements
document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('details.section');

    details.forEach(detail => {
        const summary = detail.querySelector('summary');
        const content = detail.querySelector('.section-content');

        // Store the animation so we can cancel it if needed
        let animation = null;
        let isClosing = false;
        let isExpanding = false;

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            // Check if the element is being closed or is already closed
            if (isClosing || !detail.open) {
                open();
            } else if (isExpanding || detail.open) {
                close();
            }
        });

        function close() {
            isClosing = true;

            const startHeight = detail.offsetHeight;
            const endHeight = summary.offsetHeight;

            if (animation) {
                animation.cancel();
            }

            animation = detail.animate({
                height: [startHeight + 'px', endHeight + 'px']
            }, {
                duration: 300,
                easing: 'ease-out'
            });

            animation.onfinish = () => {
                detail.removeAttribute('open');
                isClosing = false;
                animation = null;
                detail.style.height = '';
                detail.style.overflow = '';
            };

            animation.oncancel = () => {
                isClosing = false;
            };
        }

        function open() {
            detail.style.height = detail.offsetHeight + 'px';
            detail.open = true;

            window.requestAnimationFrame(() => {
                isExpanding = true;

                const startHeight = detail.offsetHeight;
                const endHeight = summary.offsetHeight + content.offsetHeight;

                if (animation) {
                    animation.cancel();
                }

                animation = detail.animate({
                    height: [startHeight + 'px', endHeight + 'px']
                }, {
                    duration: 300,
                    easing: 'ease-out'
                });

                animation.onfinish = () => {
                    detail.style.height = '';
                    detail.style.overflow = '';
                    isExpanding = false;
                    animation = null;
                };

                animation.oncancel = () => {
                    isExpanding = false;
                };
            });
        }
    });

    // Handle property button clicks
    setupPropertyButtons();
    setupFlexButtons();
    setupBoxModelInputs();
    setupSizeInputs();
    setupOverflowButtons();
    setupShadowControls();
    setupBackgroundControls();
    setupOpacityControls();
    setupTransformControls();
    setupTransitionControls();
    setupFilterControls();
});

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
            document.getElementById('display-value').textContent = displayValue;

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
            currentFlexDirection = direction;
            currentFlexSettings.direction = direction;

            // Remove selected from siblings
            btn.parentElement.querySelectorAll('.property-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update value display
            document.getElementById('flex-direction-value').textContent = direction;

            // Update icons based on direction
            if (direction !== 'initial') {
                updateFlexIcons(direction);
            }

            // Show example for this property
            showFlexDirectionExample(direction);
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
            document.getElementById('align-items-value').textContent = btn.dataset.align;

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
            document.getElementById('justify-content-row-value').textContent = btn.dataset.justify;

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
            document.getElementById('justify-content-column-value').textContent = btn.dataset.justify;

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
            document.getElementById('flex-wrap-value').textContent = btn.dataset.wrap;

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
            document.getElementById('align-content-value').textContent = btn.dataset.alignContent;

            showAlignContentExample(btn.dataset.alignContent);
        });
    });
}

// Helper function to create mini example boxes
function createMiniExample(description = '') {
    return `
        ${description ? `<div class="mini-description">${description}</div>` : ''}
        <div class="mini-outer">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
        </div>
    `;
}

// Show display example
function showDisplayExample(displayValue) {
    const container = document.getElementById('display-example');

    const descriptions = {
        'initial': 'Resets to default value (usually inline or block)',
        'block': 'Each item takes full width and starts on new line',
        'inline': 'Items flow with text, width/height ignored',
        'inline-block': 'Items flow inline but respect width/height',
        'flex': 'Container uses flexbox layout system',
        'contents': 'Container box disappears, children remain',
        'none': 'Elements completely hidden (items 1 and 3 hidden)'
    };

    // Special handling for display: none
    if (displayValue === 'none') {
        container.innerHTML = `
            <div class="mini-outer" style="display: flex;">
                <div class="mini-item item-2" style="display: block;">2</div>
            </div>
            <div class="mini-description">${descriptions[displayValue]}</div>
        `;
        return;
    }

    // Special handling for initial
    if (displayValue === 'initial') {
        container.innerHTML = `
            <div class="mini-outer">
                <div class="mini-item item-1">1</div>
                <div class="mini-item item-2">2</div>
                <div class="mini-item item-3">3</div>
            </div>
            <div class="mini-description">${descriptions[displayValue]}</div>
        `;
        return;
    }

    // Create the HTML structure
    container.innerHTML = `
        <div class="mini-outer">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
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
    if (displayValue === 'block') {
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
        'initial': 'Resets to default value (row)',
        'row': 'Items arranged horizontally from left to right',
        'column': 'Items stacked vertically from top to bottom',
        'row-reverse': 'Items arranged horizontally from right to left',
        'column-reverse': 'Items stacked vertically from bottom to top'
    };

    const actualDirection = direction === 'initial' ? 'row' : direction;

    // Create a unique example for each direction
    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${actualDirection};">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
        </div>
        <div class="mini-description">${descriptions[direction]}</div>
    `;
}

// Show align-items example
function showAlignItemsExample(align) {
    const container = document.getElementById('align-items-example');

    const descriptions = {
        'initial': 'Resets to default value (start)',
        'start': 'Items aligned to the start of the cross axis',
        'center': 'Items centered along the cross axis',
        'end': 'Items aligned to the end of the cross axis',
        'stretch': 'Items stretched to fill the container',
        'baseline': 'Items aligned along their text baseline'
    };

    const actualAlign = align === 'initial' ? 'start' : align;

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
        'initial': 'Resets to default value (start)',
        'start': 'Items packed at the start of the main axis',
        'center': 'Items centered along the main axis',
        'end': 'Items packed at the end of the main axis',
        'space-between': 'Items evenly distributed, first at start, last at end',
        'space-around': 'Items evenly distributed with equal space around',
        'space-evenly': 'Items evenly distributed with equal space between'
    };

    const actualJustify = justify === 'initial' ? 'start' : justify;

    containerRow.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: row; justify-content: ${actualJustify};">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
        </div>
        <div class="mini-description">Horizontal (row): ${descriptions[justify]}</div>
    `;
}

// Show justify-content column example
function showJustifyContentColumnExample(justify) {
    const containerColumn = document.getElementById('justify-content-example-column');

    const descriptions = {
        'initial': 'Resets to default value (start)',
        'start': 'Items packed at the start of the main axis',
        'center': 'Items centered along the main axis',
        'end': 'Items packed at the end of the main axis',
        'space-between': 'Items evenly distributed, first at start, last at end',
        'space-around': 'Items evenly distributed with equal space around',
        'space-evenly': 'Items evenly distributed with equal space between'
    };

    const actualJustify = justify === 'initial' ? 'start' : justify;

    containerColumn.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: column; justify-content: ${actualJustify}; height: 195px;">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
        </div>
        <div class="mini-description">Vertical (column): ${descriptions[justify]}</div>
    `;
}

// Show flex-wrap example
function showFlexWrapExample(wrap) {
    const container = document.getElementById('flex-wrap-example');

    const descriptions = {
        'initial': 'Resets to default value (nowrap)',
        'nowrap': 'Items forced into single line (may overflow)',
        'wrap': 'Items wrap to multiple lines if needed',
        'wrap-reverse': 'Items wrap to multiple lines in reverse order'
    };

    const actualWrap = wrap === 'initial' ? 'nowrap' : wrap;
    const isColumn = currentFlexDirection.includes('column');
    const sizeStyle = isColumn ? 'height: 100px;' : 'width: 150px;';

    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${currentFlexDirection}; flex-wrap: ${actualWrap}; ${sizeStyle}">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
            <div class="mini-item item-1">4</div>
            <div class="mini-item item-2">5</div>
            <div class="mini-item item-3">6</div>
        </div>
        <div class="mini-description">${descriptions[wrap]}</div>
    `;
}

// Show align-content example
function showAlignContentExample(alignContent) {
    const container = document.getElementById('align-content-example');

    const descriptions = {
        'initial': 'Resets to default value (start)',
        'start': 'Lines packed at the start of the container',
        'center': 'Lines centered in the container',
        'end': 'Lines packed at the end of the container',
        'stretch': 'Lines stretched to fill the container',
        'space-between': 'Lines evenly distributed, first at start, last at end',
        'space-around': 'Lines evenly distributed with equal space around'
    };

    const actualAlignContent = alignContent === 'initial' ? 'start' : alignContent;
    const isColumn = currentFlexDirection.includes('column');
    const sizeStyle = isColumn ? 'height: 100px; width: 100%;' : 'width: 150px; min-height: 100px;';

    container.innerHTML = `
        <div class="mini-outer" style="display: flex; flex-direction: ${currentFlexDirection}; flex-wrap: wrap; align-content: ${actualAlignContent}; ${sizeStyle}">
            <div class="mini-item item-1">1</div>
            <div class="mini-item item-2">2</div>
            <div class="mini-item item-3">3</div>
            <div class="mini-item item-1">4</div>
            <div class="mini-item item-2">5</div>
            <div class="mini-item item-3">6</div>
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
        'border-width-input', 'border-top-width-input', 'border-right-width-input', 'border-bottom-width-input', 'border-left-width-input',
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

    // Get border values
    const borderVals = parseShorthand(
        document.getElementById('border-width-input').value.trim(),
        document.getElementById('border-top-width-input').value.trim(),
        document.getElementById('border-right-width-input').value.trim(),
        document.getElementById('border-bottom-width-input').value.trim(),
        document.getElementById('border-left-width-input').value.trim()
    );

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
    drawBoxModel(margin, border, padding, radius);
}

function drawBoxModel(margin, border, padding, radius) {
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

    // Draw border box (will contain border + padding + content)
    ctx.fillStyle = COLORS.border;
    roundRect(ctx, borderBox.x, borderBox.y, borderBox.width, borderBox.height, radius);
    ctx.fill();

    // Draw padding
    ctx.fillStyle = COLORS.padding;
    roundRect(ctx, paddingBox.x, paddingBox.y, paddingBox.width, paddingBox.height, radius);
    ctx.fill();

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
    desc.innerHTML = `<span style="color: #fadeb4;">■ Margin</span> <span style="color: #a0ccfa;">■ Border</span> <span style="color: #c8e0a5;">■ Padding</span> <span style="color: #fff; text-shadow: 0 0 2px #000;">■ Content</span>`;
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
                valueDisplay.textContent = boxSizing;
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

    // Parse dimension values (support calc, px, %, auto, etc.)
    function parseDimension(value, containerSize) {
        if (!value || value === 'auto') return null;

        // Handle calc() expressions
        if (value.includes('calc')) {
            // Simple calc parser for basic expressions like calc(50% - 16px)
            const calcMatch = value.match(/calc\((.*?)\)/);
            if (calcMatch) {
                const expr = calcMatch[1];
                try {
                    // Replace % with actual values
                    const replaced = expr.replace(/(\d+(?:\.\d+)?)%/g, (_match, num) => {
                        return (parseFloat(num) / 100 * containerSize).toString();
                    });
                    // Replace px
                    const withoutPx = replaced.replace(/px/g, '');
                    // Evaluate simple expression
                    return eval(withoutPx);
                } catch (e) {
                    return null;
                }
            }
        }

        // Handle percentages
        if (value.includes('%')) {
            return parseFloat(value) / 100 * containerSize;
        }

        // Handle px values
        return parseFloat(value) || null;
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

    if (minW !== null && boxWidth < minW) {
        boxWidth = minW;
        constrainedByMinW = true;
    }
    if (maxW !== null && boxWidth > maxW) {
        boxWidth = maxW;
        constrainedByMaxW = true;
    }
    if (minH !== null && boxHeight < minH) {
        boxHeight = minH;
        constrainedByMinH = true;
    }
    if (maxH !== null && boxHeight > maxH) {
        boxHeight = maxH;
        constrainedByMaxH = true;
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
            `content: ${Math.round(contentW)}px`, '#95a5a6');
        drawArrow(contentArrowOffsetX, contentY, contentArrowOffsetX, contentY + contentH,
            `content: ${Math.round(contentH)}px`, '#95a5a6');
    }

    // Update description
    const desc = document.getElementById('size-description');
    let boxSizingText = boxSizing === 'border-box'
        ? 'Width/height includes padding & border (total box size)'
        : boxSizing === 'content-box'
        ? 'Width/height applies to content only (padding & border added outside)'
        : 'Initial value (content-box)';

    let constraintText = '';
    if (constrainedByMinW || constrainedByMaxW || constrainedByMinH || constrainedByMaxH) {
        constraintText = ' <span style="color: #e74c3c;">(constrained)</span>';
    }

    const colorLegend = '<br><span style="font-size: 0.9em;"><span style="color: #a0ccfa;">■ Border</span> <span style="color: #c8e0a5;">■ Padding</span> <span style="color: #666;">■ Content</span></span>';

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
                overflowValue.textContent = overflow;
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
                overflowXValue.textContent = overflowX;
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
                overflowYValue.textContent = overflowY;
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
    // Box Shadow Controls
    const bsHorizontalSlider = document.getElementById('bs-horizontal');
    const bsVerticalSlider = document.getElementById('bs-vertical');
    const bsBlurSlider = document.getElementById('bs-blur');
    const bsSpreadSlider = document.getElementById('bs-spread');
    const bsColorPicker = document.getElementById('bs-color');
    const bsSetButtons = document.querySelectorAll('.bs-set-btn');

    const bsHorizontalValue = document.getElementById('bs-horizontal-value');
    const bsVerticalValue = document.getElementById('bs-vertical-value');
    const bsBlurValue = document.getElementById('bs-blur-value');
    const bsSpreadValue = document.getElementById('bs-spread-value');
    const bsColorValue = document.getElementById('bs-color-value');
    const boxShadowValue = document.getElementById('box-shadow-value');
    const boxShadowDemo = document.getElementById('box-shadow-demo');

    let bsCurrentSet = 'outset'; // Default is outset (no keyword, normal shadow)

    function updateBoxShadow() {
        const h = bsHorizontalSlider.value;
        const v = bsVerticalSlider.value;
        const b = bsBlurSlider.value;
        const s = bsSpreadSlider.value;
        const c = bsColorPicker.value;

        // Update value displays
        bsHorizontalValue.textContent = `${h}px`;
        bsVerticalValue.textContent = `${v}px`;
        bsBlurValue.textContent = `${b}px`;
        bsSpreadValue.textContent = `${s}px`;
        bsColorValue.textContent = c;

        // Build shadow string with optional inset keyword
        const insetKeyword = bsCurrentSet === 'inset' ? 'inset ' : '';
        const shadowStr = `${insetKeyword}${h}px ${v}px ${b}px ${s}px ${c}`;

        // Update the shadow value display
        boxShadowValue.textContent = shadowStr;

        // Apply shadow to demo box
        boxShadowDemo.style.boxShadow = shadowStr;
    }

    // Box Shadow slider event listeners
    if (bsHorizontalSlider) {
        bsHorizontalSlider.addEventListener('input', updateBoxShadow);
    }
    if (bsVerticalSlider) {
        bsVerticalSlider.addEventListener('input', updateBoxShadow);
    }
    if (bsBlurSlider) {
        bsBlurSlider.addEventListener('input', updateBoxShadow);
    }
    if (bsSpreadSlider) {
        bsSpreadSlider.addEventListener('input', updateBoxShadow);
    }
    if (bsColorPicker) {
        bsColorPicker.addEventListener('input', updateBoxShadow);
    }

    // Box Shadow set button event listener (toggle button)
    bsSetButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            // Toggle between inset and outset
            if (button.classList.contains('selected')) {
                // Currently inset, switch to outset
                button.classList.remove('selected');
                bsCurrentSet = 'outset';
            } else {
                // Currently outset, switch to inset
                button.classList.add('selected');
                bsCurrentSet = 'inset';
            }

            updateBoxShadow();
        });
    });

    // Initial box shadow update
    updateBoxShadow();

    // Text Shadow Controls
    const tsHorizontalSlider = document.getElementById('ts-horizontal');
    const tsVerticalSlider = document.getElementById('ts-vertical');
    const tsBlurSlider = document.getElementById('ts-blur');
    const tsColorPicker = document.getElementById('ts-color');

    const tsHorizontalValue = document.getElementById('ts-horizontal-value');
    const tsVerticalValue = document.getElementById('ts-vertical-value');
    const tsBlurValue = document.getElementById('ts-blur-value');
    const tsColorValue = document.getElementById('ts-color-value');
    const textShadowValue = document.getElementById('text-shadow-value');
    const textShadowDemo = document.getElementById('text-shadow-demo');

    function updateTextShadow() {
        const h = tsHorizontalSlider.value;
        const v = tsVerticalSlider.value;
        const b = tsBlurSlider.value;
        const c = tsColorPicker.value;

        // Update value displays
        tsHorizontalValue.textContent = `${h}px`;
        tsVerticalValue.textContent = `${v}px`;
        tsBlurValue.textContent = `${b}px`;
        tsColorValue.textContent = c;

        // Build shadow string (text-shadow syntax: offset-x offset-y blur-radius color)
        const shadowStr = `${h}px ${v}px ${b}px ${c}`;

        // Update the shadow value display
        textShadowValue.textContent = shadowStr;

        // Apply shadow to demo text
        textShadowDemo.style.textShadow = shadowStr;
    }

    // Text Shadow slider event listeners
    if (tsHorizontalSlider) {
        tsHorizontalSlider.addEventListener('input', updateTextShadow);
    }
    if (tsVerticalSlider) {
        tsVerticalSlider.addEventListener('input', updateTextShadow);
    }
    if (tsBlurSlider) {
        tsBlurSlider.addEventListener('input', updateTextShadow);
    }
    if (tsColorPicker) {
        tsColorPicker.addEventListener('input', updateTextShadow);
    }

    // Initial text shadow update
    updateTextShadow();
}

// Background controls handlers
function setupBackgroundControls() {
    const bgColorPicker = document.getElementById('bg-color');
    const bgColorValue = document.getElementById('bg-color-value');
    const backgroundInput = document.getElementById('background-input');
    const bgClipButtons = document.querySelectorAll('.bg-clip-btn');
    const bgClipValue = document.getElementById('background-clip-value');
    const demoBox = document.getElementById('background-demo-box');

    let currentBgClip = 'border-box';

    function updateBackground() {
        if (!demoBox) return;

        const bgColor = bgColorPicker.value;
        const bgValue = backgroundInput.value.trim();

        // Update color value display
        if (bgColorValue) {
            bgColorValue.textContent = bgColor;
        }

        // Apply background
        if (bgValue) {
            // If background input has a value, use it (overrides background-color)
            demoBox.style.background = bgValue;
        } else {
            // Otherwise use background-color
            demoBox.style.background = '';
            demoBox.style.backgroundColor = bgColor;
        }

        // Apply background-clip
        demoBox.style.backgroundClip = currentBgClip;
        demoBox.style.webkitBackgroundClip = currentBgClip; // For -webkit-background-clip: text

        // Special handling for text clip
        if (currentBgClip === 'text') {
            demoBox.style.webkitBackgroundClip = 'text';
            demoBox.style.webkitTextFillColor = 'transparent';
            demoBox.style.color = 'transparent';
        } else {
            demoBox.style.webkitTextFillColor = '';
            demoBox.style.color = 'white';
        }
    }

    // Background color picker
    if (bgColorPicker) {
        bgColorPicker.addEventListener('input', updateBackground);
    }

    // Background input
    if (backgroundInput) {
        backgroundInput.addEventListener('input', updateBackground);
        backgroundInput.addEventListener('blur', updateBackground);
    }

    // Background-clip buttons
    bgClipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const clip = button.dataset.clip;

            // Update selected state
            bgClipButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Update value display
            if (bgClipValue) {
                bgClipValue.textContent = clip;
            }

            // Update current clip
            currentBgClip = clip;

            updateBackground();
        });
    });

    // Initial update
    updateBackground();
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
                    visibilityValue.textContent = visibility;
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
                    opacitySliderValue.textContent = value;
                }

                // Update opacity value display
                if (opacityValue) {
                    opacityValue.textContent = value;
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
                    opacitySliderValue.textContent = value;
                }
                if (opacityValue) {
                    opacityValue.textContent = value;
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
                    opacityValue.textContent = 'initial';
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
            transformValue.textContent = 'none';
            if (transformDemo) {
                transformDemo.style.transform = '';
            }
        } else {
            const transformString = transforms.map(t => t.value).join(' ');
            transformValue.textContent = transformString;
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
        headerDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';

        const selectContainer = document.createElement('div');
        selectContainer.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const iconImg = document.createElement('img');
        iconImg.src = `images/icons/${config.icon}`;
        iconImg.alt = type;
        iconImg.style.cssText = 'width: 20px; height: 20px;';
        selectContainer.appendChild(iconImg);

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

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'property-btn';
        deleteBtn.title = 'Remove transform';
        deleteBtn.style.cssText = 'padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;';
        deleteBtn.innerHTML = '<img src="images/icons/iconDelete.svg" alt="Delete" style="width: 16px; height: 16px; filter: brightness(0) invert(1);">';
        deleteBtn.addEventListener('click', () => removeTransform(id));
        headerDiv.appendChild(deleteBtn);

        itemDiv.appendChild(headerDiv);

        // Parameters
        const paramsDiv = document.createElement('div');
        paramsDiv.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

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
            transitionValue.textContent = 'none';
            if (transitionDemo) {
                transitionDemo.style.transition = '';
            }
        } else {
            const transitionString = transitions.map(t => t.value).join(', ');
            transitionValue.textContent = transitionString;
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
        headerDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';

        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'Transition';
        titleSpan.style.cssText = 'font-weight: 500; font-size: 0.85em; color: #2c3e50;';
        headerDiv.appendChild(titleSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'property-btn';
        deleteBtn.title = 'Remove transition';
        deleteBtn.style.cssText = 'padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;';
        deleteBtn.innerHTML = '<img src="images/icons/iconDelete.svg" alt="Delete" style="width: 16px; height: 16px; filter: brightness(0) invert(1);">';
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
        transitionDemo.addEventListener('mouseenter', () => {
            transitionDemo.style.transform = 'scale(1.2) rotate(10deg)';
            transitionDemo.style.borderRadius = '50%';
            transitionDemo.style.backgroundColor = '#f39c12';
        });

        transitionDemo.addEventListener('mouseleave', () => {
            transitionDemo.style.transform = '';
            transitionDemo.style.borderRadius = '';
            transitionDemo.style.backgroundColor = '';
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

    let filters = []; // Array to store filter objects
    let filterIdCounter = 0;

    // Filter configurations with specific ranges
    const filterConfigs = {
        'blur': {
            min: 0,
            max: 10,
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
        if (filters.length === 0) {
            filterValue.textContent = 'none';
            if (filterDemo) {
                filterDemo.style.filter = '';
            }
        } else {
            const filterString = filters.map(f => f.filterValue).join(' ');
            filterValue.textContent = filterString;
            if (filterDemo) {
                filterDemo.style.filter = filterString;
            }
        }
    }

    function createFilterItem(type = 'blur') {
        const id = filterIdCounter++;
        const config = filterConfigs[type];

        const filterObj = {
            id: id,
            type: type,
            value: config.default,
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
        headerDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';

        const selectContainer = document.createElement('div');
        selectContainer.style.cssText = 'display: flex; align-items: center; gap: 8px; flex: 1;';

        const typeLabel = document.createElement('span');
        typeLabel.textContent = 'Filter:';
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
                updateFilterDisplay();
            }
        });

        selectContainer.appendChild(typeSelect);
        headerDiv.appendChild(selectContainer);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'property-btn';
        deleteBtn.title = 'Remove filter';
        deleteBtn.style.cssText = 'padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;';
        deleteBtn.innerHTML = '<img src="images/icons/iconDelete.svg" alt="Delete" style="width: 16px; height: 16px; filter: brightness(0) invert(1);">';
        deleteBtn.addEventListener('click', () => removeFilter(id));
        headerDiv.appendChild(deleteBtn);

        itemDiv.appendChild(headerDiv);

        // Value slider
        const sliderContainer = document.createElement('div');
        sliderContainer.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';

        const sliderRow = document.createElement('div');
        sliderRow.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const sliderLabel = document.createElement('label');
        sliderLabel.textContent = 'Value:';
        sliderLabel.style.cssText = 'width: 50px; font-size: 0.75em; color: #2c3e50;';
        sliderRow.appendChild(sliderLabel);

        const sliderWrapper = document.createElement('div');
        sliderWrapper.style.cssText = 'flex: 1; display: flex; flex-direction: column; gap: 2px;';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = config.min;
        slider.max = config.max;
        slider.step = config.step;
        slider.value = config.default;
        slider.style.cssText = 'width: 100%;';
        slider.addEventListener('input', (e) => {
            filterObj.value = parseFloat(e.target.value);
            valueSpan.textContent = e.target.value + config.unit;
            filterObj.filterValue = generateValue();
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
        valueSpan.textContent = config.default + config.unit;
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
        updateFilterDisplay();
    }

    function removeFilter(id) {
        const index = filters.findIndex(f => f.id === id);
        if (index !== -1) {
            filters[index].element.remove();
            filters.splice(index, 1);
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

    // Initialize with one filter
    addFilter();
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
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Shorthand: margin: ${uniqueValues[0]}</div>`;
        } else if (finalTop === finalBottom && finalRight === finalLeft && finalTop !== '0') {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Shorthand: margin: ${finalTop} ${finalRight}</div>`;
        } else if (finalRight === finalLeft && (finalTop !== '0' || finalRight !== '0' || finalBottom !== '0')) {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Shorthand: margin: ${finalTop} ${finalRight} ${finalBottom}</div>`;
        } else if (finalTop !== '0' || finalRight !== '0' || finalBottom !== '0' || finalLeft !== '0') {
            shorthandHint = `<div style="font-size: 0.65em; color: #999; margin-top: 2px;">Shorthand: margin: ${finalTop} ${finalRight} ${finalBottom} ${finalLeft} (top right bottom left)</div>`;
        }
    }

    // Check if any auto margins are used
    const hasAutoLeftRight = isAutoLeft || isAutoRight;
    const hasAutoTopBottom = isAutoTop || isAutoBottom;

    let marginLegend = '';
    if (hasAutoLeftRight && hasAutoTopBottom) {
        marginLegend = '(orange = fixed, green = auto left/right, purple = auto top/bottom → 0)';
    } else if (hasAutoLeftRight) {
        marginLegend = '(orange = fixed margin, green = auto margin)';
    } else if (hasAutoTopBottom) {
        marginLegend = '(orange = fixed margin, purple = auto → computes to 0)';
    } else {
        marginLegend = '(orange area shows margin)';
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

