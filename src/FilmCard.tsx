import { Card, Flag, FlagNameValues, Rating } from "semantic-ui-react";
import { Film } from "./Interfaces";

type AppProps = {
  film: Film;
};

const FilmCard = ({ film }: AppProps) => {
  return (
    <Card
      className="filmCard"
      image={
        film.backdrop_path
          ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`
          : null
      }
      header={film.title || film.original_name}
      meta={
        <Flag
          name={
            film.original_language === "en"
              ? "us"
              : (film.original_language as FlagNameValues)
          }
        />
      }
      description={film.overview}
      extra={
        <Rating
          icon="star"
          defaultRating={film.vote_average / 2}
          maxRating={5}
          disabled
        />
      }
    />
  );
};

export default FilmCard;
