import React from "react";
import DataCard from "./DataCard";
import ImageCard from "./ImageCard";

export default function Item() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [isSearch, setIsSearch] = React.useState(false);
  const [lastSearch, setLastSearch] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData(id, type) {
    setData(null);
    setError(null);
    setClicked(true);
    let endpoint;


    if (type === "name") {
      const name = id.toLowerCase();
      endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;
    } else if (type === "number") {
      id = Number(id);
      if (id < 1) id = 1025;
      if (id > 1025) id = 1;
      endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
    } else {
      const randomNum = Math.floor(Math.random() * 1025) + 1;
      endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => setError(error));
  }

  function formSubmit(event) {
    event.preventDefault();
    setIsSearch(true);

    if (input.trim() === "") {
      setError(new Error("empty"));
      setLastSearch("");
      setData(null);
      setClicked(false);
      return;
    }

    setLastSearch(input);
    fetchData(input, "name");
    setInput("");
  }

  return (
    <main>
      <div className="pokemon-card">
        {error && (
          <p>
            {isSearch
              ? `${lastSearch || "That Pokémon"} could not be found.`
              : "Something went wrong, please try again."}
          </p>
        )}
        {data ? (
          <section>
            <DataCard data={data} />
            <ImageCard data={data} />
          </section>
        ) : clicked && !error ? (
          <p>loading...</p>
        ) : null}
      </div>
      <form
        onSubmit={(event) => {
          formSubmit(event);
        }}
      >
        <label>
          Search:
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="pikachu"
          ></input>
        </label>
        <button type="submit">Search</button>
      </form>
      <div id="button-div">
        <button onClick={() => fetchData(Number(data.id) - 1, 'number')}>Previous</button>
        <button onClick={() => fetchData()}>Catch a Random Pokémon</button>
        <button onClick={() => fetchData(Number(data.id) + 1, 'number')}>Next</button>
      </div>
    </main>
  );
}
