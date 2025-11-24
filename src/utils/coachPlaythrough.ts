const STORAGE_KEY = 'coach-playthrough-id';

const safeCrypto =
    typeof globalThis !== 'undefined' && globalThis.crypto
        ? globalThis.crypto
        : undefined;

const fallbackUuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        const random = (Math.random() * 16) | 0;
        const value =
            char === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });

const buildUuid = () => {
    if (safeCrypto?.randomUUID) {
        return safeCrypto.randomUUID();
    }

    return fallbackUuid();
};

export function createCoachPlaythroughId(): string {
    const coachId = `C${buildUuid()}`;
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, coachId);
    }
    return coachId;
}

export function getStoredCoachPlaythroughId(): string | null {
    if (typeof window === 'undefined' || !window.localStorage) {
        return null;
    }
    return window.localStorage.getItem(STORAGE_KEY);
}

