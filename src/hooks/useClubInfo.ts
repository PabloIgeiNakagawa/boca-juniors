import { useState, useEffect } from 'react';
import type { ClubInfo } from '../types/ClubInfo';
import { env } from '../config/env';

// Cache en memoria
let cachedClubInfo: ClubInfo['club'] | null = null;

export function useClubInfo() {
  const [club, setClub] = useState<ClubInfo['club'] | null>(cachedClubInfo);
  const [loading, setLoading] = useState(!cachedClubInfo);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedClubInfo) {
      setClub(cachedClubInfo);
      setLoading(false);
      setError(null);
      return;
    }

    const url = `https://transfermarkt6.p.rapidapi.com/clubs/info?id=${env.squadId}&domain=${env.domain}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': env.rapidApiKey,
        'x-rapidapi-host': env.rapidApiHost
      }
    };

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();

        cachedClubInfo = json.data.club; // Guardamos en cache
        setClub(cachedClubInfo);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { club, loading, error };
}
