/**
 * CSS Challenge Rooms - Game Engine
 * Provides embedded code editors with live preview
 */

class ChallengeRoom {
    constructor(config) {
        this.chapterId = config.chapterId;
        this.roomId = config.roomId;
        this.title = config.title;
        this.description = config.description;
        this.instructions = config.instructions;
        this.hints = config.hints || [];

        // Code configuration
        this.htmlEditable = config.htmlEditable !== false;
        this.cssEditable = config.cssEditable !== false;
        this.initialHTML = config.initialHTML || '';
        this.initialCSS = config.initialCSS || '';

        // Validation
        this.validateFn = config.validate;

        // State
        this.solved = false;
        this.hintsShown = 0;

        this.init();
    }

    init() {
        this.render();
        this.attachEvents();
        this.updatePreview();
        this.checkIfAlreadySolved();
    }

    render() {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="game-room">
                <header class="room-header">
                    <div class="room-nav">
                        <a href="../../progress.html" class="nav-link">← Progress</a>
                        <span class="room-badge">${this.chapterId} / ${this.roomId}</span>
                    </div>
                    <h1 class="room-title">${this.title}</h1>
                    <p class="room-description">${this.description}</p>
                </header>

                <div class="room-instructions">
                    <h3>📋 Mission</h3>
                    <p>${this.instructions}</p>
                </div>

                <div class="game-layout">
                    <div class="editors-panel">
                        ${this.htmlEditable ? `
                        <div class="editor-section">
                            <div class="editor-header">
                                <span class="editor-label">📄 HTML</span>
                            </div>
                            <textarea id="html-editor" class="code-editor" spellcheck="false">${this.escapeHtml(this.initialHTML)}</textarea>
                        </div>
                        ` : ''}

                        ${this.cssEditable ? `
                        <div class="editor-section">
                            <div class="editor-header">
                                <span class="editor-label">🎨 CSS</span>
                            </div>
                            <textarea id="css-editor" class="code-editor" spellcheck="false">${this.initialCSS}</textarea>
                        </div>
                        ` : ''}
                    </div>

                    <div class="preview-panel">
                        <div class="preview-header">
                            <span class="preview-label">👁️ Preview</span>
                            <span class="live-indicator">● Live</span>
                        </div>
                        <div class="preview-container">
                            <iframe id="preview-frame" class="preview-frame"></iframe>
                            <div id="result-overlay" class="result-overlay hidden"></div>
                        </div>
                    </div>
                </div>

                <div class="game-actions">
                    <button id="hint-btn" class="hint-button">💡 Show Hint (${this.hints.length - this.hintsShown} left)</button>
                    <button id="check-btn" class="check-button">✓ Check Solution</button>
                </div>

                <div id="hints-container" class="hints-container"></div>

                <div id="success-modal" class="modal hidden">
                    <div class="modal-content success-content">
                        <div class="success-icon">🎉</div>
                        <h2>Room Complete!</h2>
                        <p>Great job! You've solved this challenge.</p>
                        <div class="modal-actions">
                            <a href="../../progress.html" class="modal-btn secondary">View Progress</a>
                            <button id="next-room-btn" class="modal-btn primary">Next Room →</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEvents() {
        // Check solution button
        document.getElementById('check-btn').addEventListener('click', () => {
            this.checkSolution();
        });

        // Hint button
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showNextHint();
        });

