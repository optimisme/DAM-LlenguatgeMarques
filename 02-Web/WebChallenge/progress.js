const STORAGE_KEY = 'webChallengeProgress';

const CHAPTERS = [
    'chapter-html',
    'chapter-css-basic',
    'chapter-flex-layout',
    'chapter-mobile-responsive',
    'chapter-animations',
    'chapter-css-advanced',
    'chapter-forms',
    'chapter-css-interactivity-checkbox-radio'
];

const ROOMS = ['room1', 'room2', 'room3', 'room4', 'room5'];

function getProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    const initial = { score: 0 };
    CHAPTERS.forEach(chapter => {
        initial[chapter] = {};
        ROOMS.forEach(room => {
            initial[chapter][room] = false;
        });
    });
    return initial;
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markRoomCompleted(chapterId, roomId) {
    const progress = getProgress();
    if (!progress[chapterId]) {
        progress[chapterId] = {};
    }
    if (!progress[chapterId][roomId]) {
        progress[chapterId][roomId] = true;
        progress.score = (progress.score || 0) + 1;
        saveProgress(progress);
        return true;
    }
    return false;
}

function isRoomCompleted(chapterId, roomId) {
    const progress = getProgress();
    return progress[chapterId] && progress[chapterId][roomId] === true;
}

function getTotalScore() {
    const progress = getProgress();
    return progress.score || 0;
}

function getRoomProgress(chapterId) {
    const progress = getProgress();
    return progress[chapterId] || {};
}

function getTotalRooms() {
    return CHAPTERS.length * ROOMS.length;
}

function getCompletionPercentage() {
    const total = getTotalRooms();
    const score = getTotalScore();
    return Math.round((score / total) * 100);
}

function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
}
