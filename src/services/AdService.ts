import { SearchResponse } from '../types/Search';
import { Config } from '../constants/Config';

export const AdService = {
  searchAds: async (
    categoryID?: string, 
    query?: string, 
    minPrice?: number, 
    maxPrice?: number,
    locationID: string = '0-1' // Default to Lebanon
  ): Promise<SearchResponse> => {
    const index = 'olx-lb-production-ads-en';
    const header = { index: index };
    
    const queryBlock: any = {
      bool: {
        must: [],
      },
    };

    // Category Filter
    if (categoryID) {
      queryBlock.bool.must.push({ term: { 'category.externalID': categoryID } });
    }

    // Dynamic Location Filter
    queryBlock.bool.must.push({ term: { 'location.externalID': locationID } });

    // Price Range Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      const range: any = {};
      if (minPrice !== undefined) range.gte = minPrice;
      if (maxPrice !== undefined) range.lte = maxPrice;
      queryBlock.bool.must.push({
        range: {
          'extraFields.price': range,
        },
      });
    }

    // Text Search
    if (query) {
      queryBlock.bool.should = [
        {
          multi_match: {
            query: query,
            type: 'phrase',
            fields: 'query',
            operator: 'and',
            boost: 4,
          },
        },
        {
          multi_match: {
            query: query,
            type: 'most_fields',
            fields: 'query',
            operator: 'and',
            boost: 3,
          },
        },
        {
          multi_match: {
            query: query,
            type: 'phrase',
            fields: 'externalID',
            operator: 'and',
            boost: 3,
          },
        },
        {
          multi_match: {
            query: query,
            type: 'most_fields',
            fields: 'externalID',
            operator: 'and',
            boost: 2,
          },
        },
      ];
      queryBlock.bool.minimum_should_match = 1;
    } else if (queryBlock.bool.must.length === 0) {
      queryBlock.bool.must.push({ match_all: {} });
    }

    const queryBody: any = {
      from: 0,
      size: 15,
      track_total_hits: 200000,
      query: queryBlock,
      sort: [
        { timestamp: { order: 'desc' } },
        { id: { order: 'desc' } },
      ],
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
      throw new Error(errorData.message || 'Something went wrong while fetching the latest ads. Please try again.');
    }

    const result = await response.json();
    return result.responses[0];
  },
};