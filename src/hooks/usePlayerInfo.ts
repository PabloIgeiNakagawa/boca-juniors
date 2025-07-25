import { useState, useEffect } from 'react';
import type { PlayerInfo } from '../types/PlayerInfo';
import { env } from '../config/env';

export function usePlayerInfo(id: string) {
  const [player, setPlayer] = useState<PlayerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const url = `https://transfermarkt6.p.rapidapi.com/players/profile?id=${id}&domain=${env.domain}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': env.rapidApiKey,
        'x-rapidapi-host': env.rapidApiHost
      }
    };

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const json = await response.json();
        setPlayer(json.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { player, loading, error };
}