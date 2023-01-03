import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";

import { Input, Button, Loader, Dimmer, Segment } from "semantic-ui-react";
import "./App.css";
import FilmCard from "./FilmCard";
import { Film } from "./Interfaces";

const API_KEY = "92b418e837b833be308bbfb1fb2aca1e";
const URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=`;

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initQuery = searchParams.get("query") || "";
  const [search, setSearch] = useState(initQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Film[]>([]);

  // DidMount
  useEffect(() => {
    callSearch();
  }, []);

  const callSearch = () => {
    console.log("SEARCH with query = ", search);
    if (search.trim().length > 0) {
      setIsLoading(true);
      fetch(`${URL}${encodeURI(search)}`)
        .then((data) => data.json())
        .then((data) => {
          setResults(data?.results);
          const url =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
          window.history.pushState({}, "", `${url}?query=${search}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const OnInputChange = (_: any, data: { value: string }) => {
    setSearch(data.value);
  };

  return (
    <div className="App App-header">
      <h1>Liste de films</h1>
      <h4>Test technique Canal +</h4>

      <div>
        <Input
          placeholder="Search a film"
          onChange={OnInputChange}
          value={search}
        />
        <Button
          basic
          role="searchBtn"
          color="purple"
          className="searchBtn"
          onClick={callSearch}
          disabled={search.trim().length === 0}
        >
          Search
        </Button>
      </div>

      <Segment className="results">
        {isLoading ? (
          <Dimmer active>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
        ) : (
          <>
            {results.map((film) => (
              <FilmCard film={film} />
            ))}
          </>
        )}
      </Segment>
    </div>
  );
};

export default App;
