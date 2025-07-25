import { useState, useEffect } from 'react';
import type { ClubSquad } from '../types/ClubSquad';
import { env } from '../config/env';

let cachedSquad: ClubSquad | null = null;

export function useClubSquad() {
  const [squad, setSquad] = useState<ClubSquad | null>(cachedSquad);
  const [loading, setLoading] = useState(!cachedSquad);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedSquad) {
      setSquad(cachedSquad);
      setLoading(false);
      setError(null);
      return;
    }

    const url = `https://transfermarkt6.p.rapidapi.com/clubs/squad?id=${env.squadId}&seasonId=${env.seasonId}&domain=${env.domain}`;
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

        const positionOrder = ["Portero", "Defensa central", "Lateral izquierdo", "Lateral derecho", "Pivote", "Mediocentro", "Interior izquierdo", "Mediocentro ofensivo", "Extremo izquierdo", "Extremo derecho", "Delantero centro"];
        const sortedSquad = [...json.data.squad].sort((a, b) => {
          const posA = a.positions.first.name;
          const posB = b.positions.first.name;
          return positionOrder.indexOf(posA) - positionOrder.indexOf(posB);
        });

        cachedSquad = { ...json.data, squad: sortedSquad };
        setSquad(cachedSquad);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { squad, loading, error };
}
