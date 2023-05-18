export interface IListElement {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IListElementUrlField;
  location: IListElementUrlField;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface IListElementUrlField {
  name: string;
  url: string;
}
export interface IRequestInfo {
  "count": number,
  "pages": number,
  "next": string,
  "prev": string,
}

export interface IFetchNextElementsRT {
  info: IRequestInfo
  results: IListElement[]
}