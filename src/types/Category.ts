export type Category = {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  slug: string;
  children: Category[];
};