        // Live preview on typing (with debounce)
        let timeout;
        const editors = document.querySelectorAll('.code-editor');
        editors.forEach(editor => {
            editor.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.updatePreview(), 300);
            });

            // Tab key support
            editor.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = editor.selectionStart;
                    const end = editor.selectionEnd;
                    editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + 4;
                    this.updatePreview();
                }
            });
        });

        // Next room button
        document.getElementById('next-room-btn').addEventListener('click', () => {
            this.goToNextRoom();
        });

        // Close modal on outside click
        document.getElementById('success-modal').addEventListener('click', (e) => {
            if (e.target.id === 'success-modal') {
                e.target.classList.add('hidden');
            }
        });
    }

    updatePreview() {
        const frame = document.getElementById('preview-frame');
        const htmlEditor = document.getElementById('html-editor');
        const cssEditor = document.getElementById('css-editor');

        const html = htmlEditor ? htmlEditor.value : this.initialHTML;
        const css = cssEditor ? cssEditor.value : this.initialCSS;

        const previewContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        padding: 1rem;
                        background: #fff;
                        color: #333;
                    }
                    ${css}
                </style>
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;

        frame.srcdoc = previewContent;
    }

    getPreviewDocument() {
        const frame = document.getElementById('preview-frame');
        return frame.contentDocument || frame.contentWindow.document;
    }

    getCurrentHTML() {
        const editor = document.getElementById('html-editor');
        return editor ? editor.value : this.initialHTML;
    }

    getCurrentCSS() {
        const editor = document.getElementById('css-editor');
        return editor ? editor.value : this.initialCSS;
    }

    checkSolution() {
        // Wait for iframe to update
        setTimeout(() => {
            const doc = this.getPreviewDocument();
            const html = this.getCurrentHTML();
            const css = this.getCurrentCSS();

            const result = this.validateFn({ doc, html, css });

            if (result.success) {
                this.onSuccess();
            } else {
                this.showError(result.message || "Not quite right. Keep trying!");
            }
        }, 100);
    }

    onSuccess() {
        if (!this.solved) {
            this.solved = true;
            markRoomCompleted(this.chapterId, this.roomId);
        }

        document.getElementById('success-modal').classList.remove('hidden');
    }

    showError(message) {
        const overlay = document.getElementById('result-overlay');
        overlay.className = 'result-overlay error';
        overlay.innerHTML = `<div class="overlay-content"><span class="overlay-icon">❌</span><span class="overlay-message">${message}</span></div>`;
        overlay.classList.remove('hidden');

        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 3000);
    }

    showNextHint() {
        if (this.hintsShown >= this.hints.length) {
            return;
        }

        const hint = this.hints[this.hintsShown];
        this.hintsShown++;

        const container = document.getElementById('hints-container');
        const hintEl = document.createElement('div');
        hintEl.className = 'hint-box';
        hintEl.innerHTML = `<strong>💡 Hint ${this.hintsShown}:</strong> ${hint}`;
        container.appendChild(hintEl);

        // Update button
        const btn = document.getElementById('hint-btn');
        const remaining = this.hints.length - this.hintsShown;
        if (remaining > 0) {
            btn.textContent = `💡 Show Hint (${remaining} left)`;
        } else {
            btn.textContent = '💡 No more hints';
            btn.disabled = true;
        }
    }

    checkIfAlreadySolved() {
        if (isRoomCompleted(this.chapterId, this.roomId)) {
            this.solved = true;
            const badge = document.querySelector('.room-badge');
            badge.innerHTML += ' ✓';
            badge.classList.add('completed');
        }
    }

    goToNextRoom() {
        const rooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
        const chapters = [
            'chapter-html',
            'chapter-css-basic',
            'chapter-flex-layout',
            'chapter-mobile-responsive',
            'chapter-animations',
            'chapter-css-advanced',
            'chapter-forms',
            'chapter-css-interactivity-checkbox-radio'
        ];

        const currentRoomIndex = rooms.indexOf(this.roomId);
        const currentChapterIndex = chapters.indexOf(this.chapterId);

        let nextChapter, nextRoom;

        if (currentRoomIndex < rooms.length - 1) {
            nextChapter = this.chapterId;
            nextRoom = rooms[currentRoomIndex + 1];
        } else if (currentChapterIndex < chapters.length - 1) {
            nextChapter = chapters[currentChapterIndex + 1];
            nextRoom = 'room1';
        } else {
            // Last room of last chapter
            window.location.href = '../../progress.html';
            return;
        }

        window.location.href = `../${nextChapter}/${nextRoom}/index.html`.replace(`../${this.chapterId}/`, '../');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Helper to start a room
function startRoom(config) {
    new ChallengeRoom(config);
}
