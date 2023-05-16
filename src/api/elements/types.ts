export interface IListElement {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
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