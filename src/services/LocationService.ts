import { Config } from '../constants/Config';

export type Location = {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  level: number;
  hasChildren: boolean;
  slug: string;
};

export const LocationService = {
  getLocations: async (parentExternalID: string = '0-1', level?: number): Promise<Location[]> => {
    const index = 'olx-lb-production-locations-en';
    const header = { index: index };

    const must: any[] = [
      { term: { "hierarchy.externalID": parentExternalID } }
    ];

    // If we want to be specific about the next level
    if (level !== undefined) {
      must.push({ term: { level: level } });
    }

    const queryBody = {
      from: 0,
      size: 500,
      query: {
        bool: {
          must: must
        }
      },
      sort: [
        { name: { order: 'asc' } }
      ]
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
      throw new Error('Failed to fetch locations');
    }

    const data = await response.json();
    if (!data.responses || data.responses.length === 0) {
      return [];
    }
    const hits = data.responses[0]?.hits?.hits || [];

    // If we didn't specify level, we might get the parent itself. Filter it out.
    return hits
      .map((h: any) => h._source)
      .filter((loc: Location) => loc && loc.externalID !== parentExternalID);
  }
};
