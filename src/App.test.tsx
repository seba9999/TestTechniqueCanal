import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import App from "./App";
import { Film } from "./Interfaces";
import FilmCard from "./FilmCard";

const fakeFilm: Film = {
  backdrop_path: "",
  title: "Fake title",
  original_name: "",
  overview: "Fake overview",
  original_language: "fr",
  vote_average: 4,
};

const fakeAPI = setupServer(
  rest.get("https://api.themoviedb.org/3/search/multi", (req, res, ctx) => {
    return res(ctx.json({ results: [fakeFilm] }));
  })
);

beforeAll(() => fakeAPI.listen());
afterEach(() => fakeAPI.resetHandlers());
afterAll(() => fakeAPI.close());

test("render a card of a film", () => {
  render(<FilmCard film={fakeFilm} />);
  const title = screen.getByText(/Fake title/i);
  expect(title).toBeInTheDocument();
});

test("Fill in the search input and trigger search", async () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText("Search a film");
  const searchButton = screen.getByRole("searchBtn");

  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "Fake" } });
  expect((searchInput as HTMLInputElement).value).toBe("Fake");

  fireEvent.click(searchButton);

  const title = screen.getByText(/Fake title/i);
  await waitFor(() => expect(title).toBeInTheDocument());
});
