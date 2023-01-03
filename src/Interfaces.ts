import { FlagNameValues } from "semantic-ui-react";

export interface Film {
  backdrop_path: string;
  title: string;
  original_name: string;
  overview: string;
  original_language: string | FlagNameValues;
  vote_average: number;
}
