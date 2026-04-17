import { Config } from '../constants/Config';
import { Language } from '../translations/translations';

export const LocationService = {
  getLocations: async (lang: Language = 'en') => {
    const index = `olx-lb-production-locations-${lang}`;
    const header = { index };
    const queryBody = {
      from: 0,
      size: 1000,
      track_total_hits: false,
      query: {
        bool: {
          must: [
            { term: { level: 2 } }
          ],
        },
      },
      sort: [{ name: { order: 'asc' } }],
      timeout: '5s',
    };

    const body = JSON.stringify(header) + '\n' + JSON.stringify(queryBody) + '\n';

    try {
      const response = await fetch(Config.SEARCH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Authorization': Config.AUTH_TOKEN,
        },
        body,
      });

      if (!response.ok) throw new Error('Failed to fetch locations');

      const data = await response.json();
      return data.responses?.[0]?.hits?.hits?.map((h: any) => h._source) || [];
    } catch (err) {
      console.error('Location fetch error:', err);
      return [];
    }
  },
};
