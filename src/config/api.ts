const DEFAULT_BACKEND_URL = 'http://127.0.0.1:5000';

function readEnvBaseUrl(): string {
    if (typeof import.meta === 'undefined' || !import.meta.env) return '';
    const fromEnv = import.meta.env.VITE_BACKEND_URL;
    return fromEnv ? String(fromEnv).trim() : '';
}

export function getBackendUrl(): string {
    const configured = readEnvBaseUrl();
    const normalized = (configured || DEFAULT_BACKEND_URL).replace(/\/+$|\/+$/g, '');
    return normalized || DEFAULT_BACKEND_URL;
}

export function buildBackendUrl(path: string): string {
    if (!path) return getBackendUrl();
    const trimmed = path.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `${getBackendUrl()}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
}

export async function fetchBackend(path: string, init?: RequestInit) {
    return fetch(buildBackendUrl(path), init);
}

