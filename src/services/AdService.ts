import { SearchResponse } from '../types/Search';
import { Config } from '../constants/Config';

export const AdService = {
  searchAds: async (categoryID?: string, query?: string): Promise<SearchResponse> => {
    const index = `olx-lb-production-ads-en`;
    const header = { index: index };
    const queryBody: any = {
      from: 0,
      size: 12,
      track_total_hits: 200000,
      query: {
        bool: {
          must: [],
        },
      },
      sort: [
        { timestamp: { order: 'desc' } },
        { id: { order: 'desc' } },
      ],
    };

    // Add category filter if provided
    if (categoryID) {
      queryBody.query.bool.must.push({ term: { 'category.externalID': categoryID } });
    }

    // Add location filter (hardcoded to Lebanon)
    queryBody.query.bool.must.push({ term: { 'location.externalID': '0-1' } });

    // Add text search query if provided
    if (query) {
      queryBody.query.bool.must.push({ match: { title: query } });
    }

    // Default to match_all if no specific filters
    if (queryBody.query.bool.must.length === 0) {
      queryBody.query.bool.must.push({ match_all: {} });
    }

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
      throw new Error(errorData.message || 'Something went wrong while fetching the latest ads. Please try again.');
    }

    const result = await response.json();
    return result.responses[0];
  },
};