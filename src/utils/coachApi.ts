/**
 * Coach API Utility
 * Frontend utility for interacting with the coach/playthrough API
 */

import type { School } from './schoolApi';

const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface Coach {
    _id: string;
    playthroughId: string;
    firstName: string;
    lastName: string;
    style: 'Motivator' | 'Recruiter' | 'Tactician';
    selectedTeam: School | string;
    almaMater: School | string;
    pipeline: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCoachData {
    playthroughId: string;
    firstName: string;
    lastName: string;
    style: 'Motivator' | 'Recruiter' | 'Tactician';
    selectedTeam: string; // School _id
    almaMater: string; // School _id
    pipeline: string;
}

/**
 * Create a new coach playthrough
 */
export const createCoach = async (
    coachData: CreateCoachData
): Promise<Coach> => {
    const response = await fetch(`${API_BASE_URL}/coaches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coachData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            errorData.message || `Failed to create coach: ${response.statusText}`
        );
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get coach by playthrough ID
 */
export const getCoachByPlaythroughId = async (
    playthroughId: string
): Promise<Coach | null> => {
    const response = await fetch(
        `${API_BASE_URL}/coaches/${encodeURIComponent(playthroughId)}`
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Failed to fetch coach: ${response.statusText}`
        );
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Update coach playthrough
 */
export const updateCoach = async (
    playthroughId: string,
    updateData: Partial<CreateCoachData>
): Promise<Coach> => {
    const response = await fetch(
        `${API_BASE_URL}/coaches/${encodeURIComponent(playthroughId)}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            errorData.message || `Failed to update coach: ${response.statusText}`
        );
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get all coaches
 */
export const getAllCoaches = async (): Promise<Coach[]> => {
    const response = await fetch(`${API_BASE_URL}/coaches`);

    if (!response.ok) {
        throw new Error(`Failed to fetch coaches: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get most recently modified coach
 */
export const getMostRecentCoach = async (): Promise<Coach | null> => {
    const response = await fetch(`${API_BASE_URL}/coaches/most-recent`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Failed to fetch most recent coach: ${response.statusText}`
        );
    }

    const data = await response.json();
    return data.data || data;
};

