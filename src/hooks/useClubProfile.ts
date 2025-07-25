import { useState, useEffect } from 'react';
import type { ClubProfile } from '../types/ClubProfile';
import { env } from '../config/env';

let cachedClubProfile: ClubProfile | null = null;

export function useClubProfile() {
  const [club, setClub] = useState<ClubProfile | null>(cachedClubProfile);
  const [loading, setLoading] = useState(!cachedClubProfile);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedClubProfile) {
      setClub(cachedClubProfile);
      setLoading(false);
      return;
    }

    const url = `https://transfermarkt6.p.rapidapi.com/clubs/profile?id=${env.squadId}&domain=${env.domain}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': env.rapidApiKey,
        'x-rapidapi-host': env.rapidApiHost,
      },
    };

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();
        cachedClubProfile = json.data;  
        setClub(cachedClubProfile);
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
