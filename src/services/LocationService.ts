import { Config } from '../constants/Config';

export const LocationService = {

  getLocations: async () => {
    const index = `olx-lb-production-locations-en`;
    const header = { index };
    const queryBody: any = {
      from: 0,
      size: 1000,
      track_total_hits: false,
      query: {
        bool: {
          must: [{ term: { level: 2 } }],
        },
      },
      sort: [{ name: { order: 'asc' } }],
    };

    const body = JSON.stringify(header) + '\n' + JSON.stringify(queryBody) + '\n';

    const response = await fetch(Config.SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Authorization': Config.AUTH_TOKEN,
      },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'locationFetchError');
    }

    const result = await response.json();
    return result.responses[0];
  },
};
