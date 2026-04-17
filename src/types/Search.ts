import { Ad } from './Ad';

export type SearchHit = {
  _index: string;
  _id: string;
  _source: Ad;
};

export type SearchResponse = {
  hits: {
    total: {
      value: number;
      relation: string;
    };
    hits: SearchHit[];
  };
  status: number;
};

export type MultiSearchResponse = {
  took: number;
  responses: SearchResponse[];
};
