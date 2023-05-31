export interface CitiesResponseI {
  rta: string;
  data: CityResponseI[];
}

export interface CityResponseI {
  CP: string;
  ID: number;
  CIUDADID: string;
  PROVINCIA: string;
}
