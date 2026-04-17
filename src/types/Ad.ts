export type LocationLevel = {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
};

export type AdLocation = {
  lvl0?: LocationLevel;
  lvl1?: LocationLevel;
  lvl2?: LocationLevel;
};

export type AdPhoto = {
  id: number;
  externalID: string;
};

export type FormattedExtraField = {
  attribute: string;
  formattedValue: any;
};

export type Ad = {
  id: number;
  title: string;
  createdAt: number;
  photos: AdPhoto[];
  coverPhoto: AdPhoto;
  location: AdLocation;
  formattedExtraFields: FormattedExtraField[];
};
