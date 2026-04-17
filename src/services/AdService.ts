import { SearchResponse } from '../types';
import { Config } from '../constants/Config';

export const AdService = {
  searchAds: async (categoryID?: string, query?: string): Promise<SearchResponse> => {
    const body = [
      { index: Config.ADS_INDEX },
      {
        query: {
          bool: {
            must: [
              categoryID ? { term: { 'category.externalID': categoryID } } : { match_all: {} },
              query ? { match: { title: query } } : null,
            ].filter(Boolean),
          },
        },
        size: 20,
        from: 0,
        track_total_hits: 10000,
        timeout: '5s',
      },
    ];

    const ndjson = body.map((item) => JSON.stringify(item)).join('\n') + '\n';

    const response = await fetch(Config.SEARCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Authorization': Config.AUTH_TOKEN,
      },
      body: ndjson,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Something went wrong while fetching the latest ads. Please try again.');
    }

    const result = await response.json();
    return result.responses[0];
  },
};
