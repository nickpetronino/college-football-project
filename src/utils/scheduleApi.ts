/**
 * Schedule API Utility
 * Frontend utility for interacting with the schedule API
 */

const API_BASE_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

export interface ScheduleGame {
    week: number;
    location: 'Home' | 'Away';
    opponent: {
        name: string;
        logo: string;
        rank?: number;
        record?: {
            wins: number;
            losses: number;
        };
        isRivalry?: boolean;
    } | null;
    isByeWeek: boolean;
    isConferenceGame?: boolean;
    score?: {
        home: number;
        away: number;
    };
    wentToOvertime?: boolean;
}

export interface ScheduleData {
    playthroughId: string;
    year: number;
    teamName: string;
    games: ScheduleGame[];
    metadata?: Record<string, string>;
}

export interface ScheduleStats {
    totalGames: number;
    homeGames: number;
    awayGames: number;
    byeWeeks: number;
    teamName: string;
    year: number;
    playthroughId: string;
}

/**
 * Save schedule to backend
 */
export const saveSchedule = async (
    scheduleData: ScheduleData
): Promise<ScheduleData> => {
    const response = await fetch(`${API_BASE_URL}/schedules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
    });

    if (!response.ok) {
        throw new Error(`Failed to save schedule: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Load schedule from backend
 */
export const loadSchedule = async (
    playthroughId: string,
    year: number
): Promise<ScheduleData | null> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}`
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to load schedule: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Get all schedules for a playthrough
 */
export const getPlaythroughSchedules = async (
    playthroughId: string
): Promise<ScheduleData[]> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/playthrough/${playthroughId}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to get playthrough schedules: ${response.statusText}`
        );
    }

    return response.json();
};

/**
 * Update an existing schedule
 */
export const updateSchedule = async (
    playthroughId: string,
    year: number,
    scheduleData: Partial<ScheduleData>
): Promise<ScheduleData> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData),
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to update schedule: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Delete a schedule
 */
export const deleteSchedule = async (
    playthroughId: string,
    year: number
): Promise<void> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}`,
        {
            method: 'DELETE',
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to delete schedule: ${response.statusText}`);
    }
};

/**
 * Get schedule statistics
 */
export const getScheduleStats = async (
    playthroughId: string,
    year: number
): Promise<ScheduleStats> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}/stats`
    );

    if (!response.ok) {
        throw new Error(`Failed to get schedule stats: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Add a game to a schedule
 */
export const addGameToSchedule = async (
    playthroughId: string,
    year: number,
    game: ScheduleGame
): Promise<ScheduleData> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}/games`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to add game: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Update a game in a schedule
 */
export const updateGameInSchedule = async (
    playthroughId: string,
    year: number,
    week: number,
    game: Partial<ScheduleGame>
): Promise<ScheduleData> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}/games/${week}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to update game: ${response.statusText}`);
    }

    return response.json();
};

/**
 * Remove a game from a schedule
 */
export const removeGameFromSchedule = async (
    playthroughId: string,
    year: number,
    week: number
): Promise<ScheduleData> => {
    const response = await fetch(
        `${API_BASE_URL}/schedules/${playthroughId}/${year}/games/${week}`,
        {
            method: 'DELETE',
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to remove game: ${response.statusText}`);
    }

    return response.json();
};
