/**
 * School API Utility
 * Frontend utility for interacting with the school API
 */

const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface School {
    _id: string;
    name: string;
    icon: string;
    conference: string;
    city: string;
    state: string;
    colors: string[];
    mascot?: string;
    rivals: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Get all schools
 */
export const getAllSchools = async (
    filters?: {
        conference?: string;
        state?: string;
        isActive?: boolean;
    }
): Promise<School[]> => {
    const params = new URLSearchParams();
    
    if (filters?.conference) {
        params.append('conference', filters.conference);
    }
    if (filters?.state) {
        params.append('state', filters.state);
    }
    if (filters?.isActive !== undefined) {
        params.append('isActive', filters.isActive.toString());
    }
    
    const queryString = params.toString();
    const url = queryString
        ? `${API_BASE_URL}/schools?${queryString}`
        : `${API_BASE_URL}/schools`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch schools: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get school by name
 */
export const getSchoolByName = async (name: string): Promise<School | null> => {
    const response = await fetch(`${API_BASE_URL}/schools/${encodeURIComponent(name)}`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch school: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get schools by conference
 */
export const getSchoolsByConference = async (
    conference: string
): Promise<School[]> => {
    const response = await fetch(
        `${API_BASE_URL}/schools/conference/${encodeURIComponent(conference)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch schools by conference: ${response.statusText}`
        );
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get all conferences
 */
export const getAllConferences = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/schools/conferences`);

    if (!response.ok) {
        throw new Error(`Failed to fetch conferences: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get schools by state
 */
export const getSchoolsByState = async (state: string): Promise<School[]> => {
    const response = await fetch(
        `${API_BASE_URL}/schools/state/${encodeURIComponent(state)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch schools by state: ${response.statusText}`
        );
    }

    const data = await response.json();
    return data.data || data;
};

/**
 * Get rivals of a school
 */
export const getSchoolRivals = async (name: string): Promise<School[]> => {
    const response = await fetch(
        `${API_BASE_URL}/schools/${encodeURIComponent(name)}/rivals`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch rivals: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data;
};






