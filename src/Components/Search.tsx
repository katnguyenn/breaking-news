import React, { useState, useEffect } from "react";
import SearchResult from "../Pages/SearchResult";

const API_KEY = process.env.REACT_APP_API_KEY;

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchData(keyword);
  }, []);

  const fetchData = async (keyword): Promise<any> => {
    await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&language=en&sortBy=relevancy&apiKey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((res) => setResults(res))
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  console.log(results)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await fetchData(keyword);
    setIsLoaded(true);
    setKeyword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          name="keyword"
          value={keyword}
          onChange={handleChange}
          onClick={handleSubmit}
        ></input>
        <button onClick={handleSubmit}>Search</button>
      </form>
      {!isLoaded && <SearchResult results={results} articles={[]} title={""} author={""} publishedAt={""} description={""}/>}
    </div>
  );
};

export default Search;
