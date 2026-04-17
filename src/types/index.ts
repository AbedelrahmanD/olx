export type Category = {
  id: number;
  name: string;
  name_l1: string; // Arabic name
  externalID: string;
  slug: string;
  children: Category[];
};

export type Price = {
  value: number;
  currency: string;
};

export type Location = {
  name: string;
  externalID: string;
};

export type AdCategory = {
  name: string;
  externalID: string;
};

export type AdImage = {
  url: string;
};

export type AdParameter = {
  key: string;
  value: string;
  label: string;
  formattedValue: string;
};

export type Ad = {
  id: string;
  title: string;
  description: string;
  price: Price;
  location: Location;
  category: AdCategory;
  images: AdImage[];
  created_at: string;
  parameters: AdParameter[];
};

export type SearchHit = {
  _source: Ad;
};

export type SearchResponse = {
  responses: Array<{
    hits: {
      total: {
        value: number;
      };
      hits: SearchHit[];
    };
  }>;
};
