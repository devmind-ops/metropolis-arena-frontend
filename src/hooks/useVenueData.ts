import { useState, useEffect } from 'react';
import type { VenueData } from '../types';

interface UseVenueDataResult {
    data: VenueData | null;
    loading: boolean;
    error: string | null;
}

export function useVenueData(): UseVenueDataResult {
    const [data, setData] = useState<VenueData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch('/venue.json');
                if (!response.ok) {
                    throw new Error('Failed to load venue data');
                }
                const json = await response.json();
                if (mounted) {
                    setData(json);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    return { data, loading, error };
}
