import { useState, useEffect } from 'react';
import { env } from '../config/env';
import type { CompetitionInfo } from '../types/CompetitionInfo';

// Cache en memoria
let cachedCompetitionInfo: CompetitionInfo | null = null;

export function useCompetitionInfo(competitionId: string) {
  const [competition, setCompetition] = useState<CompetitionInfo | null>(cachedCompetitionInfo);
  const [loading, setLoading] = useState(!cachedCompetitionInfo);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedCompetitionInfo) {
      setCompetition(cachedCompetitionInfo);
      setLoading(false);
      setError(null);
      return;
    }
    const url = `https://transfermarkt6.p.rapidapi.com/competitions/info?id=${competitionId}&domain=${env.domain}`;
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

        cachedCompetitionInfo = json.data; // Guardamos en cache
        console.log(cachedCompetitionInfo);
        setCompetition(cachedCompetitionInfo);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { competition, loading, error };
}
